---
name: triolet-icon
description: Draw a new icon for the Triolet library (animated icons in three colours) or fix an existing one. Use when asked to add, draw, redraw or review a Triolet icon, in a clone of the Triolet repository. Covers the brief, the drawing in `icons/<name>.ts`, the gesture, the checks and the control sheet.
---

# Drawing a Triolet icon

A Triolet icon is one TypeScript file, `icons/<name>.ts`: a few shapes on a 96 × 96 grid, each
with a colour role, some of them named as moving parts, and one gesture. Everything else
(model, SVG, packages, website) is generated from it.

You work in a clone of the repository, with `pnpm install` done. Follow the steps in order. Do
not skip the control sheet: an icon that passes the checks can still be ugly, and only looking
at it tells.

## 1. Check the icon does not exist

```bash
ls icons/ | grep -i <word>
grep -l -i "'<word>'" icons/*.ts        # as a keyword or an alias
```

If an icon already covers the idea, improve it or add an alias instead of drawing a twin.

## 2. Write the brief, before any shape

Four lines, for yourself (they become the `gesture` and guide the drawing):

- **What it stands for**, and the one object that says it (a bell, not "notifications").
- **Its parts**: at most five or six shapes. Which is the body, which is the detail?
- **Its colours**: which shape is `base`, which is `main`, and the ONE thing that is `accent`.
- **What moves, and why**: one part, one gesture, that tells what the icon is for (the bell
  rings; the lock's shackle closes). Not decoration.

## 3. Draw it

```bash
pnpm icon:new <name>      # writes icons/<name>.ts from a template
```

Finish one icon before starting the next. Then edit the file. Read `references/drawing-guide.md` first (grid, keyline shapes, colour
roles, relief, sizes) and `references/gestures.md` (the ten gestures). `references/examples.md`
shows five icons from brief to file.

## 4. Check it

```bash
pnpm icon:check <name>
```

The check reads `icons/<name>.ts` directly: no need to compile first. Fix every **error**. Read every **warning**: colours far from the others, a silhouette outside
the keyline shapes, a detail too thin for 24 px, a gesture too long. A warning may stand if you
looked and it is right; an error may not.

## 5. Look at it

```bash
pnpm icon:sheet <name>    # out/sheets/<name>.png
```

Open the image and look at it. Ask, in this order:

1. At **24 px**, do I still know what it is? If not, there are too many parts or they are too small.
2. At **96 px**, is it balanced: centred, not top-heavy, no shape touching another by accident?
3. Is the **accent** the first thing the eye lands on, and the thing the icon is about?
4. In the **eight frames of the gesture**, does the part move around the right point, stay
   inside the picture, and end where it started?
5. Next to the others, is it the **same size and weight**? `pnpm icon:sheet --group <name> bell-ring file-text credit-card`
   puts it beside three references, at rest, at 24 px and in mid-gesture (`--all` shows the whole set, small).

Fix and repeat steps 4 and 5 until every answer is yes. Two or three rounds are normal.

## 6. Finish

- **Keywords**: at least four, lower case, what people would type (include a French word or
  two if natural). **Category**: one of the list in the drawing guide; take the closest when none fits exactly.
- `pnpm icons` compiles every icon into `model/` and `svg/` (commit those generated files).
- `pnpm test` must pass.
- One pull request per icon or per small family, with the control sheet attached.

## Rules that are easy to forget

- One accent per icon, on what the icon is about. Never more accent than `main`.
- Every icon moves, and comes back exactly to rest.
- Nothing closer than 8 units to the edge of the grid; the silhouette inside the keyline shapes.
- No line thinner than 3 units, no detail smaller than 3 units.
- Names are English, kebab-case, the commonest word for the object (`bell`, `shopping-cart`).
