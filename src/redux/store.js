// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import balanceReducer from './slices/balanceSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        balance: balanceReducer,
    },
});

export default store;
