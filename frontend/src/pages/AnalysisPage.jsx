import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DataInputPanel from '../components/DataInputPanel.jsx';
import LoadingOverlay from '../components/LoadingOverlay.jsx';
import { useAnalysis } from '../context/AnalysisContext.jsx';
import { FileText, ChevronRight, Activity, MapPin, TrendingUp, Zap, BrainCircuit, BarChart3, Navigation, Shield } from 'lucide-react';

import NiaScorecardDisplay from '../components/NiaScorecardDisplay.jsx';
import StrategyPanel from '../components/StrategyPanel.jsx';
import LocationMap from '../components/LocationMap.jsx';
import ImpactTable from '../components/ImpactTable.jsx';
import ReasoningLog from '../components/ReasoningLog.jsx';

// Result Section Card — wraps each result block in a premium container
function ResultCard({ icon: Icon, label, number, children, span = 1 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`result-card ${span === 2 ? 'result-card--full' : ''}`}
    >
      {/* Top glow accent */}
      <div className="result-card__glow" />

      {/* Header */}
      <div className="result-card__header">
        <div className="result-card__icon-wrap">
          <Icon className="w-5 h-5" />
        </div>
        <div className="result-card__meta">
          <span className="result-card__number">{number}</span>
          <h3 className="result-card__title">{label}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="result-card__body">
        {children}
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

      <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10 transition-all duration-700 flex flex-col items-center ${!showResults ? 'scale-105' : 'scale-100'}`}>

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
            {/* Results Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="w-full text-center mb-16 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Analysis Synthesized</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight text-center max-w-4xl">
                JS-SEZ Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Report</span>
              </h1>
              <p className="text-zinc-500 mt-5 text-lg max-w-xl">
                AI-generated strategic analysis based on your company profile and market parameters.
              </p>
            </motion.div>

            {/* ═══ 2-COLUMN GRID LAYOUT ═══ */}
            <div className="results-grid w-full">

              {/* NIA Scorecard — full width */}
              <ResultCard icon={Shield} label="NIA Scorecard" number="01" span={2}>
                <NiaScorecardDisplay scorecard={analysisResult.scorecard} />
              </ResultCard>

              {/* Strategy + Location — side by side */}
              <ResultCard icon={Navigation} label="Strategic Pathways" number="02">
                <StrategyPanel strategy={analysisResult.strategy} />
              </ResultCard>

              <ResultCard icon={MapPin} label="Zone Selection" number="03">
                <LocationMap location={analysisResult.location} />
              </ResultCard>

              {/* Impact — full width */}
              <ResultCard icon={BarChart3} label="Financial Impact" number="04" span={2}>
                <ImpactTable impact={analysisResult.impact} />
              </ResultCard>

              {/* Decision Logic — full width, always visible */}
              <ResultCard icon={BrainCircuit} label="Decision Logic" number="05" span={2}>
                <ReasoningLog log={analysisResult.reasoning_log} />
              </ResultCard>

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