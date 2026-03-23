import { Link } from "@tanstack/react-router";

// NotFound component
// Displays a 404 page when a route is not matched
const NotFound = () => {
  return (
    // Centered container using flexbox with vertical spacing
    <div className='flex flex-col items-center justify-center text-center py-20'>
      {/* 404 heading */}
      <h1 className='text-4xl font-bold text-gray-800 mb-4'>404</h1>

      {/* Description message */}
      <p className='text-lg text-gray-600 mb-6'>The page you are looking for does not exist</p>

      {/* Link to navigate back to the the homepage */}
      <Link to='/' className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'>
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
