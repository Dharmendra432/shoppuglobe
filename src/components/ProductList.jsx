import React from 'react';
import { useSelector } from 'react-redux';
import useFetchProducts from '../hooks/useFetchProducts';
import ProductItem from './ProductItem';

export default function ProductList() {
  const { products, error } = useFetchProducts();
  const search = useSelector(state => state.products.search);

  if (error) return <p>Error: {error}</p>;

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="product-list">
      {filtered.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
