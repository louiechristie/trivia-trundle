# Plan: Upgrade Expo SDK 50 → 51

## Context

The project is currently on Expo SDK 50 (`expo: ^50.0.21`, RN 0.73.6, React 18.2). The eventual goal is to land on the latest Expo SDK using the layout from [`expo-template-tabs`](https://github.com/expo/expo/tree/main/templates/expo-template-tabs) — but this plan covers a single-step intermediate landing at SDK 51 first.

Constraints for this step:

- `npm run test` must pass after the upgrade (`lint` + `jest` + Maestro smoke tests on iOS, Android, web).
- **No tree-level regressions** — protected by Jest structural snapshot tests captured _before_ the upgrade.
- Provide pros/cons of removing `react-native-paper` (used in 8 files; see analysis below).
- Consider a script to recreate `ios/` and `android/` after upgrade.

The repo uses **Continuous Native Generation** — `ios/` and `android/` are git-ignored, so we never edit native files manually. `eas build --local` and `expo prebuild` regenerate them.

## SDK 51 breaking changes that affect this project

Source: <https://expo.dev/changelog/2024-05-07-sdk-51>.

| Change | Affects us? | Action |
|---|---|---|
| **RN 0.74 required** | Yes | Bump `react-native` to `0.74.5` plus the aligned RN community packages. |
| **Yoga 3.0 layout engine** | Yes | No code change required. Jest structural snapshots catch any tree-level shifts. |
| **Xcode 15.3 recommended for iOS builds** | Yes | Confirm local Xcode `xcodebuild -version` ≥ 15.3 before running `npm run test:smoke:ios`. |
| **Apple Privacy Manifest** | Partial | Required for App Store submissions. Not blocking for local Maestro smoke tests on simulator, but we should still add a stub. Add `expo-build-properties` with `ios.privacyManifests` config or set `ios.privacyManifests` in `app.json` (the app doesn't use any restricted-reason APIs, so a near-empty manifest is fine). |
| `expo-camera` / `expo-sqlite` moved to `/legacy` | No | Not used. |
| `hooks` field removed from `app.json` | No | Not used. |
| `runtimeVersion: fingerprintExperimental` → `fingerprint` | No | We use `policy: appVersion`. |
| `sentry-expo` deprecated → `@sentry/react-native` | No | Not used. |
| Google Maps removed from Expo Go (iOS) | No | Not used. |
| Notifications entitlement change | No | Not used. |
| Single SDK per Expo Go release | Yes (DX only) | If you use Expo Go for dev, install the SDK 51 build from `expo.dev/go`. |

The main concern is **Xcode/Privacy Manifest** for iOS builds.

## Snapshot tests — capture baseline BEFORE the upgrade

The whole point: take a frozen reference of how the app renders on SDK 50, then re-run after upgrading and assert nothing changed.

### Tool comparison

| Tool | What it captures | What it diffs | Maintained 2026 | Fit here |
|---|---|---|---|---|
| **Jest `toMatchSnapshot()`** (`react-test-renderer` / `@testing-library/react-native`) | Serialized React tree (component names, props, children) | Text diff of serialized JSON | Yes (jest-expo bundles it) | **Recommended** — cheap, runs in `npm run test:jest`, catches accidental component/prop changes from Paper or Yoga. |
| **Maestro `takeScreenshot` + image diff script** | PNG of device screen (real renderer) | **Nothing built-in** — you supply your own diff (e.g. `pixelmatch` or `odiff-bin`) | Maestro yes; diff is just an npm dep | Skip for this upgrade — would require canned data, a diff script, baseline images per platform, and a ~10-min `eas build --local` per platform per run. Not worth the setup for a one-shot SDK bump. |
| **Playwright `toHaveScreenshot()`** (web only) | Browser PNG | Built-in pixel diff with tolerance & per-platform baselines | Yes, mature | Skip — only covers web; we already have a Maestro web smoke flow. |
| **Storybook + Loki** | Storybook stories rendered in simulator | Pixel diff locally | Loki maintenance has been quiet through 2025–2026 | Skip — overkill for an 8-component app and adds a Storybook setup. |
| **Chromatic** (cloud) | Storybook stories | Cloud pixel diff with review UI | Yes, paid | Skip — requires Storybook and a paid plan for a one-shot upgrade gate. |
| **Applitools / Percy** (cloud) | Any screenshot | AI-aware visual diff | Yes, paid | Skip — overkill and paid. |
| **react-native-owl** | RN component PNG | Local pixel diff | Effectively unmaintained | Avoid. |

### Strategy: Jest structural snapshots

Established **before** touching any version numbers. Catches React-tree regressions (including Paper component reshuffles and structural changes from Yoga 3).

A few-pixel `flex`/`gap` shift from Yoga 3 that doesn't change the serialized tree is acceptable and not treated as a regression — that's why this plan uses tree-level Jest snapshots rather than pixel-level image diffs.

Add `@testing-library/react-native` and `react-test-renderer` to devDependencies (jest-expo already pairs cleanly with both). Test files:

- `screens/HomeScreen.test.tsx` — render with `<PaperProvider theme={Colors.light}>` and `<PaperProvider theme={Colors.dark}>`; `expect(toJSON()).toMatchSnapshot()` for each.
- `screens/QuestionsScreen.test.tsx` — wrap in `QuestionsProvider` with seeded test data from `data/QuestionsTestData.ts`; snapshot empty, loading, and error states.
- `screens/ResultsScreen.test.tsx` — seeded final-state context; snapshot light + dark + empty.
- `components/Header.test.tsx`, `components/Question.test.tsx`, `components/Credits.test.tsx` — snapshot each in both themes.

Commit the generated `.snap` files. After upgrading, `npm run test:jest` will fail loudly on any tree change; `jest -u` regenerates if the change is intentional.

### Deterministic smoke tests (related but separate)

To keep Maestro smoke tests off the live trivia API (rate limits, flakes), the questions provider reads `process.env.EXPO_PUBLIC_USE_TEST_QUESTIONS === '1'` at build time and dispatches canned data from `data/QuestionsTestData.ts`. `EXPO_PUBLIC_*` vars are inlined by `babel-preset-expo`, so the flag is baked into the bundle and Metro/Terser dead-code-eliminates the API branch.

> **Note** — an earlier attempt used `Constants.expoConfig.extra.useTestQuestions` from `app.json`, but Expo SDK 50's web export filters `extra` to a known subset (only `eas` and a few others), stripping custom keys. The `EXPO_PUBLIC_*` env-var path is the documented mechanism and works across all three platforms.

The env var is set on the `test:smoke:{ios,android,web}` scripts in `package.json`. No additional snapshot scripts are needed.

## react-native-paper: keep or remove?

Paper is imported by 8 files: `App.tsx`, `constants/Colors.ts`, all three screens (`HomeScreen`, `QuestionsScreen`, `ResultsScreen`), and three components (`Header`, `Question`, `Credits`). Components used: `Provider`, `DefaultTheme`/`DarkTheme`, `Button`, `Title`, `Paragraph`, `Surface`, `Appbar`, `ActivityIndicator`, `List`, `TouchableRipple`, `useTheme`. `babel.config.js` also registers `react-native-paper/babel` for production tree-shaking.

**Pros of removing Paper**

- Eliminates a heavy dependency that lags Expo SDK releases (Paper v4 is RN 0.71-era; v5 introduces MD3 with major API/theme breakage).
- Smaller bundle and one less library to track on future Expo upgrades (including the eventual `expo-template-tabs` jump).
- Drops the production-only Babel plugin, simplifying `babel.config.js`.
- Better alignment with `expo-template-tabs`, which uses Expo's own UI primitives — removing Paper now means the _next_ upgrade is much smaller.
- Frees us from Paper's theming model; `useColorScheme` + React Navigation theme is sufficient for this app's scope.
- Removes peer-dep noise when bumping React Native.

**Cons of removing Paper**

- Touches every screen and most components — high diff surface for what is meant to be a focused SDK bump.
- "No visual regressions" is hard to guarantee: Paper's `Button`, `Appbar`, `TouchableRipple`, etc. have ripple effects, padding, typography, and elevation that aren't trivially reproduced with bare RN primitives.
- Increases risk that Maestro smoke tests need re-recording (selectors match on rendered text/structure).
- Doubles the size of this work item — couples a dependency removal to an SDK bump, making bisection harder if something breaks.
- Paper v4 still functions on RN 0.74 / Expo 51 (peer-dep warnings only). Nothing forces the removal _now_.

**Recommendation:** **Keep `react-native-paper` v4** for this SDK 51 step. Defer the Paper removal to the follow-on upgrade where we adopt `expo-template-tabs` — that's the natural moment to swap components, because we'll be rewriting layouts anyway. This protects the "no visual regressions" constraint and keeps the diff bounded.

## Native directories (ios/ + android/) script

`ios/` and `android/` are git-ignored (CNG). They are _not_ used by `npm run test` — `build:ios` / `build:android` run `eas build --local`, which prebuilds in its own sandbox. The local copies are leftover from past `expo run:*` invocations.

We don't strictly need to delete them, but a clean regenerate is cheap insurance against stale native config after the SDK bump. Add an npm script:

```jsonc
"prebuild:clean": "rm -rf ios android && npx expo prebuild --clean"
```

`expo prebuild --clean` already wipes the dirs first, so the `rm -rf` is belt-and-braces. Run it once after the upgrade if you intend to use `expo run:ios` / `expo run:android` locally; otherwise it's optional.

## Target versions (Expo SDK 51 matrix + RN upgrade helper 0.73.6 → 0.74.5)

`package.json` `dependencies`:

- `expo`: `~51.0.39`
- `@expo/metro-runtime`: `~3.2.3`
- `expo-asset`: `~10.0.10`
- `expo-constants`: `~16.0.2`
- `expo-font`: `~12.0.10`
- `expo-linking`: `~6.3.1`
- `expo-splash-screen`: `~0.27.7`
- `expo-status-bar`: `~1.12.1`
- `expo-updates`: `~0.25.27`
- `expo-web-browser`: `~13.0.3`
- `react`: `18.2.0` (unchanged)
- `react-dom`: `18.2.0` (unchanged)
- `react-native`: `0.74.5`
- `react-native-gesture-handler`: `~2.16.1`
- `react-native-pager-view`: `6.3.0`
- `react-native-reanimated`: `~3.10.1`
- `react-native-safe-area-context`: `4.10.5`
- `react-native-screens`: `~3.31.1`
- `react-native-web`: `~0.19.10`
- `react-native-paper`: `^4.12.8` (unchanged)
- `react-native-tab-view`: `^3.5.2` (unchanged)
- `@react-navigation/*`: keep as-is
- `@react-native-vector-icons/*`: keep as-is
- `axios`, `html-entities`: unchanged

`package.json` `devDependencies`:

- `babel-preset-expo`: `~11.0.15`
- `jest-expo`: `~51.0.4`
- `@types/react`: `~18.2.79`
- New (already installed in Phase A): `@testing-library/react-native`, `react-test-renderer`

Source of truth: run `npx expo install --check` after the `expo` bump and let it print the exact pinned versions Expo 51 expects.

## Step-by-step plan

Run all steps from the project root.

### Phase A — Baseline snapshots on SDK 50 (done)

1. `git checkout -b upgrade/expo-51`.
2. Install snapshot deps: `npm install --save-dev @testing-library/react-native react-test-renderer`.
3. Write the Jest snapshot test files (screens + components, light + dark). Run `npm run test:jest` once to generate `.snap` files. Commit them.
4. Add the canned-data branch to `context/QuestionsContext.tsx`: `const USE_TEST_QUESTIONS = process.env.EXPO_PUBLIC_USE_TEST_QUESTIONS === '1'`. When true, dispatch `TestQuestions` synchronously instead of calling `questionsAPI.get('')`. Inline `EXPO_PUBLIC_USE_TEST_QUESTIONS=1` on each `test:smoke:*` script so Maestro flows use deterministic canned data.

### Phase B — The upgrade

5. Bump Expo: `npm install expo@~51.0.39`.
6. Align Expo-managed deps: `npx expo install --fix`.
7. Bump Expo-adjacent dev deps manually: edit `package.json` for `babel-preset-expo: ~11.0.15`, `jest-expo: ~51.0.4`. Then `rm -rf node_modules package-lock.json && npm install`.
8. `npx expo-doctor` — fix any reported mismatches with `npx expo install --check`.
9. `babel.config.js`: no change (Paper v4 still ships the babel plugin).
10. `app.json`: add minimal iOS Privacy Manifest stub (no restricted-reason APIs are used, so an empty `NSPrivacyAccessedAPITypes` array is sufficient). Confirm `runtimeVersion.policy: appVersion` stays unchanged.
11. Optional: add `"prebuild:clean": "rm -rf ios android && npx expo prebuild --clean"` script. Run it once if you use `expo run:*` locally.

### Phase C — Verification

12. `npm run test:jest` — snapshot tests catch any tree-level regression.
13. `npm run lint`.
14. `npm run test:smoke:web` → `test:smoke:ios` → `test:smoke:android`.
15. `npm run test` (the composite).
16. Manual visual pass: Home / Questions / Results in light + dark on all three platforms.

### Phase D — Commit

17. Suggested split:
    - `test: add Jest snapshot tests for tree-level regressions` (Phase A).
    - `chore: upgrade to Expo SDK 51` (Phases B–C).

## Files touched

New (added in Phase A):

- `screens/HomeScreen.test.tsx`, `screens/QuestionsScreen.test.tsx`, `screens/ResultsScreen.test.tsx`
- `components/Header.test.tsx`, `components/Question.test.tsx`, `components/Credits.test.tsx`
- `components/__snapshots__/*.snap`, `screens/__snapshots__/*.snap`

Modified in Phase A:

- `package.json` — devDeps + `EXPO_PUBLIC_USE_TEST_QUESTIONS=1` inlined on `test:smoke:*`.
- `package-lock.json`.
- `context/QuestionsContext.tsx` — read `EXPO_PUBLIC_USE_TEST_QUESTIONS` and dispatch `TestQuestions` when set.
- `data/QuestionsTestData.ts` — extended from 4 to 10 entries.
- `constants/Colors.ts` — add `border` to `Colors.dark` so it structurally matches `Colors.light` (removes type-cast noise from tests).

To modify in Phase B–C:

- `package.json` — version bumps.
- `package-lock.json` — regenerated.
- `app.json` — minimal iOS Privacy Manifest stub.

Should stay unchanged:

- `babel.config.js`, `App.tsx`, navigation, components, screens (apart from any required SDK 51 API shifts that surface).

## Verification gate

The upgrade is done when **all** of the following pass:

- `npx expo-doctor` reports 0 issues.
- `npm run test:jest` → original unit tests **plus** new snapshot tests pass (22 tests, 15 snapshots).
- `npm run lint` → clean.
- `npm run test:smoke:{web,ios,android}` → all three Maestro smoke flows pass.
- Manual visual pass on all three platforms in light + dark mode.

## Follow-up (not in this plan)

- Upgrade to the latest Expo SDK using `expo-template-tabs` as the reference layout (introduces `expo-router`, file-based routing, native tabs).
- During that follow-up, remove `react-native-paper` — replace components with `expo-router`/`@expo/ui` primitives and rewire theming through `useColorScheme` + the React Navigation theme. The Jest snapshot tests added here become the regression gate for that rewrite too.
