import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, LayoutDashboard, Search, Settings, LogOut, BarChart3, Globe, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/Button';

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { t } = useLanguage();
  const [isAuth, setIsAuth] = useState(false);
  const [pass, setPass] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === 'demo123') setIsAuth(true);
    else alert('Invalid password');
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-neutral-950 p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white dark:bg-neutral-900 p-8 rounded-3xl shadow-2xl border border-stone-200 dark:border-neutral-800"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
              <Lock className="text-accent" size={32} />
            </div>
            <h2 className="text-2xl font-serif font-bold">{t('adminTitle')}</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-500 mb-1">{t('adminPass')}</label>
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 outline-none focus:border-accent transition-colors"
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full" variant="gold">
              {t('login')}
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-neutral-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-neutral-900 border-r border-stone-200 dark:border-neutral-800 hidden md:flex flex-col">
        <div className="p-6 border-b border-stone-200 dark:border-neutral-800">
          <h1 className="font-serif text-xl font-bold tracking-tight">VIVORA <span className="text-accent">HQ</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: LayoutDashboard, label: 'Overview', active: true },
            { icon: Search, label: 'Search Logs' },
            { icon: Globe, label: 'Doodles' },
            { icon: BarChart3, label: 'Analytics' },
            { icon: ShieldCheck, label: 'Security' },
            { icon: Settings, label: 'Settings' },
          ].map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                item.active 
                  ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                  : 'text-stone-500 hover:bg-stone-50 dark:hover:bg-neutral-800'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-stone-200 dark:border-neutral-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold">Dashboard Overview</h2>
            <p className="text-stone-500">Welcome back, Administrator.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">System Status</p>
              <p className="text-xs text-green-500 flex items-center justify-end gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                All systems operational
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Searches', value: '1.2M', trend: '+12%' },
            { label: 'AI Queries', value: '450K', trend: '+24%' },
            { label: 'Active Users', value: '89.4K', trend: '+5%' },
            { label: 'Avg. Latency', value: '42ms', trend: '-8%' },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-stone-200 dark:border-neutral-800 shadow-sm">
              <p className="text-sm text-stone-500 mb-1">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  stat.trend.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-stone-200 dark:border-neutral-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-200 dark:border-neutral-800 flex items-center justify-between">
            <h3 className="font-bold">Recent Activity</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-stone-50 dark:bg-neutral-800/50 text-stone-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">User ID</th>
                  <th className="px-6 py-4 font-medium">Action</th>
                  <th className="px-6 py-4 font-medium">Timestamp</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-neutral-800">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <tr key={i} className="hover:bg-stone-50 dark:hover:bg-neutral-800/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">#USR-928{i}</td>
                    <td className="px-6 py-4 text-sm">AI Mode Search: "Quantum Computing"</td>
                    <td className="px-6 py-4 text-sm text-stone-500">2 mins ago</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-600 text-[10px] font-bold rounded-full uppercase">Success</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}