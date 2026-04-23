import { motion } from 'framer-motion';

const features = [
  {
    title: 'NIA Scorecard Engine',
    description: 'Scores companies across 5 NIA pillars — Economic Complexity, High-Value Jobs, Domestic Linkages, Industrial Clusters, and Inclusivity & Sustainability — to determine eligibility for Tier 1, 2, or 3 tax incentives.',
  },
  {
    title: 'Strategic Advisory',
    description: 'Compares Twinning (SG + Johor) versus Full Relocation strategies with specific, actionable steps to unlock Tier 1 incentives and optimize your operational footprint.',
  },
  {
    title: 'Zone Optimization',
    description: 'Evaluates Sedenak, Forest City, and Kulai based on your industry profile, scoring suitability and surfacing advantages and challenges for each location.',
  },
  {
    title: 'Economic Impact Projection',
    description: 'Quantifies the before-and-after impact of JS-SEZ entry — including corporate tax savings, ESG compliance improvements, carbon tax exposure, and high-value job creation.',
  },
  {
    title: 'AI Chat Advisor',
    description: 'An always-available conversational AI that can answer follow-up questions, run what-if scenarios, and provide deeper strategic insights based on your analysis context.',
  },
  {
    title: 'Vision Data Integration',
    description: 'Accepts OpenCV and computer vision analysis data (e.g., warehouse automation density) as an input signal for determining manufacturing complexity scores.',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-32 px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-16 z-40 bg-[#09090b]/90 backdrop-blur-md pt-6 pb-4 mb-16 border-b border-white/[0.06] -mx-6 px-6 lg:-mx-8 lg:px-8"
      >
        <div className="text-[11px] font-medium text-[#52525b] uppercase tracking-widest mb-3">
          About NEXUS
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4">
          AI-Powered Decision Intelligence for JS-SEZ
        </h1>
        <p className="text-[#71717a] text-base leading-relaxed max-w-2xl">
          NEXUS is a strategic advisory platform built for the 2026 Johor-Singapore Special 
          Economic Zone. It combines structured financial data, unstructured strategy briefs, 
          and computer vision signals to deliver comprehensive investment recommendations 
          powered by Google's Gemini AI.
        </p>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-20"
      >
        <h2 className="text-xl font-semibold text-white tracking-tight mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: '01', title: 'Input', desc: 'Provide structured financials, a strategy brief, and optional vision data.' },
            { step: '02', title: 'Analyze', desc: 'Gemini AI processes your data through the NIA Scorecard framework and JS-SEZ regulations.' },
            { step: '03', title: 'Act', desc: 'Receive a scored assessment, strategic recommendation, zone selection, and economic projections.' },
          ].map((item, i) => (
            <div key={i} className="glass-card p-8">
              <div className="text-[11px] font-medium text-[#52525b] uppercase tracking-widest mb-4">{item.step}</div>
              <h3 className="text-[15px] font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-[#71717a] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-white tracking-tight mb-8">Platform Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="glass-card p-8"
            >
              <h3 className="text-[15px] font-semibold text-white mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-sm text-[#71717a] leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-20 pt-10 border-t border-white/[0.06]"
      >
        <h2 className="text-xl font-semibold text-white tracking-tight mb-6">Built With</h2>
        <div className="flex flex-wrap gap-3">
          {['React 18', 'Vite', 'Node.js', 'Express', 'Google Gemini AI', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons'].map((tech) => (
            <span key={tech} className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[13px] text-[#a1a1aa]">
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
