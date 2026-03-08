import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  QrCode, 
  ChevronRight, 
  CheckCircle2,
  Package,
  MapPin,
  Calendar,
  LayoutDashboard,
  Home
} from 'lucide-react';
import { Sidebar, Topbar } from '../../components/DashboardUI';
import '../../styles/dashboard.css';

const ConsumerDashboard = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'Overview';
  const [batchNumber, setBatchNumber] = useState('');

  const stats = [
    { label: 'Orders Placed', value: '5', icon: <Package size={18} /> },
    { label: 'Products Verified', value: '12', icon: <CheckCircle2 size={18} /> },
    { label: 'Carbon Saved', value: '25kg', icon: <MapPin size={18} /> },
    { label: 'Market Favorites', value: '8', icon: <Home size={18} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="consumer-welcome-section">
            <h2 style={{ fontSize: '1.75rem', color: '#2d3a2d', marginBottom: '10px' }}>Track Your Organic Product Journey</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>Enter the batch number to see the complete farm-to-table story</p>
            
            <div className="batch-search-card glass-card" style={{ padding: '40px', background: 'white', borderRadius: '24px' }}>
              <div className="card-header" style={{ marginBottom: '25px' }}>
                <h3 style={{ fontSize: '1.25rem' }}>Enter Batch Number</h3>
                <p style={{ color: '#999', fontSize: '0.9rem' }}>Find the batch number on your product packaging</p>
              </div>
              <div className="batch-input-row" style={{ display: 'flex', gap: '15px' }}>
                <input 
                  type="text" 
                  placeholder="e.g., ORG-WHT-002" 
                  value={batchNumber}
                  onChange={(e) => setBatchNumber(e.target.value)}
                  style={{ flex: 1, padding: '15px', borderRadius: '12px', border: '1px solid #eee', background: '#f8f8f8' }}
                />
                <button className="btn btn-primary" style={{ padding: '0 30px' }}>
                  <Search size={18} /> Search
                </button>
              </div>
            </div>

            <div className="demo-batches-section" style={{ marginTop: '50px' }}>
              <div className="section-head" style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.15rem' }}>Try Demo Batches</h3>
                <p style={{ color: '#999', fontSize: '0.9rem' }}>Click on a batch to see its complete journey</p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                 {[
                   { name: 'Organic Wheat', id: 'ORG-WHT-002' },
                   { name: 'Heirloom Tomatoes', id: 'ORG-TOM-045' }
                 ].map((b, i) => (
                   <div key={i} className="demo-batch-card glass-card" style={{ padding: '20px', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                     <div className="batch-info">
                       <h4 style={{ margin: 0 }}>{b.name}</h4>
                       <p style={{ margin: 0, color: '#999', fontSize: '0.85rem' }}>{b.id}</p>
                     </div>
                     <ChevronRight size={20} color="#ccc" />
                   </div>
                 ))}
              </div>
            </div>
          </div>
        );
      default:
        return <div>Section under development</div>;
    }
  };

  return (
    <div className="dashboard-layout dark-sidebar">
      <Sidebar role="consumer" />
      <main className="dashboard-main light-bg">
        <Topbar title="Customer Dashboard" subtitle="Track your organic product journey" />
        
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

        <div className="tab-content" style={{ marginTop: '20px' }}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default ConsumerDashboard;
