import React from 'react';
import './SessionTracker.css';

function SessionTracker({ workSessions, completedCycles, sessionHistory }) {
  return (
    <div className="session-tracker">
      <div className="tracker-item">
        <span className="tracker-label">Work Sessions:</span>
        <span className="tracker-value">{workSessions}/4</span>
      </div>
      <div className="tracker-item">
        <span className="tracker-label">Completed Cycles:</span>
        <span className="tracker-value">{completedCycles}</span>
      </div>
      {sessionHistory && sessionHistory.length > 0 ? (
        <div className="session-history">
          <h3>Recent Sessions</h3>
          <div className="history-list">
            {sessionHistory.map((session, index) => (
              <div key={session._id || index} className="history-item">
                <span>{new Date(session.date).toLocaleDateString()}</span>
                <span>{session.completedCycles} cycles</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="session-history">
          <p className="no-history">No session history yet</p>
        </div>
      )}
    </div>
  );
}

export default SessionTracker;