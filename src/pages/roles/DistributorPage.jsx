import React from 'react';
import { Sidebar, Topbar } from '../../components/DashboardUI';
import '../../styles/dashboard.css';

const DistributorPage = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar role="distributor" />
      <main className="dashboard-main">
        <Topbar title="Distributor Dashboard" subtitle="Manage transfers and logistics" />
        
        <div className="dashboard-content-grid">
          <div className="main-stats stat-cards">
            <div className="stat-card glass-card">
              <h3>15</h3>
              <p>Active Shipments</p>
            </div>
            <div className="stat-card glass-card">
              <h3>24h</h3>
              <p>Avg Delivery Time</p>
            </div>
          </div>
          <div className="history-section glass-card">
            <h3>Active Shipments</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Shipment ID</th>
                    <th>Batch</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#SHP-882</td>
                    <td>Batch #452</td>
                    <td><span className="status-badge transit">In Transit</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DistributorPage;
