import React,{ useEffect, useState } from "react";

interface GitHubUser {
  avatar_url: string;
  name: string;
  bio: string;
  followers: number;
  public_repos: number;
  html_url: string;
  repos_url: string;
}

interface GitHubRepo {
  name: string;
  html_url: string;
  description: string;
}

export default function About() {
  const [githubData, setGithubData] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const response = await fetch("https://api.github.com/users/anasmallick35");
        if (!response.ok) throw new Error("Failed to fetch GitHub data");

        const data: GitHubUser = await response.json();
        setGithubData(data);
        

        const reposResponse = await fetch(data.repos_url);
        if (!reposResponse.ok) throw new Error("Failed to fetch repositories");

        const reposData: GitHubRepo[] = await reposResponse.json();
        setRepos(reposData.slice(0, 5)); 
      } catch (err) {
        setError("Error loading GitHub data");
      } 
    };
    fetchGithubData();
  }, []);
  console.log(githubData)
  console.log(repos)
  if (error || !githubData) return <p className="text-center text-red-500">{error}</p>;
  if(repos.length < 0) return <p className="text-center text-red-500">No repositories found.</p>;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-200 py-12">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md text-center transform transition-all hover:scale-105">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">About Me</h1>
        <img
          src={githubData.avatar_url}
          alt="GitHub Avatar"
          className="rounded-full mx-auto border-4 border-gray-200 w-32 h-32 object-cover shadow-md"
        />
        <h2 className="text-2xl font-semibold mt-4 text-gray-700">{githubData.name}</h2>
        <p className="text-gray-600 mt-2 italic">{githubData.bio || "No bio available."}</p>
        <p className="mt-4 text-gray-700">
          <strong>Public Repos:</strong> {githubData.public_repos}
        </p>
        <a
          href={githubData.html_url}
          target="_blank"
          className="inline-block text-white px-6 py-3 mt-6 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
        >
          Visit My GitHub
        </a>
      </div>
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md mt-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">My Repositories</h2>
        <div className="space-y-4">
          {
            repos.map((repo) => (
              <div
                key={repo.name}
                className="p-4 border rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-700">{repo.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{repo.description || "No description"}</p>
                <a
                  href={repo.html_url}
                  target="_blank"
                  className="inline-block text-blue-500 hover:text-blue-600 mt-2 text-sm font-medium"
                >
                  View Repo →
                </a>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}