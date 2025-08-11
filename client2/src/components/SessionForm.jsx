import { useState } from "react";

export default function SessionForm({ onAdd }) {
  const [workSessions, setWorkSessions] = useState("");
  const [completedCycles, setCompletedCycles] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workSessions, completedCycles })
    });
    const data = await res.json();
    onAdd(data);
    setWorkSessions("");
    setCompletedCycles("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded mb-4 flex gap-4">
      <input
        type="number"
        placeholder="Work Sessions"
        value={workSessions}
        onChange={(e) => setWorkSessions(e.target.value)}
        className="border p-2 rounded flex-1"
      />
      <input
        type="number"
        placeholder="Completed Cycles"
        value={completedCycles}
        onChange={(e) => setCompletedCycles(e.target.value)}
        className="border p-2 rounded flex-1"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
}
