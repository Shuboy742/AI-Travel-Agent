# AI Travel Agent - Project Structure

## Overview
This document provides a comprehensive overview of the AI Travel Agent project structure, which is built with a **Python FastAPI backend** and **vanilla HTML/CSS/JavaScript frontend**. The project implements context engineering for AI-powered travel assistance using Google Gemini.

## Root Directory Structure

```
AI_Agent_travel_booking/
├── backend/                      # Python FastAPI backend application
│   ├── app/                     # Main application package
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── database.py          # SQLAlchemy database configuration
│   │   ├── models.py            # Database models and Pydantic schemas
│   │   ├── auth.py              # JWT authentication endpoints
│   │   ├── routes/              # API route modules
│   │   │   ├── flights.py       # Flight search and booking endpoints
│   │   │   ├── hotels.py        # Hotel search and booking endpoints
│   │   │   ├── transport.py     # Transport search endpoints
│   │   │   ├── bookings.py      # Booking management endpoints
│   │   │   ├── users.py         # User profile and preferences
│   │   │   └── payments.py      # Razorpay payment integration
│   │   └── services/            # Business logic services (future use)
│   ├── travel_agent.db          # SQLite database file
│   ├── package.json             # Node.js dependencies (legacy)
│   └── venv/                    # Python virtual environment
├── frontend/                     # Static HTML/CSS/JS frontend
│   ├── index.html               # Main application page
│   ├── css/                     # Stylesheets
│   │   ├── main.css             # Main stylesheet with modern CSS
│   │   ├── reset.css            # CSS reset for cross-browser consistency
│   │   ├── responsive.css       # Responsive design styles
│   │   └── components.css       # Component-specific styles
│   ├── js/                      # JavaScript modules
│   │   ├── main.js              # Main application logic and initialization
│   │   ├── api.js               # API service layer for backend communication
│   │   ├── chat.js              # AI chatbot functionality and UI
│   │   ├── auth.js              # Authentication handling
│   │   ├── search.js            # Search functionality
│   │   ├── ui.js                # UI interactions and animations
│   │   ├── utils.js             # Utility functions and helpers
│   │   └── config.js            # Configuration settings
│   ├── images/                  # Image assets
│   └── assets/                  # Other static assets (favicon, etc.)
├── Docs/                        # Project documentation
│   ├── project_structure.md     # This file - detailed project structure
│   ├── Bug_tracking.md          # Bug tracking and issue management
│   ├── UI_UX.md                 # UI/UX design guidelines and wireframes
│   └── implementation.md        # Implementation details and technical specs
├── shared/                      # Shared resources
│   ├── constants/               # Shared constants (future use)
│   └── types/                   # Shared type definitions (future use)
├── app/                         # Additional app directory (legacy)
├── venv/                        # Root virtual environment
├── .venv/                       # Alternative virtual environment
├── PRD.md                       # Product Requirements Document
├── requirements.txt             # Python dependencies
├── .gitignore                   # Git ignore rules
└── Readme.md                    # Project documentation
```

## Backend Structure (Python FastAPI)

### Core Application Files

#### `backend/app/main.py`
- **Purpose**: FastAPI application entry point
- **Key Features**:
  - CORS middleware configuration
  - Database initialization
  - Router registration for all API endpoints
  - Static file serving for frontend
  - AI chatbot endpoint (`/api/ai/chat`) with Google Gemini integration
  - Error handling and debugging

#### `backend/app/database.py`
- **Purpose**: SQLAlchemy database configuration
- **Key Features**:
  - Database engine setup (SQLite by default)
  - Session management
  - Base class for models

#### `backend/app/models.py`
- **Purpose**: Database models and Pydantic schemas
- **Models**:
  - `User`: User authentication and profile data
  - `Flight`: Flight information and availability
  - `Hotel`: Hotel information and booking data
  - `Transport`: Transportation options
  - `Booking`: Booking records and status
- **Schemas**: Pydantic models for API request/response validation

#### `backend/app/auth.py`
- **Purpose**: JWT authentication endpoints
- **Endpoints**:
  - `POST /api/auth/register`: User registration
  - `POST /api/auth/login`: User login
- **Features**: Password hashing with bcrypt, JWT token generation

### API Routes

#### `backend/app/routes/flights.py`
- **Purpose**: Flight search and booking endpoints
- **Endpoints**:
  - `GET /api/flights/search`: Search flights with filters
  - `GET /api/flights/{flight_id}`: Get specific flight details
- **Features**: Dummy data implementation, ready for Amadeus API integration

#### `backend/app/routes/hotels.py`
- **Purpose**: Hotel search and booking endpoints
- **Endpoints**:
  - `GET /api/hotels/search`: Search hotels with filters
  - `GET /api/hotels/{hotel_id}`: Get specific hotel details
- **Features**: Dummy data implementation, ready for Booking.com API integration

#### `backend/app/routes/transport.py`
- **Purpose**: Transport search endpoints
- **Endpoints**:
  - `GET /api/transport/search`: Search transport options
  - `GET /api/transport/{transport_id}`: Get specific transport details
- **Features**: Dummy data implementation, ready for Uber API integration

#### `backend/app/routes/bookings.py`
- **Purpose**: Booking management endpoints
- **Endpoints**:
  - `GET /api/bookings/`: List user bookings
  - `POST /api/bookings/`: Create new booking
  - `GET /api/bookings/{booking_id}`: Get specific booking
  - `DELETE /api/bookings/{booking_id}`: Cancel booking
- **Features**: In-memory storage, can be extended to database

#### `backend/app/routes/users.py`
- **Purpose**: User profile and preferences
- **Endpoints**:
  - `GET /api/users/profile`: Get user profile
  - `GET /api/users/preferences`: Get user preferences
  - `PUT /api/users/preferences`: Update user preferences
- **Features**: User preference management

#### `backend/app/routes/payments.py`
- **Purpose**: Razorpay payment integration
- **Endpoints**:
  - `POST /api/payments/create-order`: Create Razorpay payment order
- **Features**: Payment gateway integration, order creation

## Frontend Structure (HTML/CSS/JavaScript)

### Core Files

#### `frontend/index.html`
- **Purpose**: Main application page
- **Features**:
  - Responsive HTML5 structure
  - Navigation and hero section
  - Search forms (flights, hotels, transport)
  - AI chat widget
  - Modal templates for login/signup
  - Links to all CSS and JS files

### Stylesheets

#### `frontend/css/main.css`
- **Purpose**: Main stylesheet with modern CSS
- **Features**:
  - CSS variables for colors, typography, spacing
  - Modern styling with shadows and transitions
  - Component styles for buttons, forms, layout
  - Responsive design foundations

#### `frontend/css/responsive.css`
- **Purpose**: Responsive design styles
- **Features**:
  - Mobile-first approach
  - Breakpoints for mobile, tablet, desktop
  - Adaptive layouts and components

#### `frontend/css/reset.css`
- **Purpose**: CSS reset for cross-browser consistency
- **Features**: Normalizes default browser styles

#### `frontend/css/components.css`
- **Purpose**: Component-specific styles
- **Features**: Modular CSS for reusable components

### JavaScript Modules

#### `frontend/js/main.js`
- **Purpose**: Main application logic and initialization
- **Features**:
  - Application startup and configuration
  - Navigation and modal handling
  - Search tab switching
  - Event listeners and coordination
  - Dummy handlers for development

#### `frontend/js/api.js`
- **Purpose**: API service layer for backend communication
- **Features**:
  - HTTP client for all API calls
  - Authentication methods
  - Search and booking operations
  - Error handling and response processing
  - Mock data for development

#### `frontend/js/chat.js`
- **Purpose**: AI chatbot functionality and UI
- **Features**:
  - Chat interface management
  - Message sending and receiving
  - Typing indicators
  - Conversation history
  - Quick suggestions and responses

#### `frontend/js/auth.js`
- **Purpose**: Authentication handling
- **Features**: Login/logout functionality, token management

#### `frontend/js/search.js`
- **Purpose**: Search functionality
- **Features**: Search form handling, results display

#### `frontend/js/ui.js`
- **Purpose**: UI interactions and animations
- **Features**: UI state management, animations, transitions

#### `frontend/js/utils.js`
- **Purpose**: Utility functions and helpers
- **Features**: Common utility functions, data formatting

#### `frontend/js/config.js`
- **Purpose**: Configuration settings
- **Features**: API endpoints, environment variables

## Documentation Structure

### `Docs/project_structure.md`
- **Purpose**: This file - detailed project structure documentation
- **Content**: Complete file structure, purpose of each component

### `Docs/Bug_tracking.md`
- **Purpose**: Bug tracking and issue management
- **Content**: Known issues, bug reports, resolution tracking

### `Docs/UI_UX.md`
- **Purpose**: UI/UX design guidelines and wireframes
- **Content**: Design principles, user experience guidelines

### `Docs/implementation.md`
- **Purpose**: Implementation details and technical specifications
- **Content**: Technical implementation, architecture decisions

## Configuration Files

### `requirements.txt`
- **Purpose**: Python dependencies
- **Key Dependencies**:
  - `fastapi`: Web framework
  - `uvicorn`: ASGI server
  - `sqlalchemy`: ORM
  - `passlib[bcrypt]`: Password hashing
  - `python-jose`: JWT handling
  - `python-dotenv`: Environment variables
  - `razorpay`: Payment gateway
  - `google-generativeai`: Gemini AI integration

### `.env` (backend/.env)
- **Purpose**: Environment variables
- **Key Variables**:
  - `GEMINI_API_KEY`: Google Gemini API key
  - `SECRET_KEY`: JWT secret key
  - `DATABASE_URL`: Database connection string
  - `RAZORPAY_KEY_ID`: Razorpay public key
  - `RAZORPAY_KEY_SECRET`: Razorpay secret key

## Key Features

### AI Integration
- **Google Gemini AI**: Powered by `gemini-1.5-pro` model
- **Context Engineering**: Personalized conversations and memory
- **Multi-turn Conversations**: Context-aware responses

### Authentication
- **JWT Tokens**: Secure authentication
- **bcrypt Hashing**: Password security
- **Session Management**: User state tracking

### Payment Integration
- **Razorpay**: Payment gateway integration
- **Order Creation**: Payment order management
- **Secure Transactions**: Encrypted payment processing

### Database
- **SQLAlchemy ORM**: Database abstraction
- **SQLite**: Lightweight database (default)
- **Extensible**: Can switch to PostgreSQL/MySQL

### API Design
- **RESTful Endpoints**: Standard HTTP methods
- **Pydantic Validation**: Request/response validation
- **Error Handling**: Comprehensive error responses
- **CORS Support**: Cross-origin resource sharing

## Development Workflow

### Backend Development
1. **Setup**: Create virtual environment, install dependencies
2. **Configuration**: Set up `.env` file with API keys
3. **Development**: Run with `uvicorn app.main:app --reload`
4. **Testing**: Access API docs at `/docs`

### Frontend Development
1. **Static Files**: HTML/CSS/JS served by FastAPI
2. **Development**: No build process required
3. **Testing**: Direct browser access
4. **Deployment**: Same server as backend

### Context Engineering
1. **Documentation**: Maintain context files in `Docs/`
2. **Updates**: Regular updates to match project evolution
3. **AI Integration**: Context passed to Gemini for personalized responses

## Deployment Considerations

### Production Setup
- **Database**: Switch to PostgreSQL/MySQL
- **Environment**: Production environment variables
- **Security**: HTTPS, proper CORS settings
- **Monitoring**: Logging and error tracking

### Scalability
- **API Rate Limiting**: Implement rate limiting
- **Caching**: Redis for session and data caching
- **Load Balancing**: Multiple server instances
- **CDN**: Static file delivery optimization

This structure provides a solid foundation for an AI-powered travel agent with modern web technologies, comprehensive documentation, and scalable architecture.