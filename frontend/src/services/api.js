const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const request = async (path, options = {}) => {
  const token = localStorage.getItem('jobPortalToken');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${path}`, { headers, ...options });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Unable to connect to the server. Please make sure the backend is running on http://localhost:5000');
    }
    throw error;
  }
};

export default request;
