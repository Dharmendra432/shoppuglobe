import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 100px)',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '500px' }}>
        <div style={{ fontSize: '120px', marginBottom: '20px', fontWeight: 'bold', color: '#667eea' }}>
          404
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: '#2c3e50' }}>
          Page Not Found
        </h2>
        <p style={{ fontSize: '1rem', color: '#95a5a6', marginBottom: '30px', lineHeight: '1.6' }}>
          The page you're looking for doesn't exist or has been moved.
          Let's take you back to shopping!
        </p>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link 
            to="/"
            style={{
              display: 'inline-block',
              padding: '12px 30px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
          >
            ← Back to Home
          </Link>

          <button
            onClick={() => navigate(-1)}
            style={{
              padding: '12px 30px',
              background: '#f0f0f0',
              color: '#333',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => e.target.style.background = '#e0e0e0'}
            onMouseLeave={e => e.target.style.background = '#f0f0f0'}
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
