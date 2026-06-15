# 🎓 CampusFlow AI OS

> **"Alexa for your college life."** A unified AI-powered campus assistant that understands your routine, summarizes important updates, organizes schedules, and proactively manages everyday academic life.

<img width="1024" height="516" alt="image" src="https://github.com/user-attachments/assets/af7bf920-06e5-444b-bd7d-0a8ac91ee3f1" />

<img width="1907" height="961" alt="image" src="https://github.com/user-attachments/assets/1d6b2578-dd43-4ad7-9328-091297a7d5f6" />



[![Live Demo](https://img.shields.io/badge/Demo-Live_on_Vercel-success)](https://campusflow-ai-os.vercel.app/) 
[![Track](https://img.shields.io/badge/Track-AWS_AI_for_Campus-orange)](#)
[![Built with Gemini](https://img.shields.io/badge/AI-Google_Gemini_2.5_Flash-blue)](#)

---

## 🧠 The Problem & Our Solution
College students are bombarded with unstructured data: messy WhatsApp forwards about rescheduled classes, scattered PDFs for mess menus, and separate portals for attendance. 

**CampusFlow AI OS** eliminates this fragmentation. Instead of manually tracking schedules, students simply feed the AI their raw campus updates. The AI Operating System automatically structures the data into a real-time, time-aware dashboard, built specifically to handle the bustling academic ecosystem of NIT Raipur.

## ✨ Core Features (Aligned with Track Criteria)

* **🔄 Routine Understanding:** Time-aware widgets calculate the current time to highlight exactly which class is happening *NOW*, shifting upcoming classes dynamically.
* **📝 Update Summarization (Data Parser):** Paste a messy WhatsApp forward or formal email. Our Gemini-powered pipeline extracts the category, title, summary, and date, injecting it directly into the user's timeline.
* **🤖 Instant Q&A:** A sliding, context-aware Chat Panel allows students to ask natural language questions about their campus life and logistics without leaving the dashboard.
* **🚌 Proactive Alerts & Logistics:** Real-time countdown timers for campus shuttle departures and a dynamic Mess Menu that updates based on the time of day (Breakfast, Lunch, Snacks, Dinner).
* **📊 Smart Scheduling & Attendance:** Visual attendance matrices warn students when they drop below the safe 75% threshold.

## 🛠️ Tech Stack

**Frontend:**
* React.js (Vite)
* Tailwind CSS (Custom Dark Mode UI + Glassmorphism)
* Lucide React (Iconography)

**Backend & Database:**
* Node.js & Express.js
* MongoDB Atlas (Mongoose)

**Artificial Intelligence:**
* Google Gemini (Generative Language API) 
* Custom Prompt Engineering for JSON structured extraction

## 🚀 How to Run Locally

If you would like to run CampusFlow AI OS on your local machine, follow these steps:

**1. Clone the repository:**
```bash
git clone [https://github.com/pratikk70/campusflow-ai-os.git](https://github.com/pratikk70/campusflow-ai-os.git)
cd campusflow-ai-os
```

**2. Setup the Backend:**
```bash
cd campusflow-backend
npm install
```
Create a `.env` file in the backend directory using the provided `.env.example` template:
```text
PORT=8000
MONGO_URI=your_mongodb_atlas_uri
GEMINI_API_KEY=your_google_ai_studio_key
```
Start the backend server:
```bash
npm start
```

**3. Setup the Frontend:**
Open a new terminal window:
```bash
cd campusflow-frontend
npm install
```
Create a `.env` file in the frontend directory:
```text
VITE_API_BASE_URL=http://localhost:8000
```
Start the Vite development server:
```bash
npm run dev
```

## 🏗️ Architecture & Design Thinking
*Note for Judges:* We have included our original `.kiro` folder in this repository. Inside, you will find our `design.md` and `requirements.md` files, demonstrating our complete system architecture planning, prompt engineering drafts, and iterative development process before writing the first line of code.

---
*Built with ❤️ for the HackOn with Amazon Web Services hackathon.*
