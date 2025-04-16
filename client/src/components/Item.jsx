import { useState } from "react";
import { useDispatch } from "react-redux";
import { cancelBooking } from "../features/users/userSlice";
import { toast } from "react-toastify";
import QRCode from "react-qr-code";

const timeMap = {
  1: "08:00 - 09:00",
  2: "09:00 - 10:00",
  3: "10:00 - 11:00",
  4: "11:00 - 12:00",
  5: "12:00 - 13:00",
  6: "13:00 - 14:00",
  7: "14:00 - 15:00",
  8: "15:00 - 16:00",
  9: "16:00 - 17:00",
  10: "17:00 - 18:00",
};

const formatTime = (shift) => timeMap[shift] || "Invalid time";

function Item({ booking }) {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCancelClick = () => setShowConfirm(true);
  const closeModal = () => setShowConfirm(false);
  const closeQRModal = () => setShowQR(false);

  const confirmCancel = async () => {
    try {
      await dispatch(cancelBooking(booking._id));
      toast.success("Booking canceled successfully.");
    } catch (error) {
      toast.error("Failed to cancel booking.");
    }
    setShowConfirm(false);
  };

  const isInactive = ["over", "canceled", "checked"].includes(booking.status);
  const formattedDate = new Date(booking.booked_date).toLocaleDateString();
  const bookingTime = formatTime(booking.time);

  return (
    <>
      {showConfirm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onKeyDown={(e) => e.key === "Escape" && closeModal()}
          tabIndex={-1}
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Cancel Booking
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to cancel this booking?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white px-4 py-2 rounded"
              >
                No
              </button>
              <button
                onClick={confirmCancel}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showQR && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onKeyDown={(e) => e.key === "Escape" && closeQRModal()}
          tabIndex={-1}
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm text-center mx-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Booking QR Code
            </h3>
            <QRCode
              value={JSON.stringify({
                id: booking._id,
                room: booking.room,
                seat: booking.seat,
                date: formattedDate,
                time: bookingTime,
              })}
              size={180}
              className="mx-auto mb-4"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {booking.room}
              {booking.type === "seat" ? ` - Seat: ${booking.seat}` : ""}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formattedDate} | {bookingTime}
            </p>
            <button
              onClick={closeQRModal}
              className="mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div
        className={`rounded-lg shadow hover:shadow-lg transition duration-200 overflow-hidden w-full ${
          isInactive ? "bg-gray-200 dark:bg-gray-800" : "bg-white dark:bg-gray-700"
        }`}
      >
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{booking.room}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            <span className="font-medium">Date:</span> {formattedDate}
          </p>
          {booking.seat && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span className="font-medium">Seat:</span> {booking.seat}
            </p>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            <span className="font-medium">Time:</span> {bookingTime}
          </p>

          <div className="flex justify-between items-center">
            {isInactive ? (
              <span className="bg-gray-400 dark:bg-gray-600 text-white text-sm px-3 py-1 rounded">
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            ) : (
              <>
                <button
                  onClick={handleCancelClick}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowQR(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                >
                  QR Code
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Item;
