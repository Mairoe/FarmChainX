import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ShoppingCart, User, Menu } from 'lucide-react';
import '../styles/components.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <Leaf size={24} color="white" fill="white" />
          </div>
          <span>FarmChainX</span>
        </Link>
        
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="nav-actions">
          <Link to="/shop" className="cart-icon">
            <ShoppingCart size={20} />
          </Link>
          <Link to="/auth" className="btn btn-primary auth-btn">
            <User size={18} />
            <span>Login</span>
          </Link>
          <button className="mobile-menu-btn">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
