export function buildPredictionPrompt(input: {
  topRiskFiles: any[];
  prSummary: any;
  commitSummary: any;
}) {
  console.log("Building prediction prompt with input:", input);

  // topRiskFiles already comes pre-filtered/sorted from buildAIInput
  const highRiskFiles = (input.topRiskFiles ?? [])
    .filter((f) => f.level === "high")
    .slice(0, 10);

  return `
You are a senior engineer performing risk prediction.

High Risk Files:
${JSON.stringify(highRiskFiles.length ? highRiskFiles : input.topRiskFiles?.slice(0, 10), null, 2)}

PR Summary:
${JSON.stringify(input.prSummary, null, 2)}

Commit Summary:
${JSON.stringify(input.commitSummary, null, 2)}

Tasks:
1. Predict which files/modules are most likely to cause bugs
2. Explain WHY using engineering reasoning
3. Avoid generic statements

Output format:
[
  {
    "file": "...",
    "risk": "High | Medium | Low",
    "reason": "clear explanation"
  }
]
`;
}

export function buildRefactorPrompt(input: {
  topRiskFiles: any[];
  prSummary: any;
  commitSummary: any;
}) {
  const risky = (input.topRiskFiles ?? [])
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return `
You are a staff engineer.

High Risk Files:
${JSON.stringify(risky, null, 2)}

Generate a refactoring plan:
- Step-by-step
- Prioritized
- Concrete actions (not vague)

Output as:
[
  {
    "step": "...",
    "impact": "...",
    "priority": "High | Medium | Low"
  }
]
`;
}