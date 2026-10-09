import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LayoutDashboard, ShoppingBag, MapPin, LogOut } from 'lucide-react';

const Navbar = () => {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav style={{ backgroundColor: '#0f172a', color: '#fff', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#38bdf8' }}>SaaS SFA Suite</span>
        <Link to="/dashboard" style={{ color: '#f8fafc', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}><LayoutDashboard size={16}/> Dashboard</Link>
        <Link to="/sfa" style={{ color: '#f8fafc', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}><ShoppingBag size={16}/> SFA Operations</Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '13px', color: '#94a3b8' }}>{user?.email}</span>
        <button onClick={() => { logout(); navigate('/login'); }} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <LogOut size={14}/> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;