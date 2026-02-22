import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import { Sparkles, Globe, Shield, Zap } from 'lucide-react';

interface HomePageProps {
  onSearch: (query: string) => void;
}

export default function HomePage({ onSearch }: HomePageProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-4xl mx-auto px-6 text-center">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Next-Gen AI Search Engine</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-gray-900 dark:text-white mb-6">
            VIVORA<span className="text-blue-600">X</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Experience the future of information. Real-time research, deep analysis, and intelligent insights at your fingertips.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <SearchBar onSearch={onSearch} />
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
        >
          {[
            {
              icon: Globe,
              title: "Global Intelligence",
              desc: "Access information from millions of verified sources worldwide in seconds."
            },
            {
              icon: Shield,
              title: "Fact-Checked",
              desc: "Our AI cross-references data points to ensure accuracy and reliability."
            },
            {
              icon: Zap,
              title: "Instant Synthesis",
              desc: "Complex topics broken down into clear, actionable research reports."
            }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-3xl bg-gray-50 dark:bg-neutral-900/50 border border-gray-100 dark:border-neutral-800 hover:border-blue-500/30 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-neutral-800 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}