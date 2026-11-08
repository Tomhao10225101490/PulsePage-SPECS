# Submission package

Download **PulsePage-LensStudio.zip**, extract the PulsePage folder, then open PianoLens.esproj in Lens Studio. The complete Assets, Packages and devpost folders are inside this archive. Root-level TypeScript and planning/verification files are readable review copies; use the archived project tree to run the Lens.

The archive contains 42 files and was independently extracted without caches or local connection configuration. Lens Studio regenerated its support/cache files, compiled the source, and displayed PulsePage at its initial 80 BPM. Four active imported sources matched the archive's authored source bytes. Archive SHA-256 is recorded in SOURCE_MANIFEST.json.

---

# PulsePage

**Keep your beat. Keep your place.** A world-placed piano practice score for Learn AR with SPECS.

PulsePage shows an original four-bar treble phrase in C major, a four-beat count-in, mint beat cues, and an amber current-note ring. Large controls start/pause/resume, restart, and cycle 60/80/100 BPM. Tempo changes are available while paused or stopped. This visual, tempo-guided tool does not listen to the piano, recognize paper music, or grade playing.

## Open the project

1. Install Lens Studio 5.23.2 or a compatible newer SPECS release.
2. Extract the packaged project. Keep `PianoLens.esproj`, `Assets/`, and `Packages/` together.
3. Open `PianoLens.esproj`. Use SPECS Interactive Preview, the Plane environment, and Start camera location.
4. Move the mouse onto a button before clicking; a click simulates a pinch. Start gives four count-in beats. Pause holds position. Restart returns to a stopped beginning and retains the tempo.
5. WASD moves the viewpoint. The score stays in the simulated world. Reset Interactive Environment restores the starting view.

The submitted build ran locally while Lens Studio reported `isAuthorized=false`; no account-bound cloud service is used. This does not establish access to device publishing or cloud asset generation.

## Source map

- `Assets/Scripts/PulsePageApp.ts`: one frame-driven coordinator with typed inputs.
- `Assets/Scripts/PulsePageTransport.ts`: musical phrase and pure transport state.
- `Assets/Scripts/PulsePageControlsView.ts`: passive SpectaclesUIKit view and SIK events.
- `Assets/Scripts/PulsePageNotation.ts`: animated MeshBuilder staff, clefs, notes, beat cues, and ring.
- `Assets/Tests/PulsePageState.test.mjs`: tests the active transport source directly.
- `devpost/design-brief.md`: approved planning output from the official Devpost Learn skill.
- `devpost/VERIFICATION.md`: actual checks and limits.
- `devpost/AI_AND_PRIOR_WORK.md`: AI assistance and incorporated packages/tools.

## Tests

With Node 22.13+:

```sh
node --experimental-strip-types Assets/Tests/PulsePageState.test.mjs
```

187 assertions passed, 0 failed. These are source timing/state checks, not 187 separate GUI tests or a substitute for the Lens compiler. Native compilation also passed. Actual preview checks covered count-in, note advancement, pause/hold, paused tempo change, resume, finish, restart, and lateral movement. Genuine native preview recordings demonstrate the flow.

## Scope

No physical SPECS, real piano performance, or user study was tested. Hardware comfort, hand tracking, and learning benefit remain unproven. There is no OCR, microphone analysis, grading, persistence, multiplayer, audio metronome, or network data. LEAF was not run because the auto-injected inspection helper was incompatible; native mouse checks are reported separately.

Original phrase: C4 E4 G4 A4 | G4(half) F4 E4 | D4(eighth) E4(eighth) F4 G4 B4 | A4 G4 C4(half). Other notes are quarters; each bar has four beats. No third-party song or sheet-music scan is included.

Snap packages/template retain their original terms. Local credentials, caches, private account information and browser screenshots are excluded from the submission archive.
