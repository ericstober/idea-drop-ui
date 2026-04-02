import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";

// Define a layout route group "(auth)"
// This does NOT create a URL segment — it's just for grouping routes like /login, /register
export const Route = createFileRoute("/(auth)")({
  component: AuthLayout, // Layout component for all auth-related pages
});

// Layout component shared by all routes inside /(auth)
function AuthLayout() {
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
      <section className='flex-1 text-gray-600'>
        {/* Outlet renders nested routes like:
            - /login
            - /register

            Example:
            /(auth)/login.tsx → renders here
        */}
        <Outlet />
      </section>
    </div>
  );
}
