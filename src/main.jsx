import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from './redux/store';
import router from './router.jsx';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </Provider>
);
