import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { refreshAccessToken } from "@/api/auth";
import { setStoredAccessToken } from "@/lib/authToken";

// Define shape of auth state exposed to the app
type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  user: { id: string; email: string; name: string } | null;
  setUser: (user: AuthContextType["user"]) => void;
};

// Create context (initually undefined until provider wraps app)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider wraps the app and provides auth state globally
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Access token state (in memory)
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // User state (null if not logged in)
  const [user, setUser] = useState<AuthContextType["user"] | null>(null);

  // Run once on app load (initial auth hydration)
  useEffect(() => {
    const loadAuth = async () => {
      try {
        // Attempt to refresh access token using refresh token (cookie)
        const { accessToken: newToken, user } = await refreshAccessToken();

        // Store token & user in state
        setAccessToken(newToken);
        setUser(user);

        // Persist token for API usage (e.g., axios headers)
        setStoredAccessToken(newToken);
      } catch (error: any) {
        // If refresh fails, user is not authenticated
        console.error("Failed to refresh access token", error);
      }
    };

    // Execute auth
    loadAuth();
  }, []);

  // Sync accessToken to storage whenever it changes
  useEffect(() => {
    // Keep token in sync
    setStoredAccessToken(accessToken);
  }, [accessToken]);

  // Provide auth state & setters to entire app
  return <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser }}>{children}</AuthContext.Provider>;
};

// Custom hook to consume auth context safely
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Throw error if used outside provider (prevents silent bugs)
  if (!context) throw new Error("useAuth must be used within a provider");

  return context;
};
