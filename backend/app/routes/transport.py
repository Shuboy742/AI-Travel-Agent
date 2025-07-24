from fastapi import APIRouter, HTTPException, Request, Response
import random
import traceback
import os
import httpx
from fastapi.responses import RedirectResponse, JSONResponse
from urllib.parse import urlencode

router = APIRouter(prefix="/transport", tags=["transport"])

# Uber API credentials from .env
UBER_CLIENT_ID = os.getenv("UBER_CLIENT_ID")
UBER_CLIENT_SECRET = os.getenv("UBER_CLIENT_SECRET")
UBER_REDIRECT_URI = os.getenv("UBER_REDIRECT_URI", "http://localhost:8000/api/transport/uber/callback")
UBER_SANDBOX_MODE = os.getenv("UBER_SANDBOX_MODE", "true").lower() == "true"

# In-memory token store for demo (use DB/session in production)
UBER_ACCESS_TOKEN = None

# Mock transport data
TRANSPORT_PROVIDERS = {
    "taxi": ["Yellow Cab", "City Taxi", "Express Taxi", "Metro Taxi"],
    "uber": ["Uber", "UberX", "UberXL", "Uber Black"],
    "limo": ["Luxury Limo", "Executive Limo", "Premium Limo", "VIP Limo"],
    "shuttle": ["Airport Shuttle", "Hotel Shuttle", "City Shuttle", "Express Shuttle"]
}

@router.post("/search")
async def search_transport(request: Request):
    try:
        data = await request.json()
        # Validate required fields
        if not data.get("pickup") or not data.get("dropoff"):
            raise HTTPException(status_code=400, detail="Pickup and dropoff locations are required")
        pickup = data.get("pickup", "Unknown Location")
        dropoff = data.get("dropoff", "Unknown Location")
        transport_type = data.get("type", "taxi")
        # Always use expanded mock data
        transports = generate_expanded_mock_transports(pickup, dropoff, transport_type)
        return transports
    except Exception as e:
        print(f"Transport search error: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

def generate_expanded_mock_transports(pickup, dropoff, transport_type):
    """Generate more diverse mock transport data with more taxi and Uber options."""
    transports = []
    taxi_names = [
        "Yellow Cab", "City Taxi", "Express Taxi", "Metro Taxi", "FastTrack Taxi", "Prime Taxi", "Silver Cab", "BlueLine Taxi", "Star Taxi", "Ace Taxi",
        "QuickRide Taxi", "GoTaxi", "Rapid Taxi", "Classic Cab", "Elite Taxi"
    ]
    uber_names = [
        "UberX", "UberXL", "Uber Black", "Uber SUV", "Uber Go", "Uber Premier", "Uber Pool", "Uber Intercity", "Uber Moto", "Uber Auto",
        "Uber Comfort", "Uber Green", "Uber WAV", "Uber Select", "Uber Lux"
    ]
    providers = {
        "taxi": taxi_names,
        "uber": uber_names,
        "limo": ["Luxury Limo", "Executive Limo", "Premium Limo", "VIP Limo"],
        "shuttle": ["Airport Shuttle", "Hotel Shuttle", "City Shuttle", "Express Shuttle"]
    }
    all_types = ["taxi", "uber", "limo", "shuttle"]
    for i in range(random.randint(10, 16)):
        if transport_type == "all":
            current_type = random.choice(all_types)
        else:
            current_type = transport_type if i % 2 == 0 else random.choice(all_types)
        provider = random.choice(providers.get(current_type, ["Generic Transport"]))
        base_price = 20
        if current_type == "limo":
            base_price = random.randint(80, 150)
        elif current_type == "uber":
            base_price = random.randint(25, 60)
        elif current_type == "shuttle":
            base_price = random.randint(15, 40)
        else:  # taxi
            base_price = random.randint(20, 50)
        final_price = base_price + random.randint(-5, 10)
        final_price = max(10, final_price)
        inr_price = final_price * 80
        duration = random.randint(15, 60)
        transport = {
            "id": f"{current_type}_{i+1}",
            "type": current_type,
            "provider": provider,
            "pickup": pickup,
            "dropoff": dropoff,
            "price": f"₹{inr_price}",
            "duration": f"{duration} min",
            "estimated_arrival": f"{duration} min",
            "vehicle_type": get_vehicle_type(current_type),
            "capacity": get_capacity(current_type),
            "features": get_transport_features(current_type),
            "image": f"https://via.placeholder.com/300x200/10b981/ffffff?text={provider.replace(' ', '+')}"
        }
        transports.append(transport)
    transports.sort(key=lambda x: int(x["price"].replace("₹", "")))
    return transports

def get_vehicle_type(transport_type):
    """Get vehicle type based on transport type"""
    vehicle_types = {
        "taxi": ["Sedan", "SUV", "Van"],
        "uber": ["UberX", "UberXL", "Uber Black", "Uber SUV"],
        "limo": ["Luxury Sedan", "Stretch Limo", "SUV Limo"],
        "shuttle": ["Van", "Bus", "Minibus"]
    }
    return random.choice(vehicle_types.get(transport_type, ["Vehicle"]))

def get_capacity(transport_type):
    """Get passenger capacity based on transport type"""
    capacities = {
        "taxi": "4 passengers",
        "uber": "4-6 passengers", 
        "limo": "6-8 passengers",
        "shuttle": "8-15 passengers"
    }
    return capacities.get(transport_type, "4 passengers")

def get_transport_features(transport_type):
    """Get features based on transport type"""
    all_features = ["AC", "WiFi", "GPS", "Child Seat", "Wheelchair Access", "Luggage Space"]
    
    if transport_type == "limo":
        return random.sample(all_features + ["Champagne", "Professional Driver", "Leather Seats"], 4)
    elif transport_type == "uber":
        return random.sample(all_features, 3)
    elif transport_type == "shuttle":
        return random.sample(all_features + ["Multiple Stops"], 3)
    else:  # taxi
        return random.sample(all_features, 2)

@router.get("/uber/login")
def uber_login():
    """Redirect user to Uber OAuth login."""
    params = {
        "client_id": UBER_CLIENT_ID,
        "response_type": "code",
        "scope": "profile history places request",
        "redirect_uri": UBER_REDIRECT_URI,
        "state": "uber_demo_state"
    }
    url = f"https://login.uber.com/oauth/v2/authorize?{urlencode(params)}"
    return RedirectResponse(url)

@router.get("/uber/callback")
async def uber_callback(code: str = None, state: str = None):
    """Handle Uber OAuth callback, exchange code for access token."""
    global UBER_ACCESS_TOKEN
    if not code:
        return JSONResponse({"error": "No code provided"}, status_code=400)
    token_url = "https://login.uber.com/oauth/v2/token"
    data = {
        "client_id": UBER_CLIENT_ID,
        "client_secret": UBER_CLIENT_SECRET,
        "grant_type": "authorization_code",
        "redirect_uri": UBER_REDIRECT_URI,
        "code": code
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.post(token_url, data=data, headers=headers)
        if resp.status_code == 200:
            token_data = resp.json()
            UBER_ACCESS_TOKEN = token_data.get("access_token")
            return JSONResponse({"success": True, "access_token": UBER_ACCESS_TOKEN})
        else:
            return JSONResponse({"error": resp.text}, status_code=resp.status_code)

@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "transport"}

@router.get("/test")
async def test_transport_search():
    """Test endpoint to verify transport search is working"""
    try:
        test_data = {"pickup": "Airport", "dropoff": "Hotel", "type": "taxi"}
        results = generate_expanded_mock_transports(test_data["pickup"], test_data["dropoff"], test_data["type"])
        return {
            "status": "success",
            "message": "Transport search is working!",
            "test_results": results[:3]  # Return first 3 for brevity
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Transport search test failed: {str(e)}"
        } 