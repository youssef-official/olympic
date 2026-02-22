import React, { useState } from 'react';
import { Search, Mic, Camera, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
}

export default function SearchBar({ onSearch, className }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto px-4", className)}>
      <form 
        onSubmit={handleSubmit}
        className={cn(
          "relative flex items-center bg-white dark:bg-neutral-900 border transition-all duration-300 rounded-full px-6 py-3 md:py-4",
          isFocused 
            ? "border-blue-500 shadow-xl shadow-blue-500/10 ring-4 ring-blue-500/5" 
            : "border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md"
        )}
      >
        <Search className={cn(
          "w-5 h-5 mr-4 transition-colors",
          isFocused ? "text-blue-500" : "text-gray-400"
        )} />
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search anything or ask AI..."
          className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white text-lg placeholder:text-gray-400"
        />

        <div className="flex items-center gap-3 ml-4">
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="button"
                onClick={() => setQuery('')}
                className="p-1 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full text-gray-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
          
          <div className="h-6 w-[1px] bg-gray-200 dark:bg-neutral-800 mx-1" />
          
          <button 
            type="button"
            className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full text-blue-600 dark:text-blue-400 transition-colors"
            title="Voice Search"
          >
            <Mic className="w-5 h-5" />
          </button>
          
          <button 
            type="button"
            className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full text-gray-500 dark:text-gray-400 transition-colors"
            title="Search by Image"
          >
            <Camera className="w-5 h-5" />
          </button>

          <button 
            type="submit"
            className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            Research
          </button>
        </div>
      </form>

      {/* Quick Suggestions */}
      {!query && isFocused && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 right-0 mt-2 mx-4 p-4 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-2xl z-50"
        >
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">Trending Research</p>
          <div className="space-y-1">
            {['Quantum Computing in 2025', 'Sustainable Urban Architecture', 'The Future of Generative AI', 'Space Exploration Milestones'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setQuery(item);
                  onSearch(item);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-xl text-gray-600 dark:text-gray-300 transition-colors text-left"
              >
                <Search className="w-4 h-4 text-gray-400" />
                <span>{item}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}