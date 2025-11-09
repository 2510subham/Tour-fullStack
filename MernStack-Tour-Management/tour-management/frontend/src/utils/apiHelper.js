// API Helper utility to simplify fetch calls with credentials
// This ensures all API calls include cookies for authentication

import { BASE_URL } from "./Config";

/**
 * Makes an authenticated API call
 * @param {string} endpoint - API endpoint (e.g., '/auth/login')
 * @param {object} options - Fetch options (method, body, etc.)
 * @returns {Promise} - Response from the API
 */
export const apiCall = async (endpoint, options = {}) => {
  const defaultOptions = {
    credentials: "include", // Always include cookies
    headers: {
      "content-type": "application/json",
      ...options.headers,
    },
  };

  const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    const result = await response.json();

    return {
      ok: response.ok,
      status: response.status,
      data: result,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error: error.message,
    };
  }
};

// Convenience methods
export const api = {
  get: (endpoint) => apiCall(endpoint, { method: "GET" }),

  post: (endpoint, body) =>
    apiCall(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (endpoint, body) =>
    apiCall(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: (endpoint) => apiCall(endpoint, { method: "DELETE" }),
};
