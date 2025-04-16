const mongoose = require('mongoose')

const  notificationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    type: {
      type: String,
      required: [true, 'Please add type'],
    },
    title: {
      type: String,
      required: [true, 'Please add title'],
    },
    message: {
      type: String,
      required: [true, 'Please add message'],
    },
    isRead: {
      type: Boolean,
      default: false,
      required: true,
    },
  },  
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Notification', notificationSchema)