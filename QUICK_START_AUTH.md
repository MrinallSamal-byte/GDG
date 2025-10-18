# 🚀 Quick Start - Authentication System

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js (v16+) installed
- ✅ MongoDB installed locally OR MongoDB Atlas account
- ✅ Git (optional)

## 5-Minute Setup

### Step 1: Install Dependencies (2 minutes)

```powershell
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Step 2: Configure Environment (1 minute)

```powershell
# Navigate to server folder and run setup
cd server
npm run setup
cd ..
```

✅ This creates `server/.env` with a secure JWT secret automatically!

### Step 3: Start MongoDB (30 seconds)

#### Option A: Local MongoDB
```powershell
# Windows
net start MongoDB

# If MongoDB is not installed, download from: https://www.mongodb.com/try/download/community
```

#### Option B: MongoDB Atlas (Cloud - Recommended for beginners)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account → Create cluster
3. Click "Connect" → "Connect your application"
4. Copy connection string
5. Update `MONGODB_URI` in `server/.env`

### Step 4: Run the Application (30 seconds)

```powershell
# Run both frontend and backend together
npm run dev:all
```

That's it! 🎉

## Access the Application

- 🌐 Frontend: http://localhost:5173
- 🔧 Backend API: http://localhost:5000/api
- 📊 API Health: http://localhost:5000/api/health

## Test the System

### 1. Create Your First User

1. Go to http://localhost:5173/signup
2. Fill in the form:
   - Name: Your Name
   - Email: your@email.com
   - Password: Test@123
3. Click "Sign Up"
4. You'll be redirected to `/dashboard`

### 2. Make Yourself an Admin

#### Using MongoDB Compass (Recommended):
1. Download [MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. Connect to `mongodb://localhost:27017`
3. Open database: `gdg-iter`
4. Open collection: `users`
5. Find your user document
6. Edit it and change `role` from `"user"` to `"admin"`
7. Logout and login again
8. You'll now be redirected to `/admin` 🎉

#### Using Command Line:
```powershell
# Open MongoDB shell
mongosh

# Switch to database
use gdg-iter

# Update your user to admin
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

### 3. Test Both Roles

1. **As Admin**: 
   - Login → Redirects to `/admin`
   - Full access to admin panel

2. **As User**: 
   - Login → Redirects to `/dashboard`
   - Access to user features only

## Available Routes

### Public Routes
- `/` - Home page
- `/login` - Login page
- `/signup` - Signup page
- `/about` - About page
- ... (all other public pages)

### Protected Routes
- `/dashboard` - User dashboard (requires login)
- `/admin` - Admin panel (requires admin role)

## Troubleshooting

### "MongoDB connection error"
**Solution**: Make sure MongoDB is running
```powershell
net start MongoDB
```

### "Port 5000 already in use"
**Solution**: Kill the process or change port in `server/.env`
```powershell
# Find process
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### "Cannot find module 'xxx'"
**Solution**: Reinstall dependencies
```powershell
npm install
cd server
npm install
```

### CORS errors in browser console
**Solution**: Check that:
- Backend is running on port 5000
- Frontend is running on port 5173
- `CLIENT_URL` in `server/.env` is `http://localhost:5173`

## Running Servers Separately

If `npm run dev:all` doesn't work, run them separately:

```powershell
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
npm run dev
```

## Color Scheme

The auth pages use GDG ITER brand colors:
- Primary: Indigo (#6366f1)
- Secondary: Purple (#4f46e5)
- Accent: Yellow (#fbbf24)
- Background: Gradient indigo-purple

## Default Test Credentials

You can create these for testing:

**Admin User**:
- Email: admin@gdgiter.com
- Password: Admin@123
- Role: admin

**Regular User**:
- Email: user@gdgiter.com
- Password: User@123
- Role: user

## Next Steps

1. ✅ Authentication system is working
2. 📝 Create content through admin panel
3. 👥 Invite team members
4. 🎨 Customize dashboard as needed
5. 🚀 Deploy to production

## Need Help?

Check these files:
- `AUTH_SETUP_GUIDE.md` - Detailed documentation
- `server/.env.example` - Environment variables reference
- `server/routes/authRoutes.js` - API endpoints

## Production Deployment

When ready for production:

1. Update `server/.env`:
   ```env
   NODE_ENV=production
   MONGODB_URI=<your-production-mongodb-uri>
   JWT_SECRET=<generate-new-secure-secret>
   CLIENT_URL=<your-production-frontend-url>
   ```

2. Build frontend:
   ```powershell
   npm run build
   ```

3. Deploy:
   - Backend → Railway, Render, or Heroku
   - Frontend → Netlify or Vercel

---

**Happy Coding! 🎉**

Need more details? Check `AUTH_SETUP_GUIDE.md` for comprehensive documentation.
