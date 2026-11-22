import assert from 'node:assert/strict';
import { test } from 'node:test';
import { watchReduceMotion, type ReduceMotionSource } from '../src/reduceMotion.ts';

/** A stand-in for `AccessibilityInfo`: the system setting, and the listeners. */
function fakeSource(initial: boolean) {
  const listeners = new Set<(enabled: boolean) => void>();
  let value = initial;
  const source: ReduceMotionSource = {
    isReduceMotionEnabled: () => Promise.resolve(value),
    addEventListener: (_event, handler) => {
      listeners.add(handler);
      return { remove: () => listeners.delete(handler) };
    },
  };
  return {
    source,
    listeners,
    set(next: boolean) {
      value = next;
      for (const handler of [...listeners]) handler(next);
    },
  };
}

const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

test('reports the setting at start, then every change', async () => {
  const system = fakeSource(true);
  const seen: boolean[] = [];
  watchReduceMotion(system.source, (enabled) => seen.push(enabled));
  await tick();
  assert.deepEqual(seen, [true]);
  system.set(false);
  system.set(true);
  assert.deepEqual(seen, [true, false, true]);
});

test('an app started with the setting off follows it when it is turned on', async () => {
  const system = fakeSource(false);
  const seen: boolean[] = [];
  watchReduceMotion(system.source, (enabled) => seen.push(enabled));
  await tick();
  system.set(true);
  assert.deepEqual(seen, [false, true]);
});

test('a change that comes before the first read is not overwritten by it', async () => {
  const system = fakeSource(false);
  const seen: boolean[] = [];
  watchReduceMotion(system.source, (enabled) => seen.push(enabled));
  system.set(true);
  await tick();
  assert.deepEqual(seen, [true]);
});

test('stops listening, and drops a read that arrives afterwards', async () => {
  const system = fakeSource(true);
  const seen: boolean[] = [];
  const stop = watchReduceMotion(system.source, (enabled) => seen.push(enabled));
  stop();
  await tick();
  system.set(false);
  assert.deepEqual(seen, []);
  assert.equal(system.listeners.size, 0);
});

test('a failing read leaves the listener working', async () => {
  const system = fakeSource(false);
  const failing: ReduceMotionSource = { ...system.source, isReduceMotionEnabled: () => Promise.reject(new Error('no')) };
  const seen: boolean[] = [];
  watchReduceMotion(failing, (enabled) => seen.push(enabled));
  await tick();
  system.set(true);
  assert.deepEqual(seen, [true]);
});
