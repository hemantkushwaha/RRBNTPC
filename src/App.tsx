import { useState } from 'react';
import { AnswerKeyView } from './components/AnswerKeyView';
import { CbtSimulator } from './components/CbtSimulator';
import { FormulasView } from './components/FormulasView';
import { MockPaperView } from './components/MockPaperView';

type ActiveTab = 'paper' | 'cbt' | 'key' | 'formulas';

const NAV_ITEMS: { id: ActiveTab; label: string }[] = [
  { id: 'paper', label: 'Mock Paper' },
  { id: 'cbt', label: 'CBT Simulator' },
  { id: 'key', label: 'Answer Key' },
  { id: 'formulas', label: 'Formulas' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('paper');

  const navigate = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Strict 3-Zone Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => navigate('paper')}
            className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer"
          >
            RRB CEN 08/2026
          </button>

          {/* Zone 2: 4 Clean Single-Line Nav Links */}
          <nav
            aria-label="Primary Navigation"
            className="flex items-center gap-5 sm:gap-7 overflow-x-auto"
          >
            {NAV_ITEMS.map((item) => {
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

          {/* Zone 3: Single Primary Action */}
          <div className="hidden sm:flex items-center shrink-0">
            <button
              type="button"
              onClick={() => navigate(activeTab === 'cbt' ? 'paper' : 'cbt')}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {activeTab === 'cbt' ? 'View Full Paper' : 'Start CBT Exam'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'paper' && (
          <MockPaperView onLaunchCbt={() => navigate('cbt')} />
        )}
        {activeTab === 'cbt' && <CbtSimulator />}
        {activeTab === 'key' && <AnswerKeyView />}
        {activeTab === 'formulas' && <FormulasView />}
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>
            RRB Station Master CEN No. 08/2026 · 100 Questions · 120 Minutes · +1 / −1/3 Marking
          </span>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => navigate('paper')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Mock Paper
            </button>
            <button
              type="button"
              onClick={() => navigate('cbt')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              CBT Simulator
            </button>
            <button
              type="button"
              onClick={() => navigate('key')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Answer Key
            </button>
            <button
              type="button"
              onClick={() => navigate('formulas')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Formulas
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
