const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function saveSession(workSessions, completedCycles) {
  try {
    const response = await fetch(`${API_URL}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workSessions, completedCycles }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving session:', error);
    throw error;
  }
}

export async function getSessions() {
  try {
    const response = await fetch(`${API_URL}/sessions`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching sessions:', error);
    throw error;
  }
}

