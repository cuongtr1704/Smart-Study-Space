const Booking = require("../models/bookingModel");
const Notification = require("../models/notificationModel");

const shiftToHour = (shift) => 7 + parseInt(shift);

async function checkAndUpdateExpiredBookings(req, res) {
  const now = new Date();

  const bookings = await Booking.find({ status: "incoming" });

  for (let booking of bookings) {
    const shiftHour = shiftToHour(booking.time);
    const bookingDate = new Date(booking.booked_date);
    bookingDate.setHours(shiftHour, 0, 0, 0);

    const shiftEndTime = new Date(bookingDate.getTime() + 60 * 60 * 1000);

    if (now > shiftEndTime) {
      booking.status = "over";
      await Notification.create({
        type: "Booking",
        title: "Booking Expired",
        message: `Your booking has expired`,
        user: booking.user,
      });
      await booking.save();
    }
  }

  res.status(200).json({ message: "Checked and updated expired bookings." });
}

async function getAllBookings(type, room, booked_date, time) {
  if (!type || !booked_date || !room) {
    throw new Error("Missing data for booked seat query");
  }
  let bookings = [];
  if (type === "room") {
    bookings = await Booking.find({
      type: type,
      room: room,
      booked_date: booked_date,
      status: "incoming",
    });
  } else if (type === "seat") {
    bookings = await Booking.find({
      type: type,
      room: room,
      booked_date: booked_date,
      time: time,
      status: "incoming",
    });
  }
  return bookings;
}

async function getAllIncomingBooking() {
  const bookings = await Booking.find({ status: "incoming" });
  return bookings;
}

async function updateBookingStatus(bookingId, bookingData) {
  const booking = await Booking.findById(bookingId)

  const updatedbooking = await Booking.findByIdAndUpdate(
    bookingId,
    bookingData,
    {
      new: true,
    }
  );

  await Notification.create({
      type: "Booking",
      title: "Booking Updated",
      message: `Your booking has been ${bookingData.status}`,
      user: booking.user,
  });
return updatedbooking
}

async function deleteOldBookings (){
  const today = new Date()
  const cutoff = new Date(today.setDate(today.getDate() - 30))
  const bookings = await Booking.find()
  for (let booking of bookings) {
    const bookingDate = new Date(booking.date)
    if (bookingDate < cutoff) {
      await UserBooking.deleteOne({ _id: booking._id })
    }
  }
}



module.exports = {
  checkAndUpdateExpiredBookings,
  getAllBookings,
  getAllIncomingBooking,
  updateBookingStatus,
  deleteOldBookings,
};
