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
        <div className="flex flex-wrap gap-6 justify-start">
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