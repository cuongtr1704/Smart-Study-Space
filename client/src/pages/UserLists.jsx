import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getAllUsers,
  updateRole,
  createNotification,
  reset,
} from "../features/users/userSlice";
import Spinner from "../components/Spinner";

export default function UserLists() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() || "";

  const { user, users, isLoading, isError, message } = useSelector(
    (state) => state.user
  );

  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationType, setNotificationType] = useState("normal");
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  const isAdmin = user?.isAdmin === true || user?.isAdmin === "true";

  useEffect(() => {
    if (!isAdmin) {
      navigate("/userspace");
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getAllUsers());

    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);

  const getRole = (user) => {
    if (user.isAdmin) return "Admin";
    if (user.isEmployee) return "Employee";
    return "User";
  };

  const openRoleModal = (user) => {
    setSelectedUser(user);
    setNewRole(getRole(user));
    setShowRoleModal(true);
  };

  const handleRoleUpdate = () => {
    if (!selectedUser || !newRole) return;
    dispatch(updateRole({ userId: selectedUser._id, newRole: newRole })).then(() =>
      dispatch(getAllUsers())
    );

    setShowRoleModal(false);
    setSelectedUser(null);
    setNewRole("");
  };

  const openNotificationModal = (user) => {
    setSelectedUser(user);
    setShowNotificationModal(true);
  };

  const handleSendNotification = () => {
    if (!notificationTitle || !notificationMessage) return;
    dispatch(
      createNotification({
        userId: selectedUser._id,
        type: notificationType,
        title: notificationTitle,
        message: notificationMessage,
      })
    );

    setNotificationType("normal");
    setNotificationTitle("");
    setNotificationMessage("");
    setShowNotificationModal(false);
  };

  const filteredUsers = users.filter((u) =>
    [u.name, u.username].some((field) =>
      field?.toLowerCase().includes(search)
    )
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="content relative">
      <h1 className="text-2xl font-bold mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-fit px-4 py-2 justify-center text-center rounded-lg">
        User Lists
      </h1>

      {filteredUsers.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl p-4 shadow flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Username: {user.username}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Role: {getRole(user)}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openRoleModal(user)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                >
                  Change Role
                </button>

                <button
                  onClick={() => openNotificationModal(user)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
                  Send Notification
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-500 dark:text-gray-400">
          No users matched your search.
        </p>
      )}

      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg p-6 w-80 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Change Role</h2>
            <p className="mb-2">User: {selectedUser?.name}</p>

            <div className="flex justify-between gap-2 mb-4">
              {["User", "Employee", "Admin"].map((role) => (
                <button
                  key={role}
                  onClick={() => setNewRole(role)}
                  className={`flex-1 px-3 py-2 rounded-md border transition ${
                    newRole === role
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleRoleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg p-6 w-80 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Send Notification</h2>

            <div className="flex justify-between gap-2 mb-4">
              <button
                onClick={() => setNotificationType("warning")}
                className={`flex-1 px-3 py-2 rounded-md border transition ${
                  notificationType === "warning"
                    ? "bg-red-300 text-red-700"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Warning
              </button>
              <button
                onClick={() => setNotificationType("normal")}
                className={`flex-1 px-3 py-2 rounded-md border transition ${
                  notificationType === "normal"
                    ? "bg-green-300 text-green-700"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Normal
              </button>
            </div>

            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={notificationTitle}
                onChange={(e) => setNotificationTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                value={notificationMessage}
                onChange={(e) => setNotificationMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNotificationModal(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSendNotification}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}