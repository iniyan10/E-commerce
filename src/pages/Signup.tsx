import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { API_URLS } from '../api';
import { User } from '../types';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useShop();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    try {
      // Fetch users from json-server to check if email exists
      const response = await fetch(`${API_URLS.users}?email=${formData.email}`);
      const existingUsers: User[] = await response.json();
      
      if (existingUsers.length > 0) {
        alert("Email already exists!");
        return;
      }
      
      const newUser = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: 'user',
        status: 'pending'
      };
      
      // Save to json-server backend
      const postResponse = await fetch(API_URLS.users, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });
      
      if (postResponse.ok) {
        alert("Registration successful! Redirecting to login...");
        navigate('/login');
      } else {
        alert("Registration failed! Server error.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during registration. Please ensure json-server is running.");
    }
  };

  return (
    <div className="container" style={{ padding: '60px 20px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ 
        background: 'var(--surface)', 
        padding: '50px', 
        borderRadius: 'var(--radius-lg)', 
        border: '1px solid var(--border)', 
        width: '100%', 
        maxWidth: '450px', 
        boxShadow: 'var(--shadow-md)' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 className="title" style={{ marginBottom: '10px' }}>Join Power House</h1>
          <p className="text-light">Create an account to start shopping</p>
        </div>
        
        <form onSubmit={handleSignup}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              name="fullName"
              className="form-control" 
              value={formData.fullName}
              onChange={handleChange}
              required 
              placeholder="John Doe"
              style={{ padding: '14px', width: '100%' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              name="email"
              className="form-control" 
              value={formData.email}
              onChange={handleChange}
              required 
              placeholder="email@example.com"
              style={{ padding: '14px', width: '100%' }}
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label">Password</label>
            <input 
              type="password" 
              name="password"
              className="form-control" 
              value={formData.password}
              onChange={handleChange}
              required 
              placeholder="Min. 6 characters"
              style={{ padding: '14px', width: '100%' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '30px' }}>
            <label className="form-label">Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              className="form-control" 
              value={formData.confirmPassword}
              onChange={handleChange}
              required 
              placeholder="Repeat your password"
              style={{ padding: '14px', width: '100%' }}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1.1rem' }}>
            Create Account
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '0.9rem', color: 'var(--text-light)' }}>
          Already have an account? <Link to="/login" className="text-accent" style={{ fontWeight: '500', textDecoration: 'none' }}>Sign In</Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <Link to="/home" style={{ fontSize: '0.85rem', color: 'var(--text-light)', opacity: 0.7 }}>← Back to Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
