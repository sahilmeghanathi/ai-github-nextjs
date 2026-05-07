import { runLLM } from "./client";
import { buildPredictionPrompt } from "./prompts";

export async function generatePredictions(data: any) {
  const prompt = buildPredictionPrompt(data);
  const raw = await runLLM(prompt);

  try {
    const match = raw.match(/\[[\s\S]*\]/);
    return match ? JSON.parse(match[0]) : [];
  } catch {
    return [];
  }
}