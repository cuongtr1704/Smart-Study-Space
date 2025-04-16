import { Calendar } from 'react-calendar';

export default function Booking({ date, onChange, tomorrow }) {
  return (
    <div className="bg-white dark:bg-gray-800 mb-2 w-full lg:max-w-[380px] md:max-w-full rounded-lg shadow-md p-4 flex flex-col gap-4 justify-center items-center">
      <h2 className="text-center font-bold text-gray-800 dark:text-white">Select a date</h2>
      <Calendar
        value={date}
        onChange={onChange}
        minDate={tomorrow}
        className="react-calendar w-full text-center text-gray-800 dark:text-white dark:bg-gray-800 rounded-lg shadow-md"
        tileClassName="text-center text-gray-800 dark:text-white"
        prevLabel={<span className="text-xl text-gray-600 dark:text-gray-300">←</span>}
        nextLabel={<span className="text-xl text-gray-600 dark:text-gray-300">→</span>}
      />
    </div>
  );
}
