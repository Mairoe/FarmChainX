import React, { useState } from 'react';
import { 
  Search, 
  QrCode, 
  Leaf,
  Truck,
  Warehouse,
  CheckCircle2,
  Calendar,
  Package,
  ArrowRight,
  Info,
  MapPin,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import { Sidebar, Topbar } from '../../components/DashboardUI';
import '../../styles/dashboard.css';

const ConsumerDashboard = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const demoBatch = {
    id: 'ORG-WHT-002',
    name: 'Organic Wheat',
    status: 'Certified'
  };

  const handleSearch = () => {
    if (batchNumber.toUpperCase() === 'ORG-WHT-002') {
      setSelectedBatch(demoBatch);
      setShowResults(true);
    }
  };

  const handleDemoClick = () => {
    setBatchNumber('ORG-WHT-002');
    setSelectedBatch(demoBatch);
    setShowResults(true);
  };

  const JourneyItem = ({ icon, title, date, children, color }) => (
    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', position: 'relative' }}>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        borderRadius: '50%', 
        background: color || '#22c55e', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'white',
        zIndex: 1
      }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', fontWeight: '600', color: '#1a1a1a' }}>{title}</h4>
        {date && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#666', fontSize: '0.85rem', marginBottom: '10px' }}>
            <Calendar size={14} />
            {date}
          </div>
        )}
        <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '12px' }}>
          {children}
        </div>
      </div>
      {/* Connector line */}
      <div style={{ 
        position: 'absolute', 
        left: '19px', 
        top: '40px', 
        bottom: '-30px', 
        width: '2px', 
        background: '#e2e8f0',
        zIndex: 0
      }} />
    </div>
  );

  const renderContent = () => {
    if (showResults) {
      return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <button 
            onClick={() => setShowResults(false)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'none', 
              border: 'none', 
              color: '#4a5568', 
              cursor: 'pointer',
              marginBottom: '20px',
              padding: '0',
              fontSize: '1rem'
            }}
          >
            <ChevronLeft size={20} /> Back to Search
          </button>

          <div className="batch-header" style={{ marginBottom: '30px' }}>
            <p style={{ color: '#666', margin: '0 0 5px 0' }}>Batch: {selectedBatch.id}</p>
            
            <div style={{ 
              background: 'white', color: '#1e293b',
              color: '#1e293b', 
              padding: '40px', 
              borderRadius: '24px', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '30px'
            }}>
              <div style={{ padding: '20px', border: '1px solid #f1f5f9', borderRadius: '16px', marginBottom: '15px' }}>
                <img src="/qr_code.png" alt="QR Code" style={{ width: '150px', height: '150px' }} />
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Scan for quick access</p>
            </div>

            <div style={{ 
              background: 'white', color: '#1e293b',
              color: '#1e293b', 
              padding: '40px', 
              borderRadius: '24px', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Product Journey</h3>
              <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '40px' }}>Complete traceability from farm to you</p>

              <div className="timeline">
                <JourneyItem icon={<Leaf size={20} />} title="Planted" date="2025-11-01">
                  <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}><strong>Seed Info:</strong> Whole Grain Wheat - Organic Certified</p>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Area:</strong> 5 hectares</p>
                </JourneyItem>

                <JourneyItem icon={<ShieldCheck size={20} />} title="Organic Inputs Applied" color="#3b82f6">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ margin: '0 0 2px 0', fontSize: '0.9rem' }}><strong>Green Manure</strong> - 1000 kg</p>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>2025-11-10</p>
                    </div>
                    <CheckCircle2 size={16} color="#22c55e" />
                  </div>
                </JourneyItem>

                <JourneyItem icon={<Truck size={20} />} title="Transportation" color="#a855f7">
                  <div style={{ marginBottom: '15px' }}>
                    <p style={{ margin: '0 0 2px 0', fontSize: '0.91rem' }}><strong>From:</strong> farmer_001</p>
                    <p style={{ margin: '0 0 2px 0', fontSize: '0.91rem' }}><strong>To:</strong> warehouse_001</p>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>2026-03-05</p>
                  </div>
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '15px' }}>
                    <p style={{ margin: '0 0 2px 0', fontSize: '0.91rem' }}><strong>From:</strong> user_1772793726336</p>
                    <p style={{ margin: '0 0 2px 0', fontSize: '0.91rem' }}><strong>To:</strong> retailer_004</p>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>2026-03-06</p>
                  </div>
                </JourneyItem>

                <JourneyItem icon={<Warehouse size={20} />} title="Storage" color="#f97316">
                  <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}><strong>Facility:</strong> Central Organic Storage</p>
                  <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}><strong>Conditions:</strong> Cool & Dry</p>
                  <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}><strong>Temperature:</strong> 15°C</p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>From 2026-03-05</p>
                </JourneyItem>

                <JourneyItem icon={<CheckCircle2 size={20} />} title="Organic Certification" color="#10b981">
                   <div style={{ background: '#f0fdf4', padding: '15px', borderRadius: '12px', border: '1px solid #d1fae5' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Organic Certification Board</h4>
                        <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600' }}>approved</span>
                      </div>
                      <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: '#666' }}>2026-03-10</p>
                      <p style={{ margin: 0, fontSize: '0.85rem', fontStyle: 'italic', color: '#10b981' }}>"Meets all organic standards"</p>
                   </div>
                </JourneyItem>
              </div>
            </div>

            <div style={{ marginTop: '30px', background: '#f0fdf4', padding: '30px', borderRadius: '24px', border: '1px solid #dcfce7' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#166534', marginBottom: '20px' }}>Why Choose Organic?</h3>
              {[
                'No synthetic pesticides or fertilizers used in production',
                'Better for soil health and biodiversity',
                'Traceable from farm to your table',
                'Supports sustainable farming practices'
              ].map((text, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <CheckCircle2 size={18} color="#22c55e" />
                  <p style={{ margin: 0, fontSize: '0.95rem', color: '#374151' }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center', margin: '0 auto', paddingTop: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1a202c', marginBottom: '16px', fontWeight: '700' }}>Track Your Organic Product Journey</h1>
        <p style={{ color: '#4a5568', fontSize: '1.1rem', marginBottom: '60px' }}>Scan the QR code or enter the batch number to see the complete farm-to-table story</p>

        <div style={{ background: 'white', color: '#1e293b', color: '#1e293b', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', textAlign: 'left', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Enter Batch Number</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '24px' }}>Find the batch number on your product packaging</p>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <input 
              type="text" 
              placeholder="e.g., ORG-WHT-002" 
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
              style={{ flex: 1, padding: '16px 20px', background: '#f1f5f9', border: 'none', borderRadius: '12px', fontSize: '1rem', outline: 'none' }}
            />
            <button 
              onClick={handleSearch}
              style={{ background: '#0a0a0a', color: 'white', padding: '0 32px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease' }}
              onMouseOver={(e) => e.currentTarget.style.background = '#333'}
              onMouseOut={(e) => e.currentTarget.style.background = '#0a0a0a'}
            >
              <Search size={20} /> Search
            </button>
          </div>
        </div>

        <div style={{ background: 'white', color: '#1e293b', color: '#1e293b', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Try Demo Batches</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '32px' }}>Click on a batch to see its complete journey</p>
          
          <div 
            onClick={handleDemoClick}
            style={{ 
              border: '1px solid #f1f5f9', 
              padding: '24px', 
              borderRadius: '20px', 
              cursor: 'pointer',
              maxWidth: '350px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              background: '#ffffff',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)';
              e.currentTarget.style.borderColor = '#d1fae5';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.02)';
              e.currentTarget.style.borderColor = '#f1f5f9';
            }}
          >
            <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>Organic Wheat</h4>
            <p style={{ margin: '0 0 20px 0', color: '#94a3b8', fontSize: '0.9rem' }}>ORG-WHT-002</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f0fdf4', color: '#166534', padding: '6px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '600' }}>
              <ShieldCheck size={14} /> Certified
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-layout dark-sidebar">
      <Sidebar role="consumer" />
      <main className="dashboard-main light-bg" style={{ background: 'radial-gradient(circle, #f0fdf4 0%, #ffffff 100%)' }}>
        <Topbar title="Customer Dashboard" subtitle="Track your organic product journey" />
        <div style={{ paddingBottom: '60px' }}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default ConsumerDashboard;
