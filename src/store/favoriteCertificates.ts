import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state
let initialState: Record<string, boolean> = {};

// Load the state from local storage
const savedState = localStorage.getItem('favoriteCertificates');
if (savedState) {
  initialState = JSON.parse(savedState);
}

// Create the slice
const favoriteCertificatesSlice = createSlice({
  name: 'favoriteCertificates',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const certificateId = action.payload;
      state[certificateId] = !state[certificateId];
      localStorage.setItem('favoriteCertificates', JSON.stringify(state));
    },
  },
});


export default favoriteCertificatesSlice;
