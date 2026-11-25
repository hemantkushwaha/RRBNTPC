import { ExamQuestion, SharedContextBlock } from './types';

export const SECTION_2_CONTEXTS: Record<string, SharedContextBlock> = {
  'rc-1': {
    id: 'rc-1',
    type: 'passage',
    rangeLabel: 'Q71 – Q73',
    title: 'Passage 1: Regenerative Braking in Modern Electric Rail Transit',
    theme: 'Science & Technology',
    passageParagraphs: [
      'When a conventional freight or passenger train slows down using friction brakes, its kinetic energy dissipates irrecoverably as heat across brake pads and wheel rims. In contrast, electric locomotives fitted with regenerative braking reverse the function of their traction motors during deceleration, converting them into electrical generators. As the rotating axles drive the motors against an electromagnetic resistance, the train slows smoothly while feeding electrical power back into the overhead traction line.',
      'However, the efficiency of regenerative braking depends critically on grid receptivity. Power returned to the overhead catenary can only be utilized if another accelerating train on the same electrical section draws it immediately, or if wayside energy-storage banks—such as stationary batteries or flywheels—absorb the surplus. When neither is available, onboard resistor grids must burn off the excess electricity as heat to prevent dangerous voltage spikes. Consequently, transit planners increasingly pair regenerative fleets with synchronized timetables and substation storage to convert theoretical energy savings into dependable operational reductions.',
    ],
  },
  'rc-2': {
    id: 'rc-2',
    type: 'passage',
    rangeLabel: 'Q74 – Q76',
    title: 'Passage 2: Urban Heat Islands and Permeable Infrastructure',
    theme: 'Environment & Society',
    passageParagraphs: [
      'Dense metropolitan corridors routinely record evening air temperatures three to five degrees higher than surrounding rural landscapes—a phenomenon driven largely by dark, impermeable asphalt and concrete surfaces that absorb solar radiation throughout the day and release it slowly after sunset. Beyond elevating cooling demand, impervious paving accelerates stormwater runoff, overwhelming drainage networks during intense cloudbursts.',
      'Urban hydrologists have therefore championed permeable pavements engineered with interconnected pore spaces that allow rainwater to infiltrate into underlying gravel reservoirs. While early municipal trials raised concerns about pore clogging from fine silt and lower load-bearing capacity on heavy freight arteries, routine vacuum sweeping and structural reinforcement grids have mitigated both drawbacks in pedestrian plazas and feeder streets. Yet researchers caution that permeable surfacing is no standalone cure; its cooling impact multiplies only when integrated with tree-canopy shade and reflective roofing across an entire district.',
    ],
  },
  'rc-3': {
    id: 'rc-3',
    type: 'passage',
    rangeLabel: 'Q77 – Q80',
    title: 'Passage 3: The Paradox of Archival Fixity and Living Oral Traditions',
    theme: 'Literature, Culture & Abstract Reasoning',
    passageParagraphs: [
      'Cultural preservationists have long equated permanence with transcription: to rescue a vanishing epic, folk ballad, or regional craft narrative, one must record it in print or digital media before its last practitioners disappear. Undeniably, archives safeguard vocabulary, cadence, and mythological motifs against total erasure, enabling future scholars to reconstruct worlds that would otherwise leave no trace.',
      'Yet anthropologists note a subtle paradox embedded in this rescue effort. Oral traditions endure precisely because they are elastic—each storyteller reshapes emphasis, tempo, and metaphor to speak to the anxieties of a live audience. When a single performance is canonized inside a printed volume or museum recording, that particular version often acquires unearned authority, silently freezing a dynamic dialogue into an immutable script. Succeeding generations may then measure living performers against the archived text rather than against the responsiveness of the gathering. True cultural stewardship, therefore, requires distinguishing between preserving an artifact and sustaining a practice: archives keep the echo alive, whereas only participatory communities keep the voice breathing.',
    ],
  },
};

export const SECTION_2_QUESTIONS: ExamQuestion[] = [
  // ======================== LOGICAL REASONING (Q61–Q70) ========================
  // EASY (Q61–Q63)
  {
    id: 61,
    sectionId: '2',
    subSection: 'Logical Reasoning',
    topic: 'Syllogism',
    difficulty: 'Easy',
    label: 'Previous-Year Pattern Question',
    question:
      'Read the given statements and conclusions carefully. Assuming the statements to be true, decide which conclusion(s) logically follow.',
    statements: [
      'Statements: (1) All signals are lamps. (2) Some lamps are LEDs.',
      'Conclusions: I. Some signals are LEDs.   II. Some lamps are signals.',
    ],
    options: {
      A: 'Only Conclusion I follows',
      B: 'Only Conclusion II follows',
      C: 'Both Conclusions I and II follow',
      D: 'Neither Conclusion I nor II follows',
    },
    correctOption: 'B',
    explanation:
      'From "All signals are lamps", the signal circle lies completely inside the lamp circle; therefore "Some lamps are signals" (Conclusion II) definitely follows. However, the LED circle may intersect only the non-signal part of lamps, so Conclusion I ("Some signals are LEDs") is not definitely true.',
    shortcut:
      'Immediate conversion rule: "All A are B" ALWAYS implies "Some B are A". No definite link exists between A and C when middle term B is undistributed.',
  },
  {
    id: 62,
    sectionId: '2',
    subSection: 'Logical Reasoning',
    topic: 'Blood Relations',
    difficulty: 'Easy',
    label: 'Previous-Year Pattern Question',
    question:
      'Pointing to a man in a photograph, Meera says, "He is the only son of my mother’s father." How is the man in the photograph related to Meera?',
    options: {
      A: 'Father',
      B: 'Brother',
      C: 'Maternal Uncle',
      D: 'Cousin',
    },
    correctOption: 'C',
    explanation:
      'Meera’s mother’s father is Meera’s maternal grandfather. The only son of her maternal grandfather is her mother’s brother, who is Meera’s Maternal Uncle.',
    shortcut:
      'Decode backwards from "my": mother’s father (maternal grandfather) → his only son = mother’s brother = Maternal Uncle.',
  },
  {
    id: 63,
    sectionId: '2',
    subSection: 'Logical Reasoning',
    topic: 'Calendars',
    difficulty: 'Easy',
    label: 'Previous-Year Pattern Question',
    question:
      'If 15 March 2026 falls on a Sunday, what day of the week will 15 April 2026 be?',
    options: {
      A: 'Tuesday',
      B: 'Wednesday',
      C: 'Thursday',
      D: 'Friday',
    },
    correctOption: 'B',
    explanation:
      'March has 31 days. Moving from 15 March to 15 April spans exactly 31 days. Dividing 31 by 7 gives 4 full weeks and 3 odd days. Sunday + 3 days = Wednesday.',
    shortcut:
      'A 31-day month shifts the same date forward by +3 days (a 30-day month shifts by +2). Sunday + 3 = Wednesday.',
  },

  // MODERATE (Q64–Q67)
  {
    id: 64,
    sectionId: '2',
    subSection: 'Logical Reasoning',
    topic: 'Clocks',
    difficulty: 'Moderate',
    label: 'Previous-Year Pattern Question',
    question:
      'Find the smaller angle (in degrees) between the hour hand and the minute hand of an analog clock at 4:20.',
    options: { A: '0°', B: '5°', C: '10°', D: '15°' },
    correctOption: 'C',
    explanation:
      'Using the standard clock angle formula θ = |30H − 5.5M|: at H = 4 and M = 20, θ = |30(4) − 5.5(20)| = |120 − 110| = 10°.',
    shortcut:
      'When H : M is in the exact ratio 1 : 5 (like 4:20, 6:30, 8:40), the angle is simply M / 2 = 20 / 2 = 10°!',
  },
  {
    id: 65,
    sectionId: '2',
    subSection: 'Logical Reasoning',
    topic: 'Assumptions',
    difficulty: 'Moderate',
    label: 'Model Practice Question',
    question:
      'Evaluate the statement and decide which of the given assumptions is/are implicit in it.',
    statements: [
      'Statement: "To reduce platform congestion during morning peak hours, the railway division has doubled the frequency of suburban trains between 8:00 AM and 10:00 AM."',
      'Assumptions: I. Increasing train frequency during peak hours will help clear waiting passengers faster.   II. No commuters travel on suburban trains after 10:00 AM.',
    ],
    options: {
      A: 'Only Assumption I is implicit',
      B: 'Only Assumption II is implicit',
      C: 'Both Assumptions I and II are implicit',
      D: 'Neither Assumption I nor II is implicit',
    },
    correctOption: 'A',
    explanation:
      'Assumption I is directly implicit because the division expects higher train frequency to alleviate platform crowding. Assumption II is an extreme generalization ("No commuters") that is neither stated nor required to justify peak-hour scheduling.',
    shortcut:
      'Eliminate assumptions containing extreme absolute quantifiers ("No", "Only", "Always") unless explicitly demanded by the statement.',
  },
  {
    id: 66,
    sectionId: '2',
    subSection: 'Logical Reasoning',
    topic: 'Family Tree',
    difficulty: 'Moderate',
    label: 'Model Practice Question',
    question:
      'In a family of six members P, Q, R, S, T, and U: P and Q are a married couple, with P being the male member. S is the only son of R, who is the brother of P. T is the sister of S. Q is the daughter-in-law of U, whose husband has passed away. How is U related to T?',
    options: {
      A: 'Mother',
      B: 'Paternal Aunt',
      C: 'Paternal Grandmother',
      D: 'Maternal Grandmother',
    },
    correctOption: 'C',
    explanation:
      'Q is married to P (male) and is the daughter-in-law of U. Since U’s husband has passed away, U is female and is the mother of P. R is P’s brother, so U is also the mother of R. S (male) and T (female) are R’s children. Hence U is the mother of T’s father (R), making U the Paternal Grandmother of T.',
    shortcut:
      'Track generations vertically: Gen 1: U(F) → Gen 2: P(M)=Q(F), R(M) → Gen 3: S(M), T(F). Two levels up via father R = Paternal Grandmother.',
  },
  {
    id: 67,
    sectionId: '2',
    subSection: 'Logical Reasoning',
    topic: 'Clocks',
    difficulty: 'Moderate',
    label: 'Previous-Year Pattern Question',
    question:
      'At what exact time between 7 o’clock and 8 o’clock will the hour and minute hands of a clock be perpendicular (90°) to each other for the FIRST time?',
    options: {
      A: '7 : 20 (9/11)',
      B: '7 : 21 (9/11)',
      C: '7 : 22 (8/11)',
      D: '7 : 54 (6/11)',
    },
    correctOption: 'B',
    explanation:
      'At 7:00, the hour hand is 210° ahead of the minute hand. For the first 90° angle, the gap narrows from 210° to 90°, so the minute hand must gain 210° − 90° = 120° relative to the hour hand. Since the relative speed is 5.5° (11/2°) per minute, time M = 120 / (11/2) = 240/11 = 21 (9/11) minutes past 7.',
    shortcut:
      'Use M = (2/11)(30H ± 90). For the first occurrence after 7: (2/11)(210 − 90) = 240/11 = 21 (9/11) min.',
  },

  // DIFFICULT (Q68–Q70)
  {
    id: 68,
    sectionId: '2',
    subSection: 'Logical Reasoning',
    topic: 'Binary Logic',
    difficulty: 'Difficult',
    label: 'Model Practice Question',
    question:
      'Three safety auditors—Arun, Bala, and Chitra—are each either a Truth-teller (always speaks the truth) or a Liar (always lies). It is known that EXACTLY ONE of them is a Truth-teller. Based on their statements below, who is the Truth-teller?',
    statements: [
      'Arun says: "Bala is a Liar."',
      'Bala says: "Chitra is a Liar."',
      'Chitra says: "Arun and Bala are both Liars."',
    ],
    options: {
      A: 'Arun',
      B: 'Bala',
      C: 'Chitra',
      D: 'Cannot be determined',
    },
    correctOption: 'B',
    explanation:
      'Test each of the 3 possibilities (exactly one Truth-teller): (1) If Arun = T, then Bala = L and Chitra = L; however, Bala’s statement ("Chitra is a Liar") would become True, contradicting Bala = L. (2) If Bala = T, then Arun = L and Chitra = L; Arun’s statement ("Bala is L") is False ✓, Bala’s statement ("Chitra is L") is True ✓, and Chitra’s statement ("Both Arun and Bala are L") is False ✓. (3) If Chitra = T, Arun’s statement ("Bala is L") becomes True, contradicting Arun = L. Thus Bala is uniquely the Truth-teller.',
    shortcut:
      'Test truth of "Bala is a Liar": if Arun is T or Chitra is T, Bala is L, making Arun’s statement True in both cases—forcing two Truth-tellers when Chitra = T, or making Bala’s statement True when Arun = T. Only Bala = T avoids contradiction.',
  },
  {
    id: 69,
    sectionId: '2',
    subSection: 'Logical Reasoning',
    topic: 'Calendars',
    difficulty: 'Difficult',
    label: 'Previous-Year Pattern Question',
    question:
      'If 26 January 2024 fell on a Friday, what day of the week will 26 January 2030 fall on?',
    options: {
      A: 'Friday',
      B: 'Saturday',
      C: 'Sunday',
      D: 'Monday',
    },
    correctOption: 'B',
    explanation:
      'Count odd days for each full year from 26 Jan 2024 to 26 Jan 2030 (6 years total): 2024–25 crosses 29 Feb 2024 (+2); 2025–26 (+1); 2026–27 (+1); 2027–28 (+1); 2028–29 crosses 29 Feb 2028 (+2); 2029–30 (+1). Total odd days = 2 + 1 + 1 + 1 + 2 + 1 = 8 ≡ 1 (mod 7). Friday + 1 day = Saturday.',
    shortcut:
      'Odd days = Total years (6) + Leap days crossed (2: Feb 29 in 2024 & 2028) = 8 ≡ +1 day → Friday + 1 = Saturday.',
  },
  {
    id: 70,
    sectionId: '2',
    subSection: 'Logical Reasoning',
    topic: 'Logical Puzzle',
    difficulty: 'Difficult',
    label: 'Model Practice Question',
    question:
      'Four trains—Alpha, Beta, Gamma, and Delta—arrive at four distinct platforms (1, 2, 3, 4) heading to four distinct directions (East, West, North, South). Using the clues below, identify which train arrives at Platform 3 and its destination.',
    statements: [
      'Clue 1: Alpha arrives at an odd-numbered platform and heads neither North nor South.',
      'Clue 2: The North-bound train arrives at Platform 2.',
      'Clue 3: Gamma heads South and arrives at a higher-numbered platform than Beta.',
      'Clue 4: Delta arrives at Platform 1 and heads East.',
    ],
    options: {
      A: 'Alpha — West',
      B: 'Beta — West',
      C: 'Gamma — South',
      D: 'Alpha — East',
    },
    correctOption: 'A',
    explanation:
      'From Clue 4, Platform 1 = Delta (East). From Clue 1, Alpha needs an odd platform; since Platform 1 is taken, Alpha = Platform 3. Because East is taken and Alpha goes neither North nor South, Alpha must head West. From Clue 2, Platform 2 is North-bound; since Gamma goes South (Clue 3), Beta must be Platform 2 (North) and Gamma = Platform 4 (South, satisfying 4 > 2). Hence Platform 3 hosts Alpha heading West.',
    shortcut:
      'Clues 1 and 4 alone lock Platform 3 immediately: Platform 1 = Delta (East) leaves only odd Platform 3 for Alpha, and eliminates East/North/South leaving West.',
  },

  // ======================== READING COMPREHENSION (Q71–Q80) ========================
  // PASSAGE 1: Q71 (Easy), Q72 (Easy), Q73 (Moderate)
  {
    id: 71,
    sectionId: '2',
    subSection: 'Reading Comprehension',
    topic: 'RC — Main Idea',
    difficulty: 'Easy',
    label: 'Model Practice Question',
    contextId: 'rc-1',
    question: 'What is the primary focus of Passage 1?',
    options: {
      A: 'Why conventional friction brakes are being legally banned on freight railways.',
      B: 'How regenerative braking recovers train energy and the grid conditions required to utilize it effectively.',
      C: 'The manufacturing costs of stationary batteries compared to flywheels.',
      D: 'Why electric locomotives accelerate faster than diesel locomotives.',
    },
    correctOption: 'B',
    explanation:
      'Paragraph 1 explains the mechanism of regenerative braking (motors acting as generators), and Paragraph 2 explains grid receptivity, storage banks, and timetable coordination needed to realize savings. Options A, C, and D introduce claims unsupported by the passage.',
    shortcut:
      'Combine the topic sentence of Paragraph 1 (mechanism) + Paragraph 2 (grid receptivity condition) → Option B covers the whole scope.',
  },
  {
    id: 72,
    sectionId: '2',
    subSection: 'Reading Comprehension',
    topic: 'RC — Supporting Idea',
    difficulty: 'Easy',
    label: 'Model Practice Question',
    contextId: 'rc-1',
    question:
      'According to Passage 1, what happens to excess regenerated electricity when neither a nearby accelerating train nor wayside energy storage can absorb it?',
    options: {
      A: 'The locomotive automatically switches off its traction motors.',
      B: 'It is stored indefinitely inside the overhead catenary wire.',
      C: 'Onboard resistor grids dissipate it as heat to prevent voltage spikes.',
      D: 'It forces the train to rely solely on mechanical friction pads.',
    },
    correctOption: 'C',
    explanation:
      'Paragraph 2 explicitly states: "When neither is available, onboard resistor grids must burn off the excess electricity as heat to prevent dangerous voltage spikes."',
    shortcut:
      'Scan Paragraph 2 for the keyword "neither" to locate the exact supporting fact.',
  },
  {
    id: 73,
    sectionId: '2',
    subSection: 'Reading Comprehension',
    topic: 'RC — Application',
    difficulty: 'Moderate',
    label: 'Model Practice Question',
    contextId: 'rc-1',
    question:
      'A commuter rail corridor with low off-peak train frequency plans to adopt regenerative braking but has no nearby trains drawing power most of the time. Based on Passage 1, which intervention would BEST convert its braking energy into usable savings?',
    options: {
      A: 'Replacing overhead catenary wires with thicker friction brake pads.',
      B: 'Installing wayside substation battery or flywheel energy-storage banks.',
      C: 'Removing onboard resistor grids from every locomotive.',
      D: 'Increasing top cruising speeds between stations.',
    },
    correctOption: 'B',
    explanation:
      'The passage states that when no accelerating train is present on the same electrical section, wayside energy-storage banks (stationary batteries or flywheels) absorb the surplus power so it is not wasted as heat in resistor grids.',
    shortcut:
      'Low frequency = low chance of a simultaneous accelerating train → apply the passage’s second receptivity mechanism (wayside storage).',
  },

  // PASSAGE 2: Q74 (Moderate), Q75 (Moderate), Q76 (Moderate)
  {
    id: 74,
    sectionId: '2',
    subSection: 'Reading Comprehension',
    topic: 'RC — Inference',
    difficulty: 'Moderate',
    label: 'Model Practice Question',
    contextId: 'rc-2',
    question:
      'Which of the following can be logically inferred from Passage 2 regarding permeable pavements?',
    options: {
      A: 'They require zero maintenance once installed with structural reinforcement grids.',
      B: 'They are currently unsuitable for pedestrian plazas due to fine silt buildup.',
      C: 'They can address both stormwater runoff and urban cooling, though maximum cooling requires complementary measures.',
      D: 'They completely eliminate the urban heat island effect within a single summer.',
    },
    correctOption: 'C',
    explanation:
      'Passage 2 explains that permeable pavements allow rainwater infiltration (addressing runoff) and contribute to cooling, while adding that their cooling impact "multiplies only when integrated with tree-canopy shade and reflective roofing." Options A, B, and D directly contradict the text.',
    shortcut:
      'Check extreme words in distractors ("zero maintenance", "unsuitable", "completely eliminate") — all contradict the nuanced claim in C.',
  },
  {
    id: 75,
    sectionId: '2',
    subSection: 'Reading Comprehension',
    topic: 'RC — Logical Structure',
    difficulty: 'Moderate',
    label: 'Model Practice Question',
    contextId: 'rc-2',
    question:
      'How is the argument in Passage 2 logically structured?',
    options: {
      A: 'It rejects a widely accepted environmental theory and proposes an unverified hypothesis.',
      B: 'It outlines an urban problem, introduces an engineering solution with addressed limitations, and qualifies its scope.',
      C: 'It compares rural agriculture against metropolitan transport budgets.',
      D: 'It narrates a chronological biography of municipal urban hydrologists.',
    },
    correctOption: 'B',
    explanation:
      'Paragraph 1 defines the twin urban problems (heat islands and stormwater runoff). Paragraph 2 introduces permeable pavements, notes early drawbacks (clogging, load-bearing) and their mitigations, and concludes by qualifying that they work best alongside canopy shade and reflective roofs.',
    shortcut:
      'Map paragraph roles: Para 1 = Problem → Para 2 = Solution + Drawbacks/Fixes + Qualification ("Yet researchers caution...").',
  },
  {
    id: 76,
    sectionId: '2',
    subSection: 'Reading Comprehension',
    topic: 'RC — Author’s Purpose',
    difficulty: 'Moderate',
    label: 'Model Practice Question',
    contextId: 'rc-2',
    question:
      'Why does the author mention "routine vacuum sweeping and structural reinforcement grids" in Paragraph 2?',
    options: {
      A: 'To prove that permeable pavements are too expensive for municipal adoption.',
      B: 'To illustrate how practical engineering and maintenance measures overcame early performance objections.',
      C: 'To argue that conventional asphalt roads should never be repaired.',
      D: 'To show that tree canopies are unnecessary in pedestrian plazas.',
    },
    correctOption: 'B',
    explanation:
      'The sentence immediately contrasts early concerns (pore clogging and lower load-bearing capacity) with "routine vacuum sweeping and structural reinforcement grids [which] have mitigated both drawbacks."',
    shortcut:
      'Read the clause immediately before ("early municipal trials raised concerns...") and the verb "mitigated" → proves purpose is answering objections.',
  },

  // PASSAGE 3: Q77 (Moderate), Q78 (Difficult), Q79 (Difficult), Q80 (Difficult)
  {
    id: 77,
    sectionId: '2',
    subSection: 'Reading Comprehension',
    topic: 'RC — Supporting Idea',
    difficulty: 'Moderate',
    label: 'Model Practice Question',
    contextId: 'rc-3',
    question:
      'According to Passage 3, what key quality allows oral traditions to remain alive across generations?',
    options: {
      A: 'Strict adherence to an unchanging printed manuscript.',
      B: 'Their elasticity, allowing performers to adapt emphasis and metaphor to live audiences.',
      C: 'Their isolation from contemporary social anxieties.',
      D: 'The removal of regional vocabulary and cadence.',
    },
    correctOption: 'B',
    explanation:
      'Paragraph 2 states: "Oral traditions endure precisely because they are elastic—each storyteller reshapes emphasis, tempo, and metaphor to speak to the anxieties of a live audience."',
    shortcut:
      'Locate the phrase "endure precisely because" in Paragraph 2 for the exact causal explanation.',
  },
  {
    id: 78,
    sectionId: '2',
    subSection: 'Reading Comprehension',
    topic: 'RC — Tone & Style',
    difficulty: 'Difficult',
    label: 'Model Practice Question',
    contextId: 'rc-3',
    question:
      'Which phrase best describes the author’s tone toward archival preservation in Passage 3?',
    options: {
      A: 'Dismissive and hostile toward all written documentation.',
      B: 'Uncritically enthusiastic about digital transcription.',
      C: 'Balanced and analytical, acknowledging archival value while warning of unintended rigidity.',
      D: 'Sarcastic and indifferent to cultural continuity.',
    },
    correctOption: 'C',
    explanation:
      'In Paragraph 1, the author validates archives ("Undeniably, archives safeguard..."). In Paragraph 2, the author weighs the unintended cost ("Yet anthropologists note a subtle paradox...") and ends with a balanced distinction. This reflects a measured, analytical tone.',
    shortcut:
      'Notice the classic balanced pivot markers: "Undeniably..." (credit) + "Yet..." (caution) = Balanced and analytical.',
  },
  {
    id: 79,
    sectionId: '2',
    subSection: 'Reading Comprehension',
    topic: 'RC — Inference',
    difficulty: 'Difficult',
    label: 'Model Practice Question',
    contextId: 'rc-3',
    question:
      'What unintended consequence does the author imply may occur when one version of an oral epic is canonized in a museum recording?',
    options: {
      A: 'Future scholars will lose all access to its original vocabulary.',
      B: 'Later audiences may judge live storytellers by fidelity to the fixed recording rather than live audience engagement.',
      C: 'Oral storytellers will immediately stop speaking regional languages.',
      D: 'Printed books will completely replace museums as cultural institutions.',
    },
    correctOption: 'B',
    explanation:
      'Paragraph 2 explains that canonizing a single performance freezes a dialogue into an immutable script, causing succeeding generations to "measure living performers against the archived text rather than against the responsiveness of the gathering."',
    shortcut:
      'Match "canonized" and "measure living performers against the archived text" directly to Option B.',
  },
  {
    id: 80,
    sectionId: '2',
    subSection: 'Reading Comprehension',
    topic: 'RC — Logical Conclusion',
    difficulty: 'Difficult',
    label: 'Model Practice Question',
    contextId: 'rc-3',
    question:
      'Which statement best captures the concluding distinction drawn by the author in the final sentence of Passage 3?',
    options: {
      A: 'Archives should be dismantled so that communities rely exclusively on memory.',
      B: 'Recording an artifact preserves a trace of a tradition, but keeping a tradition truly living requires active community participation.',
      C: 'Participatory communities are incapable of maintaining historical accuracy without scholars.',
      D: 'Digital archives are superior to printed books for capturing emotional tempo.',
    },
    correctOption: 'B',
    explanation:
      'The closing sentence contrasts "preserving an artifact" (archives keep the echo alive) with "sustaining a practice" (participatory communities keep the voice breathing), confirming that both have distinct roles and community participation is essential for living vitality.',
    shortcut:
      'Translate the closing metaphor literally: "echo" = preserved trace/artifact; "voice breathing" = living tradition sustained by community.',
  },
];
