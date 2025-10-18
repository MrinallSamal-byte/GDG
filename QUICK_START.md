# 🚀 Quick Start Guide - Refactored Structure

## 📁 New Folder Structure

```
GDGWEB-master/
│
├── 📂 frontend/              ← All client-side code
│   ├── src/                  ← React components, hooks, pages
│   ├── public/               ← Static assets (images, etc.)
│   ├── index.html            ← HTML template
│   ├── package.json          ← Frontend dependencies
│   ├── vite.config.js        ← Vite configuration
│   └── .env                  ← Frontend environment variables
│
├── 📂 backend/               ← All server-side code
│   ├── models/               ← MongoDB models
│   ├── routes/               ← API endpoints
│   ├── services/             ← Business logic (Socket.IO, etc.)
│   ├── middleware/           ← Express middleware (auth, etc.)
│   ├── server.js             ← Main server file
│   ├── package.json          ← Backend dependencies
│   └── .env                  ← Backend environment variables
│
└── package.json              ← Root scripts to run both

```

## ⚡ Quick Commands

### 🎬 First Time Setup

```powershell
# 1. Install all dependencies (frontend + backend)
npm run install:all

# 2. Setup backend environment
cd backend
npm run setup
# Edit backend/.env with your MongoDB URI

# 3. Setup frontend environment
cd ../frontend
cp .env.example .env
# Edit frontend/.env with your config

# 4. Initialize database with sample data
cd ..
npm run quick-setup
```

### 🏃 Running the Application

```powershell
# Run both frontend and backend together (RECOMMENDED)
npm run dev

# Or run separately:
npm run dev:frontend    # Frontend only (port 5173)
npm run dev:backend     # Backend only (port 5000)
```

### 🌐 Access URLs

- **Website:** http://localhost:5173
- **Admin Panel:** http://localhost:5173/admin/login
- **Backend API:** http://localhost:5000/api
- **API Health Check:** http://localhost:5000/api/health

### 🔐 Default Admin Credentials

```
Email: admin@gdg.com
Password: admin123
```

## 📝 Common Tasks

### Create a New Admin User

```powershell
npm run create-admin
```

### Build Frontend for Production

```powershell
cd frontend
npm run build
# Output: frontend/dist/
```

### Start Backend in Production Mode

```powershell
cd backend
npm start
```

### Run Linter

```powershell
npm run lint
```

## 🔧 Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/gdg-iter
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_PROJECT_ID=your_project_id
# ... other Firebase config
```

## 🛠️ Development Workflow

### Frontend Development

```powershell
cd frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Development

```powershell
cd backend
npm run dev          # Start with auto-reload
npm start            # Production mode
npm run create-admin # Create admin user
npm run quick-setup  # Setup with sample data
```

## 📦 Project Organization

### Frontend Structure

```
frontend/src/
├── admin/           # Admin panel components
├── components/      # Reusable UI components
├── pages/           # Page components
├── hooks/           # Custom React hooks
├── services/        # API service functions
├── data/            # Static data
├── assets/          # Images, fonts
├── App.jsx          # Main app component
└── main.jsx         # Entry point
```

### Backend Structure

```
backend/
├── models/          # Mongoose schemas
│   ├── User.js
│   ├── Event.js
│   ├── TeamMember.js
│   └── Poll.js
├── routes/          # Express routes
│   ├── authRoutes.js
│   └── adminRoutes.js
├── services/        # Business logic
│   └── socketService.js
├── middleware/      # Custom middleware
│   └── authMiddleware.js
└── server.js        # App initialization
```

## 🔌 API Integration

### Frontend → Backend Communication

```javascript
// In frontend code
const API_URL = import.meta.env.VITE_API_URL;

// Example: Fetch events
const response = await fetch(`${API_URL}/admin/events`);
const events = await response.json();
```

### Socket.IO Real-time Updates

```javascript
// In frontend code
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL);

socket.on('event:created', (newEvent) => {
  // Handle new event
});
```

## 🐛 Troubleshooting

### Frontend can't connect to backend

1. Check backend is running: http://localhost:5000/api/health
2. Verify `VITE_API_URL` in `frontend/.env`
3. Check CORS settings in `backend/server.js`

### Database connection errors

1. Ensure MongoDB is running
2. Check `MONGODB_URI` in `backend/.env`
3. For MongoDB Atlas, check network access settings

### Port already in use

```powershell
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Module not found errors

```powershell
# Reinstall dependencies
cd frontend
Remove-Item -Recurse -Force node_modules
npm install

cd ../backend
Remove-Item -Recurse -Force node_modules
npm install
```

## 📚 Additional Resources

- `README_NEW.md` - Comprehensive documentation
- `MIGRATION_GUIDE.md` - Migration from old structure
- `frontend/README.md` - Frontend-specific docs
- `backend/README.md` - Backend-specific docs
- `docs/` - Additional documentation

## 🎯 Key Differences from Old Structure

| Aspect | Old | New |
|--------|-----|-----|
| Frontend code | `src/` | `frontend/src/` |
| Backend code | `server/` | `backend/` |
| Static assets | `public/` | `frontend/public/` |
| HTML file | `index.html` | `frontend/index.html` |
| Frontend deps | Root `package.json` | `frontend/package.json` |
| Backend deps | `server/package.json` | `backend/package.json` |
| Run command | `npm run dev:all` | `npm run dev` |

## ✨ Benefits

✅ **Clear separation** between frontend and backend
✅ **Independent deployment** - Deploy to different platforms
✅ **Better organization** - Easy to find files
✅ **Team collaboration** - Frontend/backend teams work independently
✅ **Scalability** - Can scale each part separately
✅ **Modern structure** - Follows industry best practices

## 📞 Need Help?

- Check error logs in terminal
- Review documentation in `docs/` folder
- Check browser console for frontend errors
- Use MongoDB Compass to inspect database
- Review Socket.IO connection in Network tab

---

**Happy Coding! 🚀**
