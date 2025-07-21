---
alwaysApply: true
---

# Development Agent Workflow - Cursor Rules for AI Travel Agent

## Primary Directive
You are a development agent implementing an AI Travel Agent project. Follow established documentation and maintain consistency throughout the development process.

## Core Workflow Process

### Before Starting Any Task
- Consult `/Docs/Implementation.md` for current stage and available tasks
- Check task dependencies and prerequisites in the implementation plan
- Verify scope understanding and technical requirements
- Review relevant API documentation links provided in Implementation.md

### Task Execution Protocol

#### 1. Task Assessment
- Read subtask from `/Docs/Implementation.md`
- Assess subtask complexity:
  - **Simple subtask:** Implement directly (e.g., basic component creation)
  - **Complex subtask:** Create a detailed todo list breaking down the task into smaller steps
- Consider integration requirements with Gemini AI, payment systems, and travel APIs

#### 2. Complex Subtask Breakdown
When encountering complex tasks, create a todo list with:
- Specific implementation steps
- File creation requirements
- API integration checkpoints
- Testing verification points
- Documentation update needs

#### 3. Documentation Research
- Check `/Docs/Implementation.md` for relevant documentation links in the subtask
- Read and understand official documentation before implementing
- Reference Gemini API docs, Stripe docs, travel API documentation as needed
- Understand authentication flows and data models

#### 4. UI/UX Implementation
- **MANDATORY:** Consult `/Docs/UI_UX_doc.md` before implementing any UI/UX elements
- Follow design system specifications and color palette
- Implement responsive design requirements for mobile/tablet/desktop
- Ensure accessibility standards (WCAG 2.1 AA) compliance
- Use Tailwind CSS classes according to the design system

#### 5. Project Structure Compliance
- **CRITICAL:** Check `/Docs/project_structure.md` before:
  - Running any commands
  - Creating files or folders
  - Making structural changes to the project
  - Adding new dependencies
  - Modifying build configurations
- Follow TypeScript conventions and file naming patterns
- Respect the separation between frontend and backend concerns

#### 6. Error Handling and Bug Tracking
- Check `/Docs/Bug_tracking.md` for similar issues before fixing any errors
- Document all errors and solutions in Bug_tracking.md with:
  - Error details and stack traces
  - Root cause analysis
  - Step-by-step resolution process
  - Prevention measures for future occurrences
- Include error details specific to travel booking scenarios

#### 7. AI Integration Specifics
When working on Gemini AI integration:
- Follow Google AI SDK documentation patterns
- Implement proper error handling for API calls
- Ensure conversation context is maintained
- Test AI responses for travel-specific scenarios
- Handle rate limiting and API quotas appropriately

#### 8. Travel API Integration Guidelines
For flight, hotel, and cab booking APIs:
- Implement proper authentication mechanisms
- Handle API rate limits and quotas
- Create robust error handling for booking failures
- Implement proper data validation
- Cache appropriate responses for performance

#### 9. Task Completion Verification
Mark tasks complete only when ALL criteria are met:
- All functionality implemented correctly
- Code follows project structure guidelines from project_structure.md
- UI/UX matches specifications from UI_UX_doc.md (if applicable)
- No errors or warnings remain in the console
- All todo list items completed (if applicable)
- Proper TypeScript types are defined
- Tests are written and passing (when applicable)
- Documentation is updated if needed

### File Reference Priority Order
1. `/Docs/Bug_tracking.md` - Check for known issues and solutions first
2. `/Docs/Implementation.md` - Main task reference and documentation links
3. `/Docs/project_structure.md` - File organization and structure guidance
4. `/Docs/UI_UX_doc.md` - Design requirements and component specifications

## Travel Agent Specific Guidelines

### Authentication and Security
- Implement JWT-based authentication following the security patterns
- Secure API keys for Gemini, payment processors, and travel APIs
- Handle user data with appropriate privacy measures
- Implement rate limiting for API endpoints

### Payment Processing
- Follow PCI DSS compliance guidelines
- Implement Stripe integration securely
- Handle payment errors gracefully
- Provide clear transaction confirmations

### Data Management
- Design MongoDB schemas for travel data efficiently
- Implement proper indexing for search performance
- Handle booking state management consistently
- Cache frequently accessed data with Redis

### API Integration Best Practices
- Implement circuit breaker patterns for external API calls
- Handle API versioning and deprecation
- Create abstraction layers for different travel service providers
- Implement proper logging for troubleshooting

## Technology-Specific Rules

### React/TypeScript Frontend
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow React best practices for state management
- Use Redux Toolkit for complex state management

### Node.js/Express Backend
- Follow RESTful API design principles
- Implement proper middleware chain
- Use TypeScript for type safety
- Follow the controller-service-model pattern

### Database Operations
- Use proper MongoDB connection patterns
- Implement data validation at the schema level
- Handle database errors gracefully
- Optimize queries for performance

## Critical Rules - NEVER VIOLATE

- **NEVER** skip documentation consultation before implementation
- **NEVER** mark tasks complete without proper testing and verification
- **NEVER** ignore project structure guidelines from project_structure.md
- **NEVER** implement UI without checking UI_UX_doc.md specifications
- **NEVER** fix errors without checking Bug_tracking.md first
- **NEVER** commit API keys or sensitive data to the repository
- **NEVER** implement booking logic without proper error handling
- **NEVER** bypass authentication for protected routes

## ALWAYS Requirements

- **ALWAYS** document errors and solutions in Bug_tracking.md
- **ALWAYS** follow the established workflow process
- **ALWAYS** consider security implications for travel booking features
- **ALWAYS** test API integrations thoroughly
- **ALWAYS** implement proper loading states for async operations
- **ALWAYS** validate user input for booking forms
- **ALWAYS** provide clear user feedback for booking processes

## Quality Assurance Checklist

Before marking any task complete, verify:
- [ ] Code compiles without errors or warnings
- [ ] TypeScript types are properly defined
- [ ] UI components match design specifications
- [ ] API calls handle errors appropriately
- [ ] User input validation is implemented
- [ ] Loading states are provided for async operations
- [ ] Responsive design works on mobile and desktop
- [ ] Accessibility requirements are met
- [ ] Security best practices are followed
- [ ] Documentation is updated if necessary

## Success Metrics

Track implementation success by:
- Completion rate of implementation plan tasks
- Code quality and adherence to standards
- User experience consistency with design specifications
- API integration reliability and performance
- Security compliance and best practices
- Documentation accuracy and completeness

Remember: Build a cohesive, well-documented, secure, and maintainable AI Travel Agent application. Every decision should support the overall project goals, user experience, and technical excellence while maintaining consistency with established patterns and documentation.