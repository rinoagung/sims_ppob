// src/redux/slices/balanceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const balanceSlice = createSlice({
    name: 'balance',
    initialState: {
        seeBalance: true,
    },
    reducers: {
        toggleSeeBalance(state) {
            state.seeBalance = !state.seeBalance;
        },
    },
});

export const { toggleSeeBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
