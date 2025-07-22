# AI Travel Agent

## Overview
A full-stack AI-powered travel agent application with a Python FastAPI backend and a static HTML/CSS/JS frontend. Features include real-time flight search (Aviationstack), hotel/transport search, bookings, payments (Razorpay), and an AI chatbot powered by Google Gemini using context engineering.

---

## Context Engineering

Context Engineering
Context engineering is the practice of designing, structuring, and managing the information (context) that an AI system uses to generate intelligent, relevant, and personalized responses.

How It's Used in This Project

The AI chatbot leverages context engineering to:

Remember user preferences, previous queries, and booking history within a session.
Provide multi-turn, context-aware conversations 
Adapt responses based on user profile, travel history, and ongoing conversation.
Context is managed in the backend and passed to the Gemini model, enabling more natural, helpful, and personalized travel assistance.
Role of .md Context Files

This project includes several key Markdown (.md) files that are essential for context engineering and structured development:  
**1. PRD.md** – Product Requirements Document: Outlines the vision, features, and goals of the project.  
**2. implementation.md** – Step-by-step implementation plan, tech stack decisions, and development milestones.  
**3. UI_UX.md** – User interface and user experience guidelines, wireframes, and design principles.  
**4. Bug-Tracking.md** – Used to log, track, and resolve bugs throughout the project lifecycle.  
**5. project-structure.md** – Explains the directory and file organization, naming conventions, and modularization strategy.  
**6. workflow.md** – (If present) Describes the recommended development workflow, including branching, code review, and deployment practices.  
**7. generate.md** – (If present) Used for code generation instructions, prompts, or AI-assisted development notes.

> Tip:
> Spend 2–3 hours carefully designing and customizing these .md files according to your project’s needs.
> Well-maintained context files make your project easier to understand, extend, and maintain for both humans and AI-powered tools. They ensure that everyone (and every tool) working on the project has a shared understanding of requirements, design, workflow, and architecture. This enables more intelligent automation, better onboarding, and more effective collaboration.

---

### Frontend
- **HTML5, CSS3, JavaScript (vanilla)**
- Responsive static files in `/frontend`
- Served by FastAPI backend

### Backend
- **Python 3.9+**
- **FastAPI** (REST API, static file serving)
- **SQLAlchemy** (ORM)
- **SQLite** (default DB, can use PostgreSQL/MySQL)
- **JWT Authentication** (register/login)
- **Google Gemini AI** (chatbot, via `google-generativeai`)
- **Aviationstack** (real-time flight search)
- **Razorpay** (payment integration)
- **dotenv** (for environment variables)

---

## Project Structure
```
AI_Agent_travel_booking/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── auth.py
│   │   ├── routes/
│   │   │   ├── flights.py       # Real-time flight search (Aviationstack)
│   │   │   ├── hotels.py
│   │   │   ├── transport.py
│   │   │   ├── bookings.py
│   │   │   ├── users.py
│   │   │   └── payments.py      # Razorpay integration
│   │   └── services/
│   ├── travel_agent.db
│   └── venv/
├── frontend/
│   ├── index.html
│   ├── css/
│   ├── js/
│   ├── images/
│   └── assets/
├── Docs/
├── shared/
├── requirements.txt
└── Readme.md
```

---

## Environment Variables (`backend/.env`)
```
GEMINI_API_KEY=your_gemini_api_key
SECRET_KEY=your_jwt_secret
DATABASE_URL=sqlite:///./travel_agent.db
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
AVIATIONSTACK_API_KEY=your_aviationstack_api_key
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
- **Real-time Flight Search** (Aviationstack API)
- **Hotel/Transport Search** (dummy data, ready for API integration)
- **Bookings** (in-memory, can be extended to DB)
- **User Auth** (register/login, JWT)
- **Payments** (Razorpay order creation and payment modal)
- **Responsive UI** (static HTML/CSS/JS)
- **Flight Details Modal** (view all info for a specific flight)

---

## Troubleshooting
- **500 Internal Server Error:** Check backend terminal for Python error/traceback. Common causes: invalid API key, quota exceeded, missing package, unsupported route/date in API.
- **422 Unprocessable Entity:** Usually means invalid JSON in request body.
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

<img width="1293" height="703" alt="ai10" src="https://github.com/user-attachments/assets/fd94124c-ea9e-4209-8db9-8fe1f91eda95" />

<img width="1291" height="699" alt="ai11" src="https://github.com/user-attachments/assets/45e80f11-c117-4625-b0f5-8eb365ffb989" />

<img width="1291" height="701" alt="ai12" src="https://github.com/user-attachments/assets/eed4cb28-17ee-4ea6-a64d-8e698dccea2a" />

---
**Designed by Shubham Kambale**
