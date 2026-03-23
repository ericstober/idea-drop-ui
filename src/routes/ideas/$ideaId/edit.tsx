import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { fetchIdea, updateIdea } from "@/api/ideas";

// Define reusable query options for a single idea
const ideaQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["idea", id], // Unique cache key per idea
    queryFn: () => fetchIdea(id), // Fetch specific idea
  });

// Define route for "/ideas/:ideaId/edit"
export const Route = createFileRoute("/ideas/$ideaId/edit")({
  component: IdeaEditPage,

  // Loader runs before component renders
  // Ensures idea data is in React Query cache
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId));
  },
});

// IdeaEditPage component
function IdeaEditPage() {
  // Get route param (ideaId)
  const { ideaId } = Route.useParams();

  // Navigation hook
  const navigate = useNavigate();

  // Fetch idea data from cache (Suspense handles loading)
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId));

  // Initialize form state with existing idea values
  const [title, setTitle] = useState(idea.title);
  const [summary, setSummary] = useState(idea.summary);
  const [description, setDescription] = useState(idea.description);
  // Convert tags array into comma-separated string for input
  const [tagsInput, setTagsInput] = useState(idea.tags.join(", "));

  // Mutation for updating the idea
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      updateIdea(ideaId, {
        title,
        summary,
        description,
        // Convert input string back into array of tags
        tags: tagsInput
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean), // Remove empty values
      }),
    // After successful update, navigate to idea detail page
    onSuccess: () => {
      navigate({ to: "/ideas/$ideaId", params: { ideaId } });
    },
  });

  // Handle form submission
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault(); // Prevent page reload
    await mutateAsync(); // Trigger update mutation
  };

  return (
    <div className='space-y-6'>
      {/* Header with title and back link */}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Edit Idea</h1>

        {/* Link back to idea detail page */}
        <Link to='/ideas/$ideaId' params={{ ideaId }} className='text-sm text-blue-600 hover:underline'>
          ← Back To Idea
        </Link>
      </div>

      {/* Edit form */}
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Title input */}
        <div>
          <label htmlFor='title' className='block text-gray-700 font-medium mb-1'>
            Title
          </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter idea title'
          />
        </div>

        {/* Summary input */}
        <div>
          <label htmlFor='summary' className='block text-gray-700 font-medium mb-1'>
            Summary
          </label>
          <input
            type='text'
            id='summary'
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter idea summary'
          />
        </div>

        {/* Description textarea */}
        <div>
          <label htmlFor='description' className='block text-gray-700 font-medium mb-1'>
            Description
          </label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Write out the description of your idea'
          />
        </div>

        {/* Tags input */}
        <div>
          <label htmlFor='tags' className='block text-gray-700 font-medium mb-1'>
            Tags
          </label>
          <input
            type='text'
            id='tags'
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Optional tags, comma separated'
          />
        </div>

        {/* Submit button */}
        <div className='mt-5'>
          <button
            type='submit'
            disabled={isPending}
            className='block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {/* Show loading state */}
            {isPending ? "Updating..." : "Update Idea"}
          </button>
        </div>
      </form>
    </div>
  );
}
