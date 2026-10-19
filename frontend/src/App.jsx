import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import SfaHub from './pages/SfaHub';
import SuperAdminHub from './pages/SuperAdminHub';
import Settings from './pages/Settings';

// Protected Route Component to enforce Auth token check
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED CLIENT ADMIN & SFA ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sfa"
          element={
            <ProtectedRoute>
              <SfaHub />
            </ProtectedRoute>
          }
        />

        {/* PROTECTED SUPERADMIN HUB ROUTE */}
        <Route
          path="/superadmin"
          element={
            <ProtectedRoute>
              <SuperAdminHub />
            </ProtectedRoute>
          }
        />

        {/* PROTECTED SETTINGS ROUTE */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* DEFAULT FALLBACK REDIRECT TO DASHBOARD */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;