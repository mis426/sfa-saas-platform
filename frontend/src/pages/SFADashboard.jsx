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
  Plus
} from 'lucide-react';

// Safe Auth Hook with Fallback to localStorage
const getAuthToken = () => {
  return localStorage.getItem('jwt_token') || localStorage.getItem('token') || '';
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

  // Form States - Lead
  const [clientName, setClientName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [leadValue, setLeadValue] = useState('');
  const [leadMsg, setLeadMsg] = useState({ type: '', text: '' });

  // Form States - Order
  const [customerName, setCustomerName] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [customProductName, setCustomProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState('');
  const [orderMsg, setOrderMsg] = useState({ type: '', text: '' });

  // Form States - Product SKU
  const [prodName, setProdName] = useState('');
  const [prodSku, setProdSku] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodStock, setProdStock] = useState('');

  // GPS Check-In State
  const [gpsStatus, setGpsStatus] = useState('');
  const [gpsClientName, setGpsClientName] = useState('');

  const fetchSFAData = async () => {
    try {
      setLoading(true);
      const activeToken = getAuthToken();
      const headers = { Authorization: `Bearer ${activeToken}` };
      const [analyticsRes, leadsRes, ordersRes, productsRes, visitsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/sfa/analytics', { headers }),
        axios.get('http://localhost:5000/api/sfa/leads', { headers }),
        axios.get('http://localhost:5000/api/sfa/orders', { headers }),
        axios.get('http://localhost:5000/api/sfa/products', { headers }),
        axios.get('http://localhost:5000/api/sfa/visits', { headers })
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

  // Handle Product Select change
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
        'http://localhost:5000/api/sfa/leads',
        { clientName, contactPerson, phone, value: parseFloat(leadValue) || 0 },
        { headers: { Authorization: `Bearer ${getAuthToken()}` } }
      );
      setLeadMsg({ type: 'success', text: 'Lead recorded successfully!' });
      setClientName('');
      setContactPerson('');
      setPhone('');
      setLeadValue('');
      fetchSFAData();
    } catch (err) {
      setLeadMsg({ type: 'error', text: 'Failed to record lead.' });
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/sfa/products',
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
        'http://localhost:5000/api/sfa/orders',
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
      setOrderMsg({ type: 'success', text: 'Order placed & stock updated!' });
      setCustomerName('');
      setSelectedProductId('');
      setCustomProductName('');
      setQuantity(1);
      setUnitPrice('');
      fetchSFAData();
    } catch (err) {
      setOrderMsg({ type: 'error', text: 'Failed to place order.' });
    }
  };

  // GPS Check-In Execution
  const handleGPSCheckIn = () => {
    if (!navigator.geolocation) {
      setGpsStatus('Geolocation is not supported by your browser.');
      return;
    }
    setGpsStatus('Capturing current GPS coordinates...');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await axios.post(
            'http://localhost:5000/api/sfa/checkin',
            {
              clientName: gpsClientName || 'Field Visit Check-In',
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              notes: `Checked in via browser GPS (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`
            },
            { headers: { Authorization: `Bearer ${getAuthToken()}` } }
          );
          setGpsStatus(`✓ Check-In Success! (Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)})`);
          setGpsClientName('');
          fetchSFAData();
        } catch (err) {
          setGpsStatus('Failed to log GPS check-in on server.');
        }
      },
      (err) => setGpsStatus(`GPS Error: ${err.message}`)
    );
  };

  // Printable Invoice Function
  const handlePrintInvoice = (order) => {
    const printWin = window.open('', '_blank');
    printWin.document.write(`
      <html>
        <head>
          <title>Invoice #${order._id.slice(-6)}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; }
            .header { border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-bottom: 20px; }
            .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .table th, .table td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
            .table th { background: #f8fafc; }
            .total { text-align: right; margin-top: 20px; font-size: 18px; color: #16a34a; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>SALES INVOICE</h2>
            <p><strong>Invoice ID:</strong> #${order._id.toString().toUpperCase()}</p>
            <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Customer:</strong> ${order.customerName}</p>
          </div>
          <table class="table">
            <thead>
              <tr><th>Item</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr>
            </thead>
            <tbody>
              ${order.items.map(i => `
                <tr>
                  <td>${i.productName}</td>
                  <td>${i.quantity}</td>
                  <td>$${i.unitPrice}</td>                   <td>$${i.quantity * i.unitPrice}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total">
            <strong>Grand Total: $${order.totalAmount}</strong>
          </div>
        </body>
      </html>
    `);
    printWin.document.close();
    printWin.print();
  };

  // Export CSV Functionality
  const exportOrdersToCSV = () => {
    if (!orders.length) return alert('No orders available to export!');
    const headers = ['Order ID,Customer Name,Total Amount ($),Created Date\n'];
    const rows = orders.map(o => `"${o._id}","${o.customerName}",${o.totalAmount},"${new Date(o.createdAt).toLocaleDateString()}"`);
    const blob = new Blob([headers.concat(rows.join('\n')).join('')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `SFA_Orders_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    a.click();
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', padding: '32px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '26px', color: '#0f172a', margin: '0 0 4px 0' }}>
              Sales Force Automation (SFA) Enterprise Hub
            </h1>
            <p style={{ color: '#64748b', margin: 0 }}>Leads tracking, SKU product catalog, field GPS visits, and order invoicing.</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={exportOrdersToCSV} 
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', color: '#16a34a' }}
            >
              <Download size={16} /> Export Orders CSV
            </button>
            <button 
              onClick={fetchSFAData} 
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', color: '#334155' }}
            >
              <RefreshCw size={16} /> Refresh SFA
            </button>
          </div>
        </div>

        {/* Analytics KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <div style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontSize: '12px' }}>Total Revenue</span>
            <h2 style={{ fontSize: '22px', color: '#16a34a', margin: '6px 0 0 0' }}>${analytics.totalRevenue.toLocaleString()}</h2>
          </div>
          <div style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontSize: '12px' }}>Orders Placed</span>
            <h2 style={{ fontSize: '22px', color: '#2563eb', margin: '6px 0 0 0' }}>{analytics.totalOrdersCount}</h2>
          </div>
          <div style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontSize: '12px' }}>Active Leads</span>
            <h2 style={{ fontSize: '22px', color: '#d97706', margin: '6px 0 0 0' }}>{analytics.totalLeads}</h2>
          </div>
          <div style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontSize: '12px' }}>Conversion Rate</span>
            <h2 style={{ fontSize: '22px', color: '#9333ea', margin: '6px 0 0 0' }}>{analytics.conversionRate}%</h2>
          </div>
          <div style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontSize: '12px' }}>GPS Field Check-ins</span>
            <h2 style={{ fontSize: '22px', color: '#0284c7', margin: '6px 0 0 0' }}>{analytics.visitsCount}</h2>
          </div>
        </div>

        {/* GPS Field Check-In Banner */}
        <div style={{ background: '#0f172a', color: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={20} color="#38bdf8" /> Field Sales Rep Live GPS Check-In
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>Log instant geolocation check-ins during on-site customer visits.</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input 
              type="text" 
              placeholder="Client / Location Name" 
              value={gpsClientName} 
              onChange={(e) => setGpsClientName(e.target.value)} 
              style={{ padding: '8px 12px', border: '1px solid #334155', borderRadius: '6px', background: '#1e293b', color: '#fff', fontSize: '13px' }} 
            />
            <button onClick={handleGPSCheckIn} style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} /> Submit Check-In
            </button>
          </div>
        </div>
        {gpsStatus && <p style={{ fontSize: '12px', color: '#0284c7', marginTop: '-20px', marginBottom: '24px', fontWeight: 'bold' }}>{gpsStatus}</p>}

        {/* Action Forms Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          
          {/* Create Sales Lead */}
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <UserPlus size={16} color="#2563eb" /> Log Sales Lead
            </h3>
            {leadMsg.text && <div style={{ padding: '6px', fontSize: '11px', marginBottom: '8px', backgroundColor: leadMsg.type === 'success' ? '#f0fdf4' : '#fef2f2', color: leadMsg.type === 'success' ? '#16a34a' : '#dc2626' }}>{leadMsg.text}</div>}
            <form onSubmit={handleCreateLead} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" placeholder="Company Name" value={clientName} onChange={(e) => setClientName(e.target.value)} required style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              <input type="text" placeholder="Contact Person" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} required style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              <input type="number" placeholder="Est. Deal Value ($)" value={leadValue} onChange={(e) => setLeadValue(e.target.value)} required style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Save Lead</button>
            </form>
          </div>

          {/* Catalog SKU Management */}
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Package size={16} color="#d97706" /> Add Product SKU
            </h3>
            <form onSubmit={handleCreateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" placeholder="Product Name" value={prodName} onChange={(e) => setProdName(e.target.value)} required style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              <input type="text" placeholder="SKU Code" value={prodSku} onChange={(e) => setProdSku(e.target.value)} required style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="number" placeholder="Price ($)" value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} required style={{ flex: 1, padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
                <input type="number" placeholder="Stock Qty" value={prodStock} onChange={(e) => setProdStock(e.target.value)} required style={{ flex: 1, padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              </div>
              <button type="submit" style={{ backgroundColor: '#d97706', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Add SKU to Catalog</button>
            </form>
          </div>

          {/* Place Order */}
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShoppingCart size={16} color="#16a34a" /> Place Sales Order
            </h3>
            {orderMsg.text && <div style={{ padding: '6px', fontSize: '11px', marginBottom: '8px', backgroundColor: orderMsg.type === 'success' ? '#f0fdf4' : '#fef2f2', color: orderMsg.type === 'success' ? '#16a34a' : '#dc2626' }}>{orderMsg.text}</div>}
            <form onSubmit={handleCreateOrder} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              <select value={selectedProductId} onChange={handleProductSelect} style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }}>
                <option value="">-- Select SKU from Catalog --</option>
                {products.map(p => (
                  <option key={p._id} value={p._id}>{p.name} ({p.sku}) - ${p.price} [Stock: {p.stock}]</option>
                ))}
              </select>
              {!selectedProductId && (
                <input type="text" placeholder="Or enter product name manually" value={customProductName} onChange={(e) => setCustomProductName(e.target.value)} required style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              )}
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="number" min="1" placeholder="Qty" value={quantity} onChange={(e) => setQuantity(e.target.value)} required style={{ flex: 1, padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
                <input type="number" placeholder="Unit Price ($)" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} required style={{ flex: 1, padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              </div>
              <button type="submit" style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Submit Order</button>
            </form>
          </div>

        </div>

        {/* Data Tables */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          {/* Orders & Print Invoice Table */}
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#1e293b', fontSize: '16px' }}>🛒 Placed Orders & Invoices</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '8px' }}>Order ID</th>
                  <th style={{ padding: '8px' }}>Customer</th>
                  <th style={{ padding: '8px' }}>Amount</th>
                  <th style={{ padding: '8px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr><td colSpan="4" style={{ textAlign: 'center', padding: '12px', color: '#94a3b8' }}>No orders placed.</td></tr>
                ) : (
                  orders.map((o) => (
                    <tr key={o._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '8px', fontWeight: 'bold' }}>#{o._id.slice(-6)}</td>
                      <td style={{ padding: '8px' }}>{o.customerName}</td>
                      <td style={{ padding: '8px', fontWeight: 'bold', color: '#16a34a' }}>${o.totalAmount}</td>
                      <td style={{ padding: '8px' }}>
                        <button onClick={() => handlePrintInvoice(o)} style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 'bold' }}>
                          <Printer size={12}/> Invoice
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* GPS Visits Log Table */}
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#1e293b', fontSize: '16px' }}>📍 Field Check-In Logs</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '8px' }}>Client/Site</th>
                  <th style={{ padding: '8px' }}>Coordinates</th>
                  <th style={{ padding: '8px' }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {visits.length === 0 ? (
                  <tr><td colSpan="3" style={{ textAlign: 'center', padding: '12px', color: '#94a3b8' }}>No GPS visits recorded.</td></tr>
                ) : (
                  visits.map((v) => (
                    <tr key={v._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '8px', fontWeight: 'bold' }}>{v.clientName}</td>
                      <td style={{ padding: '8px', fontFamily: 'monospace', color: '#0284c7' }}>
                        {v.location?.lat?.toFixed(4)}, {v.location?.lng?.toFixed(4)}
                      </td>
                      <td style={{ padding: '8px', color: '#64748b' }}>
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
  );
};

export default SFADashboard;