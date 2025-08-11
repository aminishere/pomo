import SessionCard from "./SessionCard";

export default function SessionList({ sessions }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {sessions.map((session) => (
        <SessionCard key={session._id} session={session} />
      ))}
    </div>
  );
}
