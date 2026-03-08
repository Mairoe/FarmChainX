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
    name: 'Organic Tomatoes', 
    price: '$3.99', 
    unit: '/lb',
    farmer: 'Green Valley Farms', 
    aiScore: 96,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' 
  },
  { 
    id: 2, 
    name: 'Farm-Fresh Eggs', 
    price: '$5.95', 
    unit: '/dozen',
    farmer: 'Sunnydale Farm', 
    aiScore: 95,
    image: 'https://images.unsplash.com/photo-1569254994521-ddb542a7d203?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' 
  },
  { 
    id: 3, 
    name: 'Crisp Cucumbers', 
    price: '$1.99', 
    unit: 'each',
    farmer: 'Hilltop Acres', 
    aiScore: 94,
    image: 'https://images.unsplash.com/photo-1449339854873-750e6913301b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' 
  },
  { 
    id: 4, 
    name: 'Organic Strawberries', 
    price: '$4.99', 
    unit: '/lb',
    farmer: 'Green Valley Farms', 
    aiScore: 96,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' 
  },
  { 
    id: 5, 
    name: 'Golden Potatoes', 
    price: '$2.49', 
    unit: '/lb',
    farmer: 'Sunnydale Farm', 
    aiScore: 94,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f02bad67b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' 
  },
  { 
    id: 6, 
    name: 'Juicy Oranges', 
    price: '$4.49', 
    unit: '/bag',
    farmer: 'Riverbend Farms', 
    aiScore: 96,
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' 
  }
];

const ShopPage = () => {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="shop-container">
      {/* Marketplace Header Banner */}
      <section className="marketplace-banner dark-green-banner">
        <div className="banner-content">
          <h1>Farm Fresh Marketplace</h1>
          <p>Discover organic produce directly from verified farmers. Every product is traceable from farm to your table.</p>
          
          <div className="banner-stats">
            <div className="banner-stat">
              <span>Total Products</span>
              <h3>15</h3>
            </div>
            <div className="banner-stat">
              <span>Verified Farmers</span>
              <h3>8</h3>
            </div>
            <div className="banner-stat">
              <span>Organic Items</span>
              <h3>13</h3>
            </div>
            <div className="banner-stat">
              <span>Avg Rating</span>
              <h3>4.7</h3>
            </div>
          </div>
          
          <Link to="/cart" className="cart-badge-btn">
            <ShoppingBag size={20} />
            Cart
          </Link>
        </div>
      </section>

      {/* Category Selection */}
      <div className="category-selection container">
        <div className="category-card active">
          <div className="cat-icon-bg"><LayoutGrid size={24}/></div>
          <div className="cat-info">
            <h4>All Products</h4>
            <span>15 items</span>
          </div>
        </div>
        <div className="category-card">
          <div className="cat-icon-bg"><CheckCircle2 size={24}/></div>
          <div className="cat-info">
            <h4>Milk Products</h4>
            <span>5 items</span>
          </div>
        </div>
        <div className="category-card">
          <div className="cat-icon-bg"><CheckCircle2 size={24}/></div>
          <div className="cat-info">
            <h4>Fruits</h4>
            <span>5 items</span>
          </div>
        </div>
        <div className="category-card">
          <div className="cat-icon-bg"><CheckCircle2 size={24}/></div>
          <div className="cat-info">
            <h4>Vegetables</h4>
            <span>5 items</span>
          </div>
        </div>
      </div>

      <div className="shop-main-content container">
        {/* Sidebar Filters */}
        <aside className="shop-sidebar">
          <div className="filter-section">
            <div className="filter-header">
              <h3>Filter by</h3>
            </div>
            
            <div className="filter-group">
              <div className="filter-group-header">
                <h4>Category</h4>
                <ChevronDown size={16} />
              </div>
              <div className="filter-options">
                <label className="checkbox-container">
                  <input type="checkbox" /> Vegetables
                </label>
                <label className="checkbox-container">
                  <input type="checkbox" /> Fruits
                </label>
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-group-header">
                <h4>Location</h4>
                <ChevronDown size={16} />
              </div>
              <div className="filter-options">
                <label className="checkbox-container">
                  <input type="checkbox" /> All Locations
                </label>
                <label className="checkbox-container">
                  <input type="checkbox" /> Green Valley Farms
                </label>
                <label className="checkbox-container">
                  <input type="checkbox" /> Sunnydale Farm
                </label>
                <label className="checkbox-container">
                  <input type="checkbox" /> Hilltop Acres
                </label>
                <label className="checkbox-container">
                  <input type="checkbox" /> Riverbend Farms
                </label>
              </div>
            </div>

            <div className="filter-group">
              <div className="ai-verified-toggle">
                <span>AI Verified</span>
                <div className="toggle-switch"></div>
              </div>
            </div>

            <div className="blockchain-verified-badge">
              <ShieldCheck size={20} color="#2d3a2d" />
              <span>Blockchain Verified</span>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="product-area">
          <div className="product-toolbar">
            <div className="search-minimal-v2">
              <Search size={18} />
              <input type="text" placeholder="Search products, farmers..." />
            </div>
            
            <div className="toolbar-right">
              <div className="sort-badges">
                <button className="sort-badge">Price ↑</button>
                <button className="sort-badge active">Rating ↓</button>
                <button className="sort-badge">A-Z ↑</button>
              </div>
              
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
              
              <div className="sort-dropdown">
                <span>Sort by: </span>
                <select>
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className={`products-${viewMode}`}>
            {products.map((product) => (
              <motion.div 
                key={product.id}
                className="shop-product-card"
                whileHover={{ y: -5 }}
              >
                <div className="product-img-wrapper">
                  <img src={product.image} alt={product.name} />
                  <div className="badge-overlay">
                    <div className="organic-tag">
                      <ShieldCheck size={12} />
                      Organic
                    </div>
                  </div>
                </div>
                
                <div className="product-body">
                  <div className="product-meta">
                    <span className="farmer-label">{product.farmer}</span>
                    <div className="ai-score-pill">
                      <CheckCircle2 size={12} />
                      {product.aiScore}
                    </div>
                  </div>
                  <h3>{product.name}</h3>
                  <div className="product-pricing">
                    <span className="current-price">{product.price}</span>
                    <span className="unit-label">{product.unit}</span>
                  </div>
                  
                  <div className="product-actions">
                    <Link to={`/product/${product.id}`} className="details-btn">View Details</Link>
                    <button className="add-cart-btn">Add to Cart</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
