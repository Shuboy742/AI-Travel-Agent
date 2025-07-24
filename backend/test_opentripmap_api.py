#!/usr/bin/env python3
"""
Test script for OpenTripMap API integration
"""

import asyncio
import httpx
import json

# OpenTripMap API configuration
OPENTRIPMAP_API_KEY = "5ae2e3f221c38a28845f05b6e1c3d3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b"  # Replace with your actual key
OPENTRIPMAP_BASE_URL = "https://api.opentripmap.com/0.1/en/places"

async def test_opentripmap_api():
    """Test the OpenTripMap hotel search"""
    print("🧪 Testing OpenTripMap API integration...")
    
    # Step 1: Search for hotels
    search_url = f"{OPENTRIPMAP_BASE_URL}/autosuggest"
    params = {
        "name": "Mumbai",
        "kinds": "hotels",
        "limit": 5,
        "apikey": OPENTRIPMAP_API_KEY
    }
    
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            print("📡 Making API request...")
            response = await client.get(search_url, params=params)
            
            print(f"📊 Response Status: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                print("✅ API request successful!")
                
                features = data.get('features', [])
                print(f"🏨 Found {len(features)} hotel locations")
                
                if features:
                    # Show first 3 hotels
                    for i, feature in enumerate(features[:3]):
                        properties = feature.get('properties', {})
                        print(f"\n{i+1}. {properties.get('name', 'Unknown Hotel')}")
                        print(f"   XID: {properties.get('xid', 'N/A')}")
                        print(f"   Kinds: {properties.get('kinds', 'N/A')}")
                        
                        # Get detailed information
                        xid = properties.get('xid')
                        if xid:
                            detail_url = f"{OPENTRIPMAP_BASE_URL}/xid/{xid}"
                            detail_params = {"apikey": OPENTRIPMAP_API_KEY}
                            
                            detail_response = await client.get(detail_url, params=detail_params)
                            if detail_response.status_code == 200:
                                hotel_detail = detail_response.json()
                                print(f"   Address: {hotel_detail.get('address', {}).get('road', 'N/A')}")
                                print(f"   Rating: {hotel_detail.get('rating', 'N/A')}")
                                print(f"   Stars: {hotel_detail.get('stars', 'N/A')}")
                            else:
                                print(f"   Detail request failed: {detail_response.status_code}")
                else:
                    print("⚠️ No hotel results found in API response")
                    print(f"Response structure: {json.dumps(data, indent=2)[:500]}...")
            else:
                print(f"❌ API request failed with status {response.status_code}")
                print(f"Response: {response.text}")
                
    except Exception as e:
        print(f"❌ Error testing API: {e}")

if __name__ == "__main__":
    asyncio.run(test_opentripmap_api()) 