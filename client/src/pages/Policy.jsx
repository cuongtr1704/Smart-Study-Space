import React from 'react'

export default function Policy() {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 max-w-3xl mx-auto rounded-lg text-black dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-4">Study Space Policy</h1>

      <p className="mb-4">
        To ensure a fair and pleasant experience for all users, please read and follow the policies below when using the Smart Study Space booking system.
      </p>

      <ul className="list-disc pl-6 space-y-3 text-base">
        <li>
          <strong>Booking Responsibility:</strong> Users are expected to show up for all booked sessions. Repeated no-shows or last-minute cancellations may result in temporary suspension or permanent banning from the system.
        </li>

        <li>
          <strong>Booking Abuse:</strong> Excessive booking beyond reasonable use, especially without attendance, will be monitored. Offenders will receive a warning, and repeated behavior will lead to restrictions.
        </li>

        <li>
          <strong>Cleanliness:</strong> Please keep the study environment clean. Dispose of any trash and leave the area as you found it for the next user.
        </li>

        <li>
          <strong>No Theft or Vandalism:</strong> Stealing or damaging any equipment or property is strictly prohibited. Such behavior will result in immediate banning and may lead to further action.
        </li>

        <li>
          <strong>Respect Others:</strong> Maintain a quiet and respectful environment. Avoid making noise or disturbing others using the space.
        </li>
      </ul>

      <p className="mt-6 text-sm italic text-gray-600 dark:text-gray-400">
        Thank you for cooperating and helping us maintain a productive and safe space for all students.
      </p>
    </div>
  )
}
