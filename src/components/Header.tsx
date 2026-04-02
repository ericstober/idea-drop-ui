import { Link, useNavigate } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { logoutUser } from "@/api/auth";

// Header component (site-wide navigation bar)
const Header = () => {
  // Set navigate for redirect after logout
  const navigate = useNavigate();

  // Get auth state & setters from context
  const { user, setUser, setAccessToken } = useAuth();

  // Handle logout
  const handleLogout = async () => {
    try {
      // Call backend to clear session (cookies / tokens)
      await logoutUser();

      // Clear auth state on frontend
      setAccessToken(null);
      setUser(null);

      // Redirect to homepage after logout
      navigate({ to: "/" });
    } catch (error: any) {
      // Log error if logout fails
      console.error("Logout failed: ", error);
    }
  };

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
          {/* Link to ideas list page - always visable */}
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
            // If not logged in
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
            // If logged in
            <>
              <span className='hidden sm:block text-gray-700 font-medium px-2'>Welcome, {user.name}</span>

              <button
                onClick={handleLogout}
                className='text-red-600 hover:text-red-900 font-medium transition px-3 py-2 leading-none cursor-pointer'
              >
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
