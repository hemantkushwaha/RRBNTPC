import { ExamQuestion } from './types';

export const SECTION_3_QUESTIONS: ExamQuestion[] = [
  // ======================== EASY (Q81–Q87) ========================
  {
    id: 81,
    sectionId: '3',
    topic: 'Number Series',
    difficulty: 'Easy',
    label: 'Previous-Year Pattern Question',
    question: 'Find the next number in the series: 7, 11, 19, 35, 67, ?',
    options: { A: '115', B: '125', C: '131', D: '135' },
    correctOption: 'C',
    explanation:
      'Take consecutive differences: 11 − 7 = 4, 19 − 11 = 8, 35 − 19 = 16, 67 − 35 = 32. Each difference doubles, so the next difference is 64. Next term = 67 + 64 = 131.',
    shortcut: 'Alternative direct rule: Next = 2 × Current − 3 ⇒ 2(67) − 3 = 131.',
  },
  {
    id: 82,
    sectionId: '3',
    topic: 'Letter Series',
    difficulty: 'Easy',
    label: 'Previous-Year Pattern Question',
    question: 'Find the next letter in the alphabetical series: B, E, H, K, N, ?',
    options: { A: 'P', B: 'Q', C: 'R', D: 'S' },
    correctOption: 'B',
    explanation:
      'Convert letters to alphabetical positions (A=1…Z=26): B(2), E(5), H(8), K(11), N(14). Each step increases by +3. Thus 14 + 3 = 17, which corresponds to Q.',
    shortcut: 'Skip 2 letters after N (O, P) → land directly on Q.',
  },
  {
    id: 83,
    sectionId: '3',
    topic: 'Analogy',
    difficulty: 'Easy',
    label: 'Previous-Year Pattern Question',
    question:
      'Select the word that relates to the third word in the same way as the second word relates to the first: THERMOMETER : TEMPERATURE :: AMMETER : ?',
    options: {
      A: 'Electric Current',
      B: 'Voltage',
      C: 'Electrical Resistance',
      D: 'Atmospheric Pressure',
    },
    correctOption: 'A',
    explanation:
      'A thermometer is the instrument used to measure temperature. Similarly, an ammeter is the instrument used to measure electric current (amperes).',
    shortcut: 'Identify the relation "Instrument : Physical Quantity Measured".',
  },
  {
    id: 84,
    sectionId: '3',
    topic: 'Coding-Decoding',
    difficulty: 'Easy',
    label: 'Previous-Year Pattern Question',
    question:
      'In a certain code language, TRAIN is written as USBJO. How will SIGNAL be written in the same code language?',
    options: { A: 'TJHOBM', B: 'TJHNBM', C: 'TJHOBN', D: 'SJHOBM' },
    correctOption: 'A',
    explanation:
      'Each letter in TRAIN shifts forward by +1 in the alphabet: T→U, R→S, A→B, I→J, N→O. Applying +1 to SIGNAL: S→T, I→J, G→H, N→O, A→B, L→M gives TJHOBM.',
    shortcut:
      'Check the first and last letters (S+1=T, L+1=M) and middle N+1=O to eliminate B, C, and D instantly.',
  },
  {
    id: 85,
    sectionId: '3',
    topic: 'Ranking',
    difficulty: 'Easy',
    label: 'Previous-Year Pattern Question',
    question:
      'In a single row of 45 railway trainees, Rohit is ranked 18th from the left end. What is his rank from the right end?',
    options: { A: '26th', B: '27th', C: '28th', D: '29th' },
    correctOption: 'C',
    explanation:
      'Using Rank from Right = Total − Rank from Left + 1: 45 − 18 + 1 = 27 + 1 = 28th.',
    shortcut: 'Always compute (Total + 1) − Given Rank = 46 − 18 = 28th.',
  },
  {
    id: 86,
    sectionId: '3',
    topic: 'Logical Sequence',
    difficulty: 'Easy',
    label: 'Model Practice Question',
    question:
      'Arrange the following journey stages in a meaningful chronological sequence: (1) Departure, (2) Ticket Booking, (3) Arrival, (4) Boarding, (5) Security Check.',
    options: {
      A: '2, 5, 4, 1, 3',
      B: '2, 4, 5, 1, 3',
      C: '5, 2, 4, 1, 3',
      D: '2, 5, 1, 4, 3',
    },
    correctOption: 'A',
    explanation:
      'A passenger completes Ticket Booking (2), passes through Security Check (5), performs Boarding (4), experiences train Departure (1), and reaches Arrival (3). Sequence: 2, 5, 4, 1, 3.',
    shortcut:
      'Anchor start = 2 (Booking) and end = 1, 3 (Departure → Arrival); check Security Check (5) precedes Boarding (4).',
  },
  {
    id: 87,
    sectionId: '3',
    topic: 'Analogy (Numerical)',
    difficulty: 'Easy',
    label: 'Model Practice Question',
    question:
      'Select the number that shares the same relationship with 15 as 156 shares with 12:   12 : 156 :: 15 : ?',
    options: { A: '210', B: '225', C: '240', D: '255' },
    correctOption: 'C',
    explanation:
      'The pattern is n : n² + n (equivalently n × (n + 1)). Check: 12 × 13 = 156. Applying to 15: 15 × 16 = 240 (or 15² + 15 = 225 + 15 = 240).',
    shortcut: 'Compute 15² + 15 = 225 + 15 = 240 in 3 seconds.',
  },

  // ======================== MODERATE (Q88–Q94) ========================
  {
    id: 88,
    sectionId: '3',
    topic: 'Series Completion',
    difficulty: 'Moderate',
    label: 'Previous-Year Pattern Question',
    question:
      'Which sequence of letters, when placed sequentially in the blanks, completes the repeating pattern?   a _ c b a b _ b _ b c _',
    options: {
      A: 'b, c, a, b',
      B: 'c, b, a, b',
      C: 'b, a, c, b',
      D: 'b, c, b, a',
    },
    correctOption: 'A',
    explanation:
      'Count the total characters: 12 letters, which split cleanly into three 4-letter blocks: (a _ c b) | (a b _ b) | (_ b c _). Comparing the three blocks shows the repeating unit is "abcb". Filling the blanks yields: a(b)cb | ab(c)b | (a)bc(b) ⇒ b, c, a, b.',
    shortcut:
      'Count total length (12 = 3 × 4), slice into groups of 4, and overlay them vertically to read off every blank instantly.',
  },
  {
    id: 89,
    sectionId: '3',
    topic: 'Coding-Decoding',
    difficulty: 'Moderate',
    label: 'Model Practice Question',
    question:
      'In a numerical code, TRACK is coded as 58 and RAIL is coded as 44. Using the same rule, how will METRO be coded?',
    options: { A: '71', B: '74', C: '76', D: '81' },
    correctOption: 'C',
    explanation:
      'Rule: Sum of alphabetical positions (A=1…Z=26) + Number of letters in the word. Check TRACK: T(20)+R(18)+A(1)+C(3)+K(11) = 53; 53 + 5 = 58 ✓. Check RAIL: R(18)+A(1)+I(9)+L(12) = 40; 40 + 4 = 44 ✓. For METRO: M(13)+E(5)+T(20)+R(18)+O(15) = 71; 71 + 5 = 76.',
    shortcut:
      'Use EJOTY anchors (E=5, J=10, O=15, T=20, Y=25) to sum METRO fast: 13 + 5 + 20 + 18 + 15 = 71, plus word length 5 = 76.',
  },
  {
    id: 90,
    sectionId: '3',
    topic: 'Order & Position',
    difficulty: 'Moderate',
    label: 'Previous-Year Pattern Question',
    question:
      'In a row of trainees facing North, Priya is 12th from the left end and Kavita is 17th from the right end. When they interchange their positions, Priya becomes 21st from the left end. How many trainees are in the row?',
    options: { A: '36', B: '37', C: '38', D: '39' },
    correctOption: 'B',
    explanation:
      'After interchanging, Priya sits in Kavita’s original seat. That seat is therefore both 21st from the left and 17th from the right. Total trainees = 21 + 17 − 1 = 37.',
    shortcut:
      'Interchange formula: Total = (New position of Person 1) + (Old position of Person 2) − 1 = 21 + 17 − 1 = 37.',
  },
  {
    id: 91,
    sectionId: '3',
    topic: 'Letter Series',
    difficulty: 'Moderate',
    label: 'Previous-Year Pattern Question',
    question: 'Find the next letter-pair in the series: AZ, CX, FU, JQ, ?',
    options: { A: 'OL', B: 'OM', C: 'NL', D: 'PK' },
    correctOption: 'A',
    explanation:
      'First letters follow increasing increments: A(1) +2 → C(3) +3 → F(6) +4 → J(10) +5 → O(15). Each second letter is the exact alphabetical opposite (sum of positions = 27): A+Z=27, C+X=27, F+U=27, J+Q=27. Opposite of O(15) is 27 − 15 = 12 → L. Next term: OL.',
    shortcut:
      'Spot opposite-letter pairs (sum = 27); only OL among the options is an opposite pair (15 + 12 = 27)!',
  },
  {
    id: 92,
    sectionId: '3',
    topic: 'Arrangements (Linear)',
    difficulty: 'Moderate',
    label: 'Model Practice Question',
    question:
      'Six station masters (A, B, C, D, E, F) sit in a straight row facing North. C sits third to the right of A. F sits at one of the extreme ends and is immediately to the right of C. B sits between A and E, while D sits immediately to the left of A. Who sits immediately to the left of C?',
    options: { A: 'A', B: 'B', C: 'D', D: 'E' },
    correctOption: 'D',
    explanation:
      'Place positions 1 to 6 left-to-right. Since D is immediately left of A, we have (D A). C is 3rd right of A, and F is immediately right of C at an extreme end, forcing F = 6, C = 5, A = 2, and D = 1. Remaining seats 3 and 4 hold B and E; because B sits between A(2) and E, B = 3 and E = 4. Full order: D, A, B, E, C, F. Immediately left of C is E.',
    shortcut:
      'Lock the extreme end first: F = 6 → C = 5 → A = 2 (3 left of C) → D = 1. Then A–B–E fills 2–3–4, putting E right next to C.',
  },
  {
    id: 93,
    sectionId: '3',
    topic: 'Pattern Recognition',
    difficulty: 'Moderate',
    label: 'Previous-Year Pattern Question',
    inlineTable: {
      title: '3 × 3 Number Pattern Matrix',
      headers: ['Col 1', 'Col 2', 'Col 3'],
      rows: [
        [4, 9, 25],
        [6, 11, 47],
        [8, 13, '?'],
      ],
    },
    question: 'Identify the row-wise numerical rule in the matrix above and find the missing number.',
    options: { A: '69', B: '73', C: '77', D: '81' },
    correctOption: 'C',
    explanation:
      'Across each row, (Col 1)² + Col 2 = Col 3. Row 1: 4² + 9 = 16 + 9 = 25 ✓. Row 2: 6² + 11 = 36 + 11 = 47 ✓. Row 3: 8² + 13 = 64 + 13 = 77.',
    shortcut:
      'Notice Col 3 grows much faster than Col 1 (25, 47), signalling squaring of Col 1: 64 + 13 = 77.',
  },
  {
    id: 94,
    sectionId: '3',
    topic: 'Number Series (Wrong Term)',
    difficulty: 'Moderate',
    label: 'Model Practice Question',
    question:
      'One term in the following number series does NOT follow the underlying rule. Identify the wrong term:   3, 7, 16, 35, 74, 152, 312',
    options: { A: '35', B: '74', C: '152', D: '312' },
    correctOption: 'C',
    explanation:
      'Each term follows x_(n+1) = 2 × x_n + n: 3×2+1 = 7; 7×2+2 = 16; 16×2+3 = 35; 35×2+4 = 74; 74×2+5 = 153 (not 152); and checking the next step: 153×2+6 = 312 ✓. Hence 152 is the wrong number.',
    shortcut:
      'Always verify the term AFTER your suspect: 153 × 2 + 6 = 312 confirms 152 is the sole error.',
  },

  // ======================== DIFFICULT (Q95–Q100) ========================
  {
    id: 95,
    sectionId: '3',
    topic: 'Arrangements (Circular)',
    difficulty: 'Difficult',
    label: 'Model Practice Question',
    question:
      'Eight railway engineers (P, Q, R, S, T, U, V, W) sit equally spaced around a circular table facing the centre. Using the clues below, determine who sits directly opposite to W.',
    statements: [
      'Clue 1: P sits third to the left of T.',
      'Clue 2: R sits second to the right of P.',
      'Clue 3: S sits directly opposite to R.',
      'Clue 4: Q sits immediately to the right of S.',
      'Clue 5: V sits between T and U, and U is NOT an immediate neighbour of P.',
    ],
    options: { A: 'P', B: 'Q', C: 'U', D: 'V' },
    correctOption: 'C',
    explanation:
      'Number seats 1–8 clockwise (facing centre: Left = clockwise, Right = anticlockwise). Place T = 1. P is 3rd left of T → P = 4. R is 2nd right of P → R = 2. S is opposite R(2) → S = 6. Q is immediate right of S(6) → Q = 5. Open seats are 3, 7, 8. Since V sits between T(1) and U, and seat 2 is occupied by R, V must be at 8 and U at 7 (not adjacent to P=4 ✓). The last open seat 3 belongs to W. Full clockwise order: 1:T, 2:R, 3:W, 4:P, 5:Q, 6:S, 7:U, 8:V. Directly opposite W(3) is seat 7 = U.',
    shortcut:
      'Draw an 8-spoke compass and mark opposites (+4): locking T(1), P(4), R(2), S(6), Q(5) immediately forces V(8)–U(7), leaving W(3) opposite U(7).',
  },
  {
    id: 96,
    sectionId: '3',
    topic: 'Coding-Decoding',
    difficulty: 'Difficult',
    label: 'Model Practice Question',
    question:
      'In a certain code language, ENGINE is written as FMJFOD and SIGNAL is written as MZOFJR. How is DRIVER written in the same code?',
    options: { A: 'SDWHSC', B: 'SDWJSC', C: 'SCWHSD', D: 'SEWHSC' },
    correctOption: 'A',
    explanation:
      'Two-step rule: (1) Reverse the entire word; (2) Shift letters alternately by +1, −1, +1, −1, +1, −1. Verify ENGINE → reversed ENIGNE → E+1=F, N−1=M, I+1=J, G−1=F, N+1=O, E−1=D → FMJFOD ✓. Verify SIGNAL → reversed LANGIS → L+1=M, A−1=Z, N+1=O, G−1=F, I+1=J, S−1=R → MZOFJR ✓. Apply to DRIVER → reversed REVIRD → R+1=S, E−1=D, V+1=W, I−1=H, R+1=S, D−1=C → SDWHSC.',
    shortcut:
      'Reverse DRIVER → REVIRD, then check only the 4th letter (I−1 = H) and last letter (D−1 = C) to isolate SDWHSC quickly.',
  },
  {
    id: 97,
    sectionId: '3',
    topic: 'Number Series',
    difficulty: 'Difficult',
    label: 'Previous-Year Pattern Question',
    question: 'Find the missing number in the series: 2, 10, 30, 68, 130, ?',
    options: { A: '210', B: '216', C: '222', D: '228' },
    correctOption: 'C',
    explanation:
      'Each term follows the cubic pattern n³ + n for n = 1, 2, 3, 4, 5, 6: 1³+1 = 2; 2³+2 = 10; 3³+3 = 30; 4³+4 = 68; 5³+5 = 130; 6³+6 = 216 + 6 = 222.',
    shortcut:
      'Whenever terms sit right above standard cubes (1, 8, 27, 64, 125, 216), immediately test n³ + n → 216 + 6 = 222.',
  },
  {
    id: 98,
    sectionId: '3',
    topic: 'Pattern Recognition (Alphanumeric)',
    difficulty: 'Difficult',
    label: 'Model Practice Question',
    question:
      'Find the next alphanumeric code in the sequence: C4X, F9U, I16R, L25O, ?',
    options: { A: 'O36L', B: 'O36M', C: 'N36L', D: 'P36K' },
    correctOption: 'A',
    explanation:
      'Decompose into three independent tracks: (1) First letter advances +3: C(3), F(6), I(9), L(12), O(15). (2) Middle number lists consecutive squares: 2²=4, 3²=9, 4²=16, 5²=25, 6²=36. (3) Last letter decreases by −3 (and is the alphabetical opposite of the first letter): X(24), U(21), R(18), O(15), L(12). Combining gives O36L.',
    shortcut:
      'Check Track 1 (L+3 = O) and Opposite Pair (O ↔ L) simultaneously → only O36L qualifies.',
  },
  {
    id: 99,
    sectionId: '3',
    topic: 'Order & Position (Inequalities)',
    difficulty: 'Difficult',
    label: 'Model Practice Question',
    question:
      'Five freight wagons (V, W, X, Y, Z) carry distinct weights. W is heavier than Z but lighter than X. Y is heavier than V but lighter than Z. If the second-heaviest wagon weighs 48 tonnes and the second-lightest wagon weighs 26 tonnes, which of the following could be the weight of wagon Z?',
    options: {
      A: '24 tonnes',
      B: '35 tonnes',
      C: '49 tonnes',
      D: '52 tonnes',
    },
    correctOption: 'B',
    explanation:
      'Chain the weight inequalities: X > W > Z and Z > Y > V ⇒ complete order is X > W > Z > Y > V. The second-heaviest is W = 48 tonnes, and the second-lightest is Y = 26 tonnes. Since W > Z > Y, Z must lie strictly between 26 and 48 tonnes. Among the choices, only 35 tonnes falls in (26, 48).',
    shortcut:
      'Draw the 5-slot chain X > W(48) > Z > Y(26) > V and pick the sole option strictly inside (26, 48) → 35 tonnes.',
  },
  {
    id: 100,
    sectionId: '3',
    topic: 'Analogy (Number Set)',
    difficulty: 'Difficult',
    label: 'Previous-Year Pattern Question',
    question:
      'Select the option in which the three numbers share the exact same mathematical relationship as the given set:   (7, 13, 120)',
    options: {
      A: '(5, 11, 96)',
      B: '(6, 10, 68)',
      C: '(4, 9, 60)',
      D: '(8, 12, 84)',
    },
    correctOption: 'A',
    explanation:
      'In (7, 13, 120), the third number equals the difference of squares of the first two: 13² − 7² = 169 − 49 = 120 (equivalently (13 − 7)(13 + 7) = 6 × 20 = 120). Testing Option A: 11² − 5² = 121 − 25 = 96 ✓. Options B (64 ≠ 68), C (65 ≠ 60), and D (80 ≠ 84) fail.',
    shortcut:
      'Use (b − a)(b + a) = c: for (5, 11, 96), (11 − 5)(11 + 5) = 6 × 16 = 96 — faster than computing squares!',
  },
];
