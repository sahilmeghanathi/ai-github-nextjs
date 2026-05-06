const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;



// }
const githubHeaders: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(GITHUB_TOKEN && {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
  }),
};
// --------------------
// Types
// --------------------

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
}

interface CommitFile {
  filename: string;
  additions: number;
  deletions: number;
  changes: number;
}

interface CommitDetails extends Commit {
  files?: CommitFile[];
}

interface PullRequest {
  id: number;
  title: string;
  state: "open" | "closed";
  created_at: string;
  merged_at: string | null;
}

interface RepoData {
  commits: CommitDetails[]; 
  prs: PullRequest[];
}

// --------------------
// Generic Fetch Helper
// --------------------

async function fetchGitHub<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: githubHeaders });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(
      `GitHub API error [${res.status} ${res.statusText}] for ${url}: ${errText}`,
    );
  }

  return res.json() as Promise<T>;
}

// --------------------
// Fetch Commit Details
// --------------------

async function fetchCommitDetails(
  repo: string,
  sha: string,
): Promise<CommitDetails> {
  return fetchGitHub<CommitDetails>(
    `${GITHUB_API_BASE}/repos/${repo}/commits/${sha}`,
  );
}

// --------------------
// Main Fetch Function
// --------------------

export async function fetchRepoData(repo: string): Promise<RepoData> {
  if (!repo || !/^[\w.-]+\/[\w.-]+$/.test(repo)) {
    throw new Error(
      `Invalid repo format. Expected "owner/repo", got "${repo}"`,
    );
  }

  const [commits, prs] = await Promise.all([
    fetchGitHub<Commit[]>(
      `${GITHUB_API_BASE}/repos/${repo}/commits?per_page=30`,
    ),
    fetchGitHub<PullRequest[]>(
      `${GITHUB_API_BASE}/repos/${repo}/pulls?state=all&per_page=100`,
    ),
  ]);

  // --------------------
  // Fetch detailed commits safely
  // --------------------

  const detailedCommits: CommitDetails[] = await Promise.all(
    commits.map(async (c) => {
      try {
        const details = await fetchCommitDetails(repo, c.sha);
        return details;
      } catch (err) {
        console.warn("Failed to fetch commit details:", c.sha);
        return c;
      }
    }),
  );

  console.log(
    `[fetchRepoData] repo=${repo} commits=${detailedCommits.length} prs=${prs.length}`,
  );

  return {
    commits: detailedCommits,
    prs,
  };
}