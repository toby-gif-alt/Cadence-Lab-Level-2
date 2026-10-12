# Validation results

Verified 12 October 2026 (Pacific/Auckland).

## Musical and structural tests

`node --test tests/music.test.cjs`: **7 tests passed, 0 failed**.

- Independent interval fixtures cover major, minor, perfect, augmented and diminished spelling; enharmonic pairs with equal semitone distance retain different interval names.
- Independent transposition fixtures verify B-flat, E-flat and F instrument directions and exact note spelling.
- Known dotted durations and standard-tuning string/fret pitches are checked independently of question generation.
- All **48 templates × 100 seeds = 4,800 variants** pass bar-duration, pitch syntax, stave-alignment, TAB pitch and teaching-contract validation. Transposition questions also preserve durations, rests and articulation. Completion models contain defining chord tones and the declared bass.
- Deterministic generation recreates complete questions/models; intentional pitch, fret and bass corruption is rejected.
- Diatonic-third completions preserve interval quantity, and clef transcription retains sounding pitches.

## Browser QA

`tests/browser.html`, opened in Chrome with the actual production script order: **840 assertions, 0 failures** after the final engraving changes.

Every template was rendered as a question and, where present, a model at **1000px and 390px** app-frame widths. Checks covered score SVG presence, model secrecy before submission, model-audio locking, self-check controls, duration/pitch validation, blank-region audio exclusion and container fit. Additional checks covered draft restoration, seeded URLs, valid family/year filter combinations, and the question/model print CSS rules.

Visual inspection covered the actual app and revealed TAB model. Engraving review prompted two fixes: genuine musical rest glyphs on TAB rather than explanatory text, and a shared formatter across simultaneous staff voices so their beat positions align. The full browser suite was rerun after those changes.

All ten official source links in the source manifest returned HTTP 200 when checked. These links identify official source resources; the SHA-256 fingerprints identify the exact user-supplied files reviewed, which may differ from later official revisions.

## Limits of these checks

The tests do not grade arbitrary learner notation or prose. They do not certify strict chorale part-writing, every possible alternative harmonic interpretation, expressive synthesis, or an exact reproduction of NZQA repertoire. Browser print **visibility rules** were checked; individual printed page breaks depend on browser/printer settings. The musical audit and declared scope are in `source-audit-2021-2025.md`.
