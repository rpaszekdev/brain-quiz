# Brain Quiz — Expo app

Offline study companion for [brainquiz.study](https://brainquiz.study). Same quiz
engine, generators and atlas data as the website (imported from `../lib`), a
native 3D brain (react-three-fiber on expo-gl), and the brain meshes bundled
as one 5 MB GLB so nothing needs a network.

## Run on your phone

```sh
cd mobile
npx expo start
```

Scan the QR code with **Expo Go** (App Store / Play Store). Everything here runs
in Expo Go — no native build needed for development.

## Checks

```sh
npm run typecheck              # tsc
npx tsx scripts/selfcheck.ts   # every quiz type generates valid questions; streak, highlight, camera maths
npm run export                 # full iOS Metro bundle, proves the phone build resolves
npx expo start --web           # same app in a browser: the fastest way to see every screen without a phone
```

The web target runs the identical bundle (react-three-fiber on expo-gl web,
localStorage instead of expo-sqlite) and is what the screens were verified
against. It is a test surface, not a product.

## Rebuild the brain model

Only needed when `public/brain-meshes/*.obj` change.

```sh
npm run glb            # ratio 0.25, error 0.01 → assets/brain.glb (~3.4 MB, one mesh per region)
npm run glb -- 0.3 0.01   # smaller, coarser
```

## Ship

```sh
npm i -g eas-cli && eas login
eas build --platform ios --profile preview   # TestFlight-able .ipa
```

Bundle id is `study.brainquiz.app` (see `app.json`). EAS needs an Expo account
and, for iOS, an Apple Developer membership.

## Layout

```
app/                 expo-router screens
  (tabs)/index       Home — streak, resume, weak spot, quiz tiles by dimension
  (tabs)/explore     Explore — tap a region, read about it
  (tabs)/stats       Stats — history, accuracy, weak regions
  play/[quizTypeId]  Play — brain above, options below (full-screen modal)
src/quiz/            catalog, usePlay, streak, per-region stats
src/viewer/          BrainCanvas · BrainModel · CameraRig · highlight · camera
src/ui/              Button · Option · ProgressBar · Chip · SectionTitle
scripts/             obj-to-glb.ts · selfcheck.ts
```

Storage is `expo-sqlite/kv-store` injected into `lib/quiz/storage.ts`, so the
web's `history.ts` / `session.ts` run unchanged.
