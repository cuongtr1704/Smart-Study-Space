const cron = require("node-cron");
const { deleteOldBookings } = require("../services/bookings.service.js");

const scheduleOverdate = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("Running daily cleanup of old bookings...");
    try {
      await deleteOldBookings();
      console.log("Old bookings cleanup done.");
    } catch (err) {
      console.error("Error during old bookings cleanup:", err.message);
    }
  });
};

module.exports = scheduleOverdate;
