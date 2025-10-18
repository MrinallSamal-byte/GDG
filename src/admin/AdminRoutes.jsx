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
    <Route path="/login" element={<AdminLogin />} />
    <Route
      path="/"
      element={
        <ProtectedRoute requireAdmin={true}>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/signature-events"
      element={
        <ProtectedRoute requireAdmin={true}>
          <div className="min-h-screen bg-gray-50">
            <AdminNav />
            <AdminSignatureEvents />
          </div>
        </ProtectedRoute>
      }
    />
    <Route
      path="/past-events"
      element={
        <ProtectedRoute requireAdmin={true}>
          <div className="min-h-screen bg-gray-50">
            <AdminNav />
            <AdminPastEvents />
          </div>
        </ProtectedRoute>
      }
    />
    <Route
      path="/our-team"
      element={
        <ProtectedRoute requireAdmin={true}>
          <div className="min-h-screen bg-gray-50">
            <AdminNav />
            <AdminOurTeam />
          </div>
        </ProtectedRoute>
      }
    />
    <Route
      path="/plan-of-action"
      element={
        <ProtectedRoute requireAdmin={true}>
          <div className="min-h-screen bg-gray-50">
            <AdminNav />
            <AdminPlanOfAction />
          </div>
        </ProtectedRoute>
      }
    />
    <Route
      path="/flagship-programs"
      element={
        <ProtectedRoute requireAdmin={true}>
          <div className="min-h-screen bg-gray-50">
            <AdminNav />
            <AdminFlagshipPrograms />
          </div>
        </ProtectedRoute>
      }
    />
    <Route
      path="/workshops"
      element={
        <ProtectedRoute requireAdmin={true}>
          <div className="min-h-screen bg-gray-50">
            <AdminNav />
            <AdminWorkshops />
          </div>
        </ProtectedRoute>
      }
    />
    <Route
      path="/weekly-cadences"
      element={
        <ProtectedRoute requireAdmin={true}>
          <div className="min-h-screen bg-gray-50">
            <AdminNav />
            <AdminWeeklyCadences />
          </div>
        </ProtectedRoute>
      }
    />
    <Route
      path="/polls"
      element={
        <ProtectedRoute requireAdmin={true}>
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
