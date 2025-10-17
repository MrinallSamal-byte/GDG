import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./routes/AppLayout";
import GlobalStyles from "./styles/Global";
import AdminRoutes from "./admin/AdminRoutes";
import { AuthProvider } from "./admin/AuthContext";

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/*" element={<AppLayout />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
