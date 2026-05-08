export function parsePartialArray(text: string): any[] {
  const results: any[] = [];
  let depth = 0;
  let start = -1;

  for (let i = 0; i < text.length; i++) {
    if (text[i] === "{") {
      if (depth === 0) start = i;
      depth++;
    } else if (text[i] === "}") {
      depth--;
      if (depth === 0 && start !== -1) {
        try {
          const obj = JSON.parse(text.slice(start, i + 1));
          results.push(obj);
        } catch {}
        start = -1;
      }
    }
  }

  return results;
}
