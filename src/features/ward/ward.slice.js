import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const backendURL = import.meta.env.VITE_SERVER_URL;


export const ward = createAsyncThunk(
    'ward/getWard',
    async () => {
        const response = await axios.get(`${backendURL}/api/data/wards`);
        return response.data.wards;
    },

)

const initialState = {
    ward: [''],
    loading: false,
    error: null,
    
}

const wardSlice = createSlice({
    name: "wards",
    initialState,
    reducers: {
        // Add reducers here if needed
    },
    extraReducers: (builder) => {
        builder
          // login user
          .addCase(ward.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(ward.fulfilled, (state, action) => {
            state.loading = false;
            state.ward = action.payload;
            
          })
          .addCase(ward.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
        
      },


})

// export const { } = wardSlice.actions;

export default wardSlice.reducer;
