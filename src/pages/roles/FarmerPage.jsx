import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Plus, 
  Sprout, 
  CheckCircle2, 
  Calendar, 
  BarChart3, 
  Package, 
  HelpCircle, 
  ShoppingCart,
  MapPin,
  QrCode,
  Image as ImageIcon,
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
  Droplets,
  Bug,
  Tag,
  X,
  TrendingUp,
  Map as MapIcon,
  Zap,
  Truck
} from 'lucide-react';
import { Sidebar, Topbar } from '../../components/DashboardUI';
import MapPicker from '../../components/MapPicker';
import '../../styles/dashboard.css';

const FarmerPage = () => {
  const [searchParams] = useSearchParams();
  const [showMapPicker, setShowMapPicker] = React.useState(false);
  const [location, setLocation] = React.useState('');
  const activeTab = searchParams.get('tab') || 'My Batches';

  const stats = [
    { label: 'Active Batches', value: '12', icon: <Sprout size={18} /> },
    { label: 'Ready to Harvest', value: '4', icon: <Package size={18} /> },
    { label: 'Certified Batches', value: '8', icon: <CheckCircle2 size={18} /> },
    { label: 'Total Batches', value: '24', icon: <Calendar size={18} /> },
  ];

  const OrdersView = () => {
    const [orderTab, setOrderTab] = React.useState('bulk');
    return (
      <div className="glass-card" style={{ padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '5px' }}>Orders</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Track batches acquired by Distribution Hubs and Direct Customers</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
             <div className="search-pill" style={{ width: '200px' }}>
               <Search size={16} />
               <input type="text" placeholder="Search orders..." />
             </div>
             <button className="tab-btn active"><Filter size={16} /> Filter</button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          <button 
            className={`tab-btn ${orderTab === 'bulk' ? 'active' : ''}`}
            onClick={() => setOrderTab('bulk')}
            style={{ fontWeight: orderTab === 'bulk' ? 'bold' : 'normal', background: orderTab === 'bulk' ? '#f0f4f0' : 'transparent' }}
          >
            Bulk Orders (Distributors)
          </button>
          <button 
            className={`tab-btn ${orderTab === 'direct' ? 'active' : ''}`}
            onClick={() => setOrderTab('direct')}
            style={{ fontWeight: orderTab === 'direct' ? 'bold' : 'normal', background: orderTab === 'direct' ? '#f0f4f0' : 'transparent' }}
          >
             Direct Customer Orders
          </button>
        </div>

        <div className="table-container">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            {orderTab === 'bulk' ? (
              <>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Sale ID</th>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Distributor Hub</th>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Batch Units</th>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Volume</th>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Logistics Status</th>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Verified</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: '#SL-9920', hub: 'Central Valley Logistics', product: 'Oxheart Heirloom Tomatoes', batch: 'FARM-BT-220A', qty: '500 kg', status: 'In Transit', color: '#3b82f6' },
                    { id: '#SL-9918', hub: 'Global Fresh Hubs', product: 'Premium Idaho Potatoes', batch: 'FARM-BT-112X', qty: '1200 kg', status: 'At Hub', color: '#10b981' },
                    { id: '#SL-9915', hub: 'Northside Distributions', product: 'Organic Crisp Cucumbers', batch: 'FARM-BT-095C', qty: '350 kg', status: 'Awaiting Pickup', color: '#f59e0b' },
                  ].map((order, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f8f8f8' }}>
                      <td style={{ padding: '20px 0', fontWeight: 'bold' }}>{order.id}</td>
                      <td style={{ padding: '20px 0' }}>
                        <div style={{ fontWeight: '600' }}>{order.hub}</div>
                        <span style={{ fontSize: '0.75rem', color: '#999' }}>Verified Partner</span>
                      </td>
                      <td style={{ padding: '20px 0' }}>
                        <div style={{ fontWeight: '500' }}>{order.product}</div>
                        <span style={{ fontSize: '0.75rem', color: '#4a6b4a', background: '#f0f4f0', padding: '2px 6px', borderRadius: '4px' }}>{order.batch}</span>
                      </td>
                      <td style={{ padding: '20px 0' }}>{order.qty}</td>
                      <td style={{ padding: '20px 0' }}>
                        <span style={{ padding: '4px 12px', borderRadius: '100px', background: `${order.color}10`, color: order.color, fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', width: 'fit-content' }}>
                          <Truck size={12} /> {order.status}
                        </span>
                      </td>
                      <td style={{ padding: '20px 0' }}>
                        <ShieldCheck size={18} color="#10b981" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            ) : (
               <>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Order ID</th>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Customer</th>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Product</th>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Quantity</th>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Amount</th>
                    <th style={{ padding: '15px 0', color: '#999', fontSize: '0.85rem' }}>Delivery Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: '#DIR-102', customer: 'Sarah Miller', product: 'Fresh Strawberries', qty: '2 kg', amount: '₹1245.00', status: 'Delivered', color: '#10b981' },
                    { id: '#DIR-105', customer: 'John Doe', product: 'Organic Tomatoes', qty: '5 kg', amount: '₹1660.00', status: 'Processing', color: '#f59e0b' },
                    { id: '#DIR-106', customer: 'Emily Chen', product: 'Wildflower Honey', qty: '1 jar', amount: '₹990.00', status: 'Shipped', color: '#3b82f6' },
                  ].map((order, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f8f8f8' }}>
                      <td style={{ padding: '20px 0', fontWeight: 'bold' }}>{order.id}</td>
                      <td style={{ padding: '20px 0' }}>
                        <div style={{ fontWeight: '600' }}>{order.customer}</div>
                      </td>
                      <td style={{ padding: '20px 0' }}>
                        <div style={{ fontWeight: '500' }}>{order.product}</div>
                      </td>
                      <td style={{ padding: '20px 0' }}>{order.qty}</td>
                      <td style={{ padding: '20px 0', fontWeight: '600' }}>{order.amount}</td>
                      <td style={{ padding: '20px 0' }}>
                        <span style={{ padding: '4px 12px', borderRadius: '100px', background: `${order.color}10`, color: order.color, fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', width: 'fit-content' }}>
                           {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'My Batches':
        return (
          <div className="glass-card" style={{ padding: '30px' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '5px' }}>My Crop Batches</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>Detailed view of your current production units.</p>
                </div>
                <button onClick={() => window.location.href = '/dashboard/farmer?tab=create'} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Plus size={18} /> Create New Batch
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { name: 'Organic Tomato', batch: '123', planted: '2026-03-11', area: '2', fertilizers: '0', pestControl: '0' },
                  { name: 'Organic Potato', batch: '111', planted: '2026-03-25', area: '5', fertilizers: '0', pestControl: '0' }
                ].map((item, idx) => (
                  <div key={idx} className="glass-card" style={{ padding: '25px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                      <div>
                        <h4 style={{ fontSize: '1.15rem', color: '#2d3a2d', marginBottom: '4px' }}>{item.name}</h4>
                        <span style={{ color: '#999', fontSize: '0.9rem' }}>Batch: {item.batch}</span>
                      </div>
                      <div style={{ background: '#f8fbf8', padding: '6px 12px', borderRadius: '100px', color: '#4a6b4a', fontSize: '0.8rem', fontWeight: 'bold' }}>Active</div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '25px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '0.9rem' }}>
                        <Calendar size={16} /> Planted: {item.planted}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '0.9rem' }}>
                        <MapPin size={16} /> Area: {item.area} units
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '0.9rem' }}>
                        <Sprout size={16} /> Fertilizers: {item.fertilizers} applied
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '0.9rem' }}>
                        <Bug size={16} /> Pest Control: {item.pestControl} entries
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                       <button className="tab-btn" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Sprout size={14}/> Add Fertilizer</button>
                       <button className="tab-btn" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Bug size={14}/> Log Pest Control</button>
                       <button className="tab-btn" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Droplets size={14}/> Add Irrigation</button>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        );

      case 'Production Tracking':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
             <div className="glass-card" style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Organic Input Tracking</h3>
                <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '25px' }}>Monitor all inputs across batches</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                   {[
                     { id: '123', crop: 'tomato', apps: 0, pest: 0, irr: 0 },
                     { id: '111', crop: 'potato', apps: 0, pest: 0, irr: 0 }
                   ].map((log, idx) => (
                     <div key={idx} style={{ padding: '20px', border: '1px solid #f0f0f0', borderRadius: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                           <div>
                              <div style={{ fontWeight: '700', fontSize: '1rem' }}>{log.id}</div>
                              <div style={{ color: '#666', fontSize: '0.9rem' }}>{log.crop}</div>
                           </div>
                           <div style={{ background: '#f0f0f0', padding: '4px 10px', borderRadius: '100px', fontSize: '0.75rem' }}>0/0 Organic</div>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: '#666' }}>
                           <li>• {log.apps} fertilizer applications</li>
                           <li>• {log.pest} pest control activities</li>
                           <li>• {log.irr} irrigation methods</li>
                        </ul>
                     </div>
                   ))}
                </div>
             </div>

             <div className="glass-card" style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Harvest Calendar</h3>
                <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '25px' }}>Upcoming harvest schedule</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                   {[
                     { crop: 'tomato', id: '123', days: '18 days', date: '2026-03-26' },
                     { crop: 'potato', id: '111', days: '52 days', date: '2026-04-29' }
                   ].map((h, idx) => (
                     <div key={idx} style={{ padding: '15px', borderRadius: '12px', background: idx === 0 ? '#f0f4f0' : '#f8f8f8', border: '1px solid #eee' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                           <span style={{ fontWeight: '600' }}>{h.crop}</span>
                           <span style={{ color: idx === 0 ? '#4a6b4a' : '#666', fontWeight: '700', fontSize: '0.85rem' }}>{h.days}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#999' }}>
                           <span>{h.id}</span>
                           <span>{h.date}</span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        );

      case 'create':
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
             <div className="glass-card" style={{ padding: '40px', maxWidth: '800px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
                   <div>
                      <h2 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>Create New Crop Batch</h2>
                      <p style={{ color: '#666' }}>Record details about your new organic crop batch</p>
                   </div>
                   <button onClick={() => window.location.href = '/dashboard/farmer?tab=My Batches'} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#999' }}><X size={24}/></button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
                   <div className="input-group">
                      <label style={{ fontSize: '0.9rem', color: '#2d3a2d', fontWeight: '600', marginBottom: '10px', display: 'block' }}>Batch Number</label>
                      <input type="text" placeholder="e.g. org-123" style={{ background: '#f5f5f0', border: 'none', padding: '15px', borderRadius: '12px', width: '100%' }} />
                   </div>
                   <div className="input-group">
                      <label style={{ fontSize: '0.9rem', color: '#2d3a2d', fontWeight: '600', marginBottom: '10px', display: 'block' }}>Crop Type</label>
                      <input type="text" placeholder="e.g. cucumber" style={{ background: '#f5f5f0', border: 'none', padding: '15px', borderRadius: '12px', width: '100%' }} />
                   </div>
                   <div className="input-group">
                      <label style={{ fontSize: '0.9rem', color: '#2d3a2d', fontWeight: '600', marginBottom: '10px', display: 'block' }}>Planted/Location Details</label>
                      <input type="text" placeholder="Farm Name & Unit" style={{ background: '#f5f5f0', border: 'none', padding: '15px', borderRadius: '12px', width: '100%' }} />
                   </div>
                   <div className="input-group">
                      <label style={{ fontSize: '0.9rem', color: '#2d3a2d', fontWeight: '600', marginBottom: '10px', display: 'block' }}>Farm Location (GPS/City)</label>
                      <div style={{ position: 'relative', display: 'flex', gap: '10px' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                          <input 
                            type="text" 
                            placeholder="e.g. 12.34, 56.78 or Nashville, TN" 
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            style={{ background: '#f5f5f0', border: 'none', padding: '15px', borderRadius: '12px', width: '100%' }} 
                          />
                          <MapPin size={18} style={{ position: 'absolute', right: '15px', top: '15px', color: '#666' }} />
                        </div>
                        <button 
                          onClick={() => setShowMapPicker(true)}
                          type="button"
                          style={{ 
                            padding: '0 15px', 
                            borderRadius: '12px', 
                            border: '1px solid #4a6b4a', 
                            background: 'white', color: '#1e293b', 
                            color: '#4a6b4a', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontWeight: '600',
                            fontSize: '0.85rem'
                          }}
                        >
                          <MapIcon size={16} /> Map
                        </button>
                      </div>
                   </div>
                   <div className="input-group">
                      <label style={{ fontSize: '0.9rem', color: '#2d3a2d', fontWeight: '600', marginBottom: '10px', display: 'block' }}>Planting Date</label>
                      <div style={{ position: 'relative' }}>
                         <input type="text" placeholder="03/26/2026" style={{ background: '#f5f5f0', border: 'none', padding: '15px', borderRadius: '12px', width: '100%' }} />
                         <Calendar size={18} style={{ position: 'absolute', right: '15px', top: '15px', color: '#666' }} />
                      </div>
                   </div>
                   <div className="input-group">
                      <label style={{ fontSize: '0.9rem', color: '#2d3a2d', fontWeight: '600', marginBottom: '10px', display: 'block' }}>Expected Harvest Date</label>
                      <div style={{ position: 'relative' }}>
                         <input type="text" placeholder="03/23/2026" style={{ background: '#f5f5f0', border: 'none', padding: '15px', borderRadius: '12px', width: '100%' }} />
                         <Calendar size={18} style={{ position: 'absolute', right: '15px', top: '15px', color: '#666' }} />
                      </div>
                   </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
                  <div className="input-group">
                      <label style={{ fontSize: '0.9rem', color: '#2d3a2d', fontWeight: '600', marginBottom: '10px', display: 'block' }}>Area Size (Hectares/Units)</label>
                      <input type="text" placeholder="e.g. 23" style={{ background: '#f5f5f0', border: 'none', padding: '15px', borderRadius: '12px', width: '100%' }} />
                   </div>
                   <div className="input-group">
                      <label style={{ fontSize: '0.9rem', color: '#2d3a2d', fontWeight: '600', marginBottom: '10px', display: 'block' }}>Soil Type</label>
                      <input type="text" placeholder="e.g. Loamy" style={{ background: '#f5f5f0', border: 'none', padding: '15px', borderRadius: '12px', width: '100%' }} />
                   </div>
                </div>

                <div className="input-group" style={{ marginBottom: '30px' }}>
                   <label style={{ fontSize: '0.9rem', color: '#2d3a2d', fontWeight: '600', marginBottom: '10px', display: 'block' }}>Detailed Farm & Seed Information</label>
                   <textarea placeholder="Describe seed origin, soil health, and specific farm details..." style={{ background: '#f5f5f0', border: 'none', padding: '15px', borderRadius: '12px', width: '100%', height: '80px' }}></textarea>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', marginBottom: '40px' }}>
                   <div className="evidence-section">
                      <h4 style={{ fontSize: '1rem', marginBottom: '15px', color: '#2d3a2d' }}>Upload Evidences</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ border: '2px dashed #eee', padding: '20px', borderRadius: '16px', textAlign: 'center', background: '#fcfcfc', cursor: 'pointer' }}>
                           <ImageIcon size={24} color="#999" style={{ marginBottom: '8px' }} />
                           <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}><strong>Click to upload</strong> farm & crop images</p>
                           <span style={{ fontSize: '0.75rem', color: '#999' }}>PNG, JPG up to 10MB</span>
                        </div>
                        <div style={{ border: '2px dashed #eee', padding: '20px', borderRadius: '16px', textAlign: 'center', background: '#fcfcfc', cursor: 'pointer' }}>
                           <ShieldCheck size={24} color="#999" style={{ marginBottom: '8px' }} />
                           <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}><strong>Upload Certifications</strong></p>
                           <span style={{ fontSize: '0.75rem', color: '#999' }}>Organic Certs, Soil Test Reports (PDF)</span>
                        </div>
                      </div>
                   </div>

                   <div className="blockchain-qr-section" style={{ background: '#f8fbf8', border: '1px solid #eef2ee', borderRadius: '24px', padding: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                      <div style={{ background: 'white', color: '#1e293b', padding: '15px', borderRadius: '16px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
                         <QrCode size={80} color="#4a6b4a" strokeWidth={1.5} />
                      </div>
                      <h4 style={{ fontSize: '1rem', color: '#2d3a2d', marginBottom: '10px' }}>Generate QR Code</h4>
                      <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '20px' }}>Create a unique blockchain-backed QR code for consumers to trace this batch.</p>
                      <button className="btn btn-primary" style={{ width: '100%', padding: '12px', borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                         <QrCode size={18} /> Generate Trace ID
                      </button>
                   </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                   <button onClick={() => window.location.href = '/dashboard/farmer?tab=My Batches'} style={{ background: '#f0f0f0', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                   <button className="btn btn-primary" style={{ padding: '12px 30px', borderRadius: '12px', fontWeight: '700' }}>Create Batch</button>
                </div>
             </div>
          </div>
        );
      
      case 'Orders':
        return <OrdersView />;

      case 'Analytics':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
            <div className="glass-card" style={{ padding: '30px', background: 'white', color: '#1e293b' }}>
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '5px' }}>Production Statistics</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Overview of your farming operations</p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { label: 'Organic Compliance Rate', value: '0%', color: '#10b981' },
                  { label: 'Certification Success Rate', value: '0/0', color: '#3b82f6' },
                  { label: 'Active Production', value: '0/0', color: '#f59e0b' }
                ].map((item, idx) => (
                  <div key={idx} style={{ padding: '20px', border: '1px solid #f0f0f0', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ fontWeight: '600', color: '#2d3a2d' }}>{item.label}</span>
                      <span style={{ fontWeight: '700', color: item.color }}>{item.value}</span>
                    </div>
                    <div style={{ height: '8px', background: '#f5f5f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '0%', height: '100%', background: item.color }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ padding: '20px', background: '#f8fbf8', borderRadius: '12px', textAlign: 'center' }}>
                   <BarChart3 size={40} color="#4a6b4a" style={{ marginBottom: '10px' }} />
                   <p style={{ fontSize: '0.8rem', color: '#666' }}>Yield Forecast Chart</p>
                </div>
                <div style={{ padding: '20px', background: '#f8fbf8', borderRadius: '12px', textAlign: 'center' }}>
                   <BarChart3 size={40} color="#4a6b4a" style={{ marginBottom: '10px' }} />
                   <p style={{ fontSize: '0.8rem', color: '#666' }}>Market Price comparison</p>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '30px', background: 'white', color: '#1e293b' }}>
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '5px' }}>AI Advisory Panel</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Smart farming insights and recommendations</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ padding: '15px', background: '#eff6ff', borderRadius: '12px', border: '1px solid #dbeafe' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: '#1e40af' }}>
                    <Droplets size={18} />
                    <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>Weather Alert</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#3b82f6', margin: 0 }}>Heavy rain expected next week. Consider adjusting irrigation schedule for active batches.</p>
                </div>

                <div style={{ padding: '15px', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #dcfce7' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: '#166534' }}>
                    <CheckCircle2 size={18} />
                    <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>Harvest Reminder</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#10b981', margin: 0 }}>0 batch(es) approaching harvest date this week.</p>
                </div>

                <div style={{ padding: '15px', background: '#faf5ff', borderRadius: '12px', border: '1px solid #f3e8ff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: '#6b21a8' }}>
                    <TrendingUp size={18} />
                    <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>Market Trend</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#a855f7', margin: 0 }}>Organic tomatoes showing 15% price increase. Good time to harvest and sell.</p>
                </div>

                <div style={{ padding: '15px', background: '#fff7ed', borderRadius: '12px', border: '1px solid #ffedd5' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: '#9a3412' }}>
                    <Zap size={18} />
                    <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>Organic Tip</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#f97316', margin: 0 }}>Companion planting with marigolds can naturally reduce pest pressure.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Support':
        return (
          <div className="glass-card" style={{ padding: '30px', background: 'white', color: '#1e293b' }}>
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '5px' }}>Help & Support</h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Get assistance and view frequently asked questions</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
              <div className="faq-section">
                <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', overflowX: 'auto', paddingBottom: '10px' }}>
                   <button className="tab-btn active">Frequently Asked Questions</button>
                   <button className="tab-btn">Farm Information</button>
                   <button className="tab-btn">Security</button>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {[
                    "How do I add a new crop batch?",
                    "How to generate a blockchain trace code?",
                    "What documents are required for organic certification?"
                  ].map((q, i) => (
                    <div key={i} style={{ padding: '20px', background: '#fdfaf5', borderRadius: '12px', border: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <span style={{ fontWeight: '600', color: '#2d3a2d' }}>{q}</span>
                       <Plus size={18} color="#999" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="ticket-section">
                 <div className="glass-card" style={{ padding: '25px', background: '#f8fbf8', border: '1px solid #eef2ee' }}>
                   <h4 style={{ marginBottom: '20px' }}>Raise a Support Ticket</h4>
                   <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                     <div className="input-group">
                       <label style={{ fontSize: '0.85rem', marginBottom: '5px', display: 'block' }}>Subject</label>
                       <input type="text" placeholder="Issue with yield forecast" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                     </div>
                     <div className="input-group">
                       <label style={{ fontSize: '0.85rem', marginBottom: '5px', display: 'block' }}>Description</label>
                       <textarea rows="4" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}></textarea>
                     </div>
                     <button className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>Submit Ticket</button>
                   </form>
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
      <Sidebar role="farmer" />
      <main className="dashboard-main light-bg">
        <Topbar title="Farmer Dashboard" subtitle={`Sunday, ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`} />
        
        {activeTab !== 'create' && (
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
        )}

        <div className="tab-content" style={{ marginTop: activeTab === 'create' ? '0' : '20px' }}>
          {renderContent()}
        </div>

        {showMapPicker && (
          <MapPicker 
            onSelect={(coords) => setLocation(coords)} 
            onClose={() => setShowMapPicker(false)} 
          />
        )}
      </main>
    </div>
  );
};

export default FarmerPage;
