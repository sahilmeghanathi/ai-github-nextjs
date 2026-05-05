// lib/pr/prScore.ts
export function calculatePRScores(prs: any[]) {
  return prs.map((pr) => {
    const sizeScore = pr.additions < 300 ? 30 : 10;
    const reviewScore = pr.comments > 2 ? 30 : 10;
    const descScore = pr.body ? 20 : 5;

    const score = sizeScore + reviewScore + descScore;

    return {
      id: pr.id,
      title: pr.title,
      score,
    };
  });
}
