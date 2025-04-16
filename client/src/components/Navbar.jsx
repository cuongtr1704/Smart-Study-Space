import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../features/users/userSlice";
import UserAvatar from "./UserAvatar";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
      <div className="flex justify-between items-center bg-white dark:bg-gray-900 px-4 py-3 2xl:py-4 sticky z-10 top-0 transition-colors duration-300">
        <div className="flex gap-0">
          <button
            onClick={() => dispatch(setOpenSidebar(true))}
            className="text-2xl text-gray-500 dark:text-gray-300 flex items-center mr-4 justify-center md:hidden"
          >
            ☰
          </button>

          <div className="w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full md:j bg-[#f3f4f6] dark:bg-gray-800 transition-colors duration-300">
            <MdOutlineSearch className="text-gray-500 dark:text-gray-300 text-xl" />

            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              type="text"
              placeholder="Search...."
              className="flex-1 outline-none bg-transparent placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-800 dark:text-white"
            />
          </div>
        </div>
        <div className="flex gap-2 items-center flex-shrink-0">
          <NotificationPanel />
          <UserAvatar />
        </div>
      </div>
  );
};

export default Navbar;
