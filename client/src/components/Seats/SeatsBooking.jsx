import { useState, useEffect } from "react";
import DatePicker from '../Pickers/DatePicker';
import TimePicker from '../Pickers/TimePicker';
import SeatPicker from "../Pickers/SeatsPicker";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllBookings, reset } from "../../features/bookings/bookingSlice";
import { createBooking } from "../../features/users/userSlice";
import Spinner from "../Spinner";
import { toast } from "react-toastify";

const rooms = ['A3 Library', 'A4-501', 'A4-401'];

export default function SeatsBooking() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [selectedRoom, setSelectedRoom] = useState('');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [selectedSeat, setSelectedSeat] = useState('');
  
  const { bookings, isLoading, isError, message } = useSelector(
    (state) => state.bookings
  );

  const onChangeDate = date => setDate(date);
  const onChangeTime = time => setTime(time);
  const onChangeSeat = seat => setSelectedSeat(seat);

  useEffect(() => {
    if (isError) {
      toast.log(message);
    }

    if (selectedRoom && date && time) {
      const formattedDate = date.toLocaleDateString('en-CA');
      dispatch(getAllBookings({
        type: 'seat',
        room: selectedRoom,
        booked_date: formattedDate,
        time: time
      }));
    }

    return () => {
      dispatch(reset());
    };
  }, [selectedRoom, date, time, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const onClick = () => {
    if (selectedRoom && date && time && selectedSeat) {
      const formattedDate = date.toLocaleDateString('en-CA');
      const userBooking = {
        type: 'seat',
        room: selectedRoom,
        booked_date: formattedDate,
        time: time,
        seat: selectedSeat,
      };
      dispatch(createBooking(userBooking));
      navigate('/userspace');
    } else {
      toast.error("Please choose all the fields");
      navigate('/booking');
    }
  };

  return (
    <div className="flex gap-4 flex-col lg:flex-row md:flex-row">
      <div className="w-full lg:max-w-[380px] md:max-w-full">
        <div className="bg-white dark:bg-gray-800 mb-2 w-full lg:max-w-[380px] md:max-w-full rounded-lg shadow-md p-4 flex flex-col gap-4">
          <h2 className="text-center font-bold text-black dark:text-white">Choose place</h2>
          <div className="flex mb-2 justify-center gap-3">
            {rooms.map((room) => (
              <button
                key={room}
                onClick={() => setSelectedRoom(room)}
                className={`py-2 w-1/4 rounded border text-center transition duration-200 ${
                  selectedRoom === room
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {room}
              </button>
            ))}
          </div>
        </div>
        {selectedRoom && <DatePicker date={date} onChange={onChangeDate} tomorrow={tomorrow} />}
        {selectedRoom && date && <TimePicker time={time} setTime={onChangeTime} />}
      </div>
      <div className="w-full lg:max-w-full md:max-w-[380px]">
        {selectedRoom && date && time && (
          <SeatPicker
            room={selectedRoom}
            selectedSeat={selectedSeat}
            setSelectedSeat={onChangeSeat}
            onClick={onClick}
            bookedSeats={bookings}
          />
        )}
      </div>
    </div>
  );
}
