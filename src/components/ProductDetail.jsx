import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="product-detail"><p>Loading...</p></div>;
  if (!product) return <div className="product-detail"><p>Product not found</p></div>;

  return (
    <div className="product-detail">
      <div className="product-detail-back">
        <a onClick={() => navigate(-1)}>← Back</a>
      </div>
      
      <div className="product-detail-container">
        <div className="product-detail-image">
          <img src={product.thumbnail} alt={product.title} />
        </div>
        
        <div className="product-detail-info">
          <h2>{product.title}</h2>
          <div className="product-detail-price">${product.price}</div>
          
          <div className="product-detail-description">
            <p>{product.description}</p>
          </div>

          <div style={{ marginTop: '20px' }}>
            <p><strong>Rating:</strong> ⭐ {product.rating} / 5</p>
            <p><strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</p>
          </div>

          <button onClick={() => {
            dispatch(addToCart(product));
            alert('Added to cart!');
          }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
