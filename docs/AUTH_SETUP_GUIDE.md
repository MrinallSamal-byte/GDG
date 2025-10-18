# GDG ITER - Authentication Setup Guide

## 📋 Overview

This application now features a complete authentication system with MongoDB backend, JWT-based authentication, and role-based access control.

## 🏗️ Architecture

- **Frontend**: React + Vite + Styled Components
- **Backend**: Node.js + Express + MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt hashing
- **Database**: MongoDB (local or MongoDB Atlas)

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB installed locally OR MongoDB Atlas account
- npm or yarn package manager

### Step 1: Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Step 2: Configure Environment Variables

#### Backend Configuration

1. Copy the example environment file:
```bash
cd server
copy .env.example .env
```

2. Edit `server/.env` and configure:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/gdg-iter

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/gdg-iter?retryWrites=true&w=majority

# JWT Secret (IMPORTANT: Change this!)
# Generate one using: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Client URL
CLIENT_URL=http://localhost:5173
```

#### Frontend Configuration

The frontend is already configured with `.env.local`:
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Set Up MongoDB

#### Option A: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `server/.env`

### Step 4: Create First Admin User

You have two options:

#### Option 1: Using MongoDB Compass or mongo shell

```javascript
db.users.insertOne({
  name: "Admin User",
  email: "admin@gdgiter.com",
  passwordHash: "$2b$10$YourHashedPasswordHere", // You'll need to hash manually
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

#### Option 2: Sign up through the app and manually change role

1. Sign up with your email
2. Use MongoDB Compass or shell to update the role:
```javascript
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

### Step 5: Run the Application

#### Option 1: Run Both Servers Together (Recommended)

```bash
npm run dev:all
```

#### Option 2: Run Separately

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## 📱 Features

### Authentication Pages

1. **Signup Page** (`/signup`)
   - Create new user account
   - Form validation
   - Password strength requirements
   - Auto-redirect based on role

2. **Login Page** (`/login`)
   - Email/password authentication
   - JWT token generation
   - Role-based routing

3. **User Dashboard** (`/dashboard`)
   - Protected route for authenticated users
   - Profile information
   - Quick actions

4. **Admin Panel** (`/admin`)
   - Protected route for admin users only
   - Full CRUD operations for content

### User Roles

- **User**: Regular members with access to dashboard
- **Admin**: Full access to admin panel and content management

## 🔐 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user (protected)

### Request Examples

#### Signup
```json
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

## 🗄️ Database Schema

### Users Collection

```json
{
  "_id": ObjectId("650000000000000000000001"),
  "name": "Mrinall Samal",
  "email": "mrinall@example.com",
  "passwordHash": "$2b$10$abcdefghijklmnopqrstuv...",
  "role": "user",
  "createdAt": ISODate("2025-10-18T15:00:00Z"),
  "updatedAt": ISODate("2025-10-18T15:00:00Z")
}
```

## 🎨 Design

The authentication pages match the GDG ITER brand colors:
- Primary: Indigo (#6366f1, #4f46e5, #4338ca)
- Accent: Yellow (#fbbf24)
- Backgrounds: Gradient purple-blue tones

## 🛡️ Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- HTTP-only cookies for token storage
- Protected routes with middleware
- Role-based access control
- Client-side form validation
- Server-side input validation

## 🔧 Troubleshooting

### MongoDB Connection Error

**Error**: `MongooseError: connect ECONNREFUSED`

**Solution**: 
- Ensure MongoDB is running
- Check your connection string in `.env`
- For Atlas: Check IP whitelist and credentials

### CORS Error

**Error**: `Access to fetch has been blocked by CORS policy`

**Solution**:
- Verify `CLIENT_URL` in `server/.env` matches your frontend URL
- Ensure credentials are enabled in CORS config

### JWT Token Issues

**Error**: `Not authorized, token failed`

**Solution**:
- Check if `JWT_SECRET` is set in `server/.env`
- Clear browser localStorage and cookies
- Try logging in again

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

## 📝 Development Notes

### Frontend Auth Service

Located at `src/services/authService.js`:
- Handles all API calls
- Manages JWT tokens in localStorage
- Provides authentication status

### Auth Context

Located at `src/admin/AuthContext.jsx`:
- Global authentication state
- Login/logout functions
- Current user data

### Protected Routes

Using `ProtectedRoute` component:
- Checks authentication status
- Redirects unauthenticated users to login
- Supports role-based restrictions

## 🚢 Production Deployment

### Backend

1. Set environment variables:
   - `NODE_ENV=production`
   - Update `MONGODB_URI` to production database
   - Generate secure `JWT_SECRET`
   - Set correct `CLIENT_URL`

2. Deploy to:
   - Heroku
   - Railway
   - Render
   - AWS/Azure/GCP

### Frontend

1. Update `.env.production`:
   ```env
   VITE_API_URL=https://your-backend-url.com/api
   ```

2. Build and deploy:
   ```bash
   npm run build
   ```

3. Deploy to:
   - Netlify
   - Vercel
   - GitHub Pages

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [React Router](https://reactrouter.com/)

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section
2. Review server logs
3. Check browser console for errors
4. Contact the development team

## 📄 License

This project is part of GDG ITER.

---

**Happy Coding! 🚀**
