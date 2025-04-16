import React from "react";
import logo from "../images/logo.png";
import {
  HiArchive,
  HiCalendar,
  HiClock,
  HiClipboardList,
  HiEmojiHappy,
  HiDesktopComputer,
  HiCog,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../features/users/userSlice";
import clsx from "clsx";

const linkData = [
  {
    label: "Your Space",
    link: "userspace",
    icon: <HiArchive />,
  },
  {
    label: "Booking",
    link: "booking",
    icon: <HiCalendar />,
  },
  {
    label: "History",
    link: "history",
    icon: <HiClock />,
  },
  {
    label: "Policy",
    link: "policy",
    icon: <HiClipboardList />,
  },
  {
    label: "Attendance",
    link: "check-attendance",
    icon: <HiEmojiHappy />,
  },
  {
    label: "User Lists",
    link: "user-lists",
    icon: <HiDesktopComputer />,
  },
  {
    label: "Settings",
    link: "settings",
    icon: <HiCog />,
  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  const [showSettings, setShowSettings] = React.useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  const sidebarLinks = React.useMemo(() => {
    if (!user) return [];

    const isAdmin = user.isAdmin;
    const isEmployee = user.isEmployee;

    return linkData.filter((link) => {
      if (isAdmin) return true;

      const basicLinks = ["userspace", "booking", "history", "policy", "settings"];
      const employeeExtra = ["check-attendance"];

      if (basicLinks.includes(link.link)) return true;
      if (isEmployee && employeeExtra.includes(link.link)) return true;

      return false;
    });
  }, [user, dispatch]);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    const isActive = path === el.link.split("/")[0];
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-base transition-colors",
          isActive
            ? "bg-blue-700 text-white dark:bg-blue-500"
            : "text-gray-800 dark:text-gray-200 hover:bg-[#2564ed2d] dark:hover:bg-gray-700"
        )}
      >
        {el.icon}
        <span>{el.label}</span>
      </Link>
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div>
        <h1 className="flex gap-1 items-center">
          <Link to="/home">
            <img src={logo} alt="BK TPHCM Logo" className="w-10 h-10" />
          </Link>
          <span className="text-large font-bold text-black dark:text-white">
            Smart Study Space
          </span>
        </h1>
      </div>
      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
