// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import balanceReducer from './slices/balanceSlice';
import bannerSlice from './slices/bannerSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        balance: balanceReducer,
        banner: bannerSlice
    },
});

export default store;
