import type { Idea } from "@/types";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";

// IdeaCard component
// Displays a summary of an idea
// Optionally renders a button-style or text-style link
const IdeaCard = ({ idea, button = true }: { idea: Idea; button?: boolean }) => {
  // Dynamically determine link styles based on `button` prop
  const linkClasses = clsx({
    // Text-style link (used when button = false)
    "text-blue-600 hover:underline mt-3": !button,
    // Button-style link (default)
    "w-full text-center mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition":
      button,
  });

  return (
    // Card container with border, padding, shadow, and flex layout
    <div className='border border-gray-300 p-4 rounded shadow bg-white flex flex-col justify-between'>
      {/* Content section */}
      <div>
        {/* Idea title */}
        <h2 className='text-lg font-semibold'>{idea.title}</h2>

        {/* Idea summary */}
        <p className='text-gray-700 mt-2'>{idea.summary}</p>

        {/* Link to idea detail page */}
        <Link to='/ideas/$ideaId' params={{ ideaId: idea._id.toString() }} className={linkClasses}>
          {/* Label changes depending on style */}
          {button ? "View Idea" : "Read More →"}
        </Link>
      </div>
    </div>
  );
};

export default IdeaCard;
