import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Pause,
  Play,
  RotateCcw,
  Send,
  XCircle,
} from 'lucide-react';
import { getLocalizedContext, getLocalizedQuestion } from '../data/mockPaper';
import {
  ExamQuestion,
  OptionKey,
  SECTIONS,
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
import { LanguageToggle } from './LanguageToggle';

const TOTAL_SECONDS = 120 * 60;
const STORAGE_KEY = 'rrb_sm_cen08_2026_cbt_state_v1';
const OPTION_KEYS: OptionKey[] = ['A', 'B', 'C', 'D'];

interface CbtSimulatorProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  questions: ExamQuestion[];
  contexts: Record<string, SharedContextBlock>;
}

interface SavedCbtState {
  answers: Record<number, OptionKey>;
  marked: Record<number, boolean>;
  visited: Record<number, boolean>;
  secondsLeft: number;
  currentIdx: number;
  submitted: boolean;
}

function loadSavedState(): SavedCbtState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedCbtState;
  } catch {
    return null;
  }
}

function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, totalSeconds);
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function CbtSimulator({
  lang,
  onChangeLang,
  questions,
  contexts,
}: CbtSimulatorProps) {
  const t = UI_TEXT[lang];
  const saved = useMemo(() => loadSavedState(), []);

  const [answers, setAnswers] = useState<Record<number, OptionKey>>(
    saved?.answers ?? {}
  );
  const [marked, setMarked] = useState<Record<number, boolean>>(
    saved?.marked ?? {}
  );
  const [visited, setVisited] = useState<Record<number, boolean>>(
    saved?.visited ?? { 1: true }
  );
  const [secondsLeft, setSecondsLeft] = useState<number>(
    saved?.secondsLeft ?? TOTAL_SECONDS
  );
  const [currentIdx, setCurrentIdx] = useState<number>(
    Math.min(saved?.currentIdx ?? 0, Math.max(0, questions.length - 1))
  );
  const [submitted, setSubmitted] = useState<boolean>(
    saved?.submitted ?? false
  );
  const [timerRunning, setTimerRunning] = useState<boolean>(
    !(saved?.submitted ?? false)
  );
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<
    'ALL' | 'WRONG' | 'UNATTEMPTED'
  >('ALL');

  useEffect(() => {
    try {
      const payload: SavedCbtState = {
        answers,
        marked,
        visited,
        secondsLeft,
        currentIdx,
        submitted,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage quota errors
    }
  }, [answers, marked, visited, secondsLeft, currentIdx, submitted]);

  useEffect(() => {
    if (!timerRunning || submitted) return;
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setSubmitted(true);
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning, submitted]);

  const safeIdx = Math.min(currentIdx, Math.max(0, questions.length - 1));
  const currentQuestion = questions[safeIdx];
  const localizedQ = getLocalizedQuestion(currentQuestion, lang);
  const rawContext = currentQuestion.contextId
    ? contexts[currentQuestion.contextId] ?? null
    : null;
  const currentContext = rawContext
    ? getLocalizedContext(rawContext, lang)
    : null;

  const goToQuestion = (index: number) => {
    const clamped = Math.max(0, Math.min(questions.length - 1, index));
    setCurrentIdx(clamped);
    const qId = questions[clamped].id;
    setVisited((prev) => ({ ...prev, [qId]: true }));
  };

  const handleChooseOption = (opt: OptionKey) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: opt }));
  };

  const handleClearResponse = () => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
  };

  const handleToggleMark = () => {
    setMarked((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  const handleResetExam = () => {
    setAnswers({});
    setMarked({});
    setVisited({ 1: true });
    setSecondsLeft(TOTAL_SECONDS);
    setCurrentIdx(0);
    setSubmitted(false);
    setTimerRunning(true);
    setShowSubmitConfirm(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const stats = useMemo(() => {
    let answeredCount = 0;
    let markedCount = 0;
    let correct = 0;
    let wrong = 0;

    for (const q of questions) {
      const ans = answers[q.id];
      if (marked[q.id]) markedCount++;
      if (ans) {
        answeredCount++;
        if (ans === q.correctOption) correct++;
        else wrong++;
      }
    }
    const unattempted = questions.length - answeredCount;
    const penalty = wrong / 3;
    const netScore = correct - penalty;
    const accuracy = answeredCount > 0 ? (correct / answeredCount) * 100 : 0;

    const sectionBreakdown = SECTIONS.map((sec) => {
      const qs = questions.filter((q) => q.sectionId === sec.id);
      let sCorrect = 0;
      let sWrong = 0;
      for (const q of qs) {
        const a = answers[q.id];
        if (a) {
          if (a === q.correctOption) sCorrect++;
          else sWrong++;
        }
      }
      const sAttempted = sCorrect + sWrong;
      const sNet = sCorrect - sWrong / 3;
      return {
        ...sec,
        actualCount: qs.length,
        correct: sCorrect,
        wrong: sWrong,
        unattempted: qs.length - sAttempted,
        attempted: sAttempted,
        netScore: sNet,
        accuracy: sAttempted > 0 ? (sCorrect / sAttempted) * 100 : 0,
      };
    });

    return {
      answeredCount,
      markedCount,
      correct,
      wrong,
      unattempted,
      penalty,
      netScore,
      accuracy,
      sectionBreakdown,
    };
  }, [answers, marked, questions]);

  if (submitted) {
    const timeUsed = TOTAL_SECONDS - secondsLeft;
    const reviewQuestions = questions.filter((q) => {
      const a = answers[q.id];
      if (reviewFilter === 'WRONG') return Boolean(a) && a !== q.correctOption;
      if (reviewFilter === 'UNATTEMPTED') return !a;
      return true;
    });

    return (
      <div className="space-y-8">
        {/* Scorecard Header */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-blue-700">
                {t.scorecardKicker}
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mt-1">
                {t.scorecardTitle}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <LanguageToggle lang={lang} onChange={onChangeLang} compact />
              <button
                type="button"
                onClick={handleResetExam}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                {t.retakeCbt}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t border-slate-200">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="text-xs text-slate-500">{t.netCbtScore}</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-blue-800 mt-1">
                {stats.netScore.toFixed(2)}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">{t.outOf100}</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="text-xs text-slate-500">{t.correctPlus}</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-emerald-700 mt-1">
                {stats.correct}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                +{stats.correct.toFixed(2)} {t.marksGainLabel}
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="text-xs text-slate-500">{t.wrongMinus}</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-rose-700 mt-1">
                {stats.wrong}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                −{stats.penalty.toFixed(2)} {t.penaltyLabel}
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="text-xs text-slate-500">{t.accuracy}</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                {stats.accuracy.toFixed(1)}%
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {t.attemptedOf100(stats.answeredCount)}
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="text-xs text-slate-500">{t.timeTaken}</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                {formatClock(timeUsed)}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">{t.ofLimit}</div>
            </div>
          </div>

          {/* Section Breakdown Table */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700">
                    <th className="px-4 py-3">{t.colSection}</th>
                    <th className="px-4 py-3 text-right">{t.colAttempted}</th>
                    <th className="px-4 py-3 text-right">{t.colCorrect}</th>
                    <th className="px-4 py-3 text-right">{t.colWrong}</th>
                    <th className="px-4 py-3 text-right">{t.colAccuracy}</th>
                    <th className="px-4 py-3 text-right">{t.colNetScore}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {stats.sectionBreakdown.map((sb) => (
                    <tr key={sb.id} className="hover:bg-slate-50/70">
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {SECTION_TEXT[sb.id].code[lang]}:{' '}
                        {SECTION_TEXT[sb.id].title[lang]}
                      </td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-slate-700">
                        {sb.attempted} / {sb.actualCount}
                      </td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-emerald-700 font-medium">
                        {sb.correct}
                      </td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-rose-700 font-medium">
                        {sb.wrong}
                      </td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-slate-700">
                        {sb.accuracy.toFixed(1)}%
                      </td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums font-bold text-slate-900">
                        {sb.netScore.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Detailed Response Review */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-slate-900">
              {t.responseReviewTitle}
            </h2>
            <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
              {(
                [
                  { id: 'ALL', label: `${t.filterAll} (${questions.length})` },
                  { id: 'WRONG', label: `${t.filterIncorrect} (${stats.wrong})` },
                  {
                    id: 'UNATTEMPTED',
                    label: `${t.filterSkipped} (${stats.unattempted})`,
                  },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setReviewFilter(tab.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    reviewFilter === tab.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {reviewQuestions.map((q) => {
              const userAns = answers[q.id];
              const isCorrect = userAns === q.correctOption;
              const loc = getLocalizedQuestion(q, lang);
              return (
                <div
                  key={q.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div className="text-sm font-semibold text-slate-900">
                      <span className="font-mono text-blue-800 mr-2">
                        Q{q.id}
                      </span>
                      {localizeTopic(q.topic, lang)}
                      <span className="text-xs font-normal text-slate-500 ml-2">
                        · {localizeDifficulty(q.difficulty, lang)}
                      </span>
                    </div>
                    <div className="text-xs font-semibold inline-flex items-center gap-1.5">
                      {!userAns ? (
                        <span className="text-slate-500">
                          {t.unattemptedTag}
                        </span>
                      ) : isCorrect ? (
                        <span className="text-emerald-700 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          {t.correctTag}
                        </span>
                      ) : (
                        <span className="text-rose-700 inline-flex items-center gap-1">
                          <XCircle className="w-4 h-4" />
                          {t.wrongTag(userAns)}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-800 leading-relaxed">
                    {loc.question}
                  </p>
                  <div className="text-xs text-emerald-800 font-semibold">
                    {t.correctAnswer}: {q.correctOption}.{' '}
                    {loc.options[q.correctOption]}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <span className="font-semibold text-slate-800">
                      {t.explanation}:{' '}
                    </span>
                    {loc.explanation}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <span className="font-semibold text-slate-800">
                      {t.shortcut}:{' '}
                    </span>
                    {loc.shortcut}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* CBT Exam Screen Header with Built-In English / हिंदी Language Toggle */}
      <div className="bg-white border border-slate-200 rounded-xl px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Section Quick-Jump Bar */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
          {SECTIONS.map((sec) => {
            const isCurrentSec = currentQuestion.sectionId === sec.id;
            const firstIdx = questions.findIndex(
              (q) => q.sectionId === sec.id
            );
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => firstIdx >= 0 && goToQuestion(firstIdx)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isCurrentSec
                    ? 'bg-blue-700 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {SECTION_TEXT[sec.id].code[lang]}:{' '}
                {SECTION_TEXT[sec.id].shortTitle[lang]}
              </button>
            );
          })}
        </div>

        {/* Live Bilingual Toggle, Timer & Submit */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <LanguageToggle lang={lang} onChange={onChangeLang} compact />

          <div
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
            title={t.timeLeft}
          >
            <Clock
              className={`w-4 h-4 ${
                secondsLeft < 600 ? 'text-rose-600' : 'text-blue-700'
              }`}
            />
            <span
              className={`font-mono font-bold tabular-nums text-sm ${
                secondsLeft < 600 ? 'text-rose-700' : 'text-slate-900'
              }`}
            >
              {formatClock(secondsLeft)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setTimerRunning((r) => !r)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {timerRunning ? (
              <>
                <Pause className="w-3.5 h-3.5" /> {t.pause}
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> {t.resume}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowSubmitConfirm(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            {t.submitTest}
          </button>
        </div>
      </div>

      {/* Two-Zone CBT Examination Stage (70% Question Stage / 30% Question Palette) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Active Question Workspace */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-5 sm:p-7 space-y-6">
          {/* Question Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold font-mono tabular-nums text-blue-800">
                {t.questionOf(currentQuestion.id, questions.length)}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-sm font-medium text-slate-700">
                {localizeTopic(currentQuestion.topic, lang)}
              </span>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span>{t.marksMeta}</span>
              <span>·</span>
              <span>{localizeDifficulty(currentQuestion.difficulty, lang)}</span>
              <span>·</span>
              <span>{localizeLabel(currentQuestion.label, lang)}</span>
            </div>
          </div>

          {/* Shared Context (DI table/chart or RC passage) */}
          {rawContext && currentContext && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 sm:p-5 space-y-4">
              <div className="text-xs font-semibold text-slate-800">
                {t.directions} ({rawContext.rangeLabel}): {currentContext.title}
              </div>
              {currentContext.introText && (
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {currentContext.introText}
                </p>
              )}
              {currentContext.passageParagraphs && (
                <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-2.5 text-sm text-slate-800 leading-relaxed max-h-72 overflow-y-auto">
                  {currentContext.passageParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}
              {currentContext.table && (
                <DataTable table={currentContext.table} lang={lang} compact />
              )}
              {currentContext.chart && (
                <DataChart chart={currentContext.chart} lang={lang} />
              )}
            </div>
          )}

          {/* Inline DI Table / Chart */}
          {localizedQ.inlineTable && (
            <DataTable table={localizedQ.inlineTable} lang={lang} compact />
          )}
          {localizedQ.inlineChart && (
            <DataChart chart={localizedQ.inlineChart} lang={lang} />
          )}

          {/* Question Prompt */}
          <div className="space-y-3">
            <p className="text-base font-medium text-slate-900 leading-relaxed">
              {localizedQ.question}
            </p>
            {localizedQ.statements && localizedQ.statements.length > 0 && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1.5 text-sm text-slate-800">
                {localizedQ.statements.map((st, idx) => (
                  <p key={idx}>{st}</p>
                ))}
              </div>
            )}
          </div>

          {/* 4 Answer Radio Options */}
          <div className="space-y-2.5">
            {OPTION_KEYS.map((key) => {
              const selected = answers[currentQuestion.id] === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleChooseOption(key)}
                  className={`w-full text-left px-4 py-3.5 rounded-lg border transition-colors flex items-center gap-3 cursor-pointer ${
                    selected
                      ? 'border-blue-700 bg-blue-50/70 text-slate-900 font-medium'
                      : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                      selected
                        ? 'border-blue-700 bg-blue-700 text-white'
                        : 'border-slate-300 text-slate-600'
                    }`}
                  >
                    {key}
                  </span>
                  <span className="text-sm sm:text-[15px] leading-snug">
                    {localizedQ.options[key]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleToggleMark}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  marked[currentQuestion.id]
                    ? 'border-amber-500 bg-amber-50 text-amber-800'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                {marked[currentQuestion.id]
                  ? t.markedForReview
                  : t.markForReview}
              </button>
              <button
                type="button"
                onClick={handleClearResponse}
                disabled={!answers[currentQuestion.id]}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shrink-0 cursor-pointer"
              >
                {t.clearResponse}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToQuestion(safeIdx - 1)}
                disabled={safeIdx === 0}
                className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                {t.previous}
              </button>
              <button
                type="button"
                onClick={() =>
                  safeIdx < questions.length - 1
                    ? goToQuestion(safeIdx + 1)
                    : setShowSubmitConfirm(true)
                }
                className="inline-flex items-center gap-1 px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 whitespace-nowrap shrink-0 cursor-pointer"
              >
                {safeIdx < questions.length - 1 ? (
                  <>
                    {t.saveAndNext}
                    <ChevronRight className="w-4 h-4" />
                  </>
                ) : (
                  t.finishAndReview
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Zone: 1–100 Question Palette & Live Progress */}
        <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-sm font-bold text-slate-900">
              {t.questionPalette}
            </h2>
            <span className="text-xs font-mono tabular-nums text-slate-500">
              {t.answeredOf(stats.answeredCount, questions.length)}
            </span>
          </div>

          {/* Legend with explicit labels (no hue-only signaling) */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-emerald-600 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                A
              </span>
              <span>
                {t.legendAnswered} ({stats.answeredCount})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-amber-500 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                R
              </span>
              <span>
                {t.legendReview} ({stats.markedCount})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-slate-100 border border-slate-300 text-slate-600 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                N
              </span>
              <span>
                {t.legendNotAnswered} ({stats.unattempted})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md border-2 border-blue-700 bg-blue-50 text-blue-800 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                C
              </span>
              <span>
                {t.legendCurrent} (Q{currentQuestion.id})
              </span>
            </div>
          </div>

          {/* 100-button Compact Grid */}
          <div className="grid grid-cols-10 gap-1.5 max-h-[380px] overflow-y-auto pr-1">
            {questions.map((q, idx) => {
              const isCurrent = idx === safeIdx;
              const isAnswered = Boolean(answers[q.id]);
              const isMarked = Boolean(marked[q.id]);
              const isVisited = Boolean(visited[q.id]);

              let btnClass =
                'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400';
              if (isMarked) {
                btnClass = 'bg-amber-500 text-white border-amber-600';
              } else if (isAnswered) {
                btnClass = 'bg-emerald-600 text-white border-emerald-700';
              } else if (isVisited) {
                btnClass = 'bg-slate-200/80 text-slate-800 border-slate-300';
              }

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => goToQuestion(idx)}
                  aria-label={`Question ${q.id}`}
                  className={`h-8 text-xs font-mono tabular-nums font-semibold rounded-md border transition-colors cursor-pointer ${btnClass} ${
                    isCurrent ? 'ring-2 ring-blue-700 ring-offset-1' : ''
                  }`}
                >
                  {q.id}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={handleResetExam}
              className="text-xs font-medium text-slate-500 hover:text-rose-700 transition-colors cursor-pointer"
            >
              {t.resetAttempt}
            </button>
            <button
              type="button"
              onClick={() => setShowSubmitConfirm(true)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              {t.submitExamination}
            </button>
          </div>
        </aside>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 space-y-5 shadow-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  {t.submitModalTitle}
                </h3>
                <p className="text-sm text-slate-600">{t.submitModalDesc}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-center">
              <div>
                <div className="text-xs text-slate-500">{t.legendAnswered}</div>
                <div className="text-lg font-bold font-mono tabular-nums text-emerald-700">
                  {stats.answeredCount}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">{t.skipped}</div>
                <div className="text-lg font-bold font-mono tabular-nums text-slate-800">
                  {stats.unattempted}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">{t.forReview}</div>
                <div className="text-lg font-bold font-mono tabular-nums text-amber-700">
                  {stats.markedCount}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                {t.continueTest}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(true);
                  setTimerRunning(false);
                  setShowSubmitConfirm(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 cursor-pointer"
              >
                {t.confirmSubmit}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
