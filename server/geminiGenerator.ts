import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import type {
  ExamQuestion,
  OptionKey,
  SectionId,
  SharedContextBlock,
} from '../src/data/types';

function createClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'GEMINI_API_KEY is not configured on the server. Add GEMINI_API_KEY in Settings > Secrets (or Vercel Environment Variables) to generate fresh AI mock papers.'
    );
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SECTION_PROMPTS: Record<
  SectionId,
  {
    startId: number;
    defaultCount: number;
    spec: string;
  }
> = {
  '1A': {
    startId: 1,
    defaultCount: 30,
    spec: `Section 1A: Basic Science & Mathematics (30 questions, Q1–Q30).
Order strictly: first 10 Easy, next 12 Moderate, final 8 Difficult.
Math topics: Number System, Ratio & Proportion, Average, Percentage, Profit & Loss, Discount, Time Speed & Distance, Time & Work, Algebra, Linear Equations, Arithmetic Progression, LCM & HCF, Geometry, Trigonometry, Area, Volume, Basic Probability, Basic Statistics.
Science topics: Units & Measurements, Mass/Weight/Density, Work/Power/Energy, Kinetic Energy, Friction, Speed & Velocity, Relative Velocity, Heat & Temperature, Basic Electricity, Levers, Simple Machines.
Verify every single arithmetic calculation before finalizing options.`,
  },
  '1B': {
    startId: 31,
    defaultCount: 30,
    spec: `Section 1B: Data Analysis & Interpretation (30 questions, Q31–Q60).
Order strictly: first 10 Easy, next 12 Moderate, final 8 Difficult.
Include inline structured numerical tables (in both English and Hindi) for: Table DI, Bar/Line/Pie data tables, Venn diagram set counts, Frequency distribution, Data Arrangement, Multi-source/Text DI, Data Sufficiency, Trend/Inference, and Inconsistency Detection.
Whenever a question refers to a table or dataset, include the complete table inside its inlineTableEn and inlineTableHi fields so every question is 100% self-contained.`,
  },
  '2': {
    startId: 61,
    defaultCount: 20,
    spec: `Section 2: Logical Capability (20 questions, Q61–Q80).
- First 10 questions (Q61–Q70, subSection="Logical Reasoning"): Syllogism, Blood Relations, Family Trees, Clocks, Calendars, Assumptions, Binary Logic, Logical Puzzles. Order Easy (3) -> Moderate (4) -> Difficult (3).
- Next 10 questions (Q71–Q80, subSection="Reading Comprehension"): Create 2 or 3 short original passages on Science/Technology, Environment/Society, or Culture/Abstract themes (put the passage text in contexts[] with matching contextId, in BOTH English and Hindi). Test ONLY passage comprehension (Main Idea, Supporting Idea, Inference, Application, Tone, Conclusion) — zero outside GK.`,
  },
  '3': {
    startId: 81,
    defaultCount: 20,
    spec: `Section 3: Mental Reasoning (20 questions, Q81–Q100).
Order strictly: first 7 Easy, next 7 Moderate, final 6 Difficult.
Topics: Number Series, Letter Series, Series Completion, Analogy (word & number), Coding-Decoding, Ranking, Order & Position, Linear & Circular Arrangements, Pattern Recognition (number matrix / alphanumeric), Logical Sequence.`,
  },
};

const BILINGUAL_TABLE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    headers: { type: Type.ARRAY, items: { type: Type.STRING } },
    rows: {
      type: Type.ARRAY,
      items: { type: Type.ARRAY, items: { type: Type.STRING } },
    },
    note: { type: Type.STRING },
  },
  required: ['title', 'headers', 'rows'],
};

const OPTIONS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    A: { type: Type.STRING },
    B: { type: Type.STRING },
    C: { type: Type.STRING },
    D: { type: Type.STRING },
  },
  required: ['A', 'B', 'C', 'D'],
};

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    contexts: {
      type: Type.ARRAY,
      description:
        'Shared Reading Comprehension passages or shared DI contexts (optional for 1A and 3, required for RC passages in Section 2).',
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          type: { type: Type.STRING, description: 'di or passage' },
          rangeLabel: { type: Type.STRING },
          en: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              theme: { type: Type.STRING },
              introText: { type: Type.STRING },
              passageParagraphs: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              table: BILINGUAL_TABLE_SCHEMA,
            },
            required: ['title'],
          },
          hi: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              theme: { type: Type.STRING },
              introText: { type: Type.STRING },
              passageParagraphs: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              table: BILINGUAL_TABLE_SCHEMA,
            },
            required: ['title'],
          },
        },
        required: ['id', 'type', 'rangeLabel', 'en', 'hi'],
      },
    },
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          topic: { type: Type.STRING },
          subSection: { type: Type.STRING },
          difficulty: {
            type: Type.STRING,
            description: 'Easy, Moderate, or Difficult',
          },
          label: {
            type: Type.STRING,
            description:
              'Previous-Year Pattern Question or Model Practice Question',
          },
          contextId: { type: Type.STRING },
          correctOption: {
            type: Type.STRING,
            description: 'A, B, C, or D',
          },
          en: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              statements: { type: Type.ARRAY, items: { type: Type.STRING } },
              options: OPTIONS_SCHEMA,
              explanation: { type: Type.STRING },
              shortcut: { type: Type.STRING },
              inlineTable: BILINGUAL_TABLE_SCHEMA,
            },
            required: ['question', 'options', 'explanation', 'shortcut'],
          },
          hi: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              statements: { type: Type.ARRAY, items: { type: Type.STRING } },
              options: OPTIONS_SCHEMA,
              explanation: { type: Type.STRING },
              shortcut: { type: Type.STRING },
              inlineTable: BILINGUAL_TABLE_SCHEMA,
            },
            required: ['question', 'options', 'explanation', 'shortcut'],
          },
        },
        required: [
          'topic',
          'difficulty',
          'label',
          'correctOption',
          'en',
          'hi',
        ],
      },
    },
  },
  required: ['questions'],
};

interface RawGeneratedPayload {
  contexts?: {
    id: string;
    type: string;
    rangeLabel: string;
    en: {
      title: string;
      theme?: string;
      introText?: string;
      passageParagraphs?: string[];
      table?: {
        title: string;
        headers: string[];
        rows: string[][];
        note?: string;
      };
    };
    hi: {
      title: string;
      theme?: string;
      introText?: string;
      passageParagraphs?: string[];
      table?: {
        title: string;
        headers: string[];
        rows: string[][];
        note?: string;
      };
    };
  }[];
  questions: {
    topic: string;
    subSection?: string;
    difficulty: string;
    label: string;
    contextId?: string;
    correctOption: string;
    en: {
      question: string;
      statements?: string[];
      options: Record<OptionKey, string>;
      explanation: string;
      shortcut: string;
      inlineTable?: {
        title: string;
        headers: string[];
        rows: string[][];
        note?: string;
      };
    };
    hi: {
      question: string;
      statements?: string[];
      options: Record<OptionKey, string>;
      explanation: string;
      shortcut: string;
      inlineTable?: {
        title: string;
        headers: string[];
        rows: string[][];
        note?: string;
      };
    };
  }[];
}

export async function generateBilingualSection(
  sectionId: SectionId,
  randomSeed: string
): Promise<{
  questions: ExamQuestion[];
  contexts: Record<string, SharedContextBlock>;
}> {
  const spec = SECTION_PROMPTS[sectionId];
  const ai = createClient();

  const systemInstruction = `You are an expert RRB Station Master CBT exam paper setter for CEN No. 08/2026.
STRICT RULES:
1. ZERO General Knowledge, General Awareness, Current Affairs, History, Geography, Polity, Economics, Static GK, or trivia.
2. Generate EVERY question in BOTH natural English ("en") AND accurate, natural Hindi Devanagari script ("hi") using authentic Indian Railways exam terminology:
   - Speed/Time/Distance -> चाल, समय और दूरी
   - Work, Power & Energy -> कार्य, शक्ति और ऊर्जा
   - Kinetic Energy -> गतिज ऊर्जा
   - Syllogism -> न्याय निगमन
   - Blood Relations -> रक्त संबंध
   - Coding-Decoding -> कूटलेखन-कूटवाचन
   - Percentage -> प्रतिशत, Profit & Loss -> लाभ और हानि, Average -> औसत, Ratio -> अनुपात।
3. Both English and Hindi versions of every question MUST have the exact same numerical values, exact same option mapping (A, B, C, D), and ONE unambiguously verified correctOption.
4. Vary numerical scenarios freshly using the provided randomization seed so each test is unique.
5. Keep explanations concise, step-by-step, and verified; include a crisp time-saving shortcut in both languages.`;

  const prompt = `Randomization Seed: ${randomSeed}
Generate exactly ${spec.defaultCount} fresh, non-repeating bilingual (English + Hindi) RRB Station Master CEN No. 08/2026 CBT questions for:
${spec.spec}

Return strictly valid JSON conforming to the provided schema. Ensure both "en" and "hi" fields are completely filled for every question, option, explanation, shortcut, table, and passage.`;

  const response = await ai.models.generateContent({
    model: 'gemini-4-hydrogen',
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: 'application/json',
      responseSchema: RESPONSE_SCHEMA,
      thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
    },
  });

  const text = response.text?.trim();
  if (!text) {
    throw new Error(`Empty response returned by Gemini API for Section ${sectionId}.`);
  }

  const parsed = JSON.parse(text) as RawGeneratedPayload;
  if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) {
    throw new Error(`Invalid question payload returned for Section ${sectionId}.`);
  }

  const contexts: Record<string, SharedContextBlock> = {};
  if (Array.isArray(parsed.contexts)) {
    for (const c of parsed.contexts) {
      const ctxId = `${sectionId}-${c.id}`;
      contexts[ctxId] = {
        id: ctxId,
        type: c.type === 'passage' ? 'passage' : 'di',
        rangeLabel: c.rangeLabel,
        title: c.en.title,
        theme: c.en.theme,
        introText: c.en.introText,
        passageParagraphs: c.en.passageParagraphs,
        table: c.en.table
          ? {
              ...c.en.table,
              hi: c.hi.table,
            }
          : undefined,
        hi: {
          title: c.hi.title,
          theme: c.hi.theme,
          introText: c.hi.introText,
          passageParagraphs: c.hi.passageParagraphs,
          table: c.hi.table,
        },
      };
    }
  }

  const validOpts: OptionKey[] = ['A', 'B', 'C', 'D'];
  const questions: ExamQuestion[] = parsed.questions
    .slice(0, spec.defaultCount)
    .map((raw, idx) => {
      const diff =
        raw.difficulty === 'Easy' ||
        raw.difficulty === 'Moderate' ||
        raw.difficulty === 'Difficult'
          ? raw.difficulty
          : 'Moderate';
      const label =
        raw.label === 'Previous-Year Pattern Question'
          ? 'Previous-Year Pattern Question'
          : 'Model Practice Question';
      const correctOption: OptionKey = validOpts.includes(
        raw.correctOption as OptionKey
      )
        ? (raw.correctOption as OptionKey)
        : 'A';

      const mappedContextId =
        raw.contextId && contexts[`${sectionId}-${raw.contextId}`]
          ? `${sectionId}-${raw.contextId}`
          : undefined;

      const subSection =
        sectionId === '2'
          ? raw.subSection === 'Reading Comprehension' || idx >= 10
            ? 'Reading Comprehension'
            : 'Logical Reasoning'
          : undefined;

      return {
        id: spec.startId + idx,
        sectionId,
        subSection,
        topic: raw.topic,
        difficulty: diff,
        label,
        contextId: mappedContextId,
        inlineTable: raw.en.inlineTable
          ? {
              ...raw.en.inlineTable,
              hi: raw.hi.inlineTable,
            }
          : undefined,
        question: raw.en.question,
        statements: raw.en.statements?.length ? raw.en.statements : undefined,
        options: raw.en.options,
        correctOption,
        explanation: raw.en.explanation,
        shortcut: raw.en.shortcut,
        hi: {
          question: raw.hi.question,
          statements: raw.hi.statements?.length ? raw.hi.statements : undefined,
          options: raw.hi.options,
          explanation: raw.hi.explanation,
          shortcut: raw.hi.shortcut,
          inlineTable: raw.hi.inlineTable,
        },
      };
    });

  return { questions, contexts };
}
