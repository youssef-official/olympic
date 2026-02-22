import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, ArrowLeft, Bot, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/Button';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatPage({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('https://ai-gateway.vivorax.online/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `You are VIVORA AI, a premium, sophisticated search assistant. Provide concise, elegant, and highly accurate answers. User says: ${userMsg}`,
          config: { stream: false, temperature: 0.7, max_tokens: 500 }
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.result }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I apologize, but I'm experiencing a connection issue. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-stone-50 dark:bg-neutral-950 flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-stone-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="text-accent" size={24} />
            <h2 className="font-serif text-xl font-bold">VIVORA AI</h2>
          </div>
        </div>
        <div className="text-xs font-medium text-stone-400 uppercase tracking-widest">
          Experimental Mode
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 max-w-4xl mx-auto w-full">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
            <Bot size={48} className="text-stone-300" />
            <h3 className="text-2xl font-serif">{t('aiWelcome')}</h3>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-accent text-white' : 'bg-neutral-900 text-white dark:bg-white dark:text-black'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-accent/10 text-stone-900 dark:text-stone-100 rounded-tr-none' 
                  : 'bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 rounded-tl-none shadow-sm'
              }`}>
                <p className="leading-relaxed">{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center animate-pulse">
              <Bot size={16} className="text-white dark:text-black" />
            </div>
            <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-stone-200 dark:border-neutral-800">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white dark:bg-neutral-900 border-t border-stone-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('aiPlaceholder')}
            className="w-full bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-2xl px-6 py-4 pr-16 outline-none focus:border-accent transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-accent text-white rounded-xl hover:opacity-90 disabled:opacity-50 transition-all"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}