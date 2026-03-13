import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Truck, 
  Building2, 
  Users, 
  TrendingUp, 
  Package, 
  ChevronRight, 
  BarChart3, 
  MapPin, 
  Warehouse,
  ShoppingCart,
  CheckCircle2,
  Clock,
  Box,
  Leaf,
  Plus,
  X,
  ArrowRight,
  Sprout
} from 'lucide-react';
import { Sidebar, Topbar } from '../../components/DashboardUI';
import '../../styles/dashboard.css';

const DistributorPage = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'Inventory';

  // Demo States
  const [showDistributeModal, setShowDistributeModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(null);
  const [viewingCenter, setViewingCenter] = useState(null);
  const [viewingRoute, setViewingRoute] = useState(null);

  const handleAction = (action) => {
    alert(`${action} functionality triggered for demo purposes.`);
  };

  // Demo Data (Aligned with Farmer -> Distributor -> Retailer Workflow)
  const [inventoryBatches, setInventory] = useState([
    { id: 'FARM-BT-220A', name: 'Oxheart Heirloom Tomatoes', quantity: '500 kg', source: 'Sun Valley Organic Farm', quality: '98%', status: 'Ready' },
    { id: 'FARM-BT-112B', name: 'Cold-Pressed Sunflower Oil', quantity: '120 L', source: 'Golden Valley Millers', quality: '95%', status: 'Ready' },
    { id: 'FARM-BT-005C', name: 'Wildflower Honey', quantity: '60 units', source: 'Pure Bee Apiaries', quality: '99%', status: 'Ready' },
  ]);

  const pharmaFarms = [
    { name: 'Sun Valley Organic Farm', location: 'Mendoza Valley', certification: 'Organic A+', latestBatch: 'FARM-BT-220A' },
    { name: 'Heritage Highland Farms', location: 'Upper Highlands', certification: 'Bio-Verified', latestBatch: 'FARM-BT-801X' },
  ];

  const distCenters = [
    { name: 'Central Logistics Hub', location: 'Northern Region', capacity: 82, items: 124 },
    { name: 'Eco-Express Hub', location: 'Southern Region', capacity: 45, items: 56 },
  ];

  const retailers = [
    { name: 'Organic Mart City Center', location: 'Downtown', orders: 15, lastOrder: '2h ago' },
    { name: 'Nature Haven Groceries', location: 'Suburb', orders: 12, lastOrder: '1d ago' },
  ];

  // Modal Component
  const Modal = ({ title, onClose, children }) => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'fadeIn 0.3s ease' }}>
      <div style={{ background: 'white', color: '#1e293b', borderRadius: '24px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
        <div style={{ padding: '24px 30px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700' }}>{title}</h3>
          <button onClick={onClose} style={{ border: 'none', background: '#f8fafc', padding: '8px', borderRadius: '50%', cursor: 'pointer', color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>
        <div style={{ padding: '30px', overflowY: 'auto', maxHeight: 'calc(90vh - 80px)' }}>
          {children}
        </div>
      </div>
    </div>
  );

  const stats = [
    { label: 'Asset Throughput', value: '4.8k kg', change: '+12% this week', icon: <Package size={20} />, color: '#3b82f6' },
    { label: 'Verified Farms', value: pharmaFarms.length, change: 'All active', icon: <Leaf size={20} />, color: '#22c55e' },
    { label: 'Retailer Nodes', value: retailers.length, change: '+1 pending', icon: <Users size={20} />, color: '#10b981' },
    { label: 'Fleet Status', value: '92%', change: 'Real-time sync', icon: <Truck size={20} />, color: '#f59e0b' },
  ];

  // Content will be rendered directly in renderContent

  const renderContent = () => {
    switch (activeTab) {
      case 'Farmer Sourcing':
        return (
          <div style={{ background: 'white', color: '#1e293b', borderRadius: '24px', padding: '40px', border: '1px solid #f1f5f9' }} className="tab-fade-in">
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '1.25rem', fontWeight: '800' }}>Farmer Batch Sourcing</h3>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>Purchase verified organic batches directly from certified producers.</p>
                </div>
             </div>
             
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                {pharmaFarms.map((farm, i) => (
                  <div key={i} className="sub-box" style={{ padding: '25px', background: '#f8fafc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                      <h4 style={{ margin: '0 0 4px 0', fontWeight: '700' }}>{farm.name}</h4>
                      <span style={{ fontSize: '0.75rem', background: '#f0fdf4', color: '#166534', padding: '4px 10px', borderRadius: '100px', fontWeight: '800', height: 'fit-content' }}>{farm.certification}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 20px 0' }}><MapPin size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} /> {farm.location}</p>
                    <div className="sub-box" style={{ background: 'white', color: '#1e293b', padding: '15px' }}>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Latest Harvest Available</div>
                      <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{farm.latestBatch}</div>
                    </div>
                    <button 
                      onClick={() => alert(`Buying Batch ${farm.latestBatch} from ${farm.name}`)}
                      style={{ width: '100%', padding: '12px', background: '#2d3a2d', color: 'white', borderRadius: '10px', border: 'none', fontWeight: '700', cursor: 'pointer' }}
                    >
                      Buy Batch
                    </button>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'Inventory':
        return (
          <div className="glass-card" style={{ padding: '30px', marginBottom: '30px' }}>
             <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>Incoming Shipments</h3>
             <p style={{ margin: '0 0 25px 0', color: '#64748b', fontSize: '0.9rem' }}>Batches assigned to your logistics network</p>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {inventoryBatches.map((batch, i) => (
                  <div key={i} className="sub-box" style={{ display: 'flex', alignItems: 'center', padding: '20px', gap: '20px' }}>
                    <div style={{ width: '48px', height: '48px', background: '#f0fdf4', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e' }}>
                      <Package size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: '700' }}>{batch.name}</h4>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}><Leaf size={12} /> {batch.source} • {batch.id}</p>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '120px' }}>
                      <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>{batch.quantity}</div>
                      <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: '700' }}>Grade: {batch.quality}</div>
                    </div>
                    <button 
                      onClick={() => setShowDistributeModal(true)}
                      style={{ padding: '10px 20px', borderRadius: '10px', background: '#0a0a0a', color: 'white', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}
                    >
                      Ship to Retail
                    </button>
                  </div>
                ))}
             </div>
          </div>
        );
      
      case 'Distribution Centers':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {distCenters.map((hub, i) => (
              <div key={i} className="glass-card" style={{ padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '1.15rem' }}>{hub.name}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b', fontSize: '0.9rem' }}>
                      <MapPin size={14} /> {hub.location}
                    </div>
                  </div>
                  <Warehouse size={24} color="#a855f7" />
                </div>
                
                <div style={{ marginBottom: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px', color: '#64748b' }}>
                    <span>Capacity</span>
                    <span style={{ fontWeight: '600' }}>{hub.capacity}%</span>
                  </div>
                  <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${hub.capacity}%`, background: '#a855f7' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    onClick={() => setViewingCenter(hub)}
                    style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #f1f5f9', background: 'white', color: '#1e293b', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}
                  >
                    View Inventory
                  </button>
                  <button 
                    onClick={() => setViewingRoute({ from: hub.name, to: 'Regional Markets' })}
                    style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #f1f5f9', background: 'white', color: '#1e293b', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}
                  >
                    Route Planning
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'Retailer Network':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {retailers.map((r, i) => (
              <div key={i} className="glass-card" style={{ padding: '30px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>{r.name}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b', fontSize: '0.9rem' }}>
                      <MapPin size={14} /> {r.location}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#22c55e' }}>{r.orders}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Monthly Orders</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button 
                    onClick={() => setShowOrderModal(r)}
                    style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #f1f5f9', background: 'white', color: '#1e293b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', fontWeight: '500' }}
                  >
                    <Box size={18} /> Send Order
                  </button>
                  <button 
                    onClick={() => handleAction(`Partner Analytics for ${r.name}`)}
                    style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #f1f5f9', background: 'white', color: '#1e293b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', fontWeight: '500' }}
                  >
                    <BarChart3 size={18} /> View Analytics
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'Analytics':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            <div className="glass-card" style={{ padding: '30px' }}>
               <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>Distribution Performance</h3>
               <p style={{ margin: '0 0 25px 0', color: '#64748b', fontSize: '0.9rem' }}>Key performance metrics</p>
               
               {[
                 { label: 'On-Time Delivery Rate', value: 96, color: '#22c55e' },
                 { label: 'Product Quality Score', value: 94, color: '#3b82f6' },
                 { label: 'Network Efficiency', value: 88, color: '#a855f7' }
               ].map((m, i) => (
                 <div key={i} style={{ marginBottom: '20px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '8px' }}>
                     <span>{m.label}</span>
                     <span style={{ fontWeight: '700', color: m.color }}>{m.value}%</span>
                   </div>
                   <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                     <div style={{ height: '100%', width: `${m.value}%`, background: m.color }} />
                   </div>
                 </div>
               ))}
            </div>

            <div className="glass-card" style={{ padding: '30px' }}>
               <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>Regional Distribution</h3>
               <p style={{ margin: '0 0 25px 0', color: '#64748b', fontSize: '0.9rem' }}>Volume by region this month</p>
               
               {[
                 { name: 'Northern Region', value: 75, color: '#3b82f6' },
                 { name: 'Southern Region', value: 60, color: '#22c55e' },
                 { name: 'Eastern Region', value: 45, color: '#a855f7' },
                 { name: 'Western Region', value: 80, color: '#f97316' }
               ].map((r, i) => (
                 <div key={i} style={{ marginBottom: '15px' }}>
                   <div style={{ fontSize: '0.85rem', marginBottom: '5px' }}>{r.name}</div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                     <div style={{ flex: 1, height: '6px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${r.value}%`, background: r.color }} />
                     </div>
                   </div>
                 </div>
               ))}
            </div>

            {/* Bottom full width Recent Activity */}
            <div className="glass-card" style={{ gridColumn: 'span 2', padding: '30px' }}>
               <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>Recent Activity</h3>
               <p style={{ margin: '0 0 25px 0', color: '#64748b', fontSize: '0.9rem' }}>Latest distribution updates</p>
               
               <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div className="sub-box" style={{ padding: '20px', background: '#f0fdf4', display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', background: 'white', color: '#1e293b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e' }}>
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#166534', fontSize: '0.95rem' }}>Delivery Completed</div>
                      <div style={{ fontSize: '0.85rem', color: '#166534', opacity: 0.8 }}>Batch ORG-WHT-002 delivered to Fresh Market</div>
                    </div>
                  </div>

                  <div className="sub-box" style={{ padding: '20px', background: '#eff6ff', display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', background: 'white', color: '#1e293b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                      <Clock size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#1e40af', fontSize: '0.95rem' }}>In Transit</div>
                      <div style={{ fontSize: '0.85rem', color: '#1e40af', opacity: 0.8 }}>3 shipments en route to distribution centers</div>
                    </div>
                  </div>

                  <div className="sub-box" style={{ padding: '20px', background: '#f5f3ff', display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', background: 'white', color: '#1e293b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
                      <Box size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#5b21b6', fontSize: '0.95rem' }}>New Inventory</div>
                      <div style={{ fontSize: '0.85rem', color: '#5b21b6', opacity: 0.8 }}>5 certified batches added to available inventory</div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-layout dark-sidebar">
      <Sidebar role="distributor" />
      <main className="dashboard-main light-bg">
        <Topbar title="Distributor Dashboard" subtitle="Manage transfers and logistics" />
        
        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
          {stats.map((stat, i) => (
            <div key={i} className="minimal-stat-card">
              <div className="stat-card-header">
                <span className="stat-label">{stat.label}</span>
                <div style={{ color: stat.color }}>{stat.icon}</div>
              </div>
              <div className="stat-card-body">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-trend positive">{stat.change}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="tab-fade-in" style={{ animation: 'fadeIn 0.4s ease' }}>
          {renderContent()}
        </div>

        {/* --- MODALS --- */}
        
        {showDistributeModal && (
          <Modal title="Distribute Product" onClose={() => setShowDistributeModal(false)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', color: '#64748b' }}>Select Batch</label>
                <select style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }}>
                  {inventoryBatches.map(b => <option key={b.id}>{b.name} ({b.id})</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', color: '#64748b' }}>Destination</label>
                <select style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }}>
                  {distCenters.map(c => <option key={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div className="sub-box" style={{ background: '#f0fdf4', padding: '15px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', gap: '10px', color: '#166534', fontSize: '0.85rem' }}>
                  <Leaf size={16} />
                  <span>Only organic-certified transportation partners will be assigned.</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  alert('Distribution Shipment Created!');
                  setShowDistributeModal(false);
                }}
                style={{ width: '100%', background: '#0a0a0a', color: 'white', padding: '15px', borderRadius: '12px', border: 'none', fontWeight: '700', cursor: 'pointer', marginTop: '10px' }}
              >
                Create Shipment
              </button>
            </div>
          </Modal>
        )}

        {viewingCenter && (
          <Modal title={`Inventory: ${viewingCenter.name}`} onClose={() => setViewingCenter(null)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: '#f8fafc', borderRadius: '12px' }}>
                <span style={{ color: '#64748b' }}>Total Items</span>
                <span style={{ fontWeight: '700' }}>{viewingCenter.items} Batches</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderBottom: '1px solid #f1f5f9' }}>
                    <Box size={18} color="#64748b" />
                    <div style={{ flex: 1 }}>
                      <h5 style={{ margin: '0 0 2px 0', fontSize: '0.9rem', fontWeight: '600' }}>Organic Wheat Batch #{i * 102}</h5>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>Verified Organic • 400kg</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        )}

        {viewingRoute && (
          <Modal title="Route Planning" onClose={() => setViewingRoute(null)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="sub-box" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px', background: '#f0f9ff', borderRadius: '16px' }}>
                <div style={{ fontWeight: '600' }}>{viewingRoute.from}</div>
                <ArrowRight size={18} color="#3b82f6" />
                <div style={{ fontWeight: '600' }}>{viewingRoute.to}</div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <div style={{ width: '10px', height: '100px', background: 'linear-gradient(#22c55e, #333)', borderRadius: '5px' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div style={{ fontSize: '0.85rem' }}><strong>Pickup:</strong> Center Dispatch <span style={{ color: '#94a3b8' }}>(10:00 AM)</span></div>
                    <div style={{ fontSize: '0.85rem' }}><strong>Transit:</strong> HWY-402 Route <span style={{ color: '#3b82f6' }}>(Tracking Enabled)</span></div>
                    <div style={{ fontSize: '0.85rem' }}><strong>Destination:</strong> Urban Retail Hub <span style={{ color: '#94a3b8' }}>(Estimated: 4:00 PM)</span></div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setViewingRoute(null)}
                style={{ width: '100%', background: '#0a0a0a', color: 'white', padding: '15px', borderRadius: '12px', border: 'none', fontWeight: '700', cursor: 'pointer' }}
              >
                Confirm Optimized Route
              </button>
            </div>
          </Modal>
        )}

        {showOrderModal && (
          <Modal title={`Send Order: ${showOrderModal.name}`} onClose={() => setShowOrderModal(null)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '10px' }}>Select Product to Send</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {inventoryBatches.map(b => (
                    <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'white', color: '#1e293b', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <span style={{ fontSize: '0.9rem' }}>{b.name}</span>
                      <input type="checkbox" />
                    </div>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => {
                  alert(`Order successfully sent to ${showOrderModal.name}!`);
                  setShowOrderModal(null);
                }}
                style={{ width: '100%', background: '#22c55e', color: 'white', padding: '15px', borderRadius: '12px', border: 'none', fontWeight: '700', cursor: 'pointer' }}
              >
                Confirm Dispatch
              </button>
            </div>
          </Modal>
        )}
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default DistributorPage;
