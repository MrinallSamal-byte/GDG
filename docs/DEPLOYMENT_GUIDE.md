# 🚀 Deployment Guide

Complete guide for deploying the GDG ITER application with separated frontend and backend.

## 📋 Table of Contents

1. [Deployment Overview](#deployment-overview)
2. [Prerequisites](#prerequisites)
3. [Frontend Deployment](#frontend-deployment)
4. [Backend Deployment](#backend-deployment)
5. [Database Setup](#database-setup)
6. [Environment Variables](#environment-variables)
7. [Post-Deployment](#post-deployment)

## 🎯 Deployment Overview

### Recommended Setup

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   Frontend      │       │    Backend      │       │    Database     │
│   (Netlify/     │──────▶│   (Railway/     │──────▶│  (MongoDB       │
│    Vercel)      │       │    Render)      │       │   Atlas)        │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

### Platform Recommendations

| Component | Recommended Platform | Alternative |
|-----------|---------------------|-------------|
| Frontend | Netlify | Vercel, Firebase Hosting |
| Backend | Railway | Render, Heroku |
| Database | MongoDB Atlas | Self-hosted MongoDB |

## 📝 Prerequisites

- [x] Git repository with code
- [x] MongoDB Atlas account (or MongoDB server)
- [x] Hosting platform accounts (Netlify, Railway, etc.)
- [x] Domain name (optional)

## 🎨 Frontend Deployment

### Option 1: Netlify (Recommended)

1. **Build Settings**
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```

2. **Environment Variables**
   ```
   VITE_API_URL=https://your-backend.railway.app/api
   VITE_SOCKET_URL=https://your-backend.railway.app
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_PROJECT_ID=your_project
   # ... other Firebase config
   ```

3. **Deploy via Git**
   ```bash
   # Push to GitHub
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   
   # Connect repository in Netlify dashboard
   # Netlify will auto-deploy on push
   ```

4. **netlify.toml** (optional)
   ```toml
   [build]
     base = "frontend"
     command = "npm run build"
     publish = "dist"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Option 2: Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

3. **Environment Variables**
   Set in Vercel dashboard or via CLI:
   ```bash
   vercel env add VITE_API_URL
   vercel env add VITE_SOCKET_URL
   ```

### Option 3: Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   cd frontend
   firebase init hosting
   ```

3. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

## 🔧 Backend Deployment

### Option 1: Railway (Recommended)

1. **Create New Project**
   - Go to [Railway.app](https://railway.app)
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Select your repository

2. **Configuration**
   ```
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

3. **Environment Variables**
   In Railway dashboard, add:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/gdg
   JWT_SECRET=your_secure_secret
   CLIENT_URL=https://your-frontend.netlify.app
   ```

4. **Generate Domain**
   - Railway provides a domain: `your-app.railway.app`
   - Or add custom domain

### Option 2: Render

1. **Create New Web Service**
   - Go to [Render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect GitHub repository

2. **Configuration**
   ```
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

3. **Environment Variables**
   Add in Render dashboard (same as Railway)

### Option 3: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App**
   ```bash
   heroku create gdg-iter-backend
   ```

3. **Deploy**
   ```bash
   git subtree push --prefix backend heroku main
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI=your_uri
   heroku config:set JWT_SECRET=your_secret
   heroku config:set CLIENT_URL=your_frontend_url
   ```

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create free cluster
   - Choose region close to your backend

2. **Create Database User**
   ```
   Username: gdg_admin
   Password: [Generate secure password]
   ```

3. **Network Access**
   - Add IP: `0.0.0.0/0` (allow from anywhere)
   - Or add specific IPs of your backend server

4. **Get Connection String**
   ```
   mongodb+srv://gdg_admin:password@cluster0.xxxxx.mongodb.net/gdg-iter?retryWrites=true&w=majority
   ```

5. **Initialize Database**
   ```bash
   # Set MONGODB_URI in backend/.env
   cd backend
   npm run quick-setup
   ```

## 🔐 Environment Variables

### Frontend Environment Variables

Create in hosting platform dashboard:

```env
# API Configuration
VITE_API_URL=https://your-backend.railway.app/api
VITE_SOCKET_URL=https://your-backend.railway.app

# Firebase Configuration (if using Firebase)
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456:web:abc123
```

### Backend Environment Variables

Create in hosting platform dashboard:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/gdg-iter

# Security
JWT_SECRET=generate_a_64_character_random_string_here

# CORS
CLIENT_URL=https://your-frontend.netlify.app

# Optional: Admin credentials for first setup
ADMIN_EMAIL=admin@gdgiter.com
ADMIN_PASSWORD=SecurePassword123!
```

## 🔄 CI/CD Setup

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=frontend/dist
        env:
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
  
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          # Railway deploys automatically on push
          echo "Backend deployed via Railway GitHub integration"
```

## ✅ Post-Deployment Checklist

### Testing

- [ ] Frontend loads at production URL
- [ ] Backend API responds at `/api/health`
- [ ] Admin login works
- [ ] CORS is configured correctly
- [ ] Socket.IO connections work
- [ ] Database operations work
- [ ] All images/assets load
- [ ] Mobile responsive design works
- [ ] SSL/HTTPS is enabled
- [ ] Environment variables are set

### Security

- [ ] Change default admin password
- [ ] JWT secret is strong and unique
- [ ] MongoDB network access is configured
- [ ] API rate limiting is enabled (optional)
- [ ] CORS is restricted to your frontend domain
- [ ] Environment variables are not exposed

### Performance

- [ ] Frontend is minified and optimized
- [ ] Images are compressed
- [ ] CDN is configured (optional)
- [ ] Caching headers are set
- [ ] Database indexes are created

### Monitoring

- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Configure uptime monitoring
- [ ] Set up performance monitoring
- [ ] Configure log aggregation

## 🔍 Troubleshooting

### Frontend can't connect to backend

**Check:**
- Backend URL in `VITE_API_URL`
- CORS settings in backend
- Backend is running and accessible

**Solution:**
```javascript
// In frontend, log the API URL
console.log('API URL:', import.meta.env.VITE_API_URL);
```

### CORS Errors

**Backend `server.js`:**
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL || 'https://your-frontend.netlify.app',
  credentials: true
}));
```

### Database Connection Fails

**Check:**
- MongoDB URI is correct
- Network access allows connections
- Database user has correct permissions
- Connection string includes database name

### Socket.IO Not Working

**Check:**
- WebSocket support on hosting platform
- CORS configuration includes Socket.IO
- Frontend Socket.IO URL is correct

**Backend:**
```javascript
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
});
```

## 📊 Cost Estimates

| Service | Free Tier | Paid Plan |
|---------|-----------|-----------|
| Netlify | 100GB bandwidth | $19/month |
| Railway | $5 free credit | $5-20/month |
| MongoDB Atlas | 512MB storage | $9/month |
| **Total** | ~Free | ~$28-40/month |

## 🔄 Updating Deployed Apps

### Frontend Updates

```bash
# Make changes
git add .
git commit -m "Update frontend"
git push origin main

# Netlify/Vercel auto-deploys
```

### Backend Updates

```bash
# Make changes
git add .
git commit -m "Update backend"
git push origin main

# Railway/Render auto-deploys
```

### Database Migrations

```bash
# Connect to production DB
MONGODB_URI=your_production_uri npm run migration-script
```

## 🌐 Custom Domain Setup

### Frontend (Netlify)

1. Add domain in Netlify dashboard
2. Update DNS records:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

### Backend (Railway)

1. Add custom domain in Railway
2. Update DNS:
   ```
   Type: CNAME
   Name: api
   Value: your-app.railway.app
   ```

## 📝 Environment-Specific Configs

### Development
```env
VITE_API_URL=http://localhost:5000/api
```

### Staging
```env
VITE_API_URL=https://staging-api.your-domain.com/api
```

### Production
```env
VITE_API_URL=https://api.your-domain.com/api
```

## 🎉 Deployment Complete!

Your application is now live:
- **Frontend**: https://your-site.netlify.app
- **Backend**: https://your-backend.railway.app
- **Admin**: https://your-site.netlify.app/admin/login

---

**Need help? Check the troubleshooting section or create an issue on GitHub!**
