import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} />
      <div style={{ flex: 1, minWidth: '150px' }}>
        <h4>{item.title}</h4>
        <p style={{ color: '#667eea', fontWeight: '600', fontSize: '1.1rem' }}>
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="number"
          value={item.quantity}
          min="1"
          onChange={e =>
            dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))
          }
        />
        <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
      </div>
    </div>
  );
}
