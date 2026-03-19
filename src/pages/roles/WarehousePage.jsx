import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Warehouse, Droplets, Thermometer, ShieldCheck, LayoutDashboard, CheckCircle2, Search } from 'lucide-react';
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
            <h3 style={{ color: '#000', fontWeight: '800' }}>Inventory & Storage Status</h3>
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
            <h3 style={{ color: '#000', fontWeight: '800' }}>Inventory Management</h3>
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
      case 'Quality':
        return (
          <div className="quality-checks-section">
            <div className="glass-card" style={{ padding: '30px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div>
                  <h3 style={{ color: '#000', fontWeight: '800' }}>Quality Assurance</h3>
                  <p style={{ color: '#666' }}>Inspect and verify incoming batches for quality compliance.</p>
                </div>
                <div className="search-pill" style={{ background: '#f5f5f0', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 18px', width: '250px' }}>
                  <Search size={16} color="#999" />
                  <input type="text" placeholder="Search batch ID..." style={{ border: 'none', background: 'none', width: '100%', outline: 'none', fontSize: '0.85rem' }} />
                </div>
              </div>

              <div className="table-container">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '2px solid #f0f0f0' }}>
                      <th style={{ padding: '15px 10px', color: '#666', fontWeight: '600', fontSize: '0.85rem' }}>BATCH INFO</th>
                      <th style={{ padding: '15px 10px', color: '#666', fontWeight: '600', fontSize: '0.85rem' }}>ORIGIN</th>
                      <th style={{ padding: '15px 10px', color: '#666', fontWeight: '600', fontSize: '0.85rem' }}>ARRIVAL</th>
                      <th style={{ padding: '15px 10px', color: '#666', fontWeight: '600', fontSize: '0.85rem' }}>STATUS</th>
                      <th style={{ padding: '15px 10px', color: '#666', fontWeight: '600', fontSize: '0.85rem', textAlign: 'right' }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: '#BCH-901', crop: 'Basmati Rice', origin: 'Punjab Farm #4', arrival: '10 mins ago', status: 'Pending' },
                      { id: '#BCH-882', crop: 'Organic Wheat', origin: 'Haryana Coop', arrival: '2 hours ago', status: 'In Review' },
                      { id: '#BCH-854', crop: 'Yellow Maize', origin: 'UP Logistics', arrival: 'Yesterday', status: 'Pending' }
                    ].map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f8f8f8' }}>
                        <td style={{ padding: '20px 10px' }}>
                          <div style={{ fontWeight: 'bold', color: '#2d3a2d' }}>{item.id}</div>
                          <div style={{ fontSize: '0.8rem', color: '#666' }}>{item.crop}</div>
                        </td>
                        <td style={{ padding: '20px 10px', color: '#444', fontSize: '0.9rem' }}>{item.origin}</td>
                        <td style={{ padding: '20px 10px', color: '#666', fontSize: '0.9rem' }}>{item.arrival}</td>
                        <td style={{ padding: '20px 10px' }}>
                          <span className={`status-badge ${item.status.toLowerCase().replace(' ', '-')}`}>{item.status}</span>
                        </td>
                        <td style={{ padding: '20px 10px', textAlign: 'right' }}>
                          <button className="btn-action" style={{ background: '#4a6b4a', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>
                            Perform Check
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '30px' }}>
              <h3 style={{ color: '#000', fontWeight: '800', marginBottom: '20px' }}>Quality Standards Checklist</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <div className="sub-box" style={{ padding: '20px', background: '#fff', border: '1px solid #eee' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                    <div style={{ background: '#f0f7f0', padding: '10px', borderRadius: '10px' }}><Droplets size={20} color="#4a6b4a" /></div>
                    <span style={{ fontWeight: '700' }}>Moisture Levels</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.5' }}>Grains must have moisture content between 12% - 14.5% for optimal long-term storage.</p>
                </div>
                <div className="sub-box" style={{ padding: '20px', background: '#fff', border: '1px solid #eee' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                    <div style={{ background: '#fef3f2', padding: '10px', borderRadius: '10px' }}><ShieldCheck size={20} color="#dc2626" /></div>
                    <span style={{ fontWeight: '700' }}>Contamination Check</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.5' }}>Zero tolerance for foreign materials, pests, or signs of mold growth during visual inspection.</p>
                </div>
                <div className="sub-box" style={{ padding: '20px', background: '#fff', border: '1px solid #eee' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                    <div style={{ background: '#f5f3ff', padding: '10px', borderRadius: '10px' }}><CheckCircle2 size={20} color="#7c3aed" /></div>
                    <span style={{ fontWeight: '700' }}>Weight Verification</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.5' }}>Net weight must match the digital manifest within a ±0.5% margin of error.</p>
                </div>
              </div>
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
