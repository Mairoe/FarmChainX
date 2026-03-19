import React from 'react';
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

      <div className="sidebar-footer" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
        <div className="user-profile-mini" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="avatar-circle" style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '0.8rem' }}>A</div>
          <div className="user-name">
            <h4 style={{ fontSize: '0.9rem', margin: 0 }}>a</h4>
            <span style={{ fontSize: '0.75rem', color: 'white' }}>{role}</span>
          </div>
          <Link to="/auth" style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.5)' }}><LogOut size={18}/></Link>
        </div>
      </div>
    </aside>
  );
};

export const Topbar = ({ title, subtitle }) => {
  return (
    <header className="dashboard-header-clean" style={{ 
      padding: '24px 0', 
      marginBottom: '30px', 
      borderBottom: '2px solid #4a6b4a',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div className="header-info">
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0a0a0a', marginBottom: '4px' }}>{title}</h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>{subtitle}</p>
      </div>
      <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div className="search-pill" style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 16px', width: '300px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <Search size={18} color="#94a3b8" />
          <input type="text" placeholder="Search..." style={{ border: 'none', background: 'none', width: '100%', outline: 'none', fontSize: '0.9rem', color: '#1e293b' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => alert('No new notifications')}
              className="icon-btn-ghost" 
              style={{ background: '#f8fafc', border: 'none', cursor: 'pointer', color: '#64748b', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Bell size={20}/>
            </button>
            <div style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', background: '#e53e3e', borderRadius: '50%', border: '2px solid white' }}></div>
          </div>
          <button 
            onClick={() => alert('User Profile & Settings is coming soon!')}
            style={{ background: '#f8fafc', border: 'none', cursor: 'pointer', color: '#64748b', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }}
            onMouseOver={(e) => e.currentTarget.style.background = '#f1f5f9'}
            onMouseOut={(e) => e.currentTarget.style.background = '#f8fafc'}
          >
            <User size={20}/>
          </button>
          <button 
            onClick={() => navigate('/auth')}
            style={{ background: '#f8fafc', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }}
            onMouseOver={(e) => e.currentTarget.style.background = '#fef2f2'}
            onMouseOut={(e) => e.currentTarget.style.background = '#f8fafc'}
          >
            <LogOut size={20}/>
          </button>
        </div>
      </div>
    </header>
  );
};
