# FarmChainX API Guide (React Integration)

This guide shows you how to connect your React frontend to the Node.js/MongoDB backend.

## 1. API Configuration
Create a `src/api.js` file:
```javascript
export const API_BASE_URL = 'http://localhost:5000/api';
```

## 2. User Authentication

### Sign Up
```javascript
const handleSignup = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('userToken', data.token); // Store JWT
  }
};
```

### Log In
```javascript
const handleLogin = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('userToken', data.token);
  }
};
```

## 3. CRUD Operations (Batches)
All batch operations require the `Authorization` header with the JWT token.

### Get All Batches
```javascript
const fetchBatches = async () => {
  const token = localStorage.getItem('userToken');
  const response = await fetch(`${API_BASE_URL}/batches`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await response.json();
};
```

### Create New Batch
```javascript
const createNewBatch = async (batchData) => {
  const token = localStorage.getItem('userToken');
  const response = await fetch(`${API_BASE_URL}/batches`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify(batchData),
  });
  return await response.json();
};
```

### Update Batch
```javascript
const updateBatch = async (id, updatedData) => {
  const token = localStorage.getItem('userToken');
  const response = await fetch(`${API_BASE_URL}/batches/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify(updatedData),
  });
  return await response.json();
};
```

### Delete Batch
```javascript
const deleteBatch = async (id) => {
  const token = localStorage.getItem('userToken');
  const response = await fetch(`${API_BASE_URL}/batches/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.ok;
};
```
