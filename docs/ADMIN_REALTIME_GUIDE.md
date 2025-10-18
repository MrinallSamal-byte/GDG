# Admin Panel & Real-Time System Guide

## Table of Contents
1. Overview
2. Setup & Configuration
3. Firebase Integration
4. Real-Time Features
5. File Structure
6. Quick Start
7. Implementation Checklist
8. Visual Guide
9. Testing Guide
10. Troubleshooting

---

## 1. Overview

A comprehensive guide to the GDG website Admin Control Panel and Real-Time MongoDB system. Includes full CRUD, real-time updates, secure authentication, and modern UI/UX.

### Key Features
- Admin Dashboard & Navigation
- Authentication System (Firebase)
- Full CRUD Operations for all sections
- Real-time Data Management (Firestore & MongoDB)
- Responsive UI/UX
- Security (env vars, protected routes)

---

## 2. Setup & Configuration

### Firebase Setup
- Create Firebase project
- Enable Email/Password authentication
- Enable Firestore Database
- Create admin user
- Configure security rules
- Get Firebase config and update `src/firebase.js`

### MongoDB Setup (for Real-Time System)
- Install MongoDB locally or use Atlas
- Run quick setup: `cd server && npm run quick-setup`
- Start backend: `cd server && npm run dev`
- Start frontend: `npm run dev`

---

## 3. Firebase Integration

- Use `useFirestoreCollection` hook to fetch data
- Real-time listeners for public pages
- Example integrations for Signature Events, Past Events, Workshops, Flagship Programs

---

## 4. Real-Time Features (MongoDB)

- Add/Edit/Delete instantly reflected on all pages
- Socket.IO for real-time sync
- Persistent storage in MongoDB
- Example JSON structures for Events, Team Members, Polls

---

## 5. File Structure

```
Backend (server/)
  models/ (Event.js, TeamMember.js, Poll.js, PlanOfAction.js, Notice.js, User.js)
  routes/ (adminRoutes.js, authRoutes.js)
  services/ (socketService.js)
  middleware/ (authMiddleware.js)
  server.js
Frontend (src/)
  admin/ (AdminDashboard.jsx, AdminNav.jsx, AdminRoutes.jsx, ...)
  components/ (NotificationProvider.jsx, DataManager.jsx, ...)
  services/ (mongoDBService.js, socketService.js)
  hooks/ (useSocket.js, useFirestoreCollection.js)
```

---

## 6. Quick Start

### Firebase
1. Setup Firebase project
2. Enable Authentication & Firestore
3. Add admin user
4. Update config
5. Run: `npm run dev`

### MongoDB
1. Run quick setup: `cd server && npm run quick-setup`
2. Start backend: `cd server && npm run dev`
3. Start frontend: `npm run dev`
4. Login: `http://localhost:5173/admin/login`

---

## 7. Implementation Checklist

- [ ] Firebase project created
- [ ] Authentication enabled
- [ ] Firestore enabled
- [ ] Admin user created
- [ ] Config updated
- [ ] MongoDB running
- [ ] Backend & frontend servers running
- [ ] Real-time updates tested

---

## 8. Visual Guide

- Color scheme: Indigo, Yellow, Gray
- Page layouts: Signup, Login, Dashboard
- Component hierarchy and route diagrams
- Responsive design details

---

## 9. Testing Guide

- Test real-time create/update/delete in admin panel
- Verify instant updates on public pages
- Use multiple browsers for testing
- Check MongoDB Compass for data

---

## 10. Troubleshooting

- Blank page: Check Firebase/Firestore/Authentication
- Login fails: Verify user exists, check credentials
- Real-time not working: Check Socket.IO, MongoDB connection
- See browser console for errors

---

**For more details, refer to individual sections and code comments.**
