import { configureStore } from '@reduxjs/toolkit';
import frontendReducer from './features/frontendSlice.js';
import userSliceReducer from './features/userSlice.js';

export const store = configureStore({
    reducer: {
        frontend: frontendReducer,
        userSlice: userSliceReducer
    },
});
