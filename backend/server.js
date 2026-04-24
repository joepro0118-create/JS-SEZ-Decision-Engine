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

// Main analysis endpoint — accepts { financials, strategy, visionInsights }
app.post("/api/analyze", async (req, res) => {
  try {
    const { financials, strategy, visionInsights } = req.body;

    if (!financials || !financials.company_name) {
      return res.status(400).json({ error: "Missing required field: financials.company_name" });
    }
    if (!strategy) {
      return res.status(400).json({ error: "Missing required field: strategy" });
    }

    const visionData = visionInsights || "No vision data provided.";

    console.log(`[NEXUS] Analyzing company: ${financials.company_name}`);

    const result = await analyzeCompany(financials, strategy, visionData);

    console.log(`[NEXUS] Analysis complete for: ${financials.company_name}`);
    res.json({ success: true, data: result });

  } catch (error) {
    console.error("[NEXUS] Analysis error:", error.message);
    res.status(500).json({ error: error.message || "Analysis failed. Please try again." });
  }
});

// AI Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, conversationHistory, analysisContext } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    console.log(`[NEXUS] Processing chat message...`);

    const reply = await chat(message, conversationHistory, analysisContext);

    res.json({ success: true, reply });

  } catch (error) {
    console.error("[NEXUS] Chat error:", error.message);
    res.status(500).json({ error: error.message || "Chat failed. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`[NEXUS] Server is running on port ${PORT}`);
});
