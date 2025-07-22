// API functions for frontend-backend communication

export async function searchFlights(data) {
    const response = await fetch('/api/flights/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Flight search failed');
    return await response.json();
}

export async function searchHotels(data) {
    const response = await fetch('/api/hotels/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Hotel search failed');
    return await response.json();
}

export async function searchTransport(data) {
    const response = await fetch('/api/transport/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Transport search failed');
    return await response.json();
}

export async function bookFlight(flightId) {
    const response = await fetch('/api/bookings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'flight', id: flightId })
    });
    if (!response.ok) throw new Error('Flight booking failed');
    return await response.json();
}

export async function bookHotel(hotelId) {
    const response = await fetch('/api/bookings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'hotel', id: hotelId })
    });
    if (!response.ok) throw new Error('Hotel booking failed');
    return await response.json();
}

export async function bookTransport(transportId) {
    const response = await fetch('/api/bookings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'transport', id: transportId })
    });
    if (!response.ok) throw new Error('Transport booking failed');
    return await response.json();
} 