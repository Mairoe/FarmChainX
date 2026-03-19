import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, Package, Truck, Warehouse, 
  ShieldCheck, Store, Settings, LogOut, PlusCircle,
  Bell, User, Search, Home, Sprout, BarChart3,
  ShoppingCart, HelpCircle, MapPin, CheckCircle2, Plus, Users, Leaf
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Sidebar = ({ role }) => {
  const location = useLocation();
  
  const menuItems = {
    farmer: [
      { icon: <Sprout size={20}/>, label: 'My Batches', path: '/dashboard/farmer?tab=My Batches' },
      { icon: <PlusCircle size={20}/>, label: 'Production Tracking', path: '/dashboard/farmer?tab=Production Tracking' },
      { icon: <ShoppingCart size={20}/>, label: 'Orders', path: '/dashboard/farmer?tab=Orders' },
      { icon: <BarChart3 size={20}/>, label: 'Analytics', path: '/dashboard/farmer?tab=Analytics' },
      { icon: <HelpCircle size={20}/>, label: 'Support', path: '/dashboard/farmer?tab=Support' },
    ],
    distributor: [
      { icon: <Leaf size={20}/>, label: 'Farmer Sourcing', path: '/dashboard/distributor?tab=Farmer Sourcing' },
      { icon: <Package size={20}/>, label: 'Inventory', path: '/dashboard/distributor?tab=Inventory' },
      { icon: <Warehouse size={20}/>, label: 'Distribution Centers', path: '/dashboard/distributor?tab=Distribution Centers' },
      { icon: <Users size={20}/>, label: 'Retailer Network', path: '/dashboard/distributor?tab=Retailer Network' },
      { icon: <BarChart3 size={20}/>, label: 'Analytics', path: '/dashboard/distributor?tab=Analytics' },
    ],
    warehouse: [
      { icon: <LayoutDashboard size={20}/>, label: 'Overview', path: '/dashboard/warehouse?tab=Overview' },
      { icon: <Warehouse size={20}/>, label: 'Inventory', path: '/dashboard/warehouse?tab=Inventory' },
      { icon: <CheckCircle2 size={20}/>, label: 'Quality Checks', path: '/dashboard/warehouse?tab=Quality' },
    ],
    certifier: [
      { icon: <ShieldCheck size={20}/>, label: 'Pending Reviews', path: '/dashboard/certifier?tab=Reviews' },
      { icon: <CheckCircle2 size={20}/>, label: 'Audit History', path: '/dashboard/certifier?tab=History' },
    ],
    retailer: [
      { icon: <LayoutDashboard size={20}/>, label: 'Available Products', path: '/dashboard/retailer?tab=Available Products' },
      { icon: <Package size={20}/>, label: 'My Inventory', path: '/dashboard/retailer?tab=My Inventory' },
      { icon: <ShoppingCart size={20}/>, label: 'Sales', path: '/dashboard/retailer?tab=Sales' },
      { icon: <BarChart3 size={20}/>, label: 'Analytics', path: '/dashboard/retailer?tab=Analytics' },
    ],
    consumer: [
      { icon: <LayoutDashboard size={20}/>, label: 'Journey Tracker', path: '/dashboard/consumer?tab=Overview' },
      { icon: <ShoppingCart size={20}/>, label: 'Marketplace', path: '/shop' },
    ]
  };

  const actions = {
    farmer: [
      { icon: <Plus size={20}/>, label: 'Create New Batch', action: 'create_batch' }
    ]
  };

  const currentMenu = menuItems[role] || [];
  const currentActions = actions[role] || [];
  const currentPath = location.pathname + location.search;
  const navigate = useNavigate();

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
      
      <div className="sidebar-label" style={{ fontSize: '0.7rem', color: 'white', marginBottom: '15px' }}>NAVIGATION</div>
      <nav className="sidebar-nav" style={{ flex: 1 }}>
        {currentMenu.map((item, idx) => {
          const itemUrl = new URL(item.path, window.location.origin);
          const itemTab = itemUrl.searchParams.get('tab');
          
          const currentParams = new URLSearchParams(location.search);
          const currentTab = currentParams.get('tab');
          
          const isPathMatch = location.pathname === itemUrl.pathname;
          const isTabMatch = currentTab === itemTab;
          const isDefaultTab = !currentTab && idx === 0;
          
          const isActive = isPathMatch && (isTabMatch || isDefaultTab);

          return (
            <Link 
              key={idx} 
              to={item.path} 
              className={isActive ? 'sidebar-link active' : 'sidebar-link'}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                padding: '12px 16px', 
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'white',
                fontSize: '0.95rem',
                fontWeight: isActive ? '700' : '400',
                background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                opacity: isActive ? 1 : 0.7,
                marginBottom: '4px',
                transition: 'all 0.2s ease'
              }}
            >
              {item.icon} <span style={{ transition: 'margin 0.2s' }}>{item.label}</span>
            </Link>
          );
        })}

        {currentActions.length > 0 && (
          <>
            <div className="sidebar-label" style={{ fontSize: '0.7rem', color: 'white', margin: '30px 0 15px 0' }}>ACTIONS</div>
            {currentActions.map((action, idx) => (
              <button 
                key={idx}
                className="sidebar-action-btn"
                onClick={() => {
                   if (action.action === 'create_batch') {
                      navigate('/dashboard/farmer?tab=create');
                   }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  background: '#fdfaf5',
                  color: '#2d3a2d',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  width: '100%',
                  cursor: 'pointer',
                  marginTop: '10px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                {action.icon} {action.label}
              </button>
            ))}
          </>
        )}
      </nav>

      <SidebarFooter role={role} />
    </aside>
  );
};

const SidebarFooter = ({ role }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="sidebar-footer" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
      <div className="user-profile-mini" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div className="avatar-circle" style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', borderRadius: '50%' }}>
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div className="user-name">
          <h4 style={{ fontSize: '0.9rem', margin: 0 }}>{user?.name || 'User'}</h4>
          <span style={{ fontSize: '0.75rem', color: 'white', opacity: 0.7 }}>{role}</span>
        </div>
        <button onClick={handleLogout} style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer' }}>
          <LogOut size={18}/>
        </button>
      </div>
    </div>
  );
};

export const Topbar = ({ title, subtitle }) => {
  return (
    <header className="dashboard-header-clean" style={{ 
      padding: '20px 30px', 
      background: 'white', 
      borderRadius: '20px', 
      marginBottom: '30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      <div className="header-info">
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#000' }}>{title}</h1>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>{subtitle}</p>
      </div>
      <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div className="search-pill" style={{ background: '#f5f5f0', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', width: '300px', border: '1px solid #eee' }}>
          <Search size={18} color="#999" />
          <input type="text" placeholder="Search..." style={{ border: 'none', background: 'none', width: '100%', outline: 'none', fontSize: '0.9rem', color: '#000' }} />
        </div>
        <div style={{ position: 'relative' }}>
          <button className="icon-btn-ghost" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#333' }}>
            <Bell size={20}/>
          </button>
          <div style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', background: '#e53e3e', borderRadius: '50%', border: '2px solid white' }}></div>
        </div>
        <div className="avatar-main" style={{ width: '40px', height: '40px', background: '#000', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontWeight: '700' }}>A</div>
      </div>
    </header>
  );
};
