# App Store submission — Brain Quiz (iOS)

Everything below is ready to paste into App Store Connect. Placeholders are in [brackets].

## Before the first build (one-time, yours to do)

1. Apple Developer Program membership ($99/year) on the Apple ID you will use.
2. Expo account — already logged in on this Mac as `robertdev125`.
3. Nothing else: this Mac has no Xcode, so the build runs on EAS in the cloud.

## Build and upload

```sh
cd mobile
npx eas-cli build -p ios --profile production   # first run links the EAS project, asks for your Apple ID, makes certificates
npx eas-cli submit -p ios --latest              # uploads the build to App Store Connect (creates the app record if asked)
```

The build appears under TestFlight in App Store Connect within a few minutes of upload. Install it on your iPhone from
the TestFlight app, check rotation, pinch, lessons and Explore, and take the screenshots there (see below).

Later releases: bump `expo.version` in `app.json` (1.0.1, 1.1.0 …); the build number increments on its own.

## Listing

| Field | Value |
|---|---|
| Name (30) | Brain Anatomy Quiz: 3D Atlas |
| Subtitle (30) | Neuroanatomy regions & lobes |
| Bundle ID | study.brainquiz.app |
| Primary category | Education |
| Secondary category | Medical |
| Age rating | 4+ (no objectionable content; external links open in Safari) |
| Price | Free |
| Privacy policy URL | https://brainquiz.study/privacy |
| Support URL | https://brainquiz.study |
| Copyright | © 2026 [your name] |

**App Privacy questionnaire:** "Data Not Collected". The app has no accounts, analytics, ads or network calls; all
progress is stored on the device.

**Export compliance:** already answered in the build (`ITSAppUsesNonExemptEncryption: false`), so no question at upload.

### Promotional text (170)

Rotate a real 3D brain, cut it open, and learn every region with short lessons that repeat what you miss.

### Description

Brain Quiz turns a real 3D brain into a study partner.

EXPLORE
Spin the brain freely in every direction, pinch to zoom, slice it along any plane and fade the cortex to reach the
deep structures. Search lobes, deep structures, pathways and networks, and tap a region to read what it does, how it
is wired and what happens when it breaks.

LEARN
29 quiz types cover regions, lobes, pathways, networks, cranial nerves, neurotransmitters, cortical layers, receptors
and more. Each lesson shows the region on the brain as you answer, explains the answer, and comes back to the
questions you missed before the lesson ends.

TRACK
Your streak, accuracy and weakest regions are always one tab away, so you know what to review next.

MADE FOR
Medical, nursing, psychology and neuroscience students, and anyone curious about the brain.

Everything works offline. No account, no ads, no tracking.

The 3D model derives from "Brain for Blender" by Anderson Winkler (brainder.org), CC BY-SA 3.0.

### Keywords (100)

neuroscience,flashcards,medical,student,nursing,psychology,usmle,parts,neurology,study,learn,cortex

Apple indexes the name, subtitle and this field, and matches words across all three, so no word is repeated
between them. The description is not indexed on iOS.

### Why this name

On the App Store "brain quiz" belongs to puzzle games with hundreds of thousands to over a million ratings
(Brain Test, Brain Out, Trivia Crack); nobody searching it wants anatomy, and no anatomy app can outrank them.
"brain anatomy", "neuroanatomy", "brain atlas" and "3d brain" return small apps (3D Brain 144 ratings, Brain
Anatomy 23, Brain Tutor 3D 11, Neuroanatomy SecondLook 7), while "brain anatomy", "brain lobes", "parts of the
brain" and "brain regions and functions" each draw 10k to 100k web searches a month. "anatomy quiz" is a real
category term with mid-size apps (Anatomist, Daily Anatomy Flashcards). The name leads with the strongest
uncontested term and still contains "brain" and "quiz" for the brand.

### What's new (1.0)

First release.

### Review notes

No login. Everything works offline. Rotate the brain with one finger, pinch to zoom; use the search field in Explore
to jump to a region.

## Screenshots

Take them on your iPhone from the TestFlight build (side button + volume up); an iPhone 15/16 Pro Max gives the 6.9"
size App Store Connect requires, which also covers smaller phones. Five is plenty:

1. Explore — whole brain, rotated to a three-quarter view.
2. Explore — a region selected with its sheet open.
3. Explore — the brain sliced with the tools panel showing.
4. A lesson step with the region lit and four options.
5. Stats.

iPad is switched off (`supportsTablet: false`), so no iPad screenshots are needed. Turn it back on only after the
layout has been checked on an iPad.
