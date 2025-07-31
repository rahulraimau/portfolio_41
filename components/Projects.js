
import { useEffect, useState } from 'react';

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch('/api/github');
        const data = await res.json();
        if (Array.isArray(data)) {
          setRepos(data);
        } else {
          throw new Error(data.error || "Unexpected response from GitHub API");
        }
      } catch (err) {
        console.error("GitHub API error:", err.message);
        setError("❌ Failed to load GitHub repositories.");
      }
    }
    fetchRepos();
  }, []);

  return (
    <section id="projects" className="py-20 px-6">
      <h2 className="text-2xl font-bold mb-6">GitHub Projects</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid md:grid-cols-2 gap-4">
        {repos.map(repo => (
          <div key={repo.id} className="p-4 border rounded shadow hover:shadow-lg transition">
            <h3 className="font-semibold">{repo.name}</h3>
            <p className="text-sm text-gray-600">{repo.description}</p>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm underline">
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
