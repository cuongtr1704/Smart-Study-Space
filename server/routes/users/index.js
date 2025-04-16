const express = require('express')
const router = express.Router()
const {
  register,
  login,
  change,
  getAllUsers,
  updateNewRole,
  getBookings,
  createBooking,
  updateBooking,
  getNotifications,
  createNotification,
  viewNotification,
  viewAllNotification,
  deleteNotification,
  deleteAllNotifications,
} = require('../../controllers/userControllers')
const { protect } = require('../../middleware/authMiddleware')

router.post('/', register)
router.post('/login', login)
router.post('/change-password', protect, change)

router.get('/all', getAllUsers)
router.put('/update-role/:id',updateNewRole)

router.get('/get-userbookings', protect, getBookings)
router.post('/create-userbooking', protect, createBooking)
router.put('/update-userbooking/:id', protect, updateBooking)

router.get('/get-usernotifications', protect, getNotifications)
router.post('/create-usernotification', createNotification)
router.put('/view-usernotification/:id', protect, viewNotification)
router.put('/view-all-usernotifications', protect, viewAllNotification)
router.delete('/delete-usernotification/:id', protect, deleteNotification)
router.delete('/delete-all-usernotifications', protect, deleteAllNotifications)

module.exports = router