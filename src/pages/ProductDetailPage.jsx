import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ShoppingBag, 
  ChevronLeft, 
  Calendar, 
  MapPin, 
  Hash, 
  Layers, 
  ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import '../styles/pages.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // Mock data matching image 4
  const product = {
    name: 'Organic Tomatoes',
    farmer: 'Green Valley Farms',
    location: 'Green Valley Farms, California',
    price: '$3.99',
    unit: '/lb',
    aiScore: 96,
    harvestDate: 'April 22, 2024',
    batchId: '#FV36328C',
    category: 'Vegetables',
    availableQty: '250 pounds',
    description: 'Freshly harvested organic tomatoes that are juicy, ripe, and grown without the use of harmful pesticides. Enjoy the authentic taste of farm-fresh produce from Green Valley Farms.',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  };

  return (
    <div className="product-detail-container">
      <Navbar />
      <div className="container" style={{paddingTop: '40px'}}>
        <Link to="/shop" className="back-link">
          <ChevronLeft size={18} />
          Back to Shop
        </Link>
        
        <div className="product-detail-content glass-card" style={{marginTop: '20px', padding: '40px', background: 'white'}}>
          <div className="detail-grid">
            <div className="detail-image-section">
              <img src={product.image} alt={product.name} className="main-detail-img" />
              <div className="small-thumb-grid">
                <img src={product.image} alt="thumb" className="active" />
                <img src="https://images.unsplash.com/photo-1518977676601-b53f02bad67b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="thumb" />
              </div>
            </div>
            
            <div className="detail-info-section">
              <div className="detail-header">
                <p className="farmer-detail">{product.farmer}</p>
                <h1>{product.name}</h1>
                <div className="detail-pricing">
                  <span className="detail-price">{product.price}</span>
                  <span className="detail-unit">{product.unit}</span>
                </div>
              </div>

              <div className="detail-meta-pills">
                <div className="ai-score-banner">
                  <ShieldCheck size={20} />
                  <span>AI Score: {product.aiScore}/100</span>
                </div>
                <div className="blockchain-banner">
                  <ShieldCheck size={20} />
                  <span>Blockchain Verified</span>
                </div>
              </div>

              <div className="spec-grid glass-card" style={{padding: '20px', background: '#f8f9f8', boxShadow: 'none'}}>
                <div className="spec-item">
                  <Calendar size={18} />
                  <div className="spec-text">
                    <label>Harvest Date</label>
                    <span>{product.harvestDate}</span>
                  </div>
                </div>
                <div className="spec-item">
                  <Hash size={18} />
                  <div className="spec-text">
                    <label>Batch ID</label>
                    <span>{product.batchId}</span>
                  </div>
                </div>
                <div className="spec-item">
                  <MapPin size={18} />
                  <div className="spec-text">
                    <label>Farm Location</label>
                    <span>{product.location}</span>
                  </div>
                </div>
                <div className="spec-item">
                  <Layers size={18} />
                  <div className="spec-text">
                    <label>Category</label>
                    <span>{product.category}</span>
                  </div>
                </div>
                <div className="spec-item">
                  <ShoppingBag size={18} />
                  <div className="spec-text">
                    <label>Available Qty</label>
                    <span>{product.availableQty}</span>
                  </div>
                </div>
              </div>

              <div className="detail-description">
                <h3>Product Description</h3>
                <p>{product.description}</p>
              </div>

              <div className="detail-actions">
                <div className="qty-picker">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <button className="btn btn-primary detail-add-btn">
                  <ShoppingBag size={20} />
                  Add to Cart
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
