import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LazyRoute from './components/LazyRoute';
import { ProductDetail, Cart, Checkout, NotFound } from './lazyComponents';

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/product/:id", element: <LazyRoute element={<ProductDetail />} /> },
  { path: "/cart", element: <LazyRoute element={<Cart />} /> },
  { path: "/checkout", element: <LazyRoute element={<Checkout />} /> },
  { path: "*", element: <LazyRoute element={<NotFound />} /> }
]);

export default router;
