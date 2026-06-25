
const navLinks = [
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Chanda', href: '#chanda' },
  { label: 'Expenses', href: '#expenses' },
  { label: 'Comments', href: '#comments' },
  { label: 'History', href: '#history' },
];

export default function Hero() {
  return (
    <>
      {/* Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <span className="font-bold text-sky-300 text-sm sm:text-base tracking-wide">
            🪔 Street Boys
          </span>
          <div className="hidden sm:flex items-center gap-6">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="nav-item text-xs font-medium text-slate-300 hover:text-sky-300">
                {l.label}
              </a>
            ))}
          </div>
          <span className="text-xs text-amber-400 font-semibold hidden sm:block">Chavithi 2026</span>
        </div>
        {/* Mobile nav */}
        <div className="sm:hidden flex overflow-x-auto gap-4 px-4 pb-2 scrollbar-thin">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="text-xs font-medium text-slate-300 hover:text-sky-300 whitespace-nowrap">
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#020b18] via-[#041c36] to-[#061e3e]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(14,165,233,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(250,204,21,0.08),transparent_50%)]" />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#38bdf8' : i % 3 === 1 ? '#fbbf24' : '#f0abfc',
              opacity: 0.5,
              animationDuration: `${Math.random() * 6 + 8}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Decorative rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-sky-500/5 animate-spin-slow hidden lg:block" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-sky-500/5 animate-spin-slow hidden lg:block" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Text content */}
            <div className="flex-1 text-center lg:text-left animate-slide-in-up">
              {/* Festival badge */}
              <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6 border border-amber-400/30">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-semibold text-amber-400 tracking-widest uppercase">Vinayaka Chavithi 2026</span>
              </div>

              <h1 className="font-bold leading-tight mb-4">
                <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white">Street Boys</span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl gold-text mt-1">Celebration Portal</span>
              </h1>

              <p className="text-slate-400 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
                Manage funds, track expenses, and celebrate the festival of Lord Ganesha together as one big family.
              </p>

              <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
                <a href="#dashboard" className="btn-primary px-6 py-3 rounded-xl font-semibold text-sm text-white shadow-lg">
                  View Dashboard
                </a>
                <a href="#chanda" className="glass px-6 py-3 rounded-xl font-semibold text-sm text-sky-300 border border-sky-500/30 hover:border-sky-400/50 transition-all">
                  Add Chanda
                </a>
              </div>

              {/* Stats ribbon */}
              <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start">
                {[
                  { label: 'Years', value: '5+' },
                  { label: 'Members', value: '50+' },
                  { label: 'Celebration', value: '2026' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-xl font-bold text-sky-300">{s.value}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ganesha decorative card */}
            <div className="flex-shrink-0 relative animate-float">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-500/40 to-amber-500/30 blur-3xl scale-110" />
              <div className="relative w-64 h-72 sm:w-80 sm:h-96 lg:w-[380px] lg:h-[460px] rounded-3xl overflow-hidden animate-pulse-glow border border-amber-400/20"
                style={{ background: 'linear-gradient(135deg, #0c2240 0%, #041c36 40%, #0a1628 100%)' }}>
                {/* Inner glow rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-amber-400/10 animate-spin-slow" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-sky-400/15" style={{ animation: 'spin-slow 15s linear infinite reverse' }} />
                </div>
                {/* Om symbol */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="text-7xl sm:text-8xl lg:text-9xl gold-text font-black leading-none" style={{ fontFamily: 'serif', filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.5))' }}>
                    ॐ
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-amber-300/80 font-semibold tracking-[0.3em] uppercase">Lord Ganesha</div>
                    <div className="text-xs text-slate-500 mt-1">Vignaharta · Mangal Murti</div>
                  </div>
                  {/* Decorative mandala dots */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                    <div
                      key={deg}
                      className="absolute w-1.5 h-1.5 rounded-full bg-amber-400/50"
                      style={{
                        top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 90}px)`,
                        left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 90}px)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  ))}
                </div>
                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020b18]/80 via-transparent to-transparent" />
                {/* Top banner */}
                <div className="absolute top-0 left-0 right-0 py-2 px-4 flex justify-center">
                  <span className="text-xs text-amber-400/70 tracking-widest font-medium">✦ GANAPATHI BAPPA MORYA ✦</span>
                </div>
              </div>
              {/* Decorative dots */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-amber-400/80 blur-sm" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-sky-400/80 blur-sm" />
              <div className="absolute top-1/2 -right-6 w-4 h-4 rounded-full bg-sky-300/60 blur-sm" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in">
          <span className="text-xs text-slate-500 tracking-wider">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-sky-500/50 to-transparent" />
        </div>
      </section>
    </>
  );
}
