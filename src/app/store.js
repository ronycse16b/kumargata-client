import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../features/api/authApi'
import authReducer from '../features/auth/authSlice'
import taxPaymentSlice from '../features/payments/tax.payment.slice'
import wardSlice from '../features/ward/ward.slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    ward: wardSlice,
    payment: taxPaymentSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export default store
