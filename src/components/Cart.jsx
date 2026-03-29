import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

export default function Cart() {
  const cart = useSelector(state => state.cart);

  if (cart.length === 0) {
    return (
      <div className="cart">
        <h2>Your Cart</h2>
        <div className="cart-empty">
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
          <Link to="/">← Continue Shopping</Link>
        </div>
      </div>
    );
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
      
      <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '2px solid #e9ecef' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          fontSize: '1.3rem', 
          fontWeight: '700',
          marginBottom: '20px'
        }}>
          <span>Total:</span>
          <span style={{ color: '#667eea' }}>${totalPrice.toFixed(2)}</span>
        </div>
        <Link to="/checkout" style={{
          display: 'block',
          padding: '14px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center',
          borderRadius: '8px',
          fontWeight: '600',
          transition: 'all 0.3s ease'
        }}>
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
