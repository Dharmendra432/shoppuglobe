import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const ProductItem = React.memo(({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart(product));
  }, [product, dispatch]);

  return (
    <div className="product-item" style={{
      background: 'white',
      border: '1px solid #e9ecef',
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column'
    }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'}
    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        height: '200px',
        overflow: 'hidden',
        background: '#f8f9fa'
      }}>
        <img 
          src={product.thumbnail} 
          alt={product.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={e => e.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.style.transform = 'scale(1)'}
        />
        {product.stock <= 0 && (
          <span style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: '#e74c3c',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '0.85rem',
            fontWeight: '600'
          }}>
            Out of Stock
          </span>
        )}
      </div>

      <div style={{
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}>
        <h3 style={{
          margin: '0 0 8px 0',
          fontSize: '1rem',
          height: '2rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {product.title}
        </h3>

        <div style={{ marginBottom: '10px', flex: 1 }}>
          <p style={{
            margin: '0 0 5px 0',
            fontSize: '0.9rem',
            color: '#95a5a6',
            height: '2rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {product.description?.substring(0, 50)}...
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span>⭐ {product.rating?.toFixed(1) || 'N/A'}</span>
            <span style={{ fontSize: '0.8rem', color: '#95a5a6' }}>
              ({product.reviews?.length || 0} reviews)
            </span>
          </div>
        </div>

        <div style={{
          fontSize: '1.3rem',
          fontWeight: '700',
          color: '#667eea',
          marginBottom: '12px'
        }}>
          ${product.price?.toFixed(2) || 'N/A'}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            style={{
              flex: 1,
              padding: '10px',
              background: product.stock <= 0 ? '#bdc3c7' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: product.stock <= 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => {
              if (product.stock > 0) e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
            aria-label={`Add ${product.title} to cart`}
          >
            {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
          <Link 
            to={`/product/${product.id}`}
            style={{
              flex: 1,
              padding: '10px',
              background: '#f0f0f0',
              color: '#333',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={e => {
              e.target.style.background = '#e0e0e0';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.target.style.background = '#f0f0f0';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
});

ProductItem.displayName = 'ProductItem';

export default ProductItem;
