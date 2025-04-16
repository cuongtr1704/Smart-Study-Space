import { useEffect, useState } from "react";
import { LuBell } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate , useLocation } from "react-router-dom";
import {
  getNotifications,
  viewAllNotifications,
  deleteNotification,
  deleteAllNotifications,
  viewNotification,
  reset
} from "../features/users/userSlice";
import Spinner from "./Spinner";

function NotificationPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const { notifications, isLoading, isError, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getNotifications());

    return () => {
      dispatch(reset());
    };
  }, [location.pathname, isError, message, dispatch]);

  const [open, setOpen] = useState(false);
  const handleDelete = (id) => {
    dispatch(deleteNotification(id));
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllNotifications());
  };

  const toggleRead = (id, isRead) => {
    if (isRead === false) {
      dispatch(viewNotification(id));
    }
  };

  const handleViewAll = () => {
    dispatch(viewAllNotifications());
  };
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition dark:hover:bg-gray-700"
      >
        <LuBell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 z-50">
          <div className="flex justify-between items-center p-3 border-b dark:border-gray-600">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Notifications</span>
            {notifications.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="text-sm text-red-500 hover:underline dark:text-red-400"
              >
                Delete All
              </button>
            )}
          </div>

          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-500 px-4 py-2 text-center dark:text-gray-400">
                No notifications
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  onClick={() => toggleRead(n._id, n.isRead)}
                  className={`px-4 py-2 flex justify-between items-start text-sm transition cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 font-medium
                  ${n.isRead ? "text-gray-400 dark:text-gray-600" : n.type === "warning" ? "text-red-700 dark:text-red-500" : n.type === "normal" ? "text-green-700 dark:text-green-500" : n.type === "booking" ? "text-black dark:text-white" : "text-black dark:text-white"}`}
                >
                  <div>
                    <h3 className="w-fit rounded-lg text-base font-bold">{n.title}</h3>
                    <p>{n.message}</p>
                    <p className="text-xs">{new Date(n.createdAt).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(n._id);
                    }}
                    className="text-gray-400 hover:text-red-500 dark:text-gray-300 hover:dark:text-red-400"
                  >
                    <RxCross2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div
            onClick={handleViewAll}
            className="text-center text-blue-500 hover:underline text-sm p-2 cursor-pointer dark:text-blue-400"
          >
            View All
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationPanel;
