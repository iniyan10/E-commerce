import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { API_URLS } from '../api';
import { User } from '../types';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login, user } = useShop();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/admin');
    }
  }, [user, navigate]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch(`${API_URLS.users}?email=${email}&password=${password}`);
      const users: User[] = await response.json();
      
      if (users.length > 0) {
        const userData = users[0];
        if (userData.role === 'admin') {
          login(userData);
          navigate('/admin');
        } else {
          setError("Access Denied: This account is not authorized as an Administrator.");
        }
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during admin login:", error);
      setError("Server error. Please check if json-server is running.");
    }
  };

  return (
    <div className="container" style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ 
        background: 'var(--surface)', 
        color: 'white',
        padding: '50px', 
        borderRadius: 'var(--radius-lg)', 
        width: '100%', 
        maxWidth: '450px', 
        boxShadow: 'var(--shadow-lg)' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '10px' }}>Admin Login</h1>
          <p style={{ opacity: 0.8 }}>Secure Access for Power House Management</p>
        </div>
        
        {error && (
          <div style={{ background: 'rgba(230, 57, 70, 0.2)', color: '#ffb3b3', padding: '12px', borderRadius: '4px', marginBottom: '20px', fontSize: '0.9rem', border: '1px solid rgba(230, 57, 70, 0.3)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Admin Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              placeholder="admin@powerhouse.com"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '14px' }}
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Secure Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              placeholder="••••••••"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '14px' }}
            />
          </div>
          
          <button type="submit" className="btn" style={{ width: '100%', padding: '14px', fontSize: '1.1rem', backgroundColor: '#facc15', color: '#000', fontWeight: '700', border: 'none' }}>
            Enter Admin Panel
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Link to="/home" style={{ fontSize: '0.85rem', color: 'white', opacity: 0.7 }}>← Back to Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
