import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, Search } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Navbar: React.FC = () => {
  const { cart, user, logout } = useShop();
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo">
          Power House
        </Link>

        <div className="nav-links">
          <Link to="/category/male" className="nav-link">Men</Link>
          <Link to="/category/female" className="nav-link">Women</Link>
        </div>

        <div className="nav-actions">
          <button className="nav-link" aria-label="Search">
            <Search size={20} />
          </button>
          
          {user ? (
            <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
              {user.role === 'admin' && (
                <Link to="/admin" className="nav-link" style={{color: 'var(--primary)', fontWeight: '600'}}>Admin Panel</Link>
              )}
              <Link to="/orders" className="nav-link">Orders</Link>
              <button onClick={logout} className="nav-link" style={{fontSize: '0.9rem', cursor: 'pointer'}}>Logout ({user.name || user.email})</button>
            </div>
          ) : (
            <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
              <Link to="/login" className="nav-link" aria-label="Login">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem', borderRadius: 'var(--radius-md)', color: '#000', textDecoration: 'none' }}>
                Sign Up
              </Link>
              <Link to="/admin-login" className="btn" style={{ padding: '8px 24px', fontSize: '0.9rem', color: '#facc15', fontWeight: '600', textDecoration: 'none' }}>
                Admin
              </Link>
            </div>
          )}

          <Link to="/cart" className="nav-link cart-icon" aria-label="Shopping Cart">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </Link>
          
          <button className="nav-link mobile-menu-btn" style={{display: 'none'}}>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
