from fastapi import APIRouter, HTTPException, Request
import random
import traceback

router = APIRouter(prefix="/hotels", tags=["hotels"])

# Expanded mock hotel data for specific cities
CITY_HOTELS = {
    "pune": [
        "JW Marriott Pune", "The Westin Pune Koregaon Park", "Hyatt Pune", "Conrad Pune", "Marriott Suites Pune", "Novotel Pune", "Sheraton Grand Pune", "Radisson Blu Pune", "The Corinthians Resort & Club", "Oakwood Residence Pune"
    ],
    "mumbai": [
        "The Taj Mahal Palace", "The Oberoi Mumbai", "Trident Nariman Point", "ITC Grand Central", "JW Marriott Mumbai Juhu", "Sofitel Mumbai BKC", "The St. Regis Mumbai", "Grand Hyatt Mumbai", "Taj Lands End", "Four Seasons Hotel Mumbai"
    ],
    "goa": [
        "Taj Exotica Resort & Spa", "The Leela Goa", "Park Hyatt Goa Resort", "Grand Hyatt Goa", "W Goa", "The Zuri White Sands", "Holiday Inn Resort Goa", "Radisson Blu Resort Goa", "Cidade de Goa", "Vivanta Goa, Panaji"
    ],
    "mahabaleshwar": [
        "Le Meridien Mahabaleshwar", "Evershine Resort", "Brightland Resort & Spa", "Ramsukh Resorts & Spa", "Bella Vista Resort", "Regenta MPG Club", "Citrus Chambers Mahabaleshwar", "Lake View Resort", "Valley View Resort", "Saj Resort"
    ],
    "new york": [
        "The Plaza Hotel", "The Ritz-Carlton New York", "The Peninsula New York", "Four Seasons Hotel New York", "The Langham New York", "Park Hyatt New York", "Conrad New York Downtown", "The Knickerbocker", "Lotte New York Palace", "Waldorf Astoria New York"
    ],
    "san francisco": [
        "Fairmont San Francisco", "Hotel Nikko San Francisco", "The Ritz-Carlton San Francisco", "Palace Hotel", "Hotel Drisco Pacific Heights", "InterContinental San Francisco", "Grand Hyatt San Francisco", "Hotel Kabuki", "The Marker San Francisco", "Argonaut Hotel"
    ],
    "london": [
        "The Savoy", "The Ritz London", "The Langham London", "Shangri-La The Shard", "The Dorchester", "Rosewood London", "The Connaught", "Corinthia London", "The Berkeley", "Claridge's"
    ],
    "punjab": [
        "Hyatt Regency Ludhiana", "Radisson Blu Hotel Amritsar", "JW Marriott Chandigarh", "The Lalit Chandigarh", "Park Plaza Ludhiana", "Hotel Mountview Chandigarh", "Best Western Merrion Amritsar", "Ramada Amritsar", "Hotel Cabbana", "Hotel City Heart Premium"
    ],
    "bangalore": [
        "The Leela Palace Bengaluru", "Taj West End", "ITC Gardenia", "The Oberoi Bengaluru", "JW Marriott Hotel Bengaluru", "Shangri-La Hotel Bengaluru", "The Ritz-Carlton Bangalore", "Vivanta Bengaluru", "Radisson Blu Atria Bengaluru", "Conrad Bengaluru"
    ]
}

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
        
        # Generate expanded mock hotel data
        hotels = generate_expanded_mock_hotels(location, guests, rooms)
        return hotels
        
    except Exception as e:
        print(f"Hotel search error: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

def generate_expanded_mock_hotels(location, guests, rooms):
    """Generate expanded mock hotel data based on search criteria and city"""
    hotels = []
    city_key = location.strip().lower()
    city_hotels = CITY_HOTELS.get(city_key, [])
    
    # Add city-specific hotels if available
    for i, hotel_name in enumerate(city_hotels):
        base_price = random.randint(120, 400)
        total_price = base_price * guests * rooms
        hotels.append({
            "id": f"{city_key}_hotel_{i+1}",
            "name": hotel_name,
            "location": location,
            "address": f"{random.randint(100, 999)} {random.choice(['Main St', 'Park Ave', 'Broadway', 'Central Rd', 'Queen St'])}, {location}",
            "price_per_night": f"₹ {base_price * 80}",
            "total_price": f"₹ {total_price * 80}",
            "rating": round(random.uniform(3.5, 5.0), 1),
            "amenities": random.sample([
                "Free WiFi", "Pool", "Gym", "Restaurant", "Spa", 
                "Business Center", "Free Breakfast", "Parking", "Room Service"
            ], random.randint(3, 6)),
            "stars": random.randint(3, 5),
            "image": f"https://via.placeholder.com/300x200/2563eb/ffffff?text={hotel_name.replace(' ', '+')}"
        })
    
    # If not enough city-specific hotels, add generic ones
    n_needed = max(10, len(city_hotels))
    while len(hotels) < n_needed:
        chain = random.choice(HOTEL_CHAINS)
        hotel_type = random.choice(HOTEL_TYPES)
        hotel_name = f"{chain} {hotel_type}"
        base_price = random.randint(80, 300)
        if "Marriott" in hotel_name or "Hilton" in hotel_name:
            base_price = random.randint(150, 400)
        elif "Best Western" in hotel_name or "Comfort" in hotel_name:
            base_price = random.randint(60, 150)
        total_price = base_price * guests * rooms
        hotels.append({
            "id": f"{city_key}_generic_{len(hotels)+1}",
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
        })
    
    # Sort by price (lowest first)
    def parse_price(price_str):
        return int(price_str.replace('₹', '').replace(' ', '').replace(',', ''))
    hotels.sort(key=lambda x: parse_price(x["price_per_night"]))
    return hotels

@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "hotels", "api": "mock+expanded"} 