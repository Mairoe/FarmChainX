import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sprout, Truck, Store } from 'lucide-react';
import '../styles/pages.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="container hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <span className="badge">Blockchain Powered</span>
            <h1>Trust Every Bite with <span>FarmChainX</span></h1>
            <p>Empowering consumers with transparent, blockchain-tracked organic produce. From seed to shelf, we ensure quality and authenticity.</p>
            <div className="hero-btns">
              <button className="btn btn-primary">Start Tracking <ArrowRight size={18}/></button>
              <button className="btn btn-outline">Learn More</button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hero-image"
          >
            <div className="hero-blob"></div>
            <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Sustainable Farming" />
          </motion.div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Our Transparent Ecosystem</h2>
            <p>A seamless supply chain for all stakeholders.</p>
          </div>
          
          <div className="features-grid">
            {[
              { icon: <Sprout size={32}/>, title: 'Farmers', desc: 'Log production practices and seed sources securely.' },
              { icon: <ShieldCheck size={32}/>, title: 'Certifiers', desc: 'Immutable validation of organic standards.' },
              { icon: <Truck size={32}/>, title: 'Distributors', desc: 'Real-time tracking of movement and storage.' },
              { icon: <Store size={32}/>, title: 'Retailers', desc: 'Verify authenticity before reaching consumers.' }
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="feature-card glass-card"
              >
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
