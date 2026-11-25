import { useMemo, useState } from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  Download,
  Eye,
  EyeOff,
  Search,
  Sparkles,
  XCircle,
} from 'lucide-react';
import {
  ALL_CONTEXTS,
  ALL_QUESTIONS,
  exportPaperToMarkdown,
} from '../data/mockPaper';
import {
  Difficulty,
  ExamQuestion,
  OptionKey,
  QuestionLabel,
  SECTIONS,
  SectionId,
} from '../data/types';
import { DataChart } from './DataChart';
import { DataTable } from './DataTable';

interface MockPaperViewProps {
  onLaunchCbt: () => void;
}

const OPTION_KEYS: OptionKey[] = ['A', 'B', 'C', 'D'];

export function MockPaperView({ onLaunchCbt }: MockPaperViewProps) {
  const [activeSection, setActiveSection] = useState<'ALL' | SectionId>('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState<'ALL' | Difficulty>('ALL');
  const [labelFilter, setLabelFilter] = useState<'ALL' | QuestionLabel>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllSolutions, setShowAllSolutions] = useState(true);
  const [revealedIds, setRevealedIds] = useState<Record<number, boolean>>({});
  const [selfPracticeAnswers, setSelfPracticeAnswers] = useState<
    Record<number, OptionKey>
  >({});
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  const filteredQuestions = useMemo(() => {
    const qLower = searchQuery.trim().toLowerCase();
    return ALL_QUESTIONS.filter((q) => {
      if (activeSection !== 'ALL' && q.sectionId !== activeSection) return false;
      if (difficultyFilter !== 'ALL' && q.difficulty !== difficultyFilter) return false;
      if (labelFilter !== 'ALL' && q.label !== labelFilter) return false;
      if (qLower) {
        const hay = `${q.id} q${q.id} ${q.topic} ${q.question} ${q.explanation}`.toLowerCase();
        if (!hay.includes(qLower)) return false;
      }
      return true;
    });
  }, [activeSection, difficultyFilter, labelFilter, searchQuery]);

  const handleCopyMarkdown = async () => {
    const md = exportPaperToMarkdown();
    try {
      await navigator.clipboard.writeText(md);
      setCopiedMarkdown(true);
      setTimeout(() => setCopiedMarkdown(false), 2400);
    } catch {
      handleDownloadMarkdown();
    }
  };

  const handleDownloadMarkdown = () => {
    const md = exportPaperToMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'RRB-Station-Master-CEN-08-2026-Mock-Paper.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleReveal = (id: number) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectOption = (qId: number, opt: OptionKey) => {
    setSelfPracticeAnswers((prev) => ({ ...prev, [qId]: opt }));
    if (!showAllSolutions) {
      setRevealedIds((prev) => ({ ...prev, [qId]: true }));
    }
  };

  // Track rendered shared context blocks so each DI table or RC passage prints once right before its first visible question
  const renderedContexts = new Set<string>();

  return (
    <div className="space-y-8">
      {/* Paper Overview Header */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-2.5">
            <div className="text-xs font-medium text-blue-700 tracking-wide">
              CEN No. 08/2026 · Computer-Based Test Mock Paper · Strictly Syllabus-Aligned
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              RRB Station Master Complete 100-Question CBT Mock Paper
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Verified 100-question examination covering Basic Science & Mathematics, Data Analysis &
              Interpretation, Logical Capability (with original Reading Comprehension), and Mental
              Reasoning. Ordered progressively from Easy to Difficult within every section, with zero
              General Knowledge or trivia.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 no-print">
            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copiedMarkdown ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  Copied Markdown
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  Copy Full Paper (.md)
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              Download .md
            </button>
            <button
              type="button"
              onClick={onLaunchCbt}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Take Timed CBT Test
            </button>
          </div>
        </div>

        {/* 4-column Key Exam Parameters strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200">
          <div>
            <div className="text-xs text-slate-500">Total Questions</div>
            <div className="text-lg font-bold font-mono tabular-nums text-slate-900 mt-0.5">
              100 MCQs
            </div>
            <div className="text-xs text-slate-500 mt-0.5">4 Sections · Q1 to Q100</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Duration</div>
            <div className="text-lg font-bold font-mono tabular-nums text-slate-900 mt-0.5">
              120 Minutes
            </div>
            <div className="text-xs text-slate-500 mt-0.5">1.20 min average per Q</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Marking Scheme</div>
            <div className="text-lg font-bold font-mono tabular-nums text-slate-900 mt-0.5">
              +1 / −0.33
            </div>
            <div className="text-xs text-slate-500 mt-0.5">100 Max Marks · −1/3 wrong</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Difficulty Gradient</div>
            <div className="text-lg font-bold font-mono tabular-nums text-slate-900 mt-0.5">
              {ALL_QUESTIONS.filter((q) => q.difficulty === 'Easy').length} /{' '}
              {ALL_QUESTIONS.filter((q) => q.difficulty === 'Moderate').length} /{' '}
              {ALL_QUESTIONS.filter((q) => q.difficulty === 'Difficult').length}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">Easy / Moderate / Difficult</div>
          </div>
        </div>
      </section>

      {/* Filter & Controls Toolbar */}
      <section className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4 no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Section Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveSection('ALL')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeSection === 'ALL'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All 100 Qs
            </button>
            {SECTIONS.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSection(sec.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeSection === sec.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {sec.code}: {sec.shortTitle} ({sec.count})
              </button>
            ))}
          </div>

          {/* Search & Toggle Solutions */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by topic or Q#..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowAllSolutions((prev) => !prev)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {showAllSolutions ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                  Hide Solutions (Practice)
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-blue-700" />
                  Show All Solutions
                </>
              )}
            </button>
          </div>
        </div>

        {/* Secondary Filter Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Difficulty:</span>
              <div className="flex items-center gap-1">
                {(['ALL', 'Easy', 'Moderate', 'Difficult'] as const).map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficultyFilter(diff)}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      difficultyFilter === diff
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {diff === 'ALL' ? 'All' : diff}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Pattern:</span>
              <div className="flex items-center gap-1">
                {(
                  [
                    { key: 'ALL', text: 'All' },
                    { key: 'Previous-Year Pattern Question', text: 'Previous-Year Pattern' },
                    { key: 'Model Practice Question', text: 'Model Practice' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setLabelFilter(item.key)}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      labelFilter === item.key
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-slate-500 font-mono tabular-nums">
            Showing {filteredQuestions.length} of {ALL_QUESTIONS.length} questions
          </div>
        </div>
      </section>

      {/* Question List */}
      {filteredQuestions.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-2">
          <div className="text-base font-semibold text-slate-900">
            No questions match the selected filters
          </div>
          <p className="text-sm text-slate-500">
            Reset the section, difficulty, or search term to view all 100 questions.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveSection('ALL');
              setDifficultyFilter('ALL');
              setLabelFilter('ALL');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredQuestions.map((q, idx) => {
            const prevQ = idx > 0 ? filteredQuestions[idx - 1] : null;
            const showSectionBanner = !prevQ || prevQ.sectionId !== q.sectionId;
            const secMeta = SECTIONS.find((s) => s.id === q.sectionId)!;

            let contextBlock = null;
            if (q.contextId && !renderedContexts.has(q.contextId)) {
              renderedContexts.add(q.contextId);
              contextBlock = ALL_CONTEXTS[q.contextId];
            }

            const isSolutionVisible = showAllSolutions || Boolean(revealedIds[q.id]);
            const picked = selfPracticeAnswers[q.id];

            return (
              <div key={q.id} className="space-y-5">
                {showSectionBanner && (
                  <div className="pt-4 pb-2 border-b border-slate-300 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {secMeta.code}: {secMeta.title}
                      </h2>
                      <p className="text-xs text-slate-600 mt-1">{secMeta.syllabusSummary}</p>
                    </div>
                    <span className="text-xs font-mono tabular-nums text-slate-500 whitespace-nowrap shrink-0">
                      Q{secMeta.questionRange[0]}–Q{secMeta.questionRange[1]} · {secMeta.count} Marks
                    </span>
                  </div>
                )}

                {contextBlock && (
                  <div className="bg-slate-100/80 border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-base font-bold text-slate-900">
                        Directions ({contextBlock.rangeLabel}): {contextBlock.title}
                      </h3>
                      {contextBlock.theme && (
                        <span className="text-xs font-medium text-slate-500">
                          Theme: {contextBlock.theme}
                        </span>
                      )}
                    </div>

                    {contextBlock.introText && (
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {contextBlock.introText}
                      </p>
                    )}

                    {contextBlock.passageParagraphs && (
                      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 text-sm sm:text-[15px] text-slate-800 leading-relaxed">
                        {contextBlock.passageParagraphs.map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>
                    )}

                    {(contextBlock.table || contextBlock.chart) && (
                      <div
                        className={`grid gap-4 ${
                          contextBlock.table && contextBlock.chart
                            ? 'grid-cols-1 lg:grid-cols-2 items-start'
                            : 'grid-cols-1'
                        }`}
                      >
                        {contextBlock.table && <DataTable table={contextBlock.table} />}
                        {contextBlock.chart && <DataChart chart={contextBlock.chart} />}
                      </div>
                    )}
                  </div>
                )}

                <QuestionArticle
                  question={q}
                  picked={picked}
                  isSolutionVisible={isSolutionVisible}
                  onSelectOption={handleSelectOption}
                  onToggleReveal={toggleReveal}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface QuestionArticleProps {
  question: ExamQuestion;
  picked?: OptionKey;
  isSolutionVisible: boolean;
  onSelectOption: (id: number, opt: OptionKey) => void;
  onToggleReveal: (id: number) => void;
}

function QuestionArticle({
  question: q,
  picked,
  isSolutionVisible,
  onSelectOption,
  onToggleReveal,
}: QuestionArticleProps) {
  const diffColor =
    q.difficulty === 'Easy'
      ? 'text-emerald-700'
      : q.difficulty === 'Moderate'
      ? 'text-amber-700'
      : 'text-rose-700';

  return (
    <article className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4">
      {/* Metadata Header — strict zero-pill clean typography */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-slate-100 pb-3">
        <div className="flex flex-wrap items-baseline gap-x-2 text-sm">
          <span className="font-mono font-bold tabular-nums text-blue-800">
            Q{q.id}
          </span>
          <span className="text-slate-300" aria-hidden="true">
            –
          </span>
          <span className="font-semibold text-slate-900">{q.topic}</span>
          {q.subSection && (
            <>
              <span className="text-slate-300" aria-hidden="true">
                ·
              </span>
              <span className="text-xs text-slate-500">{q.subSection}</span>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500">
          <span className={`font-semibold ${diffColor}`}>
            Difficulty: {q.difficulty}
          </span>
          <span aria-hidden="true">·</span>
          <span>[{q.label}]</span>
        </div>
      </div>

      {/* Inline Table / Chart for standalone DI or Matrix questions */}
      {(q.inlineTable || q.inlineChart) && (
        <div
          className={`grid gap-4 ${
            q.inlineTable && q.inlineChart
              ? 'grid-cols-1 lg:grid-cols-2 items-start'
              : 'grid-cols-1'
          }`}
        >
          {q.inlineTable && <DataTable table={q.inlineTable} />}
          {q.inlineChart && <DataChart chart={q.inlineChart} />}
        </div>
      )}

      {/* Question Text */}
      <div className="space-y-2.5">
        <p className="text-[15px] sm:text-base font-medium text-slate-900 leading-relaxed">
          {q.question}
        </p>

        {q.statements && q.statements.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-1.5 text-sm text-slate-800">
            {q.statements.map((st, sIdx) => (
              <p key={sIdx} className="leading-relaxed">
                {st}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Interactive 4-Option Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {OPTION_KEYS.map((key) => {
          const isCorrect = key === q.correctOption;
          const isPicked = picked === key;
          let stateClasses =
            'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50';

          if (isSolutionVisible && isCorrect) {
            stateClasses = 'border-emerald-500 bg-emerald-50/70 text-slate-900';
          } else if (isSolutionVisible && isPicked && !isCorrect) {
            stateClasses = 'border-rose-400 bg-rose-50/70 text-slate-900';
          } else if (isPicked) {
            stateClasses = 'border-blue-600 bg-blue-50/70 text-slate-900';
          }

          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectOption(q.id, key)}
              className={`text-left px-3.5 py-2.5 rounded-lg border transition-colors flex items-start justify-between gap-3 cursor-pointer ${stateClasses}`}
            >
              <div className="flex items-start gap-2.5 text-sm">
                <span className="font-mono font-semibold text-slate-500 shrink-0">
                  {key}.
                </span>
                <span className="leading-snug">{q.options[key]}</span>
              </div>

              {isSolutionVisible && isCorrect && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                  Correct
                </span>
              )}
              {isSolutionVisible && isPicked && !isCorrect && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 shrink-0">
                  <XCircle className="w-4 h-4" />
                  Wrong
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Solution & Shortcut Panel */}
      {isSolutionVisible ? (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2.5 text-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="font-semibold text-emerald-800">
              Correct Answer: {q.correctOption}. {q.options[q.correctOption]}
            </div>
            <button
              type="button"
              onClick={() => onToggleReveal(q.id)}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 no-print cursor-pointer"
            >
              Hide Explanation
            </button>
          </div>
          <p className="text-slate-700 leading-relaxed">
            <span className="font-semibold text-slate-900">Explanation: </span>
            {q.explanation}
          </p>
          <p className="text-slate-700 leading-relaxed pt-2 border-t border-slate-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <span>
              <span className="font-semibold text-slate-900">Shortcut / Trick: </span>
              {q.shortcut}
            </span>
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between pt-1 no-print">
          <span className="text-xs text-slate-500">
            Select an option above to check your answer or reveal the worked solution.
          </span>
          <button
            type="button"
            onClick={() => onToggleReveal(q.id)}
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 cursor-pointer"
          >
            Reveal Answer & Shortcut
          </button>
        </div>
      )}
    </article>
  );
}
