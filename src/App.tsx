import { useEffect, useState, useCallback } from 'react';
import { supabase, type Chanda, type Expense, type Comment } from './lib/supabase';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import ChandaSection from './components/ChandaSection';
import SpentSection from './components/SpentSection';
import CommentsSection from './components/CommentsSection';
import HistorySection from './components/HistorySection';

function downloadCSV(filename: string, rows: string[][], headers: string[]) {
  const csvContent = [headers, ...rows]
    .map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function App() {
  const [chanda, setChanda] = useState<Chanda[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const totalChanda = chanda.reduce((s, c) => s + Number(c.amount), 0);
  const totalSpent = expenses.reduce((s, e) => s + Number(e.amount), 0);

  // Load all data
  const loadChanda = useCallback(async () => {
    const { data } = await supabase.from('chanda').select('*').order('date', { ascending: false });
    if (data) {
      setChanda(data);
      localStorage.setItem('chanda_cache', JSON.stringify(data));
    }
  }, []);

  const loadExpenses = useCallback(async () => {
    const { data } = await supabase.from('expenses').select('*').order('date', { ascending: false });
    if (data) {
      setExpenses(data);
      localStorage.setItem('expenses_cache', JSON.stringify(data));
    }
  }, []);

  const loadComments = useCallback(async () => {
    const { data } = await supabase.from('comments').select('*').order('created_at', { ascending: false });
    if (data) {
      setComments(data);
      localStorage.setItem('comments_cache', JSON.stringify(data));
    }
  }, []);

  useEffect(() => {
    // Load from localStorage cache first (instant UI)
    const cachedChanda = localStorage.getItem('chanda_cache');
    const cachedExpenses = localStorage.getItem('expenses_cache');
    const cachedComments = localStorage.getItem('comments_cache');
    if (cachedChanda) setChanda(JSON.parse(cachedChanda));
    if (cachedExpenses) setExpenses(JSON.parse(cachedExpenses));
    if (cachedComments) setComments(JSON.parse(cachedComments));

    // Then fetch fresh from Supabase
    loadChanda();
    loadExpenses();
    loadComments();
  }, [loadChanda, loadExpenses, loadComments]);

  // Chanda actions
  async function addChanda(donor_name: string, amount: number, date: string) {
    const { data, error } = await supabase.from('chanda').insert({ donor_name, amount, date }).select().single();
    if (!error && data) {
      setChanda((prev) => {
        const updated = [data, ...prev];
        localStorage.setItem('chanda_cache', JSON.stringify(updated));
        return updated;
      });
    }
  }

  async function deleteChanda(id: string) {
    await supabase.from('chanda').delete().eq('id', id);
    setChanda((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      localStorage.setItem('chanda_cache', JSON.stringify(updated));
      return updated;
    });
  }

  function exportChandaCSV() {
    downloadCSV(
      'chanda_streetboys2026.csv',
      chanda.map((c) => [c.donor_name, String(c.amount), c.date, c.created_at]),
      ['Donor Name', 'Amount (INR)', 'Date', 'Recorded At']
    );
  }

  // Expense actions
  async function addExpense(description: string, amount: number, date: string) {
    const { data, error } = await supabase.from('expenses').insert({ description, amount, date }).select().single();
    if (!error && data) {
      setExpenses((prev) => {
        const updated = [data, ...prev];
        localStorage.setItem('expenses_cache', JSON.stringify(updated));
        return updated;
      });
    }
  }

  async function deleteExpense(id: string) {
    await supabase.from('expenses').delete().eq('id', id);
    setExpenses((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      localStorage.setItem('expenses_cache', JSON.stringify(updated));
      return updated;
    });
  }

  function exportExpensesCSV() {
    downloadCSV(
      'expenses_streetboys2026.csv',
      expenses.map((e) => [e.description, String(e.amount), e.date, e.created_at]),
      ['Description', 'Amount (INR)', 'Date', 'Recorded At']
    );
  }

  // Comment actions
  async function addComment(name: string, comment: string) {
    const { data, error } = await supabase.from('comments').insert({ name, comment }).select().single();
    if (!error && data) {
      setComments((prev) => {
        const updated = [data, ...prev];
        localStorage.setItem('comments_cache', JSON.stringify(updated));
        return updated;
      });
    }
  }

  async function deleteComment(id: string) {
    await supabase.from('comments').delete().eq('id', id);
    setComments((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      localStorage.setItem('comments_cache', JSON.stringify(updated));
      return updated;
    });
  }

  return (
    <div className="min-h-screen">
      <Hero />
      <Dashboard totalChanda={totalChanda} totalSpent={totalSpent} />
      <ChandaSection
        items={chanda}
        onAdd={addChanda}
        onDelete={deleteChanda}
        onExportCSV={exportChandaCSV}
      />
      <SpentSection
        items={expenses}
        onAdd={addExpense}
        onDelete={deleteExpense}
        onExportCSV={exportExpensesCSV}
      />
      <CommentsSection
        items={comments}
        onAdd={addComment}
        onDelete={deleteComment}
      />
      <HistorySection />

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-2xl p-8 border border-white/10 text-center">
            <div className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-wide">
              Ganapathi Bappa Morya 🙏
            </div>
            <p className="text-slate-500 text-sm mb-6">Mangal Murti Morya · Vinayaka Chavithi 2026</p>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent mx-auto mb-6" />
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600">
              <span>Street Boys · Est. 2022</span>
              <span className="w-1 h-1 rounded-full bg-slate-700 hidden sm:block" />
              <span>United in celebration</span>
              <span className="w-1 h-1 rounded-full bg-slate-700 hidden sm:block" />
              <span>Chavithi 2026</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
