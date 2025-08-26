import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTravelAgency = createAsyncThunk(
  'tours/fetchTravelAgency',
  async () => {
    const response = await axios.get('http://localhost:5000/travelAgency');
    return response.data;
  }
);

const toursSlice = createSlice({
  name: 'tours',
  initialState: {
    agencyName: '',
    location: '',
    tours: [],
    filteredTours: [],
    status: 'idle',
    error: null
  },
  reducers: {
    filterByPrice(state, action) {
      const maxPrice = action.payload;
      state.filteredTours = state.tours.filter(t => Number(t.price) <= Number(maxPrice));
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTravelAgency.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTravelAgency.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.agencyName = action.payload.agencyName;
        state.location = action.payload.location;
        state.tours = action.payload.tours || [];
        state.filteredTours = state.tours;
      })
      .addCase(fetchTravelAgency.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Failed to fetch travel agency';
      });
  }
});

export const { filterByPrice } = toursSlice.actions;

export default toursSlice.reducer;


