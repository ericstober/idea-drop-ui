# IdeaDrop UI

A modern React frontend for IdeaDrop - a platform to share, explore, and manage startup ideas and side projects.

## Features

- Authentication (login, register, logout)
- Token refresh with secure cookie-based auth
- Create, read, update, and delete ideas (CRUD)
- File-based routing with TanStack Router
- Server state management with TanStack Query
- Clean, responsive UI with Tailwind CSS
- Protected UI and conditional rendering based on auth state

## Tech Stack

- React (Vite)
- TypeScript
- TanStack Router (file-based routing)
- TanStack Query (data fetching & caching)
- Axios (API requests)
- Tailwind CSS (styling)

## Project Structure

src/
api/ # API calls (ideas, auth)
components/ # Reusable UI components
context/ # Auth context (AuthProvider)
routes/ # File-based routing (TanStack Router)
lib/ # Utilities (axios instance, token handling)
styles.css # Global styles
main.tsx # App entry point

## Authentication Flow

1. User logs in or registers
2. Backend returns:

- accessToken (stored in context)
- refreshToken (HTTP-only cookie)

3. On app load:

- authProvier call /auth/refresh
- Restores user session automatically

4. Access token is attached to API requests

This provides:

- Secure auth (httpOnly cookies)
- Seamless session persistence
- No manual token storage required

## Getting Started

1. Clone the repo

```bash
git clone https://github.com/ericstober/idea-drop-ui.git
cd idea-drop-ui
```

2. Install dependencies

```bash
npm install
```

3. Setup environment variables
   Create a .env file:

```bash
VITE_API_URL=http://localhost:5000/api
```

4. Run the development server

```bash
npm run dev
```

5. Build for production

```bash
npm run build
```

## Routing

This project uses TanStack Router with file-based routing.

Routes are defined in:

```
/src/routes/
```

Example:

```
/routes
  index.tsx         → "/"
  ideas.tsx         → "/ideas"
  ideas.$id.tsx     → "/ideas/:id"
  (auth)/
    login.tsx       → "/login"
    register.tsx    → "/register"
```

- Layouts are defined using route groups like (auth)
- `<Outlet />` is used for nested routes

## Data Fetching

Uses TanStack Query + Router loaders:

```
loader → prefetch data
useSuspenseQuery → read from cache
```

## Benefits:

- No loading flashes
- No duplicate requests
- Instant navigation

## Styling

- Built with Tailwind CSS
- Utility-first styling approach
- Easily customizable

## Key Concepts

- AuthProvider -> global auth state
- React Query -> server state & caching
- Router loaders -> prefetch data before rendering
- Context + hooks -> clean state sharing

## Future Improvements

- Route protection (redirect unauthenticated users)
- Optmisitic UI updates
- Pagination / infinite scroll
- Better error handling UX
- Modal confirmations (delete, logout)
