import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = state.find(p => p.id === action.payload.id);
      if (item) item.quantity += 1;
      else state.push({ ...action.payload, quantity: 1 });
    },
    removeFromCart: (state, action) => state.filter(p => p.id !== action.payload),
    updateQuantity: (state, action) => {
      const item = state.find(p => p.id === action.payload.id);
      if (item && action.payload.quantity > 0) item.quantity = action.payload.quantity;
    },
    clearCart: () => []
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
