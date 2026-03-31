import { Suspense } from 'react';
import LoadingFallback from './LoadingFallback';

// Wrapper component for lazy-loaded routes
const LazyRoute = ({ element }) => (
  <Suspense fallback={<LoadingFallback />}>
    {element}
  </Suspense>
);

export default LazyRoute;
