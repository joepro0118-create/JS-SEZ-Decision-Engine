import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HeroSection from '../components/HeroSection.jsx';
import DataInputPanel from '../components/DataInputPanel.jsx';
import LoadingOverlay from '../components/LoadingOverlay.jsx';
import { useAnalysis } from '../context/AnalysisContext.jsx';

export default function HomePage() {
  const { handleAnalyze, isLoading, error } = useAnalysis();
  const navigate = useNavigate();

  const onAnalyze = async (inputData) => {
    const result = await handleAnalyze(inputData);
    if (result.success) {
      navigate('/results');
    }
  };

  return (
    <>
      <HeroSection />

      <section id="analysis-section" className="px-6 lg:px-8 max-w-4xl mx-auto py-20">
        <DataInputPanel onAnalyze={onAnalyze} isLoading={isLoading} />
      </section>

      {error && (
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <div className="glass-card p-5 text-center">
            <p className="text-[#ef4444] text-sm font-medium">⚠️ {error}</p>
          </div>
        </div>
      )}

      <AnimatePresence>
        {isLoading && <LoadingOverlay />}
      </AnimatePresence>
    </>
  );
}
