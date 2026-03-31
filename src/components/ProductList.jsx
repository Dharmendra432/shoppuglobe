import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import useFetchProducts from '../hooks/useFetchProducts';
import ProductItem from './ProductItem';
import LoadingFallback from './LoadingFallback';

export default function ProductList() {
  const { products, error, loading } = useFetchProducts();
  const search = useSelector(state => state.products.search);

  // Memoize filtered products for performance
  const filtered = useMemo(() => {
    return products.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
    );
  }, [products, search]);

  if (loading) {
    return <LoadingFallback />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>❌ Error Loading Products</h3>
        <p>{error}</p>
        <p style={{ fontSize: '0.9rem', color: '#95a5a6' }}>
          Please refresh the page or try again later.
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="error-container">
        <h3>No products available</h3>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="error-container">
        <h3>No products found</h3>
        <p>Try adjusting your search terms.</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {filtered.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
