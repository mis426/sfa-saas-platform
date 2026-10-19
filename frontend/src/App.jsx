import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SFADashboard from './pages/SFADashboard';
import SuperAdmin from './pages/SuperAdmin';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import { useAuthStore } from './store/useAuthStore';

// Simple Inline Auth Guard
const AuthGuard = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = useAuthStore((state) => state.user);
  if (token || user) {
    return children;
  }
  return <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Main Unolo Realtime Dashboard Route */}
        <Route path="/dashboard" element={
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        } />

        <Route path="/sfa" element={
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        } />

        <Route path="/settings" element={
          <AuthGuard>
            <Settings />
          </AuthGuard>
        } />

        <Route path="/superadmin" element={
          <AuthGuard>
            <SuperAdmin />
          </AuthGuard>
        } />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;