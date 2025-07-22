from fastapi import APIRouter, Query
from ..models import HotelOut

router = APIRouter(prefix="/hotels", tags=["hotels"])

hotels = [
    HotelOut(id=1, name="Demo Hotel", location="Demo City", price_per_night=100, rating=4.2),
    HotelOut(id=2, name="Sample Inn", location="Demo City", price_per_night=80, rating=3.8),
]

@router.get("/search", response_model=list[HotelOut])
def search_hotels(city: str = Query(...)):
    return [
        HotelOut(id=1, name="Demo Hotel", location=city, price_per_night=100, rating=4.2),
        HotelOut(id=2, name="Sample Inn", location=city, price_per_night=80, rating=3.8),
    ]

@router.get("/{hotel_id}", response_model=HotelOut)
def get_hotel(hotel_id: int):
    for h in hotels:
        if h.id == hotel_id:
            return h
    return None 