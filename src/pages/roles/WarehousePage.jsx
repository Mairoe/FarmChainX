import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Warehouse, Droplets, Thermometer, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { Sidebar, Topbar } from '../../components/DashboardUI';
import '../../styles/dashboard.css';

const WarehousePage = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'Overview';

  const stats = [
    { label: 'Capacity Used', value: '82%', icon: <Warehouse size={18} />, color: '#4a6b4a' },
    { label: 'Active Cold Storage', value: '12 Units', icon: <Droplets size={18} />, color: '#4a6b4a' },
    { label: 'Avg Storage Temp', value: '4°C', icon: <Thermometer size={18} />, color: '#4a6b4a' },
    { label: 'Quality Approvals', value: '150+', icon: <ShieldCheck size={18} />, color: '#4a6b4a' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="glass-card" style={{ padding: '30px' }}>
            <h3>Inventory & Storage Status</h3>
            <p style={{ color: '#666', marginBottom: '20px' }}>Real-time monitoring of warehouse conditions and stock levels.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
               <div className="sub-box" style={{ padding: '20px', background: '#f8fbf8', textAlign: 'center' }}>
                  <Thermometer size={30} color="#4a6b4a" />
                  <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Temperature Stable</p>
               </div>
               <div className="sub-box" style={{ padding: '20px', background: '#f8fbf8', textAlign: 'center' }}>
                  <Droplets size={30} color="#4a6b4a" />
                  <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Humidity 45%</p>
               </div>
            </div>
          </div>
        );
      case 'Inventory':
        return (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '1.25rem', fontWeight: '800' }}>Inventory Management</h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>Track and manage batches stored in this facility</p>
            </div>
            
            <div className="table-container shadow-sm" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ background: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
                  <tr>
                    <th style={{ padding: '12px 20px', fontSize: '0.7rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Batch ID</th>
                    <th style={{ padding: '12px 20px', fontSize: '0.7rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category</th>
                    <th style={{ padding: '12px 20px', fontSize: '0.7rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Entry Date</th>
                    <th style={{ padding: '12px 20px', fontSize: '0.7rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                    <th style={{ padding: '12px 20px', fontSize: '0.7rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '18px 20px', fontWeight: '700', color: '#3b82f6', fontSize: '0.85rem' }}>#452</td>
                    <td style={{ padding: '18px 20px', fontWeight: '600', color: '#1e293b' }}>Grains</td>
                    <td style={{ padding: '18px 20px', color: '#64748b', fontSize: '0.9rem' }}>2024-03-05</td>
                    <td style={{ padding: '18px 20px' }}>
                      <span style={{ 
                        padding: '4px 12px', 
                        borderRadius: '6px', 
                        fontSize: '0.65rem', 
                        fontWeight: '800', 
                        background: '#dcfce7', 
                        color: '#166534',
                        textTransform: 'uppercase'
                      }}>Stored</span>
                    </td>
                    <td style={{ padding: '18px 20px' }}>
                      <button 
  onClick={() => alert('Starting quality check process for Batch #452')}
  style={{ padding: '8px 16px', borderRadius: '8px', background: '#0a0a0a', color: 'white', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem' }}
>
  Check Quality
</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return <div>Section under development</div>;
    }
  };

  return (
    <div className="dashboard-layout dark-sidebar">
      <Sidebar role="warehouse" />
      <main className="dashboard-main light-bg">
        <Topbar title="Warehouse Dashboard" subtitle="Track storage and cold chain status" />
        
        <div className="dashboard-stats-row">
          {stats.map((stat, idx) => (
            <div key={idx} className="minimal-stat-card">
              <div className="stat-card-header">
                <span className="stat-label">{stat.label}</span>
                <div style={{ color: stat.color }}>{stat.icon}</div>
              </div>
              <div className="stat-card-body">
                <div className="stat-value">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="tab-content tab-content-margin-top">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default WarehousePage;
