# Firebase Setup Guide for Admin Panel

## Step 1: Enable Firestore Database

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project: `gdgweb-mrinallsamal`
3. In the left sidebar, click **"Firestore Database"**
4. Click **"Create database"**
5. Choose **"Start in test mode"** (for development)
6. Select a location (e.g., `us-central`)
7. Click **"Enable"**

## Step 2: Enable Authentication

1. In the left sidebar, click **"Authentication"**
2. Click **"Get started"**
3. Click on **"Email/Password"** under Sign-in method
4. Toggle **"Enable"** to ON
5. Click **"Save"**

## Step 3: Create an Admin User

1. In Authentication, go to the **"Users"** tab
2. Click **"Add user"**
3. Enter an email: `admin@gdg.com` (or any email you want)
4. Enter a password: Create a strong password
5. Click **"Add user"**

## Step 4: Set Firestore Security Rules (Optional for Development)

1. Go to **Firestore Database** > **"Rules"** tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access for development (change for production!)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click **"Publish"**

**Note**: These rules allow anyone to read/write. For production, you should restrict access to authenticated users only.

## Step 5: Test Admin Login

1. Make sure your dev server is running: `npm run dev`
2. Visit: http://localhost:5173/admin
3. You should be redirected to http://localhost:5173/admin/login
4. Enter the email and password you created in Step 3
5. Click **"Sign In"**
6. You should now see the Admin Dashboard!

## Troubleshooting

**If you see a blank page at /admin:**
- Check browser console for errors (F12)
- Make sure Firestore and Authentication are enabled
- Verify your `.env` file has the correct Firebase credentials
- Restart the dev server after creating the `.env` file

**If login fails:**
- Verify the user exists in Firebase Authentication > Users tab
- Check that Email/Password authentication is enabled
- Check browser console for specific error messages

**If you see "Firebase: Error (auth/...):"**
- This means Authentication is working but credentials are wrong
- Double-check the email/password you created

---

**Once you complete these steps, your admin panel will be fully functional!**
