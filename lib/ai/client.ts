// lib/ai/client.ts

// Validate environment variables
if (!process.env.GROQ_API_KEY) {
  throw new Error(
    "Missing GROQ_API_KEY environment variable. Please set GROQ_API_KEY in your .env file.",
  );
}

export async function runLLM(prompt: string): Promise<string> {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.3,
        max_tokens: 1024,
        messages: [
          {
            role: "system",
            content:
              "You are a senior software architect analyzing GitHub repositories.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq API error [${response.status}]: ${err}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? "";
}
