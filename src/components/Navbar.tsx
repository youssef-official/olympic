import React from 'react';
import { motion } from 'framer-motion';
import { Grid, User, Sun, Moon, Languages, Settings } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { PageType } from '../types';

interface NavbarProps {
  setCurrentPage: (page: PageType) => void;
}

export default function Navbar({ setCurrentPage }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-transparent">
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setCurrentPage('about')}
          className="text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
        >
          {t('about')}
        </button>
        <button className="text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors">
          {t('store')}
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors">
          {t('gmail')}
        </button>
        <button className="text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors">
          {t('images')}
        </button>
        
        <div className="h-4 w-[1px] bg-stone-200 dark:bg-neutral-800 mx-2" />

        <button 
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-neutral-800 transition-colors"
          title="Switch Language"
        >
          <Languages size={20} className="text-stone-600 dark:text-stone-400" />
        </button>

        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-neutral-800 transition-colors"
        >
          {theme === 'light' ? (
            <Moon size={20} className="text-stone-600" />
          ) : (
            <Sun size={20} className="text-stone-400" />
          )}
        </button>

        <button className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-neutral-800 transition-colors">
          <Grid size={20} className="text-stone-600 dark:text-stone-400" />
        </button>

        <button 
          onClick={() => setCurrentPage('admin')}
          className="flex items-center gap-2 bg-neutral-900 text-white dark:bg-white dark:text-black px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all"
        >
          <User size={16} />
          <span className="hidden sm:inline">{t('signin')}</span>
        </button>
      </div>
    </nav>
  );
}