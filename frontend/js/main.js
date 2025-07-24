/**
 * Main JavaScript file for AI Travel Agent
 * Fixed version - ensures forms work properly
 */

console.log('🚀 Loading AI Travel Agent JavaScript...');

// Global state
let currentTab = 'flights';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM loaded, initializing application...');
    initializeApp();
});

function initializeApp() {
    console.log('🔧 Initializing application...');
    
    // Check all critical elements
    console.log('🔍 Checking critical elements...');
    console.log('Tab buttons:', document.querySelectorAll('.tab-btn').length);
    console.log('Search forms:', document.querySelectorAll('.search-form').length);
    console.log('Flight form:', document.getElementById('flightSearchForm'));
    console.log('Hotel form:', document.getElementById('hotelSearchForm'));
    console.log('Transport form:', document.getElementById('transportSearchForm'));
    console.log('Results section:', document.getElementById('resultsSection'));
    console.log('Results grid:', document.getElementById('resultsGrid'));
    
    // Initialize tabs
    initializeTabs();
    
    // Initialize forms
    initializeForms();
    
    // Initialize navigation
    initializeNavigation();
    
    console.log('✅ Application initialized successfully');
}

function initializeTabs() {
    console.log('📑 Initializing tabs...');
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    const searchForms = document.querySelectorAll('.search-form');
    
    console.log('Found tab buttons:', tabButtons.length);
    console.log('Found search forms:', searchForms.length);
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            console.log('Switching to tab:', tabName);
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active form
            searchForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === tabName + 'SearchForm') {
                    form.classList.add('active');
                    console.log('Activated form:', form.id, 'Visible:', form.classList.contains('active'));
                } else {
                    console.log('Deactivated form:', form.id, 'Visible:', form.classList.contains('active'));
                }
            });
            
            currentTab = tabName;
        });
    });
}

function initializeForms() {
    console.log('📝 Initializing forms...');
    
    // Flight form
    const flightForm = document.getElementById('flightSearchForm');
    if (flightForm) {
        console.log('✅ Flight form found');
        // Remove any existing listeners
        flightForm.removeEventListener('submit', handleFlightSearch);
        flightForm.addEventListener('submit', handleFlightSearch);
        console.log('✅ Flight form listener attached');
    } else {
        console.error('❌ Flight form not found');
    }
    
    // Hotel form
    const hotelForm = document.getElementById('hotelSearchForm');
    if (hotelForm) {
        console.log('✅ Hotel form found');
        // Remove any existing listeners
        hotelForm.removeEventListener('submit', handleHotelSearch);
        hotelForm.addEventListener('submit', handleHotelSearch);
        console.log('✅ Hotel form listener attached');
    } else {
        console.error('❌ Hotel form not found');
    }
    
    // Transport form
    const transportForm = document.getElementById('transportSearchForm');
    if (transportForm) {
        console.log('✅ Transport form found');
        // Remove any existing listeners
        transportForm.removeEventListener('submit', handleTransportSearch);
        transportForm.addEventListener('submit', handleTransportSearch);
        console.log('✅ Transport form listener attached');
    } else {
        console.error('❌ Transport form not found');
    }
}

function initializeNavigation() {
    console.log('🧭 Initializing navigation...');
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
}

// Flight search handler
async function handleFlightSearch(e) {
    e.preventDefault();
    console.log('✈️ Flight search submitted');
    
    const form = e.target;
    console.log('Form element:', form);
    
    const formData = new FormData(form);
    console.log('FormData entries:');
    for (let [key, value] of formData.entries()) {
        console.log(`  ${key}: ${value}`);
    }
    
    const searchData = {
        from: formData.get('from') || '',
        to: formData.get('to') || '',
        departDate: formData.get('departDate') || '',
        returnDate: formData.get('returnDate') || '',
        passengers: formData.get('passengers') || '1'
    };
    
    console.log('Flight search data:', searchData);
    
    if (!searchData.from || !searchData.to || !searchData.departDate) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    showLoading(true);
    
    try {
        console.log('🌐 Making flight search API call...');
        const response = await fetch('/api/flights/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchData)
        });
        
        console.log('📡 Flight search response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const results = await response.json();
        console.log('✈️ Flight results:', results);
        
        // Store results for payment processing
        if (window.storeSearchResults) {
            window.storeSearchResults(results.flights, 'flights');
        }
        
        displayResults(results.flights, 'flights');
        
    } catch (error) {
        console.error('❌ Flight search error:', error);
        showNotification('Error searching for flights. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

// Hotel search handler
async function handleHotelSearch(e) {
    e.preventDefault();
    console.log('🏨 Hotel search submitted');
    
    const form = e.target;
    console.log('Form element:', form);
    
    const formData = new FormData(form);
    console.log('FormData entries:');
    for (let [key, value] of formData.entries()) {
        console.log(`  ${key}: ${value}`);
    }
    
    const searchData = {
        location: formData.get('location') || '',
        checkIn: formData.get('checkIn') || '',
        checkOut: formData.get('checkOut') || '',
        guests: formData.get('guests') || '1',
        rooms: formData.get('rooms') || '1'
    };
    
    console.log('Hotel search data:', searchData);
    
    if (!searchData.location || !searchData.checkIn || !searchData.checkOut) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    showLoading(true);
    
    try {
        console.log('🌐 Making hotel search API call...');
        const response = await fetch('/api/hotels/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchData)
        });
        
        console.log('📡 Hotel search response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const results = await response.json();
        console.log('🏨 Hotel results:', results);
        
        // Fix: support both array and object with 'hotels' key
        let hotelResults = [];
        if (Array.isArray(results)) {
            hotelResults = results;
        } else if (results && Array.isArray(results.hotels)) {
            hotelResults = results.hotels;
        }
        
        // Store results for payment processing
        if (window.storeSearchResults) {
            window.storeSearchResults(hotelResults, 'hotels');
        }
        
        displayResults(hotelResults, 'hotels');
        
    } catch (error) {
        console.error('❌ Hotel search error:', error);
        showNotification('Error searching for hotels. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

// Transport search handler
async function handleTransportSearch(e) {
    e.preventDefault();
    console.log('🚗 Transport search submitted');
    
    const form = e.target;
    console.log('Form element:', form);
    
    const formData = new FormData(form);
    console.log('FormData entries:');
    for (let [key, value] of formData.entries()) {
        console.log(`  ${key}: ${value}`);
    }
    
    const searchData = {
        pickup: formData.get('pickup') || '',
        dropoff: formData.get('dropoff') || '',
        date: formData.get('date') || '',
        time: formData.get('time') || '',
        type: formData.get('type') || 'car'
    };
    
    console.log('Transport search data:', searchData);
    
    if (!searchData.pickup || !searchData.dropoff || !searchData.date || !searchData.time) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    showLoading(true);
    
    try {
        console.log('🌐 Making transport search API call...');
        const response = await fetch('/api/transport/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchData)
        });
        
        console.log('📡 Transport search response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const results = await response.json();
        console.log('🚗 Transport results:', results);
        
        // Store results for payment processing
        if (window.storeSearchResults) {
            window.storeSearchResults(results, 'transport');
        }
        
        displayResults(results, 'transport');
        
    } catch (error) {
        console.error('❌ Transport search error:', error);
        showNotification('Error searching for transport. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

// Display results
function displayResults(results, type) {
    console.log(`📊 Displaying ${type} results:`, results);
    
    const resultsSection = document.getElementById('resultsSection');
    const resultsGrid = document.getElementById('resultsGrid');
    
    console.log('Results section element:', resultsSection);
    console.log('Results grid element:', resultsGrid);
    
    if (!resultsSection || !resultsGrid) {
        console.error('❌ Results section or grid not found');
        showNotification('Error: Results section not found', 'error');
        return;
    }
    
    // Clear previous results
    resultsGrid.innerHTML = '';
    
    if (!results || results.length === 0) {
        resultsGrid.innerHTML = '<div class="no-results">No results found. Please try different search criteria.</div>';
        resultsSection.style.display = 'block';
        console.log('📭 No results found, showing message');
        return;
    }
    
    console.log(`🎯 Creating ${results.length} result cards for ${type}`);
    
    // Create result cards
    results.forEach((result, index) => {
        console.log(`Creating card ${index + 1}:`, result);
        const card = createResultCard(result, type);
        resultsGrid.appendChild(card);
    });
    
    // Show results section
    resultsSection.style.display = 'block';
    console.log('✅ Results section displayed');
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
    console.log('📜 Scrolled to results section');
}

// Create result card
function createResultCard(result, type) {
    console.log(`🎨 Creating ${type} card for:`, result);
    
    const card = document.createElement('div');
    card.className = 'result-card';
    
    switch (type) {
        case 'flights':
            card.innerHTML = `
                <div class="card-header">
                    <h3>${result.airline || 'Unknown Airline'}</h3>
                    <span class="price">${result.price ? result.price.replace('₹', '₹&nbsp;') : '₹--'}</span>
                </div>
                <div class="card-body">
                    <div class="flight-info">
                        <div class="departure">
                            <strong>${result.from_city || 'N/A'}</strong>
                            <span>${result.depart_time || 'N/A'}</span>
                        </div>
                        <div class="flight-arrow">→</div>
                        <div class="arrival">
                            <strong>${result.to_city || 'N/A'}</strong>
                            <span>${result.arrive_time || 'N/A'}</span>
                        </div>
                    </div>
                    <div class="flight-details">
                        <span>Flight: ${result.id || 'N/A'}</span>
                        <span>Stops: ${result.stops || 0}</span>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary" onclick="bookItem('${result.id}', 'flight')">Book Now</button>
                </div>
            `;
            break;
            
        case 'hotels':
            card.innerHTML = `
                <div class="card-header">
                    <h3>${result.name || 'Unknown Hotel'}</h3>
                    <span class="price">${result.price_per_night || '$0'}/night</span>
                </div>
                <div class="card-body">
                    <div class="hotel-info">
                        <div class="location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${result.location || 'N/A'}</span>
                        </div>
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <span>${result.rating || 'N/A'}</span>
                        </div>
                    </div>
                    <div class="amenities">
                        ${result.amenities ? result.amenities.join(', ') : 'Basic amenities'}
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary" onclick="bookItem('${result.id}', 'hotel')">Book Now</button>
                </div>
            `;
            break;
            
        case 'transport':
            card.innerHTML = `
                <div class="card-header">
                    <h3>${result.type || 'Transport'}</h3>
                    <span class="price">${result.price || '$0'}</span>
                </div>
                <div class="card-body">
                    <div class="transport-info">
                        <div class="route">
                            <div class="pickup">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${result.pickup || 'N/A'}</span>
                            </div>
                            <div class="route-arrow">→</div>
                            <div class="dropoff">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${result.dropoff || 'N/A'}</span>
                            </div>
                        </div>
                        <div class="transport-details">
                            <span>${result.vehicle_type || 'Vehicle'}</span>
                            <span>${result.duration || 'N/A'}</span>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary" onclick="bookItem('${result.id}', 'transport')">Book Now</button>
                </div>
            `;
            break;
    }
    
    console.log('✅ Card created successfully');
    return card;
}

// Booking function is now handled by payments.js
// The bookItem function is defined globally in payments.js

// Utility functions
function showLoading(show) {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = show ? 'block' : 'none';
        console.log('Loading spinner:', show ? 'shown' : 'hidden');
    } else {
        console.error('Loading spinner not found');
    }
}

function showNotification(message, type = 'info') {
    console.log(`📢 ${type.toUpperCase()}: ${message}`);
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

console.log('✅ AI Travel Agent JavaScript loaded successfully'); 