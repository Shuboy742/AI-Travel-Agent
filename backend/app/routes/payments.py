from fastapi import APIRouter, HTTPException, Request
import razorpay
import os
import json

router = APIRouter(prefix="/payments", tags=["payments"])

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

@router.post("/create-order")
async def create_order(request: Request):
    try:
        data = await request.json()
        
        # Extract booking details
        booking_type = data.get("booking_type", "flight")  # flight, hotel, transport
        item_data = data.get("item", {})
        amount = data.get("amount", 0)
        currency = data.get("currency", "INR")
        
        # Convert amount to paise (Razorpay expects amount in smallest currency unit)
        amount_in_paise = int(float(amount) * 100)
        
        # Create order notes with booking details
        notes = {
            "booking_type": booking_type,
            "item_id": item_data.get("id", ""),
            "item_name": item_data.get("name", ""),
            "item_details": json.dumps(item_data)
        }
        
        # Create Razorpay order
        order = client.order.create({
            "amount": amount_in_paise,
            "currency": currency,
            "payment_capture": 1,
            "notes": notes
        })
        
        return {
            "order": order,
            "razorpay_key_id": RAZORPAY_KEY_ID,
            "amount": amount,
            "currency": currency
        }
        
    except Exception as e:
        print(f"Payment order creation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/verify-payment")
async def verify_payment(request: Request):
    try:
        data = await request.json()
        
        # Verify payment signature
        params_dict = {
            'razorpay_payment_id': data.get('razorpay_payment_id'),
            'razorpay_order_id': data.get('razorpay_order_id'),
            'razorpay_signature': data.get('razorpay_signature')
        }
        
        # Verify the payment signature
        client.utility.verify_payment_signature(params_dict)
        
        # Payment is verified, you can now save booking to database
        return {
            "success": True,
            "message": "Payment verified successfully",
            "payment_id": data.get('razorpay_payment_id'),
            "order_id": data.get('razorpay_order_id')
        }
        
    except Exception as e:
        print(f"Payment verification error: {e}")
        raise HTTPException(status_code=400, detail="Payment verification failed")

@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "payments"}
