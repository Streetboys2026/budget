import { Trophy, Star, Users, Heart, Flame } from 'lucide-react';

const milestones = [
  {
    year: '2026',
    title: 'Legacy Continues',
    description:
        'This year, Street Boys are back with even more energy, creativity, and devotion. We aim to make Vinayaka Chavithi 2026 a landmark event in our community\'s history. Ganapathi Bappa Morya!',
    icon: Flame,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
];

const values = [
  {
    icon: Heart,
    label: 'Unity',
    desc: 'We celebrate as one family regardless of background',
  },
  {
    icon: Star,
    label: 'Devotion',
    desc: 'Deep faith and respect for Lord Ganesha',
  },
  {
    icon: Users,
    label: 'Community',
    desc: 'Building bonds that last a lifetime',
  },
  {
    icon: Trophy,
    label: 'Excellence',
    desc: 'Striving to make every year better than the last',
  },
];

export default function HistorySection() {
  return (
      <section
          id="history"
          className="py-16 px-4 sm:px-6 bg-[radial-gradient(ellipse_at_top,rgba(250,204,21,0.06),transparent_60%)]"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 glass px-3 py-1 rounded-full mb-3 border border-amber-500/20">
            <span className="text-xs text-amber-400 tracking-widest uppercase font-medium">
              Our Story
            </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              History of <span className="gold-text">Street Boys</span>
            </h2>

            <p className="text-slate-400 text-sm mt-3 max-w-xl mx-auto">
              A legacy built on friendship, faith, and the spirit of celebration.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative mb-16">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/50 to-transparent" />

            <div className="space-y-8">
              {milestones.map((m) => {
                const Icon = m.icon;

                return (
                    <div
                        key={m.year}
                        className="relative flex items-start gap-4 flex-row"
                    >
                      {/* Timeline Dot */}
                      <div
                          className={`absolute left-4 sm:left-1/2 -translate-x-1/2 top-4 w-4 h-4 rounded-full ${m.bg} border-2 ${m.border} z-10`}
                      />

                      <div className="hidden sm:block flex-1" />

                      {/* Card */}
                      <div className="flex-1 ml-8 sm:ml-0 sm:pr-8">
                        <div
                            className={`glass rounded-2xl p-5 border ${m.border} ${m.bg} hover:scale-[1.01] transition-transform`}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div
                                className={`w-9 h-9 rounded-xl ${m.bg} border ${m.border} flex items-center justify-center`}
                            >
                              <Icon size={18} className={m.color} />
                            </div>

                            <div>
                          <span
                              className={`text-xs font-bold ${m.color} tracking-widest`}
                          >
                            {m.year}
                          </span>

                              <h3 className="text-base font-bold text-white">
                                {m.title}
                              </h3>
                            </div>
                          </div>

                          <p className="text-sm text-slate-400 leading-relaxed">
                            {m.description}
                          </p>
                        </div>
                      </div>
                    </div>
                );
              })}
            </div>
          </div>

          {/* Core Values */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white">Our Core Values</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {values.map((v) => {
              const Icon = v.icon;

              return (
                  <div
                      key={v.label}
                      className="glass rounded-xl p-5 border border-white/10 text-center hover:border-sky-500/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-sky-500/20 transition-colors">
                      <Icon size={20} className="text-sky-400" />
                    </div>

                    <div className="text-sm font-bold text-white mb-1">
                      {v.label}
                    </div>

                    <div className="text-xs text-slate-500">{v.desc}</div>
                  </div>
              );
            })}
          </div>
        </div>
      </section>
  );
}