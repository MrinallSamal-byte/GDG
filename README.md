# GDG on Campus - ITER Website

A modern, dynamic website for Google Developer Groups (GDG) on Campus at ITER with a comprehensive **Admin Control Panel** for real-time content management.

## ✨ Features

### Public Website
- 🏠 Homepage with club information
- 📅 Signature Events showcase
- 🎉 Past Events gallery
- 👥 Team member profiles
- 🚀 Flagship Programs
- 💡 Workshops listing
- 📆 Weekly Cadence schedule
- 📋 Plan of Action
- 📞 Contact page with social links

### 🎛️ Admin Control Panel (NEW!)
- ✅ **Full CRUD Operations** for all content sections
- ✅ **Real-time Updates** - Changes reflect instantly on the public site
- ✅ **Secure Authentication** - Firebase-based login/logout
- ✅ **Modern UI** - Clean, responsive dashboard with Tailwind CSS
- ✅ **Confirmation Modals** - Prevents accidental deletions
- ✅ **Live Statistics** - Dashboard with real-time content counts
- ✅ **Poll Management System** - Create interactive polls with analytics
- ✅ **8 Management Sections**:
  - Signature Events
  - Past Events
  - Team Members
  - Plan of Action
  - Flagship Programs
  - Workshops
  - Weekly Cadences
  - **Polls** (NEW!)

### 📊 Poll Management System (NEW!)
- ✅ **Admin Features**:
  - Create polls with 2-6 options
  - Schedule with start/end dates
  - Real-time analytics & vote tracking
  - Preview before publishing
  - Auto-deactivation of expired polls
- ✅ **User Features**:
  - Interactive poll popups on homepage
  - Smooth animations
  - Instant results after voting
  - Session-based display (shows once per session)
  - Vote tracking to prevent duplicates

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account (free tier works!)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd GDGWEB-master

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Firebase credentials

# Run development server
npm run dev
```

### Firebase Setup (5 minutes)

See **[QUICK_START.md](./QUICK_START.md)** for detailed setup instructions.

**Quick steps:**
1. Create a Firebase project
2. Enable Authentication (Email/Password)
3. Enable Firestore Database
4. Add admin user
5. Copy Firebase config to `.env`

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - 5-minute setup guide
- **[ADMIN_SETUP.md](./ADMIN_SETUP.md)** - Complete Firebase configuration
- **[FIREBASE_INTEGRATION.md](./FIREBASE_INTEGRATION.md)** - Integrate Firebase with public pages
- **[ADMIN_PANEL_SUMMARY.md](./ADMIN_PANEL_SUMMARY.md)** - Full feature overview

## 🎯 Usage

### Accessing the Admin Panel

1. Navigate to `/admin/login`
2. Sign in with your Firebase credentials
3. Start managing content!

### Managing Content

**Add Content:**
- Click on any section in the admin navigation
- Click the "+ Add [Item]" button
- Fill in the form
- Click "Save"

**Edit Content:**
- Find the item you want to edit
- Click "Edit" button
- Modify the form
- Click "Save"

**Delete Content:**
- Click "Delete" button
- Confirm in the modal

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Backend**: Firebase (Firestore + Authentication)
- **Real-time Updates**: Firebase Listeners
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📁 Project Structure

```
src/
├── admin/                    # Admin panel components
│   ├── AdminDashboard.jsx   # Main dashboard with stats
│   ├── AdminNav.jsx         # Navigation bar
│   ├── AdminLogin.jsx       # Login page
│   ├── components/          # Reusable admin components
│   └── [Section].jsx        # CRUD pages for each section
├── components/              # Public site components
├── pages/                   # Public pages
├── hooks/                   # Custom React hooks
├── services/                # Firebase services
├── data/                    # Static data (fallback)
├── routes/                  # Routing configuration
└── firebase.js              # Firebase initialization
```

## 🔥 Firebase Collections

The admin panel manages these Firestore collections:
- `signatureEvents` - Upcoming and past signature events
- `pastEvents` - Historical events with photos
- `teamMembers` - Team member profiles
- `flagshipPrograms` - Major programs and initiatives
- `workshops` - Workshop listings
- `weeklyCadences` - Weekly activity schedule
- `planOfAction` - Strategic goals and objectives
- `polls` - Interactive polls for user engagement **(NEW!)**
- `pollResponses` - Vote records and analytics **(NEW!)**

## 🔒 Security

- Environment variables for sensitive data
- Protected admin routes
- Firebase Authentication
- Firestore security rules
- `.gitignore` configured for secrets

## 🚢 Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Deploy to:
- **Firebase Hosting** (recommended - already using Firebase)
- **Netlify** (has netlify.toml configured)
- **Vercel**
- Any static hosting service

## 📊 Admin Dashboard Features

- **Real-time Statistics**: Live counts of all content
- **Quick Access Cards**: Navigate to any section with one click
- **Visual Indicators**: Color-coded sections and status badges
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Help Links**: Direct access to documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 Environment Variables

Create a `.env` file with:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🐛 Troubleshooting

**Login Issues:**
- Verify Firebase user exists in Authentication
- Check `.env` configuration
- Clear browser cache

**Content Not Updating:**
- Check Firestore security rules
- Verify Firebase connection
- Check browser console for errors

**Build Errors:**
- Run `npm install` to ensure dependencies
- Clear `node_modules` and reinstall

**Poll Issues:**
- Poll not showing: Check active status and dates
- Can't vote: Clear localStorage or use incognito mode
- Analytics not updating: Refresh page or check Firestore listeners

## 📚 Documentation

Comprehensive guides are available in the `docs/` folder:

- **[ADMIN_SETUP.md](docs/ADMIN_SETUP.md)** - Complete admin panel setup guide
- **[FIREBASE_GUIDE.md](docs/FIREBASE_GUIDE.md)** - Firebase configuration & deployment
- **[QUICK_START.md](docs/QUICK_START.md)** - Quick start guide for developers
- **[IMPLEMENTATION_CHECKLIST.md](docs/IMPLEMENTATION_CHECKLIST.md)** - Testing checklist
- **[CONTRIBUTING.md](docs/CONTRIBUTING.md)** - Development guidelines
- **[POLL_MANAGEMENT_GUIDE.md](docs/POLL_MANAGEMENT_GUIDE.md)** - Complete poll system guide **(NEW!)**
- **[POLL_QUICK_REFERENCE.md](docs/POLL_QUICK_REFERENCE.md)** - Quick reference for polls **(NEW!)**

## 📜 License

This project is licensed under the MIT License.

## 👥 Team

Built with ❤️ by the GDG on Campus - ITER team

## 🌟 Acknowledgments

- Google Developer Groups
- Firebase
- React + Vite community
- All contributors

---

**Admin Panel Status:** ✅ Fully Functional
**Real-time Updates:** ✅ Enabled
**Documentation:** ✅ Complete
**Ready for Production:** ✅ Yes (after Firebase setup)

For setup help, see [QUICK_START.md](./QUICK_START.md)
