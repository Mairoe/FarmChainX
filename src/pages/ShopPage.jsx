import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Eye, 
  ShieldCheck, 
  ChevronDown,
  LayoutGrid,
  List,
  CheckCircle2,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/shop.css';

const products = [
  { 
    id: 1, 
    name: 'Oxheart Heirloom Tomatoes', 
    price: 3.99, 
    unit: '/lb',
    farmer: 'Sun Valley Organic Farm', 
    aiScore: 98,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1000&auto=format&fit=crop' 
  },
  { 
    id: 2, 
    name: 'Farm-Fresh Brown Eggs', 
    price: 5.95, 
    unit: '/dozen',
    farmer: 'Heritage Highland Farms', 
    aiScore: 95,
    category: 'Protein',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e34ef?q=80&w=1000&auto=format&fit=crop' 
  },
  { 
    id: 3, 
    name: 'Crisp English Cucumbers', 
    price: 1.99, 
    unit: 'each',
    farmer: 'Hilltop Acres', 
    aiScore: 94,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d02e?q=80&w=1000&auto=format&fit=crop' 
  },
  { 
    id: 4, 
    name: 'Wild Organic Strawberries', 
    price: 4.99, 
    unit: '/lb',
    farmer: 'Sun Valley Organic Farm', 
    aiScore: 99,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1000&auto=format&fit=crop' 
  },
  { 
    id: 5, 
    name: 'Pure Wildflower Honey', 
    price: 15.80, 
    unit: '12oz jar',
    farmer: 'Pure Bee Apiaries', 
    aiScore: 97,
    category: 'Natural Swts',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e70c262?q=80&w=1000&auto=format&fit=crop' 
  },
  { 
    id: 6, 
    name: 'Valencia Juicy Oranges', 
    price: 4.49, 
    unit: '/bag',
    farmer: 'Riverbend Farms', 
    aiScore: 96,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=1000&auto=format&fit=crop' 
  }
];

const ShopPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('farmchain_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const addToCart = (product) => {
    const existingIndex = cart.findIndex(item => item.id === product.id);
    let newCart;
    if (existingIndex > -1) {
      newCart = [...cart];
      newCart[existingIndex].quantity = (newCart[existingIndex].quantity || 1) + 1;
    } else {
      newCart = [...cart, { ...product, quantity: 1, cartId: Date.now() }];
    }
    
    setCart(newCart);
    localStorage.setItem('farmchain_cart', JSON.stringify(newCart));
    // Dispatch event for Navbar update
    window.dispatchEvent(new Event('farmchain_cart_updated'));
    // Brief visual feedback
    const btn = document.getElementById(`add-${product.id}`);
    if (btn) {
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Added!';
      btn.style.background = '#10b981';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '#2d3a2d';
      }, 1000);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="shop-container">
      {/* Marketplace Header Banner */}
      <section className="marketplace-banner dark-green-banner">
        <div className="banner-content">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Digital Farm Marketplace
          </motion.h1>
          <p>Traceable, organic produce sourced from node-verified heritage farms across the region.</p>
          
          <div className="banner-stats">
            <div className="banner-stat">
              <span>Active Batches</span>
              <h3>{products.length * 4}</h3>
            </div>
            <div className="banner-stat">
              <span>Trust Index</span>
              <h3>98.4%</h3>
            </div>
            <div className="banner-stat">
              <span>Node Uptime</span>
              <h3>99.9%</h3>
            </div>
          </div>
          
          <Link to="/cart" className="cart-badge-btn pulse-hover">
            <ShoppingBag size={20} />
            <span>Basket</span>
            {cart.reduce((acc, item) => acc + (item.quantity || 1), 0) > 0 && (
              <span className="cart-count-badge">
                {cart.reduce((acc, item) => acc + (item.quantity || 1), 0)}
              </span>
            )}
          </Link>
        </div>
      </section>

      {/* Category Selection */}
      <div className="category-selection container">
        {['All Products', 'Protein', 'Fruits', 'Vegetables', 'Natural Swts'].map((cat, idx) => (
          <motion.div 
            key={cat} 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`category-card ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            <div className="cat-icon-bg">
              {cat === 'All Products' ? <LayoutGrid size={22}/> : <CheckCircle2 size={22}/>}
            </div>
            <div className="cat-info">
              <h4>{cat}</h4>
              <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                {cat === 'All Products' ? products.length : products.filter(p => p.category === cat).length} types
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="shop-main-content container">
        {/* Sidebar Filters */}
        <aside className="shop-sidebar">
          <div className="filter-section">
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '24px', letterSpacing: '-0.5px' }}>Market Core</h3>
            
            <div className="filter-group">
              <div className="search-minimal-v2">
                <Search size={18} color="#94a3b8" />
                <input 
                  type="text" 
                  placeholder="Seach farm/product..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group" style={{ marginTop: '32px' }}>
              <div className="filter-group-header">
                <h4 style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', opacity: 0.5 }}>Trust Protocols</h4>
              </div>
              <div className="filter-options" style={{ marginTop: '15px' }}>
                <label className="checkbox-container">
                  <input type="checkbox" defaultChecked /> 
                  <span className="checkmark"></span>
                  Blockchain Validated
                </label>
                <label className="checkbox-container">
                  <input type="checkbox" /> 
                  <span className="checkmark"></span>
                  Node-to-Table
                </label>
              </div>
            </div>

            <div className="blockchain-verified-badge" style={{ marginTop: '40px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <ShieldCheck size={20} color="#3b82f6" />
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: '800' }}>Active Network</div>
                <div style={{ fontSize: '0.65rem', opacity: 0.6 }}>Synchronized Hub: CH-902</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="product-area">
          <div className="product-toolbar premium-toolbar">
            <div className="toolbar-stats">
              Showing <strong>{filteredProducts.length}</strong> verified items
            </div>
            <div className="toolbar-right">
              <div className="view-toggle">
                <button 
                  className={viewMode === 'grid' ? 'active' : ''} 
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid size={18}/>
                </button>
                <button 
                  className={viewMode === 'list' ? 'active' : ''} 
                  onClick={() => setViewMode('list')}
                >
                  <List size={18}/>
                </button>
              </div>
            </div>
          </div>

          <div className={`products-${viewMode}`}>
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="shop-product-card glass-hover"
                >
                  <div className="product-img-wrapper" style={{ overflow: 'hidden' }}>
                    <img src={product.image} alt={product.name} style={{ transition: 'transform 0.6s ease' }} />
                    <div className="badge-overlay">
                      <div className="organic-tag" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(5px)', color: '#2d3a2d' }}>
                        <ShieldCheck size={12} />
                        Node Certified
                      </div>
                    </div>
                  </div>
                  
                  <div className="product-body">
                    <div className="product-meta">
                      <span className="farmer-label">{product.farmer}</span>
                      <div className="ai-score-pill">
                        <Star size={12} fill="#f59e0b" color="#f59e0b" />
                        {product.aiScore}
                      </div>
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#1e291e', margin: '4px 0 12px 0' }}>{product.name}</h3>
                    <div className="product-pricing">
                      <span className="current-price">${product.price}</span>
                      <span className="unit-label" style={{ marginLeft: '4px' }}>{product.unit}</span>
                    </div>
                    
                    <div className="product-actions" style={{ marginTop: '20px' }}>
                      <Link to={`/product/${product.id}`} className="details-btn">View</Link>
                      <button 
                        id={`add-${product.id}`}
                        className="add-cart-btn"
                        onClick={() => addToCart(product)}
                      >
                        Add to Basket
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
