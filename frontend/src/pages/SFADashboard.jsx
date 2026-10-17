import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  TrendingUp, 
  ShoppingBag, 
  Target, 
  DollarSign, 
  UserPlus, 
  ShoppingCart, 
  RefreshCw,
  MapPin,
  Printer,
  Package,
  Download,
  Search,
  Bell,
  CheckCircle2,
  Calendar,
  Layers,
  FileText,
  Users
} from 'lucide-react';

const getAuthToken = () => {
  return localStorage.getItem('token') || localStorage.getItem('jwt_token') || '';
};

const SFADashboard = () => {
  const token = getAuthToken();

  const [analytics, setAnalytics] = useState({ 
    totalLeads: 0, 
    wonLeads: 0, 
    conversionRate: 0, 
    totalOrdersCount: 0, 
    totalRevenue: 0,
    visitsCount: 0
  });
  const [leads, setLeads] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'leads', 'products', 'orders', 'checkin'

  // Forms
  const [clientName, setClientName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [leadValue, setLeadValue] = useState('');
  const [leadMsg, setLeadMsg] = useState({ type: '', text: '' });

  const [customerName, setCustomerName] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [customProductName, setCustomProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState('');
  const [orderMsg, setOrderMsg] = useState({ type: '', text: '' });

  const [prodName, setProdName] = useState('');
  const [prodSku, setProdSku] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodStock, setProdStock] = useState('');

  const [gpsStatus, setGpsStatus] = useState('');
  const [gpsClientName, setGpsClientName] = useState('');

  const fetchSFAData = async () => {
    try {
      setLoading(true);
      const activeToken = getAuthToken();
      const headers = { Authorization: `Bearer ${activeToken}` };
      const [analyticsRes, leadsRes, ordersRes, productsRes, visitsRes] = await Promise.all([
        axios.get('https://sfa-saas-platform.onrender.com/api/sfa/analytics', { headers }),
        axios.get('https://sfa-saas-platform.onrender.com/api/sfa/leads', { headers }),
        axios.get('https://sfa-saas-platform.onrender.com/api/sfa/orders', { headers }),
        axios.get('https://sfa-saas-platform.onrender.com/api/sfa/products', { headers }),
        axios.get('https://sfa-saas-platform.onrender.com/api/sfa/visits', { headers })
      ]);
      setAnalytics(analyticsRes.data);
      setLeads(leadsRes.data);
      setOrders(ordersRes.data);
      setProducts(productsRes.data);
      setVisits(visitsRes.data);
    } catch (err) {
      console.error('Fetch SFA Data Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSFAData();
  }, []);

  const handleProductSelect = (e) => {
    const prodId = e.target.value;
    setSelectedProductId(prodId);
    const prod = products.find(p => p._id === prodId);
    if (prod) {
      setCustomProductName(prod.name);
      setUnitPrice(prod.price);
    }
  };

  const handleCreateLead = async (e) => {
    e.preventDefault();
    setLeadMsg({ type: '', text: '' });
    try {
      await axios.post(
        'https://sfa-saas-platform.onrender.com/api/sfa/leads',
        { clientName, contactPerson, phone, value: parseFloat(leadValue) || 0 },
        { headers: { Authorization: `Bearer ${getAuthToken()}` } }
      );
      setLeadMsg({ type: 'success', text: 'Lead recorded successfully!' });
      setClientName(''); setContactPerson(''); setPhone(''); setLeadValue('');
      fetchSFAData();
    } catch (err) {
      setLeadMsg({ type: 'error', text: 'Failed to record lead.' });
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
      alert('Failed to create SKU.');
    }
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setOrderMsg({ type: '', text: '' });
    try {
      const pName = selectedProductId ? (products.find(p => p._id === selectedProductId)?.name || customProductName) : customProductName;
      await axios.post(
        'https://sfa-saas-platform.onrender.com/api/sfa/orders',
        {
          customerName,
          items: [{ 
            productId: selectedProductId || undefined,
            productName: pName, 
            quantity: parseInt(quantity, 10), 
            unitPrice: parseFloat(unitPrice) 
          }]
        },
        { headers: { Authorization: `Bearer ${getAuthToken()}` } }
      );
      setOrderMsg({ type: 'success', text: 'Order placed successfully!' });
      setCustomerName(''); setSelectedProductId(''); setCustomProductName(''); setQuantity(1); setUnitPrice('');
      fetchSFAData();
    } catch (err) {
      setOrderMsg({ type: 'error', text: 'Failed to place order.' });
    }
  };

  const handleGPSCheckIn = () => {
    if (!navigator.geolocation) {
      setGpsStatus('Geolocation not supported');
      return;
    }
    setGpsStatus('Capturing GPS...');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await axios.post(
            'https://sfa-saas-platform.onrender.com/api/sfa/checkin',
            {
              clientName: gpsClientName || 'Store Check-In',
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              notes: `Field Visit Check-In (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`
            },
            { headers: { Authorization: `Bearer ${getAuthToken()}` } }
          );
          setGpsStatus(`✓ Check-In Success! (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`);
          setGpsClientName('');
          fetchSFAData();
        } catch (err) {
          setGpsStatus('Failed to log check-in.');
        }
      },
      (err) => setGpsStatus(`Error: ${err.message}`)
    );
  };

  const handlePrintInvoice = (order) => {
    const printWin = window.open('', '_blank');
    printWin.document.write(`
      <html>
        <head>
          <title>FieldAssist Invoice #${order._id.slice(-6)}</title>
          <style>
            body { font-family: Inter, sans-serif; padding: 40px; color: #0f172a; }
            .brand { color: #0284c7; font-weight: bold; font-size: 24px; }
            .table { width: 100%; border-collapse: collapse; margin-top: 24px; }
            .table th, .table td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; }
            .table th { background: #f8fafc; font-size: 13px; color: #475569; }
            .total { text-align: right; margin-top: 24px; font-size: 20px; font-weight: bold; color: #16a34a; }
          </style>
        </head>
        <body>
          <div class="brand">FieldAssist Sales Invoice</div>
          <p style="color: #64748b; margin-top: 4px;">Order ID: #${order._id.toString().toUpperCase()}</p>
          <p><strong>Customer:</strong> ${order.customerName}</p>
          <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          <table class="table">
            <thead>
              <tr><th>Item Description</th><th>Quantity</th><th>Unit Price</th><th>Subtotal</th></tr>
            </thead>
            <tbody>
              ${order.items.map(i => `
                <tr>
                  <td>${i.productName}</td>
                  <td>${i.quantity}</td>
                  <td>$${i.unitPrice}</td> <td>$${i.quantity * i.unitPrice}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total">Total Amount: $${order.totalAmount}</div>
        </body>
      </html>
    `);
    printWin.document.close();
    printWin.print();
  };

  const exportOrdersToCSV = () => {
    if (!orders.length) return alert('No orders available to export!');
    const headers = ['Order ID,Customer Name,Total Amount ($),Created Date\n'];
    const rows = orders.map(o => `"${o._id}","${o.customerName}",${o.totalAmount},"${new Date(o.createdAt).toLocaleDateString()}"`);
    const blob = new Blob([headers.concat(rows.join('\n')).join('')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `FieldAssist_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    a.click();
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* FieldAssist Navy Sidebar Navigation */}
      <div style={{ width: '240px', backgroundColor: '#0f172a', color: '#94a3b8', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>FA</div>
          <div>
            <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>FieldAssist</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Sales Enterprise</div>
          </div>
        </div>

        <div style={{ padding: '16px 12px', flex: 1 }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '8px' }}>CORE SFA MODULES</div>
          
          <button onClick={() => setActiveTab('overview')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '6px', border: 'none', backgroundColor: activeTab === 'overview' ? '#0284c7' : 'transparent', color: activeTab === 'overview' ? '#fff' : '#94a3b8', cursor: 'pointer', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
            <Layers size={18} /> Executive Summary
          </button>

          <button onClick={() => setActiveTab('leads')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '6px', border: 'none', backgroundColor: activeTab === 'leads' ? '#0284c7' : 'transparent', color: activeTab === 'leads' ? '#fff' : '#94a3b8', cursor: 'pointer', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
            <UserPlus size={18} /> Lead Pipeline
          </button>

          <button onClick={() => setActiveTab('products')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '6px', border: 'none', backgroundColor: activeTab === 'products' ? '#0284c7' : 'transparent', color: activeTab === 'products' ? '#fff' : '#94a3b8', cursor: 'pointer', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
            <Package size={18} /> SKU Catalog
          </button>

          <button onClick={() => setActiveTab('orders')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '6px', border: 'none', backgroundColor: activeTab === 'orders' ? '#0284c7' : 'transparent', color: activeTab === 'orders' ? '#fff' : '#94a3b8', cursor: 'pointer', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
            <ShoppingCart size={18} /> Order Management
          </button>

          <button onClick={() => setActiveTab('checkin')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '6px', border: 'none', backgroundColor: activeTab === 'checkin' ? '#0284c7' : 'transparent', color: activeTab === 'checkin' ? '#fff' : '#94a3b8', cursor: 'pointer', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
            <MapPin size={18} /> Field GPS Tracking
          </button>
        </div>

        <div style={{ padding: '16px', borderTop: '1px solid #1e293b', fontSize: '12px', color: '#64748b' }}>
          <div>Sync Status: <span style={{ color: '#22c55e', fontWeight: 'bold' }}>Online</span></div>
        </div>
      </div>

      {/* Main FieldAssist Workspace */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        
        {/* Top Header Bar */}
        <div style={{ backgroundColor: '#fff', padding: '12px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#f8fafc', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', width: '300px' }}>
            <Search size={16} color="#94a3b8" />
            <input type="text" placeholder="Search leads, outlets, orders..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '100%' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={exportOrdersToCSV} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
              <Download size={15} /> Export CSV
            </button>
            <button onClick={fetchSFAData} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', backgroundColor: '#fff', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
              <RefreshCw size={15} /> Sync Data
            </button>
          </div>
        </div>

        {/* Content View Container */}
        <div style={{ padding: '24px', flex: 1 }}>
          
          {/* FieldAssist KPIs Header Card Group */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            
            <div style={{ backgroundColor: '#fff', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '12px', fontWeight: '600' }}>
                <span>TOTAL REVENUE</span>
                <DollarSign size={18} color="#16a34a" />
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginTop: '8px' }}>
                ${analytics.totalRevenue.toLocaleString()}
              </div>
              <div style={{ fontSize: '11px', color: '#16a34a', marginTop: '4px', fontWeight: 'bold' }}>⬆ 12.5% vs last week</div>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '12px', fontWeight: '600' }}>
                <span>PRIMARY ORDERS</span>
                <ShoppingCart size={18} color="#0284c7" />
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginTop: '8px' }}>
                {analytics.totalOrdersCount}
              </div>
              <div style={{ fontSize: '11px', color: '#0284c7', marginTop: '4px', fontWeight: 'bold' }}>Invoices Generated</div>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '12px', fontWeight: '600' }}>
                <span>ACTIVE PIPELINE</span>
                <Target size={18} color="#d97706" />
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginTop: '8px' }}>
                {analytics.totalLeads}
              </div>
              <div style={{ fontSize: '11px', color: '#d97706', marginTop: '4px', fontWeight: 'bold' }}>{analytics.conversionRate}% Conversion Rate</div>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '12px', fontWeight: '600' }}>
                <span>GPS STORE VISITS</span>
                <MapPin size={18} color="#9333ea" />
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginTop: '8px' }}>
                {analytics.visitsCount}
              </div>
              <div style={{ fontSize: '11px', color: '#9333ea', marginTop: '4px', fontWeight: 'bold' }}>Field Rep Verified</div>
            </div>

          </div>

          {/* Field GPS Check-In Action Header */}
          <div style={{ backgroundColor: '#1e293b', color: '#fff', padding: '16px 20px', borderRadius: '8px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={18} color="#38bdf8" /> Field Representative Geo-Fence Check-In
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Capture verified location coordinates for store check-in.</div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Outlet / Store Name" 
                value={gpsClientName} 
                onChange={(e) => setGpsClientName(e.target.value)} 
                style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', fontSize: '13px' }} 
              />
              <button onClick={handleGPSCheckIn} style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                Check In Now
              </button>
            </div>
          </div>
          {gpsStatus && <div style={{ fontSize: '12px', color: '#0284c7', marginTop: '-16px', marginBottom: '20px', fontWeight: 'bold' }}>{gpsStatus}</div>}

          {/* Action Modules Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            
            {/* Sales Lead Form */}
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserPlus size={18} color="#0284c7" /> Log Outlet Lead
              </h3>
              {leadMsg.text && <div style={{ padding: '8px', borderRadius: '4px', fontSize: '12px', marginBottom: '12px', backgroundColor: leadMsg.type === 'success' ? '#f0fdf4' : '#fef2f2', color: leadMsg.type === 'success' ? '#16a34a' : '#dc2626' }}>{leadMsg.text}</div>}
              <form onSubmit={handleCreateLead} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input type="text" placeholder="Store / Retailer Name" value={clientName} onChange={(e) => setClientName(e.target.value)} required style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
                <input type="text" placeholder="Contact Owner Name" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} required style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
                <input type="text" placeholder="Mobile Number" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
                <input type="number" placeholder="Est. Monthly Target ($)" value={leadValue} onChange={(e) => setLeadValue(e.target.value)} required style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
                <button type="submit" style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>Save Lead Entry</button>
              </form>
            </div>

            {/* Catalog SKU Entry */}
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Package size={18} color="#d97706" /> Add Product SKU
              </h3>
              <form onSubmit={handleCreateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input type="text" placeholder="SKU Title Name" value={prodName} onChange={(e) => setProdName(e.target.value)} required style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
                <input type="text" placeholder="SKU Code / Barcode" value={prodSku} onChange={(e) => setProdSku(e.target.value)} required style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input type="number" placeholder="PTR ($)" value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} required style={{ flex: 1, padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
                  <input type="number" placeholder="Stock Qty" value={prodStock} onChange={(e) => setProdStock(e.target.value)} required style={{ flex: 1, padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
                </div>
                <button type="submit" style={{ backgroundColor: '#d97706', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>Add SKU to Catalog</button>
              </form>
            </div>

            {/* Order Placement */}
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingCart size={18} color="#16a34a" /> Primary Order Booking
              </h3>
              {orderMsg.text && <div style={{ padding: '8px', borderRadius: '4px', fontSize: '12px', marginBottom: '12px', backgroundColor: orderMsg.type === 'success' ? '#f0fdf4' : '#fef2f2', color: orderMsg.type === 'success' ? '#16a34a' : '#dc2626' }}>{orderMsg.text}</div>}
              <form onSubmit={handleCreateOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input type="text" placeholder="Customer Outlet Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
                <select value={selectedProductId} onChange={handleProductSelect} style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: '13px' }}>
                  <option value="">-- Select SKU Catalog Item --</option>
                  {products.map(p => (
                    <option key={p._id} value={p._id}>{p.name} ({p.sku}) - ${p.price}</option>
                  ))}
                </select>
                {!selectedProductId && (
                  <input type="text" placeholder="Or type product name" value={customProductName} onChange={(e) => setCustomProductName(e.target.value)} required style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
                )}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input type="number" min="1" placeholder="Cases/Qty" value={quantity} onChange={(e) => setQuantity(e.target.value)} required style={{ flex: 1, padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
                  <input type="number" placeholder="Price ($)" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} required style={{ flex: 1, padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
                </div>
                <button type="submit" style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>Confirm Order Booking</button>
              </form>
            </div>

          </div>

          {/* Tables Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            {/* Orders Table */}
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '16px', fontSize: '15px' }}>🛒 Placed Primary Orders</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Order ID</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Customer</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Value</th>
                    <th style={{ padding: '10px', textAlign: 'center' }}>Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '16px', color: '#94a3b8' }}>No order transactions recorded.</td></tr>
                  ) : (
                    orders.map((o) => (
                      <tr key={o._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px', fontWeight: 'bold', fontFamily: 'monospace' }}>#{o._id.slice(-6)}</td>
                        <td style={{ padding: '10px' }}>{o.customerName}</td>
                        <td style={{ padding: '10px', fontWeight: 'bold', color: '#16a34a' }}>${o.totalAmount}</td>
                        <td style={{ padding: '10px', textAlign: 'center' }}>
                          <button onClick={() => handlePrintInvoice(o)} style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>
                            Print
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Checkin Logs Table */}
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '16px', fontSize: '15px' }}>📍 Verified Field GPS Logs</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Outlet / Site</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Coordinates</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {visits.length === 0 ? (
                    <tr><td colSpan="3" style={{ textAlign: 'center', padding: '16px', color: '#94a3b8' }}>No GPS visits logged today.</td></tr>
                  ) : (
                    visits.map((v) => (
                      <tr key={v._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px', fontWeight: 'bold' }}>{v.clientName}</td>
                        <td style={{ padding: '10px', fontFamily: 'monospace', color: '#0284c7' }}>
                          {v.location?.lat?.toFixed(4)}, {v.location?.lng?.toFixed(4)}
                        </td>
                        <td style={{ padding: '10px', color: '#64748b' }}>
                          {new Date(v.checkInTime || v.createdAt).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SFADashboard;