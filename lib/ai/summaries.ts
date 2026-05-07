export function buildPRSummary(prs: any[]) {
  if (!prs.length) return {};

  const totalPRs = prs.length;

  const avgSize =
    prs.reduce((acc, pr) => acc + (pr.additions || 0), 0) / totalPRs;

  const avgComments =
    prs.reduce((acc, pr) => acc + (pr.comments || 0), 0) / totalPRs;

  const largePRs = prs.filter((pr) => pr.additions > 300).length;

  return {
    totalPRs,
    avgPRSize: Math.round(avgSize),
    avgComments: Math.round(avgComments),
    largePRRatio: Number((largePRs / totalPRs).toFixed(2)),
  };
}



export function buildCommitSummary(commits: any[]) {
  if (!commits.length) return {};

  const totalCommits = commits.length;

  const timestamps = commits.map((c) =>
    new Date(c.date).getTime()
  );

  timestamps.sort();

  let burstCommits = 0;

  for (let i = 1; i < timestamps.length; i++) {
    const diff = timestamps[i] - timestamps[i - 1];

    if (diff < 1000 * 60 * 60) {
      burstCommits++;
    }
  }

  const contributors = new Set(commits.map((c) => c.author));

  return {
    totalCommits,
    commitBurstiness: Number(
      (burstCommits / totalCommits).toFixed(2)
    ),
    uniqueContributors: contributors.size,
  };
}