export async function readStream(
  endpoint: string,
  body: object,
  onChunk: (text: string) => void,
): Promise<string> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let full = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

    for (const line of lines) {
      const data = line.replace("data: ", "").trim();
      if (data === "[DONE]") continue;

      try {
        const parsed = JSON.parse(data);
        const token = parsed.choices?.[0]?.delta?.content ?? "";
        if (token) {
          full += token;
          onChunk(full); // fire on every token
        }
      } catch {}
    }
  }

  return full;
}
