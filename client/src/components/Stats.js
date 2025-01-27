import React from 'react';
import './Stats.css';

function Stats({ sessionHistory, isLoading }) {
    if (isLoading) {
        return <div className="stats-container loading">Loading stats...</div>;
    }

    const calculateStats = () => {
        if (!sessionHistory?.length) return null;

        const totalCycles = sessionHistory.reduce((sum, session) => sum + session.completedCycles, 0);
        const totalMinutes = totalCycles * (25 * 4 + 10 * 3 + 20); // 4 pomodoros + 3 short breaks + 1 long break
        const totalHours = Math.floor(totalMinutes / 60);
        const remainingMinutes = totalMinutes % 60;

        const today = new Date().toDateString();
        const todaySessions = sessionHistory.filter(
            session => new Date(session.date).toDateString() === today
        );
        const todayCycles = todaySessions.reduce((sum, session) => sum + session.completedCycles, 0);

        return {
            totalSessions: sessionHistory.length,
            totalCycles,
            totalTime: `${totalHours}h ${remainingMinutes}m`,
            todayCycles,
            averageCycles: Math.round((totalCycles / sessionHistory.length) * 10) / 10,
            streakDays: calculateStreak(sessionHistory)
        };
    };

    const calculateStreak = (sessions) => {
        if (!sessions.length) return 0;
        
        let streak = 1;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        
        const sortedDates = sessions
            .map(session => new Date(session.date))
            .sort((a, b) => b - a);
        
        // Remove duplicates by converting to date string
        const uniqueDates = [...new Set(sortedDates.map(date => date.toDateString()))];
        
        for (let i = 0; i < uniqueDates.length - 1; i++) {
            const current = new Date(uniqueDates[i]);
            const next = new Date(uniqueDates[i + 1]);
            
            const diffDays = Math.floor((current - next) / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    };

    const stats = calculateStats();
    if (!stats) {
        return <div className="stats-container empty">No data available</div>;
    }

    return (
        <div className="stats-container">
            <h3>Statistics</h3>
            <div className="stats-grid">
                <div className="stat-item">
                    <span className="stat-label">Today's Cycles</span>
                    <span className="stat-value">{stats.todayCycles}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Current Streak</span>
                    <span className="stat-value">{stats.streakDays} days</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Total Focus Time</span>
                    <span className="stat-value">{stats.totalTime}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Total Cycles</span>
                    <span className="stat-value">{stats.totalCycles}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Average Cycles/Day</span>
                    <span className="stat-value">{stats.averageCycles}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Total Sessions</span>
                    <span className="stat-value">{stats.totalSessions}</span>
                </div>
            </div>
        </div>
    );
}

export default Stats; 