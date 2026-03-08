import React from 'react';
import { Sidebar, Topbar } from '../../components/DashboardUI';
import '../../styles/dashboard.css';

const RetailerPage = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar role="retailer" />
      <main className="dashboard-main">
        <Topbar title="Retailer Dashboard" subtitle="Manage shelf inventory" />
        
        <div className="dashboard-content-grid">
          <div className="main-stats stat-cards">
            <div className="stat-card glass-card">
              <h3>Low</h3>
              <p>Wheat Stocks</p>
            </div>
          </div>
          <div className="history-section glass-card">
            <h3>Inventory</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Organic Wheat</td>
                    <td><span className="status-badge verified">Verified</span></td>
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

export default RetailerPage;
