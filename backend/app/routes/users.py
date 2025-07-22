from fastapi import APIRouter
from ..models import UserOut

router = APIRouter(prefix="/users", tags=["users"])

dummy_user = UserOut(id=1, email="user@example.com", name="John Doe")

@router.get("/profile", response_model=UserOut)
def get_profile():
    return dummy_user

@router.get("/preferences")
def get_preferences():
    return {"language": "en", "currency": "USD", "notifications": True}

@router.put("/preferences")
def update_preferences(prefs: dict):
    return {"success": True, "updated": prefs} 