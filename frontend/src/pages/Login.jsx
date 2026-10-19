import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Login = () => {
  const [email, setEmail] = useState('clientadmin@acme.com');
  const [password, setPassword] = useState('acmepassword123');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  // Clear stale tokens on login screen mount
  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await axios.post('https://sfa-saas-platform.onrender.com/api/auth/login', {
        email: email.trim(),
        password: password.trim()
      }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000
      });

      if (res.data && res.data.success) {
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        setAuth(user, token);
        navigate('/dashboard', { replace: true });
      } else {
        setErrorMsg('Invalid login response from server.');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMsg(err.response.data.error);
      } else if (err.code === 'ECONNABORTED') {
        setErrorMsg('Request timed out. Please click Sign In again.');
      } else {
        setErrorMsg('Unable to connect to backend server. Please retry.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0f172a', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: '380px', padding: '32px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '10px', fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
            U
          </div>
          <h2 style={{ margin: 0, color: '#0f172a', fontSize: '22px' }}>Unolo Enterprise Login</h2>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>Realtime Field Force Portal</p>
        </div>

        {errorMsg && (
          <div style={{ padding: '10px 12px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: '6px', fontSize: '12px', marginBottom: '16px', textAlign: 'center' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="clientadmin@acme.com"
              required
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '14px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '14px' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '12px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '14px', marginTop: '6px' }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '6px', fontSize: '11px', color: '#64748b', textAlign: 'center' }}>
          <div><strong>Client Admin:</strong> clientadmin@acme.com</div>
          <div><strong>Password:</strong> acmepassword123</div>
        </div>

      </div>
    </div>
  );
};

export default Login;