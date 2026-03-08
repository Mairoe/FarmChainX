import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  Warehouse, 
  ShieldCheck, 
  Store, 
  Settings, 
  LogOut,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import '../styles/dashboard.css';

const Dashboard = ({ role = 'farmer' }) => {
  const roleConfig = {
    farmer: {
      title: 'Farmer Dashboard',
      stats: [
        { label: 'Active Batches', value: '12', icon: <Package size={20}/> },
        { label: 'Harvested Today', value: '450kg', icon: <CheckCircle2 size={20}/> },
        { label: 'Pending Certification', value: '3', icon: <Clock size={20}/> }
      ],
      actions: ['Log New Batch', 'Update Irrigation', 'Pest Control Entry']
    },
    certifier: {
      title: 'Certifier Portal',
      stats: [
        { label: 'Pending Reviews', value: '8', icon: <Clock size={20}/> },
        { label: 'Approved This Week', value: '24', icon: <CheckCircle2 size={20}/> },
        { label: 'Flagged Batches', value: '2', icon: <AlertCircle size={20}/> }
      ],
      actions: ['Review Submissions', 'Issue Certificate', 'Compliance Reports']
    },
    distributor: {
      title: 'Logistics Dashboard',
      stats: [
        { label: 'In Transit', value: '15', icon: <Truck size={20}/> },
        { label: 'Warehouse Load', value: '82%', icon: <Warehouse size={20}/> },
        { label: 'Deliveries Today', value: '7', icon: <CheckCircle2 size={20}/> }
      ],
      actions: ['Shipment Entry', 'Route Optimization', 'Inventory Log']
    },
    retailer: {
      title: 'Retailer Panel',
      stats: [
        { label: 'Stock Levels', value: 'Low', icon: <AlertCircle size={20}/> },
        { label: 'Sales Today', value: '$1.4k', icon: <Store size={20}/> },
        { label: 'Verified Batches', value: '100%', icon: <ShieldCheck size={20}/> }
      ],
      actions: ['Order Inventory', 'Sales Report', 'Verify Shipment']
    },
    admin: {
      title: 'System Administration',
      stats: [
        { label: 'Total Users', value: '1,204', icon: <LayoutDashboard size={20}/> },
        { label: 'Active Smart Contracts', value: '52', icon: <ShieldCheck size={20}/> },
        { label: 'System Health', value: '99.9%', icon: <CheckCircle2 size={20}/> }
      ],
      actions: ['User Management', 'Network Audit', 'Global Reports']
    }
  };

  const config = roleConfig[role] || roleConfig.farmer;

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-icon-small">
            <PlusCircle size={20} color="white" />
          </div>
          <h3>FarmChainX</h3>
        </div>
        
        <nav className="sidebar-nav">
          <a href="#" className="active"><LayoutDashboard size={20}/> Dashboard</a>
          <a href="#"><Package size={20}/> {role === 'farmer' ? 'My Crops' : 'Batches'}</a>
          <a href="#"><Truck size={20}/> Shipments</a>
          <a href="#"><ShieldCheck size={20}/> {role === 'certifier' ? 'Certifications' : 'Quality'}</a>
          <a href="#"><Settings size={20}/> Settings</a>
        </nav>

        <button className="logout-btn">
          <LogOut size={20}/> Logout
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>{config.title}</h1>
            <p>Welcome back, {role.charAt(0).toUpperCase() + role.slice(1)}</p>
          </div>
          <div className="user-profile">
            <div className="avatar">JD</div>
          </div>
        </header>

        <section className="stats-grid">
          {config.stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="stat-card glass-card"
            >
              <div className="stat-icon">{stat.icon}</div>
              <div>
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </section>

        <section className="dashboard-content">
          <div className="recent-activity glass-card">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="activity-item">
                  <div className="activity-indicator"></div>
                  <div className="activity-details">
                    <p><strong>Batch #{450+i}</strong> updated status to 'Verified'</p>
                    <span>{i*2} hours ago</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="quick-actions glass-card">
            <h3>Quick Actions</h3>
            <div className="action-btns">
              {config.actions.map((action, i) => (
                <button key={i} className="action-btn">
                  <PlusCircle size={18}/>
                  {action}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
