import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import LoadingFallback from './LoadingFallback';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://dummyjson.com/products/${id}`);
        
        if (!response.ok) {
          throw new Error(`Product not found (${response.status})`);
        }

        const data = await response.json();

        if (isMounted) {
          if (!data.id) {
            throw new Error('Invalid product data');
          }
          setProduct(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load product');
          console.error('Error fetching product:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) return <LoadingFallback />;

  if (error) {
    return (
      <div className="product-detail">
        <div className="error-container">
          <h2>❌ Error Loading Product</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/')}>← Back to Home</button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail">
        <div className="error-container">
          <h2>Product not found</h2>
          <button onClick={() => navigate('/')}>← Back to Home</button>
        </div>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="product-detail">
      <div className="product-detail-back">
        <a onClick={() => navigate(-1)}>← Back</a>
      </div>
      
      <div className="product-detail-container">
        <div className="product-detail-image">
          <img 
            src={product.thumbnail} 
            alt={product.title}
            loading="lazy"
          />
          {isOutOfStock && <span className="out-of-stock">Out of Stock</span>}
        </div>
        
        <div className="product-detail-info">
          <h2>{product.title}</h2>
          <div className="product-detail-price">${product.price?.toFixed(2) || 'N/A'}</div>
          
          <div className="product-detail-rating">
            <span className="rating">⭐ {product.rating?.toFixed(1) || 'N/A'} / 5</span>
            {product.reviews && <span className="reviews">({product.reviews.length} reviews)</span>}
          </div>

          <div className="product-detail-description">
            <p>{product.description || 'No description available'}</p>
          </div>

          <div className="product-detail-specs">
            <p><strong>Stock:</strong> {isOutOfStock ? 'Out of stock' : `${product.stock} available`}</p>
            {product.brand && <p><strong>Brand:</strong> {product.brand}</p>}
            {product.category && <p><strong>Category:</strong> {product.category}</p>}
          </div>

          <div className="product-detail-actions">
            <button 
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={addedToCart ? 'added' : ''}
            >
              {addedToCart ? '✓ Added to Cart!' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
