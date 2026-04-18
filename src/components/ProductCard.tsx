import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ShoppingCart } from 'lucide-react';

import { Product } from '../types';

interface ProductCardProps {
  product: Product & { rating?: number; reviews?: number };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useShop();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="card animate-fade-in">
      <div className="card-img-wrapper">
        <img src={product.image} alt={product.name} className="card-img" />
      </div>
      <div className="card-body">
        <span className="card-category">{product.category} • {product.type}</span>
        <h3 className="card-title">{product.name}</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '5px' }}>
          <span style={{ color: '#d4af37' }}>★</span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="card-price-row">
          <span className="price">₹{product.price.toLocaleString('en-IN')}</span>
          <button 
            className="btn btn-primary" 
            style={{ padding: '8px 16px', borderRadius: '4px' }}
            onClick={handleAdd}
          >
            <ShoppingCart size={16} /> Add
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
