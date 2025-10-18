# ✅ Authentication System Testing Checklist

## Pre-Testing Setup

- [ ] MongoDB is running
- [ ] Backend server is running (http://localhost:5000)
- [ ] Frontend server is running (http://localhost:5173)
- [ ] Environment files are configured

## 1. Signup Flow Testing

### Test Case 1.1: Valid Signup
- [ ] Navigate to http://localhost:5173/signup
- [ ] Fill in all fields with valid data:
  - Name: "Test User"
  - Email: "test@example.com"
  - Password: "Test@123"
  - Confirm Password: "Test@123"
- [ ] Click "Sign Up"
- [ ] ✅ Expected: Redirected to `/dashboard`
- [ ] ✅ Expected: Success message appears
- [ ] ✅ Expected: User saved in MongoDB

### Test Case 1.2: Validation Errors
- [ ] Try signup with empty name → Shows error
- [ ] Try signup with invalid email → Shows error
- [ ] Try signup with short password (<6 chars) → Shows error
- [ ] Try signup with mismatched passwords → Shows error

### Test Case 1.3: Duplicate Email
- [ ] Try signing up with same email twice
- [ ] ✅ Expected: Error message "User already exists"

## 2. Login Flow Testing

### Test Case 2.1: Valid Login (Regular User)
- [ ] Navigate to http://localhost:5173/login
- [ ] Enter valid credentials
- [ ] Click "Sign In"
- [ ] ✅ Expected: Redirected to `/dashboard`
- [ ] ✅ Expected: User info displayed correctly

### Test Case 2.2: Valid Login (Admin User)
- [ ] Create admin user or update existing user to admin
- [ ] Login with admin credentials
- [ ] ✅ Expected: Redirected to `/admin`
- [ ] ✅ Expected: Admin panel loads

### Test Case 2.3: Invalid Login
- [ ] Try login with wrong email → Shows error
- [ ] Try login with wrong password → Shows error
- [ ] Try login with empty fields → Shows validation errors

## 3. Protected Routes Testing

### Test Case 3.1: Dashboard Access
- [ ] Without login, try accessing `/dashboard`
- [ ] ✅ Expected: Redirected to `/login`
- [ ] After login, access `/dashboard`
- [ ] ✅ Expected: Dashboard loads successfully

### Test Case 3.2: Admin Panel Access
- [ ] As regular user, try accessing `/admin`
- [ ] ✅ Expected: Redirected to `/dashboard`
- [ ] As admin user, access `/admin`
- [ ] ✅ Expected: Admin panel loads successfully

### Test Case 3.3: Public Routes
- [ ] Access `/` (home) → Loads without login
- [ ] Access `/about` → Loads without login
- [ ] Access `/login` → Loads without login
- [ ] Access `/signup` → Loads without login

## 4. Dashboard Features Testing

### Test Case 4.1: User Profile Display
- [ ] Login as regular user
- [ ] Check dashboard shows:
  - [ ] User name
  - [ ] User email
  - [ ] User role badge
  - [ ] Member since date

### Test Case 4.2: Dashboard Actions
- [ ] Click "Go to Homepage" → Redirects to `/`
- [ ] Click "About GDG" → Redirects to about page
- [ ] Click "Logout" → Logs out and redirects to login

### Test Case 4.3: Admin Dashboard
- [ ] Login as admin
- [ ] Check admin dashboard shows admin badge
- [ ] Check "Admin Panel" button is visible
- [ ] Click "Admin Panel" → Goes to `/admin`

## 5. Logout Testing

### Test Case 5.1: Logout Functionality
- [ ] Login successfully
- [ ] Click logout button
- [ ] ✅ Expected: Redirected to `/login`
- [ ] ✅ Expected: Cannot access protected routes
- [ ] ✅ Expected: Token removed from localStorage

## 6. API Endpoints Testing

### Test Case 6.1: Signup Endpoint
```powershell
curl -X POST http://localhost:5000/api/auth/signup `
  -H "Content-Type: application/json" `
  -d '{"name":"API Test","email":"api@test.com","password":"Test@123"}'
```
- [ ] ✅ Expected: Returns user object and token

### Test Case 6.2: Login Endpoint
```powershell
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"api@test.com","password":"Test@123"}'
```
- [ ] ✅ Expected: Returns user object and token

### Test Case 6.3: Me Endpoint (Protected)
```powershell
# Replace YOUR_TOKEN with actual token
curl http://localhost:5000/api/auth/me `
  -H "Authorization: Bearer YOUR_TOKEN"
```
- [ ] ✅ Expected: Returns current user data

### Test Case 6.4: Health Check
```powershell
curl http://localhost:5000/api/health
```
- [ ] ✅ Expected: Returns server status

## 7. Security Testing

### Test Case 7.1: Password Hashing
- [ ] Create a user
- [ ] Check MongoDB database
- [ ] ✅ Expected: Password is hashed (bcrypt format: $2b$10$...)
- [ ] ✅ Expected: Plain password is NOT stored

### Test Case 7.2: JWT Token
- [ ] Login and check browser localStorage
- [ ] ✅ Expected: Token is stored
- [ ] ✅ Expected: Token format is valid JWT (three parts separated by dots)

### Test Case 7.3: Role-Based Access
- [ ] Regular user cannot access `/admin`
- [ ] Admin can access both `/dashboard` and `/admin`
- [ ] Unauthenticated users cannot access protected routes

## 8. MongoDB Data Verification

### Test Case 8.1: User Document Structure
Check in MongoDB Compass or shell:
```javascript
db.users.findOne()
```

Expected structure:
```json
{
  "_id": ObjectId("..."),
  "name": "Test User",
  "email": "test@example.com",
  "passwordHash": "$2b$10$...",
  "role": "user",
  "createdAt": ISODate("..."),
  "updatedAt": ISODate("...")
}
```

- [ ] All required fields present
- [ ] Password is hashed
- [ ] Timestamps are set
- [ ] Role is either "user" or "admin"

## 9. UI/UX Testing

### Test Case 9.1: Responsive Design
- [ ] Test on desktop (1920x1080)
- [ ] Test on tablet (768px width)
- [ ] Test on mobile (375px width)
- [ ] All forms are readable and usable

### Test Case 9.2: Visual Consistency
- [ ] Colors match GDG ITER theme (indigo/purple gradient)
- [ ] Fonts are consistent
- [ ] Buttons have hover effects
- [ ] Loading states are visible
- [ ] Error messages are styled correctly

### Test Case 9.3: Form Validation
- [ ] Real-time validation on input change
- [ ] Error messages appear below fields
- [ ] Error messages clear when fixed
- [ ] Submit button disabled during loading

## 10. Error Handling Testing

### Test Case 10.1: Network Errors
- [ ] Stop backend server
- [ ] Try to login
- [ ] ✅ Expected: User-friendly error message

### Test Case 10.2: Invalid Token
- [ ] Manually corrupt token in localStorage
- [ ] Refresh page or access protected route
- [ ] ✅ Expected: Redirected to login

### Test Case 10.3: Session Expiry
- [ ] Login successfully
- [ ] Wait for token expiry (30 days by default, or modify for testing)
- [ ] Try accessing protected route
- [ ] ✅ Expected: Redirected to login

## 11. Browser Compatibility

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers

## 12. Performance Testing

### Test Case 12.1: Load Times
- [ ] Signup page loads < 2 seconds
- [ ] Login page loads < 2 seconds
- [ ] Dashboard loads < 3 seconds
- [ ] API responses < 500ms

### Test Case 12.2: Concurrent Users
- [ ] Multiple browser tabs can login simultaneously
- [ ] No conflicts between sessions

## Testing Status Summary

| Category | Tests Passed | Tests Failed | Notes |
|----------|--------------|--------------|-------|
| Signup   |              |              |       |
| Login    |              |              |       |
| Protected Routes |    |              |       |
| Dashboard |            |              |       |
| Logout   |              |              |       |
| API      |              |              |       |
| Security |              |              |       |
| MongoDB  |              |              |       |
| UI/UX    |              |              |       |
| Errors   |              |              |       |

## Quick Test Commands

```powershell
# Check if MongoDB is running
mongosh --eval "db.adminCommand('ping')"

# Check backend health
curl http://localhost:5000/api/health

# View all users in database
mongosh gdg-iter --eval "db.users.find().pretty()"

# Count users
mongosh gdg-iter --eval "db.users.countDocuments()"

# Delete test users (careful!)
mongosh gdg-iter --eval "db.users.deleteMany({email: /test/})"
```

## Issues Found

Document any bugs or issues here:

1. **Issue**: 
   - **Description**: 
   - **Steps to Reproduce**: 
   - **Expected**: 
   - **Actual**: 
   - **Status**: 

---

**Testing Completed By**: ________________
**Date**: ________________
**Overall Status**: ☐ Pass | ☐ Fail | ☐ Partial
