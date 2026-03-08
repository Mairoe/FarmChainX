import React from 'react';
import { Sidebar, Topbar } from '../../components/DashboardUI';
import '../../styles/dashboard.css';

const WarehousePage = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar role="warehouse" />
      <main className="dashboard-main">
        <Topbar title="Warehouse Dashboard" subtitle="Track storage and cold chain status" />
        
        <div className="dashboard-content-grid">
          <div className="main-stats stat-cards">
            <div className="stat-card glass-card">
              <h3>82%</h3>
              <p>Capacity Used</p>
            </div>
            <div className="stat-card glass-card">
              <h3>4°C</h3>
              <p>Storage Temp</p>
            </div>
          </div>
          <div className="history-section glass-card">
            <h3>Inventory Management</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Batch ID</th>
                    <th>Entry Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#452</td>
                    <td>2024-03-05</td>
                    <td><span className="status-badge stored">Stored</span></td>
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

export default WarehousePage;
