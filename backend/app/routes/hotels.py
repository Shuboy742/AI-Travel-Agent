from fastapi import APIRouter, HTTPException, Request
import random
import traceback

router = APIRouter(prefix="/hotels", tags=["hotels"])

# Mock hotel data
HOTEL_CHAINS = [
    "Marriott", "Hilton", "Hyatt", "InterContinental", "Sheraton", 
    "Radisson", "Best Western", "Holiday Inn", "Comfort Inn", "Quality Inn"
]

HOTEL_TYPES = [
    "Hotel", "Resort", "Inn", "Lodge", "Suites", "Plaza", "Tower", "Palace"
]

@router.post("/search")
async def search_hotels(request: Request):
    try:
        data = await request.json()
        
        # Validate required fields
        if not data.get("location"):
            raise HTTPException(status_code=400, detail="Location is required")
        
        location = data.get("location", "Unknown City")
        check_in = data.get("checkIn", "2024-01-01")
        check_out = data.get("checkOut", "2024-01-02")
        guests = int(data.get("guests", 1))
        rooms = int(data.get("rooms", 1))
        
        # Generate mock hotel data
        hotels = generate_mock_hotels(location, guests, rooms)
        
        return hotels
        
    except Exception as e:
        print(f"Hotel search error: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

def generate_mock_hotels(location, guests, rooms):
    """Generate mock hotel data based on search criteria"""
    hotels = []
    
    # Generate 6-10 hotels
    for i in range(random.randint(6, 10)):
        chain = random.choice(HOTEL_CHAINS)
        hotel_type = random.choice(HOTEL_TYPES)
        hotel_name = f"{chain} {hotel_type}"
        
        # Generate realistic pricing based on hotel tier
        base_price = random.randint(80, 300)
        if "Marriott" in hotel_name or "Hilton" in hotel_name:
            base_price = random.randint(150, 400)
        elif "Best Western" in hotel_name or "Comfort" in hotel_name:
            base_price = random.randint(60, 150)
        
        # Adjust price for number of guests and rooms
        total_price = base_price * guests * rooms
        
        hotel = {
            "id": f"hotel_{i+1}",
            "name": hotel_name,
            "location": location,
            "address": f"{random.randint(100, 999)} {random.choice(['Main St', 'Oak Ave', 'Park Blvd', 'Central Rd'])}, {location}",
            "price_per_night": f"₹ {base_price * 80}",
            "total_price": f"₹ {total_price * 80}",
            "rating": round(random.uniform(3.5, 5.0), 1),
            "amenities": random.sample([
                "Free WiFi", "Pool", "Gym", "Restaurant", "Spa", 
                "Business Center", "Free Breakfast", "Parking", "Room Service"
            ], random.randint(3, 6)),
            "stars": random.randint(3, 5),
            "image": f"https://via.placeholder.com/300x200/2563eb/ffffff?text={hotel_name.replace(' ', '+')}"
        }
        hotels.append(hotel)
    
    # Sort by price (lowest first)
    def parse_price(price_str):
        return int(price_str.replace('₹', '').replace(' ', '').replace(',', ''))
    hotels.sort(key=lambda x: parse_price(x["price_per_night"]))
    return hotels

@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "hotels"}

@router.get("/test")
async def test_hotel_search():
    """Test endpoint to verify hotel search is working"""
    try:
        test_data = {"location": "Mumbai", "guests": 2, "rooms": 1}
        results = generate_mock_hotels(test_data["location"], test_data["guests"], test_data["rooms"])
        return {
            "status": "success",
            "message": "Hotel search is working!",
            "test_results": results[:3]  # Return first 3 for brevity
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Hotel search test failed: {str(e)}"
        } 