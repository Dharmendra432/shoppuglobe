import React, { Suspense, lazy } from 'react';
import Header from './components/Header';

const ProductList = lazy(() => import('./components/ProductList'));

export default function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
        <ProductList />
      </Suspense>
    </>
  );
}
