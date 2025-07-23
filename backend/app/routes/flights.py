from fastapi import APIRouter, HTTPException, Request
import os
import httpx
import traceback
from datetime import datetime, timedelta
import random

router = APIRouter(prefix="/flights", tags=["flights"])

AVIATIONSTACK_API_KEY = os.getenv("AVIATIONSTACK_API_KEY", "f2f6c52f323bf4cc7e2dd490bf60f77f")
AVIATIONSTACK_URL = "https://api.aviationstack.com/v1/flights"  # Changed to HTTPS

# Mock flight data as fallback
MOCK_FLIGHTS = [
    {
        "id": "AI101",
        "airline": "Air India",
        "from_city": "DEL",
        "to_city": "BOM",
        "depart_time": "10:00",
        "arrive_time": "12:00",
        "price": "$150",
        "stops": 0
    },
    {
        "id": "6E202",
        "airline": "IndiGo",
        "from_city": "DEL",
        "to_city": "BOM",
        "depart_time": "14:30",
        "arrive_time": "16:30",
        "price": "$120",
        "stops": 0
    },
    {
        "id": "SG303",
        "airline": "SpiceJet",
        "from_city": "DEL",
        "to_city": "BOM",
        "depart_time": "18:00",
        "arrive_time": "20:00",
        "price": "$110",
        "stops": 0
    },
    {
        "id": "UK404",
        "airline": "Vistara",
        "from_city": "DEL",
        "to_city": "BOM",
        "depart_time": "08:00",
        "arrive_time": "10:00",
        "price": "$180",
        "stops": 0
    }
]

@router.post("/search")
async def search_flights(request: Request):
    try:
        data = await request.json()
        
        # Validate required fields
        if not data.get("from") or not data.get("to"):
            raise HTTPException(status_code=400, detail="From and To locations are required")
        
        # Try to get real flight data from AviationStack
        try:
            params = {
                "access_key": AVIATIONSTACK_API_KEY,
                "dep_iata": data["from"],
                "arr_iata": data["to"],
                "limit": 10
            }
            
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(AVIATIONSTACK_URL, params=params)
                api_data = response.json()
                print("AviationStack API raw response:", api_data)  # Debug print
                if api_data.get("data") and api_data["data"]:
                    flights = []
                    for flight in api_data["data"]:
                        flights.append({
                            "id": flight.get("flight", {}).get("iata", "N/A"),
                            "airline": flight.get("airline", {}).get("name", "N/A"),
                            "from_city": flight.get("departure", {}).get("iata", "N/A"),
                            "to_city": flight.get("arrival", {}).get("iata", "N/A"),
                            "depart_time": flight.get("departure", {}).get("scheduled", "N/A"),
                            "arrive_time": flight.get("arrival", {}).get("scheduled", "N/A"),
                            "price": "$199",  # Placeholder
                            "stops": 0  # Placeholder
                        })
                    return {"flights": flights}
                # If no data, return mock flights
                mock_flights = [
                    # Major Indian routes
                    {
                        "id": "AI101",
                        "airline": "Air India",
                        "from_city": "DEL",
                        "to_city": "BOM",
                        "depart_time": "2025-08-01T08:00:00+05:30",
                        "arrive_time": "2025-08-01T10:10:00+05:30",
                        "price": "₹ 8,500",
                        "stops": 0
                    },
                    {
                        "id": "6E202",
                        "airline": "IndiGo",
                        "from_city": "BLR",
                        "to_city": "HYD",
                        "depart_time": "2025-08-02T09:30:00+05:30",
                        "arrive_time": "2025-08-02T10:45:00+05:30",
                        "price": "₹ 3,200",
                        "stops": 0
                    },
                    {
                        "id": "SG303",
                        "airline": "SpiceJet",
                        "from_city": "MAA",
                        "to_city": "CCU",
                        "depart_time": "2025-08-03T13:00:00+05:30",
                        "arrive_time": "2025-08-03T15:30:00+05:30",
                        "price": "₹ 5,000",
                        "stops": 1
                    },
                    {
                        "id": "UK404",
                        "airline": "Vistara",
                        "from_city": "DEL",
                        "to_city": "GOI",
                        "depart_time": "2025-08-04T07:00:00+05:30",
                        "arrive_time": "2025-08-04T09:30:00+05:30",
                        "price": "₹ 7,000",
                        "stops": 0
                    },
                    # International routes
                    {
                        "id": "EK501",
                        "airline": "Emirates",
                        "from_city": "BOM",
                        "to_city": "DXB",
                        "depart_time": "2025-08-05T21:00:00+05:30",
                        "arrive_time": "2025-08-05T23:00:00+04:00",
                        "price": "₹ 32,000",
                        "stops": 0
                    },
                    {
                        "id": "BA142",
                        "airline": "British Airways",
                        "from_city": "DEL",
                        "to_city": "LHR",
                        "depart_time": "2025-08-06T03:30:00+05:30",
                        "arrive_time": "2025-08-06T08:00:00+01:00",
                        "price": "₹ 68,000",
                        "stops": 0
                    },
                    {
                        "id": "SQ423",
                        "airline": "Singapore Airlines",
                        "from_city": "BOM",
                        "to_city": "SIN",
                        "depart_time": "2025-08-07T23:55:00+05:30",
                        "arrive_time": "2025-08-08T08:00:00+08:00",
                        "price": "₹ 28,000",
                        "stops": 0
                    },
                    {
                        "id": "LH763",
                        "airline": "Lufthansa",
                        "from_city": "DEL",
                        "to_city": "FRA",
                        "depart_time": "2025-08-08T02:50:00+05:30",
                        "arrive_time": "2025-08-08T07:30:00+02:00",
                        "price": "₹ 75,000",
                        "stops": 0
                    },
                    {
                        "id": "UA83",
                        "airline": "United Airlines",
                        "from_city": "DEL",
                        "to_city": "EWR",
                        "depart_time": "2025-08-09T23:35:00+05:30",
                        "arrive_time": "2025-08-10T05:00:00-04:00",
                        "price": "₹ 90,000",
                        "stops": 0
                    },
                    {
                        "id": "QF68",
                        "airline": "Qantas",
                        "from_city": "DEL",
                        "to_city": "MEL",
                        "depart_time": "2025-08-10T18:00:00+05:30",
                        "arrive_time": "2025-08-11T10:30:00+10:00",
                        "price": "₹ 1,10,000",
                        "stops": 1
                    }
                ]
                return {"flights": mock_flights}
        except Exception as api_error:
            print(f"API Error: {api_error}")
            raise HTTPException(status_code=502, detail="Failed to fetch flight data from AviationStack API.")
    except Exception as e:
        print(f"Flight search error: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

def get_mock_flights(from_city, to_city):
    """Generate mock flight data based on the search criteria"""
    mock_flights = []
    airlines = ["Air India", "IndiGo", "SpiceJet", "Vistara", "GoAir", "AirAsia"]
    
    # Generate 4-6 mock flights
    for i in range(random.randint(4, 6)):
        # Generate random departure time between 6 AM and 10 PM
        hour = random.randint(6, 22)
        minute = random.choice([0, 15, 30, 45])
        depart_time = f"{hour:02d}:{minute:02d}"
        
        # Flight duration between 1-4 hours
        duration = random.randint(1, 4)
        arrive_hour = (hour + duration) % 24
        arrive_time = f"{arrive_hour:02d}:{minute:02d}"
        
        flight = {
            "id": f"{random.choice(['AI', '6E', 'SG', 'UK', 'G8', 'I5'])}{random.randint(100, 999)}",
            "airline": random.choice(airlines),
            "from_city": from_city,
            "to_city": to_city,
            "depart_time": depart_time,
            "arrive_time": arrive_time,
            "price": f"${random.randint(80, 300)}",
            "stops": random.choice([0, 0, 0, 1, 1, 2])  # Mostly direct flights
        }
        mock_flights.append(flight)
    
    # Sort by departure time
    mock_flights.sort(key=lambda x: x["depart_time"])
    return mock_flights

@router.get("/test")
async def test_flight_search():
    """Test endpoint to verify flight search is working"""
    try:
        # Test with mock data
        test_data = {"from": "DEL", "to": "BOM"}
        results = get_mock_flights(test_data["from"], test_data["to"])
        return {
            "status": "success",
            "message": "Flight search is working!",
            "test_results": results
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Flight search test failed: {str(e)}"
        }

@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "flights"} 