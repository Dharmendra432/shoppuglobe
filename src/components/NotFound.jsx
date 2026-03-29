import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found">
      <h2>404</h2>
      <p>Page Not Found</p>
      <p style={{ fontSize: '1rem', color: '#95a5a6', marginBottom: '30px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">← Back to Home</Link>
    </div>
  );
}

export default NotFound;
