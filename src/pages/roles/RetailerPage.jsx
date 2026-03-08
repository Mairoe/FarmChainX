import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Store, ShoppingCart, Tag, BarChart3, LayoutDashboard } from 'lucide-react';
import { Sidebar, Topbar } from '../../components/DashboardUI';
import '../../styles/dashboard.css';

const RetailerPage = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'Overview';

  const stats = [
    { label: 'Active Products', value: '45', icon: <Tag size={18} /> },
    { label: 'Units Sold', value: '1.2k', icon: <ShoppingCart size={18} /> },
    { label: 'Inventory Level', value: 'Normal', icon: <Store size={18} /> },
    { label: 'Weekly Revenue', value: '$8.4k', icon: <BarChart3 size={18} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
            <h3>Store Overview</h3>
            <p style={{ color: '#666', marginBottom: '20px' }}>Summary of store sales and organic inventory status.</p>
            <div style={{ padding: '40px', background: '#f8fbf8', borderRadius: '12px', textAlign: 'center' }}>
               <BarChart3 size={50} color="#4a6b4a" />
               <h4 style={{ marginTop: '15px' }}>Sales Analytics</h4>
               <p style={{ color: '#666', fontSize: '0.9rem' }}>Real-time sales tracking through blockchain POS integration.</p>
            </div>
          </div>
        );
      case 'Inventory':
        return (
          <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
            <h3>Stock Management</h3>
            <div className="table-container">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                    <th style={{ padding: '15px 0' }}>Product</th>
                    <th style={{ padding: '15px 0' }}>Stock</th>
                    <th style={{ padding: '15px 0' }}>Price</th>
                    <th style={{ padding: '15px 0' }}>Traceability</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f8f8f8' }}>
                    <td style={{ padding: '20px 0', fontWeight: 'bold' }}>Organic Tomato</td>
                    <td style={{ padding: '20px 0' }}>150 kg</td>
                    <td style={{ padding: '20px 0' }}>$4.50/kg</td>
                    <td style={{ padding: '20px 0' }}><span style={{ color: '#4a6b4a', fontWeight: 'bold' }}>Verified</span></td>
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
      <Sidebar role="retailer" />
      <main className="dashboard-main light-bg">
        <Topbar title="Retailer Dashboard" subtitle="Manage store inventory and sales" />
        
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

export default RetailerPage;
