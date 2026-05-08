import { buildPredictionPrompt } from "@/lib/ai/prompts";
import { buildAIInput } from "@/lib/ai/buildAiInput";

export async function POST(req: Request) {
  const body = await req.json();
  const { riskHeatmap, prs, commits } = body;

  const aiInput = buildAIInput({ riskHeatmap, prs, commits });
  const prompt = buildPredictionPrompt(aiInput);

  const groqRes = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.1,
        max_tokens: 1024,
        stream: true, // 👈 enable streaming
        messages: [
          {
            role: "system",
            content:
              "You are a senior software architect. Respond only with valid JSON array, no extra text.",
          },
          { role: "user", content: prompt },
        ],
      }),
    },
  );

  // Pipe Groq's stream directly to the client
  return new Response(groqRes.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
  
}
