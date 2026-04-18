import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { CheckCircle } from 'lucide-react';
import { BillingDetails } from '../types';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, placeOrder } = useShop();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState<BillingDetails>({
    name: '', email: '', address: '', city: '', zip: '', card: '', exp: '', cvv: ''
  });

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1 className="title">Oops!</h1>
        <p className="subtitle">Your cart is empty. Please add items to checkout.</p>
        <Link to="/" className="btn btn-primary">Go to Home</Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder(formData);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="container animate-fade-in" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <CheckCircle size={80} color="var(--success)" style={{ marginBottom: '20px' }} />
        <h1 className="title">Order Confirmed!</h1>
        <p className="subtitle" style={{ maxWidth: '400px', margin: '0 auto 30px' }}>
          Thank you for shopping with Power House. Your order has been placed successfully and will be processed soon.
        </p>
        <Link to="/orders" className="btn btn-primary">View My Orders</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h1 className="title" style={{ marginBottom: '30px' }}>Checkout</h1>
      
      <div className="grid grid-cols-2" style={{ gap: '40px' }}>
        <div>
          <form id="checkout-form" onSubmit={handleSubmit} style={{ background: 'var(--surface)', padding: '30px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <h3 style={{ marginBottom: '20px' }}>Billing Details</h3>
            
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input required type="text" name="name" className="form-control" onChange={handleInputChange} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input required type="email" name="email" className="form-control" onChange={handleInputChange} />
            </div>

            <div className="form-group">
              <label className="form-label">Shipping Address</label>
              <input required type="text" name="address" className="form-control" onChange={handleInputChange} />
            </div>

            <div className="grid grid-cols-2" style={{ gap: '16px', marginBottom: '20px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">City</label>
                <input required type="text" name="city" className="form-control" onChange={handleInputChange} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Pincode</label>
                <input required type="text" name="zip" className="form-control" onChange={handleInputChange} />
              </div>
            </div>

            <h3 style={{ margin: '30px 0 20px', borderTop: '1px solid var(--border)', paddingTop: '30px' }}>Payment Information</h3>
            
            <div className="form-group">
              <label className="form-label">Card Number</label>
              <input required type="text" name="card" placeholder="XXXX XXXX XXXX XXXX" className="form-control" onChange={handleInputChange} />
            </div>

            <div className="grid grid-cols-2" style={{ gap: '16px', marginBottom: '10px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Expiry (MM/YY)</label>
                <input required type="text" name="exp" placeholder="MM/YY" className="form-control" onChange={handleInputChange} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">CVV</label>
                <input required type="text" name="cvv" placeholder="XXX" className="form-control" onChange={handleInputChange} />
              </div>
            </div>
          </form>
        </div>
        
        <div>
          <div style={{ background: 'var(--surface)', padding: '30px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', position: 'sticky', top: '100px' }}>
            <h3 style={{ marginBottom: '20px' }}>Your Cart</h3>
            
            <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px', paddingRight: '10px' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                      <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--accent)', color: '#111', fontSize: '0.7rem', width: '18px', height: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', fontWeight: 'bold' }}>{item.quantity}</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                  </div>
                  <div style={{ fontWeight: '500' }}>₹{item.price.toLocaleString('en-IN')}</div>
                </div>
              ))}
            </div>
            
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className="text-light">Subtotal</span>
                <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.25rem', fontWeight: '700' }}>
                <span>Total</span>
                <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <button form="checkout-form" type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', marginTop: '10px' }}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
