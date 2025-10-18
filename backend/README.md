# GDG ITER - Backend API

Backend server for the GDG ITER website with MongoDB authentication and real-time updates.

## Features

- 🔐 User authentication with JWT
- 👥 Admin panel management
- 📊 Real-time updates with Socket.IO
- 🗄️ MongoDB database integration
- 📝 RESTful API endpoints

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Socket.IO** - Real-time communication
- **bcryptjs** - Password hashing

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
npm run setup
```

This will create a `.env` file. Update it with your MongoDB connection string.

## Configuration

Edit the `.env` file with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gdg-iter
JWT_SECRET=your_secure_jwt_secret
CLIENT_URL=http://localhost:5173
```

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## Database Setup

### Quick Setup (Recommended)
Run the quick setup script to populate the database with sample data:
```bash
npm run quick-setup
```

This creates:
- Admin user (email: admin@gdg.com, password: admin123)
- Sample events
- Sample team members
- Sample polls
- Sample notices

### Create Admin User Only
```bash
npm run create-admin
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Admin Routes
- `GET /api/admin/events` - Get all events
- `POST /api/admin/events` - Create event
- `PUT /api/admin/events/:id` - Update event
- `DELETE /api/admin/events/:id` - Delete event
- Similar endpoints for: team members, polls, notices, plan of action

### Health Check
- `GET /api/health` - Server health status

## Project Structure

```
backend/
├── config/          # Configuration files
├── middleware/      # Express middleware
│   └── authMiddleware.js
├── models/          # MongoDB models
│   ├── User.js
│   ├── Event.js
│   ├── TeamMember.js
│   ├── Poll.js
│   ├── Notice.js
│   └── PlanOfAction.js
├── routes/          # API routes
│   ├── authRoutes.js
│   └── adminRoutes.js
├── services/        # Business logic
│   └── socketService.js
├── .env             # Environment variables
├── .env.example     # Example environment file
├── server.js        # Main server file
├── create-admin.js  # Admin creation script
├── quick-setup.js   # Database setup script
└── package.json     # Dependencies
```

## Socket.IO Events

### Client → Server
- `join` - Join a room
- `update` - Request data update

### Server → Client
- `event:created` - New event created
- `event:updated` - Event updated
- `event:deleted` - Event deleted
- `poll:updated` - Poll updated
- `notice:created` - New notice created

## Development

### Watch Mode
The server runs in watch mode by default with `npm run dev`, which automatically restarts on file changes.

### Testing
```bash
npm test
```

## Deployment

1. Set `NODE_ENV=production` in your environment
2. Update `MONGODB_URI` with production database
3. Update `CLIENT_URL` with production frontend URL
4. Deploy to your preferred platform (Heroku, Railway, Render, etc.)

## Security

- Passwords are hashed with bcryptjs
- JWT tokens for authentication
- CORS enabled for frontend only
- Environment variables for sensitive data

## License

MIT
