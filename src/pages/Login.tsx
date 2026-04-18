import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { API_URLS } from '../api';
import { User } from '../types';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, user } = useShop();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_URLS.users}?email=${email}&password=${password}`);
      const users: User[] = await response.json();
      
      if (users.length > 0) {
        const userData = users[0];
        login(userData);
        navigate('/home');
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please ensure json-server is running.");
    }
  };

  return (
    <div className="container" style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ background: 'var(--surface)', padding: '50px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', width: '100%', maxWidth: '450px', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 className="title" style={{ marginBottom: '10px' }}>Welcome Back</h1>
          <p className="text-light">Sign in to your Power House account</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              style={{ padding: '14px' }}
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '10px' }}>
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={{ padding: '14px' }}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '30px' }}>
            <a href="#" className="text-accent" style={{ fontSize: '0.9rem' }}>Forgot password?</a>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1.1rem' }}>
            Sign In
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '0.9rem', color: 'var(--text-light)' }}>
          Don't have an account? <Link to="/signup" className="text-accent" style={{ fontWeight: '500' }}>Create one</Link>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <Link to="/home" style={{ fontSize: '0.85rem', color: 'var(--text-light)', opacity: 0.7 }}>← Back to Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
