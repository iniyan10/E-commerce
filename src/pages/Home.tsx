import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

const Home: React.FC = () => {
  const { products } = useShop();
  
  const featuredMale = products.filter((p: Product) => p.category === 'male').slice(0, 4);
  const featuredFemale = products.filter((p: Product) => p.category === 'female').slice(0, 4);

  return (
    <div>
      <section className="hero">
        <div className="container hero-content">
          <h1 className="title">Timeless Elegance</h1>
          <p className="subtitle" style={{marginBottom: '30px'}}>
            Discover our exclusive collection of premium watches tailored for every style, from smart connectivity to formal sophistication.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/category/male" className="btn btn-primary" style={{ background: 'var(--accent)', color: '#111' }}>Shop Men</Link>
            <Link to="/category/female" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>Shop Women</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <h2 className="title" style={{ marginBottom: 0 }}>Men's Collection</h2>
              <p className="text-light">Precision engineered timepieces for men.</p>
            </div>
            <Link to="/category/male" className="text-accent" style={{ fontWeight: 600 }}>View All {'>'}</Link>
          </div>
          <div className="grid grid-cols-4">
            {featuredMale.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'var(--surface)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <h2 className="title" style={{ marginBottom: 0 }}>Women's Collection</h2>
              <p className="text-light">Elegant and stylish watches for women.</p>
            </div>
            <Link to="/category/female" className="text-accent" style={{ fontWeight: 600 }}>View All {'>'}</Link>
          </div>
          <div className="grid grid-cols-4">
            {featuredFemale.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
