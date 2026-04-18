import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Trash2 } from 'lucide-react';
import { CartItem } from '../types';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useShop();

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1 className="title">Your Cart is Empty</h1>
        <p className="subtitle">Looks like you haven't added anything yet.</p>
        <Link to="/" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h1 className="title" style={{ marginBottom: '30px' }}>Shopping Cart</h1>
      
      <div className="grid grid-cols-3" style={{ gap: '40px' }}>
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr auto', padding: '20px', borderBottom: '1px solid var(--border)', fontWeight: '600', color: 'var(--text-light)' }}>
              <div>Product</div>
              <div style={{ textAlign: 'center' }}>Quantity</div>
              <div style={{ textAlign: 'right' }}>Total</div>
              <div></div>
            </div>
            
            {cart.map((item: CartItem) => (
              <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr auto', padding: '20px', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div>
                    <h4 style={{ fontWeight: '600' }}>{item.name}</h4>
                    <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>₹{item.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '5px 10px', background: 'var(--bg-color)' }}>-</button>
                    <div style={{ padding: '5px 15px', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>{item.quantity}</div>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '5px 10px', background: 'var(--bg-color)' }}>+</button>
                  </div>
                </div>
                
                <div style={{ textAlign: 'right', fontWeight: '600' }}>
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>
                
                <div style={{ textAlign: 'right', paddingLeft: '20px' }}>
                  <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--danger)', padding: '8px' }}>
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div style={{ background: 'var(--surface)', padding: '30px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', position: 'sticky', top: '100px' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '1.25rem' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: 'var(--text-light)' }}>Subtotal</span>
              <span style={{ fontWeight: '600' }}>₹{getCartTotal().toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: 'var(--text-light)' }}>Shipping</span>
              <span style={{ fontWeight: '600', color: 'var(--success)' }}>Free</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-light)' }}>Tax</span>
              <span style={{ fontWeight: '600' }}>₹0</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '1.25rem', fontWeight: '700' }}>
              <span>Total</span>
              <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
            </div>
            
            <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>Proceed to Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
