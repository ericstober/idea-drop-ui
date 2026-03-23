import axios from "axios";

// Create a pre-configured Axios instance
const api = axios.create({
  // Base URL for all API requests
  // All requests using this instance will be prefixed with "/api"
  baseURL: "/api",

  // Include cookies (e.g., for authentication sessions)
  // Useful when working with same-site or cross-site auth
  withCredentials: true,

  // Default headers sent with every request
  headers: {
    // Indicate that request bodies are JSON
    "Content-Type": "application/json",
  },
});

export default api;
