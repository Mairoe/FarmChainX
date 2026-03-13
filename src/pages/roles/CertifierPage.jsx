import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ClipboardList, 
  LayoutDashboard,
  Search,
  Check,
  X,
  AlertCircle,
  TrendingUp,
  MapPin,
  Calendar,
  Box,
  ChevronRight
} from 'lucide-react';
import { Sidebar, Topbar } from '../../components/DashboardUI';
import '../../styles/dashboard.css';

const CertifierPage = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'Reviews';
  
  // Demo States
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [historyFilter, setHistoryFilter] = useState('Approved');

  const stats = [
    { label: 'Pending Review', value: '2', icon: <Clock size={20} />, color: '#f97316' },
    { label: 'Approved', value: '1', icon: <CheckCircle2 size={20} />, color: '#22c55e' },
    { label: 'This Month', value: '18', icon: <FileText size={20} />, color: '#3b82f6' },
    { label: 'Compliance Rate', value: '94%', icon: <ShieldCheck size={20} />, color: '#059669' },
  ];

  const pendingBatches = [
    {
      id: 'ORG-TOM-001',
      name: 'Organic Tomatoes',
      status: 'Pending Review',
      plantedDate: '2026-01-15',
      areaSize: '2 hectares',
      fertilizers: '1/1',
      pests: '1/1',
      details: {
        cropType: 'Organic Tomatoes',
        seedInfo: 'Heirloom Tomato Seeds - Certified Organic',
        fertilizersApplied: 'Organic Compost - 500 kg',
        pestControlMethods: 'Neem Oil Spray',
        compliance: {
          seeds: true,
          fertilizers: true,
          pestControl: true
        }
      }
    },
    {
      id: 'tom',
      name: 'org tom',
      status: 'Pending Review',
      plantedDate: '2025-01-01',
      areaSize: '1 hectares',
      fertilizers: '0/1',
      pests: '0/1',
      details: {
        cropType: 'Organic Tomato',
        seedInfo: 'Standard Bio Seed',
        fertilizersApplied: 'Not listed',
        pestControlMethods: 'Not listed',
        compliance: {
          seeds: true,
          fertilizers: false,
          pestControl: false
        }
      }
    }
  ];

  const pastBatches = [
    { 
      id: 'ORG-TOM-992', 
      name: 'Standard Tomatoes', 
      status: 'Approved', 
      date: '2026-02-28', 
      verdict: 'Full Organic Compliance',
      plantedDate: '2025-11-10',
      areaSize: '3 hectares',
      details: {
        cropType: 'Standard Tomatoes',
        seedInfo: 'Non-GMO Organic Certified Seeds',
        fertilizersApplied: 'Seaweed Extract & Compost',
        pestControlMethods: 'Biological Control (Ladybugs)',
        compliance: { seeds: true, fertilizers: true, pestControl: true }
      }
    },
    { 
      id: 'ORG-WHT-441', 
      name: 'Winter Wheat', 
      status: 'Rejected', 
      date: '2026-02-20', 
      verdict: 'Non-Organic Pesticide Detected',
      plantedDate: '2025-10-05',
      areaSize: '5 hectares',
      details: {
        cropType: 'Winter Wheat',
        seedInfo: 'Organic Winter Wheat Seeds',
        fertilizersApplied: 'Manure (Dairy)',
        pestControlMethods: 'Synthentic Spray (Delta-X)',
        compliance: { seeds: true, fertilizers: true, pestControl: false }
      }
    },
    { 
      id: 'ORG-APL-223', 
      name: 'Red Apples', 
      status: 'Approved', 
      date: '2026-02-15', 
      verdict: 'Full Organic Compliance',
      plantedDate: '2024-03-20',
      areaSize: '1.5 hectares',
      details: {
        cropType: 'Red Apples',
        seedInfo: 'Grafted Organic Rootstock',
        fertilizersApplied: 'Micro-nutrient Organic Mix',
        pestControlMethods: 'Pheromone Traps',
        compliance: { seeds: true, fertilizers: true, pestControl: true }
      }
    },
  ];

  const handleAction = (msg) => {
    alert(`${msg} processed for demo.`);
  };

  // Modal Component
  const Modal = ({ title, onClose, children }) => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, animation: 'fadeIn 0.3s ease' }}>
      <div style={{ background: 'white', color: '#1e293b', borderRadius: '24px', width: '90%', maxWidth: '550px', maxHeight: '90vh', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
        <div style={{ padding: '24px 30px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700' }}>{title}</h3>
            {selectedBatch && <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>{selectedBatch.name} - Batch: {selectedBatch.id}</p>}
          </div>
          <button onClick={onClose} style={{ border: 'none', background: '#f8fafc', padding: '8px', borderRadius: '50%', cursor: 'pointer', color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>
        <div style={{ padding: '30px', overflowY: 'auto', maxHeight: 'calc(90vh - 100px)' }}>
          {children}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Reviews':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
              {stats.map((stat, i) => (
                <div key={i} className="minimal-stat-card">
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

            {/* Certifications List */}
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: '600' }}>Pending Certifications</h3>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Review and approve organic crop batches</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {pendingBatches.map((batch, i) => (
                  <div key={i} className="glass-card" style={{ padding: '30px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '30px', right: '30px' }}>
                      <span style={{ background: '#fffbeb', color: '#9a3412', padding: '5px 15px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700' }}>{batch.status}</span>
                    </div>
                    
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', fontWeight: '700' }}>{batch.name}</h4>
                    <p style={{ margin: '0 0 25px 0', color: '#64748b', fontSize: '0.9rem' }}>Batch ID: {batch.id}</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 60px', marginBottom: '30px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                        <span style={{ color: '#64748b' }}>Planted Date:</span>
                        <span style={{ fontWeight: '600' }}>{batch.plantedDate}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                        <span style={{ color: '#64748b' }}>Area Size:</span>
                        <span style={{ fontWeight: '600' }}>{batch.areaSize}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                        <span style={{ color: '#64748b' }}>Fertilizers:</span>
                        <span style={{ fontWeight: '600' }}>{batch.fertilizers}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                        <span style={{ color: '#64748b' }}>Pest Control:</span>
                        <span style={{ fontWeight: '600' }}>{batch.pests}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        setSelectedBatch(batch);
                        setShowReviewModal(true);
                      }}
                      style={{ width: '100%', background: '#0a0a0a', color: 'white', padding: '15px', borderRadius: '12px', border: 'none', fontWeight: '700', cursor: 'pointer', transition: 'var(--transition-normal)' }}
                    >
                      Process Certification
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'History':
        const filteredHistory = pastBatches.filter(b => b.status === historyFilter);
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: '600' }}>Audit History</h3>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Archive of processed certification requests</p>
                </div>
                
                {/* History Sub-tabs */}
                <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '12px', gap: '4px' }}>
                  {['Approved', 'Rejected'].map(status => (
                    <button
                      key={status}
                      onClick={() => setHistoryFilter(status)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        background: historyFilter === status ? 'white' : 'transparent',
                        color: historyFilter === status ? '#0a0a0a' : '#64748b',
                        boxShadow: historyFilter === status ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                      }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
             </div>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
               {filteredHistory.length > 0 ? (
                 filteredHistory.map((batch, i) => (
                   <div 
                    key={i} 
                    onClick={() => {
                      setSelectedBatch(batch);
                      setShowReviewModal(true);
                    }}
                    className="glass-card sub-box"
                    style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                   >
                     <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: batch.status === 'Approved' ? '#f0fdf4' : '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: batch.status === 'Approved' ? '#22c55e' : '#ef4444' }}>
                          {batch.status === 'Approved' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{batch.name} <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: '400' }}>({batch.id})</span></div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{batch.verdict}</div>
                        </div>
                     </div>
                     <div style={{ textAlign: 'right' }}>
                        <div style={{ 
                          fontSize: '0.75rem', 
                          fontWeight: '700', 
                          color: batch.status === 'Approved' ? '#166534' : '#991b1b',
                          background: batch.status === 'Approved' ? '#dcfce7' : '#fee2e2',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          marginBottom: '4px',
                          display: 'inline-block'
                        }}>
                          {batch.status.toUpperCase()}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{batch.date}</div>
                     </div>
                   </div>
                 ))
               ) : (
                 <div style={{ padding: '60px', textAlign: 'center', background: 'white', color: '#1e293b', borderRadius: '24px', border: '1px dashed #e2e8f0', color: '#94a3b8' }}>
                   No {historyFilter.toLowerCase()} batches found in history.
                 </div>
               )}
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-layout dark-sidebar">
      <Sidebar role="certifier" />
      <main className="dashboard-main light-bg">
        <Topbar title="Certifier Dashboard" subtitle="Blockchain-verified compliance review" />
        
        <div style={{ padding: '0 0 40px 0' }}>
          {renderContent()}
        </div>

        {/* --- REVIEW MODAL --- */}
        {showReviewModal && selectedBatch && (
          <Modal title="Certification Review" onClose={() => setShowReviewModal(false)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              
              {/* Batch Info Section */}
              <section>
                <h4 style={{ margin: '0 0 15px 0', fontSize: '1rem', fontWeight: '600' }}>Batch Information</h4>
                <div className="sub-box" style={{ background: '#f8fafc', borderRadius: '16px', padding: '15px' }}>
                   {[
                     { l: 'Crop Type:', v: selectedBatch.details.cropType },
                     { l: 'Area Size:', v: selectedBatch.areaSize },
                     { l: 'Planting Date:', v: selectedBatch.plantedDate },
                     { l: 'Seed Info:', v: selectedBatch.details.seedInfo }
                   ].map((item, id) => (
                     <div key={id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '0.9rem' }}>
                        <span style={{ color: '#64748b' }}>{item.l}</span>
                        <span style={{ fontWeight: '500', textAlign: 'right' }}>{item.v}</span>
                     </div>
                   ))}
                </div>
              </section>

              {/* Fertilizers Section */}
              <section>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', fontWeight: '600' }}>Fertilizers Applied</h4>
                <div className="sub-box" style={{ background: '#f8fafc', borderRadius: '12px', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem' }}>{selectedBatch.details.fertilizersApplied}</span>
                  <span style={{ background: '#dcfce7', color: '#166534', padding: '2px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600' }}>Organic</span>
                </div>
              </section>

              {/* Pest Control Section */}
              <section>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', fontWeight: '600' }}>Pest Control Methods</h4>
                <div className="sub-box" style={{ background: '#f8fafc', borderRadius: '12px', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem' }}>{selectedBatch.details.pestControlMethods}</span>
                  <span style={{ background: '#dcfce7', color: '#166534', padding: '2px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600' }}>Organic</span>
                </div>
              </section>

              {/* Compliance Check Section */}
              <section>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', fontWeight: '600' }}>Compliance Check</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   {[
                     { l: 'Organic Seeds', active: selectedBatch.details.compliance.seeds },
                     { l: 'Organic Fertilizers', active: selectedBatch.details.compliance.fertilizers },
                     { l: 'Organic Pest Control', active: selectedBatch.details.compliance.pestControl }
                   ].map((item, id) => (
                     <div key={id} style={{ background: '#f0fdf4', borderRadius: '10px', padding: '10px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', color: '#166534' }}>{item.l}</span>
                        {item.active ? <Check size={18} color="#22c55e" /> : <X size={18} color="#ef4444" />}
                     </div>
                   ))}
                </div>
              </section>

              {/* Notes Section */}
              <section>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', fontWeight: '600' }}>Review Notes</h4>
                <textarea 
                  placeholder="Review notes..."
                  defaultValue={activeTab === 'History' ? selectedBatch.verdict : ""}
                  readOnly={activeTab === 'History'}
                  style={{ width: '100%', minHeight: '80px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px', fontSize: '0.9rem', outline: 'none', color: activeTab === 'History' ? '#64748b' : 'inherit' }}
                />
              </section>

              <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                {activeTab === 'Reviews' ? (
                  <>
                    <button 
                      onClick={() => {
                        handleAction(`Batch ${selectedBatch.id} Approved`);
                        setShowReviewModal(false);
                      }}
                      style={{ flex: 2, background: '#22c55e', color: 'white', padding: '14px', borderRadius: '12px', border: 'none', fontWeight: '600', cursor: 'pointer' }}
                    >
                      Approve Certification
                    </button>
                    <button 
                      onClick={() => {
                        handleAction(`Batch ${selectedBatch.id} Flagged`);
                        setShowReviewModal(false);
                      }}
                      style={{ flex: 1, background: 'white', color: '#1e293b', color: '#ef4444', padding: '14px', borderRadius: '12px', border: '1px solid #fee2e2', fontWeight: '600', cursor: 'pointer' }}
                    >
                      Flag Batch
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setShowReviewModal(false)}
                      style={{ flex: 1, background: '#f1f5f9', color: '#0a0a0a', padding: '14px', borderRadius: '12px', border: 'none', fontWeight: '600', cursor: 'pointer' }}
                    >
                      Close Archive
                    </button>
                    {selectedBatch.status === 'Approved' && (
                      <button 
                        onClick={() => handleAction('Certificate Download')}
                        style={{ flex: 1, background: '#0a0a0a', color: 'white', padding: '14px', borderRadius: '12px', border: 'none', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                      >
                        <FileText size={18} /> Download Certificate
                      </button>
                    )}
                  </>
                )}
              </div>
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

export default CertifierPage;
