import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Settings, 
  User, 
  CheckCircle2, 
  AlertCircle,
  Activity
} from 'lucide-react';
import { Sidebar, Topbar } from '../components/DashboardUI';
import '../styles/dashboard.css';

const Dashboard = ({ role = 'admin' }) => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'Overview';

  const stats = [
    { label: 'Total Users', value: '1,204', icon: <User size={18}/> },
    { label: 'Network Health', value: '99.9%', icon: <Activity size={18}/> },
    { label: 'Smart Contracts', value: '52', icon: <ShieldCheck size={18}/> },
    { label: 'Daily TX', value: '1.4k', icon: <CheckCircle2 size={18}/> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="dashboard-content-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
            <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
              <h3>System Activity</h3>
              <p style={{ color: '#666', marginBottom: '20px' }}>Real-time blockchain transactions and user logs.</p>
               <div className="activity-list">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="activity-item" style={{ display: 'flex', gap: '15px', padding: '15px 0', borderBottom: '1px solid #f8f8f8' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4a6b4a', marginTop: '6px' }}></div>
                      <div>
                        <p style={{ margin: 0, fontSize: '0.95rem' }}><strong>Batch #{450+i}</strong> status verified by Certifier</p>
                        <span style={{ fontSize: '0.8rem', color: '#999' }}>{i*2} hours ago</span>
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
               <h3>System Status</h3>
               <div style={{ padding: '20px', background: '#f8fbf8', borderRadius: '12px', border: '1px solid #eef2ee', marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                     <span style={{ fontWeight: '600' }}>API Gateway</span>
                     <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold' }}>Online</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: '#eee', borderRadius: '2px' }}>
                     <div style={{ width: '98%', height: '100%', background: '#10b981', borderRadius: '2px' }}></div>
                  </div>
               </div>
               <div style={{ padding: '20px', background: '#f8fbf8', borderRadius: '12px', border: '1px solid #eef2ee' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                     <span style={{ fontWeight: '600' }}>Blockchain Node</span>
                     <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold' }}>Healthy</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: '#eee', borderRadius: '2px' }}>
                     <div style={{ width: '100%', height: '100%', background: '#10b981', borderRadius: '2px' }}></div>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'Users':
        return (
          <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
            <h3>User Management</h3>
            <div className="table-container">
               <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                 <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                       <th style={{ padding: '15px 0' }}>User</th>
                       <th style={{ padding: '15px 0' }}>Role</th>
                       <th style={{ padding: '15px 0' }}>Status</th>
                       <th style={{ padding: '15px 0' }}>Joined</th>
                    </tr>
                 </thead>
                 <tbody>
                    <tr style={{ borderBottom: '1px solid #f8f8f8' }}>
                       <td style={{ padding: '20px 0' }}>John Doe</td>
                       <td style={{ padding: '20px 0' }}>Farmer</td>
                       <td style={{ padding: '20px 0' }}><span className="status-badge active">Active</span></td>
                       <td style={{ padding: '20px 0' }}>2024-01-15</td>
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
      <Sidebar role={role} />
      <main className="dashboard-main light-bg">
        <Topbar title="System Administration" subtitle="Manage network and global settings" />
        
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

export default Dashboard;
