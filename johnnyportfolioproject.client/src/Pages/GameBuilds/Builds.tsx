
import { useEffect, useState } from "react";
import { Settings } from "lucide-react";

const REPOS = [
  { owner: "jlarnett", name: "Campus_SMS" },
  { owner: "jlarnett", name: "JohnnyPortfolioProject" },
  { owner: "jlarnett", name: "NHASoftware" },
];

interface WorkflowRun {
  id: number;
  name: string;
  status: string;
  conclusion: string | null;
  head_commit?: {
    message: string;
  };
  created_at: string;
  html_url: string;
}

export interface Build {
  id: number;
  name: string;
  status: string;
  conclusion: string | null;
  commitMessage?: string;
  timestamp: string;
  url: string;
}
const GITHUB_TOKEN = ""; // Optional if repos are public

export default function MultiRepoBuildGallery() {
  const [repoBuilds, setRepoBuilds] = useState<Record<string, Build[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuilds = async () => {
    const buildsByRepo: Record<string, Build[]> = {};

      for (const repo of REPOS) {
        try {
          const res = await fetch(
            `https://api.github.com/repos/${repo.owner}/${repo.name}/actions/runs?per_page=5`,
            {
              headers: GITHUB_TOKEN
                ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
                : {},
            }
          );
          const data = await res.json();

          buildsByRepo[repo.name] = data.workflow_runs.map((run: WorkflowRun) => ({
            id: run.id,
            name: run.name,
            status: run.status,
            conclusion: run.conclusion,
            commitMessage: run.head_commit?.message,
            timestamp: new Date(run.created_at).toLocaleString(),
            url: run.html_url,
          }));
        } catch (err) {
          console.error(`Failed to fetch builds for ${repo.name}`, err);
        }
      }

      setRepoBuilds(buildsByRepo);
      setLoading(false);
    };

    fetchBuilds();
  }, []);

  return (
    <div className="min-h-screen px-4 py-10 border border-zinc-300 rounded-2xl dark:text-zinc-200 dark:text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center flex items-center justify-center gap-3">
          <Settings className="w-20 h-20 text-green-600 animate-spin" style={{ animationDuration: '10s' }} />
          Deployments
        </h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading builds...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(repoBuilds).map(([repoName, builds]) => (
              <div key={repoName} className="mb-6">
                <h2 className="text-xl font-semibold mb-3 text-zinc-700 border-b border-zinc-600 pb-1 dark:text-zinc-300">
                  {repoName}
                </h2>
                <div className="space-y-4 border-l border-r border-zinc-600 p-4 h-full">
                  {builds.map((run) => (
                    <a
                      key={run.id}
                      href={run.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group rounded-lg overflow-hidden shadow-lg bg-neutral-900 hover:scale-[1.02] hover:shadow-xl transition no-underline grou-hover:no-underline hover:no-underline"
                    >
                      <div className="p-4">
                        <h3 className="text-md font-semibold group-hover:text-blue-400 transition text-zinc-300">
                          {run.name}
                        </h3>
                        <p className="text-sm text-zinc-200 mt-1">
                          {run.commitMessage}
                        </p>
                        <p className="text-xs text-red-700">{run.timestamp}</p>
                        <span
                          className={`mt-2 inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            run.conclusion === "success"
                              ? "bg-green-800 text-green-300"
                              : run.conclusion === "failure"
                              ? "bg-red-800 text-red-300"
                              : "bg-yellow-800 text-yellow-300"
                          }`}
                        >
                          {run.conclusion ?? run.status}
                        </span>
                      </div>
                        <hr />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
