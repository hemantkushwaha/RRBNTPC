import { ExamQuestion } from './types';

export const SECTION_1A_QUESTIONS: ExamQuestion[] = [
  // ======================== EASY (Q1–Q10) ========================
  {
    id: 1,
    sectionId: '1A',
    topic: 'Number System',
    difficulty: 'Easy',
    label: 'Previous-Year Pattern Question',
    question: 'Find the unit digit of the expression (237)^42 + (144)^25.',
    options: { A: '1', B: '3', C: '5', D: '7' },
    correctOption: 'B',
    explanation:
      'For powers of 7, unit digits repeat in a cycle of 4: 7, 9, 3, 1. Dividing 42 by 4 leaves remainder 2, so the unit digit of (237)^42 is 7^2 → 9. For powers of 4, odd powers end in 4 and even powers end in 6; since 25 is odd, (144)^25 ends in 4. Adding the unit digits: 9 + 4 = 13, so the final unit digit is 3.',
    shortcut:
      'Use cyclicity: 7^(4k+2) → 9 and 4^(odd) → 4; add 9 + 4 = 13 → unit digit 3 in under 10 seconds.',
  },
  {
    id: 2,
    sectionId: '1A',
    topic: 'Units & Measurements',
    difficulty: 'Easy',
    label: 'Previous-Year Pattern Question',
    question:
      'Which of the following SI base-unit expressions is equivalent to 1 Joule (J)?',
    options: {
      A: 'kg·m·s⁻²',
      B: 'kg·m²·s⁻²',
      C: 'kg·m²·s⁻³',
      D: 'kg·m⁻¹·s⁻²',
    },
    correctOption: 'B',
    explanation:
      'Work (Joule) = Force × Displacement. Since Force (Newton) = mass × acceleration = kg·m·s⁻², multiplying by displacement (m) yields kg·m²·s⁻². Note that kg·m²·s⁻³ is Watt (Power) and kg·m⁻¹·s⁻² is Pascal (Pressure).',
    shortcut:
      'Recall Kinetic Energy = ½mv² → unit of m (kg) × unit of v² (m²·s⁻²) = kg·m²·s⁻².',
  },
  {
    id: 3,
    sectionId: '1A',
    topic: 'LCM & HCF',
    difficulty: 'Easy',
    label: 'Previous-Year Pattern Question',
    question:
      'The LCM and HCF of two positive integers are 360 and 12 respectively. If one of the numbers is 72, find the other number.',
    options: { A: '48', B: '54', C: '60', D: '84' },
    correctOption: 'C',
    explanation:
      'For any two positive integers, First Number × Second Number = LCM × HCF. Substituting: 72 × x = 360 × 12 ⇒ x = (360 × 12) / 72 = 5 × 12 = 60. Verification: HCF(72, 60) = 12 and LCM(72, 60) = 360.',
    shortcut: 'Cancel 360/72 = 5 immediately, then compute 5 × 12 = 60.',
  },
  {
    id: 4,
    sectionId: '1A',
    topic: 'Ratio & Proportion',
    difficulty: 'Easy',
    label: 'Model Practice Question',
    question: 'If A : B = 3 : 4 and B : C = 6 : 5, what is the combined ratio A : B : C?',
    options: {
      A: '9 : 12 : 10',
      B: '3 : 6 : 5',
      C: '18 : 24 : 15',
      D: '9 : 8 : 10',
    },
    correctOption: 'A',
    explanation:
      'To combine ratios, equalize the common term B. The LCM of 4 and 6 is 12. Multiply A : B = 3 : 4 by 3 to get 9 : 12, and multiply B : C = 6 : 5 by 2 to get 12 : 10. Thus, A : B : C = 9 : 12 : 10.',
    shortcut:
      'Use the N-method: (3×6) : (4×6) : (4×5) = 18 : 24 : 20, then divide by 2 → 9 : 12 : 10.',
  },
  {
    id: 5,
    sectionId: '1A',
    topic: 'Percentage',
    difficulty: 'Easy',
    label: 'Previous-Year Pattern Question',
    question:
      'A junction station records an increase in daily footfall from 4,000 passengers to 4,600 passengers. What is the percentage increase?',
    options: { A: '12%', B: '13.04%', C: '15%', D: '18%' },
    correctOption: 'C',
    explanation:
      'Increase = 4,600 − 4,000 = 600. Percentage increase = (Increase / Original Value) × 100 = (600 / 4,000) × 100 = 60 / 4 = 15%.',
    shortcut:
      '10% of 4,000 is 400 and 5% is 200; since 400 + 200 = 600, the rise is directly 15%.',
  },
  {
    id: 6,
    sectionId: '1A',
    topic: 'Average',
    difficulty: 'Easy',
    label: 'Model Practice Question',
    question:
      'The average weight of 5 luggage parcels is 18 kg. When a 6th parcel is added to the consignment, the average weight rises to 20 kg. Find the weight of the 6th parcel.',
    options: { A: '24 kg', B: '28 kg', C: '30 kg', D: '32 kg' },
    correctOption: 'C',
    explanation:
      'Total weight of 5 parcels = 5 × 18 = 90 kg. Total weight of 6 parcels = 6 × 20 = 120 kg. Weight of the 6th parcel = 120 − 90 = 30 kg.',
    shortcut:
      'New item = Old Avg + (New Count × Increase in Avg) = 18 + (6 × 2) = 30 kg.',
  },
  {
    id: 7,
    sectionId: '1A',
    topic: 'Mass, Weight & Density',
    difficulty: 'Easy',
    label: 'Previous-Year Pattern Question',
    question:
      'A solid alloy block has a mass of 540 g and a volume of 200 cm³. What is its density in kg/m³?',
    options: {
      A: '270 kg/m³',
      B: '2,700 kg/m³',
      C: '2.7 kg/m³',
      D: '5,400 kg/m³',
    },
    correctOption: 'B',
    explanation:
      'Density ρ = Mass / Volume = 540 g / 200 cm³ = 2.7 g/cm³. Since 1 g/cm³ = 1,000 kg/m³, multiplying 2.7 by 1,000 gives 2,700 kg/m³.',
    shortcut:
      'Compute g/cm³ first (540/200 = 2.7), then multiply by 1,000 to convert directly to kg/m³.',
  },
  {
    id: 8,
    sectionId: '1A',
    topic: 'Heat & Temperature',
    difficulty: 'Easy',
    label: 'Previous-Year Pattern Question',
    question: 'Convert a rail-track temperature of 45°C into the Fahrenheit scale.',
    options: { A: '103°F', B: '113°F', C: '121°F', D: '99°F' },
    correctOption: 'B',
    explanation:
      'Using the standard conversion formula F = (9/5)C + 32: F = (9/5)(45) + 32 = 9 × 9 + 32 = 81 + 32 = 113°F.',
    shortcut:
      'Divide °C by 5 first (45/5 = 9), multiply by 9 (81), and add 32 → 113°F.',
  },
  {
    id: 9,
    sectionId: '1A',
    topic: 'Linear Equations',
    difficulty: 'Easy',
    label: 'Model Practice Question',
    question: 'Find the value of x that satisfies the linear equation: 3(x − 4) + 2x = 23.',
    options: { A: '5', B: '6', C: '7', D: '8' },
    correctOption: 'C',
    explanation:
      'Expand the bracket: 3x − 12 + 2x = 23. Combine like terms: 5x − 12 = 23 ⇒ 5x = 35 ⇒ x = 7.',
    shortcut: 'Add 12 to 23 mentally (35) and divide by total x-coefficient (3 + 2 = 5) → 7.',
  },
  {
    id: 10,
    sectionId: '1A',
    topic: 'Kinetic Energy',
    difficulty: 'Easy',
    label: 'Previous-Year Pattern Question',
    question:
      'An inspection trolley of mass 20 kg moves along a level track at a uniform speed of 6 m/s. Calculate its kinetic energy.',
    options: { A: '120 J', B: '180 J', C: '360 J', D: '720 J' },
    correctOption: 'C',
    explanation:
      'Kinetic Energy KE = ½mv² = ½ × 20 × (6)² = 10 × 36 = 360 J.',
    shortcut: 'Take half of mass (10) and multiply by v² (36) → 360 J.',
  },

  // ======================== MODERATE (Q11–Q22) ========================
  {
    id: 11,
    sectionId: '1A',
    topic: 'Profit & Loss',
    difficulty: 'Moderate',
    label: 'Previous-Year Pattern Question',
    question:
      'By selling a portable signalling lamp for ₹1,440, a vendor incurs a loss of 10%. At what price must it be sold to earn a profit of 15%?',
    options: { A: '₹1,760', B: '₹1,800', C: '₹1,840', D: '₹1,920' },
    correctOption: 'C',
    explanation:
      'A 10% loss means SP = 90% of CP. Thus, 90% of CP = ₹1,440 ⇒ CP = (1,440 / 90) × 100 = ₹1,600. For a 15% profit, New SP = 115% of ₹1,600 = 1,600 + 240 = ₹1,840.',
    shortcut:
      'Direct ratio: New SP = 1,440 × (115 / 90) = 16 × 115 = ₹1,840.',
  },
  {
    id: 12,
    sectionId: '1A',
    topic: 'Discount',
    difficulty: 'Moderate',
    label: 'Model Practice Question',
    question:
      'A supplier marks an equipment kit 40% above its cost price and then offers a 20% discount on the marked price. What is the net profit percentage?',
    options: { A: '8%', B: '10%', C: '12%', D: '15%' },
    correctOption: 'C',
    explanation:
      'Let Cost Price (CP) = 100. Marked Price (MP) = 100 + 40 = 140. After a 20% discount, Selling Price (SP) = 140 × 0.80 = 112. Net profit = 112 − 100 = 12%.',
    shortcut:
      'Successive percentage formula: +40 − 20 − (40 × 20)/100 = 20 − 8 = +12%.',
  },
  {
    id: 13,
    sectionId: '1A',
    topic: 'Time, Speed & Distance',
    difficulty: 'Moderate',
    label: 'Previous-Year Pattern Question',
    question:
      'A 180 m long passenger train completely crosses a 220 m long railway platform in 20 seconds. Find the speed of the train in km/h.',
    options: { A: '60 km/h', B: '66 km/h', C: '72 km/h', D: '80 km/h' },
    correctOption: 'C',
    explanation:
      'Total distance covered = Length of train + Length of platform = 180 + 220 = 400 m. Speed = 400 / 20 = 20 m/s. Converting to km/h: 20 × (18/5) = 72 km/h.',
    shortcut:
      'Remember standard conversions: 5 m/s = 18 km/h ⇒ 20 m/s = 4 × 18 = 72 km/h.',
  },
  {
    id: 14,
    sectionId: '1A',
    topic: 'Relative Velocity',
    difficulty: 'Moderate',
    label: 'Previous-Year Pattern Question',
    question:
      'Two trains of lengths 140 m and 160 m travel on parallel tracks in opposite directions at 54 km/h and 36 km/h respectively. How many seconds will they take to completely pass each other?',
    options: { A: '10 s', B: '12 s', C: '15 s', D: '18 s' },
    correctOption: 'B',
    explanation:
      'Total crossing distance = 140 + 160 = 300 m. Because they move in opposite directions, relative speed = 54 + 36 = 90 km/h = 90 × (5/18) = 25 m/s. Time = 300 / 25 = 12 seconds.',
    shortcut:
      'Opposite direction → add speeds (90 km/h = 25 m/s); add lengths (300 m); 300 / 25 = 12 s.',
  },
  {
    id: 15,
    sectionId: '1A',
    topic: 'Time & Work',
    difficulty: 'Moderate',
    label: 'Previous-Year Pattern Question',
    question:
      'Technician A can complete a track-circuit overhaul in 12 hours, and Technician B can complete the same task in 18 hours. If both work together for 4 hours, what fraction of the work remains unfinished?',
    options: { A: '5/9', B: '4/9', C: '1/3', D: '2/9' },
    correctOption: 'B',
    explanation:
      'Let total work = LCM(12, 18) = 36 units. A’s rate = 36/12 = 3 units/hr; B’s rate = 36/18 = 2 units/hr. Combined rate = 5 units/hr. Work done in 4 hours = 4 × 5 = 20 units. Remaining work = 36 − 20 = 16 units. Remaining fraction = 16/36 = 4/9.',
    shortcut:
      'Done = 4(1/12 + 1/18) = 4(5/36) = 5/9; therefore Remaining = 1 − 5/9 = 4/9.',
  },
  {
    id: 16,
    sectionId: '1A',
    topic: 'Arithmetic Progression',
    difficulty: 'Moderate',
    label: 'Model Practice Question',
    question:
      'Find the sum of the first 20 terms of the arithmetic progression: 5, 9, 13, 17, …',
    options: { A: '820', B: '840', C: '860', D: '880' },
    correctOption: 'C',
    explanation:
      'Here first term a = 5, common difference d = 4, and n = 20. Using S_n = (n/2)[2a + (n − 1)d]: S_20 = (20/2)[2(5) + 19(4)] = 10 × [10 + 76] = 10 × 86 = 860.',
    shortcut:
      'Find 20th term l = 5 + 19×4 = 81; Average = (5 + 81)/2 = 43; Sum = 43 × 20 = 860.',
  },
  {
    id: 17,
    sectionId: '1A',
    topic: 'Basic Electricity',
    difficulty: 'Moderate',
    label: 'Previous-Year Pattern Question',
    question:
      'Two resistors of 6 Ω and 12 Ω are connected in parallel across a 12 V DC supply. What is the total current drawn from the supply?',
    options: { A: '1.5 A', B: '2.0 A', C: '3.0 A', D: '4.0 A' },
    correctOption: 'C',
    explanation:
      'Equivalent parallel resistance R_eq = (R1 × R2) / (R1 + R2) = (6 × 12) / (6 + 12) = 72 / 18 = 4 Ω. By Ohm’s Law, total current I = V / R_eq = 12 / 4 = 3.0 A.',
    shortcut:
      'Add branch currents directly: I_1 = 12/6 = 2 A, I_2 = 12/12 = 1 A ⇒ Total I = 2 + 1 = 3 A.',
  },
  {
    id: 18,
    sectionId: '1A',
    topic: 'Work, Power & Energy',
    difficulty: 'Moderate',
    label: 'Previous-Year Pattern Question',
    question:
      'A yard crane lifts a 500 kg steel rail girder vertically through a height of 12 m in 20 seconds (take g = 10 m/s²). What is the average power output of the crane?',
    options: { A: '1.5 kW', B: '2.5 kW', C: '3.0 kW', D: '6.0 kW' },
    correctOption: 'C',
    explanation:
      'Work done against gravity W = mgh = 500 × 10 × 12 = 60,000 J. Power P = W / t = 60,000 / 20 = 3,000 W = 3.0 kW.',
    shortcut:
      'Cancel 20 with 500 first (500/20 = 25), then 25 × 10 × 12 = 3,000 W = 3 kW.',
  },
  {
    id: 19,
    sectionId: '1A',
    topic: 'Levers & Simple Machines',
    difficulty: 'Moderate',
    label: 'Previous-Year Pattern Question',
    question:
      'A Class-I lever has a load arm of 0.4 m and an effort arm of 1.6 m. If the efficiency of the lever is 80%, what effort is required to lift a load of 400 N?',
    options: { A: '100 N', B: '125 N', C: '150 N', D: '160 N' },
    correctOption: 'B',
    explanation:
      'Velocity Ratio (VR) = Effort Arm / Load Arm = 1.6 / 0.4 = 4. Mechanical Advantage (MA) = Efficiency × VR = 0.80 × 4 = 3.2. Effort = Load / MA = 400 / 3.2 = 125 N.',
    shortcut:
      'Ideal effort = 400 / 4 = 100 N; divide by efficiency 0.8 (4/5) → 100 × 5/4 = 125 N.',
  },
  {
    id: 20,
    sectionId: '1A',
    topic: 'Algebra',
    difficulty: 'Moderate',
    label: 'Model Practice Question',
    question: 'If x + (1/x) = 5, find the value of x³ + (1/x³).',
    options: { A: '100', B: '110', C: '115', D: '140' },
    correctOption: 'B',
    explanation:
      'Using the algebraic identity a³ + b³ = (a + b)³ − 3ab(a + b) with a = x and b = 1/x (so ab = 1): x³ + 1/x³ = (x + 1/x)³ − 3(x + 1/x) = 5³ − 3(5) = 125 − 15 = 110.',
    shortcut: 'Memorize: if x + 1/x = k, then x³ + 1/x³ = k³ − 3k = 125 − 15 = 110.',
  },
  {
    id: 21,
    sectionId: '1A',
    topic: 'Geometry & Area',
    difficulty: 'Moderate',
    label: 'Model Practice Question',
    question:
      'The diagonals of a rhombus measure 16 cm and 30 cm. Find the perimeter of the rhombus.',
    options: { A: '52 cm', B: '60 cm', C: '68 cm', D: '72 cm' },
    correctOption: 'C',
    explanation:
      'The diagonals of a rhombus bisect each other at 90°, forming four right-angled triangles with legs 16/2 = 8 cm and 30/2 = 15 cm. Side length = √(8² + 15²) = √(64 + 225) = √289 = 17 cm. Perimeter = 4 × 17 = 68 cm.',
    shortcut:
      'Spot the Pythagorean triplet (8, 15, 17) immediately → side = 17 → perimeter = 4 × 17 = 68 cm.',
  },
  {
    id: 22,
    sectionId: '1A',
    topic: 'Basic Statistics',
    difficulty: 'Moderate',
    label: 'Previous-Year Pattern Question',
    question:
      'Find the median of the following set of signal-response times (in seconds): 14, 21, 9, 17, 25, 12, 19, 15.',
    options: { A: '15.0', B: '15.5', C: '16.0', D: '16.5' },
    correctOption: 'C',
    explanation:
      'Arrange the 8 observations in ascending order: 9, 12, 14, 15, 17, 19, 21, 25. Because n = 8 is even, the median is the mean of the 4th and 5th values: (15 + 17) / 2 = 16.0.',
    shortcut:
      'Cross off 3 smallest (9, 12, 14) and 3 largest (25, 21, 19) directly; average the middle pair (15, 17) → 16.',
  },

  // ======================== DIFFICULT (Q23–Q30) ========================
  {
    id: 23,
    sectionId: '1A',
    topic: 'Trigonometry',
    difficulty: 'Difficult',
    label: 'Previous-Year Pattern Question',
    question:
      'From the top of a 60 m tall signal tower, the angles of depression of two mileposts lying on the same straight horizontal line on the same side of the tower are 60° and 30°. Find the distance between the two mileposts.',
    options: { A: '20√3 m', B: '30√3 m', C: '40√3 m', D: '60√3 m' },
    correctOption: 'C',
    explanation:
      'Let the distances of the closer and farther mileposts from the base of the tower be d₁ and d₂. Then tan 60° = 60 / d₁ ⇒ d₁ = 60 / √3 = 20√3 m. Also tan 30° = 60 / d₂ ⇒ d₂ = 60√3 m. Distance between the mileposts = d₂ − d₁ = 60√3 − 20√3 = 40√3 m.',
    shortcut:
      'For standard 30°–60° height-and-distance triangles on the same side, gap = (2h / √3) = 120 / √3 = 40√3 m.',
  },
  {
    id: 24,
    sectionId: '1A',
    topic: 'Volume',
    difficulty: 'Difficult',
    label: 'Model Practice Question',
    question:
      'A solid metallic sphere of radius 6 cm is melted and recast into identical solid cylindrical pins, each of radius 1 cm and height 4 cm. Assuming zero wastage, how many pins can be formed?',
    options: { A: '54', B: '64', C: '72', D: '84' },
    correctOption: 'C',
    explanation:
      'Volume of sphere = (4/3)πR³ = (4/3)π(6³) = (4/3)π(216) = 288π cm³. Volume of one cylindrical pin = πr²h = π(1²)(4) = 4π cm³. Number of pins = 288π / 4π = 72.',
    shortcut:
      'Cancel π and 4 immediately: N = [(4/3) × 6³] / [1² × 4] = 216 / 3 = 72.',
  },
  {
    id: 25,
    sectionId: '1A',
    topic: 'Friction',
    difficulty: 'Difficult',
    label: 'Model Practice Question',
    question:
      'A 15 kg supply crate rests on a horizontal concrete floor with coefficient of static friction μ_s = 0.4 and kinetic friction μ_k = 0.3 (take g = 10 m/s²). If a steady horizontal pull of 75 N is applied, what is the resulting acceleration of the crate?',
    options: { A: '1 m/s²', B: '2 m/s²', C: '3 m/s²', D: '5 m/s²' },
    correctOption: 'B',
    explanation:
      'Normal force N = mg = 15 × 10 = 150 N. Maximum static friction f_s(max) = μ_s N = 0.4 × 150 = 60 N. Since the applied force 75 N > 60 N, the crate starts moving and kinetic friction acts: f_k = μ_k N = 0.3 × 150 = 45 N. Net force F_net = 75 − 45 = 30 N. Acceleration a = F_net / m = 30 / 15 = 2 m/s².',
    shortcut:
      'Check F > μ_s mg (75 > 60 ✓), then compute a = (F/m) − μ_k g = (75/15) − 0.3(10) = 5 − 3 = 2 m/s².',
  },
  {
    id: 26,
    sectionId: '1A',
    topic: 'Speed & Velocity',
    difficulty: 'Difficult',
    label: 'Previous-Year Pattern Question',
    question:
      'A locomotive starts from rest and accelerates uniformly at 0.5 m/s² for 40 seconds, maintains constant velocity for the next 60 seconds, and then decelerates uniformly to a complete stop in 20 seconds. Find the total distance covered.',
    options: { A: '1.4 km', B: '1.6 km', C: '1.8 km', D: '2.0 km' },
    correctOption: 'C',
    explanation:
      'Phase 1 (acceleration): peak velocity v = u + at = 0 + 0.5(40) = 20 m/s; distance s₁ = ½at² = ½(0.5)(1600) = 400 m. Phase 2 (cruise): s₂ = 20 × 60 = 1,200 m. Phase 3 (braking): average velocity = (20 + 0)/2 = 10 m/s; s₃ = 10 × 20 = 200 m. Total distance = 400 + 1,200 + 200 = 1,800 m = 1.8 km.',
    shortcut:
      'Velocity-time graph is a trapezium of height v_max = 20 m/s, top base = 60 s, bottom base = 120 s. Area = ½(60 + 120) × 20 = 1,800 m = 1.8 km.',
  },
  {
    id: 27,
    sectionId: '1A',
    topic: 'Basic Probability',
    difficulty: 'Difficult',
    label: 'Model Practice Question',
    question:
      'A storage case contains 4 red, 5 green, and 3 yellow signal flags. If 2 flags are drawn at random without replacement, what is the probability that both flags are of the same colour?',
    options: { A: '17/66', B: '19/66', C: '21/66', D: '1/3' },
    correctOption: 'B',
    explanation:
      'Total flags = 4 + 5 + 3 = 12. Total ways to choose 2 flags = C(12, 2) = (12 × 11)/2 = 66. Ways to draw 2 of the same colour = C(4, 2) + C(5, 2) + C(3, 2) = 6 + 10 + 3 = 19. Required probability = 19/66.',
    shortcut:
      'Sum n(n−1) for each colour and divide by N(N−1): (4×3 + 5×4 + 3×2) / (12×11) = (12 + 20 + 6)/132 = 38/132 = 19/66.',
  },
  {
    id: 28,
    sectionId: '1A',
    topic: 'Basic Electricity',
    difficulty: 'Difficult',
    label: 'Previous-Year Pattern Question',
    question:
      'In a station control cabin, a 1,500 W electric heater runs for 4 hours daily and five 40 W LED lamps run for 6 hours daily. What is the total electrical energy consumed in 30 days (in kWh)?',
    options: { A: '180 kWh', B: '204 kWh', C: '216 kWh', D: '240 kWh' },
    correctOption: 'C',
    explanation:
      'Daily energy of heater = (1,500 / 1,000) kW × 4 h = 6.0 kWh. Daily energy of five lamps = 5 × (40 / 1,000) kW × 6 h = 0.2 × 6 = 1.2 kWh. Total daily consumption = 6.0 + 1.2 = 7.2 kWh. Over 30 days: 7.2 × 30 = 216 kWh.',
    shortcut:
      'Compute daily watt-hours: 6,000 + 1,200 = 7,200 Wh = 7.2 kWh; multiply by 30 → 72 × 3 = 216 kWh.',
  },
  {
    id: 29,
    sectionId: '1A',
    topic: 'Time & Work',
    difficulty: 'Difficult',
    label: 'Model Practice Question',
    question:
      'Inlet pipes P and Q can fill an overhead station tank in 15 hours and 20 hours respectively, while drain pipe R can empty the full tank in 30 hours. All three pipes are opened simultaneously, and after 5 hours drain pipe R is closed. In how many total hours from the start will the tank be completely filled?',
    options: { A: '8 hours', B: '9 hours', C: '10 hours', D: '11 hours' },
    correctOption: 'C',
    explanation:
      'Take tank capacity = LCM(15, 20, 30) = 60 units. Rates: P = +4 u/h, Q = +3 u/h, R = −2 u/h. With all three open, net rate = 4 + 3 − 2 = +5 u/h. In 5 hours, water filled = 5 × 5 = 25 units. Remaining capacity = 60 − 25 = 35 units. After R closes, P + Q fill at 4 + 3 = 7 u/h, taking 35 / 7 = 5 more hours. Total time = 5 + 5 = 10 hours.',
    shortcut:
      'Think in terms of extra water emptied by R: R runs for 5 h × 2 u/h = 10 units wasted. P + Q must fill 60 + 10 = 70 units at 7 u/h ⇒ 70 / 7 = 10 hours total!',
  },
  {
    id: 30,
    sectionId: '1A',
    topic: 'Geometry',
    difficulty: 'Difficult',
    label: 'Previous-Year Pattern Question',
    question:
      'In a circle of radius 13 cm, two parallel chords of lengths 10 cm and 24 cm lie on opposite sides of the centre. Find the perpendicular distance between the two chords.',
    options: { A: '7 cm', B: '13 cm', C: '17 cm', D: '19 cm' },
    correctOption: 'C',
    explanation:
      'A perpendicular from the centre bisects each chord, giving half-lengths of 5 cm and 12 cm. Distance of the 10 cm chord from centre: d₁ = √(13² − 5²) = √144 = 12 cm. Distance of the 24 cm chord from centre: d₂ = √(13² − 12²) = √25 = 5 cm. Since the chords lie on opposite sides of the centre, distance between them = d₁ + d₂ = 12 + 5 = 17 cm.',
    shortcut:
      'Recognize the (5, 12, 13) triplet! Opposite sides → sum of the two legs = 5 + 12 = 17 cm (same side would be 12 − 5 = 7 cm).',
  },
];
