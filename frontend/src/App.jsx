import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnalysisProvider } from './context/AnalysisContext.jsx';
import Navbar from './components/Navbar.jsx';
import AiChatBox from './components/AiChatBox.jsx';
import HomePage from './pages/HomePage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import AnalysisPage from './pages/AnalysisPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import { useAnalysis } from './context/AnalysisContext.jsx';

function AppContent() {
  const location = useLocation();
  const { analysisResult } = useAnalysis();
  const isChatPage = location.pathname === '/chat';

  return (
    <div className="min-h-screen bg-[#09090b]">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </main>

      {/* Show floating chatbox on all pages except the dedicated chat page */}
      {!isChatPage && <AiChatBox analysisContext={analysisResult} />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnalysisProvider>
        <AppContent />
      </AnalysisProvider>
    </BrowserRouter>
  );
}

