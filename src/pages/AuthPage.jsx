import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import '../styles/auth.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('farmer'); // Default to farmer for testing
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();

    // Mock User Logic
    const mockUser = {
      name: isLogin ? 'User' : (e.target.elements[0]?.value || 'User'),
      email: isLogin ? (e.target.elements[0]?.value || 'user@example.com') : (e.target.elements[1]?.value || 'user@example.com'),
      role: role
    };
    localStorage.setItem('farmchain_user', JSON.stringify(mockUser));
    window.dispatchEvent(new Event('farmchain_auth_updated'));

    // Simple logic to navigate to dashboards
    if (role === 'customer') {
      navigate('/dashboard/consumer');
    } else {
      navigate(`/dashboard/${role}`);
    }
  };

  return (
    <div className="auth-container">
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
            <p>{isLogin ? 'Login or create an account to get started' : 'Join our transparent supply chain today'}</p>
          </div>

          <div className="auth-toggle">
            <button
              className={isLogin ? 'active' : ''}
              onClick={() => setIsLogin(true)}
            >Login</button>
            <button
              className={!isLogin ? 'active' : ''}
              onClick={() => setIsLogin(false)}
            >Register</button>
          </div>

          <form className="auth-form" onSubmit={handleAuth}>
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" required />
              </div>
            )}
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder={isLogin ? "Enter your password" : "Create a password"} required />
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

            <button type="submit" className="login-btn">
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
