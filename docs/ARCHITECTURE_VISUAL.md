# 🏗️ Architecture Diagram & Visual Guide

## 🎯 System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         GDG ITER Website                             │
│                     Full-Stack Architecture                          │
└─────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────┐
│                          USER INTERFACE LAYER                         │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────────┐  │
│  │   Public    │  │   Admin     │  │   Events    │  │   Team   │  │
│  │   Pages     │  │   Panel     │  │   Pages     │  │   Page   │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └──────────┘  │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │              React Components (Frontend)                     │   │
│  │  • Navigation  • Footer  • Forms  • Cards  • Modals         │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ├── HTTP/HTTPS (REST API)
                                    ├── WebSocket (Socket.IO)
                                    │
┌───────────────────────────────────▼───────────────────────────────────┐
│                        APPLICATION LAYER                              │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │              Express.js Server (Backend)                     │   │
│  │                                                               │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │   │
│  │  │   Auth       │  │   Admin      │  │   Public     │     │   │
│  │  │   Routes     │  │   Routes     │  │   Routes     │     │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘     │   │
│  │                                                               │   │
│  │  ┌──────────────────────────────────────────────────────┐  │   │
│  │  │              Middleware Layer                         │  │   │
│  │  │  • JWT Auth  • CORS  • Error Handler  • Logger      │  │   │
│  │  └──────────────────────────────────────────────────────┘  │   │
│  │                                                               │   │
│  │  ┌──────────────────────────────────────────────────────┐  │   │
│  │  │              Business Logic Layer                     │  │   │
│  │  │  • Socket.IO Service  • Email Service               │  │   │
│  │  └──────────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ├── MongoDB Protocol
                                    │
┌───────────────────────────────────▼───────────────────────────────────┐
│                          DATA LAYER                                   │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │              MongoDB Database                                │   │
│  │                                                               │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │   │
│  │  │  Users   │  │  Events  │  │  Polls   │  │  Team    │   │   │
│  │  │Collection│  │Collection│  │Collection│  │Collection│   │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │   │
│  │                                                               │   │
│  │  ┌──────────┐  ┌──────────┐                                 │   │
│  │  │ Notices  │  │   POA    │                                 │   │
│  │  │Collection│  │Collection│                                 │   │
│  │  └──────────┘  └──────────┘                                 │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

## 📊 Request Flow Diagram

```
┌──────────┐                                              ┌──────────┐
│          │  1. User visits website                     │          │
│  Browser │─────────────────────────────────────────────▶│ Frontend │
│          │                                              │  (React) │
│          │  2. HTML + CSS + JS                         │          │
│          │◀─────────────────────────────────────────────│  :5173   │
└────┬─────┘                                              └────┬─────┘
     │                                                          │
     │  3. User action (e.g., view events)                     │
     │─────────────────────────────────────────────────────────┘
     │
     │  4. API Request (GET /api/admin/events)
     ├──────────────────────────────────────────────┐
     │                                              │
     │                                              ▼
     │                                        ┌──────────┐
     │                                        │          │
     │                                        │ Backend  │
     │                                        │(Express) │
     │                                        │          │
     │                                        │  :5000   │
     │                                        └────┬─────┘
     │                                             │
     │                                             │ 5. Authenticate
     │                                             │    (JWT verify)
     │                                             │
     │                                             │ 6. Query DB
     │                                             ├────────────┐
     │                                             │            │
     │                                             │            ▼
     │                                             │      ┌──────────┐
     │                                             │      │          │
     │                                             │      │ MongoDB  │
     │                                             │      │ Database │
     │                                             │      │          │
     │                                             │      └────┬─────┘
     │                                             │           │
     │                                             │ 7. Return│data
     │                                             │◀──────────┘
     │                                             │
     │  8. JSON Response                          │
     │◀────────────────────────────────────────────┤
     │                                             │
     │  9. Update UI                               │
     └─────────────────────────────────────────────┘
```

## 🔄 Real-time Update Flow

```
┌─────────────┐                    ┌─────────────┐                    ┌─────────────┐
│   Admin     │                    │   Socket    │                    │   Public    │
│   User      │                    │   Server    │                    │   User      │
│             │                    │  (Backend)  │                    │             │
└──────┬──────┘                    └──────┬──────┘                    └──────┬──────┘
       │                                  │                                  │
       │ 1. Create Event                 │                                  │
       ├─────────────────────────────────▶│                                  │
       │                                  │                                  │
       │                                  │ 2. Save to MongoDB               │
       │                                  ├──────────────┐                   │
       │                                  │              │                   │
       │                                  │◀─────────────┘                   │
       │                                  │                                  │
       │                                  │ 3. Emit 'event:created'          │
       │                                  ├──────────────────────────────────▶│
       │                                  │                                  │
       │ 4. Receive Update               │                                  │
       │◀─────────────────────────────────┤                                  │
       │                                  │                                  │
       │                                  │ 5. Update UI                     │
       │                                  │                                  ├──┐
       │                                  │                                  │  │
       │                                  │                                  │◀─┘
       │                                  │                                  │
       │ All connected clients receive update instantly!                    │
       │                                                                     │
```

## 📁 File Organization Visual

```
Project Root
│
├── 🎨 FRONTEND (Client-Side)
│   │
│   ├── Source Code
│   │   ├── Components (Reusable UI)
│   │   ├── Pages (Route Pages)
│   │   ├── Admin (Admin Panel)
│   │   ├── Hooks (Custom Hooks)
│   │   └── Services (API Calls)
│   │
│   ├── Static Assets
│   │   ├── Images
│   │   ├── Fonts
│   │   └── Icons
│   │
│   └── Configuration
│       ├── Vite Config
│       ├── Environment Variables
│       └── Build Settings
│
└── 🔧 BACKEND (Server-Side)
    │
    ├── API Layer
    │   ├── Routes (Endpoints)
    │   └── Middleware (Auth, etc.)
    │
    ├── Business Logic
    │   ├── Services (Socket.IO)
    │   └── Utilities
    │
    ├── Data Layer
    │   └── Models (Mongoose Schemas)
    │
    └── Configuration
        ├── Server Setup
        └── Environment Variables
```

## 🔐 Authentication Flow

```
┌────────────────────────────────────────────────────────────────────┐
│                      Authentication Process                         │
└────────────────────────────────────────────────────────────────────┘

STEP 1: Login Request
┌─────────┐     POST /api/auth/login      ┌─────────┐
│  User   │────────────────────────────────▶ Server  │
│         │   { email, password }          │         │
└─────────┘                                └────┬────┘
                                                │
                                                │ Verify in DB
                                                │ Hash password
                                                ▼
                                          ┌──────────┐
                                          │ MongoDB  │
                                          └────┬─────┘
                                               │
STEP 2: Generate JWT                          │ User found
┌─────────┐                                   │
│  User   │                                   ▼
│         │◀────────────────────────────┌─────────┐
└─────────┘   JWT Token + User Data     │ Server  │
              { token, user }            └─────────┘

STEP 3: Store Token
┌─────────┐
│  User   │──┐
│         │  │ Store in:
└─────────┘  │ • LocalStorage
             │ • Cookie
             └──▶ { token: "eyJ..." }

STEP 4: Authenticated Requests
┌─────────┐    GET /api/admin/events       ┌─────────┐
│  User   │────────────────────────────────▶ Server  │
│         │   Authorization: Bearer token  │         │
└─────────┘                                └────┬────┘
                                                │
                                                │ Verify JWT
                                                │ Check expiry
                                                ▼
┌─────────┐                              ┌─────────┐
│  User   │◀─────────────────────────────│ Server  │
│         │   Protected Resource         │         │
└─────────┘                              └─────────┘
```

## 🗄️ Database Schema Relationships

```
┌─────────────────────────────────────────────────────────────────────┐
│                      MongoDB Collections                            │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────┐
│    Users     │
│──────────────│
│ _id          │────────┐
│ email        │        │
│ passwordHash │        │ createdBy (reference)
│ role         │        │
│ createdAt    │        │
└──────────────┘        │
                        │
                        ├──────────────▶┌──────────────┐
                        │               │    Events    │
                        │               │──────────────│
                        │               │ _id          │
                        │               │ title        │
                        │               │ description  │
                        │               │ date         │
                        │               │ createdBy    │
                        │               └──────────────┘
                        │
                        ├──────────────▶┌──────────────┐
                        │               │ TeamMembers  │
                        │               │──────────────│
                        │               │ _id          │
                        │               │ name         │
                        │               │ role         │
                        │               │ createdBy    │
                        │               └──────────────┘
                        │
                        ├──────────────▶┌──────────────┐
                        │               │    Polls     │
                        │               │──────────────│
                        │               │ _id          │
                        │               │ question     │
                        │               │ options[]    │
                        │               │ createdBy    │
                        │               └──────────────┘
                        │
                        └──────────────▶┌──────────────┐
                                        │   Notices    │
                                        │──────────────│
                                        │ _id          │
                                        │ title        │
                                        │ content      │
                                        │ createdBy    │
                                        └──────────────┘
```

## 🌐 Deployment Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                      Production Deployment                        │
└──────────────────────────────────────────────────────────────────┘

                        ┌──────────────┐
                        │   Internet   │
                        └───────┬──────┘
                                │
                    ┌───────────┴──────────┐
                    │                      │
            ┌───────▼──────┐      ┌───────▼──────┐
            │   Frontend   │      │   Backend    │
            │   (Netlify)  │      │  (Railway)   │
            │              │      │              │
            │ Static Files │      │  API Server  │
            │   :443 SSL   │      │   :443 SSL   │
            └──────────────┘      └───────┬──────┘
                    │                     │
                    │                     │
                    │                     │
                    │             ┌───────▼──────┐
                    │             │   MongoDB    │
                    │             │    Atlas     │
                    │             │              │
                    │             │   Database   │
                    │             └──────────────┘
                    │
            ┌───────▼──────┐
            │   Firebase   │
            │   (Optional) │
            │              │
            │ Auth/Storage │
            └──────────────┘

URLs:
• Frontend: https://gdg-iter.netlify.app
• Backend:  https://gdg-api.railway.app
• Database: mongodb+srv://...
```

## 📊 Data Flow Example: Creating an Event

```
1. Admin opens Admin Panel
   └─▶ Browser loads React app from Frontend server

2. Admin navigates to Events Management
   └─▶ React Router changes view (client-side)

3. Admin clicks "Create Event"
   └─▶ Modal/Form opens

4. Admin fills form and submits
   └─▶ Frontend validates data
       └─▶ Makes POST request to Backend API

5. Backend receives request
   └─▶ Middleware checks JWT token
       └─▶ If valid, proceed
           └─▶ Validate request body
               └─▶ Create Mongoose model instance
                   └─▶ Save to MongoDB

6. MongoDB saves document
   └─▶ Returns saved document to Backend

7. Backend emits Socket.IO event
   └─▶ "event:created" broadcast to all connected clients

8. Frontend receives Socket.IO event
   └─▶ Updates state
       └─▶ Re-renders component
           └─▶ New event appears in list

9. Admin sees new event
   └─▶ Success message displayed
       └─▶ Form resets
```

## 🎯 Technology Stack Visual

```
┌─────────────────────────────────────────────────────────────────┐
│                      Technology Stack                           │
└─────────────────────────────────────────────────────────────────┘

FRONTEND                    BACKEND                     DATABASE
┌─────────────┐            ┌─────────────┐            ┌─────────────┐
│   React 19  │            │  Node.js    │            │  MongoDB    │
├─────────────┤            ├─────────────┤            ├─────────────┤
│   Vite 7    │            │  Express.js │            │  Mongoose   │
├─────────────┤            ├─────────────┤            └─────────────┘
│ Tailwind 4  │            │  Socket.IO  │
├─────────────┤            ├─────────────┤            TOOLS
│   Framer    │            │     JWT     │            ┌─────────────┐
│   Motion    │            ├─────────────┤            │     Git     │
├─────────────┤            │   bcrypt    │            ├─────────────┤
│   React     │            ├─────────────┤            │   GitHub    │
│   Router    │            │    CORS     │            ├─────────────┤
├─────────────┤            ├─────────────┤            │   ESLint    │
│ Socket.IO   │            │   dotenv    │            ├─────────────┤
│   Client    │            └─────────────┘            │   Prettier  │
├─────────────┤                                       └─────────────┘
│  Firebase   │            DEPLOYMENT
└─────────────┘            ┌─────────────┐
                           │   Netlify   │ ← Frontend
                           ├─────────────┤
                           │   Railway   │ ← Backend
                           ├─────────────┤
                           │    Atlas    │ ← Database
                           └─────────────┘
```

---

**This visual guide helps understand the complete architecture of the refactored application! 🚀**
