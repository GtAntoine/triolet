"""The five brand marks that Simple Icons does not have, drawn by hand in simple shapes.

    python tools/brands/hand.py
"""
import os

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')

MARKS = {
    'brand-grok': (
        'Grok', ['ai', 'xai'], 'icon, inset, part, pill, plain, pop, raised, rect, ring, stroke',
        "plain(ring(48, 40, 10.5, 'on', 4.5)), plain(stroke('M34 55L62 25', 'main', 9)), plain(stroke('M34 55L62 25', 'on', 3.5))",
    ),
    'brand-xai': (
        'xAI', ['ai', 'grok'], 'icon, inset, part, pill, plain, pop, raised, rect, stroke',
        "plain(stroke('M34 27L53 54', 'on', 5.5), stroke('M34 54L41 44', 'on', 5.5), stroke('M49 37L60 27V54', 'on', 5.5))",
    ),
    'brand-midjourney': (
        'Midjourney', ['ai', 'image'], 'icon, inset, part, path, pill, plain, pop, raised, rect, stroke',
        "plain(path('M39 23C50 29 56 38 57 49H37C42 41 43 32 39 23Z', 'on'), path('M52 27C59 32 63 40 64 49H61C60 41 57 33 52 27Z', 'on')), "
        "plain(stroke('M33 54C36.5 51.5 40 56.5 44 54C48 51.5 51.5 56.5 55.5 54C59 51.5 62 55 65 53.5', 'on', 3.5))",
    ),
    'brand-aistudio': (
        'Google AI Studio', ['ai', 'google'], 'icon, inset, part, path, pill, plain, pop, raised, rect, stroke',
        "plain(stroke('M45 29H40A6 6 0 0 0 34 35V49A6 6 0 0 0 40 55H54A6 6 0 0 0 60 49V45', 'on', 4)), "
        "plain(path('M57 21C57.7 25.5 61.5 29.3 66 30C61.5 30.7 57.7 34.5 57 39C56.3 34.5 52.5 30.7 48 30C52.5 29.3 56.3 25.5 57 21Z', 'on', { outline: 1.5 }))",
    ),
    'brand-bags-fm': (
        'Bags', ['crypto', 'money'], 'icon, inset, part, path, pill, plain, pop, raised, rect, stroke',
        "plain(path('M41 26H55L52 32H44Z', 'on', { outline: 2 }), path('M41 34C35 40 33 45 33 48.5A7 7 0 0 0 40 55.5H56A7 7 0 0 0 63 48.5C63 45 61 40 55 34Z', 'on')), "
        "plain(stroke('M51.5 42C50.5 40.5 49 40 48 40C46 40 44.8 41.2 44.8 42.6C44.8 45.6 51.4 44.4 51.4 47.6C51.4 49 50 50.2 48 50.2C46.4 50.2 45 49.5 44.3 48.2M48 38V52', 'main', 3))",
    ),
}

for name, (title, extra, imports, mark) in MARKS.items():
    slug = name[len('brand-'):]
    keywords = [slug.replace('-', ' '), 'brand', 'logo', *extra, 'marque', 'logo de marque']
    body = f"""// Written by tools/brands/hand.py. Do not edit.
// The {title} mark is a trademark of its owner; this is a simplified drawing of it.
import {{ {imports} }} from '@triolet/core';

export default icon({{
  name: '{name}',
  category: 'brands',
  keywords: [{', '.join(repr(k) for k in keywords)}],
  gesture: 'The {title} mark pops on its key.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(rect(22, 22, 52, 52, 10, 'main')),
    inset(pill(30, 62, 36, 7, 'accent')),
    part('mark', {mark}),
  ],
  motion: {{
    mark: pop({{ scale: 1.12, duration: 450, pivot: [48, 40] }}),
  }},
}});
"""
    open(os.path.join(ROOT, 'icons', name + '.ts'), 'w', encoding='utf-8', newline='\n').write(body)
print(len(MARKS), 'hand-drawn brand icons written')
