import { lazy } from 'react';

// Lazy loaded components
export const ProductDetail = lazy(() => import('./components/ProductDetail'));
export const Cart = lazy(() => import('./components/Cart'));
export const Checkout = lazy(() => import('./components/Checkout'));
export const NotFound = lazy(() => import('./components/NotFound'));
