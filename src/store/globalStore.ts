import { configureStore } from '@reduxjs/toolkit';
import toaster from './toaster';
import favoriteCertificates from './favoriteCertificates';
const store = configureStore({
    reducer: {
        toaster: toaster.reducer,
        favoriteCertificates: favoriteCertificates.reducer,
    },
})
export type RootState = ReturnType<typeof store.getState>

export default store;