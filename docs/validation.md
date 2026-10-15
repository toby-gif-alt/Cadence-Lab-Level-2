# Validation results

Verified 16 October 2026 (Pacific/Auckland).

## Musical and structural tests

`node --test tests/music.test.cjs`: **12 tests passed, 0 failed**.

- Independent interval fixtures cover major, minor, perfect, augmented and diminished spelling; enharmonic pairs with equal semitone distance retain different interval names.
- Independent transposition fixtures verify B-flat, E-flat and F instrument directions and exact note spelling.
- Known dotted durations and standard-tuning string/fret pitches are checked independently of question generation.
- All **48 templates × 100 seeds = 4,800 variants** pass bar-duration, pitch syntax, stave-alignment, TAB pitch and teaching-contract validation. Transposition questions also preserve durations, rests and articulation. Completion models contain defining chord tones and the declared bass.
- Deterministic generation recreates complete questions/models; intentional pitch, fret and bass corruption is rejected.
- Diatonic-third completions preserve interval quantity, and clef transcription retains sounding pitches.

## Browser QA

`tests/browser.html`, opened in Chrome with the actual production script order: **1,882 assertions, 0 failures** after the spacing and beaming corrections.

Every template was rendered as a question and, where present, a model at **1440px, 1000px and 390px** app-frame widths. Checks covered score SVG presence, model secrecy before submission, model-audio locking, self-check controls, duration/pitch validation, blank-region audio exclusion and container fit. Additional checks covered draft restoration, seeded URLs, valid family/year filter combinations, and the question/model print CSS rules.

Visual inspection covered the actual app and revealed TAB model. Engraving review prompted two fixes: genuine musical rest glyphs on TAB rather than explanatory text, and a shared formatter across simultaneous staff voices so their beat positions align. The full browser suite was rerun after those changes.

The subsequent layout review reduced ordinary staff spacing from 185px to 135px, retained additional room for lyrics/TAB, moved staff information above the stave, and connected related parts with barlines and a bracket (or a piano brace). Beams are now attached before formatting/drawing, so beamed quavers have consistent stems and no residual individual flags. Five additional regression assertions inspect the note state at drawing time, check all 32 quavers in a diminution model, retain flags on standalone quavers, and verify compact multi-part spacing and rendered connectors. The complete desktop/mobile browser suite and seven musical tests passed after this correction.

All ten official source links in the source manifest returned HTTP 200 when checked. These links identify official source resources; the SHA-256 fingerprints identify the exact user-supplied files reviewed, which may differ from later official revisions.

## Limits of these checks

The tests do not grade arbitrary learner notation or prose. They do not certify strict chorale part-writing, every possible alternative harmonic interpretation, expressive synthesis, or an exact reproduction of NZQA repertoire. Browser print **visibility rules** were checked; individual printed page breaks depend on browser/printer settings. The musical audit and declared scope are in `source-audit-2021-2025.md`.

## Rhythmic-material revision, 16 October

All 16 authored motifs were checked for complete bars and distinct metre/rhythm combinations. Independent event comparisons verify augmentation and diminution, merging tied fragments before comparison; inversion and sequence retain the original rhythm. Tests reject dangling ties, incorrect tied pitches and unpaired slurs. Browser checks additionally render all 16 motifs with all five development devices at 1440px and 390px, inspect slurs/ties, verify playback length and confirm that tied notes sustain without reattacks. Desktop visual review covered a motif development model and the compact four-part quartet layout.
