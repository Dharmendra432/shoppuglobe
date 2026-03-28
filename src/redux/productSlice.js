import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: { search: "" },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    }
  }
});

export const { setSearch } = productSlice.actions;
export default productSlice.reducer;
