import request from './api';

export const register = (userData) => request('/auth/register', {
  method: 'POST',
  body: JSON.stringify(userData),
});

export const login = (credentials) => request('/auth/login', {
  method: 'POST',
  body: JSON.stringify(credentials),
});

export const fetchProfile = () => request('/auth/profile');
