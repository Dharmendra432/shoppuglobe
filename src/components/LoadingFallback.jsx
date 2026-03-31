import React from 'react';

export default function LoadingFallback() {
  return (
    <div className="loading-fallback">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}
