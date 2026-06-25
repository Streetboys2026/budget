import { useState } from 'react';
import { Plus, Trash2, X, IndianRupee, FileText, Calendar, Download } from 'lucide-react';
import type { Expense } from '../lib/supabase';

interface SpentSectionProps {
  items: Expense[];
  onAdd: (description: string, amount: number, date: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onExportCSV: () => void;
}

function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(amount);
}

export default function SpentSection({ items, onAdd, onDelete, onExportCSV }: SpentSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim() || !amount || !date) return;
    setLoading(true);
    await onAdd(description.trim(), parseFloat(amount), date);
    setDescription('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setLoading(false);
    setShowModal(false);
  }

  return (
    <>
      <section id="expenses" className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 glass px-3 py-1 rounded-full mb-3 border border-rose-500/20">
              <span className="text-xs text-rose-400 tracking-widest uppercase font-medium">Expenditure</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Expenses <span className="text-rose-400">Tracker</span>
            </h2>
          </div>

          {/* Table card */}
          <div className="glass rounded-2xl border border-rose-500/15 overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-white">All Expenses</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={onExportCSV}
                  className="flex items-center gap-1.5 text-xs font-medium text-sky-400 hover:text-sky-300 transition-colors bg-sky-500/10 px-3 py-2 rounded-lg border border-sky-500/20"
                >
                  <Download size={13} />
                  Export
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="btn-primary flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #f43f5e, #e11d48)' }}
                >
                  <Plus size={16} />
                  Add Expense
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto scrollbar-thin">
              {items.length === 0 ? (
                <div className="text-center py-16 text-slate-500 text-sm">
                  <div className="mb-3 text-4xl opacity-30">💸</div>
                  No expenses recorded yet
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-[#041c36]/90 backdrop-blur">
                    <tr className="text-xs text-slate-500 uppercase">
                      <th className="px-4 py-3 text-left">#</th>
                      <th className="px-4 py-3 text-left">Description</th>
                      <th className="px-4 py-3 text-right">Amount</th>
                      <th className="px-4 py-3 text-center hidden sm:table-cell">Date</th>
                      <th className="px-4 py-3 text-center">Del</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((exp, idx) => (
                      <tr key={exp.id} className="table-row-hover border-t border-white/5">
                        <td className="px-4 py-3 text-slate-600 text-xs">{idx + 1}</td>
                        <td className="px-4 py-3 text-white">{exp.description}</td>
                        <td className="px-4 py-3 text-rose-400 font-bold text-right">{formatINR(exp.amount)}</td>
                        <td className="px-4 py-3 text-slate-500 text-center text-xs hidden sm:table-cell">{exp.date}</td>
                        <td className="px-4 py-3 text-center">
                          {confirmDelete === exp.id ? (
                            <div className="flex items-center gap-1 justify-center">
                              <button onClick={() => { onDelete(exp.id); setConfirmDelete(null); }} className="text-rose-400 hover:text-rose-300 text-xs font-medium">Yes</button>
                              <span className="text-slate-600">/</span>
                              <button onClick={() => setConfirmDelete(null)} className="text-slate-400 text-xs">No</button>
                            </div>
                          ) : (
                            <button onClick={() => setConfirmDelete(exp.id)} className="text-slate-600 hover:text-rose-400 transition-colors">
                              <Trash2 size={14} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-4 py-3 border-t border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-500">{items.length} entries</span>
                <span className="text-sm font-bold text-rose-400">
                  Total: {formatINR(items.reduce((s, e) => s + e.amount, 0))}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Add Expense Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative glass-strong rounded-2xl border border-rose-500/30 p-6 w-full max-w-md animate-bounce-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Plus size={20} className="text-rose-400" />
                Add Expense
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Description</label>
                <div className="relative">
                  <FileText size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What was spent on?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-500/50 transition-all"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Amount (₹)</label>
                <div className="relative">
                  <IndianRupee size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    min="1"
                    step="0.01"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-500/50 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Date</label>
                <div className="relative">
                  <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm text-white focus:outline-none focus:border-rose-500/50 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 glass py-3 rounded-xl text-sm font-medium text-slate-400 border border-white/10 hover:border-white/20 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-50 transition-all hover:opacity-90 active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #f43f5e, #e11d48)' }}
                >
                  {loading ? 'Adding...' : 'Add Expense'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
