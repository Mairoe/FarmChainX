import React from 'react';
import { Sidebar, Topbar } from '../../components/DashboardUI';
import '../../styles/dashboard.css';

const CertifierPage = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar role="certifier" />
      <main className="dashboard-main">
        <Topbar title="Certifier Portal" subtitle="Validate and approve organic batches" />
        
        <div className="dashboard-content-grid">
          <div className="main-stats stat-cards">
            <div className="stat-card glass-card">
              <h3>8</h3>
              <p>Pending Reviews</p>
            </div>
          </div>
          <div className="full-width-section glass-card">
            <h3>Pending Requests</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Req ID</th>
                    <th>Batch</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>CERT-01</td>
                    <td>#452</td>
                    <td><button className="btn btn-primary btn-sm">Review</button></td>
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

export default CertifierPage;
