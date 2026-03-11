import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ShoppingBag, 
  ChevronLeft, 
  Calendar, 
  MapPin, 
  Hash, 
  Layers, 
  ArrowRight,
  Star,
  Zap,
  CheckCircle2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import '../styles/pages.css';

const products = [
  { 
    id: 1, 
    name: 'Oxheart Heirloom Tomatoes', 
    price: 330, 
    unit: '/kg',
    farmer: 'Sun Valley Organic Farm', 
    aiScore: 98,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?q=80&w=1000&auto=format&fit=crop',
    description: 'Our Oxheart Heirloom Tomatoes are hand-picked at peak ripeness. Grown in nutrient-rich volcanic soil, these tomatoes offer a complex, sweet flavor and a meaty texture perfect for salads and gourmet sauces.',
    batchId: 'FARM-BT-220A'
  },
  { 
    id: 2, 
    name: 'Farm-Fresh Brown Eggs', 
    price: 495, 
    unit: '/dozen',
    farmer: 'Heritage Highland Farms', 
    aiScore: 95,
    category: 'Protein',
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=1000&auto=format&fit=crop',
    description: 'Sourced from free-roaming hens that enjoy an organic diet. These eggs have deep orange yolks and superior flavor, packed with natural Omega-3s.',
    batchId: 'FARM-BT-112X'
  },
  { 
    id: 3, 
    name: 'Crisp English Cucumbers', 
    price: 165, 
    unit: 'each',
    farmer: 'Hilltop Acres', 
    aiScore: 94,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1587411768638-ec71f8e33b78?q=80&w=1000&auto=format&fit=crop',
    description: 'Incredibly crisp and refreshing English cucumbers, grown in climate-controlled organic greenhouses to ensure consistent quality and flavor.',
    batchId: 'FARM-BT-095C'
  },
  { 
    id: 4, 
    name: 'Wild Organic Strawberries', 
    price: 415, 
    unit: '/kg',
    farmer: 'Sun Valley Organic Farm', 
    aiScore: 99,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=1000&auto=format&fit=crop',
    description: 'Tiny bursts of pure summer sweetness. Our wild organic strawberries are grown without synthetic fertilizers and are picked when they reach deep ruby perfection.',
    batchId: 'FARM-BT-101S'
  },
  { 
    id: 5, 
    name: 'Pure Wildflower Honey', 
    price: 1310, 
    unit: '340g jar',
    farmer: 'Pure Bee Apiaries', 
    aiScore: 97,
    category: 'Natural Swts',
    image: '/images/honey.jpg',
    description: 'Raw, unfiltered honey collected from bees foraging in wild flower meadows. Rich in enzymes and local pollen, this honey is a natural powerhouse of health.',
    batchId: 'FARM-BT-005H'
  },
  { 
    id: 6, 
    name: 'Valencia Juicy Oranges', 
    price: 370, 
    unit: '/bag',
    farmer: 'Riverbend Farms', 
    aiScore: 96,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=1000&auto=format&fit=crop',
    description: 'Sweet, thin-skinned Valencia oranges perfect for fresh juice or snacking. Sustainably grown in coastal orchards.',
    batchId: 'FARM-BT-V88'
  }
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const found = products.find(p => p.id === parseInt(id));
    if (found) setProduct(found);
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    const currentCart = JSON.parse(localStorage.getItem('farmchain_cart') || '[]');
    const existingIndex = currentCart.findIndex(item => item.id === product.id);
    let newCart;
    if (existingIndex > -1) {
      newCart = [...currentCart];
      newCart[existingIndex].quantity = (newCart[existingIndex].quantity || 0) + quantity;
    } else {
      newCart = [...currentCart, { ...product, quantity, cartId: Date.now() }];
    }
    
    localStorage.setItem('farmchain_cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('farmchain_cart_updated'));
    
    // Feedback
    const btn = document.getElementById('add-btn');
    if (btn) {
      const original = btn.innerHTML;
      btn.innerHTML = 'Successfully Added!';
      btn.style.background = '#10b981';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '#2d3a2d';
      }, 2000);
    }
  };

  if (!product) return <div className="loading">Processing Node Request...</div>;

  return (
    <div className="product-detail-container" style={{ background: '#fdfaf5', minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ paddingTop: '40px' }}>
        <Link to="/shop" className="back-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2d3a2d', fontWeight: 600, textDecoration: 'none' }}>
          <ChevronLeft size={18} />
          Back to Marketplace
        </Link>
        
        <div className="product-detail-content glass-card" style={{ marginTop: '30px', padding: '60px', background: 'white', borderRadius: '40px', border: '1px solid #f0f0f0' }}>
          <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
            <div className="detail-image-section">
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={product.image} 
                alt={product.name} 
                style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
              />
              <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1, padding: '20px', background: '#f8fafc', borderRadius: '20px', textAlign: 'center' }}>
                  <ShieldCheck size={24} color="#3b82f6" style={{ marginBottom: '8px' }} />
                  <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>Blockchain Proof</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>On-Chain #88219</div>
                </div>
                <div style={{ flex: 1, padding: '20px', background: '#f0fdf4', borderRadius: '20px', textAlign: 'center' }}>
                  <Zap size={24} color="#10b981" style={{ marginBottom: '8px' }} />
                  <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>Node Velocity</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>2h Transit Time</div>
                </div>
              </div>
            </div>
            
            <div className="detail-info-section">
              <div className="detail-header">
                <span style={{ fontSize: '1rem', color: '#7a6e5d', fontWeight: 600 }}>{product.farmer}</span>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-2px', color: '#1e291e', margin: '10px 0' }}>{product.name}</h1>
                <div className="detail-pricing" style={{ fontSize: '2.5rem', fontWeight: 900, color: '#2d3a2d', marginTop: '20px' }}>
                  <span>₹{product.price.toFixed(2)}</span>
                  <span style={{ fontSize: '1.2rem', color: '#94a3b8', fontWeight: 500, marginLeft: '8px' }}>{product.unit}</span>
                </div>
              </div>

              <div className="spec-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '40px 0', borderTop: '2px solid #f8f8f8', paddingTop: '40px' }}>
                <div className="spec-item" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fdfaf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Hash size={18}/>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Tracing ID</label>
                    <span style={{ fontWeight: 700 }}>{product.batchId}</span>
                  </div>
                </div>
                <div className="spec-item" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fdfaf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Layers size={18}/>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Legacy</label>
                    <span style={{ fontWeight: 700 }}>{product.category}</span>
                  </div>
                </div>
                <div className="spec-item" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fdfaf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Star size={18} color="#f59e0b" fill="#f59e0b"/>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>AI Integrity</label>
                    <span style={{ fontWeight: 700 }}>{product.aiScore}% Stable</span>
                  </div>
                </div>
                <div className="spec-item" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fdfaf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle2 size={18} color="#10b981"/>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>State</label>
                    <span style={{ fontWeight: 700, color: '#10b981' }}>Verified Harvest</span>
                  </div>
                </div>
              </div>

              <div className="detail-description">
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>Farm Notes</h3>
                <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '1rem' }}>{product.description}</p>
              </div>

              <div className="detail-actions" style={{ marginTop: '60px', display: 'flex', gap: '20px' }}>
                <div className="qty-picker" style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '20px', padding: '8px' }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: '48px', height: '48px', borderRadius: '16px', border: 'none', background: 'white', cursor: 'pointer', fontWeight: 800 }}>-</button>
                  <span style={{ padding: '0 24px', fontWeight: 900, fontSize: '1.2rem' }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} style={{ width: '48px', height: '48px', borderRadius: '16px', border: 'none', background: 'white', cursor: 'pointer', fontWeight: 800 }}>+</button>
                </div>
                <button 
                  id="add-btn"
                  onClick={addToCart}
                  className="btn btn-primary detail-add-btn" 
                  style={{ flex: 1, borderRadius: '24px', fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: '#2d3a2d', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  <ShoppingBag size={24} />
                  Add to Basket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
