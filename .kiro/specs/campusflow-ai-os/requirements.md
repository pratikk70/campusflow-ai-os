# Requirements Document

## Introduction

CampusFlow AI OS is an intelligent campus dashboard designed for college students. It consolidates academic routines, attendance tracking, campus logistics (mess menus, transport), and AI-powered text parsing into a single polished dark-mode interface. The system uses Google Gemini as its AI backbone for both structured data extraction and conversational Q&A. Built for the Amazon HackOn 6.0 virtual hackathon, the project targets a final-year IT student at NIT Raipur as its primary persona.

## Glossary

- **Dashboard**: The main React frontend application providing the dark-mode "AI OS" visual interface
- **Backend_Server**: The Node.js/Express.js REST API server running on port 8000
- **Gemini_Engine**: The Google Gemini SDK integration (`@google/generative-ai`) used for text processing and conversational AI
- **Routine_Widget**: The frontend component displaying current and upcoming class slots
- **Logistics_Widget**: The frontend component displaying hostel mess menu and campus transport shuttle countdowns
- **Attendance_Matrix**: The frontend component showing subject-wise attendance percentages with visual status tags
- **Data_Parser**: The frontend text area component and corresponding backend endpoint for extracting structured events from unstructured text
- **Chat_Panel**: The floating, toggleable slide-out panel for conversational AI Q&A
- **Schedule_Model**: The MongoDB document schema with fields: category, title, summary, date
- **Message_Model**: The MongoDB document schema with fields: role, content
- **Category**: One of PLACEMENT, ASSIGNMENT, CLUB, or UPDATE — used to classify extracted schedule entries
- **Mock_Data**: Pre-seeded realistic data representing a final-year IT student at NIT Raipur

## Requirements

### Requirement 1: Frontend Project Setup

**User Story:** As a developer, I want the frontend scaffolded with React (Vite), Tailwind CSS v3, and Lucide React, so that I have a consistent and modern development environment without Next.js dependencies.

#### Acceptance Criteria

1. THE Dashboard SHALL be bootstrapped using Vite with React template and configured with Tailwind CSS v3
2. THE Dashboard SHALL use Lucide React as the sole icon library
3. THE Dashboard SHALL NOT include Next.js or any Next.js-related dependencies

### Requirement 2: Dark-Mode Dashboard Layout

**User Story:** As a student, I want a polished dark-mode dashboard with an "AI OS" aesthetic, so that the interface feels premium and is comfortable for extended use.

#### Acceptance Criteria

1. THE Dashboard SHALL render a dark-mode interface as the default and only theme
2. THE Dashboard SHALL use a consistent dark color palette across all components
3. THE Dashboard SHALL present all widgets in a responsive grid layout that adapts to viewport width

### Requirement 3: Routine Context Widget

**User Story:** As a student, I want to see my current and upcoming class slots at a glance, so that I stay informed about my daily academic schedule.

#### Acceptance Criteria

1. THE Routine_Widget SHALL display the current class slot with subject name, time, and location
2. THE Routine_Widget SHALL display upcoming class slots for the remainder of the day in chronological order
3. WHEN the Dashboard loads for the first time, THE Routine_Widget SHALL render with Mock_Data representing a final-year IT student schedule at NIT Raipur

### Requirement 4: Campus and Personal Life Logistics Widget

**User Story:** As a student, I want to see today's hostel mess menu and campus transport shuttle countdowns, so that I can plan meals and travel without checking multiple sources.

#### Acceptance Criteria

1. THE Logistics_Widget SHALL display today's hostel mess menu with meal categories (breakfast, lunch, snacks, dinner)
2. THE Logistics_Widget SHALL display campus transport shuttle information with countdown timers showing time until next departure
3. WHEN the Dashboard loads for the first time, THE Logistics_Widget SHALL render with Mock_Data representing NIT Raipur hostel mess and shuttle schedules

### Requirement 5: Attendance Matrix Tracker

**User Story:** As a student, I want to see my subject-wise attendance percentages with visual risk indicators, so that I can identify subjects where my attendance is at risk.

#### Acceptance Criteria

1. THE Attendance_Matrix SHALL display each enrolled subject with its attendance percentage
2. THE Attendance_Matrix SHALL display a visual status tag of "Safe" for subjects with attendance at or above 75%
3. THE Attendance_Matrix SHALL display a visual status tag of "At Risk" for subjects with attendance below 75%
4. WHEN the Dashboard loads for the first time, THE Attendance_Matrix SHALL render with Mock_Data including subjects such as Advanced DBMS, Machine Learning, and Computer Networks with varied attendance values

### Requirement 6: Unstructured Data Parser

**User Story:** As a student, I want to paste chaotic WhatsApp or email text and get clean, structured event cards, so that I never miss important announcements buried in group messages.

#### Acceptance Criteria

1. THE Data_Parser SHALL provide a text area input where the user can paste unstructured text
2. WHEN the user submits text in the Data_Parser, THE Dashboard SHALL send the text to the Backend_Server POST /api/summarize endpoint
3. WHEN the Backend_Server returns a successful response, THE Data_Parser SHALL render the extracted data as a timeline event card showing category, title, summary, and date
4. THE Data_Parser SHALL display all previously extracted timeline cards sorted by newest first
5. IF the Backend_Server returns an error, THEN THE Data_Parser SHALL display a user-friendly error message

### Requirement 7: Floating AI Chat Panel

**User Story:** As a student, I want a toggleable AI chat panel for instant Q&A about campus life, so that I can quickly get answers without leaving the dashboard.

#### Acceptance Criteria

1. THE Chat_Panel SHALL be togglable via a floating action button visible on all dashboard views
2. WHEN the user opens the Chat_Panel, THE Dashboard SHALL display a slide-out panel with a message history area and text input
3. WHEN the user sends a message in the Chat_Panel, THE Dashboard SHALL send the message to the Backend_Server POST /api/chat endpoint
4. WHEN the Backend_Server returns a response, THE Chat_Panel SHALL display the AI response in the conversation thread
5. THE Chat_Panel SHALL visually distinguish between user messages and AI responses

### Requirement 8: Backend Server Setup

**User Story:** As a developer, I want a Node.js/Express server connected to MongoDB Atlas, so that the frontend has a reliable API layer for data persistence and AI processing.

#### Acceptance Criteria

1. THE Backend_Server SHALL run on port 8000
2. THE Backend_Server SHALL connect to MongoDB Atlas using Mongoose
3. THE Backend_Server SHALL define a Schedule_Model with fields: category (String, enum: PLACEMENT, ASSIGNMENT, CLUB, UPDATE), title (String), summary (String), date (Date)
4. THE Backend_Server SHALL define a Message_Model with fields: role (String, enum: user, assistant), content (String)
5. THE Backend_Server SHALL enable CORS for cross-origin requests from the frontend

### Requirement 9: GET /api/routine Endpoint

**User Story:** As a frontend client, I want to fetch routine, attendance, and mess data from a single endpoint, so that the dashboard can render all context widgets on initial load.

#### Acceptance Criteria

1. WHEN a GET request is received at /api/routine, THE Backend_Server SHALL return a JSON response containing routine schedule data, attendance data, and mess menu data
2. THE Backend_Server SHALL return routine data with fields: subject, time, location for each class slot
3. THE Backend_Server SHALL return attendance data with fields: subject, percentage for each enrolled subject
4. THE Backend_Server SHALL return mess data with fields: meal (breakfast, lunch, snacks, dinner) and items for each meal
5. THE Backend_Server SHALL seed the /api/routine response with realistic Mock_Data for a final-year IT student at NIT Raipur

### Requirement 10: GET /api/schedule Endpoint

**User Story:** As a frontend client, I want to retrieve all parsed timeline entries sorted by date, so that the Data_Parser can display a history of extracted events.

#### Acceptance Criteria

1. WHEN a GET request is received at /api/schedule, THE Backend_Server SHALL query all Schedule_Model documents from MongoDB
2. WHEN a GET request is received at /api/schedule, THE Backend_Server SHALL return the documents sorted by date in descending order (newest first)
3. WHEN no documents exist in the collection, THE Backend_Server SHALL return an empty array

### Requirement 11: POST /api/summarize Endpoint

**User Story:** As a student, I want the system to extract structured event data from raw text using AI, so that chaotic messages are converted into actionable schedule entries.

#### Acceptance Criteria

1. WHEN a POST request with a raw text payload is received at /api/summarize, THE Backend_Server SHALL send the text to the Gemini_Engine for processing
2. THE Gemini_Engine SHALL extract a category (one of PLACEMENT, ASSIGNMENT, CLUB, UPDATE), a clean title, and a one-sentence summary from the provided text
3. WHEN the Gemini_Engine returns extracted data, THE Backend_Server SHALL save a new Schedule_Model document to MongoDB with the extracted category, title, summary, and current date
4. WHEN the document is saved successfully, THE Backend_Server SHALL return the saved document as a JSON response
5. IF the raw text payload is empty or missing, THEN THE Backend_Server SHALL return a 400 status code with an error message
6. IF the Gemini_Engine fails to process the text, THEN THE Backend_Server SHALL return a 500 status code with an error message
7. THE Backend_Server SHALL configure the Gemini SDK with responseMimeType: 'application/json' to guarantee the LLM returns a strictly parsable JSON string without markdown formatting.

### Requirement 12: POST /api/chat Endpoint

**User Story:** As a student, I want to ask open-ended campus questions and receive AI-generated answers grounded in my schedule and routine data, so that the AI chat is contextually aware.

#### Acceptance Criteria

1. WHEN a POST request with a user message is received at /api/chat, THE Backend_Server SHALL retrieve current routine and schedule data from the database to use as context
2. THE Backend_Server SHALL send the user message along with the retrieved context to the Gemini_Engine
3. WHEN the Gemini_Engine returns a response, THE Backend_Server SHALL save both the user message and the AI response as Message_Model documents
4. WHEN messages are saved successfully, THE Backend_Server SHALL return the AI response content as a JSON response
5. IF the user message is empty or missing, THEN THE Backend_Server SHALL return a 400 status code with an error message
6. IF the Gemini_Engine fails to generate a response, THEN THE Backend_Server SHALL return a 500 status code with an error message

### Requirement 13: Gemini SDK Integration

**User Story:** As a developer, I want a centralized Gemini SDK configuration in the backend, so that all AI-powered endpoints use a consistent and maintainable integration.

#### Acceptance Criteria

1. THE Backend_Server SHALL use the `@google/generative-ai` npm package as the sole AI SDK
2. THE Backend_Server SHALL initialize the Gemini_Engine using an API key loaded from environment variables
3. THE Backend_Server SHALL use the Gemini_Engine for both the /api/summarize and /api/chat endpoints
4. THE Backend_Server SHALL explicitly target the gemini-1.5-flash model for all Gemini SDK calls to ensure high-speed, low-cost processing.

### Requirement 14: Mock Data Seeding

**User Story:** As a hackathon judge, I want the application to look spectacular on first render without requiring manual data entry, so that the demo is immediately impressive.

#### Acceptance Criteria

1. THE Dashboard SHALL render all widgets with pre-seeded Mock_Data on initial load without requiring any user interaction
2. THE Mock_Data SHALL represent a realistic final-year IT student at NIT Raipur with subjects including Advanced DBMS, Machine Learning, Computer Networks, and Compiler Design
3. THE Mock_Data SHALL include realistic hostel mess menu items for NIT Raipur
4. THE Mock_Data SHALL include campus shuttle routes with realistic timing
