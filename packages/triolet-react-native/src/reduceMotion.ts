/**
 * Follows the system setting "reduce motion" while the app runs.
 *
 * Reanimated's `useReducedMotion()` is read once, when the app starts. The setting can change
 * while the app is open (the user turns it on or off in the system settings), so the icons
 * also listen to React Native's `AccessibilityInfo`.
 */

/** The part of React Native's `AccessibilityInfo` this needs. */
export interface ReduceMotionSource {
  isReduceMotionEnabled: () => Promise<boolean>;
  addEventListener: (event: 'reduceMotionChanged', handler: (enabled: boolean) => void) => { remove: () => void };
}

/**
 * Calls `onChange` with the current value, then at every change. Returns the function that
 * stops listening. A value that arrives after that is dropped, and a change that arrives
 * before the first read wins over it.
 */
export function watchReduceMotion(source: ReduceMotionSource, onChange: (enabled: boolean) => void): () => void {
  let stopped = false;
  let changed = false;
  const subscription = source.addEventListener('reduceMotionChanged', (enabled) => {
    if (stopped) return;
    changed = true;
    onChange(enabled);
  });
  source
    .isReduceMotionEnabled()
    .then((enabled) => {
      if (!stopped && !changed) onChange(enabled);
    })
    .catch(() => {});
  return () => {
    stopped = true;
    subscription.remove();
  };
}
