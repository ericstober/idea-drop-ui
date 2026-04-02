import { Link } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Header component (site-wide navigation bar)
const Header = () => {
  const { user } = useAuth();

  return (
    // Main header container with background and shadow
    <header className='bg-white shadow'>
      {/* Centered content container with padding and flex layout */}
      <div className='container mx-auto px-6 py-4 flex justify-between items-center'>
        {/* Logo & app name section */}
        <div className='flex items-center space-x-2 text-gray-800'>
          {/* Link to homepage */}
          <Link to='/' className='flex items-center space-x-2 text-gray-800'>
            {/* Lightbulb icon (branding) */}
            <Lightbulb className='w-6 h-6 text-yellow-500' />
            {/* App name */}
            <h1 className='text-2xl font-bold'>IdeaDrop</h1>
          </Link>
        </div>

        {/* Navigation links */}
        <nav className='flex items-center space-x-4'>
          {/* Link to ideas list page */}
          <Link to='/ideas' className='text-gray-600 hover:text-gray-900 font-medium transition px-3 py-2 leading-none'>
            Ideas
          </Link>

          {/* Call-to-action button to create a new idea - only display if logged in */}
          {user && (
            <Link
              to='/ideas/new'
              className='bg-blue-600 hover:bg-blue-700 text-white font-medium transition px-4 py-2 rounded-md leading-none'
            >
              + New Idea
            </Link>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className='flex items-center space-x-2'>
          {!user ? (
            <>
              {/* Login */}
              <Link
                to='/login'
                className='text-gray-600 hover:text-gray-700 font-medium transition px-3 py-2 leading-none'
              >
                Login
              </Link>

              {/* Register */}
              <Link
                to='/register'
                className='bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition px-4 py-2 rounded-md leading-none'
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className='text-gray-700 font-medium px-2'>Welcome, {user.name}</span>

              <button className='text-red-600 hover:text-red-900 font-medium transition px-3 py-2 leading-none'>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
