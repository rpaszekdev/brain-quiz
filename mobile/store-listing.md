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

Brain Quiz turns a real 3D brain into a study partner. Rotate it, cut it open, and learn every region by name, function and wiring.

A REAL 3D BRAIN, NOT A DIAGRAM
The model is an anatomical surface built from the Desikan-Killiany atlas: 70 cortical regions and 32 subcortical structures reconstructed from real scan data. Spin it endlessly in any direction with one finger and pinch to zoom. Slice it along the sagittal, coronal or horizontal plane, then fade the cortex away to reach the deep structures underneath and tap them directly.

EXPLORE 49 REGIONS
Search by name or browse by category:
- 9 lobes and divisions: frontal, parietal, temporal, occipital, insula, limbic system, subcortical, brainstem, cerebellum
- 12 deep structures: hippocampus, amygdala, thalamus, hypothalamus, caudate nucleus, putamen, globus pallidus, nucleus accumbens, basal ganglia, corpus callosum, brainstem, cerebellum
- 22 white matter pathways, including the superior and inferior longitudinal fasciculus, the inferior fronto-occipital fasciculus and the fornix
- 9 functional networks, including the default mode, salience and frontoparietal networks

Every region opens an article: what it does, how it is wired, what happens when it breaks, and its Brodmann areas.

29 QUIZ TYPES
- Regions: Identify Region, Function to Region, Deep Structures
- Pathways: Name the Tract, Tract Endpoints
- Networks: Region to Network, Network Disruption, Network Activity
- Neurotransmitters: Which NT?, Pharma Bridge
- Clinical: Predict the Deficit, Localize the Deficit, Which Artery?, Name the Syndrome, Case Study, Visual Field Defects
- Cortex: Choose the Modality, Brodmann Match, Brodmann to Region
- Cells and layers: Signature Cell, Cell to Region, Cortical Layer, Receptor Map, Hippocampal Circuit
- Cranial nerves: Name and Number, Nerve Function, Lesion Effects, Sensory, Motor or Both

LESSONS THAT MAKE IT STICK
Each lesson is ten questions. The brain shows you the region while you answer, the answer is explained rather than just marked, and anything you miss comes back before the lesson ends. You can also drill a single region until it is solid.

TRACK WHAT YOU KNOW
Your streak, your accuracy and your weakest regions sit in one tab, so you always know what to review next.

MADE FOR
Medical and nursing students, psychology and neuroscience undergraduates, physician assistant and physical therapy students, and residents brushing up on neurology. Useful for revising neuroanatomy ahead of exams such as USMLE Step 1, the NCLEX or the MCAT, and for anyone simply curious about the brain.

WORKS OFFLINE
The 3D model, every question and every article ship inside the app. No account, no internet, no ads, no tracking. Your progress never leaves your phone.

The 3D model derives from "Brain for Blender" by Anderson Winkler (brainder.org), CC BY-SA 3.0.

### Keywords (100)

neuroanatomy,brain,anatomy,quiz,neuroscience,medical,3d,flashcards,usmle,psychology,nursing,student

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
