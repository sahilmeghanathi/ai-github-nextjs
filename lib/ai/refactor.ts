import { runLLM } from "./client";
import { buildRefactorPrompt } from "./prompts";

export async function generateRefactorPlan(data: any) {
  const prompt = buildRefactorPrompt(data);
  const raw = await runLLM(prompt);

  try {
    const match = raw.match(/\[[\s\S]*\]/);
    return match ? JSON.parse(match[0]) : [];
  } catch {
    return [];
  }
}