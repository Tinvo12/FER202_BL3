import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import inventoryReducer from './features/inventory/inventorySlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    inventory: inventoryReducer,
  },
});

export default store;


