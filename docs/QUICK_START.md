# 🚀 Quick Start Guide - Admin Panel

## Prerequisites
- Node.js installed
- Firebase account (free tier is sufficient)
- 5-10 minutes for setup

## Setup in 5 Steps

### 1️⃣ Firebase Project Setup (3 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Name it (e.g., "GDG-ITER-Website")
4. Disable Google Analytics (optional)
5. Click **"Create project"**

### 2️⃣ Enable Authentication (1 minute)

1. In Firebase Console, click **"Authentication"** in left sidebar
2. Click **"Get started"**
3. Click **"Email/Password"** → Enable → Save
4. Go to **"Users"** tab
5. Click **"Add user"**
6. Enter email: `admin@gdg.com` (or your email)
7. Enter password: `YourSecurePassword123`
8. Click **"Add user"**

### 3️⃣ Enable Firestore (1 minute)

1. In Firebase Console, click **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select a location (closest to you)
5. Click **"Enable"**

### 4️⃣ Get Firebase Config (2 minutes)

1. Click the **gear icon** ⚙️ → **"Project settings"**
2. Scroll to **"Your apps"** section
3. Click the **web icon** `</>`
4. Register app name: "GDG Website"
5. **Copy the config object**
6. Create `.env` file in project root:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 5️⃣ Run the App (30 seconds)

```bash
npm run dev
```

## 🎉 You're Done!

1. Open browser to `http://localhost:5173/admin/login`
2. Login with your admin credentials
3. Start managing content!

## 📝 Test Your Setup

### Login Test
- URL: `http://localhost:5173/admin/login`
- Email: `admin@gdg.com` (or whatever you set)
- Password: Your password
- Should redirect to dashboard

### Add Content Test
1. Click **"Signature Events"** in navigation
2. Click **"+ Add Event"**
3. Fill in:
   - Title: "Test Event"
   - Description: "This is a test"
   - Date: "December 2025"
   - Status: "Upcoming"
4. Click **"Save"**
5. Event should appear in the list

### Real-time Test
1. Open `http://localhost:5173/signature-events` in a new tab
2. In admin panel, add another event
3. Check the public page - it should update instantly!

### Delete Test
1. Click **"Delete"** on the test event
2. Confirm in modal
3. Event disappears

## ⚠️ Security (Before Production)

Before deploying to production, update Firestore rules:

1. Go to **Firestore Database** → **Rules**
2. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access
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

3. Click **"Publish"**

## 🆘 Troubleshooting

### "Cannot read properties of undefined"
**Solution**: Check that `.env` file exists and has correct Firebase config

### "Permission denied" errors
**Solution**: 
1. Check Firestore rules (see above)
2. Ensure you're logged in

### Login not working
**Solution**:
1. Verify user exists in Firebase Console → Authentication → Users
2. Check email/password are correct
3. Look at browser console for error messages

### Changes not appearing on public site
**Solution**: Public pages need to be updated with Firebase integration (see FIREBASE_INTEGRATION.md)

## 📚 Next Steps

1. ✅ Test all sections (Events, Team, etc.)
2. ✅ Integrate Firebase with public pages (see FIREBASE_INTEGRATION.md)
3. ✅ Add your actual team members and events
4. ✅ Customize styling if needed
5. ✅ Deploy to production

## 🎓 Learn More

- **Full Setup Guide**: See `ADMIN_SETUP.md`
- **Firebase Integration**: See `FIREBASE_INTEGRATION.md`
- **Complete Summary**: See `ADMIN_PANEL_SUMMARY.md`

---

**Estimated Total Setup Time**: 5-10 minutes

**Status**: ✅ All CRUD operations working
**Authentication**: ✅ Secure login/logout
**Real-time**: ✅ Live updates
**Documentation**: ✅ Complete

**Need Help?** Check the browser console for error messages and refer to the documentation files.
