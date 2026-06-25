import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface DashboardProps {
  totalChanda: number;
  totalSpent: number;
}

function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(amount);
}

export default function Dashboard({ totalChanda, totalSpent }: DashboardProps) {
  const remaining = totalChanda - totalSpent;
  const spentPct = totalChanda > 0 ? Math.min((totalSpent / totalChanda) * 100, 100) : 0;

  const cards = [
    {
      label: 'Total Chanda',
      value: formatINR(totalChanda),
      icon: TrendingUp,
      color: 'from-emerald-600/30 to-emerald-500/10',
      border: 'border-emerald-500/30',
      iconBg: 'bg-emerald-500/20',
      iconColor: 'text-emerald-400',
      valuColor: 'text-emerald-300',
    },
    {
      label: 'Total Spent',
      value: formatINR(totalSpent),
      icon: TrendingDown,
      color: 'from-rose-600/30 to-rose-500/10',
      border: 'border-rose-500/30',
      iconBg: 'bg-rose-500/20',
      iconColor: 'text-rose-400',
      valuColor: 'text-rose-300',
    },
    {
      label: 'Remaining Balance',
      value: formatINR(remaining),
      icon: Wallet,
      color: remaining >= 0 ? 'from-sky-600/30 to-sky-500/10' : 'from-amber-600/30 to-amber-500/10',
      border: remaining >= 0 ? 'border-sky-500/30' : 'border-amber-500/30',
      iconBg: remaining >= 0 ? 'bg-sky-500/20' : 'bg-amber-500/20',
      iconColor: remaining >= 0 ? 'text-sky-400' : 'text-amber-400',
      valuColor: remaining >= 0 ? 'text-sky-300' : 'text-amber-300',
    },
  ];

  return (
    <section id="dashboard" className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 glass px-3 py-1 rounded-full mb-3 border border-sky-500/20">
            <span className="text-xs text-sky-400 tracking-widest uppercase font-medium">Finance Overview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Festival <span className="text-sky-400">Dashboard</span>
          </h2>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className={`stat-card glass rounded-2xl p-6 border ${card.border} bg-gradient-to-br ${card.color} animate-slide-in-up`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                    <Icon size={22} className={card.iconColor} />
                  </div>
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{card.label}</span>
                </div>
                <div className={`text-2xl sm:text-3xl font-bold ${card.valuColor} break-all`}>
                  {card.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-400">Budget Utilization</span>
            <span className="text-sm font-bold text-sky-300">{spentPct.toFixed(1)}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 to-sky-400 transition-all duration-700"
              style={{ width: `${spentPct}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-slate-500">{formatINR(totalSpent)} spent</span>
            <span className="text-xs text-slate-500">{formatINR(totalChanda)} collected</span>
          </div>
        </div>
      </div>
    </section>
  );
}
