import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mic, Camera, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onAIMode: () => void;
}

export default function SearchBar({ onSearch, onAIMode }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const { t, lang } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <form 
        onSubmit={handleSubmit}
        className={cn(
          "group relative flex items-center bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 rounded-full px-6 py-3.5 transition-all duration-500 hover:shadow-xl hover:shadow-stone-200/50 dark:hover:shadow-black/50 focus-within:border-accent/50",
          lang === 'ar' ? 'flex-row-reverse' : 'flex-row'
        )}
      >
        <Search className="text-stone-400 group-focus-within:text-accent transition-colors" size={20} />
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className={cn(
            "flex-1 bg-transparent border-none focus:ring-0 text-lg outline-none px-4 dark:text-white",
            lang === 'ar' ? 'text-right' : 'text-left'
          )}
        />

        <div className={cn("flex items-center gap-4", lang === 'ar' ? 'flex-row-reverse' : 'flex-row')}>
          <button type="button" className="text-stone-400 hover:text-accent transition-colors">
            <Mic size={20} />
          </button>
          <button type="button" className="text-stone-400 hover:text-accent transition-colors">
            <Camera size={20} />
          </button>
          <div className="h-6 w-[1px] bg-stone-200 dark:bg-neutral-800" />
          <button 
            type="button"
            onClick={onAIMode}
            className="flex items-center gap-2 text-accent font-semibold hover:opacity-80 transition-all"
          >
            <Sparkles size={20} className="animate-pulse" />
            <span className="hidden sm:inline text-sm">{t('aiMode')}</span>
          </button>
        </div>
      </form>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <button 
          onClick={() => onSearch(query)}
          className="px-6 py-2 bg-stone-100 dark:bg-neutral-800 text-stone-700 dark:text-stone-300 rounded-md text-sm font-medium hover:border-stone-300 border border-transparent transition-all"
        >
          Google Search
        </button>
        <button className="px-6 py-2 bg-stone-100 dark:bg-neutral-800 text-stone-700 dark:text-stone-300 rounded-md text-sm font-medium hover:border-stone-300 border border-transparent transition-all">
          {t('feelingLucky')}
        </button>
      </div>
    </div>
  );
}