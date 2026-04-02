import api from "@/lib/axios";

// Register a new user
export const registerUser = async ({ name, email, password }: { name: string; email: string; password: string }) => {
  try {
    // Send POST request to register endpoint with user data
    const res = await api.post("/auth/register", { name, email, password });

    // Return response data (user info and tokens)
    return res.data;
  } catch (error: any) {
    // Extract error message from API response if available
    const message = error.response?.data?.message || "Failed to register";

    // Throw a new error so React Query / UI can handle it cleanly
    throw new Error(message);
  }
};

// Login in an existing user
export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    // Send POST request with login credentials
    const res = await api.post("/auth/login", credentials);

    // Return response data (user info and tokens)
    return res.data;
  } catch (error: any) {
    // Extract server error message or fallback
    const message = error.response?.data?.message || "Failed to login";
    throw new Error(message);
  }
};

// Log out the current user
export const logoutUser = async () => {
  try {
    // Send POST request to logout endpoint (clears cookies/session on backend)
    await api.post("/auth/logout");
  } catch (error: any) {
    // Handle log out errors
    const message = error.response?.data?.message || "Failed to logout";
    throw new Error(message);
  }
};

// Refresh access token (used for maintaining authentication)
export const refreshAccessToken = async () => {
  try {
    // Request a new access token using refresh token (cookie or storage)
    const res = await api.post("/auth/refresh");

    // Return new token data
    return res.data;
  } catch (error: any) {
    // Handle refresh errors (e.g., expired refresh token)
    const message = error.response?.data?.message || "Failed to refresh access token";
    throw new Error(message);
  }
};
