import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { 
  Users, 
  UserPlus, 
  ShieldAlert, 
  Award, 
  RefreshCw, 
  CheckCircle2, 
  CreditCard, 
  History 
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { token, user } = useAuthStore();

  // Role Restriction Guard: Standard field reps (USER) are redirected to SFA Hub
  useEffect(() => {
    if (user && user.role?.toLowerCase() === 'user') {
      navigate('/sfa', { replace: true });
    }
  }, [user, navigate]);

  const [teamData, setTeamData] = useState({ 
    tenantName: '', 
    maxAllowedUsers: 0, 
    activeUsersCount: 0, 
    users: [] 
  });
  const [billingHistory, setBillingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Team Member Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [formMsg, setFormMsg] = useState({ type: '', text: '' });
  const [submitting, setSubmitting] = useState(false);

  // Upgrade Seats Form State
  const [additionalSeats, setAdditionalSeats] = useState(1);
  const [upgradeMsg, setUpgradeMsg] = useState({ type: '', text: '' });
  const [upgrading, setUpgrading] = useState(false);

  // Fetch Team & Seat Data
  const fetchTeam = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get('https://sfa-saas-platform.onrender.com/api/client/team', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTeamData(res.data);
    } catch (err) {
      console.error('Fetch Team Error:', err);
      setError(err.response?.data?.error || 'Failed to load client team details.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Billing History
  const fetchBillingHistory = async () => {
    try {
      const res = await axios.get('https://sfa-saas-platform.onrender.com/api/billing/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBillingHistory(res.data);
    } catch (err) {
      console.error('Fetch Billing History Error:', err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTeam();
      fetchBillingHistory();
    }
  }, [token]);

  // Handle Add Team Member
  const handleAddMember = async (e) => {
    e.preventDefault();
    setFormMsg({ type: '', text: '' });
    setSubmitting(true);

    try {
      await axios.post(
        'https://sfa-saas-platform.onrender.com/api/client/team',
        { name, email, password, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFormMsg({ type: 'success', text: `🎉 Successfully invited ${name} (${email}) to the team!` });
      setName('');
      setEmail('');
      setPassword('');
      setRole('user');
      fetchTeam();
    } catch (err) {
      console.error('Add Member Error:', err);
      setFormMsg({ 
        type: 'error', 
        text: err.response?.data?.error || 'Failed to add team member. Check seat limits.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Upgrade Seat Allocation
  const handleSeatUpgrade = async (e) => {
    e.preventDefault();
    setUpgradeMsg({ type: '', text: '' });
    setUpgrading(true);

    try {
      const res = await axios.post(
        'https://sfa-saas-platform.onrender.com/api/billing/upgrade-seats',
        { additionalSeats: parseInt(additionalSeats, 10), planType: 'Pro' },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUpgradeMsg({ type: 'success', text: res.data.message });
      setAdditionalSeats(1);
      fetchTeam();
      fetchBillingHistory();
    } catch (err) {
      console.error('Upgrade Seats Error:', err);
      setUpgradeMsg({ 
        type: 'error', 
        text: err.response?.data?.error || 'Failed to process seat upgrade.' 
      });
    } finally {
      setUpgrading(false);
    }
  };

  const usagePercent = teamData.maxAllowedUsers > 0 
    ? Math.min(Math.round((teamData.activeUsersCount / teamData.maxAllowedUsers) * 100), 100) 
    : 0;

  const isLimitReached = teamData.activeUsersCount >= teamData.maxAllowedUsers;

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1100px', margin: '32px auto', padding: '0 20px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '26px', color: '#0f172a', margin: '0 0 4px 0' }}>
              {teamData.tenantName ? `${teamData.tenantName} Portal` : 'Client Dashboard'}
            </h1>
            <p style={{ color: '#64748b', margin: 0 }}>Manage team access, roles, seat capacity, and billing invoices.</p>
          </div>
          <button 
            onClick={() => { fetchTeam(); fetchBillingHistory(); }} 
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', color: '#334155' }}
          >
            <RefreshCw size={16} /> Refresh Data
          </button>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fef2f2', color: '#dc2626', padding: '16px', borderRadius: '8px', border: '1px solid #fecaca', marginBottom: '24px' }}>
            {error}
          </div>
        )}

        {/* Metrics & Seat Upgrade Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          
          {/* Seat Quota Card */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748b', fontSize: '14px', marginBottom: '8px' }}>
              <span>Subscription Seat Usage</span>
              <Users size={20} color="#2563eb" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>
              {teamData.activeUsersCount} <span style={{ fontSize: '16px', color: '#64748b', fontWeight: 'normal' }}>/ {teamData.maxAllowedUsers} Seats</span>
            </div>
            <div style={{ backgroundColor: '#e2e8f0', borderRadius: '999px', height: '8px', overflow: 'hidden', marginTop: '16px' }}>
              <div 
                style={{ 
                  width: `${usagePercent}%`, 
                  backgroundColor: usagePercent >= 100 ? '#ef4444' : usagePercent >= 80 ? '#f59e0b' : '#22c55e', 
                  height: '100%',
                  transition: 'width 0.3s ease'
                }}
              ></div>
            </div>
            <div style={{ fontSize: '12px', color: isLimitReached ? '#dc2626' : '#64748b', marginTop: '8px', fontWeight: isLimitReached ? 'bold' : 'normal' }}>
              {isLimitReached ? '⚠️ Seat limit reached. Upgrade plan below.' : `${teamData.maxAllowedUsers - teamData.activeUsersCount} seat(s) remaining`}
            </div>
          </div>

          {/* Seat Upgrade Form Card */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748b', fontSize: '14px', marginBottom: '12px' }}>
              <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Upgrade Seat Capacity</span>
              <CreditCard size={20} color="#2563eb" />
            </div>

            {upgradeMsg.text && (
              <div style={{ padding: '8px 12px', borderRadius: '6px', marginBottom: '12px', backgroundColor: upgradeMsg.type === 'success' ? '#f0fdf4' : '#fef2f2', color: upgradeMsg.type === 'success' ? '#16a34a' : '#dc2626', fontSize: '12px' }}>
                {upgradeMsg.text}
              </div>
            )}

            <form onSubmit={handleSeatUpgrade} style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="number" 
                min="1" 
                value={additionalSeats} 
                onChange={(e) => setAdditionalSeats(e.target.value)} 
                required 
                style={{ width: '80px', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
              <button 
                type="submit" 
                disabled={upgrading}
                style={{ flex: 1, backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: upgrading ? 'not-allowed' : 'pointer' }}
              >
                {upgrading ? 'Processing...' : `Add Seats ($${additionalSeats * 10})`}
              </button>
            </form>
            <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '8px', margin: '8px 0 0 0' }}>Instant activation at $10 per additional user seat.</p>
          </div>

          {/* User Account Card */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748b', fontSize: '14px', marginBottom: '8px' }}>
              <span>Active Session</span>
              <Award size={20} color="#16a34a" />
            </div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', wordBreak: 'break-all' }}>
              {user?.email}
            </div>
            <div style={{ marginTop: '16px' }}>
              <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Role: {user?.role}
              </span>
            </div>
          </div>

        </div>

        {/* Invite Member Section */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', marginBottom: '32px' }}>
          <h3 style={{ marginTop: 0, color: '#1e293b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserPlus size={20} /> Invite Team Member
          </h3>

          {formMsg.text && (
            <div style={{ padding: '12px', borderRadius: '6px', marginBottom: '16px', backgroundColor: formMsg.type === 'success' ? '#f0fdf4' : '#fef2f2', color: formMsg.type === 'success' ? '#16a34a' : '#dc2626', border: `1px solid ${formMsg.type === 'success' ? '#bbf7d0' : '#fecaca'}`, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {formMsg.type === 'success' ? <CheckCircle2 size={18} /> : <ShieldAlert size={18} />}
              {formMsg.text}
            </div>
          )}

          <form onSubmit={handleAddMember} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>Full Name</label>
              <input
                type="text"
                placeholder="John Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>Work Email</label>
              <input
                type="email"
                placeholder="john@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>Initial Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>Assign Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box', backgroundColor: '#fff' }}
              >
                <option value="user">User (Standard Access)</option>
                <option value="admin">Admin (Team Management)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting || isLimitReached}
              style={{
                gridColumn: 'span 2',
                padding: '12px',
                backgroundColor: isLimitReached ? '#94a3b8' : '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: (submitting || isLimitReached) ? 'not-allowed' : 'pointer',
                marginTop: '8px'
              }}
            >
              {submitting ? 'Creating User...' : isLimitReached ? 'Seat Limit Reached (Upgrade Seats Above)' : 'Add Team Member'}
            </button>
          </form>
        </div>

        {/* Registered Members Table */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', marginBottom: '32px' }}>
          <h3 style={{ marginTop: 0, color: '#1e293b', marginBottom: '16px' }}>📋 Registered Organization Members</h3>

          {loading ? (
            <p style={{ textAlign: 'center', color: '#64748b', padding: '20px 0' }}>Loading team members...</p>
          ) : teamData.users.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#64748b', padding: '20px 0' }}>No members registered yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '12px' }}>Name</th>
                  <th style={{ padding: '12px' }}>Email</th>
                  <th style={{ padding: '12px' }}>Role</th>
                </tr>
              </thead>
              <tbody>
                {teamData.users.map((member) => (
                  <tr key={member._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px', fontWeight: '600' }}>{member.name || 'N/A'}</td>
                    <td style={{ padding: '12px', color: '#334155' }}>{member.email}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ 
                        backgroundColor: member.role === 'admin' ? '#dbeafe' : '#f1f5f9', 
                        color: member.role === 'admin' ? '#1e40af' : '#475569', 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '12px', 
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }}>
                        {member.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Subscription Billing History Table */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h3 style={{ marginTop: 0, color: '#1e293b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <History size={20} color="#2563eb" /> Subscription Billing History
          </h3>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '12px' }}>Date</th>
                <th style={{ padding: '12px' }}>Transaction ID</th>
                <th style={{ padding: '12px' }}>Seats Added</th>
                <th style={{ padding: '12px' }}>Amount Paid</th>
                <th style={{ padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>No seat upgrade transactions recorded yet.</td>
                </tr>
              ) : (
                billingHistory.map((inv) => (
                  <tr key={inv._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px', color: '#64748b' }}>{new Date(inv.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '12px', fontWeight: 'bold', fontFamily: 'monospace' }}>{inv.transactionId}</td>
                    <td style={{ padding: '12px' }}>+{inv.additionalSeatsRequested} Seats</td>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: '#16a34a' }}>${inv.amountPaid}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold' }}>
                        {inv.paymentStatus.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;