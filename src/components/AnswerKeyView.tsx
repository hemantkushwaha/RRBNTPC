import { useMemo, useState } from 'react';
import { getLocalizedQuestion, SCORING_EXAMPLES } from '../data/mockPaper';
import { Difficulty, ExamQuestion, SECTIONS, SectionId } from '../data/types';
import {
  Language,
  localizeDifficulty,
  localizeLabel,
  localizeTopic,
  SECTION_TEXT,
  UI_TEXT,
} from '../i18n/ui';

interface AnswerKeyViewProps {
  lang: Language;
  questions: ExamQuestion[];
}

export function AnswerKeyView({ lang, questions }: AnswerKeyViewProps) {
  const t = UI_TEXT[lang];
  const [sectionFilter, setSectionFilter] = useState<'ALL' | SectionId>('ALL');
  const [diffFilter, setDiffFilter] = useState<'ALL' | Difficulty>('ALL');

  const [simCorrect, setSimCorrect] = useState(76);
  const [simWrong, setSimWrong] = useState(9);

  const maxWrong = 100 - simCorrect;
  const clampedWrong = Math.min(simWrong, maxWrong);
  const simAttempted = simCorrect + clampedWrong;
  const simSkipped = 100 - simAttempted;
  const simPenalty = clampedWrong / 3;
  const simNet = simCorrect - simPenalty;
  const simAccuracy = simAttempted > 0 ? (simCorrect / simAttempted) * 100 : 0;

  const filteredKey = useMemo(() => {
    return questions.filter((q) => {
      if (sectionFilter !== 'ALL' && q.sectionId !== sectionFilter) return false;
      if (diffFilter !== 'ALL' && q.difficulty !== diffFilter) return false;
      return true;
    });
  }, [questions, sectionFilter, diffFilter]);

  return (
    <div className="space-y-8">
      {/* Section 1: Interactive −1/3 Score Calculator & Strategy */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-blue-700">{t.akKicker}</div>
          <h1 className="text-2xl font-bold text-slate-900">{t.akTitle}</h1>
          <p className="text-sm text-slate-600 max-w-3xl">{t.akSubtitle}</p>
        </div>

        {/* Interactive Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-200 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label
                  htmlFor="sim-correct"
                  className="font-medium text-slate-800"
                >
                  {t.simCorrectLabel}
                </label>
                <span className="font-mono font-bold tabular-nums text-emerald-700">
                  {simCorrect} {t.questionsUnit}
                </span>
              </div>
              <input
                id="sim-correct"
                type="range"
                min={0}
                max={100}
                value={simCorrect}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSimCorrect(val);
                  if (simWrong > 100 - val) setSimWrong(100 - val);
                }}
                className="w-full accent-blue-700 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label
                  htmlFor="sim-wrong"
                  className="font-medium text-slate-800"
                >
                  {t.simWrongLabel}
                </label>
                <span className="font-mono font-bold tabular-nums text-rose-700">
                  {clampedWrong} {t.questionsUnit} ({t.maxLabel} {maxWrong})
                </span>
              </div>
              <input
                id="sim-wrong"
                type="range"
                min={0}
                max={maxWrong}
                value={clampedWrong}
                onChange={(e) => setSimWrong(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-500">{t.projectedNetScore}</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-blue-800 mt-0.5">
                {simNet.toFixed(2)}
              </div>
              <div className="text-xs text-slate-500">{t.outOf100}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">{t.negativePenalty}</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-rose-700 mt-0.5">
                −{simPenalty.toFixed(2)}
              </div>
              <div className="text-xs text-slate-500">{t.marksDeducted}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">{t.accuracyRate}</div>
              <div className="text-lg font-bold font-mono tabular-nums text-slate-900 mt-0.5">
                {simAccuracy.toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500">{t.attemptedSkipped}</div>
              <div className="text-lg font-bold font-mono tabular-nums text-slate-900 mt-0.5">
                {simAttempted} / {simSkipped}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Worked Negative Marking Examples + 120-Min Strategy */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="text-base font-bold text-slate-900">
              {t.workedScenariosTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.workedScenariosSub}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700">
                  <th className="px-4 py-2.5">
                    {lang === 'hi' ? 'प्रयास प्रोफ़ाइल' : 'Attempt Profile'}
                  </th>
                  <th className="px-3 py-2.5 text-right">
                    {lang === 'hi' ? 'सही / गलत' : 'C / W'}
                  </th>
                  <th className="px-3 py-2.5 text-right">
                    {lang === 'hi' ? 'कटौती' : 'Penalty'}
                  </th>
                  <th className="px-4 py-2.5 text-right">
                    {lang === 'hi' ? 'अंतिम स्कोर' : 'Final Score'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {SCORING_EXAMPLES.map((ex) => (
                  <tr key={ex.profile} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">
                        {lang === 'hi' ? ex.profileHi : ex.profile}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {lang === 'hi' ? ex.verdictHi : ex.verdict}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-right font-mono tabular-nums whitespace-nowrap text-slate-700">
                      {ex.correct} / {ex.wrong}
                    </td>
                    <td className="px-3 py-3 text-right font-mono tabular-nums whitespace-nowrap text-rose-700 font-medium">
                      {ex.negativeDeduction}
                    </td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums whitespace-nowrap font-bold text-slate-900">
                      {ex.finalScore}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 120-Minute Section-Wise Time Management */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="text-base font-bold text-slate-900">
              {t.strategyTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">{t.strategySub}</p>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700">
                  <th className="px-4 py-2.5">{t.colSection}</th>
                  <th className="px-3 py-2.5 text-right">
                    {lang === 'hi' ? 'प्रश्न' : 'Qs'}
                  </th>
                  <th className="px-3 py-2.5 text-right">
                    {lang === 'hi' ? 'समय' : 'Time'}
                  </th>
                  <th className="px-3 py-2.5 text-right">
                    {lang === 'hi' ? 'लक्ष्य प्रयास' : 'Target Attempts'}
                  </th>
                  <th className="px-4 py-2.5 text-right">
                    {lang === 'hi' ? 'लक्ष्य स्कोर' : 'Target Score'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {SECTIONS.map((sec) => (
                  <tr key={sec.id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {SECTION_TEXT[sec.id].code[lang]}:{' '}
                      {SECTION_TEXT[sec.id].shortTitle[lang]}
                    </td>
                    <td className="px-3 py-3 text-right font-mono tabular-nums text-slate-700">
                      {sec.count}
                    </td>
                    <td className="px-3 py-3 text-right font-mono tabular-nums font-semibold text-blue-800">
                      {sec.recommendedMinutes} {lang === 'hi' ? 'मि.' : 'min'}
                    </td>
                    <td className="px-3 py-3 text-right font-mono tabular-nums text-slate-700">
                      {sec.targetAttempts}
                    </td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums font-semibold text-emerald-700">
                      {sec.targetScore}
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-bold text-slate-900">
                  <td className="px-4 py-3">
                    {lang === 'hi' ? 'कुल (पूर्ण मॉक पेपर)' : 'Total (Full Mock Paper)'}
                  </td>
                  <td className="px-3 py-3 text-right font-mono tabular-nums">
                    100
                  </td>
                  <td className="px-3 py-3 text-right font-mono tabular-nums text-blue-800">
                    120 {lang === 'hi' ? 'मि.' : 'min'}
                  </td>
                  <td className="px-3 py-3 text-right font-mono tabular-nums">
                    84–90
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums text-emerald-700">
                    77.5 – 85.5
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 leading-relaxed">
            {lang === 'hi' ? (
              <>
                अनुशंसित क्रम: पहले <strong className="text-slate-900">खंड 3 (मानसिक तर्कशक्ति, 20 मि.)</strong> से तेज अंक सुरक्षित करें, फिर <strong className="text-slate-900">खंड 1A (35 मि.)</strong>, उसके बाद <strong className="text-slate-900">खंड 1B डेटा विश्लेषण (40 मि.)</strong> और अंत में <strong className="text-slate-900">खंड 2 तार्किक क्षमता व गद्यांश (25 मि.)</strong> हल करें।
              </>
            ) : (
              <>
                Recommended attempt order: Start with{' '}
                <strong className="text-slate-900">
                  Section 3 (Mental Reasoning, 20 min)
                </strong>{' '}
                to bank quick marks, move to{' '}
                <strong className="text-slate-900">Section 1A (35 min)</strong>,
                tackle{' '}
                <strong className="text-slate-900">
                  Section 1B DI (40 min)
                </strong>{' '}
                with fresh focus, and finish with{' '}
                <strong className="text-slate-900">
                  Section 2 Logical & RC (25 min)
                </strong>
                .
              </>
            )}
          </div>
        </div>
      </section>

      {/* Section 3: Complete 1–100 Answer Key Table */}
      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {t.masterKeyTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">{t.masterKeySub}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label="Filter Answer Key by Section"
              value={sectionFilter}
              onChange={(e) =>
                setSectionFilter(e.target.value as 'ALL' | SectionId)
              }
              className="px-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
            >
              <option value="ALL">
                {t.allSections} ({questions.length})
              </option>
              {SECTIONS.map((s) => (
                <option key={s.id} value={s.id}>
                  {SECTION_TEXT[s.id].code[lang]}:{' '}
                  {SECTION_TEXT[s.id].shortTitle[lang]}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter Answer Key by Difficulty"
              value={diffFilter}
              onChange={(e) =>
                setDiffFilter(e.target.value as 'ALL' | Difficulty)
              }
              className="px-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
            >
              <option value="ALL">{t.allDifficulties}</option>
              <option value="Easy">{localizeDifficulty('Easy', lang)}</option>
              <option value="Moderate">
                {localizeDifficulty('Moderate', lang)}
              </option>
              <option value="Difficult">
                {localizeDifficulty('Difficult', lang)}
              </option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700">
                <th className="px-4 py-2.5 w-20">{t.colQNo}</th>
                <th className="px-4 py-2.5 w-28">{t.colSection}</th>
                <th className="px-4 py-2.5">{t.colTopic}</th>
                <th className="px-4 py-2.5 w-28">{t.colDifficulty}</th>
                <th className="px-4 py-2.5 w-52">{t.colClassification}</th>
                <th className="px-4 py-2.5 text-right w-24">{t.colAnswer}</th>
                <th className="px-4 py-2.5">{t.colCorrectValue}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredKey.map((q) => {
                const loc = getLocalizedQuestion(q, lang);
                const diffClass =
                  q.difficulty === 'Easy'
                    ? 'text-emerald-700'
                    : q.difficulty === 'Moderate'
                    ? 'text-amber-700'
                    : 'text-rose-700';
                return (
                  <tr key={q.id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-2.5 font-mono font-semibold tabular-nums text-blue-800">
                      Q{q.id}
                    </td>
                    <td className="px-4 py-2.5 text-xs font-mono text-slate-600">
                      {SECTION_TEXT[q.sectionId].code[lang]}
                    </td>
                    <td className="px-4 py-2.5 font-medium text-slate-900">
                      {localizeTopic(q.topic, lang)}
                    </td>
                    <td
                      className={`px-4 py-2.5 text-xs font-semibold ${diffClass}`}
                    >
                      {localizeDifficulty(q.difficulty, lang)}
                    </td>
                    <td className="px-4 py-2.5 text-xs text-slate-500">
                      {localizeLabel(q.label, lang)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono font-bold text-slate-900">
                      {q.correctOption}
                    </td>
                    <td className="px-4 py-2.5 text-xs text-slate-700 max-w-xs truncate">
                      {loc.options[q.correctOption]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
