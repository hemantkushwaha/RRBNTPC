import { useEffect, useState } from 'react';
import { AnswerKeyView } from './components/AnswerKeyView';
import { CbtSimulator } from './components/CbtSimulator';
import { FormulasView } from './components/FormulasView';
import { LanguageToggle } from './components/LanguageToggle';
import { MockPaperView } from './components/MockPaperView';
import { ALL_CONTEXTS, ALL_QUESTIONS } from './data/mockPaper';
import { ExamQuestion, SECTIONS, SharedContextBlock } from './data/types';
import { Language, SECTION_TEXT, UI_TEXT } from './i18n/ui';

type ActiveTab = 'paper' | 'cbt' | 'key' | 'formulas';
const LANG_STORAGE_KEY = 'rrb_sm_cen08_2026_lang_v1';

function loadInitialLang(): Language {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'en' || saved === 'hi') return saved;
  } catch {
    // ignore storage errors
  }
  return 'en';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('paper');
  const [lang, setLang] = useState<Language>(loadInitialLang);

  const [questions, setQuestions] = useState<ExamQuestion[]>(ALL_QUESTIONS);
  const [contexts, setContexts] =
    useState<Record<string, SharedContextBlock>>(ALL_CONTEXTS);
  const [paperSource, setPaperSource] = useState<'standard' | 'generated'>(
    'standard'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<string | null>(
    null
  );
  const [generationError, setGenerationError] = useState<string | null>(null);

  const t = UI_TEXT[lang];

  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // ignore storage errors
    }
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
  }, [lang]);

  const navigate = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateNewPaper = async () => {
    setIsGenerating(true);
    setGenerationError(null);
    const seed = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    try {
      const collectedQuestions: ExamQuestion[] = [];
      const collectedContexts: Record<string, SharedContextBlock> = {};

      for (const sec of SECTIONS) {
        setGenerationProgress(
          lang === 'hi'
            ? `${SECTION_TEXT[sec.id].code.hi} (${sec.count} प्रश्न) तैयार हो रहा है...`
            : `Generating ${SECTION_TEXT[sec.id].code.en} (${sec.count} Qs)...`
        );

        const response = await fetch('/api/generate-mock', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sectionId: sec.id, seed }),
        });

        const payload = (await response.json().catch(() => ({}))) as {
          questions?: ExamQuestion[];
          contexts?: Record<string, SharedContextBlock>;
          error?: string;
        };

        if (!response.ok || !Array.isArray(payload.questions)) {
          throw new Error(
            payload.error ||
              `Failed to generate ${sec.code} (HTTP ${response.status}).`
          );
        }

        collectedQuestions.push(...payload.questions);
        if (payload.contexts) {
          Object.assign(collectedContexts, payload.contexts);
        }
      }

      setQuestions(collectedQuestions);
      setContexts(collectedContexts);
      setPaperSource('generated');
      setGenerationProgress(null);
      localStorage.removeItem('rrb_sm_cen08_2026_cbt_state_v1');
    } catch (err) {
      setGenerationError(
        err instanceof Error
          ? err.message
          : 'Unable to generate a new bilingual mock paper right now.'
      );
      setGenerationProgress(null);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRestoreStandard = () => {
    setQuestions(ALL_QUESTIONS);
    setContexts(ALL_CONTEXTS);
    setPaperSource('standard');
    setGenerationError(null);
    localStorage.removeItem('rrb_sm_cen08_2026_cbt_state_v1');
  };

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'paper', label: t.navPaper },
    { id: 'cbt', label: t.navCbt },
    { id: 'key', label: t.navKey },
    { id: 'formulas', label: t.navFormulas },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Clean Top Navigation Bar with English / हिंदी Language Switcher */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => navigate('paper')}
            className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.brand}
          </button>

          {/* Zone 2: 4 Clean Single-Line Nav Links */}
          <nav
            aria-label="Primary Navigation"
            className="flex items-center gap-4 sm:gap-7 overflow-x-auto"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                  className={`py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
                    isActive
                      ? 'text-blue-700 border-blue-700 font-semibold'
                      : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Bilingual Switcher + Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <LanguageToggle lang={lang} onChange={setLang} />
            <button
              type="button"
              onClick={() => navigate(activeTab === 'cbt' ? 'paper' : 'cbt')}
              className="hidden md:inline-flex px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {activeTab === 'cbt' ? t.viewFullPaper : t.startCbt}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'paper' && (
          <MockPaperView
            lang={lang}
            questions={questions}
            contexts={contexts}
            paperSource={paperSource}
            isGenerating={isGenerating}
            generationProgress={generationProgress}
            generationError={generationError}
            onGenerateNewPaper={handleGenerateNewPaper}
            onRestoreStandard={handleRestoreStandard}
            onLaunchCbt={() => navigate('cbt')}
          />
        )}
        {activeTab === 'cbt' && (
          <CbtSimulator
            lang={lang}
            onChangeLang={setLang}
            questions={questions}
            contexts={contexts}
          />
        )}
        {activeTab === 'key' && (
          <AnswerKeyView lang={lang} questions={questions} />
        )}
        {activeTab === 'formulas' && <FormulasView lang={lang} />}
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>{t.footerLine}</span>
          <div className="flex items-center gap-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.id)}
                className="hover:text-slate-900 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
