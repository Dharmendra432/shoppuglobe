import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} />
      <h4>{item.title}</h4>
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
  );
}
