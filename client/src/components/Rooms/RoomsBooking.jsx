import { useState, useEffect } from "react";
import DatePicker from "../Pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../features/users/userSlice";
import { getAllBookings, reset } from "../../features/bookings/bookingSlice";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

const ROOM_TYPES = {
  "Conference Room": [
    { name: "A5 Conference", capacity: 900 },
    { name: "B4 Conference", capacity: 250 },
  ],
  "Projector Room": [
    { name: "B4-303", capacity: 50 },
    { name: "B4-403", capacity: 50 },
    { name: "B4-503", capacity: 50 },
  ],
  "Lab Room": [
    { name: "A4-511", capacity: 36 },
    { name: "C5-202", capacity: 20 },
    { name: "C6-103", capacity: 40 },
    { name: "C6-105", capacity: 40 },
  ],
  "Meeting Room": [
    { name: "Student Reception Room A3", capacity: 30 },
    { name: "A4-509", capacity: 25 },
    { name: "A4-508", capacity: 25 },
    { name: "A4-507", capacity: 25 },
    { name: "A4-506", capacity: 25 },
  ],
};

export default function RoomsBooking() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedType, setSelectedType] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedDate, setDate] = useState();
  const [time, setTime] = useState();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const { bookings, isLoading, isError, message } = useSelector(
    (state) => state.bookings
  );

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setSelectedRoom(null);
    setDate(null);
    setTime(null);
  };

  const onChangeDate = (date) => setDate(date);

  const onClick = () => {
    if (selectedRoom && selectedDate && time) {
      const formattedDate = selectedDate.toLocaleDateString("en-CA");

      const booking = {
        type: "room",
        room: selectedRoom.name,
        booked_date: formattedDate,
        time,
      };

      dispatch(createBooking(booking));
      navigate("/userspace");
    } else {
      toast.error("Please complete all fields");
    }
  };

  const shifts = Array.from({ length: 10 }, (_, i) => ({
    shift: i + 1,
    label: `${8 + i}:00 - ${9 + i}:00`,
  }));

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (selectedRoom && selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString("en-CA");
      dispatch(
        getAllBookings({
          type: "room",
          room: selectedRoom.name,
          booked_date: formattedDate,
        })
      );
    }

    return () => {
      dispatch(reset());
    };
  }, [selectedRoom, selectedDate, isError, message, dispatch]);

  const isShiftBooked = (shift) => {
    return bookings.some(
      (booking) =>
        booking.time === shift &&
        booking.type === "room" &&
        booking.status === "incoming"
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-4 flex-col lg:flex-row">
      <div className="bg-white dark:bg-gray-800 w-full lg:max-w-[380px] md:max-w-full rounded-lg h-fit mb-2 mr-2">
        <div className="p-6 max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Book a Room
          </h1>

          <label className="block mb-2 font-medium text-gray-800 dark:text-gray-300">
            Select Room Type:
          </label>
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className="w-full p-2 border rounded mb-6 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="">-- Choose Room Type --</option>
            {Object.keys(ROOM_TYPES).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {selectedType && (
            <div>
              <label className="block mb-2 font-medium text-gray-800 dark:text-gray-300">
                Available Rooms:
              </label>
              <div className="grid grid-cols-1 gap-3">
                {ROOM_TYPES[selectedType].map((room) => (
                  <button
                    key={room.name}
                    onClick={() => {
                      setSelectedRoom(room); // store full object
                      setDate(null);
                      setTime(null);
                    }}
                    className={`p-3 border rounded-lg text-left ${
                      selectedRoom?.name === room.name
                        ? "bg-blue-100 border-blue-500 dark:bg-blue-700 dark:border-blue-600"
                        : "dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                    }`}
                  >
                    <div className="font-semibold text-gray-800 dark:text-white">
                      {room.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Capacity: {room.capacity} people
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        {selectedRoom && (
          <div className="mr-2 mb-2">
            <DatePicker date={selectedDate} onChange={onChangeDate} tomorrow={tomorrow} />
          </div>
        )}
      </div>

      {selectedRoom && selectedDate && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-full max-w-full mb-2">
          <h2 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-white">
            Choose Time Shift
          </h2>
          <table className="w-full">
            <tbody>
              {shifts.map(({ shift, label }) => {
                const booked = isShiftBooked(shift);
                return (
                  <tr key={shift} className="border-b last:border-0">
                    <td className="py-2 px-4 font-medium text-gray-600 dark:text-gray-300">
                      Shift {shift}
                    </td>
                    <td className="py-2 px-4 text-gray-700 dark:text-gray-400">{label}</td>
                    <td className="py-2 px-4 text-right">
                      <button
                        onClick={() => setTime(shift)}
                        disabled={booked}
                        className={`px-4 py-1 rounded text-sm font-medium transition duration-200 ${
                          time === shift
                            ? "bg-blue-500 text-white"
                            : booked
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white hover:bg-blue-400 text-black border border-gray-300 hover:text-white"
                        }`}
                      >
                        {booked
                          ? "Unavailable"
                          : time === shift
                          ? "Selected"
                          : "Select"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {time && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={onClick}
                className="bg-blue-500 text-white font-bold py-4 px-8 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
