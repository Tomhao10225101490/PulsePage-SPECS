# Verification — PulsePage

Verified 2026-11-08 on an Apple Silicon Mac with Lens Studio 5.23.2.

## Source and compiler

The scene binds PulsePageApp, PulsePageControlsView, and PulsePageNotation, using PulsePageTransport. All four authored modules matched their native imported/compiler copies byte-for-byte. Obsolete unbound versions were backed up outside the public project and removed using the native asset API.

- Native RecompileTypeScriptTool: succeeded.
- Pure transport: 187 assertions passed, 0 failed, against the active module.
- Coverage: contiguous 16-beat phrase, four-beat bars, count-in and note boundaries at each tempo, pause/resume including count-in, repeated restart, active tempo guard, paused tempo changes, finish clamp, and frame integration.
- Native authorization reads: isAuthorized=false. Actual preview operations occurred while signed out.
- Short native log checks reported no script exceptions. The last tail also contained ADB device-discovery timeouts; no glasses were connected. This is not exhaustive long-session testing.

## Actual native mouse/keyboard checks

These were performed separately from pure source tests, in the user's native Lens Studio Interactive Preview:

1. Start showed a four-beat count-in, followed by advancing notes and beat cues.
2. Pause displayed a held-position state; the same note remained highlighted across a several-second wait.
3. Paused tempo changed 80 to 100 BPM. During play/count-in, the control displayed Pause to change.
4. Resume continued from the held position and reached Phrase complete.
5. Restart returned to the stopped beginning, retaining tempo.
6. All 60/80/100 BPM labels were observed. Recordings show a 60-BPM start and a complete 100-BPM run at normal recording speed. Exact timing claims rely on source tests, not a manual stopwatch.
7. Lateral preview movement changed the viewpoint relative to the score; Reset Interactive Environment restored the starting view. This agrees with the authored world root rather than a camera child.

Two genuine Preview recordings were saved. The 1:58 English demo uses normal-speed excerpts, cuts/crops, explicitly labeled stills, captions, and disclosed synthetic macOS Daniel narration. No generated feature footage substitutes for the running Lens.

## Limits

LEAF was not run. QueryRuntimeSceneTool automatically injected a helper that failed to respond and referenced package names absent from this template. It was removed and compilation restored. No LEAF success or conclusive general unavailability is claimed.

No physical glasses, piano-performance, user-study, comfort, real hand-tracking, or learning-effect test. Those remain feel unproven. No OCR, audio analysis, grading, or recognition of real-world surfaces is claimed.

Active source SHA-256:

```text
PulsePageApp.ts          186350000bc691719f4ece4733269e0acdbbe0de7d91fd8c014de7688bb6bc18
PulsePageControlsView.ts 61beacbb2cc71e12e2e13eee15e9e09cfa5c498367f88de1443ccd5c48641502
PulsePageNotation.ts     e9379532d0000253fc1248f4a3544f687c6446aa03554047cb68d4baca6de79c
PulsePageTransport.ts    8d774ba082172c1d0cee1066a7beb0437ba7ca50f160fb2a2486fb5bd6675ccf
```
