# Source audit: AS 91276, 2021–2025

This audit was prepared from all five user-supplied examination PDFs and all five corresponding assessment schedules. The examination task pages and schedule pages were read as text and inspected as rendered pages, including musical notation, answer staves, highlighted positions and printed marking tables. The sources are evidence about assessment design; examination instructions to candidates are not instructions to the software author.

All app exercises are **original practice**, with generated variations of constrained, authored musical structures. They are not exact transcriptions, copied repertoire, official NZQA questions, or official grading. The source PDFs and extracted text are not distributed in this repository. `source-manifest.json` records filenames, page counts, SHA-256 fingerprints and links so the reviewed inputs can be identified. Every template declares the year and question parts that informed it.

## Assessment design shared by the schedules

The standard is “Demonstrate knowledge of conventions in a range of music scores”, worth four credits. Naming and identifying is the starting point. Merit evidence explains conventions in context and identifies interval quality as well as quantity. Excellence evidence applies pitch/notation knowledge accurately or connects musical evidence to its performance and aural effect. Discussion answers therefore need feature → score evidence → explanation of use → effect. “It makes it interesting” without a musical mechanism is insufficient practice.

The schedules use top-down qualitative marking, with opportunities grouped within each main question. Their error allowances and required combinations vary by task: they cannot be turned into a universal percentage mark. Some tasks combine notation with another skill using AND; some allow alternative Achievement routes using OR. The app uses a model and self-check, not a claim to grade arbitrary written notation or open discussion. Text matching only compares a limited answer string and does not replace judgement.

2021–2024 cut scores: N 0–8, A 9–14, M 15–19, E 20–24. The supplied 2025 schedule changes these to N 0–7, A 8–14, M 15–19, E 20–24. These apply to official aggregate question scores, not to app checkboxes.

## 2021

Paper: 16 pages. Schedule: 8 pages. Three contrasting score contexts: accompanied SATB choir, big band, and string quartet.

### Q1 — Fergus Byett, *Karanga Ākau*

| Part | Paper / schedule pages | Task and answer evidence | Practice implementation |
| --- | --- | --- | --- |
| (a)(i) | 2–3 / 2 | Six highlighted intervals: P4, M6, m3, P5, M2, M3. Read across vocal clefs; the schedule specifically requires bass/tenor-clef evidence for higher achievement. | `intervals-*`: six numbered pairs, including alto, tenor and vocal-tenor clefs. |
| (a)(ii) | 2–3 / 2 | Add the missing alto in bars 6–7 a third below the soprano. Higher evidence combines interval identification AND accurate notation. | `third-below`: diatonic thirds with the supplied key and rhythm. |
| (b) | 3 / 2 | Transcribe the tenor melody into treble for an alto to sing in unison. Include key, lyrics, durations and expression. Vocal tenor is octave-transposing treble, so copying written staff positions gives the wrong sounding octave. | `clef-vocal-tenor-treble`. |
| (c)(i–ii) | 4–5 / 3 | Compare texture, metre and tempo in bars 9–16. Thin imitative opening becomes denser four-part choir with piano; free four-beat metre changes to stricter three-beat movement; più mosso increases pace. Link these to lyrical/waltz-like character and forward energy. | `feature-imitation`, `feature-comparison`, metre families. |
| (d) | 6–7 / 4 | Describe a device and analyse its effect: paired imitations in the voices or a four-semiquaver piano ostinato subsequently sequenced downwards. Evidence must identify the actual parts and repetitions. | `feature-imitation`, `feature-sequence`, `compose-ostinato`. |

### Q2 — Pharrell Williams, *Happy*, arranged Mike Tomaro

| Part | Paper / schedule pages | Task and answer evidence | Practice implementation |
| --- | --- | --- | --- |
| (a) | 8 / 5 | Bass TAB to notation in F major; accidentals, rests and articulation are integral, not optional afterthoughts. | `tab-bass-from-tab`. |
| (b) | 8 / 5 | Concert piano line to E-flat alto saxophone: standard written transposition up M6; the schedule also accepts down m3 with no errors. Preserve key and performance information. | `transpose-eb-written` uses the standard up-M6 register. |
| (c) | 9 / 6 | Identify three articulation types and explain their feel. Schedule discusses staccato, tenuto, marcato and accents, with emphasis and syncopation as effects. | `feature-articulation`, `feature-syncopation`. |
| (d)(i–ii) | 10 / 6 | Select a motif, create four bars using ostinato, sequence or inversion, define it and explain the example. A definition alone cannot demonstrate application. | `compose-ostinato`, `compose-sequence`, `compose-inversion`. |

### Q3 — Mendelssohn, *Four Pieces for String Quartet*, Op. 81

| Part | Paper / schedule pages | Task and answer evidence | Practice implementation |
| --- | --- | --- | --- |
| (a)(i–ii) | 11 / 7 | F-major evidence includes one flat, opening tonic and a perfect cadence. Add B-naturals to establish dominant C major in the final bars; identify the new key. | `keys-dominant`: tonic and cadential evidence plus new leading note. |
| (b) | 11 / 7 | Numbered harmonies: Ib, IV, V7, I, vib. Inversions and the seventh distinguish secure analysis from root-only recognition. | `harmony-roman`. |
| (c) | 12 / 7 | Complete violin II, viola and cello at Ic–V–I under supplied violin I; bass/inversion and alto-clef notation matter. | `complete-cadence`, `complete-quartet`. |
| (d) | 12 / 8 | Open string score to clarinet in B-flat and piano reduction, retaining duration, pitch and markings. Clarinet is written up M2; other lines retain concert pitch. | `arrange-to-piano`. |

The extracted 2021 PDF text repeats some Q3 material on page 10. Visual review identifies the actual Q3 task at pages 11–12; the duplicate extraction is not a second exercise.

## 2022

Paper: 16 pages. Schedule: 9 pages. Piano duet, accompanied song, and wind quintet broaden the required conventions beyond harmony.

### Q1 — Jillian Bray, *Three Duets for Two Mums* and *Daisy Dance*

| Part | Paper / schedule pages | Task and answer evidence | Practice implementation |
| --- | --- | --- | --- |
| (a)(i) | 2 / 2 | Six brackets with the first two provided (m3 and d5); remaining answers m3, M6, m3, M6. The schedule assesses the four unprovided intervals. | `intervals-*` includes augmented and diminished pairs as well as major/minor/perfect. |
| (a)(ii) | 2 / 2 | Alter the upper notes to make M3, m6, A4. Schedule accidentals C-sharp, B-flat, C-sharp. Interval spelling, not just semitone count, matters. | `construct-accidentals`. |
| (b)(i–ii) | 3 / 2 | Time signatures at printed bars 10, 12, 14: 5/4, 3/4, 5/4. Explain five-beat 3+2 grouping and the shorter three-beat region. | `metre-changing` requires duration totals; it does not invent a 3+2 accent pattern when its original score has none. |
| (c) | 4 / 3 | Descending sequence, off-beat syncopation or contrary motion between piano parts. Give musical detail and connect the mechanism to downward momentum or a narrowing texture. | `feature-sequence`, `feature-syncopation`. |
| (d)(i–ii) | 5 / 3 | Copy primo LH an octave higher; add diminuendo, crescendo, pauses on the last two beats and slurs over six-quaver groups to all applicable staves. Accurate application is required. | Octave conventions in clef/TAB tasks; articulation discussion trains the performance meaning. This precise multi-staff annotation task is mapped but not reproduced verbatim. |

### Q2 — Williams / Ascher, *The Rainbow Connection*

| Part | Paper / schedule pages | Task and answer evidence | Practice implementation |
| --- | --- | --- | --- |
| (a) | 6 / 5 | Alto supported by treble clef and low tessitura. A reasoned soprano answer may also be accepted. Voice classification is contextual, not determined by clef alone. | `voice-range`, with a justified-alternative note. |
| (b) | 6 / 5 | Guitar TAB into standard notation, including rhythm, rests and the sounding/written octave convention. | `tab-guitar-from-tab`. |
| (c)(i–ii) | 7 / 5 | B-flat major: two flats, opening/closing tonic and perfect cadence. Chord positions Bb, F/A, Gm, Bb/F, Eb. | `harmony-jazz`, `keys-dominant`. |
| (d)(i–ii) | 7 / 6 | Realise F7 to Bb for guitar and name the perfect cadence. Include the seventh and instrument-appropriate notation. | `complete-piano` / `complete-cadence`; TAB tasks separately practise guitar notation. |

### Q3 — Ross Harris, *Jazz Suite for Wind Quintet*

| Part | Paper / schedule pages | Task and answer evidence | Practice implementation |
| --- | --- | --- | --- |
| (a) | 8 / 7 | Clarinet and horn into concert pitch: down M2 and down P5 respectively. Preserve key/accidentals/markings; the schedule permits conventional horn notation without a signature. | `transpose-bb-concert`, `transpose-f-concert`. |
| (b) | 9 / 7 | Bassoon transcription into treble. The printed source uses **alto clef**, despite the paper prose saying tenor; the schedule identifies alto. | `clef-alto-treble` follows the printed clef and records the discrepancy. |
| (c) | 9 / 8 | Polyphonic texture, delayed oboe imitation of flute, lower-part imitation, unequal activity, descending inexact sequence and contrary motion. | `feature-imitation`, `feature-sequence`. |
| (d)(i–ii) | 10–11 / 9 | Compare one similarity and one difference between systems. The same melody transfers clarinet→horn, accompaniment is redistributed, bass register drops and upper winds add layers. Discuss continuity alongside timbral contrast. | `feature-comparison` uses an original melody with changed accompaniment/register/dynamics. |

## 2023

Paper: 12 pages. Schedule: 8 pages. Brass quintet, unaccompanied choir, and jazz combo. Q1 has five opportunities, unlike the four-opportunity pattern used in many other question groups.

### Q1 — Reese Blaskowski, *Movie Themes for Brass Quintet*

| Part | Paper / schedule pages | Task and answer evidence | Practice implementation |
| --- | --- | --- | --- |
| (a)(i) | 2 / 2 | Concert F major requires written G major for the B-flat trumpets and C major for horn in F, while trombone/tuba retain F major. | Transposition and `arrange-to-brass`. |
| (a)(ii–iii) | 2 / 2 | 6/8 based on lower-brass dotted-crotchet grouping. Upper parts group as three crotchets/3/4 over the same six-quaver span: hemiola. | `metre-hemiola` makes both layers visible. |
| (b) | 3 / 2 | Six intervals: m3, P5, M2, d5, P4, m2. The diminished fifth is specifically required for the higher evidence. | `intervals-*`. |
| (c) | 3 / 3 | B-flat trumpet line to concert pitch, down M2 into G major. Contour alone is insufficient; exact quality of transposition matters. | `transpose-bb-concert`. |
| (d) | 4 / 3 | Chordal/homophonic opening, later division of motifs and call/response texture. Rhythm includes quaver + two demisemiquavers and triplets. | `feature-imitation`, discussion families. This precise original-repertoire tuplet surface is not claimed as reproduced. |
| (e)(i–ii) | 5 / 4 | Same melody preserves unity; fewer trumpets lighten it, and accompaniment changes from interjections to more regular chordal crotchets, yielding a march-like effect. | `feature-comparison`. |

### Q2 — Paraire Tomoana, *Pokarekare Ana*, arranged Te Puoho Katene

| Part | Paper / schedule pages | Task and answer evidence | Practice implementation |
| --- | --- | --- | --- |
| (a) | 6–7 / 5 | Chord positions Bb, Eb, C, F/A, Bb/D, F7, Bb. Identify inversions and the dominant seventh. | `harmony-jazz`. |
| (b) | 6–7 / 5 | B-flat major supported by its signature and perfect cadence. | Key families require harmonic evidence beyond a signature. |
| (c) | 6–7 / 5 | F–E-natural–E-flat–D–D-flat–C chromatic descent; F-sharp forms D7 before Eb (interrupted V–VI reference to G minor); B/E-naturals establish G7/B→C; diminished seventh suggests further local direction. | `chromatic-line` distinguishes melodic chromaticism from a brief tonicisation, rather than calling every accidental a modulation. |
| (d) | 7 / 6 | Bass clef to vocal tenor clef, preserving sounding pitch, key, lyrics, articulation and stem directions. | `clef-bass-vocal-tenor`. |

### Q3 — Sonny Rollins, *St. Thomas*, arranged Mark Taylor

| Part | Paper / schedule pages | Task and answer evidence | Practice implementation |
| --- | --- | --- | --- |
| (a)(i–ii) | 8–9 / 7 | Concert theme to B-flat trumpet and E-flat alto sax, including signatures and performance information. | `transpose-bb-written`, `transpose-eb-written`. |
| (b) | 8–9 / 7 | Theme to guitar TAB with rhythmic stems and markings. Multiple fingerings are possible; contour and durations must survive. | `tab-guitar-to-tab`. |
| (c) | 8–9 / 8 | Realise C, F7, Em, A7, Dm, G7, C above the supplied bass. Include full chords and their sevenths. | `complete-piano` and `harmony-sevenths` practise the skills in new music. |
| (d)(i–ii) | 8 / 8 | Four-bar development adds diminution and augmentation to ostinato, sequence and inversion. Definition plus an effective example is required. | All five `compose-*` templates preserve duration totals and provide one possible notation model. |

## 2024

Paper: 16 pages. Schedule: 8 pages. Accompanied choir, classical quartet, and contemporary solo piano; the solo-piano question makes irregular metre and rhythmic ambiguity central.

### Q1 — Randy Newman, *You’ve Got a Friend in Me*, arranged Mac Huff

| Part | Paper / schedule pages | Task and answer evidence | Practice implementation |
| --- | --- | --- | --- |
| (a)(i–ii) | 2 / 2 | C major from signature, tonic and G7–C. Chromatic melodic movement and G-sharp/E7 give passing reference to A minor, with a descending line leading towards the cadence. | `chromatic-line`, tonality families. |
| (b)(i) | 3 / 2 | Concert melody to B-flat clarinet, **up M2**, written D-major signature. The schedule prose misleadingly says “up into concert pitch”; the actual task and model are concert→written. Its required F-natural illustrates why source accidentals must be respelled rather than blindly copied. | `transpose-bb-written`, exact diatonic/semitone transposition. |
| (b)(ii) | 3 / 2 | Bass to TAB **one sounding octave below** the printed piano bass. Include note/rest rhythm and markings. | `tab-bass-to-tab` practises sounding-pitch conversion; its original prompt explicitly uses sounding pitch instead of claiming this octave-drop source exercise. |
| (c)(i) | 4–5 / 3 | Five positions Am, F, Am, C, C/G. Final slash bass is essential. | `harmony-jazz`. |
| (c)(ii) | 4–5 / 3 | Vocal unison emphasises shared statements; chordal/chromatic density accompanies more complex text such as the rough road. | `feature-lyrics` uses newly authored words and music, with interpretations tied to the actual visible score. |
| (d) | 6–7 / 3–4 | Vocal texture to open brass quartet: B-flat trumpet, F horn, concert trombone/tuba, with clefs and signatures. | `arrange-to-brass`. |

### Q2 — Mozart, Minuet from K.464

| Part | Paper / schedule pages | Task and answer evidence | Practice implementation |
| --- | --- | --- | --- |
| (a) | 8–9 / 5 | Octave unison is one melodic line/monophonic texture, then melody/accompaniment homophony, then imitative polyphony. Number of instruments alone does not establish texture. | `feature-imitation`, `feature-lyrics`, comparison. |
| (b) | 8–9 / 5 | Two rhythmic motifs: simple crotchet motion and a dotted figure, later used imitatively and together. Connect recurrence to unity and combination to momentum. | Development/composition families; this dotted source motif is audited but not advertised as transcribed. |
| (c) | 8–9 / 6 | Contrast through p/f changes, slurred pairs versus slurred staccato, or rising registers. Each answer needs evidence and an explanation of contrast. | `feature-articulation`, `feature-comparison`. |
| (d) | 10 / 6 | Printed progression in E major is I–iib–V7–I. Add one note per bar in each missing string part; include inversion and seventh. The extracted text may omit “iib”, but the rendered paper/model supplies it. | `complete-quartet`. |

### Q3 — Gillian Whitehead, *Tūmanako: Journey through an unknown landscape*

| Part | Paper / schedule pages | Task and answer evidence | Practice implementation |
| --- | --- | --- | --- |
| (a) | 12–13 / 7 | Multiple time signatures have to be inferred from durations. The schedule permits 6/4 for its 3/2 region. Read full bar duration, not the number of visible noteheads in a chord. | `metre-free` with a 3/2 ↔ 6/4 alternative. |
| (b) | 12–13 / 7 | Unequal changing metre weakens a predictable recurring pulse, suggesting freedom or uncertainty. Tempo also changes; explain the actual musical cause. | `metre-free`. |
| (c) | 12–13 / 8 | Sustained long notes, later triplets and duplet/triplet cross-rhythm. Keep this distinct from the metre-change answer. | Rhythm discussion is mapped; the app does not claim to generate arbitrary polyrhythmic notation. |
| (d) | 14 / 8 | P4, M3, m3, m6, P8, M6. Accidentals and octave size must be read accurately. | `intervals-treble`, `intervals-bass`. |

## 2025

Paper: 16 pages. Schedule: 7 pages. Pop song, instrumental solo with accompaniment, and string quartet. The question and schedule emphasis is retained even where wording differs.

### Q1 — Pere Wihongi, *Mahuru*

| Part | Paper / schedule pages | Task and answer evidence | Practice implementation |
| --- | --- | --- | --- |
| (a)(i–ii) | 2 / 2 | A four-bar example using one of five devices, plus definition and explanation. The schedule requires an effective example with correct signatures/notation for comprehensive evidence. | All `compose-*` templates. |
| (b) | 3 / 2 | Em7, A7, Bm7. All three extensions must be recognised; a root-only label loses the harmonic information. | `harmony-sevenths`. |
| (c) | 3 / 2 | Choose rhythm OR tonality. Same syncopated bass outline and off-beat harmonic changes; different local centres (G and E minor) and repeated quavers versus steadier dotted-crotchet harmonic rhythm. | `feature-syncopation`, `feature-comparison`, related-key discussion. |
| (d) | 4 / 3 | Three-bar piano bass to bass-guitar TAB. The schedule explicitly shows two valid fingering solutions. Do not mark only one fret pattern correct. | `tab-bass-to-tab`; answer text permits alternate pitch-equivalent fingerings. |

The supplied PDF's extracted text duplicates portions of Q1(b–c) on page 2; visual reading places them on page 3. An embedded engraving/editor note labels one extract “19 Aug 2026”. This is recorded as an artefact inside the supplied 2025-named document, not used to silently relabel the exam year or treated as an authoring instruction.

### Q2 — Beethoven, *Für Elise*, arranged Lloyd Conley

| Part | Paper / schedule pages | Task and answer evidence | Practice implementation |
| --- | --- | --- | --- |
| (a) | 5 / 4 | E-flat alto sax to concert instrument: down M6, with exact accidentals, metre, key and performance markings. | `transpose-eb-concert`. |
| (b) | 6–7 / 4 | Home D minor moves to Bb major (submediant major), supported by F–Bb and Eb; then F major (relative major), supported by F harmony, removal of Eb, C pedal and an outlined F-major scale. | `keys-minor-related` requires both relationships and cadence/accidental evidence in original passages. |
| (c) | 6–7 / 4 | The paper asks dynamics, accompaniment AND tempo; the schedule heading says articulation but its evidence discusses softer dynamics, slurred melody, gentle arpeggios and slower tempo. Respect the actual paper request while recognising valid score evidence. | `feature-comparison`, performance discussion. |
| (d) | 8 / 5 | Piano completion under I–IV–V–I–IV–V7, retaining the required hand/voice structure and sevenths. A bass line alone is a starting point, not a complete realisation. | `complete-piano`. |

### Q3 — Saint-Saëns, String Quartet No. 2, Op.153

| Part | Paper / schedule pages | Task and answer evidence | Practice implementation |
| --- | --- | --- | --- |
| (a) | 10–11 / 6 | Viola/cello imitation and later violin II rhythmic imitation create overlapping counterpoint and a fuller opening. Other valid devices are possible. | `feature-imitation`. |
| (b) | 10–11 / 6 | Original material is inverted and extended; two-bar motifs become longer 5–6-bar phrases with a denser texture. Discuss familiarity and change through evidence. | `feature-development`. |
| (c) | 12 / 6 | Cello tenor clef to bass, retaining sounding pitch, accidentals, signature and performance information. | `clef-tenor-bass`. |
| (d) | 13 / 7 | M3, A4, M6, A4, P8, M2; some positions are in alto clef and some span parts. | `intervals-alto`; the app numbers each pair unambiguously rather than duplicating this repertoire. |

## Authoring and generation rules

1. Generate within an explicitly authored question family. Derive model notation and explanation from the same spelled-pitch data; never change a reference score by random transposition and still label it exact.
2. Preserve letter-name displacement AND semitone displacement in transposition. B-flat concert→written is +1 letter step/+2 semitones; E-flat alto is +5/+9; F horn is +4/+7. Reverse both signs for written→concert.
3. Clef changes preserve sounding pitch. Vocal-tenor and octave-down guitar display an octave above the semantic sounding pitches; alto and instrumental tenor are ordinary C clefs.
4. TAB carries string/fret position, rhythm and articulation. Validate the actual sounding MIDI pitch against the declared standard tuning. A printed model is one valid fingering, not the only valid fingering.
5. Count full duration per bar, including rests and dotted values. Leave missing regions genuinely blank. Neither rendering nor audio may fill them from harmonic labels.
6. A chord label must be supported by displayed chord tones and its actual bass. Include sevenths, slash basses and requested inversions; use realistic rhythmic surfaces for analysis rather than only isolated block stacks.
7. Discussion asks for specific evidence and effect. Avoid naming the intended device in a prompt that asks the learner to identify it. Composition tasks can name the selected device because applying it is their objective.
8. Preserve supplied information in completion questions and provide one possible model separately. Alternative effective voicings and interpretations require musical judgement.
9. Show provenance as “informed by” a source task. These short original exercises isolate and combine the assessed skills, with finite key/contour/rhythm variations; they do not claim every seed is a unique composition or that an exact full past paper is reproduced.
10. Do not generalise source-specific error tolerances into automated grading. Do not invent grade guarantees for a correct answer string.

## Deliberate limits

The app covers every major skill family encountered in these five papers. Some exact surfaces—multi-staff slur/fermata annotation, detailed tuplet/polyrhythm analysis and source-specific lyrical interpretations—are documented in this audit rather than reproduced. It provides no browser note-entry editor and no automated grading of paper notation. Completion models check chord membership and bass identity; they are short Level 2 realisation examples, not a certified strict four-part chorale style engine. Audio is a steady-tempo notation audition with simple tones, not an expressive performance renderer.

## Visual and rhythmic comparison, 16 October 2026

The rendered examination pages were compared again with the app scores, including the 2021 Happy/Mendelssohn extracts, 2022 Bray material, 2023 St Thomas, 2024 Mozart strings, and 2025 Mahuru/Für Elise. The earlier app overused uniform crotchets and repeated rhythms.

| Observed source feature | Revised original practice |
| --- | --- |
| Syncopation, rests and tied durations in the popular-song extracts | Authored offbeat and tied motifs; ties engrave and sustain correctly |
| Dotted figures and quick runs in 2022 material | Dotted-quaver/semiquaver figures and semiquaver openings; exact halving/doubling models |
| Motifs presented within phrases | Four-bar source extracts with Motif A labelled, phrase slurs, articulation and dynamics |
| Moving first violin against sustained lower strings in 2024 | Quartet completion uses a moving upper line, sustained inner voices, side labels and a compact connected system |
| Piano melody and broken-chord accompaniment in 2025 | Varied piano completion and chord-analysis surfaces with independent accompaniment rhythms |

The 16 motif shapes span 4/4, 3/4 and 6/8. Sequence, inversion, diminution and augmentation preserve the identity of each chosen motif rather than replacing it with arbitrary rhythms. These remain original teaching examples, not copies of the repertoire. Detailed tuplets and polyrhythms remain outside the renderer's declared scope.
