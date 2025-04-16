import { useState, useEffect } from 'react';

export default function SeatPicker({ room, selectedSeat, setSelectedSeat, onClick, bookedSeats }) {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (room === 'A3 Library') {
      setRows(Array.from({ length: 10 }, (_, i) => i + 1));
      setColumns(['A', 'B', 'C', 'D', 'E']);
    } else {
      setRows(Array.from({ length: 6 }, (_, i) => i + 1));
      setColumns(['A', 'B', 'C']);
    }
  }, [room]);

  const getSeatId = (col, row) => `${col}${row}`;

  const bookedSeatIds = bookedSeats?.map(seat => seat.seat) || [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-full h-fit mx-auto justify-center items-center flex flex-col gap-4">
      <h2 className="text-lg font-semibold mx-4 text-center text-gray-800 dark:text-white">
        Pick a seat in {room}
      </h2>
      <div
        className="grid gap-2 mb-2"
        style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
      >
        {rows.map(row =>
          columns.map(col => {
            const seatId = getSeatId(col, row);
            const isSelected = selectedSeat === seatId;
            const isBooked = bookedSeatIds.includes(seatId);

            return (
              <button
                key={seatId}
                onClick={() => {
                  if (!isBooked) setSelectedSeat(seatId);
                }}
                disabled={isBooked}
                className={`w-14 aspect-square rounded-md font-semibold text-sm transition
                  ${isBooked
                    ? 'bg-gray-300 text-white cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                    : isSelected
                    ? 'bg-blue-500 text-white dark:bg-blue-700'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'}
                `}
              >
                {seatId}
              </button>
            );
          })
        )}
      </div>
      <button
        onClick={onClick}
        className="bg-blue-500 text-white font-bold py-4 px-8 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-200"
      >
        Confirm
      </button>
    </div>
  );
}
