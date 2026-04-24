import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-16">
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
          <span className="text-[11px] font-medium text-[#a1a1aa] tracking-widest uppercase">
            2026 Johor-Singapore Special Economic Zone
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-[72px] font-semibold leading-[1.05] tracking-tight mb-6"
        >
          <span className="text-white">Decision Intelligence</span>
          <br />
          <span className="text-[#71717a]">for JS-SEZ Investment</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-lg text-[#71717a] max-w-xl mx-auto mb-12 leading-relaxed font-normal"
        >
          AI-powered NIA Scorecard analysis, tax optimization, and strategic zone selection
          for companies entering the JS-SEZ.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center justify-center gap-6 mt-8 w-full"
        >
          <button
            onClick={() => navigate('/analysis')}
            className="group relative inline-flex items-center justify-center gap-3 px-12 py-5 rounded-2xl bg-white text-[#09090b] font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
          >
            Start Analysis
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-12 mt-20 pt-10 border-t border-white/[0.06]"
        >
          {[
            { label: 'Corporate Tax', value: '5%', sub: 'vs 24% standard' },
            { label: 'Income Tax', value: '15%', sub: 'flat rate for knowledge workers' },
            { label: 'Carbon Tax', value: 'RM15', sub: 'per tonne (2026)' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-semibold text-white tracking-tight">{stat.value}</div>
              <div className="text-sm text-[#71717a] mt-1">{stat.label}</div>
              <div className="text-xs text-[#52525b] mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
