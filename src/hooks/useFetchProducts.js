import { useState, useEffect } from 'react';

const API_URL = 'https://dummyjson.com/products';
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000;

export default function useFetchProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let retryCount = 0;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL, { timeout: 10000 });
        
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.products || !Array.isArray(data.products)) {
          throw new Error('Invalid data format received');
        }

        if (isMounted) {
          setProducts(data.products);
        }
      } catch (err) {
        if (retryCount < RETRY_ATTEMPTS - 1) {
          retryCount++;
          setTimeout(fetchProducts, RETRY_DELAY * retryCount);
        } else {
          if (isMounted) {
            setError(err.message || 'Failed to fetch products');
            console.error('Error fetching products:', err);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return { products, error, loading };
}
