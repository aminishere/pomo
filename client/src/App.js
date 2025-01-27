import React, { useState, useEffect } from 'react';
import Timer from './components/Timer';
import SessionTracker from './components/SessionTracker';
import { saveSession, getSessions } from './services/sessionService';
import './App.css';

function App() {
    const [workSessions, setWorkSessions] = useState(0);
    const [completedCycles, setCompletedCycles] = useState(0);
    const [sessionHistory, setSessionHistory] = useState([]);

    useEffect(() => {
        // Load initial session history
        loadSessionHistory();
    }, []);

    const loadSessionHistory = async () => {
        try {
            const sessions = await getSessions();
            setSessionHistory(sessions);
        } catch (error) {
            console.error('Error loading sessions:', error);
        }
    };

    const handleSessionComplete = async () => {
        const newSessions = (workSessions + 1) % 4;
        setWorkSessions(newSessions);
        
        if (newSessions === 0) {
            const newCycles = completedCycles + 1;
            setCompletedCycles(newCycles);
            
            // Save session data to backend
            try {
                await saveSession(4, newCycles);
                await loadSessionHistory(); // Reload history after saving
            } catch (error) {
                console.error('Error saving session:', error);
            }
        }
    };

    return (
        <div className="App">
            <Timer onSessionComplete={handleSessionComplete} />
            <SessionTracker 
                workSessions={workSessions}
                completedCycles={completedCycles}
                sessionHistory={sessionHistory}
            />
        </div>
    );
}

export default App;
