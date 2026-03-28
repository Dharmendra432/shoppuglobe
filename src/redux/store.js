import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer
  }
});
