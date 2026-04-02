import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/auth";
import { useAuth } from "@/context/AuthContext";

// Define route for "/login" (inside auth layotu)
export const Route = createFileRoute("/(auth)/login/")({
  component: LoginPage,
});

function LoginPage() {
  // Navigation after successful login
  const navigate = useNavigate();

  // Get auth setters from context
  const { setAccessToken, setUser } = useAuth();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Local error state for displaying API errors
  const [error, setError] = useState("");

  // Mutation for login request
  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginUser,

    // On successful login
    onSuccess: (data) => {
      // Store access token & user in global auth state
      setAccessToken(data.accessToken);
      setUser(data.user);

      // Redirect to ideas page
      navigate({ to: "/ideas" });
    },

    // Handle login errors (e.g., invalid credentials)
    onError: (error: any) => {
      setError(error.message);
    },
  });

  // Handle form submission
  const handleSubmit = async (e: React.SubmitEvent) => {
    // Prevent page reload
    e.preventDefault();

    // Clear previous error
    setError("");

    // Trigger login mutation
    await mutateAsync({ email, password });
  };

  return (
    <div className='max-w-md mx-auto'>
      {/* Page title */}
      <h1 className='text-3xl font-bold mb-6'>Login</h1>

      {/* Error message display */}
      {error && <div className='bg-red-100 text-red-700 px-4 py-2 rounded mb-4'>{error}</div>}

      {/* Login form */}
      <form onSubmit={handleSubmit} className='space-y-4'>
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

        {/* Login button */}
        <button
          className='bg-blue-600 text-white font-semibold px-4 py-2 rounded-md w-full hover:bg-blue-700 disabled:opacity-50'
          disabled={isPending}
        >
          {isPending ? "Logging In..." : "Login"}
        </button>
      </form>

      {/* Link to registration page */}
      <p className='text-sm text-center mt-4'>
        Don't have an account?{" "}
        <Link to='/register' className='text-blue-600 hover:underline font-medium'>
          Register
        </Link>
      </p>
    </div>
  );
}
