# Technology Stack & Build System

## Frontend Stack
- **React 19.1.1** with functional components and hooks
- **React Router DOM 7.9.1** for client-side routing
- **React Hook Form 7.63.0** for form management
- **Axios 1.12.2** for HTTP requests
- **Context API** for state management
- **React Scripts 5.0.1** for build tooling

## Backend Stack
- **Node.js** with **Express.js 4.18.2** framework
- **MongoDB** with **Mongoose 8.0.3** ODM
- **JWT 9.0.2** for authentication
- **bcryptjs 2.4.3** for password hashing
- **Security**: Helmet, CORS, express-rate-limit
- **Validation**: express-validator 7.0.1

## Development Tools
- **nodemon** for backend hot reloading
- **concurrently** for running frontend/backend simultaneously
- **Jest** for testing
- **supertest** for API testing

## Common Commands

### Installation
```bash
# Install all dependencies (root, server, client)
npm run install:all

# Individual installations
cd server && npm install
cd client && npm install
```

### Development
```bash
# Run both frontend and backend
npm run dev

# Run individually
npm run server:dev    # Backend only (port 5000)
npm run client:dev    # Frontend only (port 3000)
```

### Production
```bash
# Build frontend for production
npm run client:build

# Start production server
npm run server:start
```

### Testing
```bash
# Run all tests
npm test

# Individual test suites
cd server && npm test
cd client && npm test
```

## Environment Configuration
- Backend: `server/.env` (database, JWT secrets, ports)
- Frontend: `client/.env` (API endpoints, feature flags)
- Use `.env.example` files as templates

## API Architecture
- RESTful API design
- Rate limiting (100 requests per 15 minutes)
- Error handling middleware with standardized responses
- JWT-based authentication with Bearer tokens
- Request validation using express-validator

## Future Tech Integration
- **Solidity** smart contracts
- **Polygon** blockchain network
- **MetaMask** wallet integration