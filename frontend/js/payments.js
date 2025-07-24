// Razorpay Payment Integration

// Global variables
let currentBookingData = null;
let searchResults = {
    flights: [],
    hotels: [],
    transport: []
};

// Initialize Razorpay
function initializeRazorpay() {
    // Check if Razorpay is already loaded
    if (window.Razorpay) {
        console.log('✅ Razorpay already loaded');
        return Promise.resolve();
    }
    
    // Load Razorpay script if not already loaded
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        
        script.onload = function() {
            console.log('✅ Razorpay script loaded successfully');
            resolve();
        };
        
        script.onerror = function() {
            console.error('❌ Failed to load Razorpay script');
            reject(new Error('Failed to load Razorpay script'));
        };
        
        // Set a timeout
        setTimeout(() => {
            if (!window.Razorpay) {
                console.error('❌ Razorpay script loading timeout');
                reject(new Error('Razorpay script loading timeout'));
            }
        }, 10000); // 10 second timeout
        
        document.head.appendChild(script);
    });
}

// Store search results globally
window.storeSearchResults = function(results, type) {
    console.log(`📦 Storing ${type} search results:`, results);
    
    // Ensure results is an array
    if (Array.isArray(results)) {
        searchResults[type] = results;
        console.log(`✅ Stored ${results.length} ${type} results`);
    } else if (results && typeof results === 'object') {
        // Handle case where results might be wrapped in an object
        if (results[type] && Array.isArray(results[type])) {
            searchResults[type] = results[type];
            console.log(`✅ Stored ${results[type].length} ${type} results from object`);
        } else if (results.flights && Array.isArray(results.flights)) {
            searchResults[type] = results.flights;
            console.log(`✅ Stored ${results.flights.length} ${type} results from flights key`);
        } else {
            searchResults[type] = [results];
            console.log(`✅ Stored single ${type} result`);
        }
    } else {
        console.warn(`⚠️ Invalid results format for ${type}:`, results);
        searchResults[type] = [];
    }
    
    // Log the stored data for debugging
    console.log(`📊 Current ${type} data:`, searchResults[type]);
};

// Extract price from price string (handles different formats)
function extractPrice(priceString) {
    if (!priceString) return 0;
    
    // Remove currency symbols and spaces
    const cleanPrice = priceString.replace(/[₹$,\s]/g, '');
    
    // Convert to number
    const price = parseFloat(cleanPrice);
    return isNaN(price) ? 0 : price;
}

// Create payment order
async function createPaymentOrder(bookingType, itemData) {
    try {
        console.log(`💰 Creating payment order for ${bookingType}:`, itemData);
        
        // Extract price from item data
        let amount = 0;
        if (bookingType === 'flight') {
            amount = extractPrice(itemData.price);
        } else if (bookingType === 'hotel') {
            amount = extractPrice(itemData.price_per_night);
        } else if (bookingType === 'transport') {
            amount = extractPrice(itemData.price);
        }
        
        if (amount <= 0) {
            throw new Error('Invalid price amount');
        }
        
        const orderData = {
            booking_type: bookingType,
            item: itemData,
            amount: amount,
            currency: 'INR'
        };
        
        console.log('📤 Sending order data:', orderData);
        
        const response = await fetch('/api/payments/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('✅ Payment order created:', result);
        
        return result;
        
    } catch (error) {
        console.error('❌ Error creating payment order:', error);
        throw error;
    }
}

// Initialize Razorpay payment
function initializePayment(orderData, itemData, bookingType) {
    return new Promise((resolve, reject) => {
        const options = {
            key: orderData.razorpay_key_id,
            amount: orderData.order.amount,
            currency: orderData.currency,
            name: 'AI Travel Agent',
            description: `${bookingType.charAt(0).toUpperCase() + bookingType.slice(1)} Booking`,
            order_id: orderData.order.id,
            handler: function(response) {
                console.log('✅ Payment successful:', response);
                resolve(response);
            },
            prefill: {
                name: 'Guest User',
                email: 'guest@example.com',
                contact: '9999999999'
            },
            theme: {
                color: '#2563eb'
            },
            modal: {
                ondismiss: function() {
                    console.log('❌ Payment cancelled by user');
                    reject(new Error('Payment cancelled'));
                }
            }
        };
        
        const rzp = new Razorpay(options);
        rzp.open();
    });
}

// Verify payment
async function verifyPayment(paymentResponse) {
    try {
        console.log('🔍 Verifying payment:', paymentResponse);
        
        const response = await fetch('/api/payments/verify-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentResponse)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('✅ Payment verified:', result);
        
        return result;
        
    } catch (error) {
        console.error('❌ Payment verification failed:', error);
        throw error;
    }
}

// Main booking function with payment integration
async function bookWithPayment(itemId, bookingType, itemData) {
    try {
        console.log(`📅 Starting booking process for ${bookingType}:`, itemData);
        
        // Show loading
        showLoading(true);
        
        // Create payment order
        const orderData = await createPaymentOrder(bookingType, itemData);
        
        // Initialize payment
        const paymentResponse = await initializePayment(orderData, itemData, bookingType);
        
        // Verify payment
        const verificationResult = await verifyPayment(paymentResponse);
        
        // Create booking record
        await createBookingRecord(itemId, bookingType, verificationResult);
        
        // Show success message
        showNotification(`Payment successful! Your ${bookingType} has been booked.`, 'success');
        
        console.log('✅ Complete booking process successful');
        
    } catch (error) {
        console.error('❌ Booking process failed:', error);
        
        if (error.message === 'Payment cancelled') {
            showNotification('Payment was cancelled. Please try again.', 'warning');
        } else {
            showNotification(`Booking failed: ${error.message}`, 'error');
        }
        
    } finally {
        showLoading(false);
    }
}

// Create booking record after successful payment
async function createBookingRecord(itemId, bookingType, paymentResult) {
    try {
        const bookingData = {
            type: bookingType,
            id: itemId,
            payment_id: paymentResult.payment_id,
            order_id: paymentResult.order_id
        };
        
        const response = await fetch('/api/bookings/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('✅ Booking record created:', result);
        
        return result;
        
    } catch (error) {
        console.error('❌ Error creating booking record:', error);
        throw error;
    }
}

// Global booking function (called from main.js)
window.bookItem = async function(itemId, bookingType) {
    console.log(`📅 Booking ${bookingType} with ID: ${itemId}`);
    console.log('🔍 Current search results:', searchResults);
    
    try {
        // Initialize Razorpay first
        await initializeRazorpay();
        
        // Find the item data from the stored search results
        const itemData = findItemData(itemId, bookingType);
        
        if (!itemData) {
            console.error('❌ Item data not found. Available data:', searchResults);
            showNotification('Item data not found. Please search again.', 'error');
            return;
        }
        
        // Start booking process with payment
        await bookWithPayment(itemId, bookingType, itemData);
        
    } catch (error) {
        console.error('❌ Error in bookItem:', error);
        showNotification(`Booking failed: ${error.message}`, 'error');
    }
};

// Helper function to find item data from stored search results
function findItemData(itemId, bookingType) {
    const results = searchResults[bookingType] || [];
    console.log(`🔍 Looking for ${bookingType} with ID: ${itemId}`);
    console.log(`📊 Available ${bookingType} results:`, results);
    
    // Try exact match first
    let item = results.find(result => result.id === itemId);
    
    // If not found, try partial match (in case of string/number mismatch)
    if (!item) {
        item = results.find(result => String(result.id) === String(itemId));
    }
    
    // If still not found, try to find by index (fallback)
    if (!item && results.length > 0) {
        const index = parseInt(itemId.replace(/\D/g, '')) - 1;
        if (index >= 0 && index < results.length) {
            item = results[index];
            console.log(`🔄 Found item by index ${index}:`, item);
        }
    }
    
    // If still not found, try to extract from DOM (final fallback)
    if (!item) {
        item = extractItemFromDOM(itemId, bookingType);
        if (item) {
            console.log(`🔄 Extracted item from DOM:`, item);
        }
    }
    
    if (item) {
        console.log(`✅ Found item data for ${bookingType} ${itemId}:`, item);
        return item;
    }
    
    console.warn(`⚠️ Item data not found for ${bookingType} ${itemId}`);
    console.warn(`📋 Available IDs:`, results.map(r => r.id));
    return null;
}

// Fallback function to extract item data from DOM
function extractItemFromDOM(itemId, bookingType) {
    try {
        // Find the card with this item ID
        const cards = document.querySelectorAll('.result-card');
        let targetCard = null;
        
        for (const card of cards) {
            const button = card.querySelector('button[onclick*="' + itemId + '"]');
            if (button) {
                targetCard = card;
                break;
            }
        }
        
        if (!targetCard) {
            console.warn(`⚠️ Card not found in DOM for ${bookingType} ${itemId}`);
            return null;
        }
        
        // Extract data based on booking type
        const itemData = { id: itemId };
        
        switch (bookingType) {
            case 'flight':
                const airline = targetCard.querySelector('h3')?.textContent || 'Unknown Airline';
                const price = targetCard.querySelector('.price')?.textContent || '₹0';
                const fromCity = targetCard.querySelector('.departure strong')?.textContent || 'N/A';
                const toCity = targetCard.querySelector('.arrival strong')?.textContent || 'N/A';
                const departTime = targetCard.querySelector('.departure span')?.textContent || 'N/A';
                const arriveTime = targetCard.querySelector('.arrival span')?.textContent || 'N/A';
                const flightId = targetCard.querySelector('.flight-details span:first-child')?.textContent?.replace('Flight: ', '') || 'N/A';
                const stops = targetCard.querySelector('.flight-details span:last-child')?.textContent?.replace('Stops: ', '') || '0';
                
                Object.assign(itemData, {
                    airline,
                    price,
                    from_city: fromCity,
                    to_city: toCity,
                    depart_time: departTime,
                    arrive_time: arriveTime,
                    id: flightId,
                    stops: parseInt(stops) || 0
                });
                break;
                
            case 'hotel':
                const hotelName = targetCard.querySelector('h3')?.textContent || 'Unknown Hotel';
                const hotelPrice = targetCard.querySelector('.price')?.textContent || '₹0';
                const location = targetCard.querySelector('.location span')?.textContent || 'N/A';
                const rating = targetCard.querySelector('.rating span')?.textContent || 'N/A';
                
                Object.assign(itemData, {
                    name: hotelName,
                    price_per_night: hotelPrice,
                    location,
                    rating: parseFloat(rating) || 0
                });
                break;
                
            case 'transport':
                const transportType = targetCard.querySelector('h3')?.textContent || 'Transport';
                const transportPrice = targetCard.querySelector('.price')?.textContent || '₹0';
                const pickup = targetCard.querySelector('.pickup span')?.textContent || 'N/A';
                const dropoff = targetCard.querySelector('.dropoff span')?.textContent || 'N/A';
                const vehicleType = targetCard.querySelector('.transport-details span:first-child')?.textContent || 'Vehicle';
                const duration = targetCard.querySelector('.transport-details span:last-child')?.textContent || 'N/A';
                
                Object.assign(itemData, {
                    type: transportType,
                    price: transportPrice,
                    pickup,
                    dropoff,
                    vehicle_type: vehicleType,
                    duration
                });
                break;
        }
        
        console.log(`✅ Extracted ${bookingType} data from DOM:`, itemData);
        return itemData;
        
    } catch (error) {
        console.error('❌ Error extracting data from DOM:', error);
        return null;
    }
}

// Debug function to test payment flow
window.debugPayment = function() {
    console.log('🔍 Debug Payment System');
    console.log('📊 Stored search results:', searchResults);
    console.log('💰 Razorpay available:', typeof window.Razorpay !== 'undefined');
    
    // Test with sample data
    const testData = {
        flights: [
            {
                id: 'AI101',
                airline: 'Air India',
                price: '₹8500',
                from_city: 'DEL',
                to_city: 'BOM'
            }
        ],
        hotels: [
            {
                id: 'hotel_1',
                name: 'Test Hotel',
                price_per_night: '₹6400',
                location: 'Mumbai'
            }
        ],
        transport: [
            {
                id: 'transport_1',
                type: 'Taxi',
                price: '₹1600',
                pickup: 'Airport',
                dropoff: 'Hotel'
            }
        ]
    };
    
    // Store test data
    searchResults.flights = testData.flights;
    searchResults.hotels = testData.hotels;
    searchResults.transport = testData.transport;
    
    console.log('✅ Test data stored. Try booking now!');
    showNotification('Test data loaded. Try booking a flight/hotel/transport!', 'info');
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('💰 Payment system initialized');
    initializeRazorpay();
    
    // Add debug function to window for testing
    window.debugPayment = debugPayment;
}); 