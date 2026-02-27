"use client";

import { useState } from "react";

export default function SubmitPage() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    platform: "",
    url: "",
    creatorName: "",
    creatorEmail: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/submit-agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Agent submitted! Waiting for approval.");
      setForm({
        name: "",
        category: "",
        description: "",
        platform: "",
        url: "",
        creatorName: "",
        creatorEmail: "",
      });
    } else {
      setMessage("Submission failed.");
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Submit Your AI Agent</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(form).map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={(form as any)[field]}
            onChange={handleChange}
            required
            className="w-full p-3 bg-black border border-gray-700 rounded"
          />
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded"
        >
          Submit Agent
        </button>
      </form>

      {message && (
        <p className="mt-4 text-green-400">{message}</p>
      )}
    </div>
  );
}