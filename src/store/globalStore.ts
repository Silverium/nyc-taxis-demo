import { configureStore } from '@reduxjs/toolkit';
import toaster from './toaster';
const store = configureStore({
    reducer: {
        toaster: toaster.reducer,
    },
})
export type RootState = ReturnType<typeof store.getState>

export default store;