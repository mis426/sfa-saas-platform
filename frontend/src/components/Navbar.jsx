import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const isAdmin = user?.role?.toLowerCase() === 'admin' || user?.role?.toLowerCase() === 'superadmin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (logout) logout();
    navigate('/login');
  };

  return (
    <div style={{ backgroundColor: '#0f172a', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#38bdf8', fontWeight: 'bold', fontSize: '18px' }}>
          SaaS Enterprise
        </Link>

        {/* Hide Main Dashboard link for standard field sales reps */}
        {isAdmin && (
          <Link to="/dashboard" style={{ textDecoration: 'none', color: '#94a3b8', fontSize: '14px', fontWeight: '500' }}>
            Main Dashboard
          </Link>
        )}

        <Link to="/sfa" style={{ textDecoration: 'none', color: '#fff', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
          🎯 SFA Hub
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {user ? (
          <>
            <span style={{ fontSize: '13px', color: '#cbd5e1' }}>{user.email}</span>
            <button 
              onClick={handleLogout} 
              style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', backgroundColor: '#2563eb', color: '#fff', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold' }}>
            Login
          </Link>
        )}
      </div>

    </div>
  );
};

export default Navbar;