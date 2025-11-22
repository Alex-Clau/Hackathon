import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("CRITICAL ERROR: GEMINI_API_KEY is missing from .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

let cachedModelName = null;

async function findAvailableModel() {
  if (cachedModelName) {
    return cachedModelName;
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    if (response.ok) {
      const data = await response.json();

      if (data.models && Array.isArray(data.models)) {
        const visionModels = data.models
          .filter(m => m.supportedGenerationMethods?.includes('generateContent'))
          .map(m => m.name.replace('models/', ''))
          .filter(name => name.includes('gemini'));

        if (visionModels.length > 0) {
          const preferred = visionModels.find(m => m.includes('flash')) || visionModels[0];
          cachedModelName = preferred;
          return cachedModelName;
        }
      }
    }
  } catch (e) {
    console.warn('Could not list models via API, trying defaults');
  }

  const defaultModels = [
    "gemini-2.0-flash",
    "gemini-2.5-flash",
    "gemini-2.0-flash-001",
    "gemini-2.5-pro"
  ];

  for (const modelName of defaultModels) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const testResult = await model.generateContent("test");
      if (testResult && testResult.response) {
        cachedModelName = modelName;
        return modelName;
      }
    } catch (e) {
      const errorMsg = e.message || e.toString() || '';
      if (!errorMsg.includes("404") && !errorMsg.includes("not found")) {
        cachedModelName = modelName;
        return modelName;
      }
    }
  }

  console.warn('⚠️ No model found via detection, defaulting to gemini-2.0-flash');
  cachedModelName = "gemini-2.0-flash";
  return cachedModelName;
}

export const estimateBulkQuality = async (base64Image) => {
  if (!base64Image) {
    throw new Error('Image data required');
  }

  // --- CHANGED PROMPT STARTS HERE ---
  const prompt = `
    Act as a strict recycling scanner for CLOTHES and SHOES only.
    
    First, IDENTIFY the item.
    
    🔴 IF ITEM IS NOT CLOTHING/SHOES (e.g., Electronics, Food, Bottles, Trash, Furniture, Tools):
    - FORCE "tier": "REJECT"
    - FORCE "qualityScore": 0
    - "conditionSummary": "Non-textile item detected ([Item Name])"
    
    🟢 IF ITEM IS CLOTHING/SHOES:
    - Grade based on condition:
      - DONATE (Score 70-100): Clean, no damage, looks new.
      - RECYCLE (Score 40-69): Wear visible, pilling, fading, small reclaimable defects.
      - REJECT (Score 0-39): Wet, moldy, oil-stained, hazardous, or shredded.

    Return ONLY valid JSON (no markdown):
    {
      "tier": "DONATE" | "RECYCLE" | "REJECT",
      "qualityScore": 0-100,
      "confidence": 0-100,
      "detectedItem": "Short name of object seen",
      "conditionSummary": "brief description",
      "recommendation": "action advice"
    }
  `;
  // --- CHANGED PROMPT ENDS HERE ---

  const modelsToTry = cachedModelName
    ? [cachedModelName]
    : [
      "gemini-2.0-flash",
      "gemini-2.5-flash",
      "gemini-2.0-flash-001",
      "gemini-2.5-pro",
      "gemini-flash-latest"
    ];

  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });

      const result = await model.generateContent([
        prompt,
        { inlineData: { mimeType: "image/jpeg", data: base64Image } }
      ]);

      if (!cachedModelName) {
        cachedModelName = modelName;
      }

      const responseText = result.response.text();

      let cleanJson = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      const jsonMatch = cleanJson.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanJson = jsonMatch[0];
      }

      const parsedResult = JSON.parse(cleanJson);

      if (!parsedResult.tier || parsedResult.qualityScore === undefined) {
        throw new Error('Invalid AI response format');
      }

      return {
        tier: parsedResult.tier,
        qualityScore: Math.min(100, Math.max(0, Math.round(parsedResult.qualityScore || 50))),
        confidence: Math.min(100, Math.max(0, Math.round(parsedResult.confidence || 80))),
        detectedItem: parsedResult.detectedItem || "Unknown Object", // Added this field to return object
        conditionSummary: parsedResult.conditionSummary || 'Condition assessed',
        recommendation: parsedResult.recommendation || 'Follow standard procedures'
      };

    } catch (e) {
      const errorMsg = e.message || e.toString() || '';
      if (errorMsg.includes("404") || errorMsg.includes("not found") || errorMsg.includes("is not found")) {
        lastError = e;
        if (modelName === modelsToTry[modelsToTry.length - 1]) {
          break;
        }
        continue;
      }
      throw e;
    }
  }

  if (lastError) {
    console.error("AI Analysis Failed - All models returned 404:", lastError.message);
    return {
      tier: "RECYCLE",
      qualityScore: 50,
      confidence: 0,
      conditionSummary: "AI Busy - Please Check Manually",
      recommendation: "Manual Inspection Required"
    };
  }
};