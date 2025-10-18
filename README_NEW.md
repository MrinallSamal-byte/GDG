# 🌐 GDG ITER - Full Stack Web Application

A modern, full-stack web application for Google Developer Group (GDG) ITER with a clear separation between frontend and backend.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## 🎯 Overview

This is a complete web application for GDG ITER featuring:
- **Frontend**: React-based SPA with real-time updates
- **Backend**: Node.js/Express RESTful API with MongoDB
- **Real-time Communication**: Socket.IO for live updates
- **Authentication**: JWT-based auth with admin panel
- **Database**: MongoDB with Mongoose ODM

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     GDG ITER Website                     │
└─────────────────────────────────────────────────────────┘
                           │
         ┌─────────────────┴─────────────────┐
         │                                   │
    ┌────▼────┐                        ┌────▼────┐
    │Frontend │◄──────WebSocket────────│Backend  │
    │(React)  │                        │(Express)│
    └────┬────┘                        └────┬────┘
         │                                   │
         │         HTTP REST API             │
         └───────────────────────────────────┘
                                             │
                                        ┌────▼────┐
                                        │MongoDB  │
                                        │Database │
                                        └─────────┘
```

### Folder Separation

```
root/
├── frontend/          # Client-side React application
│   ├── src/          # React components, hooks, services
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
│
├── backend/          # Server-side Node.js/Express API
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── middleware/   # Express middleware
│   ├── services/     # Business logic
│   └── package.json  # Backend dependencies
│
└── package.json      # Root orchestration scripts
```

## ✨ Features

### Public Features
- 🏠 **Home Page** - Landing page with animations
- 📅 **Events** - Browse past, signature, and workshop events
- 👥 **Team** - Meet the GDG ITER team
- 📊 **Polls** - Interactive community polls
- 📝 **Community Impact** - Showcase community achievements
- 📞 **Contact** - Get in touch with the team

### Admin Features
- 🔐 **Secure Login** - JWT-based authentication
- 📊 **Dashboard** - Analytics and overview
- ✏️ **Event Management** - CRUD operations for events
- 👤 **Team Management** - Manage team members
- 📋 **Poll Management** - Create and manage polls
- 📢 **Notice Management** - Post announcements
- 🔄 **Real-time Updates** - Live sync across all admin tabs

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **React Router** - Client-side routing
- **Socket.IO Client** - Real-time updates
- **Firebase** - Authentication (optional)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Socket.IO** - Real-time communication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
gdg-iter-website/
│
├── frontend/
│   ├── public/
│   │   ├── DesignTeam/
│   │   ├── LeadTeam/
│   │   ├── MediaPic/
│   │   ├── PrTeam/
│   │   └── TechPic/
│   ├── src/
│   │   ├── admin/              # Admin panel components
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminEvents.jsx
│   │   │   └── ...
│   │   ├── assets/             # Images, fonts
│   │   ├── components/         # Reusable components
│   │   │   ├── Navigation.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── PollPopup.jsx
│   │   ├── data/               # Static data
│   │   ├── features/           # Feature modules
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Page components
│   │   ├── routes/             # Routing
│   │   ├── services/           # API services
│   │   ├── App.jsx             # Main component
│   │   └── main.jsx            # Entry point
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── backend/
│   ├── config/                 # Configuration files
│   ├── middleware/             # Express middleware
│   │   └── authMiddleware.js
│   ├── models/                 # MongoDB models
│   │   ├── User.js
│   │   ├── Event.js
│   │   ├── TeamMember.js
│   │   ├── Poll.js
│   │   ├── Notice.js
│   │   └── PlanOfAction.js
│   ├── routes/                 # API routes
│   │   ├── authRoutes.js
│   │   └── adminRoutes.js
│   ├── services/               # Business logic
│   │   └── socketService.js
│   ├── .env.example
│   ├── server.js               # Main server file
│   ├── create-admin.js         # Admin creation script
│   ├── quick-setup.js          # Database setup
│   ├── setup-env.js            # Environment setup
│   ├── package.json
│   └── README.md
│
├── docs/                       # Documentation
├── .gitignore
├── package.json                # Root orchestration
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MrinallSamal-byte/GDG.git
   cd GDGWEB-master
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```
   
   Or manually:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Set up environment variables**

   **Backend** (`backend/.env`):
   ```bash
   cd backend
   npm run setup
   # Then edit .env with your MongoDB URI
   ```
   
   **Frontend** (`frontend/.env`):
   ```bash
   cd frontend
   cp .env.example .env
   # Edit .env with your Firebase config (if using)
   ```

4. **Configure MongoDB**
   
   Edit `backend/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/gdg-iter
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gdg-iter
   ```

5. **Initialize database with sample data**
   ```bash
   npm run quick-setup
   ```
   
   This creates:
   - Admin user (email: admin@gdg.com, password: admin123)
   - Sample events, team members, polls, etc.

### Running the Application

#### Development Mode (Both servers)
```bash
npm run dev
```

This runs:
- Frontend at `http://localhost:5173`
- Backend at `http://localhost:5000`

#### Run Separately

**Frontend only:**
```bash
npm run dev:frontend
```

**Backend only:**
```bash
npm run dev:backend
```

### Access the Application

- **Website**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin/login
  - Email: `admin@gdg.com`
  - Password: `admin123`
- **Backend API**: http://localhost:5000/api
- **API Health**: http://localhost:5000/api/health

## 💻 Development

### Frontend Development

```bash
cd frontend
npm run dev        # Start dev server
npm run build      # Build for production
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

### Backend Development

```bash
cd backend
npm run dev        # Start dev server (watch mode)
npm start          # Start production server
npm run create-admin  # Create new admin user
```

### Code Structure

#### Frontend
- Use functional components with hooks
- Keep components small and focused
- Use custom hooks for shared logic
- Follow React best practices

#### Backend
- RESTful API design
- Modular route handlers
- Mongoose models for MongoDB
- JWT for authentication
- Socket.IO for real-time features

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | User login |
| POST | `/auth/logout` | User logout |
| GET | `/auth/me` | Get current user |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/events` | Get all events |
| POST | `/admin/events` | Create event |
| PUT | `/admin/events/:id` | Update event |
| DELETE | `/admin/events/:id` | Delete event |

Similar endpoints exist for:
- `/admin/team-members`
- `/admin/polls`
- `/admin/notices`
- `/admin/plan-of-action`

### WebSocket Events

**Client → Server:**
- `join` - Join a room
- `update` - Request update

**Server → Client:**
- `event:created` - Event created
- `event:updated` - Event updated
- `event:deleted` - Event deleted
- `poll:updated` - Poll updated
- `notice:created` - Notice created

## 📦 Build & Deployment

### Frontend Build

```bash
cd frontend
npm run build
```

Output: `frontend/dist/`

### Backend Deployment

1. Set environment variables on your hosting platform
2. Install dependencies: `npm install`
3. Start server: `npm start`

### Deployment Platforms

#### Frontend
- **Netlify** (Recommended)
- **Vercel**
- **Firebase Hosting**
- **GitHub Pages**

#### Backend
- **Railway**
- **Render**
- **Heroku**
- **DigitalOcean**
- **AWS EC2**

#### Database
- **MongoDB Atlas** (Recommended for production)
- **Self-hosted MongoDB**

### Environment Variables for Production

**Frontend:**
- `VITE_API_URL` - Backend API URL
- `VITE_SOCKET_URL` - Socket.IO URL
- Firebase config variables

**Backend:**
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT tokens
- `CLIENT_URL` - Frontend URL for CORS
- `NODE_ENV=production`

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

## 📚 Documentation

See the `docs/` folder for additional documentation:
- `FIREBASE_SETUP_INSTRUCTIONS.md`
- `ADMIN_SETUP.md`
- `POLL_MANAGEMENT_GUIDE.md`
- `TESTING_CHECKLIST.md`
- And more...

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Mrinall Samal**

- GitHub: [@MrinallSamal-byte](https://github.com/MrinallSamal-byte)

## 🙏 Acknowledgments

- Google Developer Groups
- ITER, Bhubaneswar
- All contributors and community members

---

**Happy Coding! 🚀**
