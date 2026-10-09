import React, { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Backend authentication API call
      const res = await axios.post('http://localhost:5000/api/auth/login', { 
        email, 
        password 
      });

      const { token, user } = res.data;

      // LocalStorage update
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Zustand global state update
      if (setAuth) {
        setAuth(token, user);
      }

      // Direct full page reload redirect to ensure clean route mounting
      if (user && user.role === 'superadmin') {
        window.location.href = '/super-admin';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.error || 'Login failed. Please check your credentials and server status.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f4f6f8',
      fontFamily: 'sans-serif'
    }}>
      <form onSubmit={handleLogin} style={{
        background: '#ffffff',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '360px'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '24px',
          color: '#1e293b',
          fontSize: '22px',
          fontWeight: '600'
        }}>
          SaaS Portal Login
        </h2>

        {error && (
          <div style={{
            background: '#fef2f2',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '6px',
            fontSize: '13px',
            marginBottom: '18px',
            border: '1px solid #fecaca',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontSize: '13px',
            color: '#475569',
            fontWeight: '500'
          }}>
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="superadmin@admin.com"
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '14px',
              boxSizing: 'border-box',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontSize: '13px',
            color: '#475569',
            fontWeight: '500'
          }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '14px',
              boxSizing: 'border-box',
              outline: 'none'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            background: loading ? '#93c5fd' : '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '15px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;