import request from './api';

export const getJobs = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/jobs?${query}`);
};

export const postJob = (payload) => request('/jobs', {
  method: 'POST',
  body: JSON.stringify(payload),
});

export const updateJob = (id, payload) => request(`/jobs/${id}`, {
  method: 'PUT',
  body: JSON.stringify(payload),
});

export const deleteJob = (id) => request(`/jobs/${id}`, { method: 'DELETE' });
