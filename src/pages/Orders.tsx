import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Package } from 'lucide-react';
import { Order, CartItem } from '../types';

const Orders: React.FC = () => {
  const { orders, user } = useShop();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (orders.length === 0) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <Package size={60} color="#ccc" style={{ marginBottom: '20px' }} />
        <h1 className="title">No Orders Yet</h1>
        <p className="subtitle">When you place orders, they will appear here.</p>
        <Link to="/" className="btn btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px', minHeight: '60vh' }}>
      <h1 className="title" style={{ marginBottom: '40px' }}>Order History</h1>
      
      <div className="grid" style={{ gap: '30px' }}>
        {orders.map((order: Order) => (
          <div key={order.id} style={{ background: 'var(--surface)', padding: '30px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
              <div>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '4px' }}>Order ID: #{order.id}</p>
                <p style={{ fontWeight: 500 }}>Placed on {new Date(order.date).toLocaleDateString('en-IN')}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: '700', fontSize: '1.2rem', marginBottom: '4px' }}>₹{order.total.toLocaleString('en-IN')}</p>
                <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>{order.status}</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {order.items.map((item: CartItem, idx: number) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'center', background: 'var(--bg-color)', padding: '16px', borderRadius: 'var(--radius)', minWidth: '300px', flex: 1 }}>
                  <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div>
                    <Link to={`/product/${item.id}`} style={{ fontWeight: '500', display: 'block', marginBottom: '4px' }}>{item.name}</Link>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                      Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
