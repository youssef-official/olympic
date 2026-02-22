import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AIChatPage from './pages/AIChatPage';
import AdminDashboard from './pages/AdminDashboard';
import { PageType } from './types';
import { useLanguage } from './contexts/LanguageContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const { t, lang } = useLanguage();

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // In a real app, this would navigate to a results page
    alert(`Searching for: ${query}`);
  };

  return (
    <div className={`min-h-screen flex flex-col ${lang === 'ar' ? 'font-sans' : 'font-sans'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar setCurrentPage={setCurrentPage} />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {currentPage === 'home' && (
              <HomePage 
                onSearch={handleSearch} 
                onAIMode={() => setCurrentPage('ai')} 
              />
            )}
            
            {currentPage === 'ai' && (
              <AIChatPage onBack={() => setCurrentPage('home')} />
            )}

            {currentPage === 'admin' && (
              <AdminDashboard onLogout={() => setCurrentPage('home')} />
            )}

            {currentPage === 'about' && (
              <div className="pt-32 px-6 max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-serif font-bold mb-8">About VIVORA</h1>
                <p className="text-xl text-stone-600 dark:text-stone-400 leading-relaxed">
                  VIVORA is a premium search experience designed for the modern era. 
                  Combining elite design aesthetics with cutting-edge AI technology, 
                  we provide a portal to the world's information that is as beautiful as it is functional.
                </p>
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="mt-12 text-accent font-bold hover:underline"
                >
                  Back to Search
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {currentPage === 'home' && (
        <footer className="bg-stone-50 dark:bg-neutral-900 border-t border-stone-200 dark:border-neutral-800 py-4 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-500">
            <div className="flex items-center gap-6">
              <a href="#" className="hover:underline">Advertising</a>
              <a href="#" className="hover:underline">Business</a>
              <a href="#" className="hover:underline">How Search works</a>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:underline">{t('footerPrivacy')}</a>
              <a href="#" className="hover:underline">{t('footerTerms')}</a>
              <a href="#" className="hover:underline">{t('footerSettings')}</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}