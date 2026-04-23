import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import NiaScorecardDisplay from '../components/NiaScorecardDisplay.jsx';
import StrategyPanel from '../components/StrategyPanel.jsx';
import LocationMap from '../components/LocationMap.jsx';
import ImpactTable from '../components/ImpactTable.jsx';
import ReasoningLog from '../components/ReasoningLog.jsx';
import { useAnalysis } from '../context/AnalysisContext.jsx';

function SectionHeader({ number, title, subtitle }) {
  return (
    <div className="mb-10">
      <div className="text-[11px] font-medium text-[#52525b] uppercase tracking-widest mb-2">
        Section {number}
      </div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-[#71717a] mt-2 max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}

export default function ResultsPage() {
  const { analysisResult } = useAnalysis();

  if (!analysisResult) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-6">📊</div>
          <h2 className="text-2xl font-semibold text-white tracking-tight mb-3">No Results Yet</h2>
          <p className="text-[#71717a] text-sm mb-8 leading-relaxed">
            Run an analysis first to see your NIA Scorecard, strategic recommendations, 
            and economic impact projections.
          </p>
          <Link
            to="/"
            className="inline-flex px-6 py-3 rounded-xl bg-white text-[#09090b] font-semibold text-sm hover:bg-[#e4e4e7] transition-colors"
          >
            Go to Analysis
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-32 px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-16 z-40 bg-[#09090b]/90 backdrop-blur-md pt-6 pb-4 mb-12 border-b border-white/[0.06] -mx-6 px-6 lg:-mx-8 lg:px-8"
      >
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-2">
          Analysis Results
        </h1>
        <p className="text-[#71717a] text-sm">
          AI-generated insights for your JS-SEZ investment strategy.
        </p>
      </motion.div>

      {/* Sections with generous spacing */}
      <div className="space-y-24">
        {/* 1. NIA Scorecard */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SectionHeader number="01" title="NIA Scorecard Audit" subtitle="Five-pillar assessment of your National Investment Aspirations alignment." />
          <NiaScorecardDisplay scorecard={analysisResult.scorecard} />
        </motion.section>

        <div className="section-divider" />

        {/* 2. Strategy */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <SectionHeader number="02" title="Strategic Recommendation" subtitle="Twinning vs. Full Relocation analysis with specific unlock actions." />
          <StrategyPanel strategy={analysisResult.strategy} />
        </motion.section>

        <div className="section-divider" />

        {/* 3. Location */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SectionHeader number="03" title="Location Optimization" subtitle="Zone suitability comparison across Sedenak, Forest City, and Kulai." />
          <LocationMap location={analysisResult.location} />
        </motion.section>

        <div className="section-divider" />

        {/* 4. Impact */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <SectionHeader number="04" title="Economic Impact" subtitle="Before vs. after quantifiable projections for tax, ESG, and employment." />
          <ImpactTable impact={analysisResult.impact} />
        </motion.section>

        <div className="section-divider" />

        {/* 5. Reasoning */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SectionHeader number="05" title="Decision Reasoning" subtitle="Full AI reasoning log with highlighted keywords." />
          <ReasoningLog log={analysisResult.reasoning_log} />
        </motion.section>
      </div>
    </div>
  );
}
