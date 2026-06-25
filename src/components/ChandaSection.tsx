import { useState } from 'react';
import { Plus, Search, Download, Trash2, User, Calendar, IndianRupee } from 'lucide-react';
import type { Chanda } from '../lib/supabase';

interface ChandaSectionProps {
  items: Chanda[];
  onAdd: (donor: string, amount: number, date: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onExportCSV: () => void;
}

function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(amount);
}

export default function ChandaSection({ items, onAdd, onDelete, onExportCSV }: ChandaSectionProps) {
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = items.filter((c) =>
    c.donor_name.toLowerCase().includes(search.toLowerCase())
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!donorName.trim() || !amount || !date) return;
    setLoading(true);
    await onAdd(donorName.trim(), parseFloat(amount), date);
    setDonorName('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setLoading(false);
  }

  return (
    <section id="chanda" className="py-16 px-4 sm:px-6 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05),transparent_70%)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 glass px-3 py-1 rounded-full mb-3 border border-emerald-500/20">
            <span className="text-xs text-emerald-400 tracking-widest uppercase font-medium">Contributions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Chanda <span className="text-emerald-400">Collection</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add form */}
          <div className="glass rounded-2xl p-6 border border-emerald-500/20 animate-slide-in-up">
            <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <Plus size={20} className="text-emerald-400" />
              Add Donation
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Donor Name</label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Enter donor name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/8 transition-all"
                    required
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
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-all"
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
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding...' : 'Add Donation'}
              </button>
            </form>
          </div>

          {/* Table */}
          <div className="glass rounded-2xl border border-white/10 overflow-hidden animate-slide-in-up">
            <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
              <div className="relative flex-1 w-full">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search donors..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/50 transition-all"
                />
              </div>
              <button
                onClick={onExportCSV}
                className="flex items-center gap-1.5 text-xs font-medium text-sky-400 hover:text-sky-300 transition-colors bg-sky-500/10 px-3 py-2 rounded-lg border border-sky-500/20 whitespace-nowrap"
              >
                <Download size={13} />
                Export CSV
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto scrollbar-thin">
              {filtered.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm">
                  {search ? 'No donors found' : 'No donations yet'}
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-[#041c36]/90 backdrop-blur">
                    <tr className="text-xs text-slate-500 uppercase">
                      <th className="px-4 py-3 text-left">Donor</th>
                      <th className="px-4 py-3 text-right">Amount</th>
                      <th className="px-4 py-3 text-center hidden sm:table-cell">Date</th>
                      <th className="px-4 py-3 text-center">Del</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c) => (
                      <tr key={c.id} className="table-row-hover border-t border-white/5">
                        <td className="px-4 py-3 text-white font-medium">{c.donor_name}</td>
                        <td className="px-4 py-3 text-emerald-400 font-bold text-right">{formatINR(c.amount)}</td>
                        <td className="px-4 py-3 text-slate-500 text-center text-xs hidden sm:table-cell">{c.date}</td>
                        <td className="px-4 py-3 text-center">
                          {confirmDelete === c.id ? (
                            <div className="flex items-center gap-1 justify-center">
                              <button onClick={() => { onDelete(c.id); setConfirmDelete(null); }} className="text-rose-400 hover:text-rose-300 text-xs font-medium">Yes</button>
                              <span className="text-slate-600">/</span>
                              <button onClick={() => setConfirmDelete(null)} className="text-slate-400 hover:text-slate-300 text-xs">No</button>
                            </div>
                          ) : (
                            <button onClick={() => setConfirmDelete(c.id)} className="text-slate-600 hover:text-rose-400 transition-colors">
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

            {filtered.length > 0 && (
              <div className="px-4 py-3 border-t border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-500">{filtered.length} donors</span>
                <span className="text-sm font-bold text-emerald-400">
                  Total: {formatINR(filtered.reduce((s, c) => s + c.amount, 0))}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
