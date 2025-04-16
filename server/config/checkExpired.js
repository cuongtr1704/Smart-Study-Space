const cron = require('node-cron');
const { checkAndUpdateExpiredBookings } = require('../services/bookings.service.js');

const scheduleChecking = () => {cron.schedule('*/1 * * * *', async () => {
    console.log('Checking for expired bookings...');
    try {
      await checkAndUpdateExpiredBookings(
        { query: {}, body: {} },
        { status: () => ({ json: () => {} }) } 
      );
      console.log('Expired bookings checked.');
    } catch (err) {
      console.error('Error checking bookings:', err.message);
    }
  })
}  

module.exports = scheduleChecking