# Project Structure & Organization

## Root Level
```
event-based-reward-system/
├── client/                 # React frontend application
├── server/                 # Node.js backend API
├── package.json           # Root package.json with workspace scripts
├── README.md              # Project documentation
└── .gitignore             # Git ignore rules
```

## Frontend Structure (`client/`)
```
client/
├── public/                # Static assets (favicon, manifest, etc.)
├── src/
│   ├── components/        # Reusable React components
│   │   └── ProtectedRoute.js
│   ├── contexts/          # React Context providers
│   │   └── AuthContext.js
│   ├── pages/             # Page-level components
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   ├── OrganizerDashboard.js
│   │   ├── VolunteerDashboard.js
│   │   ├── TaskListPage.js
│   │   ├── WalletPage.js
│   │   └── LeaderboardPage.js
│   ├── config/            # Configuration files
│   │   └── api.js         # Axios configuration
│   ├── App.js             # Main app component with routing
│   ├── App.css            # Global styles
│   └── index.js           # React app entry point
├── package.json           # Frontend dependencies
└── .env                   # Frontend environment variables
```

## Backend Structure (`server/`)
```
server/
├── config/                # Configuration modules
│   └── database.js        # MongoDB connection setup
├── middleware/            # Express middleware
│   ├── auth.js            # JWT authentication middleware
│   └── validation.js      # Request validation middleware
├── models/                # Mongoose schemas
│   ├── User.js            # User model with auth methods
│   ├── Task.js            # Task model
│   └── Transaction.js     # Token transaction model
├── routes/                # API route handlers
│   ├── auth.js            # Authentication routes
│   └── tasks.js           # Task management routes
├── index.js               # Express server entry point
├── package.json           # Backend dependencies
└── .env                   # Backend environment variables
```

## Architectural Patterns

### Frontend Patterns
- **Component-based architecture** with functional components
- **Context API** for global state management (AuthContext)
- **Protected routes** with role-based access control
- **Page-based routing** with React Router
- **Custom hooks** for reusable logic

### Backend Patterns
- **MVC-like structure** (Models, Routes, Middleware)
- **Middleware chain** for authentication, validation, security
- **Schema-based validation** with Mongoose and express-validator
- **Error handling middleware** for centralized error responses
- **Environment-based configuration**

## Naming Conventions
- **Files**: PascalCase for React components, camelCase for utilities
- **Directories**: lowercase with hyphens for multi-word names
- **API Routes**: RESTful naming (`/api/auth`, `/api/tasks`)
- **Database Models**: PascalCase singular nouns (User, Task, Transaction)

## Key Architectural Decisions
- **Monorepo structure** with separate client/server packages
- **JWT-based authentication** with localStorage persistence
- **Role-based access control** (organizer/volunteer)
- **Progressive skill levels** (beginner → intermediate → advanced)
- **Token-based reward system** with MongoDB persistence
- **Future blockchain readiness** with modular architecture