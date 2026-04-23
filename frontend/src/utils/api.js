import axios from 'axios';

const API_BASE = '/api';

export async function analyzeCompany(data) {
  const response = await axios.post(`${API_BASE}/analyze`, data);
  return response.data;
}

export async function sendChatMessage(message, conversationHistory = [], analysisContext = null) {
  const response = await axios.post(`${API_BASE}/chat`, {
    message,
    conversationHistory,
    analysisContext,
  });
  return response.data;
}
