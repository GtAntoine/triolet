"""Writes the brand icons (icons/brand-*.ts) from the outlines in tools/brands/brands.json.

The outlines come from Simple Icons (https://simpleicons.org, CC0): one filled path per mark, on
a 24 grid. This script only places each mark on a Triolet key (light rim, dark face, the mark in
white above an accent line) and rewrites its path with absolute commands on the 96 grid.

Brand names and logos are trademarks of their owners. They are here so that an interface can
point to those services; they are not covered by the MIT licence of this repository, and each
owner's brand guidelines apply.

    python tools/brands/build.py
"""
import json
import math
import os
import re

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
NUMBER = re.compile(r'[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?')
ARITY = {'M': 2, 'L': 2, 'H': 1, 'V': 1, 'C': 6, 'S': 4, 'Q': 4, 'T': 2, 'A': 7, 'Z': 0}


def absolute(d):
    """SVG path data as a list of absolute (command, numbers) with only M L C Q A Z."""
    pos = 0
    out = []
    cur = [0.0, 0.0]
    start = [0.0, 0.0]
    last_cmd = ''
    last_ctrl = None
    cmd = ''

    def skip():
        nonlocal pos
        while pos < len(d) and d[pos] in ' ,\t\r\n':
            pos += 1

    def number():
        nonlocal pos
        skip()
        m = NUMBER.match(d, pos)
        if not m:
            raise ValueError(f'number expected at {pos}: {d[pos:pos + 20]!r}')
        pos = m.end()
        return float(m.group(0))

    def flag():
        nonlocal pos
        skip()
        if d[pos] not in '01':
            raise ValueError(f'flag expected at {pos}')
        pos += 1
        return int(d[pos - 1])

    while True:
        skip()
        if pos >= len(d):
            break
        if d[pos].isalpha():
            cmd = d[pos]
            pos += 1
        elif cmd in 'Mm' and cmd:
            cmd = 'L' if cmd == 'M' else 'l'
        elif cmd in 'Zz':
            raise ValueError('numbers after Z')
        upper = cmd.upper()
        rel = cmd != upper
        ox, oy = (cur[0], cur[1]) if rel else (0.0, 0.0)
        if upper == 'Z':
            out.append(('Z', []))
            cur = list(start)
            last_ctrl = None
        elif upper == 'M':
            cur = [number() + ox, number() + oy]
            start = list(cur)
            out.append(('M', list(cur)))
            last_ctrl = None
        elif upper == 'L':
            cur = [number() + ox, number() + oy]
            out.append(('L', list(cur)))
            last_ctrl = None
        elif upper == 'H':
            cur = [number() + ox, cur[1]]
            out.append(('L', list(cur)))
            last_ctrl = None
        elif upper == 'V':
            cur = [cur[0], number() + oy]
            out.append(('L', list(cur)))
            last_ctrl = None
        elif upper == 'C':
            a = [number() for _ in range(6)]
            pts = [a[0] + ox, a[1] + oy, a[2] + ox, a[3] + oy, a[4] + ox, a[5] + oy]
            out.append(('C', pts))
            last_ctrl = [pts[2], pts[3]]
            cur = [pts[4], pts[5]]
        elif upper == 'S':
            a = [number() for _ in range(4)]
            c1 = [2 * cur[0] - last_ctrl[0], 2 * cur[1] - last_ctrl[1]] if last_cmd in 'CS' and last_ctrl else list(cur)
            pts = [c1[0], c1[1], a[0] + ox, a[1] + oy, a[2] + ox, a[3] + oy]
            out.append(('C', pts))
            last_ctrl = [pts[2], pts[3]]
            cur = [pts[4], pts[5]]
        elif upper == 'Q':
            a = [number() for _ in range(4)]
            pts = [a[0] + ox, a[1] + oy, a[2] + ox, a[3] + oy]
            out.append(('Q', pts))
            last_ctrl = [pts[0], pts[1]]
            cur = [pts[2], pts[3]]
        elif upper == 'T':
            a = [number() for _ in range(2)]
            c1 = [2 * cur[0] - last_ctrl[0], 2 * cur[1] - last_ctrl[1]] if last_cmd in 'QT' and last_ctrl else list(cur)
            pts = [c1[0], c1[1], a[0] + ox, a[1] + oy]
            out.append(('Q', pts))
            last_ctrl = c1
            cur = [pts[2], pts[3]]
        elif upper == 'A':
            rx, ry, rot = number(), number(), number()
            large, sweep = flag(), flag()
            cur = [number() + ox, number() + oy]
            out.append(('A', [rx, ry, rot, large, sweep, cur[0], cur[1]]))
            last_ctrl = None
        else:
            raise ValueError(f'unknown command {cmd!r}')
        last_cmd = upper
    return out


def bounds(segments):
    xs, ys = [], []
    for cmd, a in segments:
        if cmd in 'ML':
            xs.append(a[0]); ys.append(a[1])
        elif cmd == 'C':
            xs += [a[0], a[2], a[4]]; ys += [a[1], a[3], a[5]]
        elif cmd == 'Q':
            xs += [a[0], a[2]]; ys += [a[1], a[3]]
        elif cmd == 'A':
            xs.append(a[5]); ys.append(a[6])
    return min(xs), min(ys), max(xs), max(ys)


def placed(d, size, cx, cy):
    """The mark, scaled to `size` on its longest side and centred on (cx, cy)."""
    segments = absolute(d)
    x0, y0, x1, y1 = bounds(segments)
    k = size / max(x1 - x0, y1 - y0)
    mx, my = (x0 + x1) / 2, (y0 + y1) / 2
    n = lambda v: f'{round(v, 2):g}'  # noqa: E731
    X = lambda x: n(cx + (x - mx) * k)  # noqa: E731
    Y = lambda y: n(cy + (y - my) * k)  # noqa: E731
    out = ''
    for cmd, a in segments:
        if cmd == 'Z':
            out += 'Z'
        elif cmd in 'ML':
            out += f'{cmd}{X(a[0])} {Y(a[1])}'
        elif cmd == 'C':
            out += f'C{X(a[0])} {Y(a[1])} {X(a[2])} {Y(a[3])} {X(a[4])} {Y(a[5])}'
        elif cmd == 'Q':
            out += f'Q{X(a[0])} {Y(a[1])} {X(a[2])} {Y(a[3])}'
        elif cmd == 'A':
            out += f'A{n(a[0] * k)} {n(a[1] * k)} {n(a[2])} {a[3]} {a[4]} {X(a[5])} {Y(a[6])}'
    return out


# name of the icon -> (key in brands.json, how it is called, aliases, extra keywords)
BRANDS = {
    'brand-apple': ('apple', 'Apple', ['apple-brand-logo'], ['ios', 'mac']),
    'brand-anthropic': ('anthropic', 'Anthropic', [], ['ai', 'claude']),
    'brand-aws': ('aws', 'Amazon Web Services', [], ['cloud', 'amazon']),
    'brand-chrome': ('chrome', 'Google Chrome', [], ['browser', 'google']),
    'brand-cursor': ('cursor', 'Cursor', [], ['editor', 'ai']),
    'brand-gemini': ('gemini', 'Google Gemini', [], ['ai', 'google']),
    'brand-google': ('google', 'Google', [], ['search', 'sign in']),
    'brand-lmstudio': ('lmstudio', 'LM Studio', [], ['ai', 'local']),
    'brand-nextjs': ('nextjs', 'Next.js', [], ['framework', 'react']),
    'brand-notion': ('notion', 'Notion', [], ['notes', 'docs']),
    'brand-ollama': ('ollama', 'Ollama', [], ['ai', 'local']),
    'brand-openai': ('openai', 'OpenAI', [], ['ai', 'chatgpt']),
    'brand-paypal': ('paypal', 'PayPal', [], ['payment', 'money']),
    'brand-qwen': ('qwen', 'Qwen', [], ['ai', 'alibaba']),
    'brand-railway': ('railway', 'Railway', [], ['hosting', 'deploy']),
    'brand-react': ('react', 'React', ['brand-react-native'], ['framework', 'javascript']),
    'brand-stripe': ('stripe', 'Stripe', [], ['payment', 'checkout']),
    'brand-telegram': ('telegram', 'Telegram', [], ['chat', 'messaging']),
    'brand-threads': ('threads', 'Threads', [], ['social', 'meta']),
    'brand-twitch': ('twitch', 'Twitch', [], ['stream', 'video']),
    'brand-vercel': ('vercel', 'Vercel', [], ['hosting', 'deploy']),
    'brand-windows': ('windows', 'Windows', [], ['microsoft', 'os']),
    'brand-wordpress': ('wordpress', 'WordPress', [], ['cms', 'blog']),
    'brand-zoom': ('zoom', 'Zoom', [], ['video', 'meeting']),
    'brand-discord': ('discord', 'Discord', ['discord'], ['chat', 'community']),
    'brand-docker': ('docker', 'Docker', ['docker'], ['container', 'devops']),
    'brand-facebook': ('facebook', 'Facebook', ['facebook'], ['social', 'meta']),
    'brand-figma': ('figma', 'Figma', ['figma'], ['design', 'prototype']),
    'brand-github-copilot': ('github-copilot', 'GitHub Copilot', ['github-copilot'], ['ai', 'code']),
    'brand-github': ('github', 'GitHub', ['github'], ['code', 'repository']),
    'brand-gitlab': ('gitlab', 'GitLab', ['gitlab'], ['code', 'repository']),
    'brand-gmail': ('gmail', 'Gmail', ['gmail'], ['email', 'google']),
    'brand-go': ('golang', 'Go', ['golang'], ['language', 'code']),
    'brand-instagram': ('instagram', 'Instagram', ['instagram'], ['social', 'photo']),
    'brand-javascript': ('javascript', 'JavaScript', ['javascript'], ['language', 'code']),
    'brand-linkedin': ('linkedin', 'LinkedIn', ['linkedin'], ['social', 'work']),
    'brand-mysql': ('mysql', 'MySQL', ['mysql'], ['database', 'sql']),
    'brand-nodejs': ('nodejs', 'Node.js', ['nodejs'], ['runtime', 'javascript']),
    'brand-pinterest': ('pinterest', 'Pinterest', ['pinterest'], ['social', 'images']),
    'brand-python': ('python', 'Python', ['python'], ['language', 'code']),
    'brand-slack': ('slack', 'Slack', ['slack'], ['chat', 'work']),
    'brand-snapchat': ('snapchat', 'Snapchat', ['snapchat'], ['social', 'photo']),
    'brand-spotify': ('spotify', 'Spotify', ['spotify'], ['music', 'audio']),
    'brand-twitter': ('twitter', 'Twitter', ['twitter'], ['social', 'bird']),
    'brand-x': ('x', 'X', ['twitter-x'], ['social', 'twitter']),
    'brand-typescript': ('typescript', 'TypeScript', ['typescript'], ['language', 'code']),
    'brand-whatsapp': ('whatsapp', 'WhatsApp', ['whatsapp'], ['chat', 'messaging']),
    'brand-youtube': ('youtube', 'YouTube', ['youtube'], ['video', 'stream']),
}

data = json.load(open(os.path.join(os.path.dirname(__file__), 'brands.json'), encoding='utf-8'))
for name, (key, title, aliases, extra) in BRANDS.items():
    d = placed(data[key]['d'], 30, 48, 40)
    slug = name[len('brand-'):]
    keywords = [slug.replace('-', ' '), 'brand', 'logo', *extra, 'marque', 'logo de marque']
    alias_line = f"\n  aliases: [{', '.join(repr(a) for a in aliases)}]," if aliases else ''
    body = f"""// Generated by tools/brands/build.py. Do not edit.
// The {title} mark is a trademark of its owner; its outline comes from Simple Icons (CC0).
import {{ icon, inset, part, path, pill, plain, pop, raised, rect }} from '@triolet/core';

export default icon({{
  name: '{name}',{alias_line}
  category: 'brands',
  keywords: [{', '.join(repr(k) for k in keywords)}],
  gesture: 'The {title} mark pops on its key.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(rect(22, 22, 52, 52, 10, 'main')),
    inset(pill(30, 62, 36, 7, 'accent')),
    part('mark', plain(path('{d}', 'on'))),
  ],
  motion: {{
    mark: pop({{ scale: 1.12, duration: 450, pivot: [48, 40] }}),
  }},
}});
"""
    open(os.path.join(ROOT, 'icons', name + '.ts'), 'w', encoding='utf-8', newline='\n').write(body)
print(len(BRANDS), 'brand icons written')
