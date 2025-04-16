import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}/api/bookings/`;


const getAllBookings = async (bookingData) => {
  const response = await axios.post(API_URL, bookingData)
  return response.data
}

const getAllIncomingBooking = async () => {
  const response = await axios.get(API_URL)
  const sortedBookings = response.data.sort((a, b) => {
    const dateA = new Date(a.booked_date);
    const dateB = new Date(b.booked_date);

    if (dateA.getTime() !== dateB.getTime()) {
      return dateA - dateB;
    }

    return a.time - b.time;
  });
  return sortedBookings
}

const updateBookingStatus = async (bookingId, bookingData) => {
  const response = await axios.put(API_URL + `${bookingId}`, bookingData)
  return response.data
}


const bookingService = {
  getAllBookings,
  getAllIncomingBooking,
  updateBookingStatus
}

export default bookingService
