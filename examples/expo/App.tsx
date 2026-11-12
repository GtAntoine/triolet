/**
 * The example app of triolet-react-native.
 *
 * "Two icons" compares two icons drawn live by Skia with the same icons rasterised from the
 * SVG (the reference), then shows the size tiers and the flat finish. Tap an icon to play it.
 * "Grid of 30" and "All" show live icons with a frame-rate readout: play them all at once, or
 * loop them all, and watch the numbers.
 *
 * Build the packages first (`pnpm build` at the root of the repository): the app reads them
 * from `packages/`.
 */
import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef, useState } from 'react';
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFrameCallback, useSharedValue } from 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// Reanimated 4 moved "run on the JS thread" to react-native-worklets.
import { scheduleOnRN } from 'react-native-worklets';
import * as Triolet from 'triolet-react-native';
import { BallotBox, BellRing, CalendarClock, Checklist, FileText, TrioletProvider, type IconComponent, type TrioletIconHandle } from 'triolet-react-native';

type Colors = NonNullable<Parameters<typeof TrioletProvider>[0]['colors']>;

/** Every icon component of the package, in name order. */
const ALL: [string, IconComponent][] = Object.entries(Triolet)
  .filter(([name, value]) => /^[A-Z]/.test(name) && !name.endsWith('Icon') && !name.startsWith('Triolet') && typeof value === 'object')
  .map(([name, value]) => [name, value as IconComponent]);
const FIVE = [CalendarClock, BellRing, FileText, Checklist, BallotBox];

const REFERENCE = {
  agenda: require('./assets/reference/calendar-clock.png'),
  voter: require('./assets/reference/ballot-box.png'),
} as const;

// A browser allows about sixteen WebGL contexts and each Skia canvas is one: the web preview,
// which only exists to look at the renderer without a device, shows fewer icons.
const WEB = Platform.OS === 'web';

const PALETTES: { name: string; colors: Colors; ink: string }[] = [
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

function TwoIcons({ ink }: { ink: string }) {
  const caption = { color: ink, opacity: 0.7, fontSize: 12, textAlign: 'center' as const, marginTop: 6 };
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={[styles.title, { color: ink }]}>Skia, live (tap to play)</Text>
      <View style={styles.row}>
        <CalendarClock size={150} label="Calendar" />
        <BallotBox size={150} label="Ballot box" />
      </View>
      <Text style={[styles.title, { color: ink }]}>Reference: the SVG as an image (Original palette)</Text>
      <View style={styles.row}>
        <Image source={REFERENCE.agenda} style={{ width: 150, height: 150 }} />
        <Image source={REFERENCE.voter} style={{ width: 150, height: 150 }} />
      </View>
      <Text style={[styles.title, { color: ink }]}>Sizes: 96, 64, 48 (relief) · 32, 24 (compact) · 20, 16 (flat)</Text>
      {(WEB ? [CalendarClock] : [CalendarClock, BallotBox]).map((Icon, i) => (
        <View key={i} style={[styles.row, { alignItems: 'flex-end', gap: 14 }]}>
          {[96, 64, 48, 32, 24, 20, 16].map((size) => (
            <View key={size}>
              <Icon size={size} />
              <Text style={caption}>{size}</Text>
            </View>
          ))}
        </View>
      ))}
      <Text style={[styles.title, { color: ink }]}>Flat finish</Text>
      <View style={styles.row}>
        {(WEB ? FIVE.slice(0, 2) : FIVE).map((Icon, i) => (
          <Icon key={i} size={56} finish="flat" />
        ))}
      </View>
    </ScrollView>
  );
}

function Grid({ ink, count }: { ink: string; count: number }) {
  const [loop, setLoop] = useState(false);
  const refs = useRef<(TrioletIconHandle | null)[]>([]);
  const rate = useFrameRate();
  const playAll = () => refs.current.forEach((icon) => icon?.play());
  const shown = ALL.slice(0, WEB ? 10 : count);
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
        {shown.map(([name, Icon], i) => (
          <Icon
            key={name}
            ref={(handle) => {
              refs.current[i] = handle;
            }}
            size={56}
            loop={loop}
          />
        ))}
      </View>
      <Text style={{ color: ink, opacity: 0.7, fontSize: 13, lineHeight: 19 }}>
        {shown.length} icons, each its own Skia canvas. Tap one to play it alone. "Loop all" is the worst case: every gesture redrawn every frame. Scroll
        while they play.
      </Text>
    </ScrollView>
  );
}

export default function App() {
  const [screen, setScreen] = useState<'two' | 'grid' | 'all'>('two');
  const [palette, setPalette] = useState(0);
  const { colors, ink } = PALETTES[palette]!;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
        <StatusBar style={palette === 3 ? 'light' : 'dark'} />
        <View style={styles.bar}>
          <Chip label="Two icons" active={screen === 'two'} onPress={() => setScreen('two')} ink={ink} />
          <Chip label="Grid of 30" active={screen === 'grid'} onPress={() => setScreen('grid')} ink={ink} />
          <Chip label={`All ${ALL.length}`} active={screen === 'all'} onPress={() => setScreen('all')} ink={ink} />
        </View>
        <View style={styles.bar}>
          {PALETTES.map((p, i) => (
            <Chip key={p.name} label={p.name} active={i === palette} onPress={() => setPalette(i)} ink={ink} />
          ))}
        </View>
        <TrioletProvider colors={colors}>
          {screen === 'two' ? <TwoIcons ink={ink} /> : <Grid key={screen} ink={ink} count={screen === 'grid' ? 30 : ALL.length} />}
        </TrioletProvider>
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
