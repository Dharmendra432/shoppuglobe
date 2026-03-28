import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = () => {
    alert(`Order placed! Total bill: $${totalPrice.toFixed(2)}`);
    dispatch(clearCart());
    navigate("/");
  };

  // ✅ If cart is empty, show message + Back button
  if (cart.length === 0) {
    return (
      <div className="checkout">
        <h2>Checkout</h2>
        <p>Your cart is empty. Please add items before placing an order.</p>
        <button onClick={() => navigate("/")}>⬅ Back to Home</button>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <form className="checkout-form">
        <input type="text" placeholder="Name" required />
        <input type="text" placeholder="Address" required />
        <button type="button" onClick={placeOrder}>Place Order</button>
      </form>

      <h3>Order Summary</h3>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.title} x {item.quantity} = ${ (item.price * item.quantity).toFixed(2) }
          </li>
        ))}
      </ul>

      <h3>Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
}
