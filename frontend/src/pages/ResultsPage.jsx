import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import NiaScorecardDisplay from '../components/NiaScorecardDisplay.jsx';
import StrategyPanel from '../components/StrategyPanel.jsx';
import LocationMap from '../components/LocationMap.jsx';
import ImpactTable from '../components/ImpactTable.jsx';
import ReasoningLog from '../components/ReasoningLog.jsx';
import { useAnalysis } from '../context/AnalysisContext.jsx';
import { FileText, ChevronRight, Activity, MapPin, TrendingUp, Zap } from 'lucide-react';

// Upgraded Section Header: Centered layout with distinct badging
function SectionHeader({ number, title, subtitle, icon: Icon }) {
  return (
    <div className="relative mb-14 flex flex-col items-center text-center">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)] mb-6">
        <span className="text-lg font-black tracking-widest">{number}</span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight flex items-center justify-center gap-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base text-zinc-400 mt-4 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// Centered Executive Summary
function ExecutiveSummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="mb-24 p-10 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col items-center text-center mx-auto max-w-4xl"
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
        <FileText className="w-6 h-6 text-blue-400" />
        Executive Summary
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full text-left">
        {[
          { icon: Activity, label: "NIA Alignment", desc: "Your baseline operational data has been scored across 5 core investment pillars." },
          { icon: Zap, label: "Strategic Action", desc: "Clear recommendations formulated for Twinning vs. Full Relocation to maximize incentives." },
          { icon: MapPin, label: "Zone Selection", desc: "Suitability matrices generated for Sedenak, Forest City, and Kulai clusters." },
          { icon: TrendingUp, label: "Economic Impact", desc: "Quantifiable projections calculated for tax optimization and ESG compliance." }
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-5 group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-all">
            <div className="mt-1 p-2.5 rounded-xl bg-zinc-800/80 text-zinc-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors shadow-inner">
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-zinc-100 block text-base mb-1.5">{item.label}</strong>
              <span className="text-zinc-400 text-sm leading-relaxed">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ResultsPage() {
  const { analysisResult } = useAnalysis();

  if (!analysisResult) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg p-12 rounded-[2.5rem] bg-zinc-900/20 border border-dashed border-white/10 backdrop-blur-sm"
        >
          <div className="w-20 h-20 mx-auto bg-blue-500/10 border border-blue-500/20 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <Activity className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-4">Awaiting Data</h2>
          <p className="text-zinc-400 text-sm mb-10 leading-relaxed max-w-md mx-auto">
            The visualization engine is standing by. Run your initial data ingestion to generate the NIA Scorecard, location matrices, and strategic projections.
          </p>
          <Link
            to="/"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-zinc-950 font-bold text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Configure Analysis
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col items-center">
      {/* Dynamic Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
            Analysis Complete
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 tracking-tight">
          JS-SEZ Intelligence Report
        </h1>
      </motion.div>

      {/* Point-Form Executive Summary */}
      <div className="w-full">
        <ExecutiveSummary />
      </div>

      {/* Structured Content Sections */}
      <div className="space-y-32 w-full max-w-5xl">
        
        {/* 1. NIA Scorecard */}
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <SectionHeader
            number="01"
            title="NIA Scorecard Audit"
            subtitle="Five-pillar assessment of your National Investment Aspirations alignment."
          />
          <div className="w-full mx-auto">
            <NiaScorecardDisplay scorecard={analysisResult.scorecard} />
          </div>
        </motion.section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* 2. Strategy */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
          <SectionHeader
            number="02"
            title="Strategic Recommendation"
            subtitle="Twinning vs. Full Relocation analysis with specific unlock actions."
          />
          <div className="w-full mx-auto">
            <StrategyPanel strategy={analysisResult.strategy} />
          </div>
        </motion.section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* 3. Location */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
          <SectionHeader
            number="03"
            title="Location Optimization"
            subtitle="Zone suitability comparison across Sedenak, Forest City, and Kulai."
          />
          <div className="w-full mx-auto">
            <LocationMap location={analysisResult.location} />
          </div>
        </motion.section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* 4. Impact */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
          <SectionHeader
            number="04"
            title="Economic Impact"
            subtitle="Before vs. after quantifiable projections for tax, ESG, and employment."
          />
          <div className="w-full mx-auto">
            <ImpactTable impact={analysisResult.impact} />
          </div>
        </motion.section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* 5. Reasoning */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
          <SectionHeader
            number="05"
            title="Decision Reasoning"
            subtitle="Precise executive conclusions formulated from your data matrix."
          />
          <div className="w-full mx-auto">
            <ReasoningLog log={analysisResult.reasoning_log} />
          </div>
        </motion.section>

      </div>
    </div>
  );
}