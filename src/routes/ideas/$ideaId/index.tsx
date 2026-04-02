import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { fetchIdea, deleteIdea } from "@/api/ideas";
import { useAuth } from "@/context/AuthContext";

// Define reusable query options for a single idea
const ideaQueryOptions = (ideaId: string) =>
  queryOptions({
    queryKey: ["idea", ideaId], // Unique cache key per idea
    queryFn: () => fetchIdea(ideaId), // Fetch specific idea
  });

// Define route for "/ideas/:ideaId/"
export const Route = createFileRoute("/ideas/$ideaId/")({
  component: IdeaDetailsPage,

  // Loader runs before component renders
  // Ensures idea data is available in React Query cache
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId));
  },
});

// IdeaDetailsPage component
function IdeaDetailsPage() {
  // Get route param (ideaId)
  const { ideaId } = Route.useParams();

  // Fetch idea data from cache (Suspense handles loading)
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId));

  // Navigation hook for programmatic redirects
  const navigate = useNavigate();

  // Get user
  const { user } = useAuth();

  // Mutation for deleting the idea
  const { mutateAsync: deleteMutate, isPending } = useMutation({
    mutationFn: () => deleteIdea(ideaId),

    // After successful deletion, navigate back to ideas list
    onSuccess: () => {
      navigate({ to: "/ideas" });
    },
  });

  // Handle delete action with confirmation
  const handleDelete = async () => {
    // Confirm before deleting (basic safety check)
    const confirmDelete = window.confirm("Are you sure you want to delete this idea?");

    if (confirmDelete) {
      // Trigger delete mutation
      await deleteMutate();
    }
  };

  return (
    <div className='p-4'>
      {/* Back navigation link */}
      <Link to='/ideas' className='text-blue-500 underline block mb-4'>
        Back To Ideas
      </Link>

      {/* Idea title */}
      <h2 className='text-2xl font-bold'>{idea.title}</h2>

      {/* Idea description */}
      <p className='mt-2'>{idea.description}</p>

      {user && user.id === idea.user && (
        <>
          {/* Edit Link */}
          <Link
            to='/ideas/$ideaId/edit'
            params={{ ideaId }}
            className='inline-block text-sm bg-yellow-500 hover:bg-yellow-600 text-white mt-4 mr-2 px-4 py-2 rounded transition'
          >
            Edit
          </Link>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            disabled={isPending}
            className='text-sm bg-red-600 text-white mt-4 px-4 py-2 rounded transition hover:bg-red-700 disabled:opacity-50'
          >
            {/* Show loading state */}
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </>
      )}
    </div>
  );
}
