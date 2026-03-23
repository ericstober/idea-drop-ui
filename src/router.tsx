import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Factory function to create a new router instance
export function getRouter() {
  const router = createTanStackRouter({
    routeTree, // Full route configuration
    scrollRestoration: true, // Restore scroll position when navigating
    defaultPreload: "intent", // Preload route data when user shows intent (hover/focus)
    defaultPreloadStaleTime: 0, // Always treat preloaded data as stale (forces fresh fetches)
  });

  return router;
}

// Register the router type globally for type safety across TanStack Router APIs
declare module "@tanstack/react-router" {
  interface Register {
    // Use the return type of getRouter so types stay in sync
    router: ReturnType<typeof getRouter>;
  }
}
