import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Item from "../Item"
import Spinner from "../Spinner"
import { getBookings, reset } from "../../features/users/userSlice"

export default function Seats() {
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


  const seatBookings = bookings.filter(
    (book) => book.type === "seat" && book.status === "incoming"
  );

  return (
    <section className="content">
      {seatBookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seatBookings.map((book) => (
            <Item key={book._id} booking={book} />
          ))}
        </div>
      ) : (
        <h2 className="text-2xl text-black dark:text-white font-bold">You have not set any seats</h2>
      )}
    </section>
  );
}
