import { HeadContent, Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import NotFound from "@/components/NotFound";
import "../styles.css";

// Define the shape of the router context
// This must match what you pass into createRouter({ context: ... })
type RouterContext = {
  queryClient: QueryClient;
};

// Create the root route with a typed context
export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        // Meta description for search engines
        name: "description",
        content: "Share, explore and build on the best startup ideas and side hustles",
      },
      {
        // Page title
        title: "IdeaDrop - Your Idea Hub",
      },
    ],
  }),
  // Root layout component (wraps all routes)
  component: RootComponent,

  // Fallback component for unmatched routes (404)
  notFoundComponent: NotFound,
});

// Root layout component
function RootComponent() {
  return (
    // Full height app container with background and vertical layout
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      {/* Injects <head> content defind in routes */}
      <HeadContent />

      {/* Global header/navigation */}
      <Header />

      {/* Main content area */}
      <main className='flex justify-center p-6'>
        {/* Centered content container with max width and styling */}
        <div className='w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8'>
          {/* Renders the currently matched child route */}
          <Outlet />
        </div>
      </main>

      {/* Devtools container (only visible in development typically) */}
      <TanStackDevtools
        config={{
          // Position of the devtools panel toggle
          position: "bottom-right",
        }}
        plugins={[
          {
            // Add TanStack Router devtools as a plugin
            name: "TanStack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </div>
  );
}
