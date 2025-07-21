# AI Travel Agent Platform

> An intelligent, conversational AI-powered travel assistant that books flights, hotels, transportation, and answers all your travel questions using Google's Gemini AI.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-%3E%3D18.0.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%3E%3D5.0.0-blue.svg)](https://www.typescriptlang.org/)

## 🌟 Features

### 🤖 AI-Powered Conversation
- **Natural Language Processing** with Google Gemini AI
- **Context-Aware Conversations** that remember your preferences
- **Multi-Turn Dialogues** for complex travel planning
- **Intent Recognition** for accurate request understanding

### ✈️ Complete Travel Booking
- **Flight Booking** with real-time search and fare comparison
- **Hotel Reservations** with location-based search and reviews
- **Transportation Booking** including cabs, rideshare, and car rentals
- **Multi-City Itineraries** and complex trip planning

### 🎯 Intelligent Features
- **Personalized Recommendations** based on your travel history
- **Price Prediction** and optimal booking timing
- **Weather Integration** and travel advisories
- **24/7 Travel Assistance** with proactive updates

### 💼 Business Travel Support
- **Corporate Policy Compliance** and approval workflows
- **Expense Management** integration
- **Group Booking** coordination
- **Travel Analytics** and reporting

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v14 or higher)
- **Redis** (v6 or higher)

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-travel-agent.git
   cd ai-travel-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Configure your `.env` file with the required API keys:
   ```env
   # AI Configuration
   GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_MODEL=gemini-1.5-pro

   # Database Configuration
   DATABASE_URL=postgresql://username:password@localhost:5432/travel_agent_db
   REDIS_URL=redis://localhost:6379

   # Travel APIs
   AMADEUS_API_KEY=your_amadeus_api_key
   AMADEUS_API_SECRET=your_amadeus_api_secret
   BOOKING_COM_API_KEY=your_booking_com_api_key
   UBER_CLIENT_ID=your_uber_client_id
   UBER_CLIENT_SECRET=your_uber_client_secret

   # Payment Processing
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

   # Application Settings
   JWT_SECRET=your_jwt_secret_key
   APP_URL=http://localhost:3000
   API_URL=http://localhost:8000
   ```

4. **Set up the database**
   ```bash
   npm run db:setup
   npm run db:migrate
   npm run db:seed
   ```

5. **Start the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev

   # Or start them separately
   npm run dev:client    # Frontend (port 3000)
   npm run dev:server    # Backend (port 8000)
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ai-travel-agent/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service functions
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Static assets
├── server/                # Node.js backend application
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── services/      # Business logic services
│   │   ├── models/        # Database models
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # API routes
│   │   └── utils/         # Server utilities
├── docs/                  # Project documentation
│   ├── Implementation.md  # Implementation plan
│   ├── project_structure.md # Detailed structure guide
│   ├── UI_UX_doc.md      # UI/UX specifications
│   └── Bug_tracking.md   # Bug tracking log
├── shared/               # Shared types and utilities
├── tests/               # Test files
├── docker/              # Docker configuration
└── deployment/          # Deployment scripts
```

## 🛠️ Available Scripts

### Development
```bash
npm run dev          # Start both client and server
npm run dev:client   # Start frontend only
npm run dev:server   # Start backend only
npm run dev:db       # Start database services
```

### Building
```bash
npm run build        # Build production version
npm run build:client # Build frontend only
npm run build:server # Build backend only
```

### Testing
```bash
npm test            # Run all tests
npm run test:client # Run frontend tests
npm run test:server # Run backend tests
npm run test:e2e    # Run end-to-end tests
```

### Database
```bash
npm run db:setup    # Initial database setup
npm run db:migrate  # Run database migrations
npm run db:seed     # Seed database with sample data
npm run db:reset    # Reset database (development only)
```

### Linting & Formatting
```bash
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint issues
npm run format      # Format code with Prettier
```

## 🔧 API Keys Setup

### Required API Keys

1. **Google Gemini AI**
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Add to `.env` as `GEMINI_API_KEY`

2. **Flight Booking (Amadeus)**
   - Register at [Amadeus for Developers](https://developers.amadeus.com/)
   - Get API key and secret
   - Add as `AMADEUS_API_KEY` and `AMADEUS_API_SECRET`

3. **Hotel Booking (Booking.com)**
   - Apply for [Booking.com Partner API](https://developers.booking.com/)
   - Add as `BOOKING_COM_API_KEY`

4. **Transportation (Uber)**
   - Register at [Uber Developer Portal](https://developer.uber.com/)
   - Create an app and get client credentials
   - Add as `UBER_CLIENT_ID` and `UBER_CLIENT_SECRET`

5. **Payment Processing (Stripe)**
   - Sign up at [Stripe](https://stripe.com/)
   - Get publishable and secret keys
   - Add as `STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY`

## 🐳 Docker Support

### Using Docker Compose (Recommended)

1. **Start all services**
   ```bash
   docker-compose up -d
   ```

2. **View logs**
   ```bash
   docker-compose logs -f
   ```

3. **Stop services**
   ```bash
   docker-compose down
   ```

### Individual Docker Commands

```bash
# Build images
docker build -t ai-travel-agent:client ./client
docker build -t ai-travel-agent:server ./server

# Run containers
docker run -p 3000:3000 ai-travel-agent:client
docker run -p 8000:8000 ai-travel-agent:server
```

## 📱 Mobile App

### React Native Setup (Optional)

If you want to build the mobile app:

1. **Install React Native CLI**
   ```bash
   npm install -g @react-native-community/cli
   ```

2. **Navigate to mobile directory**
   ```bash
   cd mobile
   npm install
   ```

3. **Start Metro bundler**
   ```bash
   npm start
   ```

4. **Run on device**
   ```bash
   npm run android  # For Android
   npm run ios      # For iOS
   ```

## 🧪 Testing

### Running Tests

```bash
# Unit tests
npm run test:unit

# Integration tests  
npm run test:integration

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

### Test Structure

```
tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
├── e2e/           # End-to-end tests
├── fixtures/      # Test data
└── helpers/       # Test utilities
```

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start:prod
```

### Environment-Specific Deployments

```bash
# Staging
npm run deploy:staging

# Production
npm run deploy:production
```

### Supported Platforms

- **AWS** (Recommended)
- **Google Cloud Platform**
- **Microsoft Azure**
- **Heroku**
- **Vercel** (Frontend only)

## 📊 Monitoring & Analytics

### Health Checks

- **Application Health**: `GET /api/health`
- **Database Health**: `GET /api/health/database`
- **External APIs**: `GET /api/health/external`

### Logging

Logs are structured using Winston and can be configured in `server/src/config/logging.js`:

```javascript
// Log levels: error, warn, info, debug
logger.info('User booking completed', { userId, bookingId });
```

### Performance Monitoring

- **Response Times**: Average API response time tracking
- **Error Rates**: Real-time error monitoring
- **User Analytics**: Booking conversion and user behavior
- **AI Performance**: Gemini API response quality metrics

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests for new features**
5. **Run the test suite**
   ```bash
   npm test
   ```
6. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
7. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request**

### Code Style

We use ESLint and Prettier for code formatting:

```bash
npm run lint:fix  # Fix linting issues
npm run format    # Format code
```

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add flight price prediction
fix: resolve booking confirmation email issue
docs: update API documentation
test: add unit tests for hotel search
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powering our conversational interface
- **Amadeus** for flight booking APIs
- **Booking.com** for hotel reservation services
- **Stripe** for secure payment processing
- **Open Source Community** for the amazing tools and libraries

## 📞 Support

### Getting Help

- **📖 Documentation**: Check the `/docs` folder for detailed guides
- **🐛 Bug Reports**: [Create an issue](https://github.com/yourusername/ai-travel-agent/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/yourusername/ai-travel-agent/discussions)
- **📧 Email**: support@aitravelagent.com

### Troubleshooting

#### Common Issues

1. **API Keys Not Working**
   ```bash
   # Verify your .env file
   npm run verify:env
   ```

2. **Database Connection Issues**
   ```bash
   # Check database status
   npm run db:status
   
   # Reset database
   npm run db:reset
   ```

3. **Build Failures**
   ```bash
   # Clear cache and rebuild
   npm run clean
   npm install
   npm run build
   ```

4. **Port Already in Use**
   ```bash
   # Kill processes on ports 3000 and 8000
   npm run kill:ports
   ```

### Performance Tips

- **Development**: Use `npm run dev:fast` for faster development builds
- **Production**: Enable gzip compression and caching
- **Database**: Use connection pooling for better performance
- **AI Requests**: Implement request caching to reduce Gemini API calls

---

## 🗺️ Roadmap

### Phase 1 (Current) - Core Features ✅
- [x] Basic conversational AI interface
- [x] Flight booking system
- [x] Hotel booking system
- [x] Transportation booking
- [x] User authentication

### Phase 2 - Intelligence & Mobile 🚧
- [ ] Advanced AI personalization
- [ ] Mobile app development
- [ ] Price prediction algorithms
- [ ] Travel recommendations

### Phase 3 - Enterprise & Scale 📋
- [ ] Corporate travel features
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Voice assistant integration

### Phase 4 - Innovation 🔮
- [ ] AR/VR integration
- [ ] Blockchain verification
- [ ] IoT connectivity
- [ ] Predictive travel planning

---

**Made with ❤️ by the AI Travel Agent Team**

*Transform your travel experience with the power of AI* 🌍✈️🏨🚗