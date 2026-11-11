# Triolet

Animated icons in three colours, for the web, React and React Native.

Every icon is drawn on a 96 × 96 grid in three colours you set — `base` (60 %), `main` (30 %)
and `accent` (10 %) — with a soft relief, and every icon moves: one small gesture that says
what the icon is for.

> Work in progress. Nothing is published yet.

## Layout

```
icons/<name>.ts      the source of an icon: drawing, moving parts, gesture, keywords
model/<name>.json    generated: the model every renderer reads
svg/<name>.svg       generated: a standalone file in the default colours
packages/core/       icon model, drawing language, colours, motion, SVG renderer
tools/               build, pixel comparison with reference files
reference/pictos/    the original files of the first 31 icons (comparison only)
```

## Commands

```bash
pnpm install
pnpm icons        # compile icons/*.ts into model/ and svg/
pnpm test         # unit tests, generated files up to date, pixel comparison
pnpm typecheck
```

Node 24 or later: the sources are TypeScript run as is.
