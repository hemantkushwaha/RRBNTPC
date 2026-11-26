import { EXAM_PITFALLS, KEY_FORMULAS } from '../data/mockPaper';
import { Language, UI_TEXT } from '../i18n/ui';

interface FormulasViewProps {
  lang: Language;
}

export function FormulasView({ lang }: FormulasViewProps) {
  const t = UI_TEXT[lang];

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-2">
        <div className="text-xs font-semibold text-blue-700">
          {t.formulasKicker}
        </div>
        <h1 className="text-2xl font-bold text-slate-900">{t.formulasTitle}</h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          {t.formulasSubtitle}
        </p>
      </section>

      {/* Formula Groups */}
      <section className="space-y-6">
        {KEY_FORMULAS.map((group) => (
          <div
            key={group.category}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden"
          >
            <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200">
              <h2 className="text-base font-bold text-slate-900">
                {lang === 'hi' ? group.categoryHi : group.category}
              </h2>
            </div>
            <div className="divide-y divide-slate-100">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 items-baseline"
                >
                  <div className="lg:col-span-3 text-sm font-semibold text-slate-900">
                    {lang === 'hi' ? item.nameHi : item.name}
                  </div>
                  <div className="lg:col-span-5">
                    <code className="block px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs sm:text-sm font-mono text-blue-900">
                      {item.expression}
                    </code>
                  </div>
                  <div className="lg:col-span-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {lang === 'hi' ? item.noteHi : item.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Common Exam Pitfalls */}
      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
          <h2 className="text-base font-bold text-slate-900">
            {t.pitfallsTitle}
          </h2>
        </div>
        <div className="divide-y divide-slate-100">
          {EXAM_PITFALLS.map((item, idx) => (
            <div
              key={item.area}
              className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6"
            >
              <div className="lg:col-span-3">
                <div className="text-xs font-mono text-slate-400">
                  0{idx + 1}
                </div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  {lang === 'hi' ? item.areaHi : item.area}
                </div>
              </div>
              <div className="lg:col-span-4 text-sm text-slate-700 leading-relaxed">
                <span className="font-semibold text-rose-700">
                  {t.pitfallLabel}{' '}
                </span>
                {lang === 'hi' ? item.pitfallHi : item.pitfall}
              </div>
              <div className="lg:col-span-5 text-sm text-slate-700 leading-relaxed">
                <span className="font-semibold text-emerald-800">
                  {t.preventionLabel}{' '}
                </span>
                {lang === 'hi' ? item.preventionHi : item.prevention}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
