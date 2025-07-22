from fastapi import APIRouter, HTTPException, Request
import razorpay
import os
import json

router = APIRouter(prefix="/payments", tags=["payments"])

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

@router.post("/create-order")
def create_order(request: Request):
    import asyncio
    async def get_data():
        return await request.json()
    data = asyncio.run(get_data())
    try:
        # Expecting: {amount, currency, flight (optional)}
        amount = int(float(data.get("amount", 1)) * 100)  # Razorpay expects paise
        currency = data.get("currency", "INR")
        notes = {}
        if "flight" in data:
            notes = {"flight": json.dumps(data["flight"])}
        order = client.order.create({
            "amount": amount,
            "currency": currency,
            "payment_capture": 1,
            "notes": notes
        })
        return {"order": order, "razorpay_key_id": RAZORPAY_KEY_ID}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
