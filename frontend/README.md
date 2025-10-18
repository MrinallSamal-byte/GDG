# GDG ITER - Frontend

React-based frontend for the GDG ITER website.

## Features

- ⚛️ Built with React 19
- 🎨 Styled with Tailwind CSS
- 🎭 Animations with Framer Motion
- 🔥 Firebase integration
- 🔄 Real-time updates with Socket.IO
- 🎯 React Router for navigation
- 💅 Styled Components for component styling

## Tech Stack

- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **Firebase** - Authentication and hosting
- **Socket.IO Client** - Real-time communication
- **Lucide React** - Icon library
- **Lottie React** - Animation library

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Copy `.env.example` to `.env` and update with your configuration:
```bash
cp .env.example .env
```

## Configuration

Edit the `.env` file with your configuration:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Backend API URL
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## Running the Application

### Development Mode
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/              # Static assets
│   ├── DesignTeam/
│   ├── LeadTeam/
│   ├── MediaPic/
│   ├── PrTeam/
│   └── TechPic/
├── src/
│   ├── admin/          # Admin panel components
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminEvents.jsx
│   │   ├── AdminPolls.jsx
│   │   └── ...
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable components
│   │   ├── Navigation.jsx
│   │   ├── Footer.jsx
│   │   ├── PollPopup.jsx
│   │   └── ...
│   ├── data/           # Static data and schemas
│   ├── features/       # Feature-based modules
│   ├── hooks/          # Custom React hooks
│   │   ├── useFirestoreCollection.js
│   │   └── useSocket.js
│   ├── pages/          # Page components
│   ├── routes/         # Routing configuration
│   ├── services/       # API services
│   ├── styles/         # Global styles
│   ├── App.jsx         # Main App component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global CSS
├── .env                # Environment variables
├── .env.example        # Example environment file
├── eslint.config.js    # ESLint configuration
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies
```

## Key Features

### Public Pages
- Home
- About Us
- Events (Past, Signature, Workshops)
- Weekly Cadence
- Our Team
- Community Impact
- Contact

### Admin Panel
- Dashboard with analytics
- Event management (CRUD operations)
- Team member management
- Poll management
- Notice management
- Plan of Action management
- Real-time updates across all admin tabs

### Real-time Features
- Live poll results
- Instant event updates
- Real-time notifications
- Multi-tab synchronization

## API Integration

The frontend communicates with the backend API at `http://localhost:5000/api` (configurable via `VITE_API_URL`).

### API Endpoints Used
- `/api/auth/*` - Authentication
- `/api/admin/*` - Admin operations
- WebSocket connection for real-time updates

## Styling

This project uses a combination of:
- **Tailwind CSS** - For utility classes
- **Styled Components** - For component-specific styles
- **CSS Modules** - For scoped styles

## Development

### Linting
```bash
npm run lint
```

### Code Style
- Use functional components with hooks
- Follow React best practices
- Keep components small and focused
- Use PropTypes or TypeScript for type checking

## Deployment

### Build
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deploy Options
- **Netlify** - Connect your Git repository
- **Vercel** - One-click deployment
- **Firebase Hosting** - Use Firebase CLI
- **Traditional hosting** - Upload `dist/` folder

### Environment Variables
Make sure to set all environment variables in your hosting platform:
- Firebase configuration
- Backend API URL
- Socket.IO URL

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Code splitting with React.lazy
- Image optimization
- Lazy loading for heavy components
- Memoization where appropriate

## License

MIT
