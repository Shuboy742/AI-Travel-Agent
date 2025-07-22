# AI Travel Agent

## Overview
A full-stack AI-powered travel agent application with a Python FastAPI backend and a static HTML/CSS/JS frontend. Features include flight/hotel/transport search, bookings, payments (Razorpay), and an AI chatbot powered by Google Gemini using context engineering

---

## Context Engineering

**Context engineering** is the practice of designing, structuring, and managing the information (context) that an AI system uses to generate intelligent, relevant, and personalized responses.

### How It's Used in This Project
- The AI chatbot leverages context engineering to:
  - Remember user preferences, previous queries, and booking history within a session.
  - Provide multi-turn, context-aware conversations (e.g., "Book me a hotel in the same city as my last flight").
  - Adapt responses based on user profile, travel history, and ongoing conversation.
- Context is managed in the backend and passed to the Gemini model, enabling more natural, helpful, and personalized travel assistance.

### Why It Matters
- **Personalization:** Users get recommendations and answers tailored to their needs and history.
- **Intelligence:** The AI can handle complex, multi-step travel planning and follow-up questions.
- **User Experience:** Conversations feel more natural, like talking to a real travel agent.

---

## Context Files and Their Role in Context Engineering

This project includes several key context and documentation files that support context engineering and structured development:

- **PRD.md** – Product Requirements Document: Outlines the vision, features, and goals of the project.
- **implementation.md** – Details the step-by-step implementation plan, tech stack decisions, and development milestones.
- **workflow.md** – Describes the recommended development workflow, including branching, code review, and deployment practices.
- **UI_UX.md** – Documents the user interface and user experience guidelines, wireframes, and design principles.
- **Bug-Tracking.md** – Used to log, track, and resolve bugs throughout the project lifecycle.
- **project-structure.md** – Explains the directory and file organization, naming conventions, and modularization strategy.
- **generate.md** – (If present) Used for code generation instructions, prompts, or AI-assisted development notes.

**Use in Context Engineering:**  
These files are essential for context engineering because they provide structured, accessible, and evolving context for both human developers and AI agents. They ensure that everyone (and every tool) working on the project has a shared understanding of requirements, design, workflow, and architecture. This enables more intelligent automation, better onboarding, and more effective collaboration.

> **Tip:**  
> Spend some time editing and updating these files to match your specific project needs. Well-maintained context files make your project easier to understand, extend, and maintain for both humans and AI-powered tools.

---

## Tech Stack

### Frontend
- **HTML5, CSS3, JavaScript (vanilla)**
- Responsive static files in `/frontend`
- Served by FastAPI backend (no React/Node)

### Backend
- **Python 3.9+**
- **FastAPI** (REST API, static file serving)
- **SQLAlchemy** (ORM)
- **SQLite** (default DB, can use PostgreSQL/MySQL)
- **JWT Authentication** (register/login)
- **Google Gemini AI** (chatbot, via `google-generativeai`)
- **Razorpay** (payment integration)
- **dotenv** (for environment variables)

---

## Project Structure
```
AI_Agent_travel_booking/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── database.py          # SQLAlchemy database configuration
│   │   ├── models.py            # Database models and Pydantic schemas
│   │   ├── auth.py              # JWT authentication endpoints
│   │   ├── routes/              # API route modules
│   │   │   ├── flights.py       # Flight search and booking endpoints
│   │   │   ├── hotels.py        # Hotel search and booking endpoints
│   │   │   ├── transport.py     # Transport search endpoints
│   │   │   ├── bookings.py      # Booking management endpoints
│   │   │   ├── users.py         # User profile and preferences
│   │   │   └── payments.py      # Razorpay payment integration
│   │   └── services/            # Business logic services
│   ├── travel_agent.db          # SQLite database file
│   ├── package.json             # Node.js dependencies (legacy)
│   └── venv/                    # Python virtual environment
├── frontend/
│   ├── index.html               # Main application page
│   ├── css/
│   │   ├── main.css             # Main stylesheet
│   │   ├── reset.css            # CSS reset
│   │   ├── responsive.css       # Responsive design styles
│   │   └── components.css       # Component-specific styles
│   ├── js/
│   │   ├── main.js              # Main application logic
│   │   ├── api.js               # API service layer
│   │   ├── chat.js              # AI chatbot functionality
│   │   ├── auth.js              # Authentication handling
│   │   ├── search.js            # Search functionality
│   │   ├── ui.js                # UI interactions
│   │   ├── utils.js             # Utility functions
│   │   └── config.js            # Configuration settings
│   ├── images/                  # Image assets
│   └── assets/                  # Other static assets
├── Docs/                        # Project documentation
│   ├── project_structure.md     # Detailed project structure
│   ├── Bug_tracking.md          # Bug tracking and issues
│   ├── UI_UX.md                 # UI/UX design guidelines
│   └── implementation.md        # Implementation details
├── shared/                      # Shared resources
│   ├── constants/               # Shared constants
│   └── types/                   # Shared type definitions
├── app/                         # Additional app directory (legacy)
├── venv/                        # Root virtual environment
├── .venv/                       # Alternative virtual environment
├── PRD.md                       # Product Requirements Document
├── requirements.txt             # Python dependencies
├── .gitignore                   # Git ignore rules
└── Readme.md                    # Project documentation
```

---

## Environment Variables (`backend/.env`)
```
GEMINI_API_KEY=your_gemini_api_key
SECRET_KEY=your_jwt_secret
DATABASE_URL=sqlite:///./travel_agent.db
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

---

## How to Run

### 1. Install Python dependencies
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Set up `.env` file
- Copy `.env.example` to `.env` and fill in your keys.

### 3. Start the backend (serves frontend too)
```bash
uvicorn app.main:app --reload
```
- Visit [http://127.0.0.1:8000/](http://127.0.0.1:8000/) for the app
- Visit [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) for API docs

---

## Features
- **AI Chatbot** (Gemini-powered, `/api/ai/chat`)
- **Flight/Hotel/Transport Search** (dummy data, ready for API integration)
- **Bookings** (in-memory, can be extended to DB)
- **User Auth** (register/login, JWT)
- **Payments** (Razorpay order creation)
- **Responsive UI** (static HTML/CSS/JS)

---

## Troubleshooting
- **500 Internal Server Error:** Check backend terminal for Python error/traceback. Common causes: invalid Gemini key, quota exceeded, missing package.
- **422 Unprocessable Entity:** Usually means invalid JSON in request body. Only send one JSON object.
- **Gemini Quota Error:** Wait for quota reset or upgrade your plan. See [Gemini API quotas](https://ai.google.dev/gemini-api/docs/rate-limits).
- **ModuleNotFoundError:** Install missing package with `pip install ...`.
- **CORS Error:** Should not occur if frontend is served by backend.

---

## Contributing
Pull requests are welcome! Please open an issue first to discuss major changes.

## License
MIT

---

## Results

<img width="1293" height="699" alt="AI1" src="https://github.com/user-attachments/assets/565b7ba8-1bcb-409e-834f-594eddae5c82" /> 

<img width="1291" height="700" alt="ai2" src="https://github.com/user-attachments/assets/6d3dd701-dc93-478a-9b21-ece0170f2b1f" /> 

<img width="1290" height="701" alt="ai3" src="https://github.com/user-attachments/assets/57c266c7-4c7b-43f8-8070-3083b0c94b3e" /> 

<img width="1292" height="698" alt="ai4" src="https://github.com/user-attachments/assets/c97c5104-decb-41cd-97ed-d871248f2976" /> 

<img width="1295" height="698" alt="ai6" src="https://github.com/user-attachments/assets/c1c9a9bd-ecba-4717-8f2b-77998d52c1d4" /> 

<img width="1297" height="701" alt="ai7" src="https://github.com/user-attachments/assets/c9c0e743-99b4-42ed-88fc-847d025b26fe" /> 

<img width="1292" height="703" alt="ai8" src="https://github.com/user-attachments/assets/d09fc1e0-7747-4b2c-9e01-29d90c9b6cfa" /> 

<img width="1298" height="699" alt="ai9" src="https://github.com/user-attachments/assets/785ca270-4e15-436d-876b-6ffad620e35b" /> 

---
**Designed by Shubham Kambale**
