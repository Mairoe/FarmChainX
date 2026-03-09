import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ShoppingCart, User, Menu } from 'lucide-react';
import '../styles/components.css';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const saved = localStorage.getItem('farmchain_cart');
      if (saved) {
        const cart = JSON.parse(saved);
        const total = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
        setCartCount(total);
      } else {
        setCartCount(0);
      }
    };

    updateCount();
    window.addEventListener('storage', updateCount);
    // Custom event for same-window updates
    window.addEventListener('farmchain_cart_updated', updateCount);
    
    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('farmchain_cart_updated', updateCount);
    };
  }, []);

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
          <Link to="/cart" className="cart-icon" style={{ position: 'relative' }}>
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#f59e0b',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                fontSize: '0.7rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                border: '2px solid white'
              }}>
                {cartCount}
              </span>
            )}
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
