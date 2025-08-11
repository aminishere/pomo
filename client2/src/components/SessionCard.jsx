export default function SessionCard({ session }) {
    const date = new Date(session.date).toLocaleDateString();
    return (
      <div className="border p-4 rounded shadow-sm bg-white">
        <p className="font-semibold">{date}</p>
        <p>Work Sessions: {session.workSessions}</p>
        <p>Completed Cycles: {session.completedCycles}</p>
      </div>
    );
  }
  