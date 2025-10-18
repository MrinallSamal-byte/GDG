# 🔄 Migration Guide: Old Structure → New Structure

This guide explains the migration from the old mixed structure to the new separated frontend/backend architecture.

## 📊 Structure Comparison

### Old Structure
```
GDGWEB-master/
├── src/              # Frontend React code
├── public/           # Static assets
├── server/           # Backend code
├── index.html
├── package.json      # Frontend dependencies
└── vite.config.js
```

### New Structure
```
GDGWEB-master/
├── frontend/         # All frontend code
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/          # All backend code
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── server.js
│   └── package.json
└── package.json      # Root orchestration
```

## 🔄 File Migrations

### Frontend Files (→ `frontend/`)

| Old Location | New Location |
|--------------|--------------|
| `src/*` | `frontend/src/*` |
| `public/*` | `frontend/public/*` |
| `index.html` | `frontend/index.html` |
| `vite.config.js` | `frontend/vite.config.js` |
| `eslint.config.js` | `frontend/eslint.config.js` |

### Backend Files (→ `backend/`)

| Old Location | New Location |
|--------------|--------------|
| `server/server.js` | `backend/server.js` |
| `server/models/*` | `backend/models/*` |
| `server/routes/*` | `backend/routes/*` |
| `server/services/*` | `backend/services/*` |
| `server/middleware/*` | `backend/middleware/*` |
| `server/package.json` | `backend/package.json` |
| `server/.env` | `backend/.env` |

## 🔧 Configuration Updates

### 1. Frontend Configuration

**`frontend/vite.config.js`** - Added proxy configuration:
```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
```

**`frontend/.env`** - New environment variables:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

### 2. Backend Configuration

**No changes required** - Backend code remains the same, just moved to `backend/` folder.

### 3. Root Configuration

**`package.json`** - New orchestration scripts:
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:backend": "cd backend && npm run dev",
    "install:all": "cd frontend && npm install && cd ../backend && npm install"
  }
}
```

## 🚀 Migration Steps

### Option 1: Fresh Clone (Recommended)

If you haven't made custom changes:

1. **Backup your .env files**
   ```powershell
   Copy-Item server\.env backup-server.env
   Copy-Item .env.local backup-frontend.env
   ```

2. **Use the new structure directly**
   ```powershell
   # The folders are already created
   cd GDGWEB-master
   ```

3. **Install dependencies**
   ```powershell
   npm run install:all
   ```

4. **Restore environment variables**
   ```powershell
   Copy-Item backup-server.env backend\.env
   Copy-Item backup-frontend.env frontend\.env
   ```

5. **Start development**
   ```powershell
   npm run dev
   ```

### Option 2: Manual Migration

If you have custom changes to preserve:

1. **Move Frontend Files**
   ```powershell
   # Already done via the refactoring
   # Verify: Check that frontend/src exists
   ```

2. **Move Backend Files**
   ```powershell
   # Already done via the refactoring
   # Verify: Check that backend/server.js exists
   ```

3. **Update Import Paths** (if needed)
   
   In frontend code, API calls should use:
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
   ```

4. **Install Dependencies**
   ```powershell
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

## 🔍 Verification Checklist

After migration, verify:

- [ ] `frontend/node_modules` exists
- [ ] `backend/node_modules` exists
- [ ] `frontend/.env` contains API URLs
- [ ] `backend/.env` contains MongoDB URI and JWT secret
- [ ] Frontend runs on http://localhost:5173
- [ ] Backend runs on http://localhost:5000
- [ ] API calls from frontend reach backend
- [ ] Admin login works
- [ ] Real-time updates work (Socket.IO)
- [ ] Database operations work

## 🐛 Common Issues & Solutions

### Issue 1: Frontend can't connect to backend

**Solution:**
```javascript
// frontend/src/config.js or similar
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

### Issue 2: CORS errors

**Solution:** Check `backend/.env`:
```env
CLIENT_URL=http://localhost:5173
```

And in `backend/server.js`:
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
```

### Issue 3: Socket.IO connection fails

**Solution:** Update Socket.IO client configuration:
```javascript
const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
```

### Issue 4: Environment variables not loading

**Frontend:** Make sure variables start with `VITE_`
```env
VITE_API_URL=...
```

**Backend:** Make sure `dotenv` is configured:
```javascript
import dotenv from 'dotenv';
dotenv.config();
```

### Issue 5: Module import errors

**Solution:** Ensure all imports use correct relative paths:
```javascript
// Before: import User from '../models/User.js'
// After: import User from './models/User.js'
```

## 📝 Code Changes Required

### Frontend API Service

Update your API service to use environment variables:

```javascript
// frontend/src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchEvents = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/events`);
  return response.json();
};
```

### Socket.IO Client

```javascript
// frontend/src/hooks/useSocket.js
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
const socket = io(SOCKET_URL);
```

## 🎯 Benefits of New Structure

1. **Clear Separation** - Frontend and backend are completely independent
2. **Scalability** - Can deploy frontend and backend separately
3. **Team Collaboration** - Frontend and backend teams can work independently
4. **Different Deployments** - Deploy to different platforms (e.g., Netlify + Railway)
5. **Easier Testing** - Test frontend and backend separately
6. **Better Organization** - Clear folder structure
7. **Independent Scaling** - Scale frontend and backend independently

## 🔄 Rollback (If Needed)

If you need to rollback to the old structure:

1. The old `server/` and `src/` folders still exist
2. Use the old `package.json` scripts:
   ```json
   "dev": "vite"
   "dev:server": "cd server && npm run dev"
   ```

## 📞 Support

If you encounter issues during migration:

1. Check the logs for error messages
2. Verify all environment variables are set
3. Ensure both servers are running
4. Check network tab in browser dev tools
5. Review the README files in `frontend/` and `backend/`

## ✅ Next Steps

After successful migration:

1. Test all features thoroughly
2. Update documentation
3. Train team members on new structure
4. Set up CI/CD for new structure
5. Update deployment configurations

---

**Migration Complete! 🎉**

You now have a properly separated frontend and backend architecture!
