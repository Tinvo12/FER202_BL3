import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 1, name: 'Keyboard', quantity: 10, price: 25.5 },
    { id: 2, name: 'Mouse', quantity: 15, price: 12.99 },
  ],
  searchTerm: '',
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addItem(state, action) {
      const { name, quantity, price } = action.payload;
      const id = Date.now();
      state.items.push({ id, name, quantity: Number(quantity), price: Number(price) });
    },
    updateItem(state, action) {
      const { id, name, quantity, price } = action.payload;
      const index = state.items.findIndex((i) => i.id === id);
      if (index !== -1) {
        state.items[index] = { id, name, quantity: Number(quantity), price: Number(price) };
      }
    },
    deleteItem(state, action) {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
});

export const { addItem, updateItem, deleteItem, setSearchTerm } = inventorySlice.actions;
export default inventorySlice.reducer;


