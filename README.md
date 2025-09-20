# Event-Based Volunteer Reward System

A comprehensive web application that gamifies volunteer work through a token-based reward mechanism. Built with React.js frontend and Node.js backend, with future Solidity smart contract integration on Polygon network.

## Features

- **Role-Based Authentication**: Separate interfaces for organizers and volunteers
- **Task Management**: Create, assign, and verify volunteer tasks
- **Progression System**: Level-based difficulty unlocking (Beginner → Intermediate → Advanced)
- **Token Rewards**: Earn tokens for completed tasks (Easy: 10, Intermediate: 25, Difficult: 50)
- **Gamification**: Leaderboards, progress tracking, and achievement badges
- **Blockchain Ready**: Prepared for future Polygon/Solidity integration

## Tech Stack

### Frontend
- React.js 18+ with functional components and hooks
- React Router for client-side routing
- React Hook Form for form management
- Axios for HTTP requests
- Context API for state management

### Backend
- Node.js with Express.js framework
- MongoDB with Mongoose ODM
- JWT authentication
- bcrypt for password hashing
- Rate limiting and security middleware

### Future Integration
- Solidity smart contracts
- Polygon blockchain network
- MetaMask wallet integration

## Project Structure

```
event-based-reward-system/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   └── config/         # Configuration files
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/             # Database and app config
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── package.json
└── package.json           # Root package.json
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd event-based-reward-system
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   Backend (.env in server directory):
   ```bash
   cp server/.env.example server/.env
   # Edit server/.env with your configuration
   ```
   
   Frontend (.env in client directory):
   ```bash
   cp client/.env.example client/.env
   # Edit client/.env with your configuration
   ```

4. **Start MongoDB**
   - Local: Start your MongoDB service
   - Atlas: Ensure your connection string is in server/.env

5. **Run the application**
   ```bash
   # Development mode (runs both frontend and backend)
   npm run dev
   
   # Or run separately:
   npm run server:dev  # Backend only
   npm run client:dev  # Frontend only
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Tasks (Coming Soon)
- `GET /api/tasks` - Get filtered tasks
- `POST /api/tasks` - Create task (organizer only)
- `PUT /api/tasks/:id/assign` - Assign task to volunteer
- `PUT /api/tasks/:id/complete` - Mark task complete
- `PUT /api/tasks/:id/verify` - Verify task completion

### Users (Coming Soon)
- `GET /api/users/dashboard` - User dashboard data
- `GET /api/users/wallet` - Token wallet information
- `GET /api/users/leaderboard` - Leaderboard data

## Development Roadmap

### Phase 1: Core System (Current)
- [x] Project structure and authentication
- [ ] Database models and schemas
- [ ] Task management system
- [ ] User progression and levels
- [ ] Token wallet system

### Phase 2: Advanced Features
- [ ] Real-time updates
- [ ] Comprehensive testing
- [ ] Performance optimization
- [ ] Enhanced UI/UX

### Phase 3: Blockchain Integration
- [ ] Solidity smart contracts
- [ ] Polygon network integration
- [ ] MetaMask wallet connection
- [ ] Token migration to blockchain

## User Roles

### Volunteer
- Browse and complete tasks based on skill level
- Earn tokens for verified task completion
- Track progress and level advancement
- View leaderboard and compete with others

### Organizer
- Create and manage volunteer tasks
- Verify completed tasks
- Monitor volunteer engagement
- Access analytics and reporting

## Level Progression System

- **Beginner**: Can complete easy tasks (10 tokens each)
- **Intermediate**: Unlocked after 5 easy tasks (25 tokens each)
- **Advanced**: Unlocked after 10 total tasks (50 tokens each)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

```bash
# Run all tests
npm test

# Run backend tests only
cd server && npm test

# Run frontend tests only
cd client && npm test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@rewardsystem.com or create an issue in the repository.