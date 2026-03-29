import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', address: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const placeOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) {
      alert('Please fill all required fields');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      dispatch(clearCart());
      navigate("/");
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="checkout">
        <h2>Checkout</h2>
        <div className="checkout-empty">
          <p>Your cart is empty. Please add items before placing an order.</p>
          <a href="/" style={{
            display: 'inline-block',
            padding: '12px 30px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '8px',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}>
            ← Back to Shopping
          </a>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="checkout">
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>✅</div>
          <h2 style={{ color: '#27ae60', marginBottom: '10px' }}>Order Placed Successfully!</h2>
          <p style={{ color: '#7f8c8d', marginBottom: '20px' }}>Thank you for your purchase. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      
      <form className="checkout-form" onSubmit={placeOrder}>
        <input 
          type="text" 
          name="name"
          placeholder="Full Name *" 
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input 
          type="email" 
          name="email"
          placeholder="Email Address *" 
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input 
          type="text" 
          name="address"
          placeholder="Shipping Address *" 
          required
          value={formData.address}
          onChange={handleChange}
        />
        <input 
          type="tel" 
          name="phone"
          placeholder="Phone Number (optional)"
          value={formData.phone}
          onChange={handleChange}
        />
        <button type="submit">Place Order - ${totalPrice.toFixed(2)}</button>
      </form>

      <h3>Order Summary</h3>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            <span>{item.title} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="checkout-total">
        Total: ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
}
