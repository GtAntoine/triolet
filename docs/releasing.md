# Releasing

`triolet`, `triolet-react` and `triolet-react-native` are released together, at the same
version. They are on npm since 0.1.0 (12 November 2026), published by the `Release` workflow.

## One-time setup (the maintainer, on npmjs.com)

1. An npm account with two-factor authentication on.
2. The names are unscoped (`triolet`, `triolet-react`, `triolet-react-native`): no organisation
   is needed.
3. For the workflow, **Trusted Publishing** (no token): on npmjs.com, for each of the three
   packages, open the package, then Settings, Trusted Publisher, choose **GitHub Actions** and
   fill in:
   - Organization or user: `GtAntoine`
   - Repository: `triolet`
   - Workflow filename: `release.yml`
   - Environment: leave empty

   Save. From then on npm accepts a publish made by that workflow of that repository (the job has
   `id-token: write`), with provenance, and nothing has to be stored or renewed. Tokens that
   bypass two-factor authentication are being restricted by npm (account changes in August 2026,
   direct publishing revoked in January 2027), which is why this replaces them.
4. No token is stored: the workflow does not read `NPM_ACCESS_TOKEN`. If Trusted Publishing ever
   fails, publish by hand (below) instead of putting a token back.

## A release

```bash
git switch main && git pull
pnpm release:bump 0.2.0       # or patch | minor | major: sets the version of the three packages
# write the "## 0.2.0" section of CHANGELOG.md
pnpm build && pnpm test
pnpm release:check            # packs the three packages, checks versions, contents, workspace ranges
git commit -am "Release 0.2.0"
git push
git tag v0.2.0 && git push origin v0.2.0
```

The tag starts the `Release` workflow: it checks that the tag is on `main`, runs the checks and
the tests again, then publishes the three packages with `--provenance` (the npm page shows the
commit and workflow each version came from). It needs Trusted Publishing to be set on the three packages . npm may take several minutes after the workflow ends before `npm view triolet version`
shows the new version; an install made in between can be retried with `--prefer-online`.

## By hand, without the workflow

```bash
pnpm build && pnpm release:check
pnpm --filter triolet publish --access public --otp <code>
pnpm --filter triolet-react publish --access public --otp <code>
pnpm --filter triolet-react-native publish --access public --otp <code>
```

`pnpm publish` rewrites the `workspace:` ranges to real versions (`pnpm release:check` verifies
the packed result). Publish `triolet` first: the other two depend on it. The packages in
`out/packs/` are what would be published; to look at one:
`pnpm --filter triolet publish --dry-run`.

## If a release stops half way

npm refuses to publish a version twice, so the workflow skips a package whose version is
already on the registry: run the failed workflow again (Actions, Re-run jobs) and it publishes
only what is missing. By hand, publish the missing packages of the same version as above. Do
not bump the version for that. A published version cannot be replaced, only
deprecated (`npm deprecate triolet@0.2.0 "reason"`) and followed by a patch.

## What `@triolet/core` is

The private workspace package `@triolet/core` (the icon model, drawing language and renderers)
is compiled into `triolet` and reached as `triolet/core`; it is not published on its own.
