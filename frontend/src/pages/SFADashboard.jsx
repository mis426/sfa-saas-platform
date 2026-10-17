import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { 
  ShoppingBag, 
  Target, 
  DollarSign, 
  UserPlus, 
  ShoppingCart, 
  RefreshCw,
  MapPin,
  Package,
  Download,
  Search,
  Layers,
  Store,
  Network,
  Users,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Plus
} from 'lucide-react';

const getAuthToken = () => {
  return localStorage.getItem('token') || localStorage.getItem('jwt_token') || '';
};

const SFADashboard = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role?.toLowerCase() === 'admin' || user?.role?.toLowerCase() === 'superadmin';

  const [analytics, setAnalytics] = useState({ 
    totalLeads: 0, 
    totalOrdersCount: 0, 
    totalRevenue: 0,
    visitsCount: 0
  });
  const [leads, setLeads] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [visits, setVisits] = useState([]);
  const [distributors, setDistributors] = useState([
    { _id: 'dist_1', name: 'Metro Trade Distributors', city: 'Delhi' },
    { _id: 'dist_2', name: 'Apex FMCG Logistics', city: 'Mumbai' }
  ]);
  const [retailers, setRetailers] = useState([
    { _id: 'ret_1', storeName: 'Verma Departmental Store', owner: 'Ramesh Verma', distributor: 'Metro Trade Distributors' }
  ]);

  const [activeTab, setActiveTab] = useState('overview');

  // Form States
  const [clientName, setClientName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [leadValue, setLeadValue] = useState('');

  const [customerName, setCustomerName] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState('');

  const [prodName, setProdName] = useState('');
  const [prodSku, setProdSku] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodStock, setProdStock] = useState('');

  const [gpsStatus, setGpsStatus] = useState('');
  const [gpsClientName, setGpsClientName] = useState('');

  // Retailer Mapping Form
  const [retName, setRetName] = useState('');
  const [retOwner, setRetOwner] = useState('');
  const [retPhone, setRetPhone] = useState('');
  const [selectedDistributor, setSelectedDistributor] = useState('');

  const fetchSFAData = async () => {
    try {
      const activeToken = getAuthToken();
      const headers = { Authorization: `Bearer ${activeToken}` };
      const [analyticsRes, leadsRes, ordersRes, productsRes, visitsRes] = await Promise.all([
        axios.get('https://sfa-saas-platform.onrender.com/api/sfa/analytics', { headers }).catch(() => ({ data: { totalRevenue: 0, totalOrdersCount: 0, totalLeads: 0, visitsCount: 0 } })),
        axios.get('https://sfa-saas-platform.onrender.com/api/sfa/leads', { headers }).catch(() => ({ data: [] })),
        axios.get('https://sfa-saas-platform.onrender.com/api/sfa/orders', { headers }).catch(() => ({ data: [] })),
        axios.get('https://sfa-saas-platform.onrender.com/api/sfa/products', { headers }).catch(() => ({ data: [] })),
        axios.get('https://sfa-saas-platform.onrender.com/api/sfa/visits', { headers }).catch(() => ({ data: [] }))
      ]);
      setAnalytics(analyticsRes.data);
      setLeads(leadsRes.data);
      setOrders(ordersRes.data);
      setProducts(productsRes.data);
      setVisits(visitsRes.data);
    } catch (err) {
      console.error('Fetch SFA Error:', err);
    }
  };

  useEffect(() => {
    fetchSFAData();
  }, []);

  const handleProductSelect = (e) => {
    const prodId = e.target.value;
    setSelectedProductId(prodId);
    const prod = products.find(p => p._id === prodId);
    if (prod) setUnitPrice(prod.price);
  };

  const handleCreateLead = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://sfa-saas-platform.onrender.com/api/sfa/leads',
        { clientName, contactPerson, phone, value: parseFloat(leadValue) || 0 },
        { headers: { Authorization: `Bearer ${getAuthToken()}` } }
      );
      setClientName(''); setContactPerson(''); setPhone(''); setLeadValue('');
      fetchSFAData();
    } catch (err) {
      alert('Failed to save lead');
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://sfa-saas-platform.onrender.com/api/sfa/products',
        { name: prodName, sku: prodSku, price: prodPrice, stock: prodStock },
        { headers: { Authorization: `Bearer ${getAuthToken()}` } }
      );
      setProdName(''); setProdSku(''); setProdPrice(''); setProdStock('');
      fetchSFAData();
    } catch (err) {
      alert('Only Client Admin is authorized to modify Master SKU catalog.');
    }
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      const prod = products.find(p => p._id === selectedProductId);
      await axios.post(
        'https://sfa-saas-platform.onrender.com/api/sfa/orders',
        {
          customerName,
          items: [{ productId: selectedProductId, productName: prod?.name || 'Custom Item', quantity: parseInt(quantity, 10), unitPrice: parseFloat(unitPrice) }]
        },
        { headers: { Authorization: `Bearer ${getAuthToken()}` } }
      );
      setCustomerName(''); setSelectedProductId(''); setQuantity(1); setUnitPrice('');
      fetchSFAData();
    } catch (err) {
      alert('Failed to place order.');
    }
  };

  const handleAddRetailer = (e) => {
    e.preventDefault();
    setRetailers([...retailers, { _id: 'ret_' + Date.now(), storeName: retName, owner: retOwner, distributor: selectedDistributor }]);
    setRetName(''); setRetOwner(''); setRetPhone(''); setSelectedDistributor('');
  };

  const handleGPSCheckIn = () => {
    if (!navigator.geolocation) return setGpsStatus('Geolocation unavailable.');
    setGpsStatus('Capturing GPS...');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await axios.post(
            'https://sfa-saas-platform.onrender.com/api/sfa/checkin',
            { clientName: gpsClientName || 'Field Checkin', lat: pos.coords.latitude, lng: pos.coords.longitude },
            { headers: { Authorization: `Bearer ${getAuthToken()}` } }
          );
          setGpsStatus(`✓ Coordinates Verified (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`);
          setGpsClientName('');
          fetchSFAData();
        } catch (err) {
          setGpsStatus('GPS Checkin Failed.');
        }
      },
      (err) => setGpsStatus(err.message)
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      
      {/* VeloceSFA Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#0f172a', color: '#94a3b8', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>V</div>
          <div>
            <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px', letterSpacing: '0.5px' }}>VeloceSFA</div>
            <div style={{ fontSize: '11px', color: '#38bdf8' }}>Enterprise Field Hub</div>
          </div>
        </div>

        <div style={{ padding: '16px 12px', flex: 1 }}>
          <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '8px' }}>Sales Modules</div>
          
          {[
            { id: 'overview', label: 'Executive Summary', icon: <Layers size={18} /> },
            { id: 'leads', label: 'Lead Pipeline', icon: <UserPlus size={18} /> },
            { id: 'products', label: 'SKU Master Catalog', icon: <Package size={18} /> },
            { id: 'orders', label: 'Order Booking', icon: <ShoppingCart size={18} /> },
            { id: 'network', label: 'Retailer & Distributor', icon: <Network size={18} /> },
            { id: 'hierarchy', label: 'Sales Team Hierarchy', icon: <Users size={18} /> },
            { id: 'checkin', label: 'Geo-Tracking', icon: <MapPin size={18} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: activeTab === tab.id ? '#2563eb' : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#94a3b8',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500',
                marginBottom: '4px',
                textAlign: 'left'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div style={{ padding: '16px', borderTop: '1px solid #1e293b', fontSize: '12px', color: '#64748b' }}>
          Role Level: <span style={{ color: isAdmin ? '#38bdf8' : '#22c55e', fontWeight: 'bold' }}>{isAdmin ? 'Client Admin' : 'Field Sales Rep'}</span>
        </div>
      </div>

      {/* Main Panel Workspace */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Header */}
        <div style={{ backgroundColor: '#fff', padding: '12px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#f1f5f9', padding: '8px 12px', borderRadius: '6px', width: '280px' }}>
            <Search size={16} color="#94a3b8" />
            <input type="text" placeholder="Search accounts, SKUs, distributors..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '100%' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={fetchSFAData} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', backgroundColor: '#fff', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
              <RefreshCw size={15} /> Sync Network Data
            </button>
          </div>
        </div>

        {/* Dynamic Content Views */}
        <div style={{ padding: '24px', flex: 1 }}>
          
          {/* KPI Analytics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ backgroundColor: '#fff', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ color: '#64748b', fontSize: '12px', fontWeight: 'bold' }}>TOTAL REVENUE</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#16a34a', marginTop: '6px' }}>${analytics.totalRevenue.toLocaleString()}</div>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ color: '#64748b', fontSize: '12px', fontWeight: 'bold' }}>PRIMARY ORDERS</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb', marginTop: '6px' }}>{analytics.totalOrdersCount}</div>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ color: '#64748b', fontSize: '12px', fontWeight: 'bold' }}>RETAILER LEADS</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#d97706', marginTop: '6px' }}>{analytics.totalLeads}</div>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ color: '#64748b', fontSize: '12px', fontWeight: 'bold' }}>GEO STORE VISITS</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9333ea', marginTop: '6px' }}>{analytics.visitsCount}</div>
            </div>
          </div>

          {/* TAB 1: EXECUTIVE SUMMARY */}
          {(activeTab === 'overview' || activeTab === 'leads' || activeTab === 'orders') && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              
              {/* Lead Form */}
              <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <UserPlus size={18} color="#2563eb" /> Log Retailer Prospect Lead
                </h3>
                <form onSubmit={handleCreateLead} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input type="text" placeholder="Store Name" value={clientName} onChange={(e) => setClientName(e.target.value)} required style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                  <input type="text" placeholder="Contact Person" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} required style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                  <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                  <input type="number" placeholder="Est. Monthly Value ($)" value={leadValue} onChange={(e) => setLeadValue(e.target.value)} required style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                  <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Save Lead</button>
                </form>
              </div>

              {/* Order Form */}
              <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShoppingCart size={18} color="#16a34a" /> Primary Order Booking
                </h3>
                <form onSubmit={handleCreateOrder} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input type="text" placeholder="Outlet Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                  <select value={selectedProductId} onChange={handleProductSelect} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}>
                    <option value="">-- Select Master SKU --</option>
                    {products.map(p => (
                      <option key={p._id} value={p._id}>{p.name} ({p.sku}) - ${p.price}</option>
                    ))}
                  </select>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="number" min="1" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                    <input type="number" placeholder="Unit Price ($)" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} required style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                  </div>
                  <button type="submit" style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Book Primary Order</button>
                </form>
              </div>

            </div>
          )}

          {/* TAB 2: MASTER SKU CATALOG (RESTRICTED TO CLIENT ADMIN ONLY) */}
          {(activeTab === 'overview' || activeTab === 'products') && (
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Package size={18} color="#d97706" /> Master SKU Product Catalog
                </h3>
                {isAdmin ? (
                  <span style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
                    Client Admin Master Controls Active
                  </span>
                ) : (
                  <span style={{ backgroundColor: '#f1f5f9', color: '#64748b', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
                    Sales Rep View Only
                  </span>
                )}
              </div>

              {isAdmin && (
                <form onSubmit={handleCreateProduct} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '10px', marginBottom: '20px', backgroundColor: '#fffbeb', padding: '12px', borderRadius: '6px', border: '1px solid #fde68a' }}>
                  <input type="text" placeholder="Product Name" value={prodName} onChange={(e) => setProdName(e.target.value)} required style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                  <input type="text" placeholder="SKU Code" value={prodSku} onChange={(e) => setProdSku(e.target.value)} required style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                  <input type="number" placeholder="Price ($)" value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} required style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                  <input type="number" placeholder="Stock Qty" value={prodStock} onChange={(e) => setProdStock(e.target.value)} required style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                  <button type="submit" style={{ backgroundColor: '#d97706', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>+ Add SKU</button>
                </form>
              )}

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '10px', textAlign: 'left' }}>SKU Code</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Product Title</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>PTR Price</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Inventory Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '16px', color: '#94a3b8' }}>No master SKUs configured yet.</td></tr>
                  ) : (
                    products.map((p) => (
                      <tr key={p._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px', fontWeight: 'bold', fontFamily: 'monospace' }}>{p.sku}</td>
                        <td style={{ padding: '10px' }}>{p.name}</td>
                        <td style={{ padding: '10px', fontWeight: 'bold', color: '#16a34a' }}>${p.price}</td>
                        <td style={{ padding: '10px' }}>{p.stock} units</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: RETAILER & DISTRIBUTOR MAPPING ENGINE */}
          {(activeTab === 'network') && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginBottom: '24px' }}>
              
              <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Store size={18} color="#0284c7" /> Add Retailer & Map Distributor
                </h3>
                <form onSubmit={handleAddRetailer} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input type="text" placeholder="Retailer Store Name" value={retName} onChange={(e) => setRetName(e.target.value)} required style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                  <input type="text" placeholder="Store Owner Name" value={retOwner} onChange={(e) => setRetOwner(e.target.value)} required style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                  <select value={selectedDistributor} onChange={(e) => setSelectedDistributor(e.target.value)} required style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}>
                    <option value="">-- Map to Distributor --</option>
                    {distributors.map(d => (
                      <option key={d._id} value={d.name}>{d.name} ({d.city})</option>
                    ))}
                  </select>
                  <button type="submit" style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Save Retailer Mapping</button>
                </form>
              </div>

              <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#0f172a' }}>Mapped Retailer Outlet Directory</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Retail Outlet</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Owner</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Mapped Distributor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {retailers.map((r) => (
                      <tr key={r._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px', fontWeight: 'bold' }}>{r.storeName}</td>
                        <td style={{ padding: '10px' }}>{r.owner}</td>
                        <td style={{ padding: '10px', color: '#2563eb', fontWeight: '500' }}>{r.distributor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 4: SALES TEAM TOP-BOTTOM HIERARCHY */}
          {(activeTab === 'hierarchy') && (
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} color="#2563eb" /> Sales Force Top-Bottom Hierarchy Structure
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                
                <div style={{ border: '1px solid #2563eb', borderRadius: '6px', padding: '12px', backgroundColor: '#eff6ff' }}>
                  <div style={{ fontWeight: 'bold', color: '#1e40af', fontSize: '14px' }}>Level 1: National Sales Head</div>
                  <div style={{ fontSize: '12px', color: '#334155', marginTop: '4px' }}>superadmin@admin.com (Overall Territory Supervision)</div>
                </div>

                <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', padding: '12px', backgroundColor: '#f8fafc', marginLeft: '20px' }}>
                  <div style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '14px' }}>Level 2: Area Sales Manager (Client Admin)</div>
                  <div style={{ fontSize: '12px', color: '#334155', marginTop: '4px' }}>{user?.email} (Manages Distributors & Rep Quotas)</div>
                </div>

                <div style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '12px', backgroundColor: '#ffffff', marginLeft: '40px' }}>
                  <div style={{ fontWeight: 'bold', color: '#475569', fontSize: '14px' }}>Level 3: Field Sales Representatives</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>On-field Representatives executing store check-ins & order bookings.</div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 5: GEO-TRACKING CHECKIN */}
          {(activeTab === 'overview' || activeTab === 'checkin') && (
            <div style={{ backgroundColor: '#1e293b', color: '#fff', padding: '16px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={18} color="#38bdf8" /> Field Representative Geo-Fence Check-In
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Capture verified location coordinates for store check-in.</div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="Store Name" value={gpsClientName} onChange={(e) => setGpsClientName(e.target.value)} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', fontSize: '13px' }} />
                <button onClick={handleGPSCheckIn} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>Check In Now</button>
              </div>
            </div>
          )}
          {gpsStatus && <div style={{ fontSize: '12px', color: '#38bdf8', marginTop: '8px', fontWeight: 'bold' }}>{gpsStatus}</div>}

        </div>

      </div>

    </div>
  );
};

export default SFADashboard;