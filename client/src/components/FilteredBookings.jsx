import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { MdEventSeat, MdOutlineSearch } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";

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

const formatTime = (shift) => timeMap[shift] || "Unknown";

const getStatusColor = (status) => {
  switch (status) {
    case "incoming":
      return "bg-blue-100 text-blue-600 dark:bg-blue-200 dark:text-blue-800";
    case "over":
    case "canceled":
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
  }
};

export default function FilteredBookings() {
  const { bookings } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() || "";

  if (!search) return null;

  const filtered = bookings.filter((b) =>
    [b.room, b.seat, b.booked_date]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(search))
  );

  return (
    <div className="my-2">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 justify-center text-indigo-700 dark:text-indigo-300">
        <MdOutlineSearch className="text-3xl" /> Search Results
      </h2>

      {filtered.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-center">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((booking) => {
            const isRoom = booking.type === "room";
            const icon = isRoom ? <SiGoogleclassroom /> : <MdEventSeat />;
            const label = isRoom ? booking.room : booking.seat;

            return (
              <div
                key={booking._id}
                className="border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow hover:shadow-lg transition bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
              >
                <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400 text-lg font-semibold">
                  {icon} {label}
                </div>

                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {booking.booked_date || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span>{" "}
                    {formatTime(booking.time)}
                  </p>
                  <p className="mt-2">
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={`inline-block px-2 py-1 rounded text-sm font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status || "N/A"}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
