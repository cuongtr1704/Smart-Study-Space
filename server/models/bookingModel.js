const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: [true, 'Please add booking type'],
    },
    room: {
      type: String,
      required: [true, 'Please add room'],
    },
    booked_date: {
      type: String,
      required: [true, 'Please add booked date'],
    },
    seat: {
      type: String,
    },
    time: {
      type: Number,
      required: [true, 'Please add time'],
    },
    status: {
      type: String,
      default: 'incoming',
      required: true,
    },
  },  
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Booking', bookingSchema)