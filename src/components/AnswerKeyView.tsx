import { useMemo, useState } from 'react';
import { ALL_QUESTIONS, SCORING_EXAMPLES } from '../data/mockPaper';
import { Difficulty, SECTIONS, SectionId } from '../data/types';

export function AnswerKeyView() {
  const [sectionFilter, setSectionFilter] = useState<'ALL' | SectionId>('ALL');
  const [diffFilter, setDiffFilter] = useState<'ALL' | Difficulty>('ALL');

  // Interactive −1/3 Negative Marking Simulator sliders
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
    return ALL_QUESTIONS.filter((q) => {
      if (sectionFilter !== 'ALL' && q.sectionId !== sectionFilter) return false;
      if (diffFilter !== 'ALL' && q.difficulty !== diffFilter) return false;
      return true;
    });
  }, [sectionFilter, diffFilter]);

  return (
    <div className="space-y-8">
      {/* Section 1: Interactive −1/3 Score Calculator & Strategy */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-blue-700">
            Official RRB CBT Marking Scheme (+1 Correct · −1/3 Wrong · 0 Unattempted)
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Answer Key, Negative Marking (−1/3) Analysis & 120-Minute Strategy
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl">
            Every three wrong answers erase one full mark earned from a correct response. Use the
            interactive estimator below to test how accuracy impacts your net CEN 08/2026 score.
          </p>
        </div>

        {/* Interactive Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-200 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="sim-correct" className="font-medium text-slate-800">
                  Correct Answers (+1 mark each)
                </label>
                <span className="font-mono font-bold tabular-nums text-emerald-700">
                  {simCorrect} questions
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
                <label htmlFor="sim-wrong" className="font-medium text-slate-800">
                  Wrong Answers (−0.333 mark each)
                </label>
                <span className="font-mono font-bold tabular-nums text-rose-700">
                  {clampedWrong} questions (max {maxWrong})
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
              <div className="text-xs text-slate-500">Projected Net Score</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-blue-800 mt-0.5">
                {simNet.toFixed(2)}
              </div>
              <div className="text-xs text-slate-500">out of 100.00</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Negative Penalty</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-rose-700 mt-0.5">
                −{simPenalty.toFixed(2)}
              </div>
              <div className="text-xs text-slate-500">marks deducted</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Accuracy Rate</div>
              <div className="text-lg font-bold font-mono tabular-nums text-slate-900 mt-0.5">
                {simAccuracy.toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Attempted / Skipped</div>
              <div className="text-lg font-bold font-mono tabular-nums text-slate-900 mt-0.5">
                {simAttempted} / {simSkipped}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Worked Negative Marking Examples + 120-Min Strategy */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Worked Examples */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="text-base font-bold text-slate-900">
              Worked Negative Marking (−1/3) Scenarios
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparing disciplined high-accuracy attempts against over-attempting with guesses.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700">
                  <th className="px-4 py-2.5">Attempt Profile</th>
                  <th className="px-3 py-2.5 text-right">C / W</th>
                  <th className="px-3 py-2.5 text-right">Penalty</th>
                  <th className="px-4 py-2.5 text-right">Final Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {SCORING_EXAMPLES.map((ex) => (
                  <tr key={ex.profile} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">{ex.profile}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{ex.verdict}</div>
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
              120-Minute Time-Management & Target Allocation
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Recommended Pass-1 (85 min) + Pass-2 Review (25 min) + Final Verification (10 min).
            </p>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700">
                  <th className="px-4 py-2.5">Section</th>
                  <th className="px-3 py-2.5 text-right">Qs</th>
                  <th className="px-3 py-2.5 text-right">Time</th>
                  <th className="px-3 py-2.5 text-right">Target Attempts</th>
                  <th className="px-4 py-2.5 text-right">Target Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {SECTIONS.map((sec) => (
                  <tr key={sec.id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {sec.code}: {sec.shortTitle}
                    </td>
                    <td className="px-3 py-3 text-right font-mono tabular-nums text-slate-700">
                      {sec.count}
                    </td>
                    <td className="px-3 py-3 text-right font-mono tabular-nums font-semibold text-blue-800">
                      {sec.recommendedMinutes} min
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
                  <td className="px-4 py-3">Total (Full Mock Paper)</td>
                  <td className="px-3 py-3 text-right font-mono tabular-nums">100</td>
                  <td className="px-3 py-3 text-right font-mono tabular-nums text-blue-800">
                    120 min
                  </td>
                  <td className="px-3 py-3 text-right font-mono tabular-nums">84–90</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums text-emerald-700">
                    77.5 – 85.5
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 leading-relaxed">
            Recommended attempt order: Start with <strong className="text-slate-900">Section 3 (Mental Reasoning, 20 min)</strong> to bank quick marks, move to <strong className="text-slate-900">Section 1A (35 min)</strong>, tackle <strong className="text-slate-900">Section 1B DI (40 min)</strong> with fresh focus, and finish with <strong className="text-slate-900">Section 2 Logical & RC (25 min)</strong>.
          </div>
        </div>
      </section>

      {/* Section 3: Complete 1–100 Answer Key Table */}
      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Complete 1–100 Master Answer Key
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Every answer verified against step-by-step calculations and logical deductions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label="Filter Answer Key by Section"
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value as 'ALL' | SectionId)}
              className="px-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
            >
              <option value="ALL">All Sections (100)</option>
              {SECTIONS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code}: {s.shortTitle}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter Answer Key by Difficulty"
              value={diffFilter}
              onChange={(e) => setDiffFilter(e.target.value as 'ALL' | Difficulty)}
              className="px-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
            >
              <option value="ALL">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Difficult">Difficult</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700">
                <th className="px-4 py-2.5 w-20">Q.No</th>
                <th className="px-4 py-2.5 w-28">Section</th>
                <th className="px-4 py-2.5">Topic</th>
                <th className="px-4 py-2.5 w-28">Difficulty</th>
                <th className="px-4 py-2.5 w-52">Classification</th>
                <th className="px-4 py-2.5 text-right w-24">Answer</th>
                <th className="px-4 py-2.5">Correct Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredKey.map((q) => {
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
                      Sec {q.sectionId}
                    </td>
                    <td className="px-4 py-2.5 font-medium text-slate-900">
                      {q.topic}
                    </td>
                    <td className={`px-4 py-2.5 text-xs font-semibold ${diffClass}`}>
                      {q.difficulty}
                    </td>
                    <td className="px-4 py-2.5 text-xs text-slate-500">{q.label}</td>
                    <td className="px-4 py-2.5 text-right font-mono font-bold text-slate-900">
                      {q.correctOption}
                    </td>
                    <td className="px-4 py-2.5 text-xs text-slate-700 max-w-xs truncate">
                      {q.options[q.correctOption]}
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
