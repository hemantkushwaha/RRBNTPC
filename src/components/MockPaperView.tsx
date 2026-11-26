import { useMemo, useState } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Eye,
  EyeOff,
  Loader2,
  RotateCcw,
  Search,
  Shuffle,
  Sparkles,
  XCircle,
} from 'lucide-react';
import {
  exportPaperToMarkdown,
  getLocalizedContext,
  getLocalizedQuestion,
} from '../data/mockPaper';
import {
  Difficulty,
  ExamQuestion,
  OptionKey,
  QuestionLabel,
  SECTIONS,
  SectionId,
  SharedContextBlock,
} from '../data/types';
import {
  Language,
  localizeDifficulty,
  localizeLabel,
  localizeTopic,
  SECTION_TEXT,
  UI_TEXT,
} from '../i18n/ui';
import { DataChart } from './DataChart';
import { DataTable } from './DataTable';

interface MockPaperViewProps {
  lang: Language;
  questions: ExamQuestion[];
  contexts: Record<string, SharedContextBlock>;
  paperSource: 'standard' | 'generated';
  isGenerating: boolean;
  generationProgress: string | null;
  generationError: string | null;
  onGenerateNewPaper: () => void;
  onRestoreStandard: () => void;
  onLaunchCbt: () => void;
}

const OPTION_KEYS: OptionKey[] = ['A', 'B', 'C', 'D'];

export function MockPaperView({
  lang,
  questions,
  contexts,
  paperSource,
  isGenerating,
  generationProgress,
  generationError,
  onGenerateNewPaper,
  onRestoreStandard,
  onLaunchCbt,
}: MockPaperViewProps) {
  const t = UI_TEXT[lang];
  const [activeSection, setActiveSection] = useState<'ALL' | SectionId>('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState<'ALL' | Difficulty>(
    'ALL'
  );
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
    return questions.filter((q) => {
      if (activeSection !== 'ALL' && q.sectionId !== activeSection) return false;
      if (difficultyFilter !== 'ALL' && q.difficulty !== difficultyFilter)
        return false;
      if (labelFilter !== 'ALL' && q.label !== labelFilter) return false;
      if (qLower) {
        const loc = getLocalizedQuestion(q, lang);
        const hay = `${q.id} q${q.id} ${q.topic} ${localizeTopic(q.topic, 'hi')} ${q.question} ${loc.question} ${loc.explanation}`.toLowerCase();
        if (!hay.includes(qLower)) return false;
      }
      return true;
    });
  }, [questions, activeSection, difficultyFilter, labelFilter, searchQuery, lang]);

  const handleCopyMarkdown = async () => {
    const md = exportPaperToMarkdown(questions, contexts, lang);
    try {
      await navigator.clipboard.writeText(md);
      setCopiedMarkdown(true);
      setTimeout(() => setCopiedMarkdown(false), 2400);
    } catch {
      handleDownloadMarkdown();
    }
  };

  const handleDownloadMarkdown = () => {
    const md = exportPaperToMarkdown(questions, contexts, lang);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RRB-Station-Master-CEN-08-2026-Mock-Paper-${lang}.md`;
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

  const renderedContexts = new Set<string>();

  return (
    <div className="space-y-8">
      {/* Paper Overview Header */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-2.5">
            <div className="text-xs font-medium text-blue-700 tracking-wide">
              {t.paperKicker}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {t.paperTitle}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t.paperSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 no-print">
            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copiedMarkdown ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  {t.copiedMd}
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  {t.copyMd}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              {t.downloadMd}
            </button>
            <button
              type="button"
              onClick={onLaunchCbt}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.takeCbt}
            </button>
          </div>
        </div>

        {/* Randomized Bilingual AI Generator Bar */}
        <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
          <div className="text-xs text-slate-600">
            <span className="font-semibold text-slate-800">
              {paperSource === 'standard'
                ? t.activePaperStandard
                : t.activePaperGenerated}
            </span>
            {generationProgress && (
              <span className="ml-2 text-blue-700 font-medium">
                · {generationProgress}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {paperSource === 'generated' && (
              <button
                type="button"
                onClick={onRestoreStandard}
                disabled={isGenerating}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {t.restoreStandardPaper}
              </button>
            )}
            <button
              type="button"
              onClick={onGenerateNewPaper}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-slate-100 border border-slate-300 rounded-lg hover:bg-slate-200/80 disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-700" />
                  {t.generatingPaper}
                </>
              ) : (
                <>
                  <Shuffle className="w-3.5 h-3.5 text-blue-700" />
                  {t.generateAiPaper}
                </>
              )}
            </button>
          </div>
        </div>

        {generationError && (
          <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2.5 text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{generationError}</span>
          </div>
        )}

        {/* 4-column Key Exam Parameters strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200">
          <div>
            <div className="text-xs text-slate-500">{t.statQuestions}</div>
            <div className="text-lg font-bold font-mono tabular-nums text-slate-900 mt-0.5">
              {questions.length} {lang === 'hi' ? 'प्रश्न' : 'MCQs'}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {t.statQuestionsSub}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500">{t.statDuration}</div>
            <div className="text-lg font-bold font-mono tabular-nums text-slate-900 mt-0.5">
              {t.statDurationVal}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {t.statDurationSub}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500">{t.statMarking}</div>
            <div className="text-lg font-bold font-mono tabular-nums text-slate-900 mt-0.5">
              {t.statMarkingVal}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {t.statMarkingSub}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500">{t.statDifficulty}</div>
            <div className="text-lg font-bold font-mono tabular-nums text-slate-900 mt-0.5">
              {questions.filter((q) => q.difficulty === 'Easy').length} /{' '}
              {questions.filter((q) => q.difficulty === 'Moderate').length} /{' '}
              {questions.filter((q) => q.difficulty === 'Difficult').length}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {t.statDifficultySub}
            </div>
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
              {t.all100Qs}
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
                {SECTION_TEXT[sec.id].code[lang]}:{' '}
                {SECTION_TEXT[sec.id].shortTitle[lang]} ({sec.count})
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
                placeholder={t.searchPlaceholder}
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
                  {t.hideSolutions}
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-blue-700" />
                  {t.showSolutions}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Secondary Filter Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">
                {t.difficultyLabel}
              </span>
              <div className="flex items-center gap-1">
                {(['ALL', 'Easy', 'Moderate', 'Difficult'] as const).map(
                  (diff) => (
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
                      {diff === 'ALL' ? t.all : localizeDifficulty(diff, lang)}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">
                {t.patternLabel}
              </span>
              <div className="flex items-center gap-1">
                {(
                  [
                    { key: 'ALL', text: t.all },
                    {
                      key: 'Previous-Year Pattern Question',
                      text: t.prevYearShort,
                    },
                    {
                      key: 'Model Practice Question',
                      text: t.modelPracticeShort,
                    },
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
            {t.showingCount(filteredQuestions.length, questions.length)}
          </div>
        </div>
      </section>

      {/* Question List */}
      {filteredQuestions.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-2">
          <div className="text-base font-semibold text-slate-900">
            {t.noMatchesTitle}
          </div>
          <p className="text-sm text-slate-500">{t.noMatchesDesc}</p>
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
            {t.resetFilters}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredQuestions.map((q, idx) => {
            const prevQ = idx > 0 ? filteredQuestions[idx - 1] : null;
            const showSectionBanner = !prevQ || prevQ.sectionId !== q.sectionId;
            const secMeta = SECTIONS.find((s) => s.id === q.sectionId)!;

            let rawContext: SharedContextBlock | null = null;
            if (q.contextId && !renderedContexts.has(q.contextId)) {
              renderedContexts.add(q.contextId);
              rawContext = contexts[q.contextId] ?? null;
            }
            const locContext = rawContext
              ? getLocalizedContext(rawContext, lang)
              : null;

            const isSolutionVisible =
              showAllSolutions || Boolean(revealedIds[q.id]);
            const picked = selfPracticeAnswers[q.id];

            return (
              <div key={q.id} className="space-y-5">
                {showSectionBanner && (
                  <div className="pt-4 pb-2 border-b border-slate-300 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {SECTION_TEXT[secMeta.id].code[lang]}:{' '}
                        {SECTION_TEXT[secMeta.id].title[lang]}
                      </h2>
                      <p className="text-xs text-slate-600 mt-1">
                        {SECTION_TEXT[secMeta.id].syllabus[lang]}
                      </p>
                    </div>
                    <span className="text-xs font-mono tabular-nums text-slate-500 whitespace-nowrap shrink-0">
                      Q{secMeta.questionRange[0]}–Q{secMeta.questionRange[1]} ·{' '}
                      {secMeta.count} {t.marks}
                    </span>
                  </div>
                )}

                {rawContext && locContext && (
                  <div className="bg-slate-100/80 border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-base font-bold text-slate-900">
                        {t.directions} ({rawContext.rangeLabel}):{' '}
                        {locContext.title}
                      </h3>
                      {locContext.theme && (
                        <span className="text-xs font-medium text-slate-500">
                          {t.theme}: {locContext.theme}
                        </span>
                      )}
                    </div>

                    {locContext.introText && (
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {locContext.introText}
                      </p>
                    )}

                    {locContext.passageParagraphs && (
                      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 text-sm sm:text-[15px] text-slate-800 leading-relaxed">
                        {locContext.passageParagraphs.map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>
                    )}

                    {(locContext.table || locContext.chart) && (
                      <div
                        className={`grid gap-4 ${
                          locContext.table && locContext.chart
                            ? 'grid-cols-1 lg:grid-cols-2 items-start'
                            : 'grid-cols-1'
                        }`}
                      >
                        {locContext.table && (
                          <DataTable table={locContext.table} lang={lang} />
                        )}
                        {locContext.chart && (
                          <DataChart chart={locContext.chart} lang={lang} />
                        )}
                      </div>
                    )}
                  </div>
                )}

                <QuestionArticle
                  lang={lang}
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
  lang: Language;
  question: ExamQuestion;
  picked?: OptionKey;
  isSolutionVisible: boolean;
  onSelectOption: (id: number, opt: OptionKey) => void;
  onToggleReveal: (id: number) => void;
}

function QuestionArticle({
  lang,
  question: q,
  picked,
  isSolutionVisible,
  onSelectOption,
  onToggleReveal,
}: QuestionArticleProps) {
  const t = UI_TEXT[lang];
  const loc = getLocalizedQuestion(q, lang);

  const diffColor =
    q.difficulty === 'Easy'
      ? 'text-emerald-700'
      : q.difficulty === 'Moderate'
      ? 'text-amber-700'
      : 'text-rose-700';

  const subSectionText =
    q.subSection === 'Logical Reasoning'
      ? lang === 'hi'
        ? 'तार्किक तर्कशक्ति'
        : 'Logical Reasoning'
      : q.subSection === 'Reading Comprehension'
      ? lang === 'hi'
        ? 'अपठित गद्यांश'
        : 'Reading Comprehension'
      : null;

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
          <span className="font-semibold text-slate-900">
            {localizeTopic(q.topic, lang)}
          </span>
          {subSectionText && (
            <>
              <span className="text-slate-300" aria-hidden="true">
                ·
              </span>
              <span className="text-xs text-slate-500">{subSectionText}</span>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500">
          <span className={`font-semibold ${diffColor}`}>
            {t.difficultyLabel} {localizeDifficulty(q.difficulty, lang)}
          </span>
          <span aria-hidden="true">·</span>
          <span>[{localizeLabel(q.label, lang)}]</span>
        </div>
      </div>

      {/* Inline Table / Chart for standalone DI or Matrix questions */}
      {(loc.inlineTable || loc.inlineChart) && (
        <div
          className={`grid gap-4 ${
            loc.inlineTable && loc.inlineChart
              ? 'grid-cols-1 lg:grid-cols-2 items-start'
              : 'grid-cols-1'
          }`}
        >
          {loc.inlineTable && (
            <DataTable table={loc.inlineTable} lang={lang} />
          )}
          {loc.inlineChart && (
            <DataChart chart={loc.inlineChart} lang={lang} />
          )}
        </div>
      )}

      {/* Question Text */}
      <div className="space-y-2.5">
        <p className="text-[15px] sm:text-base font-medium text-slate-900 leading-relaxed">
          {loc.question}
        </p>

        {loc.statements && loc.statements.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-1.5 text-sm text-slate-800">
            {loc.statements.map((st, sIdx) => (
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
                <span className="leading-snug">{loc.options[key]}</span>
              </div>

              {isSolutionVisible && isCorrect && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                  {t.correctBadge}
                </span>
              )}
              {isSolutionVisible && isPicked && !isCorrect && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 shrink-0">
                  <XCircle className="w-4 h-4" />
                  {t.wrongBadge}
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
              {t.correctAnswer}: {q.correctOption}.{' '}
              {loc.options[q.correctOption]}
            </div>
            <button
              type="button"
              onClick={() => onToggleReveal(q.id)}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 no-print cursor-pointer"
            >
              {t.hideExplanation}
            </button>
          </div>
          <p className="text-slate-700 leading-relaxed">
            <span className="font-semibold text-slate-900">
              {t.explanation}:{' '}
            </span>
            {loc.explanation}
          </p>
          <p className="text-slate-700 leading-relaxed pt-2 border-t border-slate-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <span>
              <span className="font-semibold text-slate-900">
                {t.shortcut}:{' '}
              </span>
              {loc.shortcut}
            </span>
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between pt-1 no-print">
          <span className="text-xs text-slate-500">{t.revealPrompt}</span>
          <button
            type="button"
            onClick={() => onToggleReveal(q.id)}
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 cursor-pointer"
          >
            {t.revealBtn}
          </button>
        </div>
      )}
    </article>
  );
}
