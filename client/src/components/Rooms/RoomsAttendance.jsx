import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import {
  getAllIncoming,
  reset,
  updateBooking,
} from "../../features/bookings/bookingSlice";
import { useSearchParams } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";

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

const formatTime = (shift) => `${timeMap[shift] || "Unknown"}`;

export default function RoomsAttendance() {
  const dispatch = useDispatch();
  const { bookings, isLoading, isError, message, isUpdating } = useSelector(
    (state) => state.bookings
  );

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getAllIncoming({ type: "room" }));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  const handleCheckAttendance = (bookingId) => {
    dispatch(updateBooking(bookingId));
  };

  if (isLoading) {
    return <Spinner />;
  }

  const roomBookings = bookings.filter(
    (book) =>
      book.type === "room" &&
      [book.name, book.room, book.booked_date]
        .some((field) => field?.toLowerCase().includes(search))
  );

  return (
    <section className="content">
      {roomBookings.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {roomBookings.map((book) => (
            <div
              key={book._id}
              className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800 flex flex-col justify-between gap-4"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {book.room || "N/A"} | {book.booked_date || "N/A"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Booked by: {book.name || "Unknown User"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Time: {formatTime(book.time)}
                </p>
              </div>
              <div className="text-center justify-center items-center">
                {book.status !== "checked" ? (
                  <button
                    onClick={() => handleCheckAttendance(book._id)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                    disabled={isUpdating}
                  >
                    Check
                  </button>
                ) : (
                  <button
                    className="w-full px-4 py-2 bg-white text-blue-600 rounded-md border-0 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition disabled:opacity-50"
                    disabled={isUpdating}
                  >
                    Checked
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          No room bookings found.
        </h2>
      )}
    </section>
  );
}
