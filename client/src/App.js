import React, { useState, useEffect } from 'react';
import Timer from './components/Timer';
import SessionTracker from './components/SessionTracker';
import { saveSession, getSessions } from './services/sessionService';
import './App.css';

function App() {
    const [workSessions, setWorkSessions] = useState(0);
    const [completedCycles, setCompletedCycles] = useState(0);
    const [sessionHistory, setSessionHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadSessionHistory();
    }, []);

    const loadSessionHistory = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const sessions = await getSessions();
            setSessionHistory(sessions);
        } catch (error) {
            console.error('Error loading sessions:', error);
            setError('Failed to load session history');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSessionComplete = async () => {
        const newSessions = (workSessions + 1) % 4;
        setWorkSessions(newSessions);
        
        if (newSessions === 0) {
            const newCycles = completedCycles + 1;
            setCompletedCycles(newCycles);
            
            try {
                await saveSession(4, newCycles);
                await loadSessionHistory();
            } catch (error) {
                console.error('Error saving session:', error);
                // Optionally show an error message to the user
            }
        }
    };

    return (
        <div className="App">
            <Timer onSessionComplete={handleSessionComplete} />
            {error ? (
                <div className="error-message">
                    {error}
                </div>
            ) : (
                <SessionTracker 
                    workSessions={workSessions}
                    completedCycles={completedCycles}
                    sessionHistory={sessionHistory}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
}

export default App;
