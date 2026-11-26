import { Languages } from 'lucide-react';
import { Language } from '../i18n/ui';

interface LanguageToggleProps {
  lang: Language;
  onChange: (lang: Language) => void;
  compact?: boolean;
}

export function LanguageToggle({
  lang,
  onChange,
  compact = false,
}: LanguageToggleProps) {
  return (
    <div
      role="group"
      aria-label="Language switcher"
      className="inline-flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-lg shrink-0"
    >
      <span className="pl-2 pr-1 text-slate-500 hidden sm:inline-flex items-center" aria-hidden="true">
        <Languages className="w-3.5 h-3.5" />
      </span>
      <button
        type="button"
        onClick={() => onChange('en')}
        aria-pressed={lang === 'en'}
        className={`${
          compact ? 'px-2 py-1 text-xs' : 'px-2.5 py-1 text-xs'
        } font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
          lang === 'en'
            ? 'bg-white text-blue-800 shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => onChange('hi')}
        aria-pressed={lang === 'hi'}
        className={`${
          compact ? 'px-2 py-1 text-xs' : 'px-2.5 py-1 text-xs'
        } font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
          lang === 'hi'
            ? 'bg-white text-blue-800 shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        हिंदी
      </button>
    </div>
  );
}
