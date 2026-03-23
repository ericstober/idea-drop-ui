import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { fetchIdeas } from "@/api/ideas";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import IdeaCard from "@/components/IdeaCard";

// Define reusable query options for fetching ideas
// Keeps queryKey & queryFn consistent across loader & component
const ideasQueryOptions = () =>
  queryOptions({
    queryKey: ["ideas"], // Unique cache key
    queryFn: () => fetchIdeas(), // Fetch function
  });

// Define the route for "/"
export const Route = createFileRoute("/")({
  component: HomePage,

  // Loader runs BEFORE the component renders
  // Used to prefetch data into React Query cache
  loader: async ({ context: { queryClient } }) => {
    // Ensures the query is in cache (fetches if missing)
    return queryClient.ensureQueryData(ideasQueryOptions());
  },
});

// HomePage component
function HomePage() {
  // useSuspenseQuery reads from cache (or suspends if not ready)
  const { data } = useSuspenseQuery(ideasQueryOptions());

  // Sort ideas by newest first and take top 3
  const latestIdeas = [...data]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    // Main layout: responsive flex (column on mobile, row on desktop)
    <div className='flex flex-col md:flex-row items-start justify-between gap-10 p-6 text-blue-600'>
      {/* Left side: hero section */}
      <div className='flex flex-col items-start gap-4'>
        {/* Brandin icon */}
        <Lightbulb className='w-16 h-16 text-yellow-400' />

        {/* Title */}
        <h1 className='text-4xl font-bold text-gray-800'>Welcome to IdeaDrop</h1>

        {/* Subtitle/description */}
        <p className='text-gray-600 max-w-xs'>Share, explore and build on the best startup ideas and side hustles.</p>
      </div>

      {/* Right side: latest ideas list */}
      <section className='flex-1'>
        {/* Section title */}
        <h2 className='text-2xl font-semibold mb-4 text-gray-800'>Latest Ideas</h2>

        {/* List of latest ideas */}
        <div className='space-y-6'>
          {latestIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} button={false} />
          ))}
        </div>

        {/* Link to full ideas list */}
        <div className='mt-6'>
          <Link
            to='/ideas'
            className='w-full text-center inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md transition'
          >
            View All Ideas
          </Link>
        </div>
      </section>
    </div>
  );
}
