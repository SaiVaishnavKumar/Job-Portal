import request from './api';

export const applyForJob = (jobId) => request(`/applications/${jobId}`, { method: 'POST' });
export const getApplications = (query = {}) => {
  const q = new URLSearchParams(query).toString();
  return request(`/applications?${q}`);
};
export const updateApplicationStatus = (id, status) => request(`/applications/${id}`, {
  method: 'PUT',
  body: JSON.stringify({ status }),
});
