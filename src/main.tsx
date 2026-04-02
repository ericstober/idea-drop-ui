import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { AuthProvider } from "./context/AuthContext";

// Create a QueryClient instance for managing server state
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Disable automatic retries for failed queries
      retry: false,
    },
  },
});

// Create TanStack router instance
const router = createRouter({
  routeTree, // The full route definition tree
  defaultPreload: "intent", // Preload route data when the user shows intent (e.g., hover or focus)
  scrollRestoration: true, // Automatically restore scroll position on navigation
  context: { queryClient }, // Provide shared context for routes (commonly used for QueryClient)
});

// Register the router type globally for full type safety across the app
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Get the root DOM element where the app will mount
const rootElement = document.getElementById("app")!;

// Only initialize React if the root is empty (prevents double-mounting)
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // AuthProvider makes authentication state available everywhere in the app via React Context
    <AuthProvider>
      {/* Provide React Query client to the entire app */}
      <QueryClientProvider client={queryClient}>
        <StrictMode>
          {/* Provide the router to enable routing throughout the app */}
          <RouterProvider router={router} />
        </StrictMode>
      </QueryClientProvider>
    </AuthProvider>,
  );
}
