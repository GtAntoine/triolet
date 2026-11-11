/**
 * An icon drawn with Skia from the icon model, its parts moved by Reanimated.
 *
 * One Canvas per icon. A raised layer is drawn in three passes: its shadow (the shapes as one
 * blurred silhouette, moved down and right), its light (the same, up and left), then the
 * shapes. An inset layer is drawn once, with two inner shadows. Parts move as Skia groups
 * whose transform is derived, on the UI thread, from the icon's clock.
 *
 * This is the spike of the React Native package: it lives in the example until it has been
 * seen running on a device.
 */
import {
  Canvas,
  DashPathEffect,
  Group,
  Paint,
  Path,
  Shadow,
  Skia,
  type SkPath,
} from '@shopify/react-native-skia';
import { forwardRef, memo, useEffect, useImperativeHandle, useMemo, type ReactNode } from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import {
  Easing,
  cancelAnimation,
  useDerivedValue,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import { deriveTheme, type Theme, type ThemeInput } from '../../../../packages/core/src/colors.ts';
import { rectRadii } from '../../../../packages/core/src/geometry.ts';
import { GRID, REST, type IconModel, type Layer, type Node, type Shape } from '../../../../packages/core/src/model.ts';
import { RELIEFS, RELIEF_REACH, layerHidden, layerRelief, tierForSize, type Tier } from '../../../../packages/core/src/relief.ts';
import { gestureEnd, prepareMotion, propAt, type PartMotion } from './motion';

const RAD = Math.PI / 180;
/** Clock value that means "at rest": later than the end of any gesture. */
const RESTING = 1e12;

export interface TrioletIconProps {
  icon: IconModel;
  /** Width and height, in points. */
  size?: number;
  /** The three colours (and anything else of the theme). */
  colors?: ThemeInput;
  /** `flat` draws without relief at any size. */
  finish?: 'relief' | 'flat';
  /** Plays the gesture when pressed (default: true). */
  pressable?: boolean;
  /** Repeats the gesture for as long as it is true. */
  loop?: boolean;
  /** Text alternative. Without it the icon is decorative. */
  label?: string;
  style?: StyleProp<ViewStyle>;
}

export interface TrioletIconHandle {
  /** Plays the gesture once from the start. */
  play: () => void;
}

// --- Shapes --------------------------------------------------------------------------------

function toPath(shape: Shape): SkPath {
  let path: SkPath;
  switch (shape.kind) {
    case 'rect': {
      const [rx, ry] = rectRadii(shape);
      path = Skia.Path.Make();
      path.addRRect(Skia.RRectXY(Skia.XYWHRect(shape.x, shape.y, shape.w, shape.h), rx, ry));
      break;
    }
    case 'circle':
      path = Skia.Path.Make();
      path.addCircle(shape.cx, shape.cy, shape.r);
      break;
    case 'ellipse':
      path = Skia.Path.Make();
      path.addOval(Skia.XYWHRect(shape.cx - shape.rx, shape.cy - shape.ry, shape.rx * 2, shape.ry * 2));
      break;
    case 'path': {
      const parsed = Skia.Path.MakeFromSVGString(shape.d);
      if (!parsed) throw new Error(`Triolet: unreadable path data "${shape.d}"`);
      path = parsed;
      break;
    }
  }
  if (shape.rotate) {
    const [degrees, cx, cy] = shape.rotate;
    const matrix = Skia.Matrix();
    matrix.translate(cx, cy);
    matrix.rotate(degrees * RAD);
    matrix.translate(-cx, -cy);
    path.transform(matrix);
  }
  return path;
}

interface ShapeViewProps {
  shape: Shape;
  color: string;
  /** Fraction of a stroked line that is drawn, when the part has a `draw` track. */
  drawn?: SharedValue<number>;
}

const ShapeView = memo(function ShapeView({ shape, color, drawn }: ShapeViewProps) {
  const path = useMemo(() => toPath(shape), [shape]);
  const stroke = shape.stroke;
  const drawable = drawn && shape.kind === 'path' && shape.fill === false;
  return (
    <>
      {shape.fill !== false && <Path path={path} color={color} />}
      {stroke && (
        <Path
          path={path}
          color={color}
          style="stroke"
          strokeWidth={stroke.width}
          strokeJoin="round"
          strokeCap={stroke.cap === 'butt' ? 'butt' : 'round'}
          end={drawable ? drawn : 1}
        >
          {stroke.dash && <DashPathEffect intervals={stroke.dash} phase={stroke.dashOffset ?? 0} />}
        </Path>
      )}
    </>
  );
});

// --- Layers --------------------------------------------------------------------------------

interface Scene {
  theme: Theme;
  tier: Tier;
  small: boolean;
  clock: SharedValue<number>;
  motions: Record<string, PartMotion>;
  pivots: Record<string, [number, number]>;
}

function LayerView({ layer, scene, drawn }: { layer: Layer; scene: Scene; drawn?: SharedValue<number> }) {
  const { theme, tier, small } = scene;
  if (layerHidden(layer, tier, small)) return null;
  const shapes = layer.shapes.map((shape, i) => <ShapeView key={i} shape={shape} color={theme[shape.role]} drawn={drawn} />);
  const key = layerRelief(layer, tier);
  if (!key) return <>{shapes}</>;
  const { kind, offset: d, blur, dark } = RELIEFS[key];
  if (kind === 'raised') {
    return (
      <>
        <Group
          layer={
            <Paint>
              <Shadow dx={d} dy={d} blur={blur} color={theme.shade} shadowOnly />
            </Paint>
          }
        >
          {shapes}
        </Group>
        <Group
          layer={
            <Paint>
              <Shadow dx={-d} dy={-d} blur={blur} color={theme.light} shadowOnly />
            </Paint>
          }
        >
          {shapes}
        </Group>
        {shapes}
      </>
    );
  }
  return (
    <Group
      layer={
        <Paint>
          <Shadow inner dx={d} dy={d} blur={blur} color={dark ? theme.insetShadeDark : theme.insetShade} />
          <Shadow inner dx={-d} dy={-d} blur={blur} color={dark ? theme.insetLightDark : theme.insetLight} />
        </Paint>
      }
    >
      {shapes}
    </Group>
  );
}

function PartView({ name, scene, children }: { name: string; scene: Scene; children: (drawn?: SharedValue<number>) => ReactNode }) {
  const motion = scene.motions[name]!;
  const pivot = scene.pivots[name]!;
  const { clock } = scene;
  const { tracks } = motion;
  const transform = useDerivedValue(() => {
    const t = clock.value;
    const scale = propAt(motion, tracks.scale, REST.scale, t);
    return [
      { translateX: propAt(motion, tracks.x, REST.x, t) },
      { translateY: propAt(motion, tracks.y, REST.y, t) },
      { rotate: propAt(motion, tracks.rotate, REST.rotate, t) * RAD },
      { skewY: propAt(motion, tracks.skewY, REST.skewY, t) * RAD },
      { scaleX: scale * propAt(motion, tracks.scaleX, REST.scaleX, t) },
      { scaleY: scale * propAt(motion, tracks.scaleY, REST.scaleY, t) },
    ];
  });
  const opacity = useDerivedValue(() => propAt(motion, tracks.opacity, REST.opacity, clock.value));
  const drawn = useDerivedValue(() => propAt(motion, tracks.draw, REST.draw, clock.value));
  return (
    <Group transform={transform} origin={{ x: pivot[0], y: pivot[1] }} opacity={opacity}>
      {children(tracks.draw ? drawn : undefined)}
    </Group>
  );
}

function ClipView({ clip, children }: { clip: Shape[]; children: ReactNode }) {
  const path = useMemo(() => {
    const union = Skia.Path.Make();
    for (const shape of clip) union.addPath(toPath(shape));
    return union;
  }, [clip]);
  return <Group clip={path}>{children}</Group>;
}

function Nodes({ nodes, scene, drawn }: { nodes: Node[]; scene: Scene; drawn?: SharedValue<number> }) {
  return (
    <>
      {nodes.map((node, i) => {
        if (node.type === 'layer') return <LayerView key={i} layer={node} scene={scene} drawn={drawn} />;
        if (node.type === 'clip') {
          return (
            <ClipView key={i} clip={node.clip}>
              <Nodes nodes={node.children} scene={scene} drawn={drawn} />
            </ClipView>
          );
        }
        if (!scene.motions[node.name]) return <Nodes key={i} nodes={node.children} scene={scene} drawn={drawn} />;
        return (
          <PartView key={i} name={node.name} scene={scene}>
            {(own) => <Nodes nodes={node.children} scene={scene} drawn={own ?? drawn} />}
          </PartView>
        );
      })}
    </>
  );
}

// --- The icon ------------------------------------------------------------------------------

export const TrioletIcon = memo(
  forwardRef<TrioletIconHandle, TrioletIconProps>(function TrioletIcon(
    { icon, size = 48, colors, finish = 'relief', pressable = true, loop = false, label, style },
    ref,
  ) {
    const reduced = useReducedMotion();
    const clock = useSharedValue(RESTING);
    const prepared = useMemo(() => {
      const motions: Record<string, PartMotion> = {};
      const pivots: Record<string, [number, number]> = {};
      for (const m of icon.motion) {
        motions[m.part] = prepareMotion(m);
        pivots[m.part] = m.pivot;
      }
      const end = gestureEnd(Object.values(motions));
      return { motions, pivots, end, endless: !Number.isFinite(end) };
    }, [icon]);
    const theme = useMemo(() => deriveTheme(colors), [colors]);

    const play = useMemo(
      () => () => {
        if (reduced) return;
        cancelAnimation(clock);
        clock.value = 0;
        // An endless gesture gets a clock that runs for a day.
        const span = prepared.endless ? 86_400_000 : prepared.end;
        clock.value = withTiming(span, { duration: span, easing: Easing.linear });
      },
      [clock, prepared, reduced],
    );
    useImperativeHandle(ref, () => ({ play }), [play]);

    const repeating = (loop || icon.idle) && !reduced;
    useEffect(() => {
      if (!repeating) return;
      if (prepared.endless) play();
      else {
        const span = prepared.end + 400;
        clock.value = 0;
        clock.value = withRepeat(withTiming(span, { duration: span, easing: Easing.linear }), -1);
      }
      return () => {
        cancelAnimation(clock);
        clock.value = RESTING;
      };
    }, [repeating, prepared, clock, play]);

    const tier: Tier = finish === 'flat' ? 'flat' : tierForSize(size);
    const scene: Scene = useMemo(
      () => ({ theme, tier, small: size < 24, clock, motions: prepared.motions, pivots: prepared.pivots }),
      [theme, tier, size, clock, prepared],
    );

    // The relief reaches outside the grid: the canvas is larger than the icon, and negative
    // margins keep the layout at `size`.
    const k = size / GRID;
    const pad = tier === 'flat' ? 0 : Math.ceil(RELIEF_REACH * k);
    const canvas = (
      <Canvas style={{ width: size + 2 * pad, height: size + 2 * pad, margin: -pad }} pointerEvents="none">
        <Group transform={[{ translateX: pad }, { translateY: pad }, { scale: k }]}>
          <Nodes nodes={icon.nodes} scene={scene} />
        </Group>
      </Canvas>
    );
    const a11y = label
      ? ({ accessible: true, accessibilityRole: 'image', accessibilityLabel: label } as const)
      : ({ accessible: false, importantForAccessibility: 'no-hide-descendants', accessibilityElementsHidden: true } as const);
    if (!pressable) {
      return (
        <View style={[{ width: size, height: size }, style]} {...a11y}>
          {canvas}
        </View>
      );
    }
    return (
      <Pressable onPress={play} style={[{ width: size, height: size }, style]} {...a11y}>
        {canvas}
      </Pressable>
    );
  }),
);
