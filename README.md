# Mi Tickets

Mi Tickets is a small React single-page application for creating and managing support tickets. It uses client-side routing (react-router), localStorage for persistence, and a simple simulated network layer for CRUD operations.

---

## Features
- Sign up and log in (client-side, localStorage-backed)
- Create, view, update, and delete tickets
- Simple ticket metadata: title, description, status, priority
- Protected routes (dashboard/tickets)
- Toast notifications and confirmation dialogs
- Lightweight simulated network delay for UX parity with real APIs

---

## Prerequisites
- Node.js (>= 14) and npm (or yarn)
- A modern browser with localStorage enabled

---

## Install & run (development)
1. Open the repo root:
   c:\Users\user\Documents\GitHub\Mi_Tickets

2. Install dependencies:
   - Using npm:
     npm install
   - Or using yarn:
     yarn

3. Start the dev server:
   npm start
   or
   yarn start

4. Open http://localhost:3000 in your browser.

Notes:
- If you change file locations (for example move context/AuthContext.jsx into src/), update relative imports accordingly and restart the dev server (Ctrl+C → npm start).

---

## Build / Production
- Build production bundle:
  npm run build
  or
  yarn build
- Serve the `build` folder with any static server.

---

## Project structure (important files)
- src/
  - App.jsx — application routes and top-level Router and AuthProvider wrapper
  - pages/
    - LandingPage.jsx — homepage with hero and decorative SVG
    - loginPage.jsx — login form
    - SigninPage.jsx — signup form
    - Dashboard.jsx — dashboard page
    - TicketList.jsx — tickets listing and management
  - layout/
    - mainLayout.jsx — header, Outlet, footer
    - AuthLayout.jsx — routes for auth pages
  - components/
    - Footer.jsx
    - TicketForm.jsx
    - TicketCard.jsx
    - Toast.jsx
    - protectedRoute.jsx
  - utilities/
    - ticketServices.js — localStorage-backed ticket CRUD helpers
    - validators.js — validation helpers
  - styles/
    - Footer.css
    - TicketList.css
  - context/
    - AuthContext.jsx — AuthProvider, login/signup, localStorage persistence

---

## Routes
- `/` — Landing page
- `/auth/login` — Login page
- `/auth/signup` — Signup page
- `/dashboard` — Protected dashboard (requires login)
- `/tickets` — Protected tickets list (requires login)

---

## How authentication works
- The app uses a React Context `AuthProvider` (context/AuthContext.jsx).
- Users are persisted in localStorage under the key `users` (an array).
- When a user signs up or logs in, the provider stores session data:
  - `auth_user` (JSON user object)
  - `auth_token` (generated token string)

Note: Some components or legacy checks may reference `ticketapp_session`. Keep keys consistent — prefer `auth_token` and `auth_user`. If ProtectedRoute checks a different key, update it to check the AuthContext's `isAuthenticated` or the same localStorage key.

---

## How to use (user workflow)
1. Visit `/auth/signup` and create an account (name, email, password).
2. After signup you should be logged in automatically and redirected (depends on implementation).
3. Navigate to Dashboard or Tickets in the header.
4. Click "Create ticket" (opens form) — fill Title, Description, Status, Priority — submit.
5. Tickets appear in the list; you can Edit or Delete them.
6. Log out using the app's logout control (if present) — clears session.

---

## Ticket data persistence
- Tickets are stored in localStorage under key: `tickets`
- Ticket object example:
  {
    id: 1616161616161,
    title: "Example",
    description: "Details...",
    status: "open",
    priority: "high"
  }

---

## Common problems & troubleshooting
- Blank form or missing components:
  - Ensure `AuthProvider` wraps the Router in `App.jsx`. Missing provider can cause useAuth() to return undefined.
- Import resolution errors:
  - If you see `Failed to resolve import "../context/AuthContext"`, check the file path and update imports from `src/pages` to the correct path:
    - If AuthContext lives at project root `/context/AuthContext.jsx` then use `../../context/AuthContext`.
    - Alternatively move `context/` into `src/` and use `../context/AuthContext`.
- Routes redirect to `dashboard/auth/login`:
  - Ensure redirects use absolute paths (`/auth/login`) not relative (`auth/login`).
- Nav links not clickable:
  - Check for overlays or CSS that cover the header (z-index, pointer-events). Temporarily set header `position: relative; z-index: 9999` to test.
- SVG / footer spacing on LandingPage:
  - If there’s a gap between the decorative SVG and footer, set `.hero-wave { line-height: 0; display: block; margin-bottom: -4px; }` and `footer { margin-top: 0; }` to lap the footer.
- Ticket creation not working:
  - Ensure `TicketForm` validation returns falsy for no-errors and that `onSubmit` is called.
  - Ensure `ticketServices.createTicket` returns the created ticket and `TicketList` updates its state after creation.
- Toast component errors:
  - Toast must define `duration` and guard when `message` is falsy.

---

## Developer notes
- Keep imports consistent and use React Router v6 APIs (NavLink props changed; use `className={({ isActive }) => ... }`).
- Use absolute routes for navigation if you mean root-based routes (`/auth/login`).
- Keep localStorage key names consistent across components and update ProtectedRoute to trust `useAuth().isAuthenticated`.
- When adding CSS, test with DevTools element inspector to find which rule affects layout or pointer events.

---

## Contributing
- Fork, branch, and open PRs for fixes or features.
- Add unit tests where applicable; existing project may not include a test framework.

---

## License
- MIT (or update to your chosen license)

---

If you want, I can:
- generate this README as a file in the repository,
- create a short troubleshooting checklist script,
- or produce a consistent list of localStorage keys and update AuthContext / ProtectedRoute to use them.