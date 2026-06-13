# Implementation Plan: CampusFlow AI OS

## Overview

This plan implements CampusFlow AI OS as two independent directories — a React (Vite) frontend and a Node.js/Express backend. Tasks are ordered to build the backend API first (so the frontend has endpoints to consume), then the frontend widgets, and finally integration wiring.

## Tasks

- [x] 1. Initialize backend project and core configuration
  - [x] 1.1 Initialize `campusflow-backend` with npm, install dependencies (express, mongoose, cors, dotenv, @google/generative-ai)
    - Create `campusflow-backend/package.json` with start script (`node server.js`)
    - Create `campusflow-backend/.env` with placeholder keys: `MONGO_URI`, `GEMINI_API_KEY`, `PORT=8000`
    - _Requirements: 8.1, 8.2, 8.5, 13.1, 13.2_
  - [x] 1.2 Create `server.js` with Express app, CORS middleware, dotenv config, and MongoDB connection
    - Express listening on port 8000
    - Mongoose connect to `MONGO_URI`
    - CORS enabled for all origins
    - Mount route placeholders for `/api/routine`, `/api/schedule`, `/api/summarize`, `/api/chat`
    - _Requirements: 8.1, 8.2, 8.5_
  - [x] 1.3 Create Mongoose models: `models/Schedule.js` and `models/Message.js`
    - Schedule schema: category (enum: PLACEMENT, ASSIGNMENT, CLUB, UPDATE), title (String), summary (String), date (Date, default: Date.now)
    - Message schema: role (enum: user, assistant), content (String), timestamps enabled
    - _Requirements: 8.3, 8.4_

- [x] 2. Implement backend mock data and GET endpoints
  - [x] 2.1 Create `data/mockData.js` with realistic NIT Raipur mock data
    - Routine: 5-6 class slots (Advanced DBMS, Machine Learning, Computer Networks, Compiler Design, etc.) with times and locations
    - Attendance: subject-percentage pairs with mix above/below 75%
    - Mess menu: breakfast, lunch, snacks, dinner with realistic items
    - Shuttles: 2-3 routes with nextDeparture times and frequency
    - _Requirements: 14.1, 14.2, 14.3, 14.4_
  - [x] 2.2 Implement `routes/routine.js` — GET /api/routine
    - Return the mock data object with routine, attendance, mess, shuttles fields
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_
  - [x] 2.3 Implement `routes/schedule.js` — GET /api/schedule
    - Query all Schedule documents, sort by date descending, return array
    - Return empty array when no documents exist
    - _Requirements: 10.1, 10.2, 10.3_

- [x] 3. Implement Gemini service and AI endpoints
  - [x] 3.1 Create `services/gemini.js` — Gemini SDK initialization
    - Import `@google/generative-ai`, initialize with `GEMINI_API_KEY` from env
    - Export a `getModel()` function targeting `gemini-1.5-flash`
    - _Requirements: 13.1, 13.2, 13.3, 13.4_
  - [x] 3.2 Implement `routes/summarize.js` — POST /api/summarize
    - Validate request body has non-empty `text` field, return 400 if missing
    - Call Gemini with prompt instructing extraction of category, title, summary from the text
    - Configure `responseMimeType: 'application/json'` in generation config
    - Parse Gemini JSON response, create and save Schedule document
    - Return saved document as JSON (200)
    - Handle Gemini failure with 500 response
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7_
  - [x] 3.3 Implement `routes/chat.js` — POST /api/chat
    - Validate request body has non-empty `message` field, return 400 if missing
    - Fetch current routine mock data and recent schedules from DB for context
    - Call Gemini with system context + user message
    - Save user message and assistant response as Message documents
    - Return `{ response: "..." }` as JSON (200)
    - Handle Gemini failure with 500 response
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_

- [x] 4. Checkpoint — Backend API complete
  - Verify all four endpoints work correctly with manual curl/Postman tests
  - Ensure MongoDB connection succeeds and documents persist
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Initialize frontend project
  - [x] 5.1 Scaffold `campusflow-frontend` with Vite React template
    - Run `npm create vite@latest campusflow-frontend -- --template react`
    - Install dependencies: `tailwindcss`, `postcss`, `autoprefixer`, `lucide-react`, `axios`
    - _Requirements: 1.1, 1.2, 1.3_
  - [x] 5.2 Configure Tailwind CSS v3
    - Create `tailwind.config.js` with content paths and dark mode class
    - Create `postcss.config.js`
    - Update `src/index.css` with Tailwind directives (`@tailwind base/components/utilities`)
    - Set dark color palette defaults (slate-900, slate-800 backgrounds, white/gray text)
    - _Requirements: 1.1, 2.1, 2.2_
  - [x] 5.3 Create App shell with dark-mode layout
    - Create `src/App.jsx` with dark background, grid layout container
    - Create `src/components/Header.jsx` with "CampusFlow AI OS" branding
    - Create `src/components/DashboardGrid.jsx` as responsive grid wrapper
    - _Requirements: 2.1, 2.2, 2.3_

- [x] 6. Implement frontend context widgets
  - [x] 6.1 Create `RoutineWidget.jsx`
    - Accept `routine` array as prop
    - Render current class slot highlighted (based on current time or first slot)
    - Render remaining slots in chronological list
    - Display subject, time, location for each slot
    - Use Lucide icons (Clock, MapPin, BookOpen)
    - _Requirements: 3.1, 3.2, 3.3_
  - [x] 6.2 Create `LogisticsWidget.jsx`
    - Accept `mess` and `shuttles` as props
    - Render meal categories as tabs or sections (breakfast, lunch, snacks, dinner)
    - Render shuttle routes with countdown timers (compute from nextDeparture time)
    - Use Lucide icons (Utensils, Bus, Timer)
    - _Requirements: 4.1, 4.2, 4.3_
  - [x] 6.3 Create `AttendanceMatrix.jsx`
    - Accept `attendance` array as prop
    - Render each subject with percentage bar
    - Display "Safe" tag (green) for >= 75%, "At Risk" tag (red/amber) for < 75%
    - Use Lucide icons (CheckCircle, AlertTriangle)
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 7. Implement frontend Data Parser
  - [x] 7.1 Create `DataParser.jsx`
    - Render textarea input with placeholder text
    - Submit button that POSTs text to `/api/summarize`
    - On success, prepend new card to timeline list
    - Fetch existing timeline from GET `/api/schedule` on component mount
    - Render timeline cards showing category badge, title, summary, date
    - Display error message on API failure
    - Use Lucide icons (Send, FileText, Calendar)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 8. Implement frontend Chat Panel
  - [x] 8.1 Create `ChatPanel.jsx`
    - Floating action button (FAB) in bottom-right corner, always visible
    - Click FAB toggles slide-out panel from right side
    - Message history area with scroll
    - Text input + send button at bottom
    - POST message to `/api/chat`, append AI response to message list
    - Visually distinguish user (right-aligned, colored) vs assistant (left-aligned, different color) messages
    - Use Lucide icons (MessageCircle, Send, X)
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 9. Wire frontend to backend API
  - [x] 9.1 Integrate App.jsx data fetching
    - On mount, call GET `/api/routine` (use axios or fetch with base URL `http://localhost:8000`)
    - Distribute response data to RoutineWidget, LogisticsWidget, AttendanceMatrix
    - Handle loading state with spinner/skeleton
    - _Requirements: 3.3, 4.3, 5.4, 14.1_
  - [x] 9.2 Configure Vite proxy or API base URL constant
    - Add API base URL constant (`http://localhost:8000`) used by all fetch calls
    - Ensure CORS works between Vite dev server and Express
    - _Requirements: 8.5_

- [x] 10. Final checkpoint — Full integration
  - Run both frontend (Vite dev server) and backend (node server.js) simultaneously
  - Verify dashboard renders all widgets with mock data
  - Verify Data Parser sends text, receives parsed card, displays it
  - Verify Chat Panel sends message, receives AI response, displays conversation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP (none marked in this plan since all tasks are core for the hackathon demo)
- Backend is built first so frontend can consume real endpoints during development
- Mock data is hardcoded in the backend route handler for instant demo readiness
- The `.env` file must be populated with a real `MONGO_URI` and `GEMINI_API_KEY` before running
- All frontend components use Tailwind CSS utility classes — no external component libraries
