import React, { useState } from 'react';
import { 
  Plus, 
  Sprout, 
  CheckCircle2, 
  Calendar, 
  BarChart3, 
  Package, 
  HelpCircle, 
  ShoppingCart,
  MapPin,
  QrCode,
  Image as ImageIcon,
  ShieldCheck,
  Search,
  Filter,
  ArrowRight
} from 'lucide-react';
import { Sidebar, Topbar } from '../../components/DashboardUI';
import '../../styles/dashboard.css';

const FarmerPage = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const stats = [
    { label: 'Active Batches', value: '12', icon: <Sprout size={18} /> },
    { label: 'Ready to Harvest', value: '4', icon: <Package size={18} /> },
    { label: 'Certified Batches', value: '8', icon: <CheckCircle2 size={18} /> },
    { label: 'Total Batches', value: '24', icon: <Calendar size={18} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '5px' }}>My Crop Batches</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>Manage your organic crop production</p>
                </div>
                <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}>
                  <Plus size={18} /> New Batch
                </button>
              </div>
              
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ background: '#f8f8f8', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                  <Package size={30} color="#ccc" />
                </div>
                <p style={{ color: '#999' }}>No crop batches yet. Create your first batch to get started.</p>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              <div className="glass-card" style={{ padding: '25px', background: 'white' }}>
                <h4 style={{ marginBottom: '15px' }}>Recent Production Activity</h4>
                <div style={{ color: '#999', fontSize: '0.9rem' }}>No recent activity to show.</div>
              </div>
              <div className="glass-card" style={{ padding: '25px', background: 'white' }}>
                <h4 style={{ marginBottom: '15px' }}>Quick Stats</h4>
                <div style={{ color: '#999', fontSize: '0.9rem' }}>Production yield is up 12% from last month.</div>
              </div>
            </div>
          </div>
        );
      
      case 'My Batches':
        return (
          <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '5px' }}>My Crop Batches</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Browse and manage your current crop production.</p>
              </div>
              <button onClick={() => setActiveTab('Production Tracking')} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}>
                <Plus size={18} /> New Batch
              </button>
            </div>
            
            <div className="table-container">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Batch ID</th>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Crop Name</th>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Planting Date</th>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Expected Harvest</th>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: '#BT102', name: 'Organic Wheat', planted: '2024-02-15', harvest: '2024-06-20', status: 'Growing', color: '#3b82f6' },
                    { id: '#BT101', name: 'Heirloom Tomatoes', planted: '2024-03-01', harvest: '2024-05-15', status: 'Flowering', color: '#f59e0b' },
                    { id: '#BT099', name: 'Fresh Spinach', planted: '2024-01-10', harvest: '2024-02-28', status: 'Harvested', color: '#10b981' },
                  ].map((batch, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f8f8f8' }}>
                      <td style={{ padding: '20px 0', fontWeight: 'bold' }}>{batch.id}</td>
                      <td style={{ padding: '20px 0' }}>{batch.name}</td>
                      <td style={{ padding: '20px 0' }}>{batch.planted}</td>
                      <td style={{ padding: '20px 0' }}>{batch.harvest}</td>
                      <td style={{ padding: '20px 0' }}>
                        <span style={{ padding: '4px 12px', borderRadius: '100px', background: `${batch.color}15`, color: batch.color, fontSize: '0.75rem', fontWeight: 'bold' }}>
                          ● {batch.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'Production Tracking':
        return (
          <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '5px' }}>Create New Crop Batch</h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Enter detailed information for accurate traceability.</p>
            </div>

            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
              <div className="form-left">
                <div style={{ marginBottom: '30px' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '20px' }}>Basic Info</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="input-group">
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', marginBottom: '8px', color: '#666' }}>
                        <Sprout size={14} /> Crop Name
                      </label>
                      <input type="text" placeholder="e.g. Tomatoes" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                    </div>
                    <div className="input-group">
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', marginBottom: '8px', color: '#666' }}>
                        Category
                      </label>
                      <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}>
                        <option>Vegetables</option>
                        <option>Fruits</option>
                        <option>Grains</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', marginBottom: '8px', color: '#666' }}>
                        Seed Type
                      </label>
                      <input type="text" placeholder="Heirloom" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={18} /> Farm Details
                  </h4>
                  <div style={{ height: '200px', background: '#f0f0f0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                    <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Map Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                    <div style={{ position: 'absolute', background: 'white', padding: '10px 15px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={16} color="#e53e3e" /> Greenfield Farm
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-right">
                <div style={{ marginBottom: '30px' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '20px' }}>Timeline</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div className="input-group">
                      <label style={{ fontSize: '0.85rem', marginBottom: '8px', display: 'block' }}>Planting Date</label>
                      <input type="date" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                    </div>
                    <div className="input-group">
                      <label style={{ fontSize: '0.85rem', marginBottom: '8px', display: 'block' }}>Expected Harvest Date</label>
                      <input type="date" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '20px' }}>Upload Evidence</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #eee', background: '#fdfaf5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><ImageIcon size={18} /> Upload Images</span>
                      <ArrowRight size={16} color="#999" />
                    </button>
                    <button style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #eee', background: '#fdfaf5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><ShieldCheck size={18} /> Upload Certifications</span>
                      <ArrowRight size={16} color="#999" />
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'center', padding: '20px', background: '#f8fbf8', borderRadius: '12px', border: '1px dashed #4a6b4a' }}>
                  <QrCode size={40} style={{ marginBottom: '10px' }} color="#4a6b4a" />
                  <p style={{ fontSize: '0.8rem', color: '#666' }}>Blockchain Trace ID: <span style={{ fontWeight: 'bold', color: '#2d3a2d' }}>Pending</span></p>
                  <button className="btn btn-primary" style={{ marginTop: '15px', width: '100%' }}>Initialize Blockchain Record</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Orders':
        return (
          <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '5px' }}>Orders Management</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Track and manage your marketplace orders</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                 <div className="search-pill" style={{ width: '200px' }}>
                   <Search size={16} />
                   <input type="text" placeholder="Search orders..." />
                 </div>
                 <button className="tab-btn active"><Filter size={16} /> Filter</button>
              </div>
            </div>

            <div className="table-container">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Order ID</th>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Customer</th>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Product</th>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Quantity</th>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Status</th>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: '#ORD1024', customer: 'John Smith', product: 'Organic Tomatoes', qty: '50 kg', status: 'Pending', color: '#f59e0b', paid: true },
                    { id: '#ORD1023', customer: 'Lisa White', product: 'Fresh Strawberries', qty: '25 kg', status: 'Shipped', color: '#3b82f6', paid: true },
                    { id: '#ORD1022', customer: 'Mark Rodriguez', product: 'Farm Fresh Spinach', qty: '100 kg', status: 'Completed', color: '#10b981', paid: true },
                  ].map((order, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f8f8f8' }}>
                      <td style={{ padding: '20px 0', fontWeight: 'bold' }}>{order.id}</td>
                      <td style={{ padding: '20px 0' }}>{order.customer}</td>
                      <td style={{ padding: '20px 0' }}>
                        <div>{order.product}</div>
                        <span style={{ fontSize: '0.75rem', color: '#999' }}>Batch #FG134</span>
                      </td>
                      <td style={{ padding: '20px 0' }}>{order.qty}</td>
                      <td style={{ padding: '20px 0' }}>
                        <span style={{ padding: '4px 12px', borderRadius: '100px', background: `${order.color}15`, color: order.color, fontSize: '0.75rem', fontWeight: 'bold' }}>
                          ● {order.status}
                        </span>
                      </td>
                      <td style={{ padding: '20px 0' }}>
                        <span style={{ color: '#10b981', fontWeight: '600' }}>Paid</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'Analytics':
        return (
          <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '5px' }}>Production Analytics</h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Real-time insights and yield forecasts for your farm</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              <div className="glass-card" style={{ padding: '20px', background: '#f8fbf8', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BarChart3 size={40} color="#4a6b4a" />
                <span style={{ marginLeft: '10px', color: '#666' }}>Yield Forecast Chart Placeholder</span>
              </div>
              <div className="glass-card" style={{ padding: '20px', background: '#f8fbf8', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BarChart3 size={40} color="#4a6b4a" />
                <span style={{ marginLeft: '10px', color: '#666' }}>Market Price Comparison Placeholder</span>
              </div>
            </div>
          </div>
        );

      case 'Help & Support':
        return (
          <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '5px' }}>Help & Support</h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Get assistance and view frequently asked questions</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
              <div className="faq-section">
                <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', overflowX: 'auto', paddingBottom: '10px' }}>
                   <button className="tab-btn active">Frequently Asked Questions</button>
                   <button className="tab-btn">Farm Information</button>
                   <button className="tab-btn">Security</button>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {[
                    "How do I add a new crop batch?",
                    "How to generate a blockchain trace code?",
                    "What documents are required for organic certification?"
                  ].map((q, i) => (
                    <div key={i} style={{ padding: '20px', background: '#fdfaf5', borderRadius: '12px', border: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <span style={{ fontWeight: '600', color: '#2d3a2d' }}>{q}</span>
                       <Plus size={18} color="#999" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="ticket-section">
                 <div className="glass-card" style={{ padding: '25px', background: '#f8fbf8', border: '1px solid #eef2ee' }}>
                   <h4 style={{ marginBottom: '20px' }}>Raise a Support Ticket</h4>
                   <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                     <div className="input-group">
                       <label style={{ fontSize: '0.85rem', marginBottom: '5px', display: 'block' }}>Subject</label>
                       <input type="text" placeholder="Issue with yield forecast" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                     </div>
                     <div className="input-group">
                       <label style={{ fontSize: '0.85rem', marginBottom: '5px', display: 'block' }}>Description</label>
                       <textarea rows="4" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}></textarea>
                     </div>
                     <button className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>Submit Ticket</button>
                   </form>
                 </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-layout dark-sidebar">
      <Sidebar role="farmer" />
      <main className="dashboard-main light-bg">
        <Topbar title="Farmer Dashboard" subtitle={`Sunday, ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`} />
        
        <div className="dashboard-stats-row">
          {stats.map((stat, idx) => (
            <div key={idx} className="minimal-stat-card shadow-sm">
              <div className="stat-card-header">
                {stat.label}
                <div style={{ color: '#4a6b4a' }}>{stat.icon}</div>
              </div>
              <div className="stat-card-value">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="dashboard-tabs">
          {['Overview', 'My Batches', 'Production Tracking', 'Orders', 'Analytics', 'Help & Support'].map((tab) => (
            <button 
              key={tab} 
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default FarmerPage;
