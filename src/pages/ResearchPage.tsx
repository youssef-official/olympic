import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, BookOpen, BarChart3, Globe, ArrowLeft, Share2, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface ResearchPageProps {
  query: string;
  onBack: () => void;
}

export default function ResearchPage({ query, onBack }: ResearchPageProps) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performResearch = async () => {
      if (!query) return;
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('https://ai-gateway.vivorax.online/api/ai/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: `You are an elite academic research assistant. Conduct a comprehensive, professional research report on the following topic: "${query}". 
            
            Structure your response with the following sections:
            1. EXECUTIVE SUMMARY: A high-level overview of the topic.
            2. HISTORICAL CONTEXT: How this topic evolved over time.
            3. KEY PILLARS & DATA: The most important facts, statistics, or core concepts.
            4. CURRENT TRENDS: What is happening right now in this field.
            5. FUTURE OUTLOOK: Predictions and upcoming developments.
            6. CONCLUSION: Final synthesis.
            
            Use professional, objective, and sophisticated language. Format with clear headings.`,
            config: { stream: false, temperature: 0.7, max_tokens: 1500 }
          })
        });

        const data = await res.json();
        if (data.result) {
          setResult(data.result);
        } else {
          throw new Error('Failed to generate research');
        }
      } catch (err) {
        setError('An error occurred while conducting research. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    performResearch();
  }, [query]);

  const formatContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.match(/^[1-9]\.|^[A-Z\s]{5,}:/)) {
        return (
          <h2 key={i} className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
            {line.replace(/^\d+\.\s*/, '')}
          </h2>
        );
      }
      return <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Search</span>
          </button>
          
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" /> Share
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" /> Export PDF
            </Button>
          </div>
        </div>

        {/* Title Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest rounded-full">
              AI Research Report
            </span>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-400 text-sm">{new Date().toLocaleDateString()}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            {query}
          </h1>
        </div>

        {/* Content Area */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-6" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Conducting Deep Research</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                  Our AI is scanning global databases, analyzing trends, and synthesizing a comprehensive report for you...
                </p>
                
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
                  {[
                    { icon: Globe, label: "Scanning Sources" },
                    { icon: BarChart3, label: "Analyzing Data" },
                    { icon: BookOpen, label: "Synthesizing Report" }
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
                      <item.icon className="w-6 h-6 text-blue-500 mb-3 mx-auto" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : error ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 text-center"
              >
                <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
              </motion.div>
            ) : (
              <motion.div 
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose prose-lg dark:prose-invert max-w-none"
              >
                <div className="bg-white dark:bg-neutral-900/50 border border-gray-100 dark:border-neutral-800 rounded-3xl p-8 md:p-12 shadow-sm">
                  {formatContent(result)}
                </div>
                
                <div className="mt-12 p-8 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                  <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">Research Methodology</h4>
                  <p className="text-blue-800/70 dark:text-blue-300/60 text-sm leading-relaxed">
                    This report was generated using advanced neural networks trained on vast academic and public datasets. 
                    The AI synthesizes information from multiple domains to provide a multi-faceted perspective on the subject matter.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}