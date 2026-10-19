import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SFADashboard from './pages/SFADashboard';
import SuperAdmin from './pages/SuperAdmin';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';

const AuthGuard = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // If field user tries to access admin views, redirect to SFA
    if (user.role === 'user' || user.role === 'sales_rep') {
      return <Navigate to="/sfa" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Unolo Admin Realtime Dashboard */}
        <Route path="/dashboard" element={
          <AuthGuard allowedRoles={['admin', 'superadmin']}>
            <Dashboard />
          </AuthGuard>
        } />

        {/* Field Sales Rep Portal */}
        <Route path="/sfa" element={
          <AuthGuard allowedRoles={['user', 'sales_rep', 'admin', 'superadmin']}>
            <SFADashboard />
          </AuthGuard>
        } />

        {/* Settings Suite */}
        <Route path="/settings" element={
          <AuthGuard allowedRoles={['admin', 'superadmin']}>
            <Settings />
          </AuthGuard>
        } />

        <Route path="/superadmin" element={
          <AuthGuard allowedRoles={['superadmin']}>
            <SuperAdmin />
          </AuthGuard>
        } />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;