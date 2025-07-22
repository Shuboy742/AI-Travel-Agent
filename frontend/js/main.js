/**
 * Main JavaScript file for AI Travel Agent
 * Handles application initialization and coordination
 */

// Application state
const AppState = {
    currentUser: null,
    isAuthenticated: false,
    currentTab: 'flights',
    searchResults: [],
    chatHistory: [],
    isLoading: false
};

// DOM Elements
const DOM = {
    // Navigation
    hamburger: document.querySelector('.hamburger'),
    navMenu: document.querySelector('.nav-menu'),
    navLinks: document.querySelectorAll('.nav-link'),
    
    // Search
    tabBtns: document.querySelectorAll('.tab-btn'),
    searchForms: document.querySelectorAll('.search-form'),
    searchResults: document.getElementById('resultsSection'),
    resultsGrid: document.getElementById('resultsGrid'),
    
    // Modals
    loginModal: document.getElementById('loginModal'),
    signupModal: document.getElementById('signupModal'),
    loginBtn: document.getElementById('loginBtn'),
    signupBtn: document.getElementById('signupBtn'),
    closeLoginModal: document.getElementById('closeLoginModal'),
    closeSignupModal: document.getElementById('closeSignupModal'),
    
    // Loading
    loadingSpinner: document.getElementById('loadingSpinner')
};

/**
 * Initialize the application
 */
function initApp() {
    console.log('🚀 Initializing AI Travel Agent...');
    
    // Initialize modules
    initNavigation();
    initSearchTabs();
    initModals();
    initEventListeners();
    initAuthentication();
    
    // Check for saved user session
    checkSavedSession();
    
    console.log('✅ AI Travel Agent initialized successfully');
}

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    // Mobile menu toggle
    DOM.hamburger.addEventListener('click', () => {
        DOM.hamburger.classList.toggle('active');
        DOM.navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', () => {
            DOM.hamburger.classList.remove('active');
            DOM.navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

/**
 * Initialize search tab functionality
 */
function initSearchTabs() {
    DOM.tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            switchTab(tabName);
        });
    });
}

/**
 * Switch between search tabs
 */
function switchTab(tabName) {
    // Update active tab button
    DOM.tabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });
    
    // Update active search form
    DOM.searchForms.forEach(form => {
        form.classList.remove('active');
        if (form.id === `${tabName}SearchForm`) {
            form.classList.add('active');
        }
    });
    
    AppState.currentTab = tabName;
}

/**
 * Initialize modal functionality
 */
function initModals() {
    // Login modal
    DOM.loginBtn.addEventListener('click', () => {
        showModal(DOM.loginModal);
    });
    
    DOM.closeLoginModal.addEventListener('click', () => {
        hideModal(DOM.loginModal);
    });
    
    // Signup modal
    DOM.signupBtn.addEventListener('click', () => {
        showModal(DOM.signupModal);
    });
    
    DOM.closeSignupModal.addEventListener('click', () => {
        hideModal(DOM.signupModal);
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            hideModal(e.target);
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideAllModals();
        }
    });
}

/**
 * Show modal
 */
function showModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Hide modal
 */
function hideModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Hide all modals
 */
function hideAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => hideModal(modal));
}

/**
 * Initialize event listeners
 */
function initEventListeners() {
    // Search form submissions
    document.getElementById('flightSearchForm').addEventListener('submit', handleFlightSearch);
    document.getElementById('hotelSearchForm').addEventListener('submit', handleHotelSearch);
    document.getElementById('transportSearchForm').addEventListener('submit', handleTransportSearch);
    
    // Authentication form submissions
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
    
    // Results filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterResults(btn.dataset.filter);
        });
    });
    
    // Scroll effects
    window.addEventListener('scroll', handleScroll);
    
    // Window resize
    window.addEventListener('resize', handleResize);
}

/**
 * Handle scroll events
 */
function handleScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
}

/**
 * Handle window resize
 */
function handleResize() {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        DOM.hamburger.classList.remove('active');
        DOM.navMenu.classList.remove('active');
    }
}

// City to IATA code mapping
const cityToIata = {
    'pune': 'PNQ',
    'delhi': 'DEL',
    'mumbai': 'BOM',
    'new york': 'JFK',
    'los angeles': 'LAX',
    'san francisco': 'SFO',
    'bangalore': 'BLR',
    'chennai': 'MAA',
    'hyderabad': 'HYD',
    // Add more as needed
};

function getIataCode(city) {
    if (!city) return '';
    return cityToIata[city.trim().toLowerCase()] || city.trim().toUpperCase();
}

/**
 * Handle flight search
 */
async function handleFlightSearch(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    let from = formData.get('from') || document.getElementById('from').value;
    let to = formData.get('to') || document.getElementById('to').value;
    const searchData = {
        from: getIataCode(from),
        to: getIataCode(to),
        departDate: formData.get('departDate') || document.getElementById('departDate').value,
        returnDate: formData.get('returnDate') || document.getElementById('returnDate').value,
        passengers: formData.get('passengers') || document.getElementById('passengers').value
    };
    
    if (!searchData.from || !searchData.to || !searchData.departDate) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    showLoading(true);
    
    try {
        const results = await searchFlights(searchData);
        displaySearchResults(results, 'flights');
    } catch (error) {
        console.error('Flight search error:', error);
        showNotification('Error searching for flights. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

/**
 * Handle hotel search
 */
async function handleHotelSearch(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const searchData = {
        location: formData.get('location') || document.getElementById('hotelLocation').value,
        checkIn: formData.get('checkIn') || document.getElementById('checkIn').value,
        checkOut: formData.get('checkOut') || document.getElementById('checkOut').value,
        guests: formData.get('guests') || document.getElementById('guests').value,
        rooms: formData.get('rooms') || document.getElementById('rooms').value
    };
    
    if (!searchData.location || !searchData.checkIn || !searchData.checkOut) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    showLoading(true);
    
    try {
        const results = await searchHotels(searchData);
        displaySearchResults(results, 'hotels');
    } catch (error) {
        console.error('Hotel search error:', error);
        showNotification('Error searching for hotels. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

/**
 * Handle transport search
 */
async function handleTransportSearch(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const searchData = {
        pickup: formData.get('pickup') || document.getElementById('pickup').value,
        dropoff: formData.get('dropoff') || document.getElementById('dropoff').value,
        date: formData.get('date') || document.getElementById('transportDate').value,
        time: formData.get('time') || document.getElementById('transportTime').value,
        type: formData.get('type') || document.getElementById('transportType').value
    };
    
    if (!searchData.pickup || !searchData.dropoff || !searchData.date || !searchData.time) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    showLoading(true);
    
    try {
        const results = await searchTransport(searchData);
        displaySearchResults(results, 'transport');
    } catch (error) {
        console.error('Transport search error:', error);
        showNotification('Error searching for transport. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

/**
 * Display search results
 */
function displaySearchResults(results, type) {
    AppState.searchResults = results;
    
    if (results.length === 0) {
        showNotification('No results found. Please try different search criteria.', 'info');
        return;
    }
    
    // Show results section
    DOM.searchResults.style.display = 'block';
    DOM.searchResults.scrollIntoView({ behavior: 'smooth' });
    
    // Clear previous results
    DOM.resultsGrid.innerHTML = '';
    
    // Generate result cards
    results.forEach(result => {
        const card = createResultCard(result, type);
        DOM.resultsGrid.appendChild(card);
    });
    
    showNotification(`Found ${results.length} results`, 'success');
}

/**
 * Create result card
 */
function createResultCard(result, type) {
    const card = document.createElement('div');
    card.className = 'result-card fade-in';
    
    switch (type) {
        case 'flights':
            card.innerHTML = createFlightCard(result);
            break;
        case 'hotels':
            card.innerHTML = createHotelCard(result);
            break;
        case 'transport':
            card.innerHTML = createTransportCard(result);
            break;
    }
    
    return card;
}

/**
 * Create flight result card HTML
 */
function createFlightCard(flight) {
    return `
        <div class="result-card-header">
            <div class="airline-info">
                <img style="max-width:48px;max-height:48px;object-fit:contain;border-radius:6px;margin-right:8px;vertical-align:middle;" src="${getAirlineLogo(flight.airline)}" alt="${flight.airline}">
                <span>${flight.airline}</span>
            </div>
            <div class="price">$${flight.price}</div>
        </div>
        <div class="flight-details">
            <div class="flight-route">
                <div class="departure">
                    <div class="time">${flight.depart_time}</div>
                    <div class="airport">${flight.from_city}</div>
                </div>
                <div class="flight-line">
                    <div class="duration">-</div>
                    <div class="stops">${flight.stops} stop${flight.stops !== 1 ? 's' : ''}</div>
                </div>
                <div class="arrival">
                    <div class="time">${flight.arrive_time}</div>
                    <div class="airport">${flight.to_city}</div>
                </div>
            </div>
        </div>
        <div class="result-card-footer">
            <button class="btn btn-primary" onclick="bookFlight('${flight.id}')">
                Book Now
            </button>
            <button class="btn btn-outline" onclick="viewFlightDetails('${flight.id}')">
                Details
            </button>
        </div>
    `;
}

/**
 * Create hotel result card HTML
 */
function createHotelCard(hotel) {
    return `
        <div class="result-card-header">
            <div class="hotel-info">
                <img src="${hotel.image || 'images/hotel-default.jpg'}" alt="${hotel.name}">
                <div class="hotel-details">
                    <h4>${hotel.name}</h4>
                    <div class="rating">
                        ${'★'.repeat(hotel.rating)}${'☆'.repeat(5 - hotel.rating)}
                        <span>(${hotel.reviewCount} reviews)</span>
                    </div>
                </div>
            </div>
            <div class="price">$${hotel.price}/night</div>
        </div>
        <div class="hotel-details">
            <div class="location">
                <i class="fas fa-map-marker-alt"></i>
                ${hotel.location}
            </div>
            <div class="amenities">
                ${hotel.amenities.slice(0, 3).map(amenity => 
                    `<span class="amenity">${amenity}</span>`
                ).join('')}
            </div>
        </div>
        <div class="result-card-footer">
            <button class="btn btn-primary" onclick="bookHotel('${hotel.id}')">
                Book Now
            </button>
            <button class="btn btn-outline" onclick="viewHotelDetails('${hotel.id}')">
                Details
            </button>
        </div>
    `;
}

/**
 * Create transport result card HTML
 */
function createTransportCard(transport) {
    return `
        <div class="result-card-header">
            <div class="transport-info">
                <div class="transport-type">
                    <i class="fas fa-${getTransportIcon(transport.type)}"></i>
                    <span>${transport.type}</span>
                </div>
                <div class="provider">${transport.provider}</div>
            </div>
            <div class="price">$${transport.price}</div>
        </div>
        <div class="transport-details">
            <div class="route">
                <div class="pickup">
                    <i class="fas fa-map-marker-alt"></i>
                    ${transport.pickup}
                </div>
                <div class="dropoff">
                    <i class="fas fa-map-marker-alt"></i>
                    ${transport.dropoff}
                </div>
            </div>
            <div class="time-info">
                <span>${transport.duration} min</span>
                <span>${transport.vehicleType}</span>
            </div>
        </div>
        <div class="result-card-footer">
            <button class="btn btn-primary" onclick="bookTransport('${transport.id}')">
                Book Now
            </button>
            <button class="btn btn-outline" onclick="viewTransportDetails('${transport.id}')">
                Details
            </button>
        </div>
    `;
}

/**
 * Get transport icon
 */
function getTransportIcon(type) {
    const icons = {
        taxi: 'taxi',
        uber: 'car',
        limo: 'car-side',
        shuttle: 'bus'
    };
    return icons[type] || 'car';
}

/**
 * Filter results
 */
function filterResults(filter) {
    // Implementation for filtering results
    console.log('Filtering results by:', filter);
}

/**
 * Show loading spinner
 */
function showLoading(show) {
    AppState.isLoading = show;
    if (show) {
        DOM.loadingSpinner.classList.add('active');
    } else {
        DOM.loadingSpinner.classList.remove('active');
    }
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} fade-in`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('fade-in');
        notification.classList.add('fade-out');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('fade-in');
        notification.classList.add('fade-out');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

/**
 * Get notification icon
 */
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

/**
 * Initialize authentication
 */
function initAuthentication() {
    // Check for existing token
    const token = localStorage.getItem('authToken');
    if (token) {
        // Validate token with backend
        validateToken(token);
    }
}

/**
 * Check saved session
 */
function checkSavedSession() {
    const userData = localStorage.getItem('userData');
    if (userData) {
        try {
            AppState.currentUser = JSON.parse(userData);
            AppState.isAuthenticated = true;
            updateAuthUI();
        } catch (error) {
            console.error('Error parsing saved user data:', error);
            localStorage.removeItem('userData');
        }
    }
}

/**
 * Update authentication UI
 */
function updateAuthUI() {
    if (AppState.isAuthenticated && AppState.currentUser) {
        DOM.loginBtn.style.display = 'none';
        DOM.signupBtn.style.display = 'none';
        
        // Add user menu
        const userMenu = document.createElement('div');
        userMenu.className = 'user-menu';
        userMenu.innerHTML = `
            <button class="user-menu-btn">
                <i class="fas fa-user"></i>
                <span>${AppState.currentUser.name}</span>
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="user-dropdown">
                <a href="#profile">Profile</a>
                <a href="#bookings">My Bookings</a>
                <a href="#settings">Settings</a>
                <button onclick="logout()">Logout</button>
            </div>
        `;
        
        document.querySelector('.nav-auth').appendChild(userMenu);
    }
}

/**
 * Handle login
 */
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    try {
        const response = await login(email, password);
        if (response.success) {
            AppState.currentUser = response.user;
            AppState.isAuthenticated = true;
            
            // Save to localStorage
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('userData', JSON.stringify(response.user));
            
            hideModal(DOM.loginModal);
            updateAuthUI();
            showNotification('Login successful!', 'success');
        }
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Login failed. Please check your credentials.', 'error');
    }
}

/**
 * Handle signup
 */
async function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (!name || !email || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    try {
        const response = await signup(name, email, password);
        if (response.success) {
            AppState.currentUser = response.user;
            AppState.isAuthenticated = true;
            
            // Save to localStorage
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('userData', JSON.stringify(response.user));
            
            hideModal(DOM.signupModal);
            updateAuthUI();
            showNotification('Account created successfully!', 'success');
        }
    } catch (error) {
        console.error('Signup error:', error);
        showNotification('Signup failed. Please try again.', 'error');
    }
}

/**
 * Logout function
 */
function logout() {
    AppState.currentUser = null;
    AppState.isAuthenticated = false;
    
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Update UI
    location.reload();
}

// Booking functions (to be implemented)
import { searchFlights, searchHotels, searchTransport, bookFlight, bookHotel, bookTransport } from './api.js';

// Replace booking functions with real API calls
// Razorpay payment integration for flight booking
async function bookFlightHandler(flightId) {
    try {
        showLoading(true);
        // Find the selected flight details
        const flight = AppState.searchResults.find(f => f.id == flightId);
        if (!flight) {
            showNotification('Flight not found.', 'error');
            return;
        }
        // Call backend to create Razorpay order
        const amount = 1000; // Set a dummy amount or use flight.price if available
        const paymentRes = await fetch('/api/payments/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, currency: 'INR', flight })
        });
        const paymentData = await paymentRes.json();
        if (!paymentRes.ok) throw new Error(paymentData.detail || 'Payment order creation failed');
        // Open Razorpay modal
        const options = {
            key: paymentData.razorpay_key_id,
            amount: paymentData.order.amount,
            currency: paymentData.order.currency,
            order_id: paymentData.order.id,
            name: 'AI Travel Agent',
            description: 'Flight Booking',
            handler: async function (response) {
                // On payment success, create booking
                try {
                    const bookingRes = await fetch('/api/bookings/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ type: 'flight', id: flightId })
                    });
                    const bookingData = await bookingRes.json();
                    if (!bookingRes.ok) throw new Error(bookingData.detail || 'Booking failed');
                    showNotification('Flight booked and payment successful!', 'success');
                } catch (err) {
                    showNotification('Payment succeeded but booking failed.', 'error');
                }
            },
            prefill: {},
            notes: {},
            theme: { color: '#2563EB' }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    } catch (error) {
        showNotification('Payment/Booking failed: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
}

async function bookHotelHandler(hotelId) {
    try {
        showLoading(true);
        const result = await bookHotel(hotelId);
        showNotification('Hotel booked successfully!', 'success');
    } catch (error) {
        showNotification('Hotel booking failed.', 'error');
    } finally {
        showLoading(false);
    }
}

async function bookTransportHandler(transportId) {
    try {
        showLoading(true);
        const result = await bookTransport(transportId);
        showNotification('Transport booked successfully!', 'success');
    } catch (error) {
        showNotification('Transport booking failed.', 'error');
    } finally {
        showLoading(false);
    }
}

// Attach booking handlers to window for inline onclick usage
window.bookFlight = bookFlightHandler;
window.bookHotel = bookHotelHandler;
window.bookTransport = bookTransportHandler;

// Flight details modal
function viewFlightDetails(flightId) {
    const flight = AppState.searchResults.find(f => f.id == flightId);
    if (!flight) {
        showNotification('Flight not found.', 'error');
        return;
    }
    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Flight Details</h3>
                <button class="modal-close" id="closeFlightDetailsModal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <p><strong>Airline:</strong> ${flight.airline}</p>
                <p><strong>From:</strong> ${flight.from_city}</p>
                <p><strong>To:</strong> ${flight.to_city}</p>
                <p><strong>Departure:</strong> ${flight.depart_time}</p>
                <p><strong>Arrival:</strong> ${flight.arrive_time}</p>
                <p><strong>Price:</strong> ${flight.price || '-'}</p>
                <p><strong>Stops:</strong> ${flight.stops}</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('closeFlightDetailsModal').onclick = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    };
}

function viewHotelDetails(hotelId) {
    console.log('Viewing hotel details:', hotelId);
    showNotification('Details view coming soon!', 'info');
}

function viewTransportDetails(transportId) {
    console.log('Viewing transport details:', transportId);
    showNotification('Details view coming soon!', 'info');
}

/**
 * Get airline logo
 */
function getAirlineLogo(airline) {
    const logos = {
        'Delta': 'images/delta.png',
        'United': 'images/united.jpeg' // Use .jpeg for United
        // Add more airlines as needed
    };
    return logos[airline] || 'images/airline-default.png';
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Export for use in other modules
window.AppState = AppState;
window.showNotification = showNotification;
window.showLoading = showLoading; 
window.viewFlightDetails = viewFlightDetails; 