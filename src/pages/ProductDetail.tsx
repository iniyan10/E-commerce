import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ShoppingCart, Star } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useShop();
  
  const product = products.find(p => p.id === (id ? parseInt(id) : -1));
  const [quantity, setQuantity] = useState<number>(1);
  const [reviewText, setReviewText] = useState<string>("");

  if (!product) {
    return <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>Product Not Found</div>;
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
       addToCart(product);
    }
    navigate('/cart');
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if(reviewText.trim()) {
      alert("Review submitted successfully! Pending moderation.");
      setReviewText("");
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="grid grid-cols-2" style={{ gap: '40px', background: 'var(--surface)', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
        <div style={{ background: '#f5f5f5', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>
            {product.category} • {product.type}
          </span>
          <h1 className="title" style={{ fontSize: '2.5rem', marginBottom: '16px', marginTop: '8px' }}>{product.name}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', color: 'var(--accent)' }}>
              {[1,2,3,4,5].map(star => (
                <Star key={star} size={20} fill={star <= Math.round(product.rating) ? 'currentColor' : 'none'} />
              ))}
            </div>
            <span style={{ color: 'var(--text-light)' }}>{product.rating} ({product.reviews} reviews)</span>
          </div>
          
          <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', marginBottom: '32px', lineHeight: '1.8' }}>
            {product.description}
          </p>

          <div style={{ marginTop: 'auto' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '24px' }}>
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            
            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '12px 16px', background: 'var(--bg-color)' }}
                >-</button>
                <div style={{ padding: '12px 20px', fontWeight: '600', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '12px 16px', background: 'var(--bg-color)' }}
                >+</button>
              </div>
              <button className="btn btn-primary" style={{ flex: 1, padding: '16px' }} onClick={handleAddToCart}>
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{ marginTop: '60px' }}>
        <h2 className="title">Customer Reviews</h2>
        
        <div style={{ background: 'var(--surface)', padding: '30px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '16px' }}>Leave a Review</h3>
          <form onSubmit={submitReview}>
            <div className="form-group">
              <label className="form-label">Your Rating</label>
              <div style={{ display: 'flex', gap: '5px', color: '#ccc', marginBottom: '10px' }}>
                <Star size={24} fill="currentColor" />
                <Star size={24} fill="currentColor" />
                <Star size={24} fill="currentColor" />
                <Star size={24} fill="currentColor" />
                <Star size={24} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Your Review</label>
              <textarea 
                className="form-control" 
                rows={4} 
                placeholder="Share your thoughts about this product..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit Review</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
