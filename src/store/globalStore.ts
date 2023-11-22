import { configureStore } from '@reduxjs/toolkit';
import toaster from './toaster';
const store = configureStore({
    reducer: {
        toaster: toaster.reducer,
    },
})

export default store;