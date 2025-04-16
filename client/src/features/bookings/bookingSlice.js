import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bookingService from './bookingService'

const initialState = {
  bookings: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get all booked seats
export const getAllBookings = createAsyncThunk(
  'bookings/getAll',
  async (bookingData, thunkAPI) => {
    try {
      return await bookingService.getAllBookings(bookingData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getAllIncoming = createAsyncThunk(
  'bookings/getAllIncoming',
  async (_, thunkAPI) => {
    try {
      return await bookingService.getAllIncomingBooking()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateBooking = createAsyncThunk(
  'bookings/update',
  async (bookingId, thunkAPI) => {
    try {
      return await bookingService.updateBookingStatus(
        bookingId,
        { status: "checked" }
      )
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBookings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.bookings = action.payload

      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllIncoming.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllIncoming.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.bookings = action.payload
      })
      .addCase(getAllIncoming.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateBooking.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.bookings = state.bookings.map((booking) =>
          booking._id === action.payload._id ? action.payload : booking
        )
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = bookingSlice.actions
export default bookingSlice.reducer
