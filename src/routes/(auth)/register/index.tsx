import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/api/auth";
import { useAuth } from "@/context/AuthContext";

// Define route for "/register" (inside auth layout)
export const Route = createFileRoute("/(auth)/register/")({
  component: RegisterPage,
});

function RegisterPage() {
  // Navigation after successful registration
  const navigate = useNavigate();

  // Get auth setters from global context
  const { setAccessToken, setUser } = useAuth();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error state for displaying API errors
  const [error, setError] = useState("");

  // Mutation for registering a new user
  const { mutateAsync, isPending } = useMutation({
    mutationFn: registerUser,

    // On successful registration
    onSuccess: (data) => {
      // Store access token & user globally
      setAccessToken(data.accessToken);
      setUser(data.user);

      // Redirect to main app page
      navigate({ to: "/ideas" });
    },

    // Handle API errors (e.g., email already exists)
    onError: (error: any) => {
      setError(error.message);
    },
  });

  // Handle form submission
  const handleSubmit = async (e: React.SubmitEvent) => {
    // Prevent page reload
    e.preventDefault();

    try {
      // Trigger register mutation
      await mutateAsync({ name, email, password });
    } catch (error: any) {
      // Errors are already handled in onError, but logged here for debugging
      console.error(error.message);
    }
  };

  return (
    <div className='max-w-md mx-auto'>
      {/* Page title */}
      <h1 className='text-3xl font-bold mb-6'>Register</h1>

      {/* Error message display */}
      {error && <div className='bg-red-100 text-red-700 px-4 py-2 rounded mb-4'>{error}</div>}

      {/* Registration form */}
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Name input */}
        <input
          type='text'
          className='w-full border border-gray rounded-md p-2'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete='off'
        />

        {/* Email input */}
        <input
          type='email'
          className='w-full border border-gray rounded-md p-2'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='off'
        />

        {/* Password input */}
        <input
          type='password'
          className='w-full border border-gray rounded-md p-2'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='off'
        />

        {/* Submit button */}
        <button
          className='bg-blue-600 text-white font-semibold px-4 py-2 rounded-md w-full hover:bg-blue-700 disabled:opacity-50'
          disabled={isPending}
        >
          {isPending ? "Registering..." : "Register"}
        </button>
      </form>

      {/* Link to login page */}
      <p className='text-sm text-center mt-4'>
        Already have an account?{" "}
        <Link to='/login' className='text-blue-600 hover:underline font-medium'>
          Login
        </Link>
      </p>
    </div>
  );
}
