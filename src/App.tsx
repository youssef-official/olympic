import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AIChatPage from './pages/AIChatPage';
import ResearchPage from './pages/ResearchPage';
import AdminDashboard from './pages/AdminDashboard';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

type PageType = 'home' | 'ai-chat' | 'research' | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('research');
  };

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300">
          <Navbar 
            onNavigate={navigateTo} 
            currentPage={currentPage} 
          />
          
          <main>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {currentPage === 'home' && (
                  <HomePage onSearch={handleSearch} />
                )}
                
                {currentPage === 'ai-chat' && (
                  <AIChatPage />
                )}

                {currentPage === 'research' && (
                  <ResearchPage 
                    query={searchQuery} 
                    onBack={() => setCurrentPage('home')} 
                  />
                )}

                {currentPage === 'admin' && (
                  <AdminDashboard />
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Footer - Only show on home */}
          {currentPage === 'home' && (
            <footer className="py-8 border-t border-gray-100 dark:border-neutral-900">
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex gap-6">
                  <a href="#" className="hover:underline">About</a>
                  <a href="#" className="hover:underline">Advertising</a>
                  <a href="#" className="hover:underline">Business</a>
                  <a href="#" className="hover:underline">How Search works</a>
                </div>
                <div className="flex gap-6">
                  <a href="#" className="hover:underline">Privacy</a>
                  <a href="#" className="hover:underline">Terms</a>
                  <a href="#" className="hover:underline">Settings</a>
                </div>
              </div>
            </footer>
          )}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}