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
          <div className="glass-card" style={{ padding: '30px' }}>
            <h3>Inventory Management</h3>
            <div className="table-container">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                    <th style={{ padding: '15px 0' }}>Batch ID</th>
                    <th style={{ padding: '15px 0' }}>Category</th>
                    <th style={{ padding: '15px 0' }}>Entry Date</th>
                    <th style={{ padding: '15px 0' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f8f8f8' }}>
                    <td style={{ padding: '20px 0', fontWeight: 'bold' }}>#452</td>
                    <td style={{ padding: '20px 0' }}>Grains</td>
                    <td style={{ padding: '20px 0' }}>2024-03-05</td>
                    <td style={{ padding: '20px 0' }}><span className="status-badge stored">Stored</span></td>
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
