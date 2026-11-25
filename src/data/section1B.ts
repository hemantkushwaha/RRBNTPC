import { ExamQuestion, SharedContextBlock } from './types';

export const SECTION_1B_CONTEXTS: Record<string, SharedContextBlock> = {
  'di-depots': {
    id: 'di-depots',
    type: 'di',
    rangeLabel: 'Q31 – Q34',
    title: 'Quarterly Freight Tonnage Handled Across Four Railway Depots',
    introText:
      'Study the table below showing freight tonnage (in thousand tonnes) handled by four railway depots (D1–D4) across four quarters of a financial year, and answer Q31–Q34.',
    table: {
      title: 'Freight Tonnage (in ’000 Tonnes)',
      headers: ['Depot', 'Q1', 'Q2', 'Q3', 'Q4'],
      rows: [
        ['Depot D1', 120, 140, 160, 180],
        ['Depot D2', 150, 130, 170, 150],
        ['Depot D3', 100, 120, 140, 160],
        ['Depot D4', 130, 150, 130, 190],
      ],
    },
  },
  'di-tickets': {
    id: 'di-tickets',
    type: 'di',
    rangeLabel: 'Q35 – Q37',
    title: 'Monthly Unreserved Ticket Sales: Counter vs Digital (Jan–May)',
    introText:
      'The grouped bar chart and accompanying dataset represent monthly ticket sales (in thousands) across Counter and Digital channels from January to May. Answer Q35–Q37.',
    table: {
      title: 'Monthly Ticket Volume (in ’000 Tickets)',
      headers: ['Month', 'Counter (’000)', 'Digital (’000)'],
      rows: [
        ['Jan', 40, 60],
        ['Feb', 35, 65],
        ['Mar', 30, 90],
        ['Apr', 25, 100],
        ['May', 20, 105],
      ],
    },
    chart: {
      type: 'grouped-bar',
      title: 'Counter vs Digital Ticket Volume (’000)',
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      series: [
        { name: 'Counter', color: '#64748B', values: [40, 35, 30, 25, 20] },
        { name: 'Digital', color: '#1D4ED8', values: [60, 65, 90, 100, 105] },
      ],
    },
  },
  'di-budget': {
    id: 'di-budget',
    type: 'di',
    rangeLabel: 'Q38 – Q40',
    title: 'Annual Division Operating Budget Breakdown (Total = ₹720 Lakhs)',
    introText:
      'The pie chart and table below show the percentage allocation of a ₹720 Lakh annual railway division operating budget across five departments. Answer Q38–Q40.',
    table: {
      title: 'Budget Share by Department (Total = ₹720 Lakhs)',
      headers: ['Department', 'Allocation (%)'],
      rows: [
        ['Track Maintenance', '30%'],
        ['Electrical & Traction', '25%'],
        ['Signalling & Telecom', '20%'],
        ['Staff Welfare', '15%'],
        ['Security & Sanitation', '10%'],
      ],
    },
    chart: {
      type: 'pie',
      title: 'Annual Operating Budget (₹720 Lakhs)',
      pieSlices: [
        { label: 'Track Maintenance', value: 30, color: '#1E3A8A' },
        { label: 'Electrical & Traction', value: 25, color: '#2563EB' },
        { label: 'Signalling & Telecom', value: 20, color: '#0284C7' },
        { label: 'Staff Welfare', value: 15, color: '#0D9488' },
        { label: 'Security & Sanitation', value: 10, color: '#64748B' },
      ],
    },
  },
  'di-punctuality': {
    id: 'di-punctuality',
    type: 'di',
    rangeLabel: 'Q41 – Q44',
    title: 'Weekly Train Punctuality Rate & Average Delay Profile (W1–W6)',
    introText:
      'The line graph and table track total scheduled trains, on-time arrivals, punctuality percentage, and average delay of late trains over 6 consecutive weeks. Answer Q41–Q44.',
    table: {
      title: 'Weekly Punctuality & Delay Metrics',
      headers: [
        'Week',
        'Trains Run',
        'On-Time',
        'Punctuality (%)',
        'Avg Delay of Late Trains (min)',
      ],
      rows: [
        ['W1', 200, 170, '85%', 12],
        ['W2', 250, 200, '80%', 15],
        ['W3', 240, 216, '90%', 10],
        ['W4', 300, 255, '85%', 14],
        ['W5', 250, 220, '88%', 10],
        ['W6', 200, 184, '92%', 8],
      ],
    },
    chart: {
      type: 'line',
      title: 'Weekly Punctuality Trend (%)',
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
      series: [
        { name: 'Punctuality (%)', color: '#1D4ED8', values: [85, 80, 90, 85, 88, 92] },
      ],
    },
  },
  'di-venn': {
    id: 'di-venn',
    type: 'di',
    rangeLabel: 'Q45 – Q47',
    title: 'Technical Certification Distribution Among 200 Railway Technicians',
    introText:
      'In a training cohort of 200 technicians, every technician holds at least one of three safety certifications: Module A (Signalling), Module B (Traction), or Module C (Track Circuits). Given: n(A) = 110, n(B) = 95, n(C) = 85; n(A ∩ B) = 40, n(B ∩ C) = 30, and n(A ∩ C) = 35. Answer Q45–Q47.',
    table: {
      title: 'Certification Summary (Total = 200, None = 0)',
      headers: ['Group / Intersection', 'Technicians'],
      rows: [
        ['Module A — n(A)', 110],
        ['Module B — n(B)', 95],
        ['Module C — n(C)', 85],
        ['Both A and B — n(A ∩ B)', 40],
        ['Both B and C — n(B ∩ C)', 30],
        ['Both A and C — n(A ∩ C)', 35],
      ],
    },
    chart: {
      type: 'venn',
      title: '3-Set Certification Overlap (Total = 200)',
      vennData: {
        total: 200,
        setA: 'Module A (110)',
        setB: 'Module B (95)',
        setC: 'Module C (85)',
        onlyA: 50,
        onlyB: 40,
        onlyC: 35,
        abOnly: 25,
        bcOnly: 15,
        acOnly: 20,
        allThree: 15,
      },
    },
  },
  'di-frequency': {
    id: 'di-frequency',
    type: 'di',
    rangeLabel: 'Q49 – Q50',
    title: 'Frequency Distribution of Daily Train Turnaround Times (50 Trains)',
    introText:
      'The grouped frequency table and histogram show turnaround times (in minutes) recorded for 50 express trains at a terminal yard. Answer Q49–Q50.',
    table: {
      title: 'Turnaround Time Distribution (N = 50)',
      headers: ['Turnaround Interval (min)', 'Midpoint (x)', 'Number of Trains (f)'],
      rows: [
        ['10 – 20', 15, 6],
        ['20 – 30', 25, 14],
        ['30 – 40', 35, 20],
        ['40 – 50', 45, 8],
        ['50 – 60', 55, 2],
      ],
    },
    chart: {
      type: 'histogram',
      title: 'Train Turnaround Time Histogram',
      labels: ['10–20', '20–30', '30–40', '40–50', '50–60'],
      series: [{ name: 'Trains', color: '#0284C7', values: [6, 14, 20, 8, 2] }],
    },
  },
  'di-locomotives': {
    id: 'di-locomotives',
    type: 'di',
    rangeLabel: 'Q53 – Q55',
    title: 'Multi-Source Energy Consumption & Operating Cost of Electric Locomotives',
    introText:
      'The multi-source operational table below combines distance run, traction energy rate, electricity tariff, and fixed maintenance cost for four electric locomotives (L1–L4) over one operational cycle. Answer Q53–Q55.',
    table: {
      title: 'Locomotive Operating Cost Parameters',
      headers: [
        'Locomotive',
        'Distance (km)',
        'Energy Rate (kWh/km)',
        'Tariff (₹/kWh)',
        'Maintenance Cost (₹)',
      ],
      rows: [
        ['L1', 800, 15, 6, '18,000'],
        ['L2', 1000, 12, 6, '24,000'],
        ['L3', 600, 18, 5, '16,000'],
        ['L4', 1200, 14, 5, '21,000'],
      ],
      note: 'Total Operating Cost = (Distance × Energy Rate × Tariff) + Maintenance Cost.',
    },
  },
};

export const SECTION_1B_QUESTIONS: ExamQuestion[] = [
  // ======================== EASY (Q31–Q40) ========================
  {
    id: 31,
    sectionId: '1B',
    topic: 'Table DI',
    difficulty: 'Easy',
    label: 'Previous-Year Pattern Question',
    contextId: 'di-depots',
    question:
      'What was the total freight tonnage (in thousand tonnes) handled by all four depots combined in Quarter 3 (Q3)?',
    options: { A: '540', B: '580', C: '600', D: '620' },
    correctOption: 'C',
    explanation:
      'Sum the Q3 column across all four depots: 160 (D1) + 170 (D2) + 140 (D3) + 130 (D4) = 600 thousand tonnes.',
    shortcut:
      'Pair friendly sums: (160 + 140) + (170 + 130) = 300 + 300 = 600.',
  },
  {
    id: 32,
    sectionId: '1B',
    topic: 'Percentage DI',
    difficulty: 'Easy',
    label: 'Previous-Year Pattern Question',
    contextId: 'di-depots',
    question:
      'What is the percentage increase in total freight tonnage across all four depots from Q1 to Q4?',
    options: { A: '32%', B: '34%', C: '36%', D: '38%' },
    correctOption: 'C',
    explanation:
      'Q1 total = 120 + 150 + 100 + 130 = 500. Q4 total = 180 + 150 + 160 + 190 = 680. Increase = 680 − 500 = 180. Percentage increase = (180 / 500) × 100 = 36%.',
    shortcut:
      'Since Q1 total is 500, divide the increase (180) by 5 directly → 180 / 5 = 36%.',
  },
  {
    id: 33,
    sectionId: '1B',
    topic: 'Average DI',
    difficulty: 'Easy',
    label: 'Model Practice Question',
    contextId: 'di-depots',
    question:
      'What is the average quarterly freight tonnage (in thousand tonnes) handled by Depot D3 across the four quarters?',
    options: { A: '125', B: '130', C: '135', D: '140' },
    correctOption: 'B',
    explanation:
      'Depot D3 tonnage values are 100, 120, 140, and 160. Total = 520. Average = 520 / 4 = 130 thousand tonnes.',
    shortcut:
      'The four numbers (100, 120, 140, 160) form an Arithmetic Progression; the average is simply (First + Last)/2 = (100 + 160)/2 = 130.',
  },
  {
    id: 34,
    sectionId: '1B',
    topic: 'Table DI (Ratio)',
    difficulty: 'Easy',
    label: 'Model Practice Question',
    contextId: 'di-depots',
    question:
      'What is the ratio of Depot D1’s freight tonnage in Q4 to Depot D3’s freight tonnage in Q2?',
    options: { A: '4 : 3', B: '3 : 2', C: '5 : 3', D: '6 : 5' },
    correctOption: 'B',
    explanation:
      'Depot D1 in Q4 = 180 thousand tonnes. Depot D3 in Q2 = 120 thousand tonnes. Ratio = 180 : 120 = 3 : 2 (dividing both by 60).',
    shortcut: 'Drop the trailing zeros: 18 : 12 simplifies immediately to 3 : 2.',
  },
  {
    id: 35,
    sectionId: '1B',
    topic: 'Bar Graph DI',
    difficulty: 'Easy',
    label: 'Previous-Year Pattern Question',
    contextId: 'di-tickets',
    question:
      'In which month were Digital ticket sales exactly four times the Counter ticket sales?',
    options: { A: 'February', B: 'March', C: 'April', D: 'May' },
    correctOption: 'C',
    explanation:
      'Checking ratios Digital/Counter: Jan = 60/40 = 1.5; Feb = 65/35 ≈ 1.86; Mar = 90/30 = 3.0; Apr = 100/25 = 4.0; May = 105/20 = 5.25. Hence April is exact.',
    shortcut: 'Scan for 4 × Counter = Digital: 4 × 25 = 100 in April.',
  },
  {
    id: 36,
    sectionId: '1B',
    topic: 'Bar Graph DI (Percentage)',
    difficulty: 'Easy',
    label: 'Model Practice Question',
    contextId: 'di-tickets',
    question:
      'Digital tickets sold in March constituted what percentage of total tickets sold in March?',
    options: { A: '65%', B: '70%', C: '75%', D: '80%' },
    correctOption: 'C',
    explanation:
      'In March, Counter = 30k and Digital = 90k, so Total = 120k. Digital share = (90 / 120) × 100 = (3/4) × 100 = 75%.',
    shortcut: 'Ratio Digital : Counter = 3 : 1, so Digital is 3 out of 4 parts = 75%.',
  },
  {
    id: 37,
    sectionId: '1B',
    topic: 'Bar Graph DI (Average)',
    difficulty: 'Easy',
    label: 'Previous-Year Pattern Question',
    contextId: 'di-tickets',
    question:
      'Find the average monthly Digital ticket sales (in thousands) across all five months from January to May.',
    options: { A: '80', B: '82', C: '84', D: '86' },
    correctOption: 'C',
    explanation:
      'Sum of Digital sales = 60 + 65 + 90 + 100 + 105 = 420 thousand. Average over 5 months = 420 / 5 = 84 thousand.',
    shortcut: 'Pair (65 + 105 = 170) + (60 + 90 = 150) + 100 = 420; divide by 5 (double and drop zero) → 84.',
  },
  {
    id: 38,
    sectionId: '1B',
    topic: 'Pie Chart DI',
    difficulty: 'Easy',
    label: 'Previous-Year Pattern Question',
    contextId: 'di-budget',
    question:
      'How much budget (in ₹ Lakhs) is allocated to the Signalling & Telecom department?',
    options: {
      A: '₹108 Lakhs',
      B: '₹120 Lakhs',
      C: '₹144 Lakhs',
      D: '₹180 Lakhs',
    },
    correctOption: 'C',
    explanation:
      'Signalling & Telecom receives 20% of ₹720 Lakhs = (20 / 100) × 720 = 0.2 × 720 = ₹144 Lakhs.',
    shortcut: '10% of 720 = 72; therefore 20% = 2 × 72 = ₹144 Lakhs.',
  },
  {
    id: 39,
    sectionId: '1B',
    topic: 'Pie Chart DI',
    difficulty: 'Easy',
    label: 'Previous-Year Pattern Question',
    contextId: 'di-budget',
    question:
      'What is the central angle (in degrees) of the pie sector representing Electrical & Traction?',
    options: { A: '72°', B: '80°', C: '90°', D: '108°' },
    correctOption: 'C',
    explanation:
      'A full pie chart spans 360°. Electrical & Traction accounts for 25% (= 1/4), so its central angle = 25% of 360° = 90°.',
    shortcut: 'Multiply percentage by 3.6° (or recognize 25% = one-quarter of 360° = 90°).',
  },
  {
    id: 40,
    sectionId: '1B',
    topic: 'Pie Chart DI',
    difficulty: 'Easy',
    label: 'Model Practice Question',
    contextId: 'di-budget',
    question:
      'Find the difference (in ₹ Lakhs) between the allocations for Track Maintenance and Security & Sanitation.',
    options: {
      A: '₹108 Lakhs',
      B: '₹144 Lakhs',
      C: '₹180 Lakhs',
      D: '₹216 Lakhs',
    },
    correctOption: 'B',
    explanation:
      'Difference in percentage share = 30% − 10% = 20%. Difference in amount = 20% of ₹720 Lakhs = ₹144 Lakhs.',
    shortcut:
      'Never compute both Rupee values separately—subtract percentages first (30% − 10% = 20%), then multiply once by 720.',
  },

  // ======================== MODERATE (Q41–Q52) ========================
  {
    id: 41,
    sectionId: '1B',
    topic: 'Line Graph DI',
    difficulty: 'Moderate',
    label: 'Previous-Year Pattern Question',
    contextId: 'di-punctuality',
    question:
      'What was the total number of late trains recorded across Weeks W1, W2, and W3 combined?',
    options: { A: '96', B: '100', C: '104', D: '112' },
    correctOption: 'C',
    explanation:
      'Late trains = Trains Run − On-Time Trains. W1: 200 − 170 = 30; W2: 250 − 200 = 50; W3: 240 − 216 = 24. Combined total = 30 + 50 + 24 = 104 late trains.',
    shortcut:
      'Sum total trains (690) and total on-time (586) across W1–W3, then subtract once: 690 − 586 = 104.',
  },
  {
    id: 42,
    sectionId: '1B',
    topic: 'Line Graph DI (Weighted Total)',
    difficulty: 'Moderate',
    label: 'Model Practice Question',
    contextId: 'di-punctuality',
    question:
      'Calculate the total cumulative delay (in minutes) suffered by all late trains in Week W4.',
    options: {
      A: '560 minutes',
      B: '600 minutes',
      C: '630 minutes',
      D: '660 minutes',
    },
    correctOption: 'C',
    explanation:
      'In Week W4, number of late trains = 300 − 255 = 45. Given average delay per late train = 14 minutes, cumulative delay = 45 × 14 = 630 minutes.',
    shortcut: 'Double 45 to 90 and halve 14 to 7 → 90 × 7 = 630 minutes.',
  },
  {
    id: 43,
    sectionId: '1B',
    topic: 'Trend & Percentage DI',
    difficulty: 'Moderate',
    label: 'Model Practice Question',
    contextId: 'di-punctuality',
    question:
      'Between which two consecutive weeks did the number of late trains fall by the largest percentage?',
    options: {
      A: 'W1 to W2',
      B: 'W2 to W3',
      C: 'W4 to W5',
      D: 'W5 to W6',
    },
    correctOption: 'B',
    explanation:
      'Late trains per week: W1 = 30, W2 = 50, W3 = 24, W4 = 45, W5 = 30, W6 = 16. Percentage drops: W2→W3 = (50 − 24)/50 = 26/50 = 52%; W4→W5 = 15/45 = 33.3%; W5→W6 = 14/30 = 46.7% (W1→W2 increased). The steepest percentage drop occurred from W2 to W3 (52%).',
    shortcut:
      'Notice W2→W3 drops from 50 to below half (24 < 25), immediately exceeding 50%, whereas W5→W6 (30→16) stays above half (< 50%).',
  },
  {
    id: 44,
    sectionId: '1B',
    topic: 'Line Graph DI (Combined Rate)',
    difficulty: 'Moderate',
    label: 'Previous-Year Pattern Question',
    contextId: 'di-punctuality',
    question:
      'What is the combined punctuality percentage for Weeks W1 and W6 taken together?',
    options: { A: '87.5%', B: '88.0%', C: '88.5%', D: '89.0%' },
    correctOption: 'C',
    explanation:
      'Combined scheduled trains (W1 + W6) = 200 + 200 = 400. Combined on-time trains = 170 + 184 = 354. Combined punctuality = (354 / 400) × 100 = 88.5%.',
    shortcut:
      'Because W1 and W6 have identical base volumes (200 each), simply average their percentages: (85% + 92%) / 2 = 88.5%.',
  },
  {
    id: 45,
    sectionId: '1B',
    topic: 'Venn Diagram DI',
    difficulty: 'Moderate',
    label: 'Previous-Year Pattern Question',
    contextId: 'di-venn',
    question:
      'How many technicians in the cohort are certified in all three safety modules (A, B, and C)?',
    options: { A: '10', B: '15', C: '20', D: '25' },
    correctOption: 'B',
    explanation:
      'By inclusion-exclusion for 3 sets (with 0 uncertified): n(A ∪ B ∪ C) = n(A) + n(B) + n(C) − n(A∩B) − n(B∩C) − n(A∩C) + n(A∩B∩C). Substituting: 200 = 110 + 95 + 85 − 40 − 30 − 35 + x ⇒ 200 = 290 − 105 + x = 185 + x ⇒ x = 15.',
    shortcut: 'Sum singles (290) − Sum pairs (105) = 185; shortfall from Total (200 − 185) = 15.',
  },
  {
    id: 46,
    sectionId: '1B',
    topic: 'Venn Diagram DI',
    difficulty: 'Moderate',
    label: 'Model Practice Question',
    contextId: 'di-venn',
    question:
      'How many technicians hold certifications in EXACTLY TWO modules?',
    options: { A: '55', B: '60', C: '75', D: '90' },
    correctOption: 'B',
    explanation:
      'Using n(A∩B∩C) = 15: Only A & B = 40 − 15 = 25; Only B & C = 30 − 15 = 15; Only A & C = 35 − 15 = 20. Total certified in exactly two modules = 25 + 15 + 20 = 60.',
    shortcut:
      'Exactly two = (Sum of pairwise intersections) − 3 × (All three) = (40 + 30 + 35) − 3(15) = 105 − 45 = 60.',
  },
  {
    id: 47,
    sectionId: '1B',
    topic: 'Venn Diagram DI',
    difficulty: 'Moderate',
    label: 'Model Practice Question',
    contextId: 'di-venn',
    question:
      'How many technicians are certified in ONLY ONE module?',
    options: { A: '115', B: '120', C: '125', D: '130' },
    correctOption: 'C',
    explanation:
      'Only A = 110 − (25 + 20 + 15) = 50; Only B = 95 − (25 + 15 + 15) = 40; Only C = 85 − (20 + 15 + 15) = 35. Total with only one module = 50 + 40 + 35 = 125.',
    shortcut:
      'Total (200) − Exactly Two (60) − All Three (15) = 125 instantly!',
  },
  {
    id: 48,
    sectionId: '1B',
    topic: 'Scatter Plot & Curve DI',
    difficulty: 'Moderate',
    label: 'Model Practice Question',
    inlineTable: {
      title: 'Locomotive Emergency Braking Test Data',
      headers: ['Initial Speed v (km/h)', '20', '40', '60', '80', '100'],
      rows: [['Braking Distance d (m)', 12, 48, 108, 192, 300]],
    },
    inlineChart: {
      type: 'scatter',
      title: 'Speed (v) vs Braking Distance (d)',
      xLabel: 'Speed (km/h)',
      yLabel: 'Distance (m)',
      scatterPoints: [
        { x: 20, y: 12 },
        { x: 40, y: 48 },
        { x: 60, y: 108 },
        { x: 80, y: 192 },
        { x: 100, y: 300 },
      ],
    },
    question:
      'The scatter dataset above maps locomotive speed v (km/h) against braking distance d (m) under uniform deceleration. Following the exact mathematical relationship in the data, what is the predicted braking distance at 120 km/h?',
    options: { A: '360 m', B: '396 m', C: '432 m', D: '480 m' },
    correctOption: 'C',
    explanation:
      'Inspecting the ratio d / v²: 12/400 = 0.03, 48/1600 = 0.03, 108/3600 = 0.03, 192/6400 = 0.03, and 300/10000 = 0.03. Thus d = 0.03v². At v = 120 km/h: d = 0.03 × (120)² = 0.03 × 14,400 = 432 m.',
    shortcut:
      'Since braking distance scales with v², doubling 60 km/h to 120 km/h quadruples the distance: 108 × 4 = 432 m!',
  },
  {
    id: 49,
    sectionId: '1B',
    topic: 'Data Distribution DI',
    difficulty: 'Moderate',
    label: 'Previous-Year Pattern Question',
    contextId: 'di-frequency',
    question:
      'Using the class midpoints from the frequency distribution, calculate the estimated mean turnaround time (in minutes) of the 50 trains.',
    options: {
      A: '30.8 minutes',
      B: '31.6 minutes',
      C: '32.2 minutes',
      D: '33.0 minutes',
    },
    correctOption: 'C',
    explanation:
      'Compute Σ(f × x): (6 × 15) + (14 × 25) + (20 × 35) + (8 × 45) + (2 × 55) = 90 + 350 + 700 + 360 + 110 = 1,610. Mean = Σ(fx) / N = 1,610 / 50 = 32.2 minutes.',
    shortcut:
      'Use Assumed Mean A = 35: deviations are −20(6), −10(14), 0(20), +10(8), +20(2) → Σfd = −120 − 140 + 80 + 40 = −140. Mean = 35 − (140/50) = 35 − 2.8 = 32.2 min.',
  },
  {
    id: 50,
    sectionId: '1B',
    topic: 'Statistical Curve (Cumulative DI)',
    difficulty: 'Moderate',
    label: 'Model Practice Question',
    contextId: 'di-frequency',
    question:
      'Based on the cumulative frequency distribution of the 50 trains, what percentage of trains completed turnaround in strictly less than 40 minutes?',
    options: { A: '68%', B: '72%', C: '76%', D: '80%' },
    correctOption: 'D',
    explanation:
      'Trains in intervals below 40 minutes: 6 (10–20) + 14 (20–30) + 20 (30–40) = 40 trains. Percentage = (40 / 50) × 100 = 80%.',
    shortcut:
      'Count the complement (≥ 40 min): 8 + 2 = 10 trains out of 50 = 20%, so < 40 min = 100% − 20% = 80%.',
  },
  {
    id: 51,
    sectionId: '1B',
    topic: 'Data Arrangement DI',
    difficulty: 'Moderate',
    label: 'Model Practice Question',
    question:
      'Five express trains (P, Q, R, S, T) depart sequentially from Platform 1 at 15-minute intervals beginning at 08:00. Train R departs at 08:30. Train P departs immediately before Train T. Train Q departs after Train R, but is not the last train to depart. At what time does Train P depart?',
    options: { A: '08:00', B: '08:15', C: '08:45', D: '09:00' },
    correctOption: 'A',
    explanation:
      'The five slots are 08:00, 08:15, 08:30, 08:45, and 09:00. R is fixed at 08:30. Since Q departs after R and is not last (09:00), Q must be at 08:45. The remaining slots are 08:00, 08:15, and 09:00. Only 08:00 and 08:15 are consecutive, so P = 08:00 and T = 08:15 (leaving S = 09:00).',
    shortcut:
      'Once R = 08:30 and Q = 08:45 are locked, the only adjacent empty pair left for (P, T) is (08:00, 08:15).',
  },
  {
    id: 52,
    sectionId: '1B',
    topic: 'Text-Based DI',
    difficulty: 'Moderate',
    label: 'Previous-Year Pattern Question',
    question:
      'On Monday, a railway station serves 1,200 passengers: 45% in Sleeper class, 35% in General class, and the remaining in AC class. On Tuesday, Sleeper volume rises by 20%, General volume drops by 10%, and AC volume rises by 25%. Find the total passenger count on Tuesday.',
    options: { A: '1,296', B: '1,314', C: '1,326', D: '1,344' },
    correctOption: 'C',
    explanation:
      'Monday breakdown: Sleeper = 45% of 1,200 = 540; General = 35% of 1,200 = 420; AC = 20% of 1,200 = 240. Tuesday counts: Sleeper = 540 × 1.20 = 648; General = 420 × 0.90 = 378; AC = 240 × 1.25 = 300. Total on Tuesday = 648 + 378 + 300 = 1,326.',
    shortcut:
      'Compute net percentage shift: (+0.20 × 45%) + (−0.10 × 35%) + (+0.25 × 20%) = +9% − 3.5% + 5% = +10.5%. Then 1,200 × 1.105 = 1,326.',
  },

  // ======================== DIFFICULT (Q53–Q60) ========================
  {
    id: 53,
    sectionId: '1B',
    topic: 'Multi-Source DI',
    difficulty: 'Difficult',
    label: 'Model Practice Question',
    contextId: 'di-locomotives',
    question:
      'Which electric locomotive achieves the LOWEST total operating cost (Energy Cost + Maintenance Cost) per kilometre travelled?',
    options: { A: 'L1', B: 'L2', C: 'L3', D: 'L4' },
    correctOption: 'D',
    explanation:
      'Compute Cost/km = (Energy Rate × Tariff) + (Maintenance / Distance): L1 = (15×6) + 18,000/800 = 90 + 22.5 = ₹112.5/km; L2 = (12×6) + 24,000/1,000 = 72 + 24 = ₹96.0/km; L3 = (18×5) + 16,000/600 = 90 + 26.67 = ₹116.67/km; L4 = (14×5) + 21,000/1,200 = 70 + 17.5 = ₹87.5/km. Lowest is L4.',
    shortcut:
      'Do NOT multiply by total distance! Directly compute (Rate × Tariff) + (Maint ÷ Dist): L4 gives 70 + 17.5 = 87.5, beating L2’s 72 + 24 = 96.',
  },
  {
    id: 54,
    sectionId: '1B',
    topic: 'Multi-Source DI (Percentage)',
    difficulty: 'Difficult',
    label: 'Previous-Year Pattern Question',
    contextId: 'di-locomotives',
    question:
      'By approximately what percentage is L4’s total energy cost higher than L3’s total energy cost?',
    options: { A: '48.25%', B: '52.40%', C: '55.56%', D: '60.00%' },
    correctOption: 'C',
    explanation:
      'L4 energy cost = 1,200 × 14 × 5 = ₹84,000. L3 energy cost = 600 × 18 × 5 = ₹54,000. Percentage higher = [(84,000 − 54,000) / 54,000] × 100 = (30 / 54) × 100 = (5/9) × 100 = 55.56%.',
    shortcut:
      'Both share ₹5/kWh tariff, so cancel 5 and 600: Ratio L4 : L3 = (2 × 14) : (1 × 18) = 28 : 18 = 14 : 9 ⇒ excess = 5/9 = 55.56%.',
  },
  {
    id: 55,
    sectionId: '1B',
    topic: 'Multi-Source DI (Sensitivity)',
    difficulty: 'Difficult',
    label: 'Model Practice Question',
    contextId: 'di-locomotives',
    question:
      'If L1’s electricity tariff increases by 10% while regenerative upgrades reduce its energy rate (kWh/km) by 20% over the same 800 km run, what is the net change in L1’s energy cost?',
    options: {
      A: 'Decrease of ₹7,200',
      B: 'Decrease of ₹8,640',
      C: 'Increase of ₹7,200',
      D: 'Decrease of ₹10,800',
    },
    correctOption: 'B',
    explanation:
      'Original L1 energy cost = 800 × 15 × 6 = ₹72,000. Combined multiplier = (1 + 0.10) × (1 − 0.20) = 1.10 × 0.80 = 0.88, representing a net 12% decrease. Net change = −12% of ₹72,000 = −₹8,640.',
    shortcut:
      'Successive formula: +10 − 20 − (200/100) = −12%. Compute 12 × 720 = ₹8,640 saving.',
  },
  {
    id: 56,
    sectionId: '1B',
    topic: 'Data Sufficiency',
    difficulty: 'Difficult',
    label: 'Previous-Year Pattern Question',
    question:
      'What is the speed of Express Train X (in km/h)? Decide whether the data in the statements below are sufficient to answer.',
    statements: [
      'Statement I: Train X crosses a stationary signal post in 12 seconds.',
      'Statement II: Train X completely crosses a 300 m long platform in 27 seconds.',
    ],
    options: {
      A: 'Statement I alone is sufficient, while Statement II alone is not.',
      B: 'Statement II alone is sufficient, while Statement I alone is not.',
      C: 'Both Statements I and II together are necessary and sufficient.',
      D: 'Even both Statements I and II together are not sufficient.',
    },
    correctOption: 'C',
    explanation:
      'From Statement I alone: L / v = 12 (two unknowns L and v, insufficient). From Statement II alone: (L + 300) / v = 27 (two unknowns, insufficient). Combining I and II: extra 300 m takes 27 − 12 = 15 s ⇒ v = 300 / 15 = 20 m/s = 72 km/h. Both statements together are required.',
    shortcut:
      'Two unknowns (train length L, speed v) require two independent linear equations; subtracting the two times isolates v = 300 / (27 − 12).',
  },
  {
    id: 57,
    sectionId: '1B',
    topic: 'Data Sufficiency',
    difficulty: 'Difficult',
    label: 'Model Practice Question',
    question:
      'Is the positive integer n divisible by 6? Evaluate the sufficiency of the two statements below.',
    statements: [
      'Statement I: n is divisible by 12.',
      'Statement II: n is divisible by 9.',
    ],
    options: {
      A: 'Statement I alone is sufficient, while Statement II alone is not.',
      B: 'Statement II alone is sufficient, while Statement I alone is not.',
      C: 'Either Statement I alone or Statement II alone is sufficient.',
      D: 'Both Statements I and II together are necessary.',
    },
    correctOption: 'A',
    explanation:
      'Statement I: Every multiple of 12 is automatically a multiple of 6 (since 12 = 2 × 6), giving a definite "Yes" — sufficient. Statement II: If n = 9, n is not divisible by 6; if n = 18, n is divisible by 6 — inconclusive. Thus only Statement I alone is sufficient.',
    shortcut:
      'Test a counterexample for II: n = 9 (No) vs n = 18 (Yes) → II fails immediately; 6 divides 12 → I succeeds.',
  },
  {
    id: 58,
    sectionId: '1B',
    topic: 'Inconsistency Detection DI',
    difficulty: 'Difficult',
    label: 'Model Practice Question',
    inlineTable: {
      title: 'Monthly Parcel Revenue Ledger (Reported Total = ₹2,00,000)',
      headers: [
        'Zone',
        'Parcels Handled',
        'Average Fee (₹)',
        'Reported Revenue (₹)',
        'Share (%)',
      ],
      rows: [
        ['North Zone', 400, 125, '50,000', '25%'],
        ['South Zone', 600, 110, '66,000', '33%'],
        ['East Zone', 300, 160, '44,000', '22%'],
        ['West Zone', 250, 160, '40,000', '20%'],
      ],
    },
    question:
      'Audit the parcel revenue ledger above. Which zone exhibits a numerical inconsistency between its parcel count, average fee, and reported revenue?',
    options: {
      A: 'North Zone',
      B: 'South Zone',
      C: 'East Zone',
      D: 'West Zone',
    },
    correctOption: 'C',
    explanation:
      'Verify Parcels × Average Fee = Reported Revenue: North = 400 × 125 = ₹50,000 (consistent); South = 600 × 110 = ₹66,000 (consistent); East = 300 × 160 = ₹48,000 ≠ ₹44,000 (inconsistent by ₹4,000); West = 250 × 160 = ₹40,000 (consistent).',
    shortcut:
      'Quickly multiply non-zero digits: 4×125=500 ✓, 6×11=66 ✓, 3×16=48 ≠ 44 ✗ (caught in 5 seconds).',
  },
  {
    id: 59,
    sectionId: '1B',
    topic: 'Trend & Inference DI',
    difficulty: 'Difficult',
    label: 'Model Practice Question',
    inlineTable: {
      title: 'Quarterly Locomotive Availability & Breakdown Index (Q1–Q5)',
      headers: [
        'Quarter',
        'Total Fleet',
        'Active Fleet',
        'Breakdowns',
        'Avg Repair Time (h)',
      ],
      rows: [
        ['Q1', 100, 82, 18, '9.0'],
        ['Q2', 110, 92, 15, '8.2'],
        ['Q3', 120, 102, 12, '7.5'],
        ['Q4', 125, 108, 10, '6.8'],
        ['Q5', 130, 117, 8, '6.0'],
      ],
    },
    question:
      'Which of the following inferences is STRICTLY supported by the quarterly fleet data above?',
    options: {
      A: 'Active fleet percentage increased monotonically in every consecutive quarter from Q1 to Q5.',
      B: 'Breakdowns declined by more than 50% between Q2 and Q4.',
      C: 'Total fleet size expanded by 40% from Q1 to Q5.',
      D: 'Total cumulative repair hours in Q1 were strictly less than 150 hours.',
    },
    correctOption: 'A',
    explanation:
      'Check each statement: (A) Active %: Q1 = 82/100 = 82.0%, Q2 = 92/110 = 83.64%, Q3 = 102/120 = 85.0%, Q4 = 108/125 = 86.4%, Q5 = 117/130 = 90.0% — strictly increasing every quarter (TRUE). (B) Q2→Q4 drop = (15−10)/15 = 33.3% (FALSE). (C) Fleet growth = (130−100)/100 = 30% (FALSE). (D) Q1 repair hours = 18 × 9.0 = 162 h > 150 h (FALSE).',
    shortcut:
      'Eliminate B, C, D rapidly with quick mental checks (5/15 = 33%, 30/100 = 30%, 18×9 = 162), confirming A with 100% certainty.',
  },
  {
    id: 60,
    sectionId: '1B',
    topic: 'Missing-Value Data Distribution DI',
    difficulty: 'Difficult',
    label: 'Previous-Year Pattern Question',
    inlineTable: {
      title: 'Station Safety Audit Scores (5-Day Mean = 84)',
      headers: ['Day', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      rows: [['Audit Score', 78, 86, 82, '?', 90]],
    },
    question:
      'The 5-day average safety audit score from Monday to Friday is 84. If a Saturday audit records a score of 96, what is the ratio of Thursday’s missing score to the new 6-day average score?',
    options: { A: '41 : 43', B: '42 : 43', C: '43 : 44', D: '21 : 22' },
    correctOption: 'B',
    explanation:
      'Total 5-day score = 5 × 84 = 420. Sum of known 4 days = 78 + 86 + 82 + 90 = 336. Therefore Thursday’s score = 420 − 336 = 84. Adding Saturday (96) gives 6-day total = 420 + 96 = 516, so 6-day average = 516 / 6 = 86. Ratio = 84 : 86 = 42 : 43.',
    shortcut:
      'Deviations from 84: (−6) + (+2) + (−2) + (+6) = 0, so Thu = 84 directly! Saturday adds +12 surplus across 6 days (+2), so new average = 86 ⇒ 84 : 86 = 42 : 43.',
  },
];
