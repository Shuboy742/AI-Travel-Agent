# AI Travel Agent - Project Structure

## Root Directory Structure

```
ai-travel-agent/
├── frontend/                     # React.js frontend application
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── common/          # Generic components
│   │   │   ├── forms/           # Form components
│   │   │   ├── ui/              # UI elements (buttons, inputs, etc.)
│   │   │   └── layout/          # Layout components
│   │   ├── pages/               # Page components
│   │   │   ├── auth/           # Authentication pages
│   │   │   ├── booking/        # Booking-related pages
│   │   │   ├── dashboard/      # User dashboard
│   │   │   └── travel/         # Travel-specific pages
│   │   ├── services/            # API services and HTTP clients
│   │   ├── hooks/               # Custom React hooks
│   │   ├── store/               # Redux store configuration
│   │   │   ├── slices/         # Redux slices
│   │   │   └── middleware/     # Custom middleware
│   │   ├── utils/               # Utility functions
│   │   ├── constants/           # Application constants
│   │   ├── types/               # TypeScript type definitions
│   │   ├── assets/              # Static assets
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── styles/
│   │   ├── App.tsx              # Main App component
│   │   ├── index.tsx            # Entry point
│   │   └── index.css            # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── .env
├── backend/                      # Node.js backend application
│   ├── src/
│   │   ├── controllers/         # Request controllers
│   │   │   ├── auth.controller.ts
│   │   │   ├── booking.controller.ts
│   │   │   ├── flight.controller.ts
│   │   │   ├── hotel.controller.ts
│   │   │   ├── cab.controller.ts
│   │   │   └── ai.controller.ts
│   │   ├── models/              # Database models
│   │   │   ├── User.model.ts
│   │   │   ├── Booking.model.ts
│   │   │   ├── Flight.model.ts
│   │   │   ├── Hotel.model.ts
│   │   │   └── Conversation.model.ts
│   │   ├── routes/              # API route definitions
│   │   │   ├── auth.routes.ts
│   │   │   ├── booking.routes.ts
│   │   │   ├── travel.routes.ts
│   │   │   └── ai.routes.ts
│   │   ├── middleware/          # Express middleware
│   │   │   ├── auth.middleware.ts
│   │   │   ├── validation.middleware.ts
│   │   │   ├── error.middleware.ts
│   │   │   └── rate-limit.middleware.ts
│   │   ├── services/            # Business logic services
│   │   │   ├── auth.service.ts
│   │   │   ├── flight.service.ts
│   │   │   ├── hotel.service.ts
│   │   │   ├── cab.service.ts
│   │   │   ├── payment.service.ts
│   │   │   └── gemini.service.ts
│   │   ├── utils/               # Utility functions
│   │   │   ├── database.ts
│   │   │   ├── logger.ts
│   │   │   ├── email.ts
│   │   │   └── validation.ts
│   │   ├── config/              # Configuration files
│   │   │   ├── database.config.ts
│   │   │   ├── redis.config.ts
│   │   │   └── app.config.ts
│   │   ├── types/               # TypeScript interfaces
│   │   │   ├── auth.types.ts
│   │   │   ├── booking.types.ts
│   │   │   └── api.types.ts
│   │   ├── app.ts               # Express app configuration
│   │   └── server.ts            # Server entry point
│   ├── tests/                   # Test files
│   │   ├── unit/
│   │   ├── integration/
│   │   └── helpers/
│   ├── package.json
│   ├── tsconfig.json
│   ├── jest.config.js
│   └── .env
├── shared/                       # Shared types and utilities
│   ├── types/                   # Common TypeScript types
│   └── constants/               # Shared constants
├── docs/                        # Project documentation
│   ├── Implementation.md
│   ├── project_structure.md
│   ├── UI_UX_doc.md
│   ├── Bug_tracking.md
│   └── api/                     # API documentation
├── scripts/                     # Build and deployment scripts
│   ├── build.sh
│   ├── deploy.sh
│   └── setup.sh
├── docker/                      # Docker configuration
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── docker-compose.yml
├── .gitignore
├── README.md
└── package.json                 # Root package.json for workspace
```

## Detailed Structure Explanation

### Frontend Structure (`/frontend`)

#### Components Organization
- **`/components/common`** - Reusable components like Header, Footer, LoadingSpinner
- **`/components/forms`** - Form components for booking, registration, etc.
- **`/components/ui`** - Basic UI elements (Button, Input, Modal, Card)
- **`/components/layout`** - Layout wrappers and navigation components

#### Pages Organization
- **`/pages/auth`** - Login, Register, ForgotPassword pages
- **`/pages/booking`** - Flight, Hotel, Cab booking pages
- **`/pages/dashboard`** - User dashboard, booking history, profile
- **`/pages/travel`** - Travel search, results, details pages

#### Services Layer
- **API clients** for backend communication
- **Third-party integrations** (payment, maps, etc.)
- **Authentication service** for JWT handling

### Backend Structure (`/backend`)

#### Controllers Layer
- Handle HTTP requests and responses
- Input validation and sanitization
- Call appropriate services
- Format API responses

#### Models Layer
- **User.model.ts** - User schema with authentication fields
- **Booking.model.ts** - Unified booking schema for flights, hotels, cabs
- **Flight.model.ts** - Flight-specific data schema
- **Hotel.model.ts** - Hotel information schema
- **Conversation.model.ts** - AI chat history schema

#### Services Layer
- **Business logic implementation**
- **Third-party API integrations**
- **Database operations**
- **AI processing with Gemini**

#### Middleware
- **Authentication** - JWT verification
- **Validation** - Request data validation
- **Error handling** - Centralized error processing
- **Rate limiting** - API usage control

### Configuration Files

#### Frontend Configuration
- **`tailwind.config.js`** - Tailwind CSS customization
- **`tsconfig.json`** - TypeScript compiler options
- **`.env`** - Environment variables (API URLs, keys)

#### Backend Configuration
- **`tsconfig.json`** - TypeScript configuration
- **`jest.config.js`** - Testing framework setup
- **`.env`** - Server configuration and API keys

## File Naming Conventions

### TypeScript Files
- **Components:** PascalCase (e.g., `FlightSearch.tsx`)
- **Services:** camelCase with .service suffix (e.g., `flight.service.ts`)
- **Controllers:** camelCase with .controller suffix (e.g., `booking.controller.ts`)
- **Models:** PascalCase with .model suffix (e.g., `User.model.ts`)
- **Types:** camelCase with .types suffix (e.g., `booking.types.ts`)

### Directory Conventions
- All directories use **kebab-case** or **camelCase**
- Component directories match component names
- Service directories group related functionality

## Module Organization Patterns

### Import Structure
```typescript
// External library imports
import React from 'react';
import { Express } from 'express';

// Internal imports (absolute paths)
import { UserService } from '@/services/user.service';
import { BookingTypes } from '@/types/booking.types';

// Relative imports (for closely related files)
import './Component.styles.css';
```

### Export Patterns
```typescript
// Named exports for utilities and services
export { FlightService } from './flight.service';

// Default exports for components and main modules
export default FlightSearch;
```

## Environment Configuration

### Development Environment
- Frontend runs on `http://localhost:3000`
- Backend API runs on `http://localhost:5000`
- MongoDB on `mongodb://localhost:27017`
- Redis on `redis://localhost:6379`

### Production Environment
- Environment variables for all service URLs
- Secure API key management
- Database connection pooling
- CDN configuration for static assets

## Build and Deployment Structure

### Development Build
- **Frontend:** Create React App development server
- **Backend:** ts-node with nodemon for hot reload
- **Database:** Local MongoDB and Redis instances

### Production Build
- **Frontend:** Optimized React build with code splitting
- **Backend:** Compiled TypeScript to JavaScript
- **Containerization:** Docker containers for each service
- **Orchestration:** Docker Compose for local, Kubernetes for production

## Testing Structure

### Frontend Tests
- **Unit tests:** Component testing with Jest and React Testing Library
- **Integration tests:** API integration testing
- **E2E tests:** End-to-end user flow testing

### Backend Tests
- **Unit tests:** Service and utility function tests
- **Integration tests:** API endpoint testing
- **Database tests:** Model and query testing

This structure provides a scalable foundation for the AI Travel Agent application, ensuring clear separation of concerns, maintainable code organization, and efficient development workflows.# AI Travel Agent - Project Structure

## Root Directory Structure

```
ai-travel-agent/
├── frontend/                     # React.js frontend application
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── common/          # Generic components
│   │   │   ├── forms/           # Form components
│   │   │   ├── ui/              # UI elements (buttons, inputs, etc.)
│   │   │   └── layout/          # Layout components
│   │   ├── pages/               # Page components
│   │   │   ├── auth/           # Authentication pages
│   │   │   ├── booking/        # Booking-related pages
│   │   │   ├── dashboard/      # User dashboard
│   │   │   └── travel/         # Travel-specific pages
│   │   ├── services/            # API services and HTTP clients
│   │   ├── hooks/               # Custom React hooks
│   │   ├── store/               # Redux store configuration
│   │   │   ├── slices/         # Redux slices
│   │   │   └── middleware/     # Custom middleware
│   │   ├── utils/               # Utility functions
│   │   ├── constants/           # Application constants
│   │   ├── types/               # TypeScript type definitions
│   │   ├── assets/              # Static assets
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── styles/
│   │   ├── App.tsx              # Main App component
│   │   ├── index.tsx            # Entry point
│   │   └── index.css            # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── .env
├── backend/                      # Node.js backend application
│   ├── src/
│   │   ├── controllers/         # Request controllers
│   │   │   ├── auth.controller.ts
│   │   │   ├── booking.controller.ts
│   │   │   ├── flight.controller.ts
│   │   │   ├── hotel.controller.ts
│   │   │   ├── cab.controller.ts
│   │   │   └── ai.controller.ts
│   │   ├── models/              # Database models
│   │   │   ├── User.model.ts
│   │   │   ├── Booking.model.ts
│   │   │   ├── Flight.model.ts
│   │   │   ├── Hotel.model.ts
│   │   │   └── Conversation.model.ts
│   │   ├── routes/              # API route definitions
│   │   │   ├── auth.routes.ts
│   │   │   ├── booking.routes.ts
│   │   │   ├── travel.routes.ts
│   │   │   └── ai.routes.ts
│   │   ├── middleware/          # Express middleware
│   │   │   ├── auth.middleware.ts
│   │   │   ├── validation.middleware.ts
│   │   │   ├── error.middleware.ts
│   │   │   └── rate-limit.middleware.ts
│   │   ├── services/            # Business logic services
│   │   │   ├── auth.service.ts
│   │   │   ├── flight.service.ts
│   │   │   ├── hotel.service.ts
│   │   │   ├── cab.service.ts
│   │   │   ├── payment.service.ts
│   │   │   └── gemini.service.ts
│   │   ├── utils/               # Utility functions
│   │   │   ├── database.ts
│   │   │   ├── logger.ts
│   │   │   ├── email.ts
│   │   │   └── validation.ts
│   │   ├── config/              # Configuration files
│   │   │   ├── database.config.ts
│   │   │   ├── redis.config.ts
│   │   │   └── app.config.ts
│   │   ├── types/               # TypeScript interfaces
│   │   │   ├── auth.types.ts
│   │   │   ├── booking.types.ts
│   │   │   └── api.types.ts
│   │   ├── app.ts               # Express app configuration
│   │   └── server.ts            # Server entry point
│   ├── tests/                   # Test files
│   │   ├── unit/
│   │   ├── integration/
│   │   └── helpers/
│   ├── package.json
│   ├── tsconfig.json
│   ├── jest.config.js
│   └── .env
├── shared/                       # Shared types and utilities
│   ├── types/                   # Common TypeScript types
│   └── constants/               # Shared constants
├── docs/                        # Project documentation
│   ├── Implementation.md
│   ├── project_structure.md
│   ├── UI_UX_doc.md
│   ├── Bug_tracking.md
│   └── api/                     # API documentation
├── scripts/                     # Build and deployment scripts
│   ├── build.sh
│   ├── deploy.sh
│   └── setup.sh
├── docker/                      # Docker configuration
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── docker-compose.yml
├── .gitignore
├── README.md
└── package.json                 # Root package.json for workspace
```

## Detailed Structure Explanation

### Frontend Structure (`/frontend`)

#### Components Organization
- **`/components/common`** - Reusable components like Header, Footer, LoadingSpinner
- **`/components/forms`** - Form components for booking, registration, etc.
- **`/components/ui`** - Basic UI elements (Button, Input, Modal, Card)
- **`/components/layout`** - Layout wrappers and navigation components

#### Pages Organization
- **`/pages/auth`** - Login, Register, ForgotPassword pages
- **`/pages/booking`** - Flight, Hotel, Cab booking pages
- **`/pages/dashboard`** - User dashboard, booking history, profile
- **`/pages/travel`** - Travel search, results, details pages

#### Services Layer
- **API clients** for backend communication
- **Third-party integrations** (payment, maps, etc.)
- **Authentication service** for JWT handling

### Backend Structure (`/backend`)

#### Controllers Layer
- Handle HTTP requests and responses
- Input validation and sanitization
- Call appropriate services
- Format API responses

#### Models Layer
- **User.model.ts** - User schema with authentication fields
- **Booking.model.ts** - Unified booking schema for flights, hotels, cabs
- **Flight.model.ts** - Flight-specific data schema
- **Hotel.model.ts** - Hotel information schema
- **Conversation.model.ts** - AI chat history schema

#### Services Layer
- **Business logic implementation**
- **Third-party API integrations**
- **Database operations**
- **AI processing with Gemini**

#### Middleware
- **Authentication** - JWT verification
- **Validation** - Request data validation
- **Error handling** - Centralized error processing
- **Rate limiting** - API usage control

### Configuration Files

#### Frontend Configuration
- **`tailwind.config.js`** - Tailwind CSS customization
- **`tsconfig.json`** - TypeScript compiler options
- **`.env`** - Environment variables (API URLs, keys)

#### Backend Configuration
- **`tsconfig.json`** - TypeScript configuration
- **`jest.config.js`** - Testing framework setup
- **`.env`** - Server configuration and API keys

## File Naming Conventions

### TypeScript Files
- **Components:** PascalCase (e.g., `FlightSearch.tsx`)
- **Services:** camelCase with .service suffix (e.g., `flight.service.ts`)
- **Controllers:** camelCase with .controller suffix (e.g., `booking.controller.ts`)
- **Models:** PascalCase with .model suffix (e.g., `User.model.ts`)
- **Types:** camelCase with .types suffix (e.g., `booking.types.ts`)

### Directory Conventions
- All directories use **kebab-case** or **camelCase**
- Component directories match component names
- Service directories group related functionality

## Module Organization Patterns

### Import Structure
```typescript
// External library imports
import React from 'react';
import { Express } from 'express';

// Internal imports (absolute paths)
import { UserService } from '@/services/user.service';
import { BookingTypes } from '@/types/booking.types';

// Relative imports (for closely related files)
import './Component.styles.css';
```

### Export Patterns
```typescript
// Named exports for utilities and services
export { FlightService } from './flight.service';

// Default exports for components and main modules
export default FlightSearch;
```

## Environment Configuration

### Development Environment
- Frontend runs on `http://localhost:3000`
- Backend API runs on `http://localhost:5000`
- MongoDB on `mongodb://localhost:27017`
- Redis on `redis://localhost:6379`

### Production Environment
- Environment variables for all service URLs
- Secure API key management
- Database connection pooling
- CDN configuration for static assets

## Build and Deployment Structure

### Development Build
- **Frontend:** Create React App development server
- **Backend:** ts-node with nodemon for hot reload
- **Database:** Local MongoDB and Redis instances

### Production Build
- **Frontend:** Optimized React build with code splitting
- **Backend:** Compiled TypeScript to JavaScript
- **Containerization:** Docker containers for each service
- **Orchestration:** Docker Compose for local, Kubernetes for production

## Testing Structure

### Frontend Tests
- **Unit tests:** Component testing with Jest and React Testing Library
- **Integration tests:** API integration testing
- **E2E tests:** End-to-end user flow testing

### Backend Tests
- **Unit tests:** Service and utility function tests
- **Integration tests:** API endpoint testing
- **Database tests:** Model and query testing

This structure provides a scalable foundation for the AI Travel Agent application, ensuring clear separation of concerns, maintainable code organization, and efficient development workflows.