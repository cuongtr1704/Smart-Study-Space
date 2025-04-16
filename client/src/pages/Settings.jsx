import { useEffect, useState } from "react";

export default function Settings({darkMode, setDarkMode}) {
  return (
    <div className="content">
      <h1 className="text-2xl font-bold mb-4 bg-white w-fit px-4 py-2 dark:bg-gray-800 dark:text-white rounded-lg ">Settings</h1>
      <div className="flex items-center justify-between max-w-sm p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
        <span className="text-lg font-medium dark:text-white">
          Toggle Dark Mode
        </span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-full transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
}
