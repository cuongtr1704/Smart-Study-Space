import { useState } from 'react';

export default function TimePicker({ time, setTime }) {
  const shifts = Array.from({ length: 10 }, (_, i) => ({
    shift: i + 1,
    label: `${8 + i}:00 - ${9 + i}:00`,
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-full">
      <h2 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-white">
        Choose Time Shift
      </h2>
      <table className="w-full">
        <tbody>
          {shifts.map(({ shift, label }, index) => (
            <tr key={shift} className="border-b last:border-0">
              <td className="py-2 px-4 font-medium text-gray-600 dark:text-gray-300">
                Shift {shift}
              </td>
              <td className="py-2 px-4 text-gray-700 dark:text-gray-200">{label}</td>
              <td className="py-2 px-4 text-right">
                <button
                  onClick={() => setTime(shift)}
                  className={`px-4 py-1 rounded text-sm font-medium transition duration-200 ${
                    time === shift
                      ? 'bg-blue-500 text-white dark:bg-blue-700'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                  }`}
                >
                  {time === shift ? 'Selected' : 'Select'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {time && (
        <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
          Selected Shift: <span className="font-semibold">Shift {time}</span>
        </p>
      )}
    </div>
  );
}
