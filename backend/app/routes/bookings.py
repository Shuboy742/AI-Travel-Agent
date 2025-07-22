from fastapi import APIRouter, HTTPException, Request
from ..models import BookingOut
import datetime

router = APIRouter(prefix="/bookings", tags=["bookings"])

bookings = []

@router.post("/", response_model=BookingOut)
def create_booking(request: Request):
    data = request.json() if hasattr(request, 'json') else None
    # For FastAPI, use await request.json()
    import asyncio
    async def get_data():
        return await request.json()
    data = asyncio.run(get_data())
    # Accept {type: 'flight', id: 1} and map to BookingOut
    booking = BookingOut(
        id=len(bookings) + 1,
        user_id=1,  # Dummy user
        booking_type=data.get('type', 'flight'),
        item_id=data.get('id', 1),
        status='confirmed',
        created_at=datetime.datetime.utcnow()
    )
    bookings.append(booking)
    return booking

@router.get("/", response_model=list[BookingOut])
def get_bookings():
    return bookings

@router.get("/{booking_id}", response_model=BookingOut)
def get_booking(booking_id: int):
    for b in bookings:
        if b.id == booking_id:
            return b
    raise HTTPException(status_code=404, detail="Booking not found")

@router.delete("/{booking_id}")
def cancel_booking(booking_id: int):
    for b in bookings:
        if b.id == booking_id:
            bookings.remove(b)
            return {"success": True}
    raise HTTPException(status_code=404, detail="Booking not found") 