from fastapi import APIRouter
from ..models import FlightOut

router = APIRouter(prefix="/flights", tags=["flights"])

flights = [
    FlightOut(id=1, airline="Delta", from_city="NYC", to_city="LAX", depart_time="10:00", arrive_time="13:00", price=300.0, stops=0),
    FlightOut(id=2, airline="United", from_city="NYC", to_city="SFO", depart_time="11:00", arrive_time="14:30", price=350.0, stops=1),
]

@router.get("/search", response_model=list[FlightOut])
def search_flights():
    return flights

@router.get("/{flight_id}", response_model=FlightOut)
def get_flight(flight_id: int):
    for f in flights:
        if f.id == flight_id:
            return f
    return None 