import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/users/userSlice'
import bookingReducer from '../features/bookings/bookingSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    bookings: bookingReducer,
  },
})
