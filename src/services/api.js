const API_BASE_URL = 'http://localhost:5000/api';

// Helper to get stored token
const getToken = () => localStorage.getItem('farmchain_token');

// Generic fetch wrapper with auth
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error.message);
    throw error;
  }
};

// =================== AUTH API ===================

export const authAPI = {
  login: (username, password, role) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password, role }),
    }),

  register: (userData) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
};

// =================== BATCHES API ===================

export const batchAPI = {
  getAll: () => apiRequest('/batches'),

  create: (batchData) =>
    apiRequest('/batches', {
      method: 'POST',
      body: JSON.stringify(batchData),
    }),

  update: (id, batchData) =>
    apiRequest(`/batches/${id}`, {
      method: 'PUT',
      body: JSON.stringify(batchData),
    }),

  delete: (id) =>
    apiRequest(`/batches/${id}`, {
      method: 'DELETE',
    }),
};

export default apiRequest;
