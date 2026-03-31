import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const FORM_FIELDS = {
  name: { label: 'Full Name', required: true, pattern: /^[a-zA-Z\s]{3,}$/ },
  email: { label: 'Email Address', required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  address: { label: 'Shipping Address', required: true, pattern: /^.{5,}$/ },
  phone: { label: 'Phone Number', required: true, pattern: /^\d{10,}$/ },
  zipcode: { label: 'Zip Code', required: true, pattern: /^\d{5,}$/ }
};

export default function Checkout() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    zipcode: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [processing, setProcessing] = useState(false);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const validateField = (name, value) => {
    const field = FORM_FIELDS[name];
    if (!field) return '';

    if (field.required && !value.trim()) {
      return `${field.label} is required`;
    }

    if (value && !field.pattern.test(value)) {
      const hints = {
        name: 'Name must be at least 3 characters',
        email: 'Please enter a valid email',
        address: 'Address must be at least 5 characters',
        phone: 'Phone must be at least 10 digits',
        zipcode: 'Zip code must be at least 5 digits'
      };
      return hints[name] || 'Invalid input';
    }

    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(FORM_FIELDS).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    return newErrors;
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitted(true);

      // Clear cart and redirect after 2 seconds
      setTimeout(() => {
        dispatch(clearCart());
        navigate("/");
      }, 2000);
    } catch {
      setErrors({ submit: 'Failed to process order. Please try again.' });
      setProcessing(false);
    }
  };

  if (cart.length === 0 && !submitted) {
    return (
      <div className="checkout">
        <h2>Checkout</h2>
        <div className="checkout-empty">
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🛒</div>
          <p>Your cart is empty. Please add items before placing an order.</p>
          <a href="/" style={{
            display: 'inline-block',
            padding: '12px 30px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '8px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            textDecoration: 'none'
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
          <p style={{ color: '#7f8c8d', marginBottom: '20px' }}>
            Thank you for your order. A confirmation has been sent to {formData.email}
          </p>
          <p style={{ fontSize: '0.9rem', color: '#95a5a6' }}>Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
        {/* Shipping Form */}
        <div>
          <h3>Shipping Information</h3>
          <form className="checkout-form" onSubmit={placeOrder}>
            {errors.submit && (
              <div className="form-error" style={{ 
                padding: '10px',
                background: '#fee',
                border: '1px solid #f99',
                borderRadius: '4px',
                marginBottom: '15px',
                color: '#c33'
              }}>
                {errors.submit}
              </div>
            )}

            {Object.keys(FORM_FIELDS).map(fieldName => (
              <div key={fieldName} className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor={fieldName} style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  {FORM_FIELDS[fieldName].label}
                  {FORM_FIELDS[fieldName].required && <span style={{ color: '#e74c3c' }}> *</span>}
                </label>
                <input
                  id={fieldName}
                  type={fieldName === 'email' ? 'email' : 'text'}
                  name={fieldName}
                  value={formData[fieldName]}
                  onChange={handleChange}
                  className={errors[fieldName] ? 'input-error' : ''}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: errors[fieldName] ? '2px solid #e74c3c' : '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
                {errors[fieldName] && (
                  <span style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '3px', display: 'block' }}>
                    {errors[fieldName]}
                  </span>
                )}
              </div>
            ))}

            <button 
              type="submit" 
              disabled={processing}
              style={{
                width: '100%',
                padding: '14px',
                background: processing ? '#bdc3c7' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: processing ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                marginTop: '20px'
              }}
            >
              {processing ? 'Processing...' : `Place Order - $${totalPrice.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <h3>Order Summary</h3>
          <div className="checkout-summary" style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {cart.map(item => (
                <li key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom: '1px solid #e9ecef'
                }}>
                  <div>
                    <p style={{ margin: '0 0 5px 0', fontWeight: '500' }}>{item.title}</p>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#95a5a6' }}>
                      {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <span style={{ fontWeight: '600', color: '#667eea' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div style={{
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '2px solid #dee2e6'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.2rem',
                fontWeight: '700',
                marginBottom: '5px'
              }}>
                <span>Total:</span>
                <span style={{ color: '#667eea' }}>${totalPrice.toFixed(2)}</span>
              </div>
              <p style={{ margin: '10px 0 0 0', fontSize: '0.85rem', color: '#95a5a6' }}>
                ✓ Free shipping on all orders
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
