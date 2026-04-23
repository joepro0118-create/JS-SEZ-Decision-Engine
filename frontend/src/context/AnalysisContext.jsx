import { createContext, useContext, useState } from 'react';
import { analyzeCompany } from '../utils/api.js';

const AnalysisContext = createContext(null);

export function AnalysisProvider({ children }) {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (inputData) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeCompany(inputData);
      if (result.success) {
        setAnalysisResult(result.data);
        return { success: true };
      } else {
        setError(result.error || 'Analysis failed.');
        return { success: false };
      }
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Connection failed. Is the backend running?';
      setError(msg);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnalysisContext.Provider value={{ analysisResult, isLoading, error, handleAnalyze, setError }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) throw new Error('useAnalysis must be used within AnalysisProvider');
  return context;
}
