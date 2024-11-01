import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Definisikan thunk
const fetchBannerData = createAsyncThunk(
    'user/fetchBannerData',
    async (_, { getState }) => {
        const state = getState();
        const token = state.auth.token; // Ambil token dari state

        try {

            // const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            const profileResponse = await fetch(`${process.env.REACT_APP_API_URL}/profile`, { headers });
            const profileData = await profileResponse.json();

            const balanceResponse = await fetch(`${process.env.REACT_APP_API_URL}/balance`, { headers });
            const balanceData = await balanceResponse.json();

            return {
                profile: profileData.data,
                balance: balanceData.data.balance,
            };
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error; // Lempar error agar bisa ditangani di reducer
        }
    }
);

// Buat slice
const bannerSlice = createSlice({
    name: 'user',
    initialState: {
        profile: null,
        balance: '0',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBannerData.fulfilled, (state, action) => {
                state.profile = action.payload.profile;
                state.balance = action.payload.balance;
            })
            .addCase(fetchBannerData.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

// Ekspor reducer dan thunk
export default bannerSlice.reducer;
export { fetchBannerData }; // Pastikan hanya ada satu ekspor di sini
