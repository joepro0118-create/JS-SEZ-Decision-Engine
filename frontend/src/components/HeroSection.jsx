import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HeroSection() {
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
          className="flex items-center justify-center gap-4"
        >
          <a
            href="#analysis-section"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-white text-[#09090b] font-semibold text-[15px] hover:bg-[#e4e4e7] transition-colors"
          >
            Start Analysis
          </a>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[#a1a1aa] font-medium text-[15px] border border-white/[0.08] hover:border-white/[0.15] hover:text-white transition-all"
          >
            Learn More
          </Link>
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
