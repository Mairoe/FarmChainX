import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  ShoppingCart, Package, TrendingUp, Star, Filter, 
  Search, MapPin, Eye, ExternalLink, Plus, Users, 
  DollarSign, BarChart3, Clock, CheckCircle2, 
  AlertCircle, ArrowUpRight, ArrowDownRight, TrendingDown,
  Sprout, Truck
} from 'lucide-react';
import { Sidebar, Topbar } from '../../components/DashboardUI';
import '../../styles/RetailerDashboard.css';

// --- SHARED DOMAIN DATA (Farmer -> Distributor -> Retailer Workflow) ---
const CORE_PRODUCTS = {
  TOMATOES: { 
    name: 'Oxheart Heirloom Tomatoes', 
    producer: 'Sun Valley Organic Farm',
    distributor: 'Central Logistics Hub',
    price: '₹370/kg' 
  },
  OIL: { 
    name: 'Cold-Pressed Sunflower Oil', 
    producer: 'Golden Valley Millers',
    distributor: 'Eco-Express Distributors',
    price: '₹990/L' 
  },
  WHEAT: { 
    name: 'Ancient Spelt Grain', 
    producer: 'Heritage Highland Farms',
    distributor: 'Northern Bulk Distributors',
    price: '₹265/kg' 
  },
  HONEY: { 
    name: 'Wildflower Honey', 
    producer: 'Pure Bee Apiaries',
    distributor: 'Direct Logistics Co.',
    price: '₹1310/u' 
  },
};

const MARKET_LIST = [
  { ...CORE_PRODUCTS.TOMATOES, id: 1, stock: '500kg', cert: 'Organic', emoji: '🍅', origin: 'Mendoza Valley' },
  { ...CORE_PRODUCTS.OIL, id: 2, stock: '120L', cert: 'Eco-Cert', emoji: '🌻', origin: 'Central Plains' },
  { ...CORE_PRODUCTS.WHEAT, id: 3, stock: '2,000kg', cert: 'Bio-Verified', emoji: '🌾', origin: 'Upper Highlands' },
  { ...CORE_PRODUCTS.HONEY, id: 4, stock: '60 units', cert: 'Organic', emoji: '🍯', origin: 'Forest Reserve' },
];

const MY_STOCK = [
  { ...CORE_PRODUCTS.TOMATOES, id: 'STK-01', current: '42kg', status: 'Low', batch: 'FARM-BT-220A', sourceHub: 'Central Logistics Hub' },
  { ...CORE_PRODUCTS.OIL, id: 'STK-02', current: '85L', status: 'Optimal', batch: 'FARM-BT-112B', sourceHub: 'Eco-Express Distributors' },
  { ...CORE_PRODUCTS.HONEY, id: 'STK-03', current: '5 units', status: 'Critical', batch: 'FARM-BT-005C', sourceHub: 'Direct Logistics Co.' },
];

const RECENT_SALES = [
  { id: 'TX-101', item: CORE_PRODUCTS.TOMATOES.name, qty: '5kg', total: '₹1860', time: '10 mins ago', distributor: 'Central Logistics Hub' },
  { id: 'TX-102', item: CORE_PRODUCTS.OIL.name, qty: '2L', total: '₹1990', time: '1 hour ago', distributor: 'Eco-Express Distributors' },
  { id: 'TX-103', item: CORE_PRODUCTS.WHEAT.name, qty: '20kg', total: '₹5300', time: 'Yesterday', distributor: 'Northern Bulk Distributors' },
];

// --- SUB-VIEWS ---

// 1. Sourcing View: Retailer buys from DISTRIBUTORS (who bought from farmers)
const SourcingView = () => (
  <div className="fade-in-up">
    <div className="section-header" style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1a1a1a' }}>Node Sourcing Marketplace</h2>
      <p style={{ color: '#4a5568' }}>Connect with **Distributors** to purchase verified **Farmer Batches**.</p>
    </div>
    
    <div className="marketplace-grid">
      {MARKET_LIST.map(p => (
        <div key={p.id} className="product-card">
          <div className="product-image-placeholder">
            {p.emoji}
            <span className="product-badge">{p.cert}</span>
          </div>
          <div style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '4px' }}>{p.name}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
              <p style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sprout size={14} color="#166534" /> Farm: **{p.producer}**
              </p>
              <p style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Truck size={14} color="#3b82f6" /> Via: **{p.distributor}**
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '800', fontSize: '1.3rem', color: '#4a6b4a' }}>{p.price}</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Available: {p.stock}</div>
              </div>
              <button className="primary-btn" style={{ padding: '10px 15px', borderRadius: '10px', background: '#2d3a2d', color: 'white', border: 'none', cursor: 'pointer', fontWeight: '700' }}>Order from Hub</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 2. My Shop View: Retailer manages their store stock
const InventoryView = () => (
  <div className="fade-in-up">
    <div className="section-header" style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1e293b' }}>Store Inventory</h2>
      <p style={{ color: '#64748b' }}>Managing **Farmer Heritage** stock received through our **Distributor Network**.</p>
    </div>
    
    <div className="inventory-container">
      <table className="retail-table">
        <thead>
          <tr>
            <th>Product Heritage</th>
            <th>On-Hand</th>
            <th>Supply Hub</th>
            <th>Chain Integrity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {MY_STOCK.map(item => (
            <tr key={item.id}>
              <td>
                <div style={{ fontWeight: '700' }}>{item.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>ID: {item.id}</div>
              </td>
              <td style={{ fontWeight: '600' }}>{item.current}</td>
              <td style={{ color: '#64748b', fontSize: '0.85rem' }}>{item.sourceHub}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ 
                    padding: '6px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '800',
                    background: item.status === 'Optimal' ? '#f0fdf4' : item.status === 'Low' ? '#fff7ed' : '#fef2f2',
                    color: item.status === 'Optimal' ? '#166534' : item.status === 'Low' ? '#9a3412' : '#991b1b'
                  }}>{item.status}</span>
                  <span style={{ fontSize: '0.75rem', color: '#3b82f6', textDecoration: 'underline' }}>{item.batch}</span>
                </div>
              </td>
              <td><button className="icon-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><Eye size={18} /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// 3. Revenue View: Selling to consumers
const RevenueView = () => (
  <div className="sales-split fade-in-up">
    <div>
      <div className="glass-card sub-box" style={{ padding: '30px', background: 'white', color: '#1e293b', borderRadius: '24px' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '25px' }}>Direct Consumer Sales</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {RECENT_SALES.map(sale => (
            <div key={sale.id} className="sub-box" style={{ display: 'flex', justifyContent: 'space-between', background: '#f8fafc', padding: '20px', borderRadius: '16px' }}>
               <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', background: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}><ShoppingCart size={20} color="#64748b" /></div>
                  <div>
                    <div style={{ fontWeight: '700' }}>{sale.item}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Sold: {sale.qty} • Hub: {sale.distributor}</div>
                  </div>
               </div>
               <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '800', fontSize: '1.1rem', color: '#1e293b' }}>{sale.total}</div>
                  <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: '700' }}>On-Chain Verified</div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div className="glass-card sub-box" style={{ padding: '30px', background: '#2d3a2d', color: 'white', borderRadius: '24px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '10px' }}>Today's Revenue</h3>
        <div style={{ fontSize: '2.8rem', fontWeight: '900' }}>₹102,900.00</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', marginTop: '10px', fontWeight: '700' }}>
          <TrendingUp size={18} /> +12% vs Yesterday
        </div>
      </div>
      
      <div className="glass-card sub-box" style={{ padding: '30px', background: 'white', color: '#1e293b', borderRadius: '24px' }}>
        <h4 style={{ fontWeight: '800', marginBottom: '15px' }}>Best Sellers</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {['Oxheart Tomatoes', 'Wildflower Honey'].map((p, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span>{p}</span>
              <span style={{ fontWeight: '800' }}>{35 - (i*10)}% share</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// 4. Insights Tab (Analytics)
const InsightsView = () => (
  <div className="fade-in-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
    <div className="glass-card sub-box" style={{ padding: '30px' }}>
      <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '24px' }}>AI Store Assistant</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="sub-box" style={{ padding: '20px', background: '#f0fdf4', borderRadius: '16px' }}>
          <h4 style={{ color: '#166534', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}><Star size={16} /> Restock Recommendation</h4>
          <p style={{ fontSize: '0.85rem', color: '#166534', marginTop: '4px' }}>Honey inventory is critical. Current demand is up 40% this weekend. Restock 20 units now.</p>
        </div>
        <div className="sub-box" style={{ padding: '20px', background: '#eff6ff', borderRadius: '16px' }}>
          <h4 style={{ color: '#1e40af', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}><TrendingUp size={16} /> Market Trend</h4>
          <p style={{ fontSize: '0.85rem', color: '#1e40af', marginTop: '4px' }}>Tomato prices are expected to rise by 15% next week due to regional weather. Buy bulk now to save.</p>
        </div>
      </div>
    </div>
    
    <div className="glass-card sub-box" style={{ padding: '40px', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: 'white', borderRadius: '24px', textAlign: 'center' }}>
      <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}><BarChart3 size={36} /></div>
      <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '12px' }}>Forecasting Model Active</h3>
      <p style={{ opacity: 0.7, fontSize: '0.95rem', marginBottom: '32px' }}>Your store efficiency is currently 92%. Applying AI suggestions can boost this to 98%.</p>
      <button style={{ padding: '16px 32px', background: '#10b981', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' }}>Generate Weekly Report</button>
    </div>
  </div>
);

// --- MAIN PAGE ---
const RetailerPage = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'Available Products';

  const STATS = [
    { label: 'Purchasable Items', val: MARKET_LIST.length, trend: '4 Suppliers', icon: <Package size={20} color="#3b82f6" />, bg: '#eff6ff' },
    { label: 'My Inventory Items', val: MY_STOCK.length, trend: '1 Low Stock', icon: <ShoppingCart size={20} color="#a855f7" />, bg: '#faf5ff' },
    { label: 'Today\'s Sales', val: '₹102,900', trend: '+12%', icon: <TrendingUp size={20} color="#22c55e" />, bg: '#f0fdf4' },
    { label: 'Verified Status', val: 'Active', trend: 'Blockchain Sync', icon: <CheckCircle2 size={20} color="#f59e0b" />, bg: '#fffbeb' },
  ];

  const renderView = () => {
    switch(activeTab) {
      case 'Available Products': return <SourcingView />;
      case 'My Inventory': return <InventoryView />;
      case 'Sales': return <RevenueView />;
      case 'Analytics': return <InsightsView />;
      default: return <SourcingView />;
    }
  };

  return (
    <div className="dashboard-layout dark-sidebar">
      <Sidebar role="retailer" />
      <main className="dashboard-main light-bg" style={{ padding: '40px' }}>
        <Topbar title="Store Manager Terminal" subtitle="Managing: Organic Mart City Center • Node: Active" />
        
        <div className="retailer-container">
          <div className="stats-grid-4" style={{ marginBottom: '40px' }}>
            {STATS.map(s => (
              <div key={s.label} className="retail-stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#64748b' }}>{s.label}</span>
                  <div className="stat-icon-box" style={{ background: s.bg }}>{s.icon}</div>
                </div>
                <div style={{ marginTop: '12px' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#1e293b' }}>{s.val}</div>
                  <div style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: '700' }}>{s.trend}</div>
                </div>
              </div>
            ))}
          </div>
          {renderView()}
        </div>
      </main>
    </div>
  );
};


export default RetailerPage;



