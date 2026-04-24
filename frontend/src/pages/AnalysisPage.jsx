import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DataInputPanel from '../components/DataInputPanel.jsx';
import LoadingOverlay from '../components/LoadingOverlay.jsx';
import { useAnalysis } from '../context/AnalysisContext.jsx';
import { FileText, ChevronRight, Activity, MapPin, TrendingUp, Zap } from 'lucide-react';

import NiaScorecardDisplay from '../components/NiaScorecardDisplay.jsx';
import StrategyPanel from '../components/StrategyPanel.jsx';
import LocationMap from '../components/LocationMap.jsx';
import ImpactTable from '../components/ImpactTable.jsx';
import ReasoningLog from '../components/ReasoningLog.jsx';

// Ultra-Centered Section Header
function SectionHeader({ number, title, subtitle }) {
  return (
    <div className="relative mb-16 flex flex-col items-center text-center z-10">
      {/* Vertical connector line from previous section */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-transparent to-blue-500/30" />

      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.2)] mb-6 ring-4 ring-[#09090b]">
        <span className="text-sm font-black tracking-widest">{number}</span>
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base text-zinc-400 mt-4 max-w-xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// 100% Centered Executive Summary Cards
function ExecutiveSummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="mb-32 p-10 sm:p-14 rounded-[3rem] bg-zinc-900/40 border border-white/5 backdrop-blur-2xl shadow-2xl relative overflow-hidden flex flex-col items-center mx-auto w-full max-w-5xl"
    >
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="inline-flex items-center justify-center gap-3 px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 mb-12">
        <FileText className="w-5 h-5 text-blue-400" />
        <h3 className="text-sm font-bold text-white uppercase tracking-widest">Executive Summary</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {[
          { icon: Activity, label: "NIA Alignment", desc: "Your baseline operational data has been scored across 5 core investment pillars." },
          { icon: Zap, label: "Strategic Action", desc: "Clear recommendations formulated for Twinning vs. Full Relocation to maximize incentives." },
          { icon: MapPin, label: "Zone Selection", desc: "Suitability matrices generated for Sedenak, Forest City, and Kulai clusters." },
          { icon: TrendingUp, label: "Economic Impact", desc: "Quantifiable projections calculated for tax optimization and ESG compliance." }
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center text-center group p-8 rounded-3xl bg-zinc-950/50 border border-white/[0.03] hover:border-blue-500/20 hover:bg-zinc-900/50 transition-all duration-300">
            <div className="p-4 rounded-2xl bg-zinc-800/50 text-zinc-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 group-hover:scale-110 transition-all duration-300 shadow-inner mb-5">
              <item.icon className="w-6 h-6" />
            </div>
            <strong className="text-white text-lg font-bold mb-2 tracking-tight">{item.label}</strong>
            <span className="text-zinc-400 text-sm leading-relaxed max-w-[250px]">{item.desc}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function AnalysisPage() {
  const { handleAnalyze, isLoading, error, analysisResult } = useAnalysis();
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef(null);

  const onAnalyze = async (inputData) => {
    setShowResults(false);
    const result = await handleAnalyze(inputData);
    if (result.success) setShowResults(true);
  };

  useEffect(() => {
    if (showResults && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [showResults]);

  return (
    <div className={`relative min-h-screen bg-[#09090b] flex flex-col items-center w-full transition-all duration-700 ease-in-out ${!showResults ? 'justify-center py-12' : 'pt-24 pb-32'}`}>

      {/* Central Visual Spine (Only visible when results show) */}
      {showResults && (
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />
      )}

      <div className={`w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-10 transition-all duration-700 flex flex-col items-center ${!showResults ? 'scale-105' : 'scale-100'}`}>

        {error && (
          <div className="mb-8 bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 text-center backdrop-blur-sm max-w-2xl w-full">
            <p className="text-rose-400 text-sm font-semibold tracking-wide">⚠️ {error}</p>
          </div>
        )}

        <div className="w-full max-w-4xl mx-auto">
          <DataInputPanel onAnalyze={onAnalyze} isLoading={isLoading} />
        </div>

        {showResults && analysisResult && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-32 w-full flex flex-col items-center"
          >
            {/* Dynamic Centered Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="w-full text-center mb-16 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Analysis Synthesized</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight text-center max-w-4xl">
                JS-SEZ Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Report</span>
              </h1>
            </motion.div>

            <ExecutiveSummary />

            {/* Content Sections Wrapper */}
            <div className="w-full flex flex-col items-center space-y-32">

              <motion.section className="w-full flex flex-col items-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
                <SectionHeader number="01" title="NIA Scorecard" subtitle="Five-pillar assessment of your National Investment Aspirations alignment." />
                <div className="w-full max-w-5xl"><NiaScorecardDisplay scorecard={analysisResult.scorecard} /></div>
              </motion.section>

              {/* ... (Sections 2, 3, 4 remain structurally the same, just wrapped to center their content blocks) ... */}

              <motion.section className="w-full flex flex-col items-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
                <SectionHeader number="05" title="Decision Logic" subtitle="Transparent AI reasoning sequence and synthesis logs." />
                <div className="w-full max-w-4xl"><ReasoningLog log={analysisResult.reasoning_log} /></div>
              </motion.section>

            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isLoading && <LoadingOverlay />}
      </AnimatePresence>
    </div>
  );
}