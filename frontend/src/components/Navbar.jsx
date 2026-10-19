import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const { user, token, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isAuthenticated = Boolean(user && (token || localStorage.getItem('token')));

  return (
    <div style={{
      height: '50px',
      backgroundColor: '#0284c7',
      color: '#ffffff',
      display: 'flex',
      justify: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/sfa" style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>
          SaaS Enterprise
        </Link>
        <span style={{ fontSize: '13px', backgroundColor: '#0369a1', padding: '3px 8px', borderRadius: '4px' }}>
          🎯 SFA Hub
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {isAuthenticated ? (
          <>
            <span style={{ fontSize: '13px', color: '#e0f2fe' }}>
              👤 {user?.email || 'Logged In'} ({user?.role || 'user'})
            </span>

            {user?.role === 'superadmin' && (
              <Link to="/superadmin" style={{ color: '#fff', fontSize: '13px', textDecoration: 'none', fontWeight: 'bold' }}>
                SuperAdmin Panel
              </Link>
            )}

            {(user?.role === 'admin' || user?.role === 'superadmin') && (
              <Link to="/settings" style={{ color: '#fff', fontSize: '13px', textDecoration: 'none', fontWeight: 'bold' }}>
                ⚙️ Settings
              </Link>
            )}

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#ef4444',
                color: '#ffffff',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              padding: '6px 16px',
              borderRadius: '6px',
              fontWeight: 'bold',
              textDecoration: 'none',
              fontSize: '13px'
            }}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;