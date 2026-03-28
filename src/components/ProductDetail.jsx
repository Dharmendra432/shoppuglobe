import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} />
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
}
