import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, ShoppingCart, User, Menu } from 'lucide-react';
import '../styles/components.css';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateHeader = () => {
      // Update cart count
      const savedCart = localStorage.getItem('farmchain_cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        const total = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
        setCartCount(total);
      } else {
        setCartCount(0);
      }

      // Update user info
      const savedUser = localStorage.getItem('farmchain_user');
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    updateHeader();
    window.addEventListener('storage', updateHeader);
    window.addEventListener('farmchain_cart_updated', updateHeader);
    window.addEventListener('farmchain_auth_updated', updateHeader);

    return () => {
      window.removeEventListener('storage', updateHeader);
      window.removeEventListener('farmchain_cart_updated', updateHeader);
      window.removeEventListener('farmchain_auth_updated', updateHeader);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('farmchain_user');
    window.dispatchEvent(new Event('farmchain_auth_updated'));
    navigate('/');
  };

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
          <a href="/#features-section" onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}>About</a>
          <a href="#contact" onClick={(e) => {
            e.preventDefault();
            alert('Contact support at support@farmchainx.com');
          }}>Contact</a>
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
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Link to={user.role === 'customer' ? '/dashboard/consumer' : `/dashboard/${user.role}`} className="user-profile-nav" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#111b1d' }}>
                <div style={{ width: '32px', height: '32px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {user.name?.charAt(0) || 'U'}
                </div>
              </Link>
              <button 
                onClick={handleLogout}
                className="btn btn-outline" 
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth" className="btn btn-primary auth-btn">
              <User size={18} />
              <span>Login</span>
            </Link>
          )}

          <button className="mobile-menu-btn">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
