import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { fetchIdeas } from "@/api/ideas";
import IdeaCard from "@/components/IdeaCard";

// Define reusable query options
// Keeps queryKey & queryFn consistent across loader & component
const ideasQueryOptions = () =>
  queryOptions({
    queryKey: ["ideas"], // Unique cache key
    queryFn: fetchIdeas, // Fetch function
  });

// Define the route for "/ideas/"
export const Route = createFileRoute("/ideas/")({
  // Set page metadata
  head: () => ({
    meta: [{ title: "IdeaHub - Browse Ideas" }],
  }),

  // Component to render for this route
  component: IdeasPage,

  // Loader runs before the component renders
  // Prefetches data into React Query cache
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideasQueryOptions());
  },
});

// IdeasPage component
function IdeasPage() {
  // Read data from React Query cache (Suspense handles loading state)
  const { data } = useSuspenseQuery(ideasQueryOptions());

  // Sort ideas by newest first
  const ideas = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    // Page container
    <div className='p-4'>
      {/* Page title */}
      <h1 className='text-2xl font-bold mb-4'>Ideas</h1>

      {/* Responsive grid layout for idea cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {ideas.map((idea) => (
          // Render each idea using IdeaCard
          <IdeaCard key={idea._id} idea={idea} />
        ))}
      </div>
    </div>
  );
}
