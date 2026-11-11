/** What the site does in the browser: the palette, search, tabs, copy and play buttons. */

const root = document.documentElement;
const KEYS = ['base', 'main', 'accent', 'surface'] as const;
type Colors = Record<(typeof KEYS)[number], string>;
const STORE = 'triolet-colors';

function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  return (0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
}

function current(): Colors {
  const style = getComputedStyle(root);
  return Object.fromEntries(KEYS.map((key) => [key, style.getPropertyValue(`--triolet-${key}`).trim()])) as Colors;
}

function apply(colors: Colors, save = true): void {
  for (const key of KEYS) root.style.setProperty(`--triolet-${key}`, colors[key]);
  const dark = luminance(colors.surface) < 0.4;
  if (dark) root.dataset.surface = 'dark';
  else delete root.dataset.surface;
  if (save) {
    try {
      localStorage.setItem(STORE, JSON.stringify({ ...colors, dark }));
    } catch {
      // Private browsing: the choice lasts for the page.
    }
  }
  sync(colors);
}

/** Inputs, presets and the snippets that quote the colours follow the palette. */
function sync(colors: Colors): void {
  for (const input of document.querySelectorAll<HTMLInputElement>('[data-color]')) {
    const value = colors[input.dataset.color as keyof Colors];
    if (/^#[0-9a-f]{6}$/i.test(value)) input.value = value;
  }
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-preset]')) {
    const preset = JSON.parse(button.dataset.preset!) as Colors;
    button.setAttribute('aria-pressed', String(KEYS.every((key) => preset[key].toLowerCase() === colors[key].toLowerCase())));
  }
  for (const el of document.querySelectorAll<HTMLElement>('[data-live]')) el.textContent = colors[el.dataset.live as keyof Colors];
}

for (const input of document.querySelectorAll<HTMLInputElement>('[data-color]')) {
  input.addEventListener('input', () => apply({ ...current(), [input.dataset.color!]: input.value }));
}
for (const button of document.querySelectorAll<HTMLButtonElement>('[data-preset]')) {
  button.addEventListener('click', () => apply(JSON.parse(button.dataset.preset!) as Colors));
}
sync(current());

// --- Playing a gesture -----------------------------------------------------------------------

const calm = matchMedia('(prefers-reduced-motion: reduce)');

async function play(svg: Element): Promise<void> {
  svg.classList.remove('triolet-play');
  void svg.getBoundingClientRect();
  svg.classList.add('triolet-play');
  await Promise.allSettled(svg.getAnimations({ subtree: true }).map((a) => a.finished));
  svg.classList.remove('triolet-play');
}

for (const button of document.querySelectorAll<HTMLElement>('[data-play]')) {
  button.addEventListener('click', () => {
    for (const svg of document.querySelectorAll(button.dataset.play!)) void play(svg);
  });
}

// The stage of the home page: its icons play in turn, as long as it is on screen.
const stage = document.querySelector<HTMLElement>('[data-stage]');
if (stage && !calm.matches) {
  const icons = [...stage.querySelectorAll('.triolet')];
  let index = 0;
  let timer = 0;
  const next = () => {
    void play(icons[index % icons.length]!);
    index += 1;
  };
  new IntersectionObserver(([entry]) => {
    clearInterval(timer);
    if (entry?.isIntersecting) timer = window.setInterval(next, 1100);
  }).observe(stage);
}

// Icons marked data-inview play once when they scroll into view.
const seen = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      seen.unobserve(entry.target);
      void play(entry.target);
    }
  },
  { threshold: 0.7 },
);
for (const svg of document.querySelectorAll('[data-inview] .triolet')) seen.observe(svg);

// --- Copy ------------------------------------------------------------------------------------

for (const button of document.querySelectorAll<HTMLButtonElement>('[data-copy]')) {
  button.addEventListener('click', async () => {
    const source = button.dataset.copy ? document.querySelector(button.dataset.copy) : button.parentElement?.querySelector('code');
    const text = source instanceof HTMLTemplateElement ? source.innerHTML : (source?.textContent ?? '');
    const label = button.textContent;
    try {
      await navigator.clipboard.writeText(text.trim());
      button.textContent = 'Copied';
    } catch {
      button.textContent = 'Select and copy';
    }
    setTimeout(() => (button.textContent = label), 1400);
  });
}

// --- Tabs ------------------------------------------------------------------------------------

for (const tabs of document.querySelectorAll<HTMLElement>('[data-tabs]')) {
  const scope = tabs.parentElement!;
  const buttons = [...tabs.querySelectorAll<HTMLButtonElement>('button')];
  const select = (name: string) => {
    for (const button of buttons) button.setAttribute('aria-selected', String(button.dataset.tab === name));
    for (const panel of scope.querySelectorAll<HTMLElement>('[data-tab-panel]')) panel.hidden = panel.dataset.tabPanel !== name;
  };
  for (const button of buttons) button.addEventListener('click', () => select(button.dataset.tab!));
}

// --- Search ----------------------------------------------------------------------------------

const query = document.querySelector<HTMLInputElement>('#q');
if (query) {
  const tiles = [...document.querySelectorAll<HTMLElement>('.tile')];
  const count = document.querySelector<HTMLOutputElement>('#count')!;
  const empty = document.querySelector<HTMLElement>('#empty')!;
  const chips = [...document.querySelectorAll<HTMLButtonElement>('.chip')];
  let category = '';
  const filter = () => {
    const words = query.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let shown = 0;
    for (const tile of tiles) {
      const hit = (!category || tile.dataset.category === category) && words.every((word) => tile.dataset.search!.includes(word));
      tile.hidden = !hit;
      if (hit) shown += 1;
    }
    count.textContent = `${shown} of ${tiles.length}`;
    empty.hidden = shown > 0;
  };
  query.addEventListener('input', filter);
  for (const chip of chips) {
    chip.addEventListener('click', () => {
      category = chip.dataset.category === category ? '' : chip.dataset.category!;
      for (const other of chips) other.setAttribute('aria-pressed', String(other.dataset.category === category && category !== ''));
      filter();
    });
  }
  // "/" goes to the search field, as on most icon sites.
  addEventListener('keydown', (event) => {
    if (event.key === '/' && document.activeElement !== query) {
      event.preventDefault();
      query.focus();
    }
  });
  const initial = new URLSearchParams(location.search).get('q');
  if (initial) query.value = initial;
  filter();
}
