"use client";

import { useEffect, useState } from "react";

interface Agent {
  id: string;
  name: string;
  category: string;
  description: string;
  platform: string;
  url: string;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/get-agents")
      .then((res) => res.json())
      .then((data) => {
        setAgents(data.data || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">
        Explore AI Agents
      </h1>

      {loading ? (
        <p className="text-gray-400">Loading agents...</p>
      ) : agents.length === 0 ? (
        <p className="text-gray-400">No agents available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-black p-6 rounded-xl shadow-lg border border-gray-800 hover:border-blue-500 transition"
            >
              <h2 className="text-xl font-bold mb-2">
                {agent.name}
              </h2>

              <p className="text-sm text-gray-400 mb-2">
                Category: {agent.category}
              </p>

              <p className="text-sm text-gray-400 mb-4">
                Platform: {agent.platform}
              </p>

              <p className="text-gray-300 mb-6">
                {agent.description}
              </p>

              <button
                onClick={() => window.open(agent.url, "_blank")}
                className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
              >
                Open Agent
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}