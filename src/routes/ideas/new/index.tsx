import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createIdea } from "@/api/ideas";

// Define route for "/ideas/new/"
export const Route = createFileRoute("/ideas/new/")({
  component: NewIdeaPage,
});

// NewIdeaPage component
function NewIdeaPage() {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Local state for form fields
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  // Mutation for creating a new idea
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createIdea,

    // On success, redirect user to ideas list page
    onSuccess: () => {
      navigate({ to: "/ideas" });
    },
  });

  // Handle form submission
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault(); // Prevent page reload

    // Basic validation: ensure required fields are filled
    if (!title.trim() || !summary.trim() || !description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // Trigger mutation with formatted data
      await mutateAsync({
        title,
        summary,
        description,

        // Convert comma-separated tags string into array
        tags: tags
          .split(",")
          .map((tag) => tag.trim()) // Remove whitespace
          .filter((tag) => tag !== ""), // Remove empty values
      });
    } catch (error) {
      // Handle mutation errors
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className='space-y-6'>
      {/* Page header */}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Create New Idea</h1>
      </div>

      {/* Form container */}
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
            value={tags}
            onChange={(e) => setTags(e.target.value)}
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
            {isPending ? "Creating..." : "Create Idea"}
          </button>
        </div>
      </form>
    </div>
  );
}
