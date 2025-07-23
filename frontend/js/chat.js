/**
 * AI Chat Functionality
 * Handles chat interface and AI interactions
 */

class ChatService {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.getElementById('sendMessage');
        this.chatToggle = document.getElementById('chatToggle');
        this.chatBody = document.getElementById('chatBody');
        this.chatWidget = document.getElementById('aiChatWidget');
        
        this.isOpen = false;
        this.isTyping = false;
        this.conversationHistory = [];
        
        this.init();
    }

    /**
     * Initialize chat functionality
     */
    init() {
        this.bindEvents();
        this.loadConversationHistory();
        this.showWelcomeMessage();
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Send message on button click
        this.sendButton.addEventListener('click', () => {
            this.sendMessage();
        });

        // Send message on Enter key
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Toggle chat widget
        this.chatToggle.addEventListener('click', () => {
            this.toggleChat();
        });

        // Close chat when clicking outside (mobile)
        document.addEventListener('click', (e) => {
            if (!this.chatWidget.contains(e.target) && this.isOpen) {
                // Only close on mobile or if clicking outside the widget
                if (window.innerWidth <= 768) {
                    this.closeChat();
                }
            }
        });
    }

    /**
     * Toggle chat visibility
     */
    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    /**
     * Open chat
     */
    openChat() {
        this.isOpen = true;
        this.chatBody.style.display = 'block';
        this.chatToggle.innerHTML = '<i class="fas fa-times"></i>';
        this.chatInput.focus();
        
        // Scroll to bottom
        this.scrollToBottom();
    }

    /**
     * Close chat
     */
    closeChat() {
        this.isOpen = false;
        this.chatBody.style.display = 'none';
        this.chatToggle.innerHTML = '<i class="fas fa-comments"></i>';
    }

    /**
     * Send message
     */
    async sendMessage() {
        const message = this.chatInput.value.trim();
        
        if (!message || this.isTyping) {
            return;
        }

        // Add user message to chat
        this.addMessage(message, 'user');
        this.chatInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Send message to AI
            const response = await this.sendToAI(message);
            
            // Remove typing indicator
            this.hideTypingIndicator();
            
            // Add AI response
            if (response.success) {
                this.addMessage(response.response, 'ai');
                
                // Show suggestions if available
                if (response.suggestions && response.suggestions.length > 0) {
                    this.showSuggestions(response.suggestions);
                }
            } else {
                this.addMessage('Sorry, I encountered an error. Please try again.', 'ai');
            }
        } catch (error) {
            console.error('Chat error:', error);
            this.hideTypingIndicator();
            this.addMessage('Sorry, I\'m having trouble connecting. Please check your internet connection and try again.', 'ai');
        }
    }

    /**
     * Send message to AI backend
     */
    async sendToAI(message) {
        // Get user context
        const context = this.getUserContext();
        
        // Send to backend
        const response = await fetch('/api/ai/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({
                message: message,
                context: context
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    }

    /**
     * Add message to chat
     */
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        
        const icon = document.createElement('i');
        if (sender === 'user') {
            icon.className = 'fas fa-user';
        } else {
            icon.className = 'fas fa-robot';
        }
        
        avatar.appendChild(icon);
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // Handle different content types
        if (typeof content === 'string') {
            messageContent.innerHTML = this.formatMessage(content);
        } else if (content.type === 'card') {
            messageContent.appendChild(this.createCard(content.data));
        } else if (content.type === 'list') {
            messageContent.appendChild(this.createList(content.data));
        }
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        this.chatMessages.appendChild(messageDiv);
        
        // Add to conversation history
        this.conversationHistory.push({
            sender: sender,
            content: content,
            timestamp: new Date()
        });
        
        // Save to localStorage
        this.saveConversationHistory();
        
        // Scroll to bottom
        this.scrollToBottom();
    }

    /**
     * Format message content
     */
    formatMessage(content) {
        // Convert URLs to links
        content = content.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        );
        
        // Convert line breaks to <br>
        content = content.replace(/\n/g, '<br>');
        
        // Highlight important information
        content = content.replace(
            /\*\*(.*?)\*\*/g,
            '<strong>$1</strong>'
        );
        
        return content;
    }

    /**
     * Create card element
     */
    createCard(data) {
        const card = document.createElement('div');
        card.className = 'ai-card';
        
        if (data.image) {
            const img = document.createElement('img');
            img.src = data.image;
            img.alt = data.title;
            card.appendChild(img);
        }
        
        if (data.title) {
            const title = document.createElement('h4');
            title.textContent = data.title;
            card.appendChild(title);
        }
        
        if (data.description) {
            const desc = document.createElement('p');
            desc.textContent = data.description;
            card.appendChild(desc);
        }
        
        if (data.action) {
            const button = document.createElement('button');
            button.className = 'btn btn-primary btn-sm';
            button.textContent = data.actionText || 'View Details';
            button.onclick = () => this.handleCardAction(data.action);
            card.appendChild(button);
        }
        
        return card;
    }

    /**
     * Create list element
     */
    createList(items) {
        const list = document.createElement('ul');
        list.className = 'ai-list';
        
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
        });
        
        return list;
    }

    /**
     * Handle card action
     */
    handleCardAction(action) {
        switch (action.type) {
            case 'search_flights':
                this.switchToFlightSearch(action.data);
                break;
            case 'search_hotels':
                this.switchToHotelSearch(action.data);
                break;
            case 'search_transport':
                this.switchToTransportSearch(action.data);
                break;
            case 'navigate':
                window.location.href = action.url;
                break;
            default:
                console.log('Unknown action:', action);
        }
    }

    /**
     * Switch to flight search
     */
    switchToFlightSearch(data) {
        // Switch to flight tab
        const flightTab = document.querySelector('[data-tab="flights"]');
        if (flightTab) {
            flightTab.click();
        }
        
        // Fill in search form
        if (data.from) {
            document.getElementById('from').value = data.from;
        }
        if (data.to) {
            document.getElementById('to').value = data.to;
        }
        if (data.date) {
            document.getElementById('departDate').value = data.date;
        }
        
        // Close chat
        this.closeChat();
        
        // Scroll to search form
        document.querySelector('.search-container').scrollIntoView({
            behavior: 'smooth'
        });
    }

    /**
     * Switch to hotel search
     */
    switchToHotelSearch(data) {
        // Switch to hotel tab
        const hotelTab = document.querySelector('[data-tab="hotels"]');
        if (hotelTab) {
            hotelTab.click();
        }
        
        // Fill in search form
        if (data.location) {
            document.getElementById('hotelLocation').value = data.location;
        }
        if (data.checkIn) {
            document.getElementById('checkIn').value = data.checkIn;
        }
        if (data.checkOut) {
            document.getElementById('checkOut').value = data.checkOut;
        }
        
        // Close chat
        this.closeChat();
        
        // Scroll to search form
        document.querySelector('.search-container').scrollIntoView({
            behavior: 'smooth'
        });
    }

    /**
     * Switch to transport search
     */
    switchToTransportSearch(data) {
        // Switch to transport tab
        const transportTab = document.querySelector('[data-tab="transport"]');
        if (transportTab) {
            transportTab.click();
        }
        
        // Fill in search form
        if (data.pickup) {
            document.getElementById('pickup').value = data.pickup;
        }
        if (data.dropoff) {
            document.getElementById('dropoff').value = data.dropoff;
        }
        if (data.date) {
            document.getElementById('transportDate').value = data.date;
        }
        
        // Close chat
        this.closeChat();
        
        // Scroll to search form
        document.querySelector('.search-container').scrollIntoView({
            behavior: 'smooth'
        });
    }

    /**
     * Show typing indicator
     */
    showTypingIndicator() {
        this.isTyping = true;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    /**
     * Hide typing indicator
     */
    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    /**
     * Show suggestions
     */
    showSuggestions(suggestions) {
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'suggestions';
        
        suggestions.forEach(suggestion => {
            const button = document.createElement('button');
            button.className = 'suggestion-btn';
            button.textContent = suggestion;
            button.onclick = () => {
                this.chatInput.value = suggestion;
                this.sendMessage();
            };
            suggestionsDiv.appendChild(button);
        });
        
        this.chatMessages.appendChild(suggestionsDiv);
        this.scrollToBottom();
    }

    /**
     * Show welcome message
     */
    showWelcomeMessage() {
        const welcomeMessage = `Hello! I'm your AI travel assistant. I can help you with:

• **Flight bookings** - Search and compare flights
• **Hotel reservations** - Find the perfect accommodation
• **Transportation** - Book cabs, car rentals, and more
• **Travel planning** - Get recommendations and tips
• **Travel information** - Weather, currency, local customs

What would you like to book today?`;

        this.addMessage(welcomeMessage, 'ai');
    }

    /**
     * Get user context
     */
    getUserContext() {
        const context = {
            currentPage: window.location.pathname,
            userAgent: navigator.userAgent,
            screenSize: `${window.innerWidth}x${window.innerHeight}`,
            timestamp: new Date().toISOString()
        };

        // Add search form data if available
        const currentTab = document.querySelector('.tab-btn.active');
        if (currentTab) {
            context.currentSearch = currentTab.dataset.tab;
        }

        // Add user preferences if available
        const userData = localStorage.getItem('userData');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                context.userPreferences = user.preferences || {};
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }

        return context;
    }

    /**
     * Save conversation history
     */
    saveConversationHistory() {
        try {
            localStorage.setItem('chatHistory', JSON.stringify(this.conversationHistory));
        } catch (error) {
            console.error('Error saving chat history:', error);
        }
    }

    /**
     * Load conversation history
     */
    loadConversationHistory() {
        try {
            const saved = localStorage.getItem('chatHistory');
            if (saved) {
                this.conversationHistory = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error loading chat history:', error);
        }
    }

    /**
     * Clear conversation history
     */
    clearConversationHistory() {
        this.conversationHistory = [];
        this.chatMessages.innerHTML = '';
        localStorage.removeItem('chatHistory');
        this.showWelcomeMessage();
    }

    /**
     * Scroll to bottom of chat
     */
    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }

    /**
     * Handle quick actions
     */
    handleQuickAction(action) {
        const actions = {
            search_flights: () => {
                this.addMessage('I can help you search for flights. Where would you like to go?', 'ai');
            },
            search_hotels: () => {
                this.addMessage('I can help you find hotels. What destination are you looking for?', 'ai');
            },
            search_transport: () => {
                this.addMessage('I can help you book transportation. Where do you need to go?', 'ai');
            },
            travel_tips: () => {
                this.addMessage('Here are some travel tips:\n\n• Book flights 2-3 months in advance for best prices\n• Check visa requirements for your destination\n• Pack light and bring essential documents\n• Research local customs and culture\n• Get travel insurance for peace of mind', 'ai');
            },
            weather_info: () => {
                this.addMessage('I can help you check the weather for your destination. Which city would you like to know about?', 'ai');
            },
            currency_converter: () => {
                this.addMessage('I can help you convert currencies. What amount and currencies do you need to convert?', 'ai');
            }
        };

        if (actions[action]) {
            actions[action]();
        }
    }
}

// Initialize chat service when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatService = new ChatService();
});

window.handleQuickAction = (action) => {
    if (window.chatService) {
        window.chatService.handleQuickAction(action);
    }
}; 