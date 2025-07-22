from fastapi import APIRouter, HTTPException
import os
import razorpay

router = APIRouter(prefix="/payments", tags=["payments"])

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

@router.post("/create-order")
def create_razorpay_order(amount: float, currency: str = "INR"):
    try:
        order = client.order.create({
            "amount": int(amount * 100),  # Razorpay expects amount in paise
            "currency": currency,
            "payment_capture": 1
        })
        return {"order_id": order["id"], "amount": order["amount"], "currency": order["currency"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
