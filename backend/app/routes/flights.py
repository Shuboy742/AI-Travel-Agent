from fastapi import APIRouter, HTTPException, Request
import os
import httpx
import traceback

router = APIRouter(prefix="/flights", tags=["flights"])

AVIATIONSTACK_API_KEY = os.getenv("AVIATIONSTACK_API_KEY", "f2f6c52f323bf4cc7e2dd490bf60f77f")
AVIATIONSTACK_URL = "http://api.aviationstack.com/v1/flights"

@router.post("/search")
def search_flights(request: Request):
    import asyncio
    async def get_data():
        return await request.json()
    data = asyncio.run(get_data())
    try:
        params = {
            "access_key": AVIATIONSTACK_API_KEY,
            "dep_iata": data["from"],
            "arr_iata": data["to"],
            # Optionally filter by date if needed
        }
        response = httpx.get(AVIATIONSTACK_URL, params=params)
        response.raise_for_status()
        flights = response.json().get("data", [])
        # Map Aviationstack flights to frontend format
        results = []
        for flight in flights:
            results.append({
                "id": flight.get("flight", {}).get("iata", "N/A"),
                "airline": flight.get("airline", {}).get("name", "N/A"),
                "from_city": flight.get("departure", {}).get("iata", "N/A"),
                "to_city": flight.get("arrival", {}).get("iata", "N/A"),
                "depart_time": flight.get("departure", {}).get("scheduled", "N/A"),
                "arrive_time": flight.get("arrival", {}).get("scheduled", "N/A"),
                "price": "-",  # Aviationstack does not provide price
                "stops": 0  # Not available in free API
            })
        return results
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e)) 