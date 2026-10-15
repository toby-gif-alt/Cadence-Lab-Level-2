# Cadence Lab — Level 2

Interactive and printable practice for NCEA Level 2 Music **AS 91276**, “Demonstrate knowledge of conventions in a range of music scores” (4 credits).

**[Open the practice app](https://toby-gif-alt.github.io/Cadence-Lab-Level-2/)**

Built as a separate companion to [Cadence-Lab](https://github.com/toby-gif-alt/Cadence-Lab). The Level 3 app's practice-and-model workflow and pinned VexFlow dependency informed this project; the Level 2 teaching content, generator, rendering adapter and application are new.

## Run it

Open `index.html`, or serve the repository root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. No build, account, API key, dependency install or backend is required. All runtime assets are local, including VexFlow. For GitHub Pages, choose **Settings → Pages → Deploy from a branch → main → / (root)**. Repository creation does not automatically enable Pages.

## Practice

Choose a skill, an exam influence year, or a specific exercise. Complete notation on paper or a printed question; type short answers and explanations if useful. Choose **I’ve finished · compare** to reveal the model and self-check. **Print question** always excludes the model; **Print model** is available after reveal. Listen to supplied notation or, after reveal, the model. Blank completion regions are silent. A shareable `?exercise=…&seed=…` URL recreates the same score and question. Typed drafts are saved locally in your browser when storage is available.

The 48 templates span 13 families:

| Family | Templates |
| --- | ---: |
| Interval identification across five clefs | 5 |
| Interval construction / thirds below | 2 |
| B-flat, E-flat and F transposition in both directions | 6 |
| Clef transcription | 4 |
| Guitar and bass TAB in both directions | 4 |
| Jazz, Roman and seventh-chord analysis | 3 |
| Piano, quartet and cadence completion | 3 |
| Keys, related keys and chromaticism | 3 |
| Changing metre and hemiola | 3 |
| Score discussion | 7 |
| Four-bar motif development | 5 |
| Brass arrangement / piano reduction | 2 |
| Voice range and tessitura | 1 |

Generators vary only within constrained authored structures. Different seeds can produce identical musical content; the seed is a reproducibility identifier, not a promise of unlimited unique compositions. Every question is **original practice informed by the exams**, not an exact official reference. Some questions intentionally use more than one skill. Notation and discussion remain self-assessed; answer text matching is not NCEA grading.

Motif tasks draw on 16 authored rhythmic shapes across 4/4, 3/4 and 6/8, including rests, dotted figures, semiquavers and ties. Four-bar extracts provide context; development models preserve the motif through sequencing, inversion, augmentation and diminution. Slurs, articulation and dynamics support phrase reading, and tied notes sustain during playback.

## Sources and depth of review

All five supplied 2021–2025 examination papers and all five assessment schedules were read, including rendered notation and marking evidence. [The complete source audit](docs/source-audit-2021-2025.md) maps every examination part, records answer evidence and qualitative marking requirements, identifies source discrepancies, and explains the authoring choices. [The source manifest](docs/source-manifest.json) records fingerprints and links. The source PDFs are external material and are not republished in this repository.

The bank deliberately covers Level 2 conventions beyond Level 3 harmony: quantity and quality of intervals, written versus concert pitch, vocal-tenor and guitar octave conventions, clef transcription, TAB, rhythm/metre, signs and articulation, textural evidence, motif transformation and instruments. The audit also identifies exact source surfaces that are documented rather than reproduced, including detailed tuplet/polyrhythm notation and multi-staff annotation.

## Architecture

- `theory.js`: spelled pitches, interval calculation, diatonic scales, transposition, seeded randomness, duration totals, TAB tunings and conversions.
- `musical-material.js`: authored rhythmic motifs, phrase extracts, exact transformations and tied bar splitting.
- `question-bank.js`: 48 authored templates, source-task provenance, musical surfaces, prompts, answer models and self-checks.
- `score-renderer.js`: responsive VexFlow staff/TAB systems, clefs, key/meter changes, accidental state, articulation, lyrics and blank writing staves.
- `validator.js`: bar totals, aligned staves, transposition spelling/rhythm, TAB pitch checks, completion chord membership and bass checks.
- `playback.js`: synthesises only notes present in the supplied/model score at the selected constant tempo.
- `app.js`: filtering, question selection, reproducible links, drafts, reveal, print separation and response comparison.

No external service receives learner answers. The only persistent app data is local browser draft storage. Clipboard access is requested by the browser when copying a question link.

## Verification

Run the musical/structural tests with Node:

```sh
node --test tests/music.test.cjs
```

The suite uses independent known-pitch fixtures as well as 4,800 generated-question validations. Browser QA checks all 48 templates at desktop and narrow widths, model reveal, seeded links, draft retention, blank-region audio and print rules. Serve the repository and open:

```sh
http://localhost:8000/tests/browser.html
```

Choose **Run browser checks**. The test page embeds the actual app and reports its assertions. See [validation results](docs/validation.md) for the actual checks run and limits.

## Third-party dependency

`vendor/vexflow-bravura-4.2.5.js` is the same pinned MIT-licensed build used by the companion repository. Its licence is included in `vendor/VEXFLOW-LICENSE.txt`. This repository's original exercises do not copy the supplied exam repertoire or engravings. NZQA and repertoire acknowledgements are documented in the source audit for provenance.
