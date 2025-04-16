const express = require("express")
const router = express.Router()
const {
    getAllBookedSeat,
    getAllIncoming,
    updateBooking,
} = require("../../controllers/bookingsControllers")

router.get('/', getAllIncoming)
router.post('/', getAllBookedSeat)
router.put('/:id', updateBooking)

module.exports = router
