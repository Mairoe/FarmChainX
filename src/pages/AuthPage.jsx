import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('farmer');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect');

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let data;

      if (isLogin) {
        // LOGIN — call real backend API and pass selected UI role for testing
        data = await authAPI.login(username, password, role);
      } else {
        // REGISTER — call real backend API
        data = await authAPI.register({ name, username, password, role });
      }

      // Store user in AuthContext (saves to localStorage too)
      login(data);

      // Navigate to the redirect path if provided, else user's dashboard
      if (redirectPath) {
        navigate(redirectPath);
      } else if (data.role === 'customer') {
        navigate('/dashboard/consumer');
      } else {
        navigate(`/dashboard/${data.role}`);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="auth-container">
      <div className="aurora-bg"></div>
      
      <div className="auth-content">
        <div className="auth-info">
          <div className="logo-section">
            <div className="logo-icon-large">
              <Leaf size={40} color="white" fill="white" />
            </div>
            <h1>FarmChainX</h1>
          </div>
          <p className="tagline">Blockchain-Powered Supply Chain Transparency</p>
        </div>

        <div className="auth-card glass-card">
          <div className="auth-header">
            <h2>Welcome</h2>
            <p>{isLogin ? 'Login to your account' : 'Join our transparent supply chain today'}</p>
          </div>

          {error && (
            <div style={{
              background: '#fef2f2',
              color: '#991b1b',
              padding: '12px 16px',
              borderRadius: '10px',
              fontSize: '0.9rem',
              marginBottom: '20px',
              border: '1px solid #fecaca'
            }}>
              {error}
            </div>
          )}

          <div className="auth-toggle">
            <button 
              className={isLogin ? 'active' : ''} 
              onClick={() => { setIsLogin(true); setError(''); }}
            >Login</button>
            <button 
              className={!isLogin ? 'active' : ''} 
              onClick={() => { setIsLogin(false); setError(''); }}
            >Register</button>
          </div>

          <form className="auth-form" onSubmit={handleAuth}>
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
            )}
            <div className="form-group">
              <label>Username</label>
              <input 
                type="text" 
                placeholder="Enter your username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder={isLogin ? "Enter your password" : "Create a password (min 6 chars)"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Role</label>
              <select 
                className="role-select" 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="customer">Customer</option>
                <option value="farmer">Farmer</option>
                <option value="distributor">Distributor</option>
                <option value="retailer">Retailer</option>
                <option value="warehouse">Warehouse</option>
                <option value="certifier">Certifier</option>
              </select>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Create Account')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
