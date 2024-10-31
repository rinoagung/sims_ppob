import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        registrationStatus: null,
        error: null,
    },
    reducers: {
        registerUser(state, action) {
            state.registrationStatus = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { registerUser, setError } = userSlice.actions;
export default userSlice.reducer;
