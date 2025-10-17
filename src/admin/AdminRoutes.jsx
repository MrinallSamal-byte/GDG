import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AdminSignatureEvents from "./AdminSignatureEvents";
import AdminPastEvents from "./AdminPastEvents";
import AdminOurTeam from "./AdminOurTeam";
import AdminPlanOfAction from "./AdminPlanOfAction";
import AdminFlagshipPrograms from "./AdminFlagshipPrograms";
import AdminWorkshops from "./AdminWorkshops";
import AdminWeeklyCadences from "./AdminWeeklyCadences";
import AdminPolls from "./AdminPolls";
import AdminLogin from "./AdminLogin";
import ProtectedRoute from "./ProtectedRoute";
import AdminNav from "./AdminNav";

const AdminRoutes = () => (
  <Routes>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route
      path="/admin"
      element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/signature-events"
      element={
        <ProtectedRoute>
          <div className="min-h-screen bg-gray-50">
            <AdminNav />
            <AdminSignatureEvents />
          </div>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/past-events"
      element={
        <ProtectedRoute>
          <div className="min-h-screen bg-gray-50">
            <AdminNav />
            <AdminPastEvents />
          </div>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/our-team"
      element={
        <ProtectedRoute>
          <div className="min-h-screen bg-gray-50">
            <AdminNav />
            <AdminOurTeam />
          </div>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/plan-of-action"
      element={
        <ProtectedRoute>
          <div className="min-h-screen bg-gray-50">
            <AdminNav />
            <AdminPlanOfAction />
          </div>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/flagship-programs"
      element={
        <ProtectedRoute>
          <div className="min-h-screen bg-gray-50">
            <AdminNav />
            <AdminFlagshipPrograms />
          </div>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/workshops"
      element={
        <ProtectedRoute>
          <div className="min-h-screen bg-gray-50">
            <AdminNav />
            <AdminWorkshops />
          </div>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/weekly-cadences"
      element={
        <ProtectedRoute>
          <div className="min-h-screen bg-gray-50">
            <AdminNav />
            <AdminWeeklyCadences />
          </div>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/polls"
      element={
        <ProtectedRoute>
          <div className="min-h-screen bg-gray-50">
            <AdminNav />
            <AdminPolls />
          </div>
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<Navigate to="/admin" />} />
  </Routes>
);

export default AdminRoutes;
