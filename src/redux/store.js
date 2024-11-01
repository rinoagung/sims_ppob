// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import balanceReducer from './slices/balanceSlice';
import bannerSlice from './slices/bannerSlice'
import authReducer from './slices/authSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        balance: balanceReducer,
        banner: bannerSlice,
        auth: authReducer,
    },
});

export default store;
