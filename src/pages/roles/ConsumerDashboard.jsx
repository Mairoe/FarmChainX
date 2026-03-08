import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Search, 
  QrCode, 
  ChevronRight, 
  LogOut,
  Bell,
  CheckCircle2
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Sidebar, Topbar } from '../../components/DashboardUI';
import '../../styles/dashboard.css';

const ConsumerDashboard = () => {
  const [batchNumber, setBatchNumber] = useState('');
  
  return (
    <div className="dashboard-layout dark-sidebar">
      <Sidebar role="consumer" />
      <main className="dashboard-main light-bg">
        <Topbar title="Customer Dashboard" subtitle="Track your organic product journey" />

        <div className="consumer-welcome-section">
          <h2>Track Your Organic Product Journey</h2>
          <p>Scan the QR code or enter the batch number to see the complete farm-to-table story</p>
          
          <div className="batch-search-card glass-card">
            <div className="card-header">
              <h3>Enter Batch Number</h3>
              <p>Find the batch number on your product packaging</p>
            </div>
            <div className="batch-input-row">
              <input 
                type="text" 
                placeholder="e.g., ORG-WHT-002" 
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
              />
              <button className="search-btn">
                <Search size={18} /> Search
              </button>
            </div>
          </div>

          <div className="demo-batches-section">
            <div className="section-head">
              <h3>Try Demo Batches</h3>
              <p>Click on a batch to see its complete journey</p>
            </div>
            
            <div className="demo-batch-card glass-card">
              <div className="batch-info">
                <h4>Organic Wheat</h4>
                <p>ORG-WHT-002</p>
              </div>
              <ChevronRight size={20} color="#999" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConsumerDashboard;
