import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { Building2, UserPlus, RefreshCw, FileText } from 'lucide-react';

const SuperAdmin = () => {
  const token = useAuthStore((state) => state.token);

  const [tenants, setTenants] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    companyName: '',
    maxAllowedUsers: 5,
    clientAdminName: '',
    clientAdminEmail: '',
    clientAdminPassword: ''
  });

  const fetchTenants = async () => {
    try {
      const res = await axios.get('https://sfa-saas-platform.onrender.com/api/superadmin/tenants', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTenants(res.data);
    } catch (err) {
      console.error('Fetch tenants error:', err);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const res = await axios.get('https://sfa-saas-platform.onrender.com/api/superadmin/audit-logs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAuditLogs(res.data);
    } catch (err) {
      console.error('Fetch audit logs error:', err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTenants();
      fetchAuditLogs();
    }
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnboard = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await axios.post(
        'https://sfa-saas-platform.onrender.com/api/superadmin/tenants',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess('Tenant onboarded successfully!');
      setFormData({
        companyName: '',
        maxAllowedUsers: 5,
        clientAdminName: '',
        clientAdminEmail: '',
        clientAdminPassword: ''
      });
      fetchTenants();
      fetchAuditLogs();
    } catch (err) {
      console.error('Onboard error:', err);
      setError(err.response?.data?.error || 'Failed to onboard tenant client.');
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    try {
      await axios.patch(
        `https://sfa-saas-platform.onrender.com/api/superadmin/tenants/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTenants();
      fetchAuditLogs();
    } catch (err) {
      console.error('Toggle status error:', err);
    }
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '26px', color: '#0f172a', marginBottom: '8px' }}>
          Super Admin Platform Operations
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>
          Global tenant management, seat allocation, real-time subscription control, and security audit logs.
        </p>
      </div>

      {/* Onboarding Form */}
      <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '32px', border: '1px solid #e2e8f0' }}>
        <h2 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserPlus size={20} color="#2563eb" /> Onboard New Tenant Client
        </h2>

        {error && (
          <div style={{ background: '#fef2f2', color: '#dc2626', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px', border: '1px solid #fecaca' }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px', border: '1px solid #bbf7d0' }}>
            {success}
          </div>
        )}

        <form onSubmit={handleOnboard}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Company Name</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Acme Corp" required style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Initial Max Allowed Seats</label>
              <input type="number" name="maxAllowedUsers" value={formData.maxAllowedUsers} onChange={handleChange} min="1" required style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Client Admin Name</label>
              <input type="text" name="clientAdminName" value={formData.clientAdminName} onChange={handleChange} placeholder="John Doe" required style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Client Admin Email</label>
              <input type="email" name="clientAdminEmail" value={formData.clientAdminEmail} onChange={handleChange} placeholder="clientadmin@acme.com" required style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Client Admin Initial Password</label>
            <input type="password" name="clientAdminPassword" value={formData.clientAdminPassword} onChange={handleChange} placeholder="••••••••••••" required style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Onboarding...' : 'Onboard Tenant & Create Admin Account'}
          </button>
        </form>
      </div>

      {/* Tenant List Table */}
      <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '32px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={20} color="#2563eb" /> Registered Client Subscriptions
          </h2>
          <button onClick={fetchTenants} style={{ background: '#f1f5f9', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px' }}>Company</th>
              <th style={{ padding: '12px' }}>Seats Usage</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((t) => (
              <tr key={t._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{t.companyName}</td>
                <td style={{ padding: '12px' }}>{t.activeUsersCount || 0} / {t.maxAllowedUsers} Seats</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', backgroundColor: t.status === 'active' ? '#dcfce7' : '#fee2e2', color: t.status === 'active' ? '#15803d' : '#b91c1c' }}>
                    {t.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <button onClick={() => toggleStatus(t._id, t.status)} style={{ padding: '4px 10px', borderRadius: '4px', border: 'none', fontSize: '12px', cursor: 'pointer', backgroundColor: t.status === 'active' ? '#fef2f2' : '#f0fdf4', color: t.status === 'active' ? '#dc2626' : '#16a34a' }}>
                    {t.status === 'active' ? 'Suspend Tenant' : 'Activate Tenant'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Audit Log Table */}
      <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} color="#2563eb" /> Security & Platform Audit Trail Logs
          </h2>
          <button onClick={fetchAuditLogs} style={{ background: '#f1f5f9', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
            <RefreshCw size={14} /> Refresh Logs
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '10px' }}>Timestamp</th>
              <th style={{ padding: '10px' }}>Action Event</th>
              <th style={{ padding: '10px' }}>Tenant Client</th>
              <th style={{ padding: '10px' }}>Details</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '16px', color: '#94a3b8' }}>No audit logs recorded yet.</td>
              </tr>
            ) : (
              auditLogs.map((log) => (
                <tr key={log._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px', color: '#64748b' }}>{new Date(log.createdAt).toLocaleString()}</td>
                  <td style={{ padding: '10px', fontWeight: 'bold', color: log.action.includes('SUSPENDED') ? '#dc2626' : '#2563eb' }}>{log.action}</td>
                  <td style={{ padding: '10px' }}>{log.clientId?.companyName || 'Global'}</td>
                  <td style={{ padding: '10px', color: '#334155' }}>{log.details}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperAdmin;