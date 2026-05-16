# Plan: Upgrade Expo SDK 52 → 55, migrate to expo-router en route

## Context

The project is on Expo SDK 53 (RN 0.79.6, React 19.0.0, react-native-paper@5)
after the SDK 51, 52, and 53 upgrades all landed on `master`. Goal: reach
the latest stable Expo SDK and switch from React Navigation to Expo Router
(file-based routing).

Latest at time of writing (2026-05-16):

- **SDK 55** — released 2026-02-25, RN 0.83, React 19.2.0 _(target landing)_
- **SDK 56 beta** — 2026-05-06, deferred until stable

Constraints carried over from the SDK 51 plan:

- `npm run test` must pass after each step (`lint` + `jest` + Maestro smoke
  flows on iOS, Android, web).
- No tree-level regressions outside what the SDK change itself explains —
  protected by the Jest structural snapshots in
  `components/__snapshots__` and `screens/__snapshots__`.

## Overall sequence

| Step | From → to | Status | Notes |
|---|---|---|---|
| 1 | SDK 52 → 53 | ✅ done (commit `31cb734`) | RN 0.79.6, React 19.0.0, Node 20.18+, Xcode 16+, Android compileSdk 35 |
| 2 | SDK 53 → 54 | ✅ done (commit 30a319f) | RN 0.81, React 19.1, Xcode 16.1+, Android compileSdk 36; introduces Native Tabs |
| 3 | **Migrate to expo-router** | ✅ done (commit 30a319f) | Done on SDK 54; details below |
| 4 | SDK 54 → 55 | ✅ done | RN 0.83, React 19.2, Xcode 26.2+ |
| 5 | _(deferred)_ SDK 55 → 56 | pending | SDK 56 is still beta — revisit when stable |
Commit each step in Git to master branch. Don't create separate branches.

Per-step verification gate (every numbered step):

Note: When running smoke tests `npm run test:smoke:*` show the output in the Claude cli and in the Claude app.

1. `npx expo install expo@^X.0.0 --fix` → align managed deps
2. Hand-bump dev-deps not handled by `expo install --fix`:
   `babel-preset-expo`, `jest-expo`, `@types/react`, `react-test-renderer`,
   `typescript`
3. `npm run upgrade` → pulls everything to the latest matching minor.
   **Important:** this can over-bump RN's `0.x.y` versioning (`--target minor`
   treats `0.85` as a minor bump from `0.79`). Re-run `npx expo install --fix`
   afterwards to pin RN / Paper / react-native-* back to the versions
   expo-doctor expects for the target SDK.
4. `npx expo-doctor` → 0 issues
5. `npm run lint` → clean
6. `npm run test:jest` → all green (refresh snapshots only when the SDK
   change alone explains the diff)
7. `npm run test:smoke:web` green
8. `npm run test:smoke:ios` green
9. `npm run test:smoke:android` green
10. One commit per step: `chore: upgrade to Expo SDK X`, committed directly
   to `master` (no feature branches in this repo).

## When (and why) to migrate to expo-router

**Migrate on SDK 54**, between Step 2 and Step 4. Reasons:

- **Not earlier (52 / 53):** mixing the migration into an SDK bump entangles
  two large diffs. Keeping each SDK step as React-Navigation-only makes
  bisection cheap if anything regresses.
- **Not last (after 55):** React Navigation v7 lands in SDK 54.
  Migrating _on_ SDK 54 means we ride React Navigation v7 only briefly,
  instead of doing the React-Navigation 6→7 cleanup at SDK 54 and then
  ripping it out entirely a step later.
- **SDK 54 specifically:** Native Tabs are introduced this SDK and are
  exposed cleanly by expo-router. The project doesn't currently use tabs
  in the main flow, but landing on the file-based router on the SDK that
  finalises the routing primitives keeps the diff small and durable.
- **The migration itself is cheap here:** 3 screens, one nested stack for
  the per-question pager. Estimated effort: half a day.

The [official migration guide][migrate] is the source of truth.

## Per-step risks

| Step | Likely friction | Mitigation |
|---|---|---|
| 52 → 53 _(done)_ | React 19's `@types/react` drops the global `JSX` namespace, breaking every `: JSX.Element` return type. Expo's `tsconfig.base` switched to `moduleResolution: "bundler"` + `customConditions`, which conflicts with the local `moduleResolution: "node"` override. Android Gradle build failed because homebrew's `ccache` was still linked against `libfmt.11.dylib` after a local fmt 12 upgrade — **unrelated to SDK 53** but worth knowing. | Replace `JSX.Element` with `React.JSX.Element` across files. Drop the `moduleResolution` line from `tsconfig.json`. For the ccache crash on Android: `brew update && brew install ccache` relinks against fmt 12. |
| 53 → 54 | Largest jump: RN 0.81 / React 19.1, Android compileSdk 36, Xcode 16.1+. Re-test `react-native-paper@5` peer-dep alignment. fmt-consteval issue is fixed in RN 0.81 upstream. | Plan to delete `plugins/with-fmt-consteval-fix.js` here; if it's the only thing blocking iOS smoke, that's the diagnostic. |
| expo-router migration (on SDK 54) | See sub-plan below. | Run Maestro flows after migration — text assertions are unchanged, so flows should keep working without recording new baselines. |
| 54 → 55 | Smaller diff once on expo-router. Xcode 26.2+ becomes hard requirement. | None expected beyond the standard gate. |

## expo-router migration sub-plan

Current navigation: `navigation/index.tsx` defines a Root native-stack
with `HomeScreen`, `QuestionsScreen`, `ResultsScreen`. `QuestionsScreen`
contains a nested native-stack for the per-question screens.

### Proposed file layout

```text
app/
  _layout.tsx          # PaperProvider, SafeAreaProvider, QuestionsProvider, root Stack
  index.tsx            # HomeScreen body
  questions/
    _layout.tsx        # nested Stack for the per-question pages
    [id].tsx           # one Question, id via useLocalSearchParams()
  results.tsx          # ResultsScreen body
```

### Concrete changes

- `package.json` `main`: `node_modules/expo/AppEntry.js` → `expo-router/entry`.
- `app.json` `plugins`: add `"expo-router"`.
- `app.json` `experiments`: add `"typedRoutes": true` to keep route strings
  type-checked.
- Delete `App.tsx` and `navigation/`; move provider tree into
  `app/_layout.tsx`.
- Replace `navigation.navigate('Questions')` → `router.push('/questions/1')`.
- Replace `navigation.navigate('Results')` → `router.push('/results')`.
- `route.params` → `useLocalSearchParams()`.
- `useNavigation()` from `@react-navigation/native` still works through
  expo-router but is rarely needed.
- Maestro flows: text assertions (`"Welcome to..."`, `"BEGIN"`,
  `"PLAY AGAIN?"`) are unchanged, so flows should keep passing without
  re-recording.
- Jest tests: rewrap component-level snapshot tests to use the new layout
  composition, or keep them provider-agnostic.

### Gotchas

- Don't `return null` from `app/_layout.tsx` while assets load — breaks
  static web render. Use the splash-screen API or a guard pattern.
- expo-router doesn't auto-install `react-native-gesture-handler`; if any
  swipe gesture is used (Results scroll uses one), declare it explicitly.
- The `<NavigationContainer theme>` config that lived in `navigation/`
  is replaced by wrapping with `ThemeProvider` from
  `expo-router/react-navigation`.

## Verification gate (whole journey)

Done when, on SDK 55 with expo-router:

- `npx expo-doctor` reports 0 issues
- `npm run lint` clean
- `npm run test:jest` — all tests + snapshots stable (22 tests / 15
  snapshots as of SDK 53)
- `npm run test:smoke:web` green
- `npm run test:smoke:ios` green
- `npm run test:smoke:android` green
- `app/` is the only routing source of truth
- `App.tsx`, `navigation/`, and any manual `Stack.Navigator` call sites
  are gone
- `plugins/with-fmt-consteval-fix.js` is removed (or proven still needed
  and documented)

## Follow-up (not in this plan)

- SDK 55 → 56 once SDK 56 leaves beta.
- Replace `react-native-paper@5` MD3 components with `@expo/ui` primitives
  if the project grows past Paper's ergonomics — the work is now bounded
  by the Jest structural snapshots added in the SDK 51 step.

[migrate]: https://docs.expo.dev/router/migrate/from-react-navigation/
