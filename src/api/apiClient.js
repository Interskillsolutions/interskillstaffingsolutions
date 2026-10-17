// Frontend API Client for Interskill Staffing Solutions (MongoDB Atlas & Node.js API)

const API_BASE = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, '')}/api`
  : '/api';

const handleResponse = async (res) => {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `API Error: ${res.status}`);
  }
  return res.json();
};

export const api = {
  // Employer Leads
  getLeads: async () => {
    const res = await fetch(`${API_BASE}/leads`);
    return handleResponse(res);
  },
  createLead: async (data) => {
    const res = await fetch(`${API_BASE}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
  updateLeadStatus: async (id, status) => {
    const res = await fetch(`${API_BASE}/leads/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return handleResponse(res);
  },
  deleteLead: async (id) => {
    const res = await fetch(`${API_BASE}/leads/${id}`, { method: 'DELETE' });
    return handleResponse(res);
  },

  // Callbacks
  getCallbacks: async () => {
    const res = await fetch(`${API_BASE}/callbacks`);
    return handleResponse(res);
  },
  createCallback: async (data) => {
    const res = await fetch(`${API_BASE}/callbacks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
  updateCallbackStatus: async (id, status) => {
    const res = await fetch(`${API_BASE}/callbacks/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return handleResponse(res);
  },
  deleteCallback: async (id) => {
    const res = await fetch(`${API_BASE}/callbacks/${id}`, { method: 'DELETE' });
    return handleResponse(res);
  },

  // Consultations
  getConsultations: async () => {
    const res = await fetch(`${API_BASE}/consultations`);
    return handleResponse(res);
  },
  createConsultation: async (data) => {
    const res = await fetch(`${API_BASE}/consultations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
  updateConsultationStatus: async (id, status) => {
    const res = await fetch(`${API_BASE}/consultations/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return handleResponse(res);
  },
  deleteConsultation: async (id) => {
    const res = await fetch(`${API_BASE}/consultations/${id}`, { method: 'DELETE' });
    return handleResponse(res);
  },

  // Jobs
  getJobs: async (status) => {
    const url = status ? `${API_BASE}/jobs?status=${status}` : `${API_BASE}/jobs`;
    const res = await fetch(url);
    return handleResponse(res);
  },
  createJob: async (jobData) => {
    const res = await fetch(`${API_BASE}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    });
    return handleResponse(res);
  },
  updateJob: async (id, jobData) => {
    const res = await fetch(`${API_BASE}/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    });
    return handleResponse(res);
  },
  deleteJob: async (id) => {
    const res = await fetch(`${API_BASE}/jobs/${id}`, { method: 'DELETE' });
    return handleResponse(res);
  },

  // Applicants
  getApplicants: async () => {
    const res = await fetch(`${API_BASE}/applicants`);
    return handleResponse(res);
  },
  createApplicant: async (formDataOrObj) => {
    const isFormData = formDataOrObj instanceof FormData;
    const res = await fetch(`${API_BASE}/applicants`, {
      method: 'POST',
      headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
      body: isFormData ? formDataOrObj : JSON.stringify(formDataOrObj),
    });
    return handleResponse(res);
  },
  updateApplicantStatus: async (id, status) => {
    const res = await fetch(`${API_BASE}/applicants/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return handleResponse(res);
  },
  deleteApplicant: async (id) => {
    const res = await fetch(`${API_BASE}/applicants/${id}`, { method: 'DELETE' });
    return handleResponse(res);
  },

  // Resumes
  getResumes: async () => {
    const res = await fetch(`${API_BASE}/resumes`);
    return handleResponse(res);
  },
  createResume: async (formDataOrObj) => {
    const isFormData = formDataOrObj instanceof FormData;
    const res = await fetch(`${API_BASE}/resumes`, {
      method: 'POST',
      headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
      body: isFormData ? formDataOrObj : JSON.stringify(formDataOrObj),
    });
    return handleResponse(res);
  },
  deleteResume: async (id) => {
    const res = await fetch(`${API_BASE}/resumes/${id}`, { method: 'DELETE' });
    return handleResponse(res);
  },

  // CMS
  getTeam: async () => {
    const res = await fetch(`${API_BASE}/cms/team`);
    return handleResponse(res);
  },
  saveTeam: async (team) => {
    const res = await fetch(`${API_BASE}/cms/team`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ team }),
    });
    return handleResponse(res);
  },
  getStats: async () => {
    const res = await fetch(`${API_BASE}/cms/stats`);
    return handleResponse(res);
  },
  saveStats: async (stats) => {
    const res = await fetch(`${API_BASE}/cms/stats`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stats),
    });
    return handleResponse(res);
  },
};
