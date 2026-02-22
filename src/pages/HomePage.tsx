import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import { useLanguage } from '../contexts/LanguageContext';

interface HomePageProps {
  onSearch: (q: string) => void;
  onAIMode: () => void;
}

export default function HomePage({ onSearch, onAIMode }: HomePageProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12"
      >
        {/* Premium Doodle Replacement */}
        <div className="relative mb-8">
          <motion.h1 
            className="text-7xl md:text-9xl font-serif font-bold tracking-tighter text-neutral-900 dark:text-white"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            VIVORA
          </motion.h1>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-accent font-medium text-sm tracking-widest uppercase">
            <span className="h-[1px] w-8 bg-accent" />
            Elite Search
            <span className="h-[1px] w-8 bg-accent" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-md mx-auto mb-12"
        >
          <img 
            src="https://images.unsplash.com/photo-1517176641128-3522c046b77e?w=800&auto=format&fit=crop" 
            alt="Winter Sports"
            className="w-full h-48 object-cover rounded-2xl shadow-2xl border border-white/20"
          />
          <p className="mt-4 text-stone-500 dark:text-stone-400 text-sm italic">
            Celebrating the spirit of excellence and innovation.
          </p>
        </motion.div>
      </motion.div>

      <SearchBar onSearch={onSearch} onAIMode={onAIMode} />

      <div className="mt-16 text-sm text-stone-500 dark:text-stone-400 flex items-center gap-2">
        <span>Google offered in:</span>
        <button className="text-accent hover:underline">Français</button>
        <button className="text-accent hover:underline">العربية</button>
        <button className="text-accent hover:underline">Deutsch</button>
      </div>
    </div>
  );
}