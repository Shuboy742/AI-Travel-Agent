# Razorpay Integration Setup

## Prerequisites
1. Razorpay account (sign up at https://razorpay.com)
2. Your Razorpay API keys

## Setup Instructions

### 1. Get Your Razorpay API Keys
1. Log in to your Razorpay Dashboard
2. Go to Settings → API Keys
3. Generate a new key pair or use existing ones
4. Copy your Key ID and Key Secret

### 2. Configure Environment Variables
Create a `.env` file in the `backend/` directory with the following variables:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_secret_key_here

# Other API Keys
GEMINI_API_KEY=your_gemini_api_key_here
AVIATIONSTACK_API_KEY=your_aviationstack_api_key_here
```

### 3. Install Dependencies
Make sure you have the Razorpay Python package installed:

```bash
pip install razorpay
```

### 4. Test the Integration
1. Start your backend server
2. Search for flights, hotels, or transport
3. Click "Book Now" on any result
4. You should see the Razorpay payment gateway open

## How It Works

### Flow:
1. User searches for flights/hotels/transport
2. User clicks "Book Now" on a result
3. Frontend calls `/api/payments/create-order` with item details
4. Backend creates a Razorpay order
5. Frontend opens Razorpay payment modal
6. User completes payment
7. Frontend calls `/api/payments/verify-payment` to verify
8. Backend creates booking record
9. User sees success message

### API Endpoints:
- `POST /api/payments/create-order` - Creates Razorpay order
- `POST /api/payments/verify-payment` - Verifies payment signature
- `POST /api/bookings/` - Creates booking record after payment

## Security Notes
- Never commit your `.env` file to version control
- Use test keys for development
- Verify payment signatures on the server side
- Handle payment failures gracefully

## Troubleshooting
- Check browser console for JavaScript errors
- Verify API keys are correct
- Ensure Razorpay script is loading
- Check backend logs for payment errors 