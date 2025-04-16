import React, { useState, useEffect } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../features/users/userSlice";
import UserAvatar from "./UserAvatar";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { updateURL } from "../utils";
import NotificationPanel from "./NotificationPanel";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    updateURL({ searchTerm, navigate, location });
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-900 px-4 py-3 2xl:py-4 sticky z-10 top-0 w-full transition-colors duration-300 overflow-hidden">
      <div className="flex items-center flex-grow min-w-0">
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className="text-2xl text-gray-500 dark:text-gray-300 block md:hidden mr-0"
        >
          ☰
        </button>

        <div className="flex items-center flex-grow min-w-0 px-3 py-2 md:max-w-96 lg:max-w-96 rounded-full bg-[#f3f4f6] dark:bg-gray-800 transition-colors duration-300 ml-0">
          <MdOutlineSearch className="text-gray-500 dark:text-gray-300 text-xl shrink-0" />
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="text"
            placeholder="Search..."
            className="flex-1 min-w-0 bg-transparent outline-none ml-2 placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-800 dark:text-white"
          />
        </div>
      </div>

      <div className="flex gap-2 items-center ml-2 lg:ml-6 shrink-0">
        <NotificationPanel />
        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
