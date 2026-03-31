import React, { Suspense, lazy } from 'react';
import Header from './components/Header';
import LoadingFallback from './components/LoadingFallback';

const ProductList = lazy(() => import('./components/ProductList'));

export default function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <ProductList />
      </Suspense>
    </>
  );
}

//
