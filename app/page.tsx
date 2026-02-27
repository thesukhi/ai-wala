export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold mb-6">
        🧠 Agent Store
      </h1>

      <p className="text-xl text-gray-400 mb-8 max-w-2xl">
        Access powerful AI agents to simplify your work.
        Discover specialized AI tools built by developers worldwide.
      </p>

      <div className="flex gap-4">
        <a
          href="/agents"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
        >
          Explore Agents
        </a>

        <a
          href="/submit"
          className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg"
        >
          Submit Your Agent
        </a>
      </div>
    </div>
  );
}