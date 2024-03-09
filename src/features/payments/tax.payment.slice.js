import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    payment: [''],
    loading: false,
    error: null,

}

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        // Add reducers here if needed

        paymentStarted: (state) => {
            state.loading = true;
            state.error = null;
        },

        paymentFulfilled: (state, action) => {
            state.loading = false;
            state.payment = action.payload;
        },

        paymentRejected: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


    },



})

export const { paymentFulfilled, paymentStarted, paymentRejected } = paymentSlice.actions;

export default paymentSlice.reducer;
