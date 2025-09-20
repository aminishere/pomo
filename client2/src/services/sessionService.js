const API_URL = 'https://pomo-3.onrender.com/api'; //deployed on render
let authToken = null;

export function setAuthToken(token) {
  authToken = token;
}

export async function saveSession(workSessions, completedCycles) {
  try {
    const response = await fetch(`${API_URL}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
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
    const response = await fetch(`${API_URL}/sessions`, {
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching sessions:', error);
    throw error;
  }
}

export async function register({ email, password }) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  
  if (!res.ok) {
    if (res.status === 409) {
      throw new Error('Email already registered. Please login instead.')
    } else if (res.status === 500) {
      throw new Error('Server error. Please try again later.')
    } else {
      throw new Error(`Registration failed (${res.status})`)
    }
  }
  
  return res.json()
}

export async function login({ email, password }) {
  
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  
  if (!res.ok) throw new Error('Login failed')
  const data = await res.json()
  setAuthToken(data.token)
  return data
  
}

