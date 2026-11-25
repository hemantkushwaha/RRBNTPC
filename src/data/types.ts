export type SectionId = '1A' | '1B' | '2' | '3';

export type Difficulty = 'Easy' | 'Moderate' | 'Difficult';

export type QuestionLabel =
  | 'Previous-Year Pattern Question'
  | 'Model Practice Question';

export type OptionKey = 'A' | 'B' | 'C' | 'D';

export interface DataTableBlock {
  title: string;
  headers: string[];
  rows: (string | number)[][];
  note?: string;
}

export interface ChartBarSeries {
  name: string;
  color: string;
  values: number[];
}

export interface ChartVisualSpec {
  type: 'grouped-bar' | 'pie' | 'line' | 'venn' | 'scatter' | 'histogram';
  title: string;
  subtitle?: string;
  labels?: string[];
  series?: ChartBarSeries[];
  pieSlices?: { label: string; value: number; color: string }[];
  scatterPoints?: { x: number; y: number }[];
  xLabel?: string;
  yLabel?: string;
  vennData?: {
    total: number;
    setA: string;
    setB: string;
    setC: string;
    onlyA: number;
    onlyB: number;
    onlyC: number;
    abOnly: number;
    bcOnly: number;
    acOnly: number;
    allThree: number;
  };
}

export interface SharedContextBlock {
  id: string;
  type: 'di' | 'passage';
  rangeLabel: string;
  title: string;
  theme?: string;
  introText?: string;
  passageParagraphs?: string[];
  table?: DataTableBlock;
  chart?: ChartVisualSpec;
}

export interface ExamQuestion {
  id: number;
  sectionId: SectionId;
  subSection?: 'Logical Reasoning' | 'Reading Comprehension';
  topic: string;
  difficulty: Difficulty;
  label: QuestionLabel;
  contextId?: string;
  inlineTable?: DataTableBlock;
  inlineChart?: ChartVisualSpec;
  question: string;
  statements?: string[];
  options: Record<OptionKey, string>;
  correctOption: OptionKey;
  explanation: string;
  shortcut: string;
}

export interface SectionMeta {
  id: SectionId;
  code: string;
  title: string;
  shortTitle: string;
  questionRange: [number, number];
  count: number;
  recommendedMinutes: number;
  targetAttempts: string;
  targetScore: string;
  syllabusSummary: string;
}

export const SECTIONS: SectionMeta[] = [
  {
    id: '1A',
    code: 'Section 1A',
    title: 'Basic Science & Mathematics',
    shortTitle: 'Science & Math',
    questionRange: [1, 30],
    count: 30,
    recommendedMinutes: 35,
    targetAttempts: '25–27',
    targetScore: '23.0 – 25.5',
    syllabusSummary:
      'Number System, Ratio, Average, Percentage, Profit & Loss, Discount, TSD, Time & Work, Algebra, AP, LCM/HCF, Geometry, Trigonometry, Mensuration, Probability, Statistics, Mechanics, Heat, Electricity & Simple Machines.',
  },
  {
    id: '1B',
    code: 'Section 1B',
    title: 'Data Analysis & Interpretation',
    shortTitle: 'Data Analysis',
    questionRange: [31, 60],
    count: 30,
    recommendedMinutes: 40,
    targetAttempts: '24–26',
    targetScore: '22.0 – 24.5',
    syllabusSummary:
      'Tables, Bar/Line/Pie/Scatter Graphs, Frequency Curves, Venn Diagrams, Data Sufficiency, Data Arrangement, Multi-Source & Text DI, Trend Inference & Inconsistency Detection.',
  },
  {
    id: '2',
    code: 'Section 2',
    title: 'Logical Capability',
    shortTitle: 'Logical Capability',
    questionRange: [61, 80],
    count: 20,
    recommendedMinutes: 25,
    targetAttempts: '17–18',
    targetScore: '15.5 – 17.0',
    syllabusSummary:
      'Syllogism, Blood Relations, Family Trees, Clocks, Calendars, Assumptions, Binary Logic, Analytical Puzzles (Q61–Q70) & Passage-Based Reading Comprehension (Q71–Q80).',
  },
  {
    id: '3',
    code: 'Section 3',
    title: 'Mental Reasoning',
    shortTitle: 'Mental Reasoning',
    questionRange: [81, 100],
    count: 20,
    recommendedMinutes: 20,
    targetAttempts: '18–19',
    targetScore: '17.0 – 18.5',
    syllabusSummary:
      'Number & Letter Series, Series Completion, Analogy, Coding-Decoding, Ranking, Order & Position, Linear & Circular Arrangements, Pattern Recognition & Logical Sequences.',
  },
];
