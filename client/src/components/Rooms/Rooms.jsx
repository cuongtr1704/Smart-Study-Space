import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Item from "../Item";
import Spinner from "../Spinner";
import { getBookings, reset } from "../../features/users/userSlice"

export default function Rooms() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { bookings, isLoading, isError, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getBookings());

    return () => {
        dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const roomBookings = bookings.filter(
    (book) => book.type === "room" && book.status === "incoming"
  );

  return (
    <section className="content">
      {roomBookings.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-start">
          {roomBookings.map((book) => (
            <Item key={book._id} booking={book} />
          ))}
        </div>
      ) : (
        <h2 className="text-2xl text-black dark:text-white font-bold">You have not set any rooms</h2>
      )}
    </section>
  );
}
