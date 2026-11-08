---
status: approved
---

# Design brief: PulsePage

<!-- Filled in by plan-lens from the learner's interview. Use the learner's words. Mark any value they didn't choose as (default). -->

## The one spatial moment
The learner is playing piano (弹钢琴) and wants beat reminders and help keeping their place in the music (提醒我节拍和看谱). A short practice score sits in front of them (在我的前方); a pulse marks each beat and a cursor highlights the current note while their hands remain on the keys.

## Why it belongs on glasses
- Uses: draws in the world; leaves the body free.
- A virtual music stand can stay near the piano task without holding a phone. It is world placed rather than glued to the face. This benefit and long-session comfort remain unproven on physical glasses.

## Product or overlay
- Type: product — the virtual practice score is the experience.
- What this version senses: standard button/pinch input only; no camera or microphone analysis.
- Preview: a built-in original four-bar practice phrase (default), with tempo-controlled progress. The learner explicitly accepted a built-in short score instead of paper-score recognition or performance assessment.

## Where things live
- Gaze: forward toward the music stand, occasionally down toward the real piano.
- Score: in front, as requested; world placed 100 cm ahead and approximately 15 cm below starting eye level (default). Initial score area 44 × 24 cm (default); validate framing in preview.
- Beat pulse and current-note marker: beside/on the relevant notes, not separate floating dashboards (default).
- Controls: beneath the score, within the same task area; minimum approximately 6 cm targets (default). Use a compact layout, not a wall of panels.

## Hands and input
- Start/Pause: one large SIK/UIKit button (default). Click acts as pinch in Interactive Preview.
- Tempo: one large control cycles 60 / 80 / 100 BPM while paused; initial 80 BPM (default).
- Restart: a large button resets the phrase and pauses (default).
- Targets are big and highlight when aimed at.
- No voice input (default); all actions are buttons.

## When things show
- Before starting: score, concise one-line instructions, and controls are visible (default).
- Starting: one bar of count-in, then progress through the phrase (default).
- Playing: show the score, active note, beat pulse, and Pause; reduce setup text (default).
- Paused: keep the current position visible and stop advancing (default).
- Finished: show a clear completion state and a Restart action, without assessing accuracy (default).
- Optional quiet beat clicks accompany the visual pulse; mute control if included (default). No background music.
- No out-of-view alerts; this version places the whole task in front (default).

## Done criteria
These are proposed acceptance criteria (default), not completed test results.
1. In Interactive Preview, the practice score and readable current-note/beat cues appear in front at the intended scale; walking sideways shows they stay in the world.
2. Pressing Start gives a count-in and advances the highlight through the four-bar phrase in time; the beat indicator cycles through four beats per bar.
3. Pause freezes progress; Resume continues without skipping the held note. Restart returns to the beginning in a paused state.
4. Tempo can be changed while paused; 60 BPM advances more slowly than 100 BPM, with no duplicate update timers after restarting.
5. The phrase reaches a clear finished state. The demo does not claim to hear the piano, recognize paper music, or grade performance.

## Out of scope
- Paper-score/OCR recognition, live piano/audio analysis, pitch or rhythm grading, automatic page turns of physical sheets, and custom hand gestures.
- Accounts, cloud model calls, network data, multiplayer, and persistence across sessions.
- Device publishing to the SPECS store. Competition submission still needs a public repository and a public YouTube video of the actual Lens Studio preview.

## Risks and open questions
- The user explicitly requests proceeding without Snapchat registration/sign-in. Native MCP read calls have been verified while signed out; local writes, compilation, preview, and LEAF still need testing. Account-bound services must not be called or bypassed.
- All implementation values marked (default) are proposed by the agent and remain open to change by the learner.
- Real-glasses comfort, readability during actual piano playing, hand-tracking reliability, and user benefit are feel unproven. No user study or hardware test has taken place.
- Keep the score readable within the narrow field of view; shorten the visible phrase to the current bar if needed, while preserving musical context.

## Build notes for CLAD
- Build for SPECS so it runs and can be demonstrated in Lens Studio's preview. No SPECS device is available.
- Use Spectacles Interaction Kit (SIK) and UI Kit for all interactions, so they work with the mouse in Interactive Preview and with LEAF.
- Build any stand-in exactly as described above, and keep it obvious in the scene.
- Use real-world scale in centimeters. Keep content inside the user's view during the main task.
- The display is additive: black renders as transparent. Don't rely on black or very dark content to be seen; keep text light and readable from where the user stands.
- Get the basic flow working first, then add detail.
- Write LEAF scenarios for each done criterion, run them in preview, and report which pass. Say which criteria have no test.
- Don't record, identify, or follow people.

## After the build: judge it
This part is for you, after CLAD finishes.

1. **Does it work?** Ask your agent which LEAF tests passed and which done criteria have no test.
2. **Walk around it.** Open the preview in Interactive Preview. Use WASD to move, Q and E to go down and up, and right-drag (or hold Shift) to look around. Clicking acts as a pinch. Stand where a user would and look at the task.
3. **Ask the three questions.**
   - Does it use what I'm looking at?
   - Does it put something in my space, where it belongs?
   - Does it free my hands or let me keep my eyes up?
   - Would it be just as good on a phone? If so, what would make it need the glasses?
4. **Check comfort.**
   - Everything I need is in view while I do the task. Nothing sits at the edges, behind me, or stuck to my face.
   - Every control is within reach of someone standing there.
   - Text reads easily from where I stand. No dark UI disappearing.
   - Things show when needed and get out of the way.
5. **Label what you know.** Write "logic proven" next to anything the tests and preview show working, and "feel unproven" next to anything only real glasses could tell you (comfort over time, real hand tracking, real recognition).
6. **Fix with design notes, not code.** Tell your agent what to change in design terms, for example: "Move the step card 15 cm lower and next to the pan. Make the Next button twice as big. Re-run the tests." If a fix takes under a minute, like nudging a panel, do it yourself in the scene.
7. **Submit.** Record a video under 3 minutes of your Lens in the preview, public on YouTube. Make your repo public with your Lens Studio project and this `devpost/` folder. Details are on the hackathon site: https://learn-specs.devpost.com/resources
