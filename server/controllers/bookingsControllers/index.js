const asyncHandler = require("express-async-handler");
const {getAllBookings, getAllIncomingBooking, updateBookingStatus} = require("../../services/bookings.service.js");

async function getAllBookedSeat(req, res) {
  try {
    const { type, room, booked_date, time } = req.body;
    res.json(await getAllBookings(type, room, booked_date, time));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllIncoming(req, res) {
  try {
    res.json(await getAllIncomingBooking());
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateBooking(req, res) {
  try {

    res.json(await updateBookingStatus(req.params.id, req.body.newRole));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getAllBookedSeat,
  getAllIncoming,
  updateBooking
};

