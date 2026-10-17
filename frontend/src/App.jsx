import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import SuperAdmin from './pages/SuperAdmin';
import Dashboard from './pages/Dashboard';
import SFADashboard from './pages/SFADashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './store/useAuthStore';
import { LogOut, LayoutDashboard, ShieldCheck, User, Compass } from 'lucide-react';

// --- Global Navigation Header ---
const Navbar = () => {
  const { token, user, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!token) return null;

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isSuperAdmin = user?.role?.toLowerCase() === 'superadmin';

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 24px',
      backgroundColor: '#1e293b',
      color: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#38bdf8' }}>SaaS Enterprise</span>
        
        {isSuperAdmin ? (
          <Link to="/super-admin" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={18} /> Super Admin Panel
          </Link>
        ) : (
          <>
            <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LayoutDashboard size={18} /> Main Dashboard
            </Link>
            <Link to="/sfa" style={{ color: '#38bdf8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
              <Compass size={18} /> SFA Hub
            </Link>
          </>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <User size={16} /> {user?.email}
        </span>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#ef4444',
            color: '#fff',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </nav>
  );
};

// --- Main App Component ---
function App() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const isSuperAdmin = user?.role?.toLowerCase() === 'superadmin';

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Route */}
        <Route 
          path="/login" 
          element={
            token ? (
              isSuperAdmin ? (
                <Navigate to="/super-admin" replace />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            ) : (
              <Login />
            )
          } 
        />

        {/* Protected Client Dashboard Page */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin', 'user', 'superadmin', 'SuperAdmin']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected SFA Dashboard Module */}
        <Route
          path="/sfa"
          element={
            <ProtectedRoute allowedRoles={['admin', 'user', 'superadmin', 'SuperAdmin']}>
              <SFADashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Super Admin Page */}
        <Route
          path="/super-admin"
          element={
            <ProtectedRoute allowedRoles={['superadmin', 'SuperAdmin']}>
              <SuperAdmin />
            </ProtectedRoute>
          }
        />

        {/* Default Redirect according to User Role */}
        <Route
          path="*"
          element={
            token ? (
              isSuperAdmin ? (
                <Navigate to="/super-admin" replace />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;