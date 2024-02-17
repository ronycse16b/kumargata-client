import { configureStore } from '@reduxjs/toolkit'
import authReducher from '../features/auth.slice'

export const store = configureStore({
  reducer: {
    auth: authReducher
  },
})