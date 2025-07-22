from fastapi import APIRouter, HTTPException
from ..models import BookingOut
import datetime

router = APIRouter(prefix="/bookings", tags=["bookings"])

bookings = []

@router.post("/", response_model=BookingOut)
def create_booking(booking: BookingOut):
    booking.id = len(bookings) + 1
    booking.created_at = datetime.datetime.utcnow()
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