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
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── auth.py
│   │   └── routes/
│   │       ├── flights.py
│   │       ├── hotels.py
│   │       ├── transport.py
│   │       ├── bookings.py
│   │       ├── users.py
│   │       └── payments.py
│   ├── .env
│   └── ...
├── frontend/
│   ├── index.html
│   ├── css/
│   ├── js/
│   ├── images/
│   └── assets/
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