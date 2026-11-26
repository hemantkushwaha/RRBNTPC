import { Language, localizeDifficulty, localizeLabel, localizeTopic, SECTION_TEXT } from '../i18n/ui';
import { HINDI_SECTION_1A } from './hindiSection1A';
import { HINDI_SECTION_1B, HINDI_SECTION_1B_CONTEXTS } from './hindiSection1B';
import { HINDI_SECTION_2, HINDI_SECTION_2_CONTEXTS } from './hindiSection2';
import { HINDI_SECTION_3 } from './hindiSection3';
import { SECTION_1A_QUESTIONS } from './section1A';
import { SECTION_1B_CONTEXTS, SECTION_1B_QUESTIONS } from './section1B';
import { SECTION_2_CONTEXTS, SECTION_2_QUESTIONS } from './section2';
import { SECTION_3_QUESTIONS } from './section3';
import {
  BilingualQuestionContent,
  ChartVisualSpec,
  DataTableBlock,
  ExamQuestion,
  SECTIONS,
  SharedContextBlock,
} from './types';

const ALL_HINDI_QUESTIONS: Record<number, BilingualQuestionContent> = {
  ...HINDI_SECTION_1A,
  ...HINDI_SECTION_1B,
  ...HINDI_SECTION_2,
  ...HINDI_SECTION_3,
};

function attachHindiQuestion(q: ExamQuestion): ExamQuestion {
  const hi = q.hi ?? ALL_HINDI_QUESTIONS[q.id];
  if (!hi) return q;
  return {
    ...q,
    hi,
    inlineTable:
      q.inlineTable && hi.inlineTable
        ? { ...q.inlineTable, hi: hi.inlineTable }
        : q.inlineTable,
    inlineChart:
      q.inlineChart && hi.inlineChartTitle
        ? { ...q.inlineChart, titleHi: hi.inlineChartTitle }
        : q.inlineChart,
  };
}

function attachHindiContext(ctx: SharedContextBlock): SharedContextBlock {
  const hi1B = HINDI_SECTION_1B_CONTEXTS[ctx.id];
  const hi2 = HINDI_SECTION_2_CONTEXTS[ctx.id];
  const hiBlock = hi1B ?? hi2;
  if (!hiBlock) return ctx;

  let nextChart: ChartVisualSpec | undefined = ctx.chart;
  if (ctx.chart && hi1B) {
    nextChart = {
      ...ctx.chart,
      titleHi: hi1B.chartTitleHi ?? ctx.chart.titleHi,
      labelsHi: hi1B.chartLabelsHi ?? ctx.chart.labelsHi,
      series: ctx.chart.series?.map((s, idx) => ({
        ...s,
        nameHi: hi1B.seriesNamesHi?.[idx] ?? s.nameHi,
      })),
      pieSlices: ctx.chart.pieSlices?.map((sl, idx) => ({
        ...sl,
        labelHi: hi1B.pieLabelsHi?.[idx] ?? sl.labelHi,
      })),
      vennData:
        ctx.chart.vennData && hi1B.vennSetsHi
          ? {
              ...ctx.chart.vennData,
              setAHi: hi1B.vennSetsHi[0],
              setBHi: hi1B.vennSetsHi[1],
              setCHi: hi1B.vennSetsHi[2],
            }
          : ctx.chart.vennData,
    };
  }

  return {
    ...ctx,
    hi: {
      title: hiBlock.title,
      theme: hiBlock.theme,
      introText: hiBlock.introText,
      passageParagraphs: hiBlock.passageParagraphs,
      table: hiBlock.table,
    },
    table:
      ctx.table && hiBlock.table
        ? { ...ctx.table, hi: hiBlock.table }
        : ctx.table,
    chart: nextChart,
  };
}

export const ALL_QUESTIONS: ExamQuestion[] = [
  ...SECTION_1A_QUESTIONS,
  ...SECTION_1B_QUESTIONS,
  ...SECTION_2_QUESTIONS,
  ...SECTION_3_QUESTIONS,
].map(attachHindiQuestion);

export const ALL_CONTEXTS: Record<string, SharedContextBlock> = Object.fromEntries(
  Object.entries({
    ...SECTION_1B_CONTEXTS,
    ...SECTION_2_CONTEXTS,
  }).map(([k, v]) => [k, attachHindiContext(v)])
);

export function getLocalizedQuestion(q: ExamQuestion, lang: Language) {
  if (lang === 'hi' && q.hi) {
    return {
      question: q.hi.question,
      statements: q.hi.statements ?? q.statements,
      options: q.hi.options,
      explanation: q.hi.explanation,
      shortcut: q.hi.shortcut,
      inlineTable: q.inlineTable,
      inlineChart: q.inlineChart,
    };
  }
  return {
    question: q.question,
    statements: q.statements,
    options: q.options,
    explanation: q.explanation,
    shortcut: q.shortcut,
    inlineTable: q.inlineTable,
    inlineChart: q.inlineChart,
  };
}

export function getLocalizedContext(ctx: SharedContextBlock, lang: Language) {
  if (lang === 'hi' && ctx.hi) {
    return {
      title: ctx.hi.title,
      theme: ctx.hi.theme ?? ctx.theme,
      introText: ctx.hi.introText ?? ctx.introText,
      passageParagraphs: ctx.hi.passageParagraphs ?? ctx.passageParagraphs,
      table: ctx.table,
      chart: ctx.chart,
    };
  }
  return {
    title: ctx.title,
    theme: ctx.theme,
    introText: ctx.introText,
    passageParagraphs: ctx.passageParagraphs,
    table: ctx.table,
    chart: ctx.chart,
  };
}

export function getLocalizedTable(table: DataTableBlock, lang: Language) {
  if (lang === 'hi' && table.hi) {
    return table.hi;
  }
  return {
    title: table.title,
    headers: table.headers,
    rows: table.rows,
    note: table.note,
  };
}

export interface ScoringExample {
  profile: string;
  profileHi: string;
  attempted: number;
  correct: number;
  wrong: number;
  unattempted: number;
  rawPositive: number;
  negativeDeduction: string;
  finalScore: string;
  accuracy: string;
  verdict: string;
  verdictHi: string;
}

export const SCORING_EXAMPLES: ScoringExample[] = [
  {
    profile: 'High-Accuracy Disciplined Attempt',
    profileHi: 'उच्च-सटीकता अनुशासित प्रयास',
    attempted: 86,
    correct: 80,
    wrong: 6,
    unattempted: 14,
    rawPositive: 80,
    negativeDeduction: '−2.00',
    finalScore: '78.00 / 100',
    accuracy: '93.0%',
    verdict: 'Strong shortlist contender; minimal negative drag.',
    verdictHi: 'चयन सूची के लिए प्रबल दावेदार; न्यूनतम नकारात्मक कटौती।',
  },
  {
    profile: 'Balanced Competitive Attempt',
    profileHi: 'संतुलित प्रतिस्पर्धी प्रयास',
    attempted: 84,
    correct: 75,
    wrong: 9,
    unattempted: 16,
    rawPositive: 75,
    negativeDeduction: '−3.00',
    finalScore: '72.00 / 100',
    accuracy: '89.3%',
    verdict: 'Solid safe zone; avoiding blind guesses preserves +3 marks.',
    verdictHi: 'मजबूत सुरक्षित क्षेत्र; अंधाधुंध अनुमान न लगाने से अंक बचते हैं।',
  },
  {
    profile: 'Over-Attempted With Guessing',
    profileHi: 'अनुमान सहित अत्यधिक प्रयास',
    attempted: 96,
    correct: 72,
    wrong: 24,
    unattempted: 4,
    rawPositive: 72,
    negativeDeduction: '−8.00',
    finalScore: '64.00 / 100',
    accuracy: '75.0%',
    verdict: 'Heavy −1/3 penalty erodes 8 marks despite attempting 96 questions.',
    verdictHi: '96 प्रश्न हल करने के बावजूद भारी −1/3 कटौती से 8 अंक नष्ट हुए।',
  },
  {
    profile: 'Break-Even Guessing Rule (4 Options)',
    profileHi: 'ब्रेक-ईवन अनुमान नियम (4 विकल्प)',
    attempted: 12,
    correct: 3,
    wrong: 9,
    unattempted: 0,
    rawPositive: 3,
    negativeDeduction: '−3.00',
    finalScore: '0.00 Net Gain',
    accuracy: '25.0%',
    verdict:
      'Pure random guessing yields 0 expected value; only guess if ≥ 2 options are eliminated.',
    verdictHi:
      'शुद्ध तुक्का लगाने से शुद्ध लाभ शून्य रहता है; कम से कम 2 विकल्प हटाने पर ही अनुमान लगाएँ।',
  },
];

export interface FormulaGroup {
  category: string;
  categoryHi: string;
  items: {
    name: string;
    nameHi: string;
    expression: string;
    note: string;
    noteHi: string;
  }[];
}

export const KEY_FORMULAS: FormulaGroup[] = [
  {
    category: 'Mathematics & Arithmetic',
    categoryHi: 'गणित एवं अंकगणित',
    items: [
      {
        name: 'LCM & HCF Product Rule',
        nameHi: 'ल.स.प. और म.स.प. गुणनफल नियम',
        expression: 'First Number × Second Number = LCM × HCF',
        note: 'Applies strictly to two positive integers (not three).',
        noteHi: 'यह नियम केवल दो धनात्मक पूर्णांकों पर लागू होता है (तीन पर नहीं)।',
      },
      {
        name: 'Successive Percentage Change',
        nameHi: 'क्रमिक प्रतिशत परिवर्तन',
        expression: 'Net % = x + y + (x · y) / 100',
        note: 'Use negative sign for discount/decrease (e.g., +40% markup, −20% discount).',
        noteHi: 'बट्टा या कमी के लिए ऋणात्मक चिह्न प्रयोग करें (जैसे +40% वृद्धि, −20% छूट)।',
      },
      {
        name: 'Train & Relative Speed',
        nameHi: 'ट्रेन व सापेक्ष चाल',
        expression: '1 m/s = (18 / 5) km/h  |  1 km/h = (5 / 18) m/s',
        note: 'Add speeds for opposite directions; subtract for same direction.',
        noteHi: 'विपरीत दिशा में चालें जोड़ें; समान दिशा में चालें घटाएँ।',
      },
      {
        name: 'Arithmetic Progression',
        nameHi: 'समांतर श्रेणी (AP)',
        expression: 'a_n = a + (n − 1)d  |  S_n = (n / 2)[2a + (n − 1)d]',
        note: 'Average of any AP equals (First Term + Last Term) / 2.',
        noteHi: 'किसी भी समांतर श्रेणी का औसत = (प्रथम पद + अंतिम पद) / 2 होता है।',
      },
      {
        name: 'Cubic Algebraic Identity',
        nameHi: 'घन बीजगणितीय सर्वसमिका',
        expression: 'If x + 1/x = k, then x³ + 1/x³ = k³ − 3k',
        note: 'If x − 1/x = k, then x³ − 1/x³ = k³ + 3k.',
        noteHi: 'यदि x − 1/x = k हो, तो x³ − 1/x³ = k³ + 3k होता है।',
      },
      {
        name: 'Mensuration & Circle Chords',
        nameHi: 'क्षेत्रमिति व वृत्त की जीवाएँ',
        expression: 'V_sphere = (4/3)πr³  |  V_cyl = πr²h  |  r² = d² + (L/2)²',
        note: 'Opposite-side parallel chords: gap = d₁ + d₂; same side: |d₁ − d₂|.',
        noteHi: 'विपरीत ओर समानांतर जीवाओं की दूरी = d₁ + d₂; एक ही ओर = |d₁ − d₂|।',
      },
    ],
  },
  {
    category: 'Basic Science & Mechanics',
    categoryHi: 'बुनियादी विज्ञान एवं यांत्रिकी',
    items: [
      {
        name: 'Kinematics & Energy',
        nameHi: 'गतिकी एवं ऊर्जा',
        expression: 'v = u + at  |  s = ut + ½at²  |  KE = ½mv²  |  PE = mgh',
        note: 'Area under a velocity-time (v–t) graph equals total displacement.',
        noteHi: 'वेग-समय (v–t) ग्राफ के अंतर्गत क्षेत्रफल कुल विस्थापन के बराबर होता है।',
      },
      {
        name: 'Work, Power & Electricity',
        nameHi: 'कार्य, शक्ति और विद्युत',
        expression: 'P = W / t = V · I  |  1/R_eq = 1/R₁ + 1/R₂  |  E(kWh) = (W × h) / 1000',
        note: '1 kWh (1 commercial unit) = 3.6 × 10⁶ Joules.',
        noteHi: '1 kWh (1 व्यावसायिक यूनिट) = 3.6 × 10⁶ जूल।',
      },
      {
        name: 'Density & Temperature',
        nameHi: 'घनत्व एवं तापमान',
        expression: 'ρ = m / V (1 g/cm³ = 1,000 kg/m³)  |  F = (9/5)C + 32',
        note: 'Absolute zero = 0 K = −273.15°C; −40°C = −40°F.',
        noteHi: 'परम शून्य = 0 K = −273.15°C; तथा −40°C = −40°F समान होते हैं।',
      },
      {
        name: 'Friction & Simple Machines',
        nameHi: 'घर्षण और सरल मशीनें',
        expression: 'f_max = μ_s N  |  VR = Effort Arm / Load Arm  |  η = MA / VR',
        note: 'Always verify applied force > f_s(max) before using kinetic friction μ_k N.',
        noteHi: 'गतिज घर्षण μ_k N लगाने से पहले जाँचें कि लगाया गया बल > f_s(max) है।',
      },
    ],
  },
  {
    category: 'Data Interpretation, Logic & Reasoning',
    categoryHi: 'डेटा व्याख्या, तर्क एवं मानसिक योग्यता',
    items: [
      {
        name: 'Pie Chart Conversion',
        nameHi: 'पाई चार्ट रूपांतरण',
        expression: '1% = 3.6°  |  Central Angle = (Part / Total) × 360°',
        note: 'Subtract percentage shares before converting to Rupees or degrees.',
        noteHi: 'राशि या डिग्री में बदलने से पहले प्रतिशत हिस्सेदारी का अंतर निकालें।',
      },
      {
        name: '3-Set Venn Inclusion-Exclusion',
        nameHi: '3-समुच्चय वेन आरेख सूत्र',
        expression: 'n(A∪B∪C) = Σn(A) − Σn(A∩B) + n(A∩B∩C)',
        note: 'Exactly Two = Σn(A∩B) − 3 · n(A∩B∩C).',
        noteHi: 'ठीक दो समुच्चय = Σn(A∩B) − 3 · n(A∩B∩C)।',
      },
      {
        name: 'Clock Hand Angle',
        nameHi: 'घड़ी की सुइयों का कोण',
        expression: 'θ = |30H − 5.5M|  |  90° time: M = (2/11)(30H ± 90)',
        note: 'If θ > 180°, the smaller angle is 360° − θ.',
        noteHi: 'यदि θ > 180° हो, तो छोटा कोण 360° − θ होगा।',
      },
      {
        name: 'Ranking & Order Interchange',
        nameHi: 'क्रम व्यवस्था एवं स्थान-परिवर्तन',
        expression: 'Total = Left + Right − 1  |  Interchange Total = New_A + Old_B − 1',
        note: 'Do not forget to subtract 1 to avoid double-counting the overlapping seat.',
        noteHi: 'दोहरी गिनती से बचने के लिए अंत में 1 घटाना न भूलें।',
      },
    ],
  },
];

export interface ExamPitfall {
  area: string;
  areaHi: string;
  pitfall: string;
  pitfallHi: string;
  prevention: string;
  preventionHi: string;
}

export const EXAM_PITFALLS: ExamPitfall[] = [
  {
    area: 'Unit Conversion Traps (Section 1A)',
    areaHi: 'मात्रक रूपांतरण की भूल (खंड 1A)',
    pitfall:
      'Mixing km/h with metres/seconds, g/cm³ with kg/m³, or Watts with kWh during multi-step physics problems.',
    pitfallHi:
      'भौतिकी के प्रश्नों में किमी/घंटा को मी/से, g/cm³ को kg/m³ या वाट को kWh के साथ मिला देना।',
    prevention:
      'Convert all quantities to SI units (m, kg, s) or consistent units on line 1 of rough work before multiplying.',
    preventionHi:
      'गुणा करने से पहले रफ़ कार्य की पहली ही पंक्ति में सभी राशियों को एकसमान SI मात्रक में बदल लें।',
  },
  {
    area: 'Static vs Kinetic Friction (Section 1A)',
    areaHi: 'स्थैतिक बनाम गतिज घर्षण (खंड 1A)',
    pitfall:
      'Using μ_s instead of μ_k once a body starts moving, or assuming motion when applied force < μ_s mg.',
    pitfallHi:
      'वस्तु के गति में आने के बाद भी μ_k की जगह μ_s लगा देना, या बल < μ_s mg होने पर गति मान लेना।',
    prevention:
      'Run a 2-step check: (1) Compare F with μ_s N to test motion; (2) If moving, switch immediately to μ_k N.',
    preventionHi:
      'दो-चरणीय जाँच करें: (1) गति हेतु F > μ_s N जाँचें; (2) गति होने पर तुरंत μ_k N लागू करें।',
  },
  {
    area: 'Base-Value Confusion in Percentage DI (Section 1B)',
    areaHi: 'प्रतिशत DI में आधार-मान की भ्रांति (खंड 1B)',
    pitfall:
      'Dividing by the new value instead of the original/reference value in "A is what % more/less than B" questions.',
    pitfallHi:
      '"A, B से कितने % अधिक/कम है" में मूल/संदर्भ मान के बजाय नए मान से भाग दे देना।',
    prevention:
      'The quantity immediately following the word "than" or "of" ALWAYS goes in the denominator.',
    preventionHi:
      'जिस राशि के साथ "से" या "का" (than / of) लगा हो, वही सदैव हर (denominator) में जाती है।',
  },
  {
    area: 'Unnecessary Full Calculations in DI (Section 1B)',
    areaHi: 'DI में अनावश्यक लंबी गणना (खंड 1B)',
    pitfall:
      'Computing full Rupee amounts or exact totals when only ratios, percentage differences, or per-km rates are asked.',
    pitfallHi:
      'जब केवल अनुपात, प्रतिशत अंतर या प्रति-किमी दर पूछी गई हो, तब भी पूरी राशि निकालना।',
    prevention:
      'Cancel common factors (tariffs, totals, trailing zeros) before performing division or percentage comparisons.',
    preventionHi:
      'भाग या प्रतिशत तुलना से पहले उभयनिष्ठ गुणनखंड (दर, कुल मान, शून्य) काट दें।',
  },
  {
    area: 'Outside Assumptions in Reading Comprehension (Section 2)',
    areaHi: 'अपठित गद्यांश में बाहरी धारणाएँ (खंड 2)',
    pitfall:
      'Selecting an option that sounds generally plausible in the real world but is never supported by the printed passage.',
    pitfallHi:
      'ऐसा विकल्प चुनना जो सामान्य जीवन में सही लगे, पर गद्यांश में उसका समर्थन न हो।',
    prevention:
      'Treat the passage as a closed universe; eliminate options with unsupported absolutes ("always", "never", "solely").',
    preventionHi:
      'गद्यांश को ही अंतिम प्रमाण मानें; "सदैव", "कभी नहीं", "केवल" जैसे अतिवादी विकल्प हटाएँ।',
  },
  {
    area: 'Circular Seating Direction Reversal (Section 3)',
    areaHi: 'वृत्तीय बैठक व्यवस्था में दिशा भ्रम (खंड 3)',
    pitfall:
      'Confusing Left and Right around a circular table facing the centre vs facing outward.',
    pitfallHi:
      'केंद्र की ओर मुख करने पर बाएँ और दाएँ की दिशा में उलझ जाना।',
    prevention:
      'Memorize one anchor: Facing Centre → Left = Clockwise, Right = Anticlockwise; draw arrows on scratch paper.',
    preventionHi:
      'एक नियम पक्का रखें: केंद्र की ओर मुख → बायाँ = दक्षिणावर्त, दायाँ = वामावर्त।',
  },
  {
    area: 'Negative Marking Drag (−1/3)',
    areaHi: 'नकारात्मक अंकन (−1/3) का नुकसान',
    pitfall:
      'Guessing blindly on 15–20 difficult questions in the final 10 minutes, losing 5–7 net marks.',
    pitfallHi:
      'अंतिम 10 मिनट में 15–20 कठिन प्रश्नों पर अंधाधुंध तुक्का लगाकर 5–7 शुद्ध अंक गँवाना।',
    prevention:
      'Use a strict Two-Pass Strategy: finish all Easy & Moderate questions in 80 min, spend 30 min on solvable Difficult ones, and skip pure 4-option guesses.',
    preventionHi:
      'दो-चरणीय रणनीति अपनाएँ: पहले 80 मिनट में सभी आसान/मध्यम प्रश्न हल करें, फिर 30 मिनट कठिन प्रश्नों को दें और अंधे तुक्के छोड़ दें।',
  },
];

export function exportPaperToMarkdown(
  questions: ExamQuestion[] = ALL_QUESTIONS,
  contexts: Record<string, SharedContextBlock> = ALL_CONTEXTS,
  lang: Language = 'en'
): string {
  const lines: string[] = [];

  lines.push(
    lang === 'hi'
      ? '# RRB स्टेशन मास्टर CBT मॉक पेपर (CEN सं. 08/2026)'
      : '# RRB Station Master CBT Mock Paper (CEN No. 08/2026)'
  );
  lines.push('');
  lines.push(
    lang === 'hi'
      ? '**अवधि:** 120 मिनट | **कुल प्रश्न:** 100 | **अधिकतम अंक:** 100 | **अंकन योजना:** सही +1, गलत −1/3'
      : '**Duration:** 120 Minutes | **Total Questions:** 100 | **Maximum Marks:** 100 | **Marking Scheme:** +1 for Correct, −1/3 for Wrong'
  );
  lines.push('');
  lines.push('---');
  lines.push('');

  const printedContexts = new Set<string>();

  for (const sec of SECTIONS) {
    const secQuestions = questions.filter((q) => q.sectionId === sec.id);
    if (secQuestions.length === 0) continue;

    lines.push(
      `## ${SECTION_TEXT[sec.id].code[lang]} (Q${sec.questionRange[0]}–Q${sec.questionRange[1]}): ${SECTION_TEXT[sec.id].title[lang]} (${secQuestions.length})`
    );
    lines.push('');

    for (const q of secQuestions) {
      if (q.contextId && !printedContexts.has(q.contextId)) {
        printedContexts.add(q.contextId);
        const rawCtx = contexts[q.contextId];
        if (rawCtx) {
          const ctx = getLocalizedContext(rawCtx, lang);
          lines.push(
            `#### ${lang === 'hi' ? 'निर्देश' : 'Directions'} (${rawCtx.rangeLabel}): ${ctx.title}`
          );
          if (ctx.theme) lines.push(`*${lang === 'hi' ? 'विषय' : 'Theme'}: ${ctx.theme}*`);
          if (ctx.introText) lines.push(ctx.introText);
          if (ctx.passageParagraphs) {
            lines.push('');
            for (const p of ctx.passageParagraphs) {
              lines.push(`> ${p}`);
              lines.push('');
            }
          }
          if (ctx.table) {
            const tbl = getLocalizedTable(ctx.table, lang);
            lines.push('');
            lines.push(`**${tbl.title}**`);
            lines.push('');
            lines.push(`| ${tbl.headers.join(' | ')} |`);
            lines.push(`| ${tbl.headers.map(() => '---').join(' | ')} |`);
            for (const row of tbl.rows) {
              lines.push(`| ${row.join(' | ')} |`);
            }
            if (tbl.note) {
              lines.push('');
              lines.push(`*${tbl.note}*`);
            }
          }
          lines.push('');
        }
      }

      const loc = getLocalizedQuestion(q, lang);
      lines.push(
        `### Q${q.id} – ${localizeTopic(q.topic, lang)} – [${lang === 'hi' ? 'कठिनाई' : 'Difficulty'}: ${localizeDifficulty(q.difficulty, lang)}] [${localizeLabel(q.label, lang)}]`
      );
      if (loc.inlineTable) {
        const tbl = getLocalizedTable(loc.inlineTable, lang);
        lines.push('');
        lines.push(`**${tbl.title}**`);
        lines.push(`| ${tbl.headers.join(' | ')} |`);
        lines.push(`| ${tbl.headers.map(() => '---').join(' | ')} |`);
        for (const row of tbl.rows) {
          lines.push(`| ${row.join(' | ')} |`);
        }
        lines.push('');
      }
      lines.push(`**${lang === 'hi' ? 'प्रश्न' : 'Question'}:** ${loc.question}`);
      if (loc.statements && loc.statements.length > 0) {
        for (const st of loc.statements) {
          lines.push(`- ${st}`);
        }
      }
      lines.push(
        `A. ${loc.options.A} | B. ${loc.options.B} | C. ${loc.options.C} | D. ${loc.options.D}`
      );
      lines.push(
        `**${lang === 'hi' ? 'सही उत्तर' : 'Correct Answer'}:** ${q.correctOption}. ${loc.options[q.correctOption]}`
      );
      lines.push(`**${lang === 'hi' ? 'व्याख्या' : 'Explanation'}:** ${loc.explanation}`);
      lines.push(`**${lang === 'hi' ? 'शॉर्टकट/ट्रिक' : 'Shortcut/Trick'}:** ${loc.shortcut}`);
      lines.push('');
    }

    lines.push('---');
    lines.push('');
  }

  lines.push(
    lang === 'hi'
      ? '## 1. पूर्ण 1–100 उत्तर कुंजी सारणी'
      : '## 1. Complete 1–100 Answer Key Table'
  );
  lines.push('');
  lines.push('| Q.No | Topic | Difficulty | Answer |');
  lines.push('| --- | --- | --- | --- |');
  for (const q of questions) {
    lines.push(
      `| Q${q.id} | ${localizeTopic(q.topic, lang)} | ${localizeDifficulty(q.difficulty, lang)} | ${q.correctOption} |`
    );
  }

  return lines.join('\n');
}
