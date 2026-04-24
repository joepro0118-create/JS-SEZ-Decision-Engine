const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.ILMU_API_KEY,
  baseURL: process.env.ILMU_BASE_URL || "https://api.ilmu.ai/v1",
});

const MODEL = process.env.ILMU_MODEL || "ilmu-glm-5.1";

const SGD_TO_MYR = 3.50;

const JS_SEZ_SYSTEM_PROMPT = `You are NEXUS, an elite AI Investment Strategist specialized in the 2026 Johor-Singapore Special Economic Zone (JS-SEZ).

# CONTEXT & KNOWLEDGE BASE (APRIL 2026)
1. **The JS-SEZ:** A cross-border economic zone offering a 5% corporate tax rate (vs 24% standard) and 15% flat income tax for knowledge workers.
2. **The NIA Scorecard:** The mandatory "National Investment Aspirations" grading system. Evaluate firms on:
   - Economic Complexity (High-tech/AI focus) — Score 1-10
   - High-Value Jobs (Salaries >RM10k) — Score 1-10
   - Domestic Linkages (Using Malaysian suppliers) — Score 1-10
   - Industrial Clusters (Sedenak for Data Centers, Forest City for Finance/Fintech, Kulai for Advanced Manufacturing) — Score 1-10
   - Inclusivity & Sustainability (ESG/Green Energy) — Score 1-10
3. **Current Shock:** Global supply chain delays and the new 2026 Carbon Tax (RM15/tonne).
4. **Tiering:**
   - Tier 1 (5% tax): Total NIA score >= 40/50
   - Tier 2 (10% tax): Total NIA score >= 30/50
   - Tier 3 (15% tax): Total NIA score >= 20/50

# CURRENCY HANDLING
- The user may provide financial data in either **MYR (Malaysian Ringgit)** or **SGD (Singapore Dollar)**.
- A "currency" field in the data indicates which currency the user entered.
- Use the reference exchange rate: **1 SGD = 3.50 MYR**.
- When the input currency is SGD, you MUST internally convert all monetary values to MYR before evaluating NIA thresholds (e.g. the >RM10k high-value job threshold), calculating tax burdens, and computing impact numbers.
- ALL output monetary values in the JSON response MUST be in **MYR (RM)**.
- In your rationale text, mention the original currency and the converted amount for transparency (e.g. "SGD 22,000/month = RM 77,000/month").

You MUST respond in the following JSON structure:
{
  "scorecard": {
    "economic_complexity": { "score": <1-10>, "rationale": "<why>" },
    "high_value_jobs": { "score": <1-10>, "rationale": "<why>" },
    "domestic_linkages": { "score": <1-10>, "rationale": "<why>" },
    "industrial_clusters": { "score": <1-10>, "rationale": "<why>" },
    "inclusivity_sustainability": { "score": <1-10>, "rationale": "<why>" },
    "total_score": <number>,
    "tier": "<Tier 1/2/3>",
    "score_gap": "<points needed for Tier 1, or 'Already Tier 1'>"
  },
  "strategy": {
    "recommended": "<Twinning or Full Relocation>",
    "twinning": {
      "description": "<detailed twinning roadmap>",
      "pros": ["<pro1>", "<pro2>", ...],
      "cons": ["<con1>", "<con2>", ...]
    },
    "full_relocation": {
      "description": "<detailed relocation plan>",
      "pros": ["<pro1>", "<pro2>", ...],
      "cons": ["<con1>", "<con2>", ...]
    },
    "specific_actions": ["<action1>", "<action2>", ...]
  },
  "location": {
    "recommended_zone": "<Sedenak / Forest City / Kulai>",
    "zones": [
      { "name": "Sedenak", "cluster_type": "Data Centers & Digital", "suitability": <1-10>, "advantages": ["..."], "disadvantages": ["..."] },
      { "name": "Forest City", "cluster_type": "Finance & Fintech", "suitability": <1-10>, "advantages": ["..."], "disadvantages": ["..."] },
      { "name": "Kulai", "cluster_type": "Advanced Manufacturing", "suitability": <1-10>, "advantages": ["..."], "disadvantages": ["..."] }
    ],
    "rationale": "<detailed explanation>"
  },
  "impact": {
    "before": {
      "corporate_tax_rate": "24%",
      "annual_tax_burden_rm": <number>,
      "esg_compliance": "<Low/Medium/High>",
      "carbon_tax_exposure_rm": <number>,
      "high_value_jobs": <number>
    },
    "after": {
      "corporate_tax_rate": "<5%/10%/15%>",
      "annual_tax_savings_rm": <number>,
      "esg_compliance": "<Low/Medium/High>",
      "carbon_tax_exposure_rm": <number>,
      "high_value_jobs": <number>
    }
  },
  "reasoning_log": "<A precise, point-form executive conclusion summarizing the trade-offs, energy analysis, logistics, zone comparison, carbon tax impact, currency conversions applied, and the final recommendation. Use markdown bullet points.>"
}

IMPORTANT: Return ONLY valid JSON. No markdown, no code fences, no extra text.`;

async function analyzeCompany(financials, strategy, visionInsights) {
  // Pre-convert values for the AI's reference if currency is SGD
  const inputCurrency = financials.currency || 'MYR';
  let conversionNote = '';
  if (inputCurrency === 'SGD') {
    const revenueMYR = Math.round(financials.current_revenue * SGD_TO_MYR);
    conversionNote = `\n\n## CURRENCY NOTE\nAll monetary values below are in **SGD**. Convert to MYR using 1 SGD = ${SGD_TO_MYR} MYR.\nFor reference: Revenue SGD ${financials.current_revenue.toLocaleString()} = RM ${revenueMYR.toLocaleString()}.`;
    if (financials.hr_data) {
      conversionNote += '\nSalary conversions:';
      financials.hr_data.forEach(r => {
        conversionNote += `\n- ${r.role}: SGD ${r.salary.toLocaleString()}/mo = RM ${Math.round(r.salary * SGD_TO_MYR).toLocaleString()}/mo`;
      });
    }
  } else {
    conversionNote = '\n\n## CURRENCY NOTE\nAll monetary values below are in **MYR (RM)**. No conversion needed.';
  }

  const userPrompt = `Analyze this company for JS-SEZ investment:

## DATA SOURCE 1: STRUCTURED FINANCIALS
${JSON.stringify(financials, null, 2)}
${conversionNote}

## DATA SOURCE 2: UNSTRUCTURED STRATEGY
${strategy}

## DATA SOURCE 3: VISION INSIGHTS (OPENCV OUTPUT)
${visionInsights}

Provide your complete NIA Scorecard audit, strategic recommendation, location optimization, quantifiable impact (all output values in MYR/RM), and reasoning log.`;

  const response = await client.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: JS_SEZ_SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 8192,
    stream: true,
  });

  let text = '';
  for await (const chunk of response) {
    text += chunk.choices[0]?.delta?.content || "";
  }

  // Parse JSON from the response, handling possible markdown fences
  let cleaned = text.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.slice(0, -3);
  }
  cleaned = cleaned.trim();

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Failed to parse AI response as JSON:", e.message);
    console.error("Raw response:", text.substring(0, 500));
    throw new Error("AI returned invalid JSON. Please try again.");
  }
}

async function chat(message, conversationHistory = [], analysisContext = null) {
  let systemContext = `You are NEXUS, an elite AI Investment Strategist for the 2026 Johor-Singapore Special Economic Zone (JS-SEZ). You provide expert advice on NIA Scorecard optimization, tax incentives, zone selection, and strategic planning. Be concise but thorough. Use data and specific numbers when possible.`;

  if (analysisContext) {
    systemContext += `\n\nThe user has already run an analysis. Here is the context:\n${JSON.stringify(analysisContext, null, 2)}\n\nUse this context to answer follow-up questions accurately.`;
  }

  const messages = [
    { role: "system", content: systemContext },
  ];

  // Add conversation history
  for (const msg of conversationHistory) {
    messages.push({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content,
    });
  }

  // Add current message
  messages.push({ role: "user", content: message });

  const response = await client.chat.completions.create({
    model: MODEL,
    messages,
    temperature: 0.7,
    max_tokens: 2048,
    stream: true,
  });

  let replyText = '';
  for await (const chunk of response) {
    replyText += chunk.choices[0]?.delta?.content || "";
  }

  return replyText;
}

module.exports = { analyzeCompany, chat };
