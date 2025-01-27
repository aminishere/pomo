import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ onSessionComplete }) => {
    const [selectedTime, setSelectedTime] = useState(25); // Default 25 minutes
    const [time, setTime] = useState(selectedTime * 60); // Convert to seconds
    const [isRunning, setIsRunning] = useState(false);
    const [pomodoroCount, setPomodoroCount] = useState(0); // Add counter state
    const [autoStart, setAutoStart] = useState(true); // New state for auto-starting timers
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    useEffect(() => {
        let intervalId;
        
        if (isRunning) {
            intervalId = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime <= 0) {
                        setIsRunning(false);
                        handleTimerComplete();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isRunning]);

    // Add new function to format title
    const formatTitleTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        const mode = selectedTime === 25 ? 'Pomodoro' : 
                    selectedTime === 10 ? 'Short Break' : 'Long Break';
        return `(${timeString}) ${mode}`;
    };

    // Add new useEffect to update document title
    useEffect(() => {
        document.title = isRunning || time < selectedTime * 60 
            ? formatTitleTime()
            : 'Pomodoro Timer';

        return () => {
            document.title = 'Pomodoro Timer';
        };
    }, [time, isRunning, selectedTime]);

    // Add theme effect
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    // Handle timer completion and automatic transitions
    const handleTimerComplete = () => {
        if (!autoStart) return;

        if (selectedTime === 25) { // Pomodoro completed
            const newCount = (pomodoroCount + 1) % 4;
            setPomodoroCount(newCount);
            
            // Call onSessionComplete when a Pomodoro is completed
            if (onSessionComplete) {
                onSessionComplete();
            }
            
            if (newCount === 0) { // 4 Pomodoros completed
                handleTimeSelect(20); // Start long break
            } else {
                handleTimeSelect(10); // Start short break
            }
            setIsRunning(true);
        } else if (selectedTime === 10 || selectedTime === 20) { // Break completed
            handleTimeSelect(25); // Start next Pomodoro
            setIsRunning(true);
        }
    };

    const toggleTimer = () => {
        setIsRunning(prevState => !prevState);
    };

    const resetTimer = () => {
        setTime(selectedTime * 60);
        setIsRunning(false);
        setPomodoroCount(0);
    };

    const handleTimeSelect = (minutes) => {
        setSelectedTime(minutes);
        setTime(minutes * 60);
        setIsRunning(false);
    };

    const formatTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const renderDots = () => {
        return (
            <div className="pomodoro-dots">
                {[...Array(4)].map((_, index) => (
                    <span 
                        key={index} 
                        className={`dot ${index < pomodoroCount ? 'completed' : ''}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="timer">
            <div className="theme-toggle">
                <button 
                    onClick={() => setIsDarkMode(prev => !prev)}
                    className="theme-toggle-button"
                    aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
            </div>
            <h2>Pomodoro Timer</h2>
            <div className="time-options">
                <div className="pomodoro-button-container">
                    <button 
                        className={selectedTime === 25 ? 'active' : ''} 
                        onClick={() => handleTimeSelect(25)}
                    >
                        Pomodoro
                    </button>
                    {renderDots()}
                </div>
                <button 
                    className={selectedTime === 10 ? 'active' : ''} 
                    onClick={() => handleTimeSelect(10)}
                >
                    Short Break
                </button>
                <button 
                    className={selectedTime === 20 ? 'active' : ''} 
                    onClick={() => handleTimeSelect(20)}
                >
                    Long Break
                </button>
            </div>
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button onClick={toggleTimer}>
                    {isRunning ? 'Pause' : 'Start'}
                </button>
                <button onClick={resetTimer}>Reset</button>
            </div>
            <div className="auto-start-toggle">
                <label>
                    <input 
                        type="checkbox" 
                        checked={autoStart} 
                        onChange={() => setAutoStart(!autoStart)}
                    />
                    <span style={{ marginLeft: '8px' }}>Auto-start next timer</span>
                </label>
            </div>
        </div>
    );
};

export default Timer;
