import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from .database import Base, engine
from .auth import router as auth_router
from .routes.flights import router as flights_router
from .routes.hotels import router as hotels_router
from .routes.transport import router as transport_router
from .routes.bookings import router as bookings_router
from .routes.users import router as users_router
from .routes.payments import router as payments_router
import traceback

load_dotenv()
print("Loaded AVIATIONSTACK_API_KEY:", os.getenv("AVIATIONSTACK_API_KEY"))

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY not set in environment")

genai.configure(api_key=GEMINI_API_KEY)

app = FastAPI(title="AI Travel Agent Backend (Python)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

app.include_router(auth_router, prefix="/api/auth")
app.include_router(flights_router, prefix="/api")
app.include_router(hotels_router, prefix="/api")
app.include_router(transport_router, prefix="/api")
app.include_router(bookings_router, prefix="/api")
app.include_router(users_router, prefix="/api")
app.include_router(payments_router, prefix="/api")

class ChatRequest(BaseModel):
    message: str
    context: dict = {}

@app.get("/api/ai/health")
def health():
    return {"status": "ok", "service": "Gemini AI"}

@app.post("/api/ai/chat")
def chat(req: ChatRequest):
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(req.message)
        return {"success": True, "response": response.text}
    except Exception as e:
        print("=== ERROR in /api/ai/chat ===")
        traceback.print_exc()  # This will print the full error stack trace to your terminal
        raise HTTPException(status_code=500, detail=str(e))

# Serve frontend static files at root
frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../frontend'))
app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="frontend")

@app.get("/")
def root():
    return FileResponse(os.path.join(frontend_dir, "index.html")) 