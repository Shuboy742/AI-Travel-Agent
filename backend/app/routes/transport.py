from fastapi import APIRouter, HTTPException, Request
import random
import traceback

router = APIRouter(prefix="/transport", tags=["transport"])

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
        date = data.get("date", "2024-01-01")
        time = data.get("time", "10:00")
        transport_type = data.get("type", "taxi")
        
        # Generate mock transport data
        transports = generate_mock_transports(pickup, dropoff, transport_type)
        
        return transports
        
    except Exception as e:
        print(f"Transport search error: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

def generate_mock_transports(pickup, dropoff, transport_type):
    """Generate mock transport data based on search criteria"""
    transports = []
    
    # Generate 4-8 transport options
    for i in range(random.randint(4, 8)):
        # Determine transport type for this option
        if transport_type == "all" or i % 2 == 0:
            current_type = random.choice(["taxi", "uber", "limo", "shuttle"])
        else:
            current_type = transport_type
        
        provider = random.choice(TRANSPORT_PROVIDERS.get(current_type, ["Generic Transport"]))
        
        # Generate realistic pricing based on transport type and distance
        base_price = 20
        if current_type == "limo":
            base_price = random.randint(80, 150)
        elif current_type == "uber":
            base_price = random.randint(25, 60)
        elif current_type == "shuttle":
            base_price = random.randint(15, 40)
        else:  # taxi
            base_price = random.randint(20, 50)
        
        # Add some variation
        final_price = base_price + random.randint(-5, 10)
        final_price = max(10, final_price)  # Minimum $10

        # Convert USD to INR (assume 1 USD = 80 INR)
        inr_price = final_price * 80

        # Generate estimated duration (15-60 minutes)
        duration = random.randint(15, 60)
        
        transport = {
            "id": f"transport_{i+1}",
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
            "image": f"https://via.placeholder.com/300x200/10b981/ffffff?text={current_type.title()}"
        }
        transports.append(transport)
    
    # Sort by price (lowest first)
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

@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "transport"}

@router.get("/test")
async def test_transport_search():
    """Test endpoint to verify transport search is working"""
    try:
        test_data = {"pickup": "Airport", "dropoff": "Hotel", "type": "taxi"}
        results = generate_mock_transports(test_data["pickup"], test_data["dropoff"], test_data["type"])
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