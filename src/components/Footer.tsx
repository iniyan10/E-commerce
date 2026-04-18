import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3 className="logo" style={{ color: '#000', marginBottom: '20px' }}>Power House</h3>
            <p style={{ color: '#000', maxWidth: '300px' }}>
              Premium timepieces for every occasion. Experience elegance, durability, and style with our curated collections.
            </p>
          </div>
          
          <div>
            <h4 className="footer-title">Shop</h4>
            <ul className="footer-links">
              <li><Link to="/category/male">Men's Watches</Link></li>
              <li><Link to="/category/female">Women's Watches</Link></li>
              <li><Link to="/category/male/smart">Smart Watches</Link></li>
              <li><Link to="/category/male/sports">Sports Watches</Link></li>
              <li><Link to="/category/male/formal">Formal Watches</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Customer Service</h4>
            <ul className="footer-links">
              <li><Link to="/#">Contact Support</Link></li>
              <li><Link to="/orders">Track Order</Link></li>
              <li><Link to="/#">Returns & Exchanges</Link></li>
              <li><Link to="/#">Shipping Info</Link></li>
              <li><Link to="/#">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              <li><Link to="/#">Terms of Service</Link></li>
              <li><Link to="/#">Privacy Policy</Link></li>
              <li><Link to="/#">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Power House. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
