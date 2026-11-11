/**
 * The Skia spike: is the relief right, and does it stay fluid?
 *
 * Screen 1 compares two icons drawn live by Skia with the same icons rasterised from the SVG
 * (the reference), then shows the size tiers and the flat finish. Tap an icon to play it.
 * Screen 2 is a grid of thirty live icons with a frame-rate readout: play them all at once,
 * or loop them all, and watch the numbers.
 */
import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef, useState } from 'react';
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFrameCallback, useSharedValue } from 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// Reanimated 4 moved "run on the JS thread" to react-native-worklets.
import { scheduleOnRN } from 'react-native-worklets';
import agendaModel from '../../model/calendar-clock.json';
import alertesModel from '../../model/bell-ring.json';
import demarchesModel from '../../model/file-text.json';
import suiviModel from '../../model/checklist.json';
import voterModel from '../../model/ballot-box.json';
import type { ThemeInput } from '../../packages/core/src/colors.ts';
import type { IconModel } from '../../packages/core/src/model.ts';
import { TrioletIcon, type TrioletIconHandle } from './src/skia/TrioletIcon';

const agenda = agendaModel as unknown as IconModel;
const voter = voterModel as unknown as IconModel;
const ICONS = [agenda, alertesModel, demarchesModel, suiviModel, voter] as unknown as IconModel[];

const REFERENCE = {
  agenda: require('./assets/reference/calendar-clock.png'),
  voter: require('./assets/reference/ballot-box.png'),
} as const;

// A browser allows about sixteen WebGL contexts and each Skia canvas is one: the web preview,
// which only exists to look at the renderer without a device, shows fewer icons.
const WEB = Platform.OS === 'web';

const PALETTES: { name: string; colors: ThemeInput; ink: string }[] = [
  { name: 'Original', colors: { base: '#F1F2F4', main: '#1D4A68', accent: '#EE4B3B', surface: '#FFFFFF' }, ink: '#1C2733' },
  { name: 'Forest', colors: { base: '#EEF2EA', main: '#1F5A3D', accent: '#E8A13A', surface: '#FBFCF8' }, ink: '#1C2733' },
  { name: 'Plum', colors: { base: '#F4EEF3', main: '#5B2A6E', accent: '#F26B8A', surface: '#FFFFFF' }, ink: '#1C2733' },
  { name: 'Night', colors: { base: '#2B3644', main: '#9FC3E8', accent: '#FF7A59', surface: '#141B24' }, ink: '#E7EDF3' },
];

/** Frames per second on the UI thread, where Skia draws: average and worst of the last second. */
function useFrameRate() {
  const [rate, setRate] = useState({ average: 0, worst: 0 });
  const frames = useSharedValue(0);
  const elapsed = useSharedValue(0);
  const longest = useSharedValue(0);
  const report = useCallback((average: number, worst: number) => setRate({ average, worst }), []);
  useFrameCallback((info) => {
    const dt = info.timeSincePreviousFrame ?? 0;
    if (dt <= 0) return;
    frames.value += 1;
    elapsed.value += dt;
    if (dt > longest.value) longest.value = dt;
    if (elapsed.value >= 1000) {
      const average = Math.round((frames.value * 1000) / elapsed.value);
      const worst = Math.round(1000 / longest.value);
      frames.value = 0;
      elapsed.value = 0;
      longest.value = 0;
      // Reported to React once a second.
      scheduleOnRN(report, average, worst);
    }
  });
  return rate;
}

function Chip({ label, active, onPress, ink }: { label: string; active?: boolean; onPress: () => void; ink: string }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, { borderColor: ink + '55' }, active && { backgroundColor: ink + '22' }]}>
      <Text style={{ color: ink, fontSize: 14, fontWeight: active ? '700' : '400' }}>{label}</Text>
    </Pressable>
  );
}

function TwoIcons({ colors, ink }: { colors: ThemeInput; ink: string }) {
  const caption = { color: ink, opacity: 0.7, fontSize: 12, textAlign: 'center' as const, marginTop: 6 };
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={[styles.title, { color: ink }]}>Skia, live (tap to play)</Text>
      <View style={styles.row}>
        <TrioletIcon icon={agenda} size={150} colors={colors} label="Agenda" />
        <TrioletIcon icon={voter} size={150} colors={colors} label="Voter" />
      </View>
      <Text style={[styles.title, { color: ink }]}>Reference: the SVG as an image (Original palette)</Text>
      <View style={styles.row}>
        <Image source={REFERENCE.agenda} style={{ width: 150, height: 150 }} />
        <Image source={REFERENCE.voter} style={{ width: 150, height: 150 }} />
      </View>
      <Text style={[styles.title, { color: ink }]}>Sizes: 96, 64, 48 (relief) · 32, 24 (compact) · 20, 16 (flat)</Text>
      {(WEB ? [agenda] : [agenda, voter]).map((icon) => (
        <View key={icon.name} style={[styles.row, { alignItems: 'flex-end', gap: 14 }]}>
          {[96, 64, 48, 32, 24, 20, 16].map((size) => (
            <View key={size}>
              <TrioletIcon icon={icon} size={size} colors={colors} />
              <Text style={caption}>{size}</Text>
            </View>
          ))}
        </View>
      ))}
      <Text style={[styles.title, { color: ink }]}>Flat finish</Text>
      <View style={styles.row}>
        {(WEB ? [agenda, voter] : ICONS).map((icon) => (
          <TrioletIcon key={icon.name} icon={icon} size={56} colors={colors} finish="flat" />
        ))}
      </View>
      <Text style={[styles.title, { color: ink }]}>All five</Text>
      <View style={styles.row}>
        {(WEB ? ICONS.slice(1, 4) : ICONS).map((icon) => (
          <TrioletIcon key={icon.name} icon={icon} size={56} colors={colors} />
        ))}
      </View>
    </ScrollView>
  );
}

function Grid({ colors, ink }: { colors: ThemeInput; ink: string }) {
  const [loop, setLoop] = useState(false);
  const refs = useRef<(TrioletIconHandle | null)[]>([]);
  const rate = useFrameRate();
  const playAll = () => refs.current.forEach((icon) => icon?.play());
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={[styles.row, { justifyContent: 'flex-start', gap: 8 }]}>
        <Chip label="Play all once" onPress={playAll} ink={ink} />
        <Chip label={loop ? 'Stop the loop' : 'Loop all'} active={loop} onPress={() => setLoop((v) => !v)} ink={ink} />
      </View>
      <Text style={[styles.rate, { color: ink }]}>
        {rate.average} fps average · {rate.worst} fps worst frame
      </Text>
      <View style={styles.grid}>
        {Array.from({ length: WEB ? 10 : 30 }, (_, i) => (
          <TrioletIcon
            key={i}
            ref={(handle) => {
              refs.current[i] = handle;
            }}
            icon={ICONS[i % ICONS.length]!}
            size={56}
            colors={colors}
            loop={loop}
          />
        ))}
      </View>
      <Text style={{ color: ink, opacity: 0.7, fontSize: 13, lineHeight: 19 }}>
        Thirty icons, each its own Skia canvas. Tap one to play it alone. "Loop all" is the worst case: thirty gestures
        redrawn every frame. Scroll while they play.
      </Text>
    </ScrollView>
  );
}

export default function App() {
  const [screen, setScreen] = useState<'two' | 'grid'>('two');
  const [palette, setPalette] = useState(0);
  const { colors, ink } = PALETTES[palette]!;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
        <StatusBar style={palette === 3 ? 'light' : 'dark'} />
        <View style={styles.bar}>
          <Chip label="Two icons" active={screen === 'two'} onPress={() => setScreen('two')} ink={ink} />
          <Chip label="Grid of 30" active={screen === 'grid'} onPress={() => setScreen('grid')} ink={ink} />
        </View>
        <View style={styles.bar}>
          {PALETTES.map((p, i) => (
            <Chip key={p.name} label={p.name} active={i === palette} onPress={() => setPalette(i)} ink={ink} />
          ))}
        </View>
        {screen === 'two' ? <TwoIcons colors={colors} ink={ink} /> : <Grid colors={colors} ink={ink} />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 16, paddingTop: 10 },
  chip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, borderWidth: 1 },
  page: { padding: 16, paddingBottom: 60, gap: 14 },
  title: { fontSize: 14, fontWeight: '600', marginTop: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', gap: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', paddingVertical: 8 },
  rate: { fontSize: 18, fontWeight: '700', fontVariant: ['tabular-nums'] },
});
