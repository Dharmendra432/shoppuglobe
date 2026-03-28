// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function Header() {
//   return (
//     <header>
//       <h1>ShoppyGlobe</h1>
//       <nav>
//         <Link to="/">Home</Link>
//         <Link to="/cart">Cart</Link>
//         <Link to="/checkout">Checkout</Link>
//       </nav>
//     </header>
//   );
// }
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// export default function Header() {
//   const cart = useSelector(state => state.cart);
//   const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <header className="header">
//       <h1>ShoppyGlobe</h1>
//       <nav>
//         <Link to="/">Home</Link>
//         <Link to="/cart">Cart ({itemCount})</Link>
//         <Link to="/checkout">Checkout</Link>
//       </nav>
//     </header>
//   );
// }
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const cart = useSelector(state => state.cart);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <h1>ShoppyGlobe</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">🛒 Cart ({itemCount})</Link>
        <Link to="/checkout">Checkout</Link>
      </nav>
    </header>
  );
}

