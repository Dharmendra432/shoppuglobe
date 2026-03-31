import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

const CartItem = React.memo(({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = useCallback((e) => {
    const quantity = Number(e.target.value);
    if (quantity > 0) {
      dispatch(updateQuantity({ id: item.id, quantity }));
    }
  }, [item.id, dispatch]);

  const handleRemove = useCallback(() => {
    dispatch(removeFromCart(item.id));
  }, [item.id, dispatch]);

  return (
    <div className="cart-item" style={{
      display: 'flex',
      gap: '15px',
      padding: '15px',
      background: '#f8f9fa',
      borderRadius: '8px',
      marginBottom: '12px',
      alignItems: 'center',
      border: '1px solid #e9ecef'
    }}>
      <img 
        src={item.thumbnail} 
        alt={item.title}
        loading="lazy"
        style={{
          width: '80px',
          height: '80px',
          objectFit: 'cover',
          borderRadius: '6px'
        }}
      />

      <div style={{ flex: 1, minWidth: '150px' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem' }}>{item.title}</h4>
        <p style={{ color: '#667eea', fontWeight: '600', fontSize: '1.1rem', margin: '0' }}>
          ${item.price.toFixed(2)} each
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label htmlFor={`qty-${item.id}`} style={{ fontSize: '0.9rem', color: '#666' }}>Qty:</label>
          <input
            id={`qty-${item.id}`}
            type="number"
            value={item.quantity}
            min="1"
            max="99"
            onChange={handleQuantityChange}
            style={{
              width: '60px',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              textAlign: 'center',
              fontSize: '1rem'
            }}
            aria-label={`Quantity for ${item.title}`}
          />
        </div>
        <div style={{ textAlign: 'right', minWidth: '80px' }}>
          <p style={{ margin: '0', fontSize: '0.85rem', color: '#95a5a6' }}>Subtotal</p>
          <p style={{ margin: '0', fontWeight: '700', fontSize: '1.1rem', color: '#27ae60' }}>
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
        <button 
          onClick={handleRemove}
          title="Remove item"
          style={{
            padding: '8px 12px',
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={e => e.target.style.background = '#c0392b'}
          onMouseLeave={e => e.target.style.background = '#e74c3c'}
        >
          Remove
        </button>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';

export default CartItem;
