# Admin Panel Setup Guide

## Firebase Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" and follow the steps
3. Enable Google Analytics (optional)

### 2. Set up Firebase Authentication

1. In Firebase Console, go to **Authentication** → **Get Started**
2. Enable **Email/Password** authentication method
3. Click on **Users** tab → **Add User**
4. Create an admin user with email and password

### 3. Set up Firestore Database

1. In Firebase Console, go to **Firestore Database** → **Create Database**
2. Start in **Production mode** (or Test mode for development)
3. Choose a Cloud Firestore location

### 4. Configure Security Rules

Go to **Firestore Database** → **Rules** and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read all documents
    match /{document=**} {
      allow read: if true;
    }
    
    // Only authenticated users can write
    match /{document=**} {
      allow write: if request.auth != null;
    }
  }
}
```

### 5. Get Firebase Configuration

1. Go to **Project Settings** (gear icon) → **General**
2. Scroll to **Your apps** → **Web app** (</> icon)
3. Register your app and copy the config object
4. Update `src/firebase.js` with your config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Using the Admin Panel

### Login

1. Navigate to `/admin/login`
2. Enter the admin email and password you created in Firebase Authentication
3. Click "Sign In"

### Managing Content

The admin panel allows you to manage:

- **Signature Events**: Add upcoming or completed signature events
- **Past Events**: Document completed events with photos and attendee counts
- **Our Team**: Manage team members across different teams (Lead, Tech, Design, PR, Media)
- **Plan of Action**: Add goals, objectives, and strategies
- **Flagship Programs**: Showcase major programs with features
- **Workshops**: Add workshops with difficulty levels
- **Weekly Cadences**: Define weekly activities

### Features

- ✅ **Real-time updates**: Changes reflect immediately on the public website
- ✅ **CRUD operations**: Add, Edit, and Delete functionality for all sections
- ✅ **Confirmation modals**: Prevents accidental deletions
- ✅ **Responsive design**: Works on desktop and mobile
- ✅ **Secure authentication**: Only authenticated users can access admin panel

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Security Best Practices

1. **Never commit Firebase config with real credentials to public repos**
2. Use environment variables for sensitive data:
   ```javascript
   const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     // ... other config
   };
   ```
3. Create a `.env` file (add to `.gitignore`):
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

## Collections Structure

### signatureEvents
```javascript
{
  title: string,
  description: string,
  date: string,
  status: "Upcoming" | "Completed",
  registrationLink?: string,
  image?: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### pastEvents
```javascript
{
  title: string,
  description: string,
  date: string,
  image?: string,
  attendees?: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### teamMembers
```javascript
{
  name: string,
  role: string,
  team: "Lead" | "Tech" | "Design" | "PR" | "Media",
  photo?: string,
  linkedin?: string,
  github?: string,
  email?: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### flagshipPrograms
```javascript
{
  title: string,
  description: string,
  features: string[],
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### workshops
```javascript
{
  title: string,
  description: string,
  date: string,
  level: "Beginner" | "Intermediate" | "Advanced",
  duration?: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### weeklyCadences
```javascript
{
  day: string,
  activity: string,
  description?: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### planOfAction
```javascript
{
  title: string,
  description: string,
  category: "Goal" | "Objective" | "Strategy" | "Initiative",
  timeline?: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Troubleshooting

### Cannot login
- Check that you created a user in Firebase Authentication
- Verify Firebase config is correct
- Check browser console for errors

### Changes not reflecting
- Ensure Firestore is properly initialized
- Check Firestore security rules
- Verify the collection names match

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
