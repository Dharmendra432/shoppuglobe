import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import NotFound from './components/NotFound';

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/product/:id", element: <ProductDetail /> },
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "*", element: <NotFound /> }
]);

export default router;
//He
//hello