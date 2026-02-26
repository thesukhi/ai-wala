"use client";

import { useState } from "react";
import { agents } from "./data/agents";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Added loading state

  const categories = ["All", ...new Set(agents.map(a => a.category))];

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = agent.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || agent.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // ✅ SMART ROUTING FUNCTION (Updated with loading)
  const handleGlobalAsk = async () => {
    if (!search) return;

    setLoading(true); // start loading

    try {
      const res = await fetch("/api/route-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: search }),
      });

      const data = await res.json();

      if (data.url) {
        window.open(data.url, "_blank");
      } else {
        alert("No suitable agent found.");
      }

    } catch (err) {
      alert("Something went wrong.");
    }

    setLoading(false); // stop loading
  };

  if (!loggedIn) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950 text-white">
        <div className="bg-black p-8 rounded-xl shadow-lg w-80">
          <h2 className="text-2xl font-bold mb-6 text-center">
            🚀 AI Wala Login
          </h2>
          <button
            onClick={() => setLoggedIn(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
          >
            Enter Platform
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 bg-black border-b border-gray-800">
        <h1 className="text-2xl font-bold">
          🚀 <span className="text-blue-500">AI</span> Wala
        </h1>

        {/* 🔥 Updated Input Section */}
        <div className="flex gap-2 w-1/3">
          <input
            type="text"
            placeholder="Ask anything..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleGlobalAsk}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-4 rounded disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>

        <button
          onClick={() => setLoggedIn(false)}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-1">
        {/* Sidebar Category Filter */}
        <div className="w-60 bg-black p-4 border-r border-gray-800">
          <h3 className="font-semibold mb-4">Categories</h3>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`block w-full text-left p-2 mb-2 rounded ${
                selectedCategory === cat
                  ? "bg-blue-600"
                  : "bg-gray-900 hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Agent Cards View */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-6">
            Available Agents ({filteredAgents.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                className="bg-black p-5 rounded-xl shadow-lg hover:shadow-blue-500/30 transition"
              >
                <h3 className="text-lg font-bold mb-2">{agent.name}</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Category: {agent.category}
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
        </div>
      </div>
    </div>
  );
}