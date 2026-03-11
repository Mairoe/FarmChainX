import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Settings, 
  User, 
  CheckCircle2, 
  AlertCircle,
  Activity,
  Users,
  Box,
  BarChart3,
  Search,
  Check,
  X,
  Download,
  Eye,
  Trash2,
  Lock,
  Unlock,
  Plus,
  FileBarChart,
  TrendingUp,
  Clock,
  Globe,
  Coins,
  Shield,
  Monitor,
  BellRing,
  History
} from 'lucide-react';
import { Sidebar, Topbar } from '../components/DashboardUI';
import '../styles/dashboard.css';

const Dashboard = ({ role = 'admin' }) => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'Overview';

  const [userRoleFilter, setUserRoleFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [lockedUsers, setLockedUsers] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [showTxnModal, setShowTxnModal] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [txnSearchQuery, setTxnSearchQuery] = useState('');
  const [appCurrency, setAppCurrency] = useState('INR (₹)');
  const [appLanguage, setAppLanguage] = useState('English (US)');
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [toast, setToast] = useState(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [assignedRole, setAssignedRole] = useState('');

  const [demoUsers, setDemoUsers] = useState([
    { id: 1, name: 'John Doe', role: 'Farmer', status: 'Active', joined: '2024-01-15',
      details: { business: 'Greenfield Organic Farm', location: 'California, USA', special: 'Verified Organic Producer', license: 'F-9920-X' } },
    { id: 2, name: 'Alice Smith', role: 'Distributor', status: 'Active', joined: '2024-02-10',
      details: { business: 'Smith Logistics Hub', location: 'Texas, USA', special: 'Regional Distributor', centers: '3 Active Hubs' } },
    { id: 3, name: 'Bob Johnson', role: 'Certifier', status: 'Pending', joined: '2024-03-01',
      details: { business: 'EcoCert Global', location: 'Oregon, USA', special: 'Tier 1 Auditor', pendingDocs: 'Insurance Renewal' } },
    { id: 4, name: 'Global Logistics', role: 'Transporter', status: 'Active', joined: '2023-12-20',
      details: { business: 'Global Fleet Inc.', location: 'Multiple', special: 'Cold-Chain Certified', fleetSize: '150 Vehicles' } },
    { id: 5, name: 'Warehouse Alpha', role: 'Warehouse', status: 'Pending', joined: '2023-11-15',
      details: { business: 'Alpha Storage', location: 'Nevada, USA', special: 'Climate Controlled', capacity: '50,000 sq ft' } },
    { id: 6, name: 'EcoRetail', role: 'Retailer', status: 'Active', joined: '2024-01-20',
      details: { business: 'EcoRetail Market', location: 'New York, USA', special: 'Premium Bio Partner', stores: '12 Locations' } },
    { id: 7, name: 'Sarah Green', role: 'Consumer', status: 'Active', joined: '2024-03-05',
      details: { business: 'Individual', location: 'Washington, USA', special: 'Loyalty Tier: Gold', walletStatus: 'Connected' } },
    { id: 8, name: 'Ravi Kumar', role: 'Farmer', status: 'Pending', joined: '2026-03-10',
      details: { business: 'Krishna Organic Fields', location: 'Telangana, India', special: 'New Registration', license: 'Pending Verification' } },
  ]);

  const stats = [
    { label: 'Total Users', value: '1,204', icon: <Users size={18}/>, color: '#4f46e5' },
    { label: 'Network Health', value: '99.9%', icon: <Activity size={18}/>, color: '#10b981' },
    { label: 'Smart Contracts', value: '52', icon: <ShieldCheck size={18}/>, color: '#d97706' },
    { label: 'Daily TX', value: '1.4k', icon: <Activity size={18}/>, color: '#3b82f6' }
  ];

  const demoBlockchainLedger = [
    { id: 'TX-99012', type: 'Asset Handover', from: 'Farmer John', to: 'Distributor Alice',
      status: 'Confirmed', time: '5 mins ago', hash: '0x4f2a...9b1c', block: '14,204,112', gas: '21,040 Gwei',
      payload: { batchId: 'BT-450', quantity: '500kg', temperature: '18°C', signature: 'ECDSA-Verified' } },
    { id: 'TX-99013', type: 'Certification Issued', from: 'Certifier Bob', to: 'Farmer John',
      status: 'Confirmed', time: '18 mins ago', hash: '0x8e1b...4d2f', block: '14,204,108', gas: '45,210 Gwei',
      payload: { certId: 'ORG-992', standard: 'USDA Organic', validUntil: '2026-12-31' } },
    { id: 'TX-99014', type: 'Ownership Transfer', from: 'Distributor Alice', to: 'Retailer Eco',
      status: 'In Progress', time: '1 hour ago', hash: '0x2c9d...3a4e', block: 'Pending', gas: '18,500 Gwei',
      payload: { asset: 'Organic Wheat', destination: 'Warehouse Zeta', transitId: 'TR-102' } },
    { id: 'TX-99015', type: 'Retail Sale', from: 'Retailer Eco', to: 'Consumer Sarah',
      status: 'Confirmed', time: '2 hours ago', hash: '0x7a5f...1e0d', block: '14,204,095', gas: '12,400 Gwei',
      payload: { price: '0.05 ETH', loyaltyPoints: '+10', receiptId: 'REC-5521' } }
  ];

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAction = (msg) => { alert(`${msg} processed for demo.`); };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => { setIsExporting(false); alert('Data exported successfully as CSV.'); }, 1500);
  };

  const toggleLock = (userId) => {
    if (lockedUsers.includes(userId)) {
      setLockedUsers(lockedUsers.filter(id => id !== userId));
      alert('User account unlocked successfully.');
    } else {
      setLockedUsers([...lockedUsers, userId]);
      alert('User account locked. Access suspended.');
    }
  };

  const Modal = ({ title, onClose, children }) => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
      <div style={{ background: 'white', borderRadius: '24px', width: '90%', maxWidth: '500px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden' }}>
        <div style={{ padding: '24px 30px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ border: 'none', background: '#f8fafc', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}><X size={20}/></button>
        </div>
        <div style={{ padding: '30px' }}>{children}</div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {

      case 'Overview':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
            <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3>System Activity</h3>
                <button onClick={() => handleAction('Refresh logs')} style={{ background: 'transparent', border: 'none', color: '#4f46e5', cursor: 'pointer', fontSize: '0.85rem' }}>Refresh Feed</button>
              </div>
              <div className="activity-list">
                {[1,2,3,4,5].map(i => (
                  <div key={i} style={{ display: 'flex', gap: '15px', padding: '15px 0', borderBottom: '1px solid #f8f8f8' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4a6b4a', marginTop: '6px' }}></div>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.95rem' }}><strong>Batch #{450+i}</strong> status verified by Certifier</p>
                      <span style={{ fontSize: '0.8rem', color: '#999' }}>{i*2} hours ago</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
              <h3 style={{ marginBottom: '20px' }}>System Status</h3>
              {[
                { label: 'API Gateway', status: 'Online', val: 98, color: '#10b981' },
                { label: 'Blockchain Node', status: 'Healthy', val: 100, color: '#10b981' },
                { label: 'Smart Contract VPC', status: 'Secure', val: 100, color: '#10b981' },
                { label: 'IPFS Storage', status: 'Optimized', val: 92, color: '#3b82f6' }
              ].map((item, idx) => (
                <div key={idx} style={{ padding: '15px', background: '#f8fbf8', borderRadius: '12px', border: '1px solid #eef2ee', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{item.label}</span>
                    <span style={{ color: item.color, fontSize: '0.75rem', fontWeight: 'bold' }}>{item.status}</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: '#eee', borderRadius: '2px' }}>
                    <div style={{ width: `${item.val}%`, height: '100%', background: item.color, borderRadius: '2px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Users': {
        const pendingUsers = demoUsers.filter(u => u.status === 'Pending');
        const filteredUsers = demoUsers.filter(u =>
          u.status !== 'Pending' &&
          (userRoleFilter === 'All' || u.role === userRoleFilter) &&
          (u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.details.business.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {pendingUsers.length > 0 && (
              <div className="glass-card" style={{ padding: '30px', background: 'white', border: '2px solid #fef3c7' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <div style={{ background: '#fef3c7', padding: '8px', borderRadius: '10px' }}>
                    <AlertCircle size={20} color="#d97706" />
                  </div>
                  <div>
                    <h3 style={{ margin: 0 }}>Pending Approvals</h3>
                    <p style={{ margin: '2px 0 0 0', color: '#64748b', fontSize: '0.85rem' }}>{pendingUsers.length} registration(s) awaiting your review</p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {pendingUsers.map(user => (
                    <div key={user.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: '#fffbeb', borderRadius: '14px', border: '1px solid #fde68a' }}>
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                        <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '1rem', color: '#d97706' }}>
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{user.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{user.details.business} · {user.details.location}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ padding: '4px 10px', background: '#f1f5f9', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' }}>{user.role}</span>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Applied {user.joined}</span>
                        <button
                          onClick={() => { setPendingUser(user); setAssignedRole(user.role); setShowApproveModal(true); }}
                          style={{ padding: '8px 18px', borderRadius: '10px', background: '#22c55e', color: 'white', border: 'none', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            setDemoUsers(prev => prev.filter(u => u.id !== user.id));
                            showToast(`${user.name}'s registration has been rejected.`, 'error');
                          }}
                          style={{ padding: '8px 18px', borderRadius: '10px', background: '#fee2e2', color: '#ef4444', border: 'none', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div>
                  <h3 style={{ margin: 0 }}>Active Users</h3>
                  <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>Monitor blockchain identities and roles</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }} />
                    <input
                      type="text"
                      placeholder="Search name or business..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ padding: '8px 12px 8px 40px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', width: '250px' }}
                    />
                  </div>
                  <select
                    value={userRoleFilter}
                    onChange={(e) => setUserRoleFilter(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}
                  >
                    <option value="All">All Roles</option>
                    <option value="Farmer">Farmer</option>
                    <option value="Transporter">Transporter</option>
                    <option value="Distributor">Distributor</option>
                    <option value="Certifier">Certifier</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Retailer">Retailer</option>
                    <option value="Consumer">Consumer</option>
                  </select>
                  <button className="btn btn-primary" onClick={() => handleAction('Onboard User')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={18} /> Onboard
                  </button>
                </div>
              </div>

              <div className="table-container">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee', color: '#64748b', fontSize: '0.85rem' }}>
                      <th style={{ padding: '15px' }}>IDENTITY</th>
                      <th style={{ padding: '15px' }}>ROLE & BUSINESS</th>
                      <th style={{ padding: '15px' }}>VERIFICATION</th>
                      <th style={{ padding: '15px' }}>MEMBER SINCE</th>
                      <th style={{ padding: '15px' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => {
                      const isLocked = lockedUsers.includes(user.id);
                      return (
                        <tr key={user.id} style={{ borderBottom: '1px solid #f8fafc', opacity: isLocked ? 0.6 : 1 }}>
                          <td style={{ padding: '15px' }}>
                            <div style={{ fontWeight: '600' }}>{user.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>ID: 0x{user.id}00...F2</div>
                          </td>
                          <td style={{ padding: '15px' }}>
                            <span style={{ padding: '4px 8px', background: '#f1f5f9', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', marginRight: '8px' }}>{user.role}</span>
                            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{user.details.business}</span>
                          </td>
                          <td style={{ padding: '15px' }}>
                            <span style={{
                              padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '700',
                              background: isLocked ? '#f1f5f9' : '#dcfce7',
                              color: isLocked ? '#64748b' : '#166534',
                              display: 'inline-flex', alignItems: 'center', gap: '4px'
                            }}>
                              {isLocked ? <Lock size={12}/> : <Check size={12}/>}
                              {isLocked ? 'SUSPENDED' : 'VERIFIED'}
                            </span>
                          </td>
                          <td style={{ padding: '15px', color: '#64748b', fontSize: '0.9rem' }}>{user.joined}</td>
                          <td style={{ padding: '15px' }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button onClick={() => { setSelectedUser(user); setShowUserModal(true); }} style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }} title="View Full Profile">
                                <Eye size={16} />
                              </button>
                              <button onClick={() => toggleLock(user.id)} style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', background: isLocked ? '#fff1f2' : 'white', color: isLocked ? '#ef4444' : '#64748b', cursor: 'pointer' }} title={isLocked ? 'Unlock' : 'Suspend Account'}>
                                {isLocked ? <Unlock size={16} /> : <Lock size={16} />}
                              </button>
                              <button onClick={() => handleAction('Permanent Delete')} style={{ padding: '8px', borderRadius: '8px', border: '1px solid #fee2e2', background: 'white', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }

      case 'Batches':
        return (
          <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <div>
                <h3 style={{ margin: 0 }}>Global Batch Ledger</h3>
                <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>End-to-end traceability monitor</p>
              </div>
              <button className="btn btn-primary" onClick={handleExport} disabled={isExporting} style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '140px', justifyContent: 'center' }}>
                {isExporting ? 'Exporting...' : <><Download size={18} /> Export Records</>}
              </button>
            </div>
            <div className="table-container">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee', color: '#64748b', fontSize: '0.85rem' }}>
                    <th style={{ padding: '15px' }}>BATCH ID</th>
                    <th style={{ padding: '15px' }}>PRODUCT</th>
                    <th style={{ padding: '15px' }}>SOURCE PROVIDER</th>
                    <th style={{ padding: '15px' }}>COMPLIANCE</th>
                    <th style={{ padding: '15px' }}>CHAIN STATUS</th>
                    <th style={{ padding: '15px' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'BT-450', name: 'Organic Wheat', producer: 'Greenfield Farm', cert: 'Verified', status: 'In Warehouse Alpha', time: '2h ago' },
                    { id: 'BT-451', name: 'Rolled Oats', producer: 'Valley Harvest', cert: 'In Review', status: 'Quality Check', time: '4h ago' },
                    { id: 'BT-452', name: 'Dried Berries', producer: 'Berry Patch', cert: 'Verified', status: 'Market Distribution', time: '6h ago' },
                  ].map(batch => (
                    <tr key={batch.id}>
                      <td style={{ padding: '15px', fontWeight: 'bold' }}>#{batch.id}</td>
                      <td style={{ padding: '15px' }}>{batch.name}</td>
                      <td style={{ padding: '15px' }}>{batch.producer}</td>
                      <td style={{ padding: '15px' }}>
                        <span style={{ padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', background: batch.cert === 'Verified' ? '#dcfce7' : '#fffbeb', color: batch.cert === 'Verified' ? '#166534' : '#9a3412' }}>{batch.cert}</span>
                      </td>
                      <td style={{ padding: '15px' }}>
                        <div style={{ fontSize: '0.9rem' }}>{batch.status}</div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Updated {batch.time}</div>
                      </td>
                      <td style={{ padding: '15px' }}>
                        <button onClick={() => { setSelectedBatch(batch); setShowBatchModal(true); }} style={{ padding: '6px 12px', border: '1px solid #e2e8f0', background: 'white', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>
                          Track
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'Blockchain': {
        const filteredEvents = demoBlockchainLedger.filter(t =>
          t.id.toLowerCase().includes(txnSearchQuery.toLowerCase()) ||
          t.hash.toLowerCase().includes(txnSearchQuery.toLowerCase()) ||
          t.type.toLowerCase().includes(txnSearchQuery.toLowerCase())
        );
        return (
          <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <div>
                <h3 style={{ margin: 0 }}>Audit Log</h3>
                <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>Immutable on-chain record of all supply chain events</p>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }} />
                  <input type="text" placeholder="Search Hash or ID..." value={txnSearchQuery} onChange={(e) => setTxnSearchQuery(e.target.value)} style={{ padding: '8px 12px 8px 35px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', width: '200px', fontSize: '0.85rem' }} />
                </div>
                <button className="btn btn-secondary" onClick={() => handleAction('Export Logs')} style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Download size={16}/> Download Raw JSON
                </button>
              </div>
            </div>
            <div className="activity-list">
              {filteredEvents.map((txn, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', background: '#f8fafc', borderRadius: '12px', marginBottom: '12px', border: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <div style={{ background: 'white', padding: '10px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}><Activity size={20} color="#3b82f6" /></div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{txn.type} <span style={{ color: '#64748b', fontWeight: '400' }}>#{txn.id}</span></div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'monospace' }}>HASH: {txn.hash}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: '600', color: txn.status === 'Confirmed' ? '#166534' : '#d97706', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                        {txn.status === 'Confirmed' ? <CheckCircle2 size={14}/> : <Clock size={14}/>} {txn.status}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{txn.time}</div>
                    </div>
                    <button onClick={() => { setSelectedTxn(txn); setShowTxnModal(true); }} style={{ padding: '8px 15px', borderRadius: '8px', background: 'white', border: '1px solid #e2e8f0', color: '#4f46e5', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer' }}>
                      Audit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'Settings':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
                <Monitor size={20} color="#4f46e5" />
                <h3 style={{ margin: 0 }}>Platform Experience</h3>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '25px' }}>Configure the global look and feel of the FarmChainX ecosystem.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px' }}>
                    <Coins size={18} color="#94a3b8" />
                    <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>Master Currency</span>
                  </div>
                  <select value={appCurrency} onChange={(e) => setAppCurrency(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '600' }}>
                    <option>INR (₹)</option>
                    <option>EUR (€)</option>
                    <option>USD ($)</option>
                    <option>USDC (S)</option>
                  </select>
                  <p style={{ margin: '10px 0 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>Sets the default pricing and transaction currency.</p>
                </div>
                <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px' }}>
                    <Globe size={18} color="#94a3b8" />
                    <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>Regional Language</span>
                  </div>
                  <select value={appLanguage} onChange={(e) => setAppLanguage(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '600' }}>
                    <option>English (US)</option>
                    <option>Spanish (ES)</option>
                    <option>French (FR)</option>
                    <option>German (DE)</option>
                  </select>
                  <p style={{ margin: '10px 0 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>Affects all dashboards, emails, and notifications.</p>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
                <Shield size={20} color="#10b981" />
                <h3 style={{ margin: 0 }}>Network & Security</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Blockchain Live Environment', enabled: isLiveMode, action: () => setIsLiveMode(!isLiveMode), desc: isLiveMode ? 'Connected to Mainnet (Live Assets)' : 'Simulated Sandbox (Demo Assets)' },
                  { label: 'Multi-Factor Admin Auth', enabled: true, desc: 'Secure login required for all administrative roles.' },
                  { label: 'Real-time Audit Logging', enabled: true, desc: 'Saves every system mutation to an immutable IPFS log.' },
                  { label: 'Automatic Smart Verification', enabled: false, desc: 'If enabled, batches auto-verify via IoT sensor data.' },
                ].map((setting, id) => (
                  <div key={id} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', background: '#f8fafc', borderRadius: '16px', alignItems: 'center', border: '1px solid #f1f5f9' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: setting.enabled ? '#10b981' : '#cbd5e1' }}></div>
                        <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{setting.label}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>{setting.desc}</p>
                    </div>
                    <div onClick={setting.action || (() => handleAction('Toggling Setting'))} style={{ width: '50px', height: '26px', background: setting.enabled ? '#10b981' : '#cbd5e1', borderRadius: '13px', position: 'relative', cursor: 'pointer', transition: 'all 0.3s ease' }}>
                      <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: setting.enabled ? '27px' : '3px', transition: 'all 0.3s ease', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}></div>
                    </div>
                  </div>
                ))}
                <div style={{ padding: '20px', background: '#fffbeb', borderRadius: '16px', border: '1px solid #fef3c7', marginTop: '10px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#9a3412', marginBottom: '8px' }}>
                    <AlertCircle size={18} />
                    <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>Governance Action Required</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#9a3412' }}>3/5 signatures are currently required for network-wide config changes. <span style={{ fontWeight: '700', textDecoration: 'underline', cursor: 'pointer' }}>Manage Multi-sig</span></p>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
                <BellRing size={20} color="#f59e0b" />
                <h3 style={{ margin: 0 }}>Communication & Alerts</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'High Priority Batch Alerts', enabled: true, desc: 'Immediate SMS/Email for batches with temperature or compliance failures.' },
                  { label: 'New User Registration Notifications', enabled: false, desc: 'Notify admins when a new business requests to join the network.' },
                  { label: 'Smart Contract Execution Reports', enabled: true, desc: 'Weekly summary of all auto-executed escrows and payments.' },
                ].map((setting, id) => (
                  <div key={id} style={{ display: 'flex', justifyContent: 'space-between', padding: '18px', background: '#f8fafc', borderRadius: '16px', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontWeight: '600', fontSize: '0.95rem', display: 'block', marginBottom: '2px' }}>{setting.label}</span>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>{setting.desc}</p>
                    </div>
                    <div onClick={() => handleAction('Toggle Alert')} style={{ width: '44px', height: '22px', background: setting.enabled ? '#f59e0b' : '#cbd5e1', borderRadius: '11px', position: 'relative', cursor: 'pointer' }}>
                      <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: setting.enabled ? '25px' : '3px', transition: 'left 0.2s' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
                <History size={20} color="#ef4444" />
                <h3 style={{ margin: 0 }}>Policy & Compliance</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                  <div style={{ fontWeight: '600', fontSize: '0.95rem', marginBottom: '8px' }}>History Retention</div>
                  <select style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white' }}>
                    <option>1 Year (Standard)</option>
                    <option>5 Years (Enterprise)</option>
                    <option>Indefinite (Full Ledger)</option>
                  </select>
                  <p style={{ margin: '8px 0 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>How long non-blockchain data is kept active.</p>
                </div>
                <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                  <div style={{ fontWeight: '600', fontSize: '0.95rem', marginBottom: '8px' }}>Onboarding Policy</div>
                  <select style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white' }}>
                    <option>Manual Review Only</option>
                    <option>Auto-approve Verified ID</option>
                    <option>Invite Only</option>
                  </select>
                  <p style={{ margin: '8px 0 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>Controls how new actors enter the ecosystem.</p>
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
      <Sidebar role={role} />
      <main className="dashboard-main light-bg">
        <Topbar title="Nexus Control Center" subtitle="Autonomous Supply Chain Administration" />

        <div className="dashboard-stats-row" style={{ marginTop: '10px' }}>
          {stats.map((stat, idx) => (
            <div key={idx} className="minimal-stat-card shadow-sm" style={{ border: '1px solid #f1f5f9' }}>
              <div className="stat-card-header">
                {stat.label}
                <div style={{ color: stat.color }}>{stat.icon}</div>
              </div>
              <div className="stat-card-value">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="tab-content" style={{ marginTop: '20px' }}>
          {renderContent()}
        </div>

        {/* USER DETAIL MODAL */}
        {showUserModal && selectedUser && (
          <Modal title="Identity Profile" onClose={() => setShowUserModal(false)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{selectedUser.name}</h4>
                  <p style={{ margin: 0, color: '#64748b' }}>{selectedUser.role}</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                {[
                  { l: 'Business Unit', v: selectedUser.details.business },
                  { l: 'Joined', v: selectedUser.joined },
                  { l: 'Location', v: selectedUser.details.location },
                  { l: 'Role Status', v: selectedUser.details.special },
                ].map((item, id) => (
                  <div key={id} style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>{item.l.toUpperCase()}</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{item.v}</div>
                  </div>
                ))}
              </div>
              {selectedUser.role === 'Farmer' && (
                <div style={{ background: '#f0fdf4', padding: '15px', borderRadius: '12px', border: '1px solid #dcfce7' }}>
                  <div style={{ fontWeight: '600', color: '#166534', fontSize: '0.9rem' }}>Farmer License Active</div>
                  <div style={{ fontSize: '0.8rem', color: '#166534' }}>Cert ID: {selectedUser.details.license}</div>
                </div>
              )}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => { toggleLock(selectedUser.id); setShowUserModal(false); }} style={{ flex: 1, padding: '12px', borderRadius: '10px', background: lockedUsers.includes(selectedUser.id) ? '#22c55e' : '#0a0a0a', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer' }}>
                  {lockedUsers.includes(selectedUser.id) ? 'Restore Access' : 'Suspend Account'}
                </button>
                <button onClick={() => setShowUserModal(false)} style={{ flex: 1, padding: '12px', borderRadius: '10px', background: '#f1f5f9', color: '#0a0a0a', border: 'none', fontWeight: '600', cursor: 'pointer' }}>Close Profile</button>
              </div>
            </div>
          </Modal>
        )}

        {/* BATCH TRACKING MODAL */}
        {showBatchModal && selectedBatch && (
          <Modal title="Chain of Custody" onClose={() => setShowBatchModal(false)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>LIVE STATUS</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#10b981' }}>{selectedBatch.status}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {[
                  { label: 'Origin', val: selectedBatch.producer, time: '3 days ago' },
                  { label: 'Certification', val: 'Quality Verified', time: '1 day ago' },
                  { label: 'Transit', val: 'Cold Chain Shipping', time: '12h ago' },
                  { label: 'Destination', val: selectedBatch.status, time: selectedBatch.time },
                ].map((step, id) => (
                  <div key={id} style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></div>
                      {id !== 3 && <div style={{ width: '2px', flex: 1, background: '#10b981', minHeight: '20px' }}></div>}
                    </div>
                    <div style={{ flex: 1, paddingBottom: '10px' }}>
                      <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{step.label}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{step.val} · {step.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowBatchModal(false)} style={{ width: '100%', padding: '12px', borderRadius: '12px', background: '#0a0a0a', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer' }}>
                Close Tracking
              </button>
            </div>
          </Modal>
        )}

        {/* TRANSACTION AUDIT MODAL */}
        {showTxnModal && selectedTxn && (
          <Modal title="Blockchain Audit Detail" onClose={() => setShowTxnModal(false)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>BLOCK HEIGHT</div>
                  <div style={{ fontWeight: '600' }}>{selectedTxn.block}</div>
                </div>
                <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>GAS CONSUMED</div>
                  <div style={{ fontWeight: '600' }}>{selectedTxn.gas}</div>
                </div>
              </div>
              <div style={{ padding: '15px', background: '#f1f5f9', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Event Payload</span>
                  <span style={{ color: '#4f46e5', fontSize: '0.7rem' }}>JSON</span>
                </div>
                <pre style={{ margin: 0, fontSize: '0.8rem', color: '#334155', background: 'white', padding: '10px', borderRadius: '8px', overflow: 'auto' }}>
                  {JSON.stringify(selectedTxn.payload, null, 2)}
                </pre>
              </div>
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>From</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{selectedTxn.from}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>To</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{selectedTxn.to}</span>
                </div>
              </div>
              <button onClick={() => setShowTxnModal(false)} style={{ width: '100%', padding: '12px', borderRadius: '12px', background: '#0a0a0a', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer' }}>
                Done
              </button>
            </div>
          </Modal>
        )}

        {/* APPROVE MODAL */}
        {showApproveModal && pendingUser && (
          <Modal title="Approve Registration" onClose={() => setShowApproveModal(false)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '16px', background: '#f8fafc', borderRadius: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.2rem', color: '#0284c7' }}>
                  {pendingUser.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '1rem' }}>{pendingUser.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{pendingUser.details.business} · {pendingUser.details.location}</div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Assign Blockchain Role</label>
                <select
                  value={assignedRole}
                  onChange={(e) => setAssignedRole(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '600', outline: 'none' }}
                >
                  <option value="Farmer">Farmer</option>
                  <option value="Distributor">Distributor</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Retailer">Retailer</option>
                  <option value="Certifier">Certifier</option>
                  <option value="Transporter">Transporter</option>
                  <option value="Consumer">Consumer</option>
                </select>
                <p style={{ margin: '8px 0 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>This role will be mapped to their blockchain wallet address.</p>
              </div>

              <div style={{ padding: '14px', background: '#f0fdf4', borderRadius: '10px', border: '1px solid #dcfce7', fontSize: '0.85rem', color: '#166534' }}>
                ✓ Approving will trigger on-chain role assignment via smart contract
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => {
                    setDemoUsers(prev => prev.map(u =>
                      u.id === pendingUser.id ? { ...u, status: 'Active', role: assignedRole } : u
                    ));
                    setShowApproveModal(false);
                    setPendingUser(null);
                    showToast(`${pendingUser.name} approved as ${assignedRole} and added to the network.`);
                  }}
                  style={{ flex: 1, padding: '13px', borderRadius: '10px', background: '#22c55e', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer' }}
                >
                  Confirm & Approve
                </button>
                <button onClick={() => setShowApproveModal(false)} style={{ flex: 1, padding: '13px', borderRadius: '10px', background: '#f1f5f9', color: '#0a0a0a', border: 'none', fontWeight: '600', cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* TOAST */}
        {toast && (
          <div style={{
            position: 'fixed', bottom: '30px', right: '30px',
            padding: '14px 22px', borderRadius: '14px', zIndex: 9999,
            background: toast.type === 'error' ? '#ef4444' : '#22c55e',
            color: 'white', fontWeight: '600', fontSize: '0.9rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            display: 'flex', alignItems: 'center', gap: '10px',
            animation: 'slideUp 0.3s ease'
          }}>
            {toast.type === 'error' ? <X size={18} /> : <Check size={18} />}
            {toast.message}
          </div>
        )}

        <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

      </main>
    </div>
  );
};

export default Dashboard;
