# Catalogue

`catalogue.json` ranks icon ideas by how many of five open icon sets draw them (Lucide, Tabler,
Phosphor, Heroicons, Material Symbols): what every set has is what people look for first. It is
written by `node tools/catalogue.ts`, which also cuts the list into lots.

- `lot 0`: already drawn.
- `lot 1`: completes the first 150 icons. `lot 2` onwards: a hundred each.

Within one rank (the same number of sets) the tool sorts by name; the choice inside a rank is
made by hand, for usefulness. Lot 1 took every idea present in all five sets, then the most
useful ones of those present in four.

Each lot is drawn nine icons at a time: `node tools/board.ts <n> <nine names>` asks Codex for a
reference board in the house style (a sketch of ideas, never the source), then each icon is
drawn by code in `icons/<name>.ts` and checked (`pnpm icon:check`, `pnpm icon:sheet`).
