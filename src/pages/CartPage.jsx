import React from 'react';
import { 
  ChevronLeft, 
  Trash2, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/pages.css';

const CartPage = () => {
  return (
    <div className="cart-page-container">
      <Navbar />
      <div className="container" style={{paddingTop: '40px'}}>
        <Link to="/shop" className="back-link">
          <ChevronLeft size={18} />
          Back to Shop
        </Link>
        
        <h1 style={{marginTop: '30px', fontSize: '2.5rem'}}>Your Cart</h1>
        
        <div className="cart-layout">
          <div className="cart-items-section">
            <div className="cart-item glass-card" style={{padding: '24px', background: 'white', display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px'}}>
              <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Rice" style={{width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover'}} />
              <div className="cart-item-info" style={{flex: 1}}>
                <h3 style={{fontSize: '1.25rem'}}>Long Grain Rice</h3>
                <span style={{color: '#999', fontSize: '0.9rem'}}>2 kg</span>
                <div className="verified-status" style={{color: '#4a6b4a', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px'}}>
                  <ShieldCheck size={14} /> Verified
                </div>
              </div>
              <div className="cart-item-qty">
                <div className="qty-picker">
                  <button>-</button>
                  <span>1</span>
                  <button>+</button>
                </div>
              </div>
              <div className="cart-item-price" style={{fontSize: '1.25rem', fontWeight: 700, minWidth: '80px', textAlign: 'right'}}>
                $20.00
              </div>
              <button className="remove-item"><Trash2 size={18}/></button>
            </div>

            <div className="cart-item glass-card" style={{padding: '24px', background: 'white', display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px'}}>
              <img src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Tomatoes" style={{width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover'}} />
              <div className="cart-item-info" style={{flex: 1}}>
                <h3 style={{fontSize: '1.25rem'}}>Organic Tomatoes</h3>
                <span style={{color: '#999', fontSize: '0.9rem'}}>1 kg</span>
                <div className="verified-status" style={{color: '#4a6b4a', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px'}}>
                  <ShieldCheck size={14} /> Verified
                </div>
              </div>
              <div className="cart-item-qty">
                <div className="qty-picker">
                  <button>-</button>
                  <span>1</span>
                  <button>+</button>
                </div>
              </div>
              <div className="cart-item-price" style={{fontSize: '1.25rem', fontWeight: 700, minWidth: '80px', textAlign: 'right'}}>
                $15.00
              </div>
              <button className="remove-item"><Trash2 size={18}/></button>
            </div>
          </div>

          <aside className="order-summary-section">
            <div className="glass-card summary-card" style={{padding: '30px', background: 'white'}}>
              <h3 style={{marginBottom: '20px'}}>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>$35.00</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>$5.00</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total</span>
                <span>$40.00</span>
              </div>
              <button className="btn btn-primary checkout-btn">
                Proceed to Checkout
                <ArrowRight size={18} />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
