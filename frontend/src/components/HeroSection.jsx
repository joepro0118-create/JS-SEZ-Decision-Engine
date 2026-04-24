import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(59,130,246,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-10"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: '#10b981',
              boxShadow: '0 0 8px rgba(16,185,129,0.6)',
            }}
          />
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#a1a1aa]">
            2026 Johor-Singapore Special Economic Zone
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-[76px] font-bold leading-[1.04] tracking-[-0.03em] mb-7"
        >
          <span className="text-white">Decision Intelligence</span>
          <br />
          <span className="text-[#52525b]">for JS-SEZ Investment</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-[17px] text-[#71717a] max-w-lg mx-auto mb-14 leading-[1.7] font-normal"
        >
          AI-powered NIA Scorecard analysis, tax optimization, and strategic zone selection
          for companies entering the JS-SEZ.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mb-20"
        >
          <button
            onClick={() => navigate('/analysis')}
            className="hero-cta-btn group"
          >
            <span className="hero-cta-btn__glow" />
            <span className="hero-cta-btn__shimmer" />
            <span className="hero-cta-btn__content">
              <span>Start Analysis</span>
              <svg
                className="w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex items-center justify-center gap-0 w-full"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {[
            { label: 'Corporate Tax', value: '5%', sub: 'vs 24% standard' },
            { label: 'Income Tax', value: '15%', sub: 'flat rate for knowledge workers' },
            { label: 'Carbon Tax', value: 'RM15', sub: 'per tonne (2026)' },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex-1 text-center py-8"
              style={{
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <div className="text-[28px] sm:text-[32px] font-bold text-white tracking-tight leading-none">
                {stat.value}
              </div>
              <div className="text-[13px] text-[#71717a] mt-2 font-medium">{stat.label}</div>
              <div className="text-[11px] text-[#3f3f46] mt-1">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
