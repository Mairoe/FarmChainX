import React from 'react';
import { 
  LayoutDashboard, Package, Truck, Warehouse, 
  ShieldCheck, Store, Settings, LogOut, PlusCircle,
  Bell, User, Search, Home, Sprout, BarChart3,
  ShoppingCart, HelpCircle, MapPin, CheckCircle2
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = ({ role }) => {
  const location = useLocation();
  
  const menuItems = {
    farmer: [
      { icon: <LayoutDashboard size={20}/>, label: 'Overview', path: '/dashboard/farmer' },
      { icon: <Sprout size={20}/>, label: 'My Batches', path: '/dashboard/farmer?tab=batches' },
      { icon: <PlusCircle size={20}/>, label: 'Production Tracking', path: '/dashboard/farmer?tab=tracking' },
      { icon: <BarChart3 size={20}/>, label: 'Analytics', path: '/dashboard/farmer?tab=analytics' },
      { icon: <ShoppingCart size={20}/>, label: 'Orders', path: '/dashboard/farmer?tab=orders' },
      { icon: <HelpCircle size={20}/>, label: 'Help & Support', path: '/dashboard/farmer?tab=support' },
    ],
    distributor: [
      { icon: <LayoutDashboard size={20}/>, label: 'Overview', path: '/dashboard/distributor' },
      { icon: <Truck size={20}/>, label: 'Shipments', path: '/distributor/shipments' },
      { icon: <MapPin size={20}/>, label: 'Logistics', path: '/distributor/logistics' },
    ],
    warehouse: [
      { icon: <LayoutDashboard size={20}/>, label: 'Overview', path: '/dashboard/warehouse' },
      { icon: <Warehouse size={20}/>, label: 'Inventory', path: '/warehouse/inventory' },
      { icon: <CheckCircle2 size={20}/>, label: 'Quality Checks', path: '/warehouse/quality' },
    ],
    certifier: [
      { icon: <LayoutDashboard size={20}/>, label: 'Overview', path: '/dashboard/certifier' },
      { icon: <ShieldCheck size={20}/>, label: 'Pending Reviews', path: '/certifier/reviews' },
      { icon: <CheckCircle2 size={20}/>, label: 'Audit History', path: '/certifier/history' },
    ],
    retailer: [
      { icon: <LayoutDashboard size={20}/>, label: 'Overview', path: '/dashboard/retailer' },
      { icon: <Store size={20}/>, label: 'Inventory', path: '/retailer/inventory' },
      { icon: <ShoppingCart size={20}/>, label: 'Store Analytics', path: '/retailer/sales' },
    ],
    consumer: [
      { icon: <LayoutDashboard size={20}/>, label: 'Overview', path: '/dashboard/consumer' },
      { icon: <Home size={20}/>, label: 'Marketplace', path: '/shop' },
    ]
  };

  const currentMenu = menuItems[role] || [];

  return (
    <aside className="sidebar">
      <div className="sidebar-header" style={{ marginBottom: '40px' }}>
        <div className="logo-icon-small" style={{ background: '#4a6b4a' }}>
          <Package size={20} color="white" />
        </div>
        <div className="logo-text">
          <h3 style={{ fontSize: '1.25rem' }}>FarmChainX</h3>
          <span style={{ fontSize: '0.65rem', opacity: 0.5, letterSpacing: '1px' }}>SUPPLY CHAIN</span>
        </div>
      </div>
      
      <div className="sidebar-label" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '15px' }}>NAVIGATION</div>
      <nav className="sidebar-nav" style={{ flex: 1 }}>
        {currentMenu.map((item, idx) => (
          <Link 
            key={idx} 
            to={item.path} 
            className={location.pathname === item.path ? 'active' : ''}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '12px 16px', 
              borderRadius: '12px',
              textDecoration: 'none',
              color: 'white',
              fontSize: '0.95rem',
              fontWeight: location.pathname === item.path ? '600' : '400',
              opacity: location.pathname === item.path ? 1 : 0.7,
              marginBottom: '4px'
            }}
          >
            {item.icon} {item.label}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
        <div className="user-profile-mini" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="avatar-circle" style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '0.8rem' }}>A</div>
          <div className="user-name">
            <h4 style={{ fontSize: '0.9rem', margin: 0 }}>a</h4>
            <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>{role}</span>
          </div>
          <Link to="/auth" style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.5)' }}><LogOut size={18}/></Link>
        </div>
      </div>
    </aside>
  );
};

export const Topbar = ({ title, subtitle }) => {
  return (
    <header className="dashboard-header-clean" style={{ padding: '0 0 30px 0' }}>
      <div className="header-info">
        <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#2d3a2d' }}>{title}</h1>
        <p style={{ color: '#999', fontSize: '0.9rem' }}>{subtitle}</p>
      </div>
      <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div className="search-pill" style={{ background: '#f0f0f0', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', width: '300px' }}>
          <Search size={18} color="#999" />
          <input type="text" placeholder="Search..." style={{ border: 'none', background: 'none', width: '100%', outline: 'none', fontSize: '0.9rem' }} />
        </div>
        <div style={{ position: 'relative' }}>
          <button className="icon-btn-ghost" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
            <Bell size={20}/>
          </button>
          <div style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', background: '#e53e3e', borderRadius: '50%', border: '2px solid white' }}></div>
        </div>
        <div className="avatar-main" style={{ width: '40px', height: '40px', background: '#2d3a2d', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontWeight: '700' }}>A</div>
      </div>
    </header>
  );
};
