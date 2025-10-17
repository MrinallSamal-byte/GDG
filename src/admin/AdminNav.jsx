import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const navItems = [
  { path: "/admin", label: "Dashboard" },
  { path: "/admin/signature-events", label: "Signature Events" },
  { path: "/admin/past-events", label: "Past Events" },
  { path: "/admin/our-team", label: "Our Team" },
  { path: "/admin/plan-of-action", label: "Plan of Action" },
  { path: "/admin/flagship-programs", label: "Flagship Programs" },
  { path: "/admin/workshops", label: "Workshops" },
  { path: "/admin/weekly-cadences", label: "Weekly Cadences" },
  { path: "/admin/polls", label: "Polls" },
];

const AdminNav = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <nav className="bg-white shadow px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `px-3 py-2 rounded text-sm font-medium transition ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{currentUser?.email}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
