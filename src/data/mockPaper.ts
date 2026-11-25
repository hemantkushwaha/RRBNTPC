import { SECTION_1A_QUESTIONS } from './section1A';
import { SECTION_1B_CONTEXTS, SECTION_1B_QUESTIONS } from './section1B';
import { SECTION_2_CONTEXTS, SECTION_2_QUESTIONS } from './section2';
import { SECTION_3_QUESTIONS } from './section3';
import { ExamQuestion, SECTIONS, SharedContextBlock } from './types';

export const ALL_QUESTIONS: ExamQuestion[] = [
  ...SECTION_1A_QUESTIONS,
  ...SECTION_1B_QUESTIONS,
  ...SECTION_2_QUESTIONS,
  ...SECTION_3_QUESTIONS,
];

export const ALL_CONTEXTS: Record<string, SharedContextBlock> = {
  ...SECTION_1B_CONTEXTS,
  ...SECTION_2_CONTEXTS,
};

export interface ScoringExample {
  profile: string;
  attempted: number;
  correct: number;
  wrong: number;
  unattempted: number;
  rawPositive: number;
  negativeDeduction: string;
  finalScore: string;
  accuracy: string;
  verdict: string;
}

export const SCORING_EXAMPLES: ScoringExample[] = [
  {
    profile: 'High-Accuracy Disciplined Attempt',
    attempted: 86,
    correct: 80,
    wrong: 6,
    unattempted: 14,
    rawPositive: 80,
    negativeDeduction: '−2.00',
    finalScore: '78.00 / 100',
    accuracy: '93.0%',
    verdict: 'Strong shortlist contender; minimal negative drag.',
  },
  {
    profile: 'Balanced Competitive Attempt',
    attempted: 84,
    correct: 75,
    wrong: 9,
    unattempted: 16,
    rawPositive: 75,
    negativeDeduction: '−3.00',
    finalScore: '72.00 / 100',
    accuracy: '89.3%',
    verdict: 'Solid safe zone; avoiding blind guesses preserves +3 marks.',
  },
  {
    profile: 'Over-Attempted With Guessing',
    attempted: 96,
    correct: 72,
    wrong: 24,
    unattempted: 4,
    rawPositive: 72,
    negativeDeduction: '−8.00',
    finalScore: '64.00 / 100',
    accuracy: '75.0%',
    verdict: 'Heavy −1/3 penalty erodes 8 marks despite attempting 96 questions.',
  },
  {
    profile: 'Break-Even Guessing Rule (4 Options)',
    attempted: 12,
    correct: 3,
    wrong: 9,
    unattempted: 0,
    rawPositive: 3,
    negativeDeduction: '−3.00',
    finalScore: '0.00 Net Gain',
    accuracy: '25.0%',
    verdict: 'Pure random guessing yields 0 expected value; only guess if ≥ 2 options are eliminated.',
  },
];

export interface FormulaGroup {
  category: string;
  items: { name: string; expression: string; note: string }[];
}

export const KEY_FORMULAS: FormulaGroup[] = [
  {
    category: 'Mathematics & Arithmetic',
    items: [
      {
        name: 'LCM & HCF Product Rule',
        expression: 'First Number × Second Number = LCM × HCF',
        note: 'Applies strictly to two positive integers (not three).',
      },
      {
        name: 'Successive Percentage Change',
        expression: 'Net % = x + y + (x · y) / 100',
        note: 'Use negative sign for discount/decrease (e.g., +40% markup, −20% discount).',
      },
      {
        name: 'Train & Relative Speed',
        expression: '1 m/s = (18 / 5) km/h  |  1 km/h = (5 / 18) m/s',
        note: 'Add speeds for opposite directions; subtract for same direction.',
      },
      {
        name: 'Arithmetic Progression',
        expression: 'a_n = a + (n − 1)d  |  S_n = (n / 2)[2a + (n − 1)d]',
        note: 'Average of any AP equals (First Term + Last Term) / 2.',
      },
      {
        name: 'Cubic Algebraic Identity',
        expression: 'If x + 1/x = k, then x³ + 1/x³ = k³ − 3k',
        note: 'If x − 1/x = k, then x³ − 1/x³ = k³ + 3k.',
      },
      {
        name: 'Mensuration & Circle Chords',
        expression: 'V_sphere = (4/3)πr³  |  V_cyl = πr²h  |  r² = d² + (L/2)²',
        note: 'Opposite-side parallel chords: gap = d₁ + d₂; same side: |d₁ − d₂|.',
      },
    ],
  },
  {
    category: 'Basic Science & Mechanics',
    items: [
      {
        name: 'Kinematics & Energy',
        expression: 'v = u + at  |  s = ut + ½at²  |  KE = ½mv²  |  PE = mgh',
        note: 'Area under a velocity-time (v–t) graph equals total displacement.',
      },
      {
        name: 'Work, Power & Electricity',
        expression: 'P = W / t = V · I  |  1/R_eq = 1/R₁ + 1/R₂  |  E(kWh) = (W × h) / 1000',
        note: '1 kWh (1 commercial unit) = 3.6 × 10⁶ Joules.',
      },
      {
        name: 'Density & Temperature',
        expression: 'ρ = m / V (1 g/cm³ = 1,000 kg/m³)  |  F = (9/5)C + 32',
        note: 'Absolute zero = 0 K = −273.15°C; −40°C = −40°F.',
      },
      {
        name: 'Friction & Simple Machines',
        expression: 'f_max = μ_s N  |  VR = Effort Arm / Load Arm  |  η = MA / VR',
        note: 'Always verify applied force > f_s(max) before using kinetic friction μ_k N.',
      },
    ],
  },
  {
    category: 'Data Interpretation, Logic & Reasoning',
    items: [
      {
        name: 'Pie Chart Conversion',
        expression: '1% = 3.6°  |  Central Angle = (Part / Total) × 360°',
        note: 'Subtract percentage shares before converting to Rupees or degrees.',
      },
      {
        name: '3-Set Venn Inclusion-Exclusion',
        expression: 'n(A∪B∪C) = Σn(A) − Σn(A∩B) + n(A∩B∩C)',
        note: 'Exactly Two = Σn(A∩B) − 3 · n(A∩B∩C).',
      },
      {
        name: 'Clock Hand Angle',
        expression: 'θ = |30H − 5.5M|  |  90° time: M = (2/11)(30H ± 90)',
        note: 'If θ > 180°, the smaller angle is 360° − θ.',
      },
      {
        name: 'Ranking & Order Interchange',
        expression: 'Total = Left + Right − 1  |  Interchange Total = New_A + Old_B − 1',
        note: 'Do not forget to subtract 1 to avoid double-counting the overlapping seat.',
      },
    ],
  },
];

export interface ExamPitfall {
  area: string;
  pitfall: string;
  prevention: string;
}

export const EXAM_PITFALLS: ExamPitfall[] = [
  {
    area: 'Unit Conversion Traps (Section 1A)',
    pitfall:
      'Mixing km/h with metres/seconds, g/cm³ with kg/m³, or Watts with kWh during multi-step physics problems.',
    prevention:
      'Convert all quantities to SI units (m, kg, s) or consistent units on line 1 of rough work before multiplying.',
  },
  {
    area: 'Static vs Kinetic Friction (Section 1A)',
    pitfall:
      'Using μ_s instead of μ_k once a body starts moving, or assuming motion when applied force < μ_s mg.',
    prevention:
      'Run a 2-step check: (1) Compare F with μ_s N to test motion; (2) If moving, switch immediately to μ_k N.',
  },
  {
    area: 'Base-Value Confusion in Percentage DI (Section 1B)',
    pitfall:
      'Dividing by the new value instead of the original/reference value in "A is what % more/less than B" questions.',
    prevention:
      'The quantity immediately following the word "than" or "of" ALWAYS goes in the denominator.',
  },
  {
    area: 'Unnecessary Full Calculations in DI (Section 1B)',
    pitfall:
      'Computing full Rupee amounts or exact totals when only ratios, percentage differences, or per-km rates are asked.',
    prevention:
      'Cancel common factors (tariffs, totals, trailing zeros) before performing division or percentage comparisons.',
  },
  {
    area: 'Outside Assumptions in Reading Comprehension (Section 2)',
    pitfall:
      'Selecting an option that sounds generally plausible in the real world but is never supported by the printed passage.',
    prevention:
      'Treat the passage as a closed universe; eliminate options with unsupported absolutes ("always", "never", "solely").',
  },
  {
    area: 'Circular Seating Direction Reversal (Section 3)',
    pitfall:
      'Confusing Left and Right around a circular table facing the centre vs facing outward.',
    prevention:
      'Memorize one anchor: Facing Centre → Left = Clockwise, Right = Anticlockwise; draw arrows on scratch paper.',
  },
  {
    area: 'Negative Marking Drag (−1/3)',
    pitfall:
      'Guessing blindly on 15–20 difficult questions in the final 10 minutes, losing 5–7 net marks.',
    prevention:
      'Use a strict Two-Pass Strategy: finish all Easy & Moderate questions in 80 min, spend 30 min on solvable Difficult ones, and skip pure 4-option guesses.',
  },
];

export function exportPaperToMarkdown(): string {
  const lines: string[] = [];

  lines.push('# RRB Station Master CBT Mock Paper (CEN No. 08/2026)');
  lines.push('');
  lines.push(
    '**Duration:** 120 Minutes | **Total Questions:** 100 | **Maximum Marks:** 100 | **Marking Scheme:** +1 for Correct, −1/3 for Wrong'
  );
  lines.push('');
  lines.push('---');
  lines.push('');

  const printedContexts = new Set<string>();

  for (const sec of SECTIONS) {
    lines.push(`## ${sec.code} (Q${sec.questionRange[0]}–Q${sec.questionRange[1]}): ${sec.title} (${sec.count} Questions)`);
    lines.push('');

    const secQuestions = ALL_QUESTIONS.filter((q) => q.sectionId === sec.id);

    for (const q of secQuestions) {
      if (q.contextId && !printedContexts.has(q.contextId)) {
        printedContexts.add(q.contextId);
        const ctx = ALL_CONTEXTS[q.contextId];
        if (ctx) {
          lines.push(`#### Directions (${ctx.rangeLabel}): ${ctx.title}`);
          if (ctx.theme) lines.push(`*Theme: ${ctx.theme}*`);
          if (ctx.introText) lines.push(ctx.introText);
          if (ctx.passageParagraphs) {
            lines.push('');
            for (const p of ctx.passageParagraphs) {
              lines.push(`> ${p}`);
              lines.push('');
            }
          }
          if (ctx.table) {
            lines.push('');
            lines.push(`**${ctx.table.title}**`);
            lines.push('');
            lines.push(`| ${ctx.table.headers.join(' | ')} |`);
            lines.push(`| ${ctx.table.headers.map(() => '---').join(' | ')} |`);
            for (const row of ctx.table.rows) {
              lines.push(`| ${row.join(' | ')} |`);
            }
            if (ctx.table.note) {
              lines.push('');
              lines.push(`*Note: ${ctx.table.note}*`);
            }
          }
          lines.push('');
        }
      }

      lines.push(
        `### Q${q.id} – ${q.topic} – [Difficulty: ${q.difficulty}] [${q.label}]`
      );
      if (q.inlineTable) {
        lines.push('');
        lines.push(`**${q.inlineTable.title}**`);
        lines.push(`| ${q.inlineTable.headers.join(' | ')} |`);
        lines.push(`| ${q.inlineTable.headers.map(() => '---').join(' | ')} |`);
        for (const row of q.inlineTable.rows) {
          lines.push(`| ${row.join(' | ')} |`);
        }
        lines.push('');
      }
      lines.push(`**Question:** ${q.question}`);
      if (q.statements && q.statements.length > 0) {
        for (const st of q.statements) {
          lines.push(`- ${st}`);
        }
      }
      lines.push(
        `A. ${q.options.A} | B. ${q.options.B} | C. ${q.options.C} | D. ${q.options.D}`
      );
      lines.push(`**Correct Answer:** ${q.correctOption}. ${q.options[q.correctOption]}`);
      lines.push(`**Explanation:** ${q.explanation}`);
      lines.push(`**Shortcut/Trick:** ${q.shortcut}`);
      lines.push('');
    }

    lines.push('---');
    lines.push('');
  }

  lines.push('## 1. Complete 1–100 Answer Key Table');
  lines.push('');
  lines.push('| Q.No | Topic | Difficulty | Answer |');
  lines.push('| --- | --- | --- | --- |');
  for (const q of ALL_QUESTIONS) {
    lines.push(`| Q${q.id} | ${q.topic} | ${q.difficulty} | ${q.correctOption} |`);
  }
  lines.push('');

  lines.push('## 2. Section-Wise Score, Negative Marking (−1/3) & 120-Minute Strategy');
  lines.push('');
  lines.push('| Section | Questions | Recommended Time | Target Attempts | Target Net Score |');
  lines.push('| --- | --- | --- | --- | --- |');
  for (const s of SECTIONS) {
    lines.push(
      `| ${s.code}: ${s.title} | ${s.count} | ${s.recommendedMinutes} min | ${s.targetAttempts} | ${s.targetScore} |`
    );
  }
  lines.push('');
  lines.push('### Negative Marking Worked Examples (+1 Correct, −1/3 Wrong)');
  lines.push('| Profile | Attempted | Correct | Wrong | Penalty | Final Score | Accuracy |');
  lines.push('| --- | --- | --- | --- | --- | --- | --- |');
  for (const ex of SCORING_EXAMPLES) {
    lines.push(
      `| ${ex.profile} | ${ex.attempted} | ${ex.correct} | ${ex.wrong} | ${ex.negativeDeduction} | ${ex.finalScore} | ${ex.accuracy} |`
    );
  }
  lines.push('');

  lines.push('## 3. Key Formulas & Common Exam Pitfalls');
  lines.push('');
  for (const group of KEY_FORMULAS) {
    lines.push(`### ${group.category}`);
    for (const item of group.items) {
      lines.push(`- **${item.name}:** \`${item.expression}\` — ${item.note}`);
    }
    lines.push('');
  }
  lines.push('### Common Exam Pitfalls');
  for (const p of EXAM_PITFALLS) {
    lines.push(`- **${p.area}:** ${p.pitfall} *Fix:* ${p.prevention}`);
  }

  return lines.join('\n');
}
