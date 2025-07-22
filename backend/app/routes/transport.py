from fastapi import APIRouter
from ..models import TransportOut

router = APIRouter(prefix="/transport", tags=["transport"])

transports = [
    TransportOut(id=1, type="taxi", provider="Yellow Cab", pickup="JFK", dropoff="Manhattan", price=50.0),
    TransportOut(id=2, type="uber", provider="Uber", pickup="LAX", dropoff="Santa Monica", price=40.0),
]

@router.get("/search", response_model=list[TransportOut])
def search_transport():
    return transports

@router.get("/{transport_id}", response_model=TransportOut)
def get_transport(transport_id: int):
    for t in transports:
        if t.id == transport_id:
            return t
    return None 