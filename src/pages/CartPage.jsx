import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Trash2, 
  ShieldCheck, 
  ArrowRight,
  ShoppingBag,
  CreditCard,
  Truck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/pages.css';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('farmchain_cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const removeFromCart = (cartId) => {
    const newCart = cart.filter(item => item.cartId !== cartId);
    setCart(newCart);
    localStorage.setItem('farmchain_cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('farmchain_cart_updated'));
  };

  const updateQuantity = (cartId, delta) => {
    const newCart = cart.map(item => {
      if (item.cartId === cartId) {
        return { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) };
      }
      return item;
    });
    setCart(newCart);
    localStorage.setItem('farmchain_cart', JSON.stringify(newCart));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const deliveryFee = cart.length > 0 ? 5.00 : 0.00;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    setPaymentSuccess(true);
    localStorage.removeItem('farmchain_cart');
    window.dispatchEvent(new Event('farmchain_cart_updated'));
  };

  if (paymentSuccess) {
    return (
      <div className="cart-page-container" style={{ background: '#fdfaf5', minHeight: '100vh' }}>
        <Navbar />
        <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="payment-success-card glass-card"
            style={{ maxWidth: '600px', margin: '0 auto', padding: '60px', background: 'white', borderRadius: '40px' }}
          >
            <div style={{ width: '100px', height: '100px', background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>
              <ShieldCheck size={48} color="#10b981" />
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1e291e', marginBottom: '16px' }}>Payment Successful!</h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '40px' }}>Your transaction has been verified on the blockchain. Your produce is being prepared for delivery.</p>
            
            <div className="qr-section" style={{ background: '#f8fafc', padding: '40px', borderRadius: '32px', marginBottom: '40px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px' }}>Your Collection QR Code</h3>
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FARMCHAIN-ORDER-${Date.now()}`} 
                alt="Order QR Code" 
                style={{ width: '200px', height: '200px', borderRadius: '16px', border: '10px solid white', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }} 
              />
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '20px' }}>Scan this at the delivery node or with your farmer to confirm receipt.</p>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <Link to="/shop" className="btn btn-primary" style={{ flex: 1, padding: '20px', borderRadius: '20px', background: '#2d3a2d', color: 'white', fontWeight: 800 }}>Continue Shopping</Link>
              <button onClick={() => window.print()} className="btn" style={{ padding: '20px', borderRadius: '20px', border: '2px solid #e2e8f0', color: '#64748b', fontWeight: 800 }}>Print Receipt</button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-container" style={{ background: '#fdfaf5', minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ padding: '40px 0' }}>
        <Link to="/shop" className="back-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2d3a2d', textDecoration: 'none', fontWeight: 600 }}>
          <ChevronLeft size={18} />
          Back to Marketplace
        </Link>
        
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px solid #f0f0f0', paddingBottom: '20px', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-1px', color: '#1e291e' }}>Your Basket</h1>
            <p style={{ color: '#64748b' }}>Verified organic produce ready for node-certified delivery.</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2d3a2d' }}>{cart.length} verified types</span>
          </div>
        </div>
        
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <ShoppingBag size={80} color="#e2e8f0" style={{ marginBottom: '20px' }} />
            <h2 style={{ fontSize: '1.5rem', color: '#64748b' }}>Your basket is currently empty</h2>
            <Link to="/shop" className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-flex' }}>Explore Marketplace</Link>
          </div>
        ) : (
          <div className="cart-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '60px', alignItems: 'start' }}>
            <div className="cart-items-section">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div 
                    key={item.cartId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="cart-item glass-card" 
                    style={{ padding: '30px', background: 'white', borderRadius: '24px', display: 'flex', gap: '30px', alignItems: 'center', marginBottom: '20px', border: '1px solid #f0f0f0' }}
                  >
                    <img src={item.image} alt={item.name} style={{ width: '120px', height: '120px', borderRadius: '16px', objectFit: 'cover' }} />
                    <div className="cart-item-info" style={{ flex: 1 }}>
                      <span style={{ fontSize: '0.8rem', color: '#7a6e5d', fontWeight: 600 }}>Farmer: {item.farmer}</span>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '4px 0' }}>{item.name}</h3>
                      <div className="verified-status" style={{ color: '#4a6b4a', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <ShieldCheck size={14} /> Node Verified • Active Chain
                      </div>
                      
                      <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '15px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', borderRadius: '12px', padding: '4px' }}>
                          <button onClick={() => updateQuantity(item.cartId, -1)} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: 'white', cursor: 'pointer', fontWeight: 800 }}>-</button>
                          <span style={{ padding: '0 15px', fontWeight: 700 }}>{item.quantity || 1}</span>
                          <button onClick={() => updateQuantity(item.cartId, 1)} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: 'white', cursor: 'pointer', fontWeight: 800 }}>+</button>
                        </div>
                        <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>x ${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="cart-item-price" style={{ fontSize: '1.6rem', fontWeight: 900, color: '#2d3a2d', minWidth: '120px', textAlign: 'right' }}>
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </div>
                    <button 
                      className="remove-item" 
                      onClick={() => removeFromCart(item.cartId)}
                      style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '12px', borderRadius: '12px', cursor: 'pointer' }}
                    >
                      <Trash2 size={20}/>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <aside className="order-summary-section" style={{ position: 'sticky', top: '40px' }}>
              <div className="glass-card summary-card" style={{ padding: '40px', background: 'white', borderRadius: '32px', border: '1px solid #f0f0f0' }}>
                <h3 style={{ marginBottom: '30px', fontSize: '1.5rem', fontWeight: 800 }}>Order Summary</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                    <span>Verified Subtotal</span>
                    <span style={{ fontWeight: 700, color: '#2d3a2d' }}>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Truck size={16}/> Certified Logistics</span>
                    <span style={{ fontWeight: 700, color: '#2d3a2d' }}>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="summary-divider" style={{ height: '1px', background: '#f0f0f0', margin: '10px 0' }}></div>
                  <div className="summary-row total" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 900 }}>
                    <span>Total Amount</span>
                    <span style={{ color: '#2d3a2d' }}>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button 
                    onClick={handleCheckout}
                    className="btn btn-primary checkout-btn" 
                    style={{ height: '64px', borderRadius: '20px', fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', width: '100%', background: '#2d3a2d', color: 'white', border: 'none', cursor: 'pointer' }}
                  >
                    <CreditCard size={20} />
                    Secure Checkout
                    <ArrowRight size={20} />
                  </button>
                  <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <ShieldCheck size={14} /> Transactions are blockchain-verified
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '30px', padding: '24px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>Certified Node: #US-EAST-4</h4>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>Your order is processed via the nearest verified logistics node to ensure maximum freshness.</p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
