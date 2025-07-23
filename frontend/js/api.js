// API functions for frontend-backend communication

// Make functions globally available
window.searchFlights = async function(data) {
    const response = await fetch('/api/flights/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Flight search failed');
    return await response.json();
};

window.searchHotels = async function(data) {
    const response = await fetch('/api/hotels/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Hotel search failed');
    return await response.json();
};

window.searchTransport = async function(data) {
    const response = await fetch('/api/transport/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Transport search failed');
    return await response.json();
};

window.bookFlight = async function(flightId) {
    const response = await fetch('/api/bookings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'flight', id: flightId })
    });
    if (!response.ok) throw new Error('Flight booking failed');
    return await response.json();
};

window.bookHotel = async function(hotelId) {
    const response = await fetch('/api/bookings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'hotel', id: hotelId })
    });
    if (!response.ok) throw new Error('Hotel booking failed');
    return await response.json();
};

window.bookTransport = async function(transportId) {
    const response = await fetch('/api/bookings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'transport', id: transportId })
    });
    if (!response.ok) throw new Error('Transport booking failed');
    return await response.json();
}; 