import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

export default function Cart() {
  const cart = useSelector(state => state.cart);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}
