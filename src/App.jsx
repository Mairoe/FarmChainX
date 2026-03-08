import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import Dashboard from './pages/Dashboard';
import ConsumerDashboard from './pages/roles/ConsumerDashboard';
import FarmerPage from './pages/roles/FarmerPage';
import DistributorPage from './pages/roles/DistributorPage';
import CertifierPage from './pages/roles/CertifierPage';
import RetailerPage from './pages/roles/RetailerPage';
import WarehousePage from './pages/roles/WarehousePage';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Main Site with Navbar */}
          <Route path="/" element={<><Navbar /><LandingPage /></>} />
          <Route path="/shop" element={<><Navbar /><ShopPage /></>} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Dashboards - Different routes for different roles */}
          <Route path="/dashboard/consumer" element={<ConsumerDashboard />} />
          <Route path="/dashboard/farmer" element={<FarmerPage />} />
          <Route path="/dashboard/certifier" element={<CertifierPage />} />
          <Route path="/dashboard/distributor" element={<DistributorPage />} />
          <Route path="/dashboard/retailer" element={<RetailerPage />} />
          <Route path="/dashboard/warehouse" element={<WarehousePage />} />
          <Route path="/dashboard/admin" element={<Dashboard role="admin" />} />
          
          {/* Default to landing if not found */}
          <Route path="*" element={<><Navbar /><LandingPage /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
