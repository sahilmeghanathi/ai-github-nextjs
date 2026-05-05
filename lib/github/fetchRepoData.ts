// lib/github/fetchRepoData.ts
export async function fetchRepoData(repo: string) {
  const [commitsRes, prsRes] = await Promise.all([
    fetch(`https://api.github.com/repos/${repo}/commits?per_page=100`),
    fetch(`https://api.github.com/repos/${repo}/pulls?state=all`),
  ]);

  const commits = await commitsRes.json();
  const prs = await prsRes.json();

  return { commits, prs };
}
