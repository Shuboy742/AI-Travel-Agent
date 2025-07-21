---
alwaysApply: true
---

# AI Travel Agent Development Workflow - Cursor Rules

## Primary Directive
You are an AI-focused development agent implementing an intelligent travel booking platform. Follow established AI architecture documentation and maintain consistency across all AI services and conversational interfaces.

## Core AI Development Workflow

### Before Starting Any AI Task
- Consult `/Docs/Implementation.md` for current AI development stage and available tasks
- Check `/Docs/AI_Architecture.md` for AI system design and integration patterns
- Verify AI model dependencies and API rate limits
- Review AI safety and ethical guidelines before implementation

### AI Task Execution Protocol

#### 1. AI Task Assessment
- Read AI subtask from `/Docs/Implementation.md`
- Assess AI complexity and requirements:
  - **Simple AI Task:** Basic API integration, simple NLP processing
  - **Complex AI Task:** Advanced ML models, conversational chains, vector operations
  - **Critical AI Task:** Real-time inference, production ML pipelines

#### 2. AI Complexity Evaluation
For Complex AI Tasks, create detailed implementation checklist:
- [ ] AI model selection and configuration
- [ ] Data preprocessing and feature engineering
- [ ] Model training or API integration setup
- [ ] Inference optimization and caching
- [ ] AI safety and content filtering
- [ ] Performance monitoring and logging
- [ ] Error handling and fallback mechanisms

#### 3. AI Documentation Research
- Check `/Docs/Implementation.md` for AI-specific documentation links
- Consult `/Docs/AI_Architecture.md` for system integration patterns
- Review `/Docs/Model_Documentation.md` for model-specific requirements
- Research latest AI best practices and safety guidelines

#### 4. AI Service Integration
- Follow established AI service patterns in `/Docs/AI_Architecture.md`
- Ensure proper async processing for expensive AI operations
- Implement proper error handling for AI API failures
- Add comprehensive logging for AI operations and responses
- Follow AI rate limiting and cost optimization practices

#### 5. Conversational Interface Implementation
- Consult `/Docs/UI_UX_doc.md` for AI interaction design patterns
- Implement real-time conversation handling (WebSocket/SSE)
- Follow conversational flow design and context management
- Ensure responsive design for AI chat interfaces
- Implement progressive enhancement for AI features

#### 6. Travel API Integration with AI Enhancement
- Check `/Docs/project_structure.md` for API integration patterns
- Implement AI-powered search optimization and filtering
- Add ML-based recommendation engines for travel options
- Include AI-driven price prediction and monitoring
- Ensure proper caching for AI-enhanced travel data

#### 7. AI Error Handling and Monitoring
- Check `/Docs/Bug_tracking.md` for similar AI-related issues
- Document all AI errors, model failures, and performance issues
- Include detailed logging for AI model responses and latency
- Implement fallback mechanisms for AI service unavailability
- Monitor AI response quality and user satisfaction metrics

#### 8. AI Task Completion Validation
Mark AI tasks complete only when:
- AI model integration tested with various input scenarios
- Conversational flows tested for context management
- AI responses meet quality and safety standards
- Performance benchmarks satisfied (response time, accuracy)
- Proper error handling and fallbacks implemented
- All AI monitoring and logging in place
- Model documentation updated with performance metrics

### AI File Reference Priority
1. `/Docs/Bug_tracking.md` - Check for known AI/ML issues first
2. `/Docs/AI_Architecture.md` - AI system design and integration patterns
3. `/Docs/Implementation.md` - Main AI task reference and documentation links
4. `/Docs/Model_Documentation.md` - AI model specifications and performance
5. `/Docs/project_structure.md` - AI service organization and structure
6. `/Docs/UI_UX_doc.md` - AI interface design and user experience

## AI-Specific Implementation Guidelines

### Python/FastAPI Backend Development
- Follow async/await patterns for all AI operations
- Use proper dependency injection for AI services
- Implement type hints for all AI functions and classes
- Use Pydantic models for AI request/response validation
- Follow FastAPI best practices for AI endpoint design
- Implement proper exception handling for AI operations

### AI Model Integration Standards
- Always implement timeout and retry mechanisms for AI API calls
- Use connection pooling for database operations with AI data
- Implement proper authentication and API key management
- Add comprehensive logging for all AI interactions
- Follow rate limiting best practices for AI services
- Cache AI responses where appropriate to reduce costs

### Conversational AI Development
- Implement conversation context management with proper memory
- Use LangChain chains for complex conversational flows
- Implement intent recognition and entity extraction
- Add conversation history tracking and analytics
- Ensure proper handling of multi-turn conversations
- Implement conversation reset and context clearing

### Vector Database and Embeddings
- Follow proper embedding generation and storage patterns
- Implement efficient similarity search algorithms
- Use appropriate chunking strategies for large documents
- Implement proper indexing for fast vector retrieval
- Add embedding version management and migration
- Monitor vector database performance and scaling

### Machine Learning Pipeline Development
- Implement proper data preprocessing and feature engineering
- Follow MLOps best practices for model deployment
- Add model versioning and A/B testing capabilities
- Implement proper model monitoring and drift detection
- Use appropriate batch processing for large datasets
- Add model performance tracking and alerting

### Frontend AI Integration (Vanilla JS)
- Implement proper WebSocket handling for real-time AI chat
- Use fetch API with proper error handling for AI endpoints
- Add loading states and progress indicators for AI operations
- Implement proper UI updates for streaming AI responses
- Add offline support and graceful degradation
- Follow accessibility guidelines for AI interfaces

## Travel Industry Specific Guidelines

### Flight Booking AI Enhancement
- Implement AI-powered flight search optimization
- Add ML-based price prediction and trend analysis
- Create intelligent flight recommendation algorithms
- Implement natural language flight query processing
- Add AI-driven booking flow optimization
- Monitor flight booking success rates and AI contribution

### Hotel Booking AI Features
- Implement AI-powered hotel matching and recommendations
- Add natural language hotel search and filtering
- Create personalized hotel suggestion algorithms
- Implement AI-driven amenity and location scoring
- Add sentiment analysis for hotel reviews
- Monitor hotel booking conversion and AI effectiveness

### Transportation AI Services
- Implement AI-powered route optimization for cabs
- Add intelligent transportation mode recommendations
- Create predictive arrival time algorithms
- Implement natural language transportation queries
- Add AI-driven cost optimization for transportation
- Monitor transportation booking success and user satisfaction

### Travel Planning AI Assistance
- Implement AI-powered itinerary generation and optimization
- Add intelligent travel timing and season recommendations
- Create personalized travel suggestion engines
- Implement natural language trip planning assistance
- Add AI-driven budget optimization for travel plans
- Monitor trip planning success and user engagement

## AI Quality Assurance and Testing

### AI Model Testing
- Implement comprehensive test cases for AI model responses
- Add performance benchmarks for AI inference speed
- Create test datasets for various travel scenarios
- Implement A/B testing for AI model variations
- Add bias detection and fairness testing
- Monitor AI response quality and user feedback

### Conversational AI Testing
- Test multi-turn conversation flows and context management
- Validate intent recognition accuracy across scenarios
- Test conversation memory and persistence
- Implement stress testing for concurrent conversations
- Add conversation quality metrics and monitoring
- Test fallback mechanisms for AI failures

### AI Safety and Ethics Testing
- Implement content filtering and safety measures
- Test for potential AI bias in travel recommendations
- Validate AI responses for accuracy and appropriateness
- Implement user privacy protection in AI interactions
- Add audit trails for AI decision-making processes
- Monitor for potential misuse or abuse of AI features

## Production AI Deployment Standards

### AI Performance Optimization
- Implement model inference caching and optimization
- Use appropriate hardware acceleration (GPU) where needed
- Optimize database queries for AI data operations
- Implement proper load balancing for AI services
- Add performance monitoring and alerting for AI operations
- Scale AI services based on usage patterns and demand

### AI Monitoring and Observability
- Implement comprehensive AI metrics and logging
- Add real-time monitoring for AI service health
- Create dashboards for AI performance and usage
- Implement alerting for AI service failures or degradation
- Add cost monitoring for AI API usage and optimization
- Track user satisfaction with AI features and responses

### AI Security and Compliance
- Implement proper authentication for AI service access
- Add input validation and sanitization for AI endpoints
- Ensure compliance with data privacy regulations
- Implement proper audit logging for AI operations
- Add rate limiting and abuse prevention for AI services
- Follow AI ethics guidelines and responsible AI practices

## Critical AI Development Rules
- **NEVER** skip AI model testing and validation
- **NEVER** deploy AI features without proper error handling
- **NEVER** ignore AI safety and content filtering requirements
- **NEVER** implement AI features without proper monitoring
- **NEVER** skip documentation for AI model integration
- **ALWAYS** implement fallback mechanisms for AI failures
- **ALWAYS** follow established AI architecture patterns
- **ALWAYS** test AI features across various scenarios and edge cases
- **ALWAYS** monitor AI performance, costs, and user satisfaction
- **ALWAYS** document AI decision-making processes and model behavior

## AI Development Workflow Summary

### For Simple AI Tasks:
1. Consult AI documentation and architecture
2. Implement following established patterns
3. Add proper error handling and logging
4. Test with various scenarios
5. Update documentation and mark complete

### For Complex AI Tasks:
1. Create detailed implementation checklist
2. Research AI best practices and documentation
3. Implement AI models/services following architecture
4. Add comprehensive testing and monitoring
5. Validate performance and safety requirements
6. Update all relevant documentation
7. Mark complete after thorough validation

### For Critical AI Tasks:
1. Follow complex task workflow with additional steps:
2. Implement A/B testing and gradual rollout
3. Add comprehensive monitoring and alerting
4. Create detailed performance benchmarks
5. Implement rollback mechanisms
6. Add extensive documentation and runbooks
7. Conduct thorough security and safety review

Remember: Build an intelligent, AI-powered travel platform that provides exceptional conversational experience while maintaining high performance, safety, and reliability standards. Every AI implementation should enhance user experience while following responsible AI practices and industry best practices.