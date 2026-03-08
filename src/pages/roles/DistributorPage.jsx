import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Truck, MapPin, LayoutDashboard, Package, Clock } from 'lucide-react';
import { Sidebar, Topbar } from '../../components/DashboardUI';
import '../../styles/dashboard.css';

const DistributorPage = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'Overview';

  const stats = [
    { label: 'Active Shipments', value: '15', icon: <Truck size={18} /> },
    { label: 'Pending Pickups', value: '3', icon: <Package size={18} /> },
    { label: 'Avg Delivery Time', value: '24h', icon: <Clock size={18} /> },
    { label: 'Routes Optimized', value: '10', icon: <MapPin size={18} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
            <h3>Logistics Overview</h3>
            <p style={{ color: '#666', marginBottom: '20px' }}>Real-time tracking of and supply chain movement.</p>
            <div style={{ height: '300px', background: '#f8fbf8', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <MapPin size={40} color="#4a6b4a" />
               <span style={{ marginLeft: '10px' }}>Global Fleet Map Placeholder</span>
            </div>
          </div>
        );
      case 'Shipments':
        return (
          <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
            <h3>Active Shipments</h3>
            <div className="table-container">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                    <th style={{ padding: '15px 0' }}>Shipment ID</th>
                    <th style={{ padding: '15px 0' }}>Origin</th>
                    <th style={{ padding: '15px 0' }}>Destination</th>
                    <th style={{ padding: '15px 0' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f8f8f8' }}>
                    <td style={{ padding: '20px 0', fontWeight: 'bold' }}>#SHP-882</td>
                    <td style={{ padding: '20px 0' }}>Greenfield Farm</td>
                    <td style={{ padding: '20px 0' }}>Central Hub</td>
                    <td style={{ padding: '20px 0' }}><span className="status-badge transit">In Transit</span></td>
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
      <Sidebar role="distributor" />
      <main className="dashboard-main light-bg">
        <Topbar title="Distributor Dashboard" subtitle="Manage transfers and logistics" />
        
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

export default DistributorPage;
