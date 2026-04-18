import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

const ProductList: React.FC = () => {
  const { gender, type } = useParams<{ gender?: string; type?: string }>();
  const { products } = useShop();
  const [searchTerm, setSearchTerm] = useState<string>('');

  let filteredProducts = products.filter((p: Product) => !gender || p.category === gender);
  
  if (type) {
    filteredProducts = filteredProducts.filter((p: Product) => p.type === type);
  }

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((p: Product) => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const capitalize = (str: string | undefined): string => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <header className="page-header" style={{ background: 'transparent', border: 'none', padding: '20px 0 40px' }}>
        <h1 className="title">
          {gender ? `${capitalize(gender)}'s Watches` : 'All Watches'}
          {type && ` - ${capitalize(type)}`}
        </h1>
        <p className="subtitle">Browse our selection</p>
      </header>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        <aside style={{ width: '250px', flexShrink: 0, padding: '20px', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '20px' }}>Filters</h3>
          
          <div className="form-group">
            <label className="form-label">Search</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ margin: '16px 0 10px', fontSize: '1rem' }}>Categories</h4>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '8px' }}>
               <li>
                <Link to={`/category/${gender || 'male'}/smart`} style={{ color: type === 'smart' ? 'var(--accent)' : 'inherit' }}>
                  Smart Watches
                </Link>
               </li>
               <li>
                <Link to={`/category/${gender || 'male'}/sports`} style={{ color: type === 'sports' ? 'var(--accent)' : 'inherit' }}>
                  Sports Watches
                </Link>
               </li>
               <li>
                <Link to={`/category/${gender || 'male'}/formal`} style={{ color: type === 'formal' ? 'var(--accent)' : 'inherit' }}>
                  Formal Watches
                </Link>
               </li>
               <li>
                <Link to={`/category/${gender || 'male'}`} style={{ color: !type ? 'var(--accent)' : 'inherit' }}>
                  View All
                </Link>
               </li>
            </ul>
          </div>
        </aside>

        <div style={{ flex: 1 }}>
          {filteredProducts.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', background: 'var(--surface)', borderRadius: 'var(--radius)' }}>
              <h3>No products found</h3>
              <p className="text-light">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3">
              {filteredProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
