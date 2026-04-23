import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STATUS_MESSAGES = [
  { text: "Parsing financial data...", icon: "📊" },
  { text: "Analyzing NIA Scorecard pillars...", icon: "📋" },
  { text: "Evaluating automation density...", icon: "🤖" },
  { text: "Simulating tax scenarios...", icon: "💰" },
  { text: "Comparing Kulai vs Sedenak clusters...", icon: "🗺️" },
  { text: "Calculating carbon tax exposure...", icon: "🌱" },
  { text: "Optimizing twinning strategy...", icon: "🔗" },
  { text: "Generating decision intelligence...", icon: "🧠" },
];

export default function LoadingOverlay() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 3 + 0.5, 95));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070b14]/95 backdrop-blur-xl"
    >
      {/* Fixed-size container so nothing shifts */}
      <div className="flex flex-col items-center w-[400px]">

        {/* Animated rings — fixed size, never moves */}
        <div className="relative w-32 h-32 mb-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#06d6a0] border-r-[#06d6a0]/30"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-3 rounded-full border-2 border-transparent border-t-[#6366f1] border-l-[#6366f1]/30"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-6 rounded-full border-2 border-transparent border-b-[#f59e0b] border-r-[#f59e0b]/30"
          />
          {/* Center brain icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl"
            >
              🧠
            </motion.span>
          </div>
        </div>

        {/* NEXUS label — static */}
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs font-mono text-[#06d6a0] tracking-[0.3em] uppercase mb-6"
        >
          NEXUS PROCESSING
        </motion.p>

        {/* Status message — fixed height container, only text crossfades */}
        <div className="h-10 w-full relative mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center justify-center gap-3"
            >
              <span className="text-xl">{STATUS_MESSAGES[currentIndex].icon}</span>
              <span className="text-base text-[#e2e8f0] font-medium">
                {STATUS_MESSAGES[currentIndex].text}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar — fixed width, never changes size */}
        <div className="w-72 h-1 bg-[#1e293b] rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#06d6a0] to-[#6366f1]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
        <p className="text-xs text-[#64748b]">
          Step {currentIndex + 1} of {STATUS_MESSAGES.length}
        </p>
      </div>
    </motion.div>
  );
}

