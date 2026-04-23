require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { analyzeCompany, chat } = require("./services/geminiService");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Nexus JS-SEZ Backend", timestamp: new Date().toISOString() });
});

// Main analysis endpoint
app.post("/api/analyze", async (req, res) => {
  try {
    const { financials, strategy, visionInsights } = req.body;

    if (!financials || !strategy) {
      return res.status(400).json({ error: "Missing required fields: financials and strategy" });
    }

    console.log(`[NEXUS] Analyzing company: ${financials.company_name || "Unknown"}`);
    const result = await analyzeCompany(financials, strategy, visionInsights || "No vision data provided.");

    console.log(`[NEXUS] Analysis complete for: ${financials.company_name || "Unknown"}`);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("[NEXUS] Analysis error:", error.message);
    res.status(500).json({ error: error.message || "Analysis failed. Please try again." });
  }
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, conversationHistory, analysisContext } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Missing required field: message" });
    }

    console.log(`[NEXUS Chat] User: ${message.substring(0, 80)}...`);
    const reply = await chat(message, conversationHistory || [], analysisContext || null);

    console.log(`[NEXUS Chat] Reply generated.`);
    res.json({ success: true, reply });
  } catch (error) {
    console.error("[NEXUS Chat] Error:", error.message);
    res.status(500).json({ error: error.message || "Chat failed. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`\n🧠 NEXUS JS-SEZ Backend running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
});
