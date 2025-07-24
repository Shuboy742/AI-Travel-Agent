#!/usr/bin/env python3
"""
Test script for RapidAPI Hotels.com integration
"""

import asyncio
import httpx
import json

# RapidAPI configuration
RAPIDAPI_KEY = "315388df63msh90342efce577890p1c8c31jsn98888db369da"
RAPIDAPI_HOST = "hotels-com-provider.p.rapidapi.com"
HOTELS_API_URL = "https://hotels-com-provider.p.rapidapi.com/v1/hotels/search"

async def test_hotel_api():
    """Test the RapidAPI hotel search"""
    print("🧪 Testing RapidAPI Hotels.com integration...")
    
    headers = {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST
    }
    
    params = {
        "query": "Mumbai",
        "checkin_date": "2024-12-01",
        "checkout_date": "2024-12-02",
        "adults_number": "2",
        "room_number": "1",
        "currency": "INR",
        "locale": "en_US",
        "page_number": "1"
    }
    
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            print("📡 Making API request...")
            response = await client.get(HOTELS_API_URL, headers=headers, params=params)
            
            print(f"📊 Response Status: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                print("✅ API request successful!")
                
                if data.get("searchResults") and data["searchResults"].get("results"):
                    hotels = data["searchResults"]["results"]
                    print(f"🏨 Found {len(hotels)} hotels")
                    
                    # Show first 3 hotels
                    for i, hotel in enumerate(hotels[:3]):
                        property_data = hotel.get("property", {})
                        price_data = hotel.get("ratePlan", {}).get("price", {})
                        
                        print(f"\n{i+1}. {property_data.get('name', 'Unknown Hotel')}")
                        print(f"   Rating: {property_data.get('starRating', 'N/A')} stars")
                        print(f"   Price: ₹{price_data.get('current', {}).get('plain', 'N/A')}")
                        print(f"   Address: {property_data.get('address', {}).get('streetAddress', 'N/A')}")
                else:
                    print("⚠️ No hotel results found in API response")
                    print(f"Response structure: {json.dumps(data, indent=2)[:500]}...")
            else:
                print(f"❌ API request failed with status {response.status_code}")
                print(f"Response: {response.text}")
                
    except Exception as e:
        print(f"❌ Error testing API: {e}")

if __name__ == "__main__":
    asyncio.run(test_hotel_api()) 