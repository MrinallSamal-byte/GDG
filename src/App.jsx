import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./routes/AppLayout";
import GlobalStyles from "./styles/Global";
import AdminRoutes from "./admin/AdminRoutes";
import { AuthProvider } from "./admin/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./admin/ProtectedRoute";

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <AuthProvider>
          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected User Dashboard */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />
            
            {/* Public Routes */}
            <Route path="/*" element={<AppLayout />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
