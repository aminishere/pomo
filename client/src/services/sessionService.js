const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const saveSession = async (workSessions, completedCycles) => {
  try {
    const response = await fetch(`${API_URL}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ workSessions, completedCycles }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving session:', error);
    throw error;
  }
};

export const getSessions = async () => {
  try {
    const response = await fetch(`${API_URL}/sessions`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching sessions:', error);
    throw error;
  }
}; 