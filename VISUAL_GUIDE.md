# 🎨 Authentication System Visual Guide

## 🌈 Color Scheme

The authentication pages use the GDG ITER brand colors:

```
Primary Colors:
├── Indigo 600: #6366f1 (Buttons, Links)
├── Indigo 700: #4f46e5 (Button Hover)
└── Indigo 800: #4338ca (Gradient End)

Accent Colors:
├── Yellow 400: #fbbf24 (Admin Badge)
└── Yellow 500: #f59e0b (Admin Accent)

Neutral Colors:
├── White: #ffffff (Cards, Background)
├── Gray 50: #f9fafb (Alt Background)
├── Gray 600: #4b5563 (Secondary Text)
└── Gray 900: #111827 (Primary Text)

Status Colors:
├── Green 700: #15803d (Success)
├── Red 700: #b91c1c (Error)
└── Blue 700: #0369a1 (Info)
```

## 📱 Page Layouts

### Signup Page (`/signup`)
```
┌─────────────────────────────────────┐
│  [Gradient Background - Indigo]     │
│                                     │
│    ┌─────────────────────────┐     │
│    │   Create Account        │     │
│    │   Join the GDG ITER     │     │
│    │   community            │     │
│    │                         │     │
│    │   [Name Input]          │     │
│    │   [Email Input]         │     │
│    │   [Password Input]      │     │
│    │   [Confirm Pass Input]  │     │
│    │                         │     │
│    │   [Sign Up Button]      │     │
│    │                         │     │
│    │   Already have account? │     │
│    │   [Sign In Link]        │     │
│    └─────────────────────────┘     │
│                                     │
└─────────────────────────────────────┘
```

### Login Page (`/login`)
```
┌─────────────────────────────────────┐
│  [Gradient Background - Indigo]     │
│                                     │
│    ┌─────────────────────────┐     │
│    │   Welcome Back          │     │
│    │   Sign in to your GDG   │     │
│    │   ITER account         │     │
│    │                         │     │
│    │   [Email Input]         │     │
│    │   [Password Input]      │     │
│    │                         │     │
│    │   [Forgot password?]    │     │
│    │                         │     │
│    │   [Sign In Button]      │     │
│    │                         │     │
│    │   Don't have account?   │     │
│    │   [Sign Up Link]        │     │
│    └─────────────────────────┘     │
│                                     │
└─────────────────────────────────────┘
```

### User Dashboard (`/dashboard`)
```
┌─────────────────────────────────────────────────┐
│  [Gradient Header - Indigo]                     │
│  ┌──┐                                           │
│  │ MS│ Welcome back, Mrinall Samal!            │
│  └──┘ mrinall@example.com                      │
│       [👤 Member Badge]                         │
├─────────────────────────────────────────────────┤
│                                                 │
│  Your Profile                                   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────┐│
│  │ 👤      │ │ 📧      │ │ 🎭      │ │ 📅    ││
│  │ Name    │ │ Email   │ │ Role    │ │ Since ││
│  │ John    │ │ john@   │ │ user    │ │ Oct   ││
│  └─────────┘ └─────────┘ └─────────┘ └───────┘│
│                                                 │
│  Quick Actions                                  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────┐│
│  │ 🏠      │ │ ℹ️       │ │ ⚙️      │ │ 🚪    ││
│  │ Home    │ │ About   │ │ Profile │ │ Logout││
│  └─────────┘ └─────────┘ └─────────┘ └───────┘│
│                                                 │
│  🎉 Welcome to GDG ITER!                       │
│  You're now part of a vibrant community...      │
└─────────────────────────────────────────────────┘
```

## 🔄 User Flow Diagrams

### 1. New User Registration
```
┌────────┐     ┌────────┐     ┌──────────┐     ┌─────────┐
│ Visit  │────▶│ Click  │────▶│  Fill    │────▶│ Submit  │
│ /signup│     │ Sign Up│     │  Form    │     │  Form   │
└────────┘     └────────┘     └──────────┘     └─────────┘
                                                      │
                                                      ▼
┌────────┐     ┌────────┐     ┌──────────┐     ┌─────────┐
│  Go to │◀────│ Store  │◀────│  Create  │◀────│Validate │
│Dashboard     │ Token  │     │   User   │     │  Input  │
└────────┘     └────────┘     └──────────┘     └─────────┘
```

### 2. Existing User Login
```
┌────────┐     ┌────────┐     ┌──────────┐     ┌─────────┐
│ Visit  │────▶│  Enter │────▶│  Click   │────▶│ Verify  │
│ /login │     │ Creds  │     │ Sign In  │     │Password │
└────────┘     └────────┘     └──────────┘     └─────────┘
                                                      │
                                                      ▼
┌────────┐     ┌────────┐     ┌──────────┐     ┌─────────┐
│Redirect│◀────│ Store  │◀────│ Generate │◀────│  Check  │
│by Role │     │ Token  │     │   JWT    │     │  Role   │
└────────┘     └────────┘     └──────────┘     └─────────┘
    │              │
    ▼              ▼
[Admin]        [User]
/admin       /dashboard
```

### 3. Protected Route Access
```
┌─────────┐     ┌──────────┐
│  User   │────▶│ Navigate │
│ Action  │     │  to URL  │
└─────────┘     └──────────┘
                      │
                      ▼
            ┌──────────────────┐
            │  Check Token     │
            └──────────────────┘
                   │    │
         Valid ────┘    └──── Invalid
           │                      │
           ▼                      ▼
    ┌─────────────┐      ┌──────────────┐
    │ Check Role  │      │  Redirect to │
    │ (if needed) │      │    /login    │
    └─────────────┘      └──────────────┘
         │    │
    Pass ─┘    └─── Fail
      │                 │
      ▼                 ▼
┌──────────┐    ┌─────────────┐
│  Show    │    │  Redirect   │
│ Content  │    │   to Home   │
└──────────┘    └─────────────┘
```

## 🗺️ Route Map

```
Website Routes:
├── Public Routes (No Auth Required)
│   ├── /                    → Home Page
│   ├── /about              → About Us
│   ├── /contact            → Contact
│   ├── /events             → Events
│   ├── /login              → Login Page
│   └── /signup             → Signup Page
│
├── Protected Routes (Auth Required)
│   ├── /dashboard          → User Dashboard
│   └── /profile            → User Profile (future)
│
└── Admin Routes (Admin Role Required)
    ├── /admin              → Admin Dashboard
    ├── /admin/signature-events
    ├── /admin/past-events
    ├── /admin/our-team
    ├── /admin/plan-of-action
    ├── /admin/flagship-programs
    ├── /admin/workshops
    ├── /admin/weekly-cadences
    └── /admin/polls
```

## 🔐 Authentication States

```
┌─────────────────────────────────────────┐
│         Authentication States            │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  NOT AUTHENTICATED              │   │
│  │  • No token in storage          │   │
│  │  • Can access public routes     │   │
│  │  • Redirected from protected    │   │
│  └─────────────────────────────────┘   │
│              │                          │
│              │ Login/Signup             │
│              ▼                          │
│  ┌─────────────────────────────────┐   │
│  │  AUTHENTICATED - USER ROLE      │   │
│  │  • Valid token stored           │   │
│  │  • Access to /dashboard         │   │
│  │  • Cannot access /admin         │   │
│  └─────────────────────────────────┘   │
│              │                          │
│              │ Role Update              │
│              ▼                          │
│  ┌─────────────────────────────────┐   │
│  │  AUTHENTICATED - ADMIN ROLE     │   │
│  │  • Valid token stored           │   │
│  │  • Access to /dashboard         │   │
│  │  • Access to /admin             │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

## 📊 Database Relationships

```
┌─────────────────────────────────────┐
│          MongoDB Collections         │
├─────────────────────────────────────┤
│                                     │
│  ┌────────────────────────────┐    │
│  │    users Collection        │    │
│  ├────────────────────────────┤    │
│  │ • _id: ObjectId            │    │
│  │ • name: String             │    │
│  │ • email: String (unique)   │    │
│  │ • passwordHash: String     │    │
│  │ • role: "user" | "admin"   │    │
│  │ • createdAt: Date          │    │
│  │ • updatedAt: Date          │    │
│  └────────────────────────────┘    │
│              │                      │
│              │ (future extensions)  │
│              ▼                      │
│  ┌────────────────────────────┐    │
│  │   profiles Collection      │    │
│  │   (future)                 │    │
│  └────────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

## 🎭 Role-Based Access Visual

```
┌──────────────────────────────────────────────────┐
│              Route Access Matrix                  │
├──────────────┬────────────┬──────────┬──────────┤
│   Route      │   Guest    │   User   │  Admin   │
├──────────────┼────────────┼──────────┼──────────┤
│ /            │     ✅     │    ✅    │    ✅    │
│ /login       │     ✅     │    ✅    │    ✅    │
│ /signup      │     ✅     │    ✅    │    ✅    │
│ /about       │     ✅     │    ✅    │    ✅    │
│ /dashboard   │     ❌     │    ✅    │    ✅    │
│ /admin       │     ❌     │    ❌    │    ✅    │
│ /admin/*     │     ❌     │    ❌    │    ✅    │
└──────────────┴────────────┴──────────┴──────────┘

Legend:
✅ = Accessible
❌ = Redirected (guests→/login, users→/dashboard)
```

## 🔄 Token Flow

```
┌────────────────────────────────────────────────┐
│            JWT Token Lifecycle                  │
└────────────────────────────────────────────────┘

1. Login Success
   ┌──────────┐     ┌──────────┐     ┌──────────┐
   │  Server  │────▶│ Generate │────▶│  Return  │
   │ Verifies │     │   JWT    │     │to Client │
   └──────────┘     └──────────┘     └──────────┘
                          │
                          ▼
                    [Token Format]
               eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
               eyJpZCI6IjY1MDAwMC4uLiIsImlhdCI6MTY5...
               SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

2. Store Token
   ┌──────────┐     ┌──────────┐
   │  Client  │────▶│localStorage│
   │ Receives │     │   .token   │
   └──────────┘     └──────────┘

3. Make Requests
   ┌──────────┐     ┌──────────┐     ┌──────────┐
   │  Attach  │────▶│  Server  │────▶│  Verify  │
   │  Token   │     │ Receives │     │   JWT    │
   └──────────┘     └──────────┘     └──────────┘

4. Token Expiry (30 days default)
   ┌──────────┐     ┌──────────┐     ┌──────────┐
   │ Request  │────▶│ Invalid  │────▶│ Redirect │
   │  Fails   │     │  Token   │     │ to Login │
   └──────────┘     └──────────┘     └──────────┘
```

## 🎨 Component Hierarchy

```
App.jsx
├── AuthProvider (Context)
│   ├── Login Page
│   │   └── LoginForm
│   │       ├── EmailInput
│   │       ├── PasswordInput
│   │       └── SubmitButton
│   │
│   ├── Signup Page
│   │   └── SignupForm
│   │       ├── NameInput
│   │       ├── EmailInput
│   │       ├── PasswordInput
│   │       ├── ConfirmPasswordInput
│   │       └── SubmitButton
│   │
│   ├── Dashboard (Protected)
│   │   ├── Header
│   │   │   ├── Avatar
│   │   │   ├── UserInfo
│   │   │   └── RoleBadge
│   │   ├── ProfileCards
│   │   ├── QuickActions
│   │   └── WelcomeMessage
│   │
│   ├── Admin Routes (Protected + Admin Only)
│   │   ├── AdminNav
│   │   ├── AdminDashboard
│   │   └── Admin Pages...
│   │
│   └── Public Routes
│       ├── Home
│       ├── About
│       └── Contact
```

## 📱 Responsive Breakpoints

```
┌──────────────────────────────────────┐
│         Device Breakpoints            │
├──────────────────────────────────────┤
│                                      │
│  Mobile (< 640px)                    │
│  ┌────────────────────┐              │
│  │   [Full Width]     │              │
│  │   • Single column  │              │
│  │   • Stack cards    │              │
│  │   • Large buttons  │              │
│  └────────────────────┘              │
│                                      │
│  Tablet (640px - 1024px)             │
│  ┌─────────────────────────────┐    │
│  │   [Centered, Max-width]     │    │
│  │   • 2 column grid           │    │
│  │   • Comfortable spacing     │    │
│  └─────────────────────────────┘    │
│                                      │
│  Desktop (> 1024px)                  │
│  ┌──────────────────────────────────┐
│  │  [Centered, Max-width 1200px]   │
│  │  • 4 column grid                │
│  │  • Full features visible        │
│  └──────────────────────────────────┘
│                                      │
└──────────────────────────────────────┘
```

---

**Visual Guide Version**: 1.0.0  
**Last Updated**: October 18, 2025  
**Status**: Complete ✅
