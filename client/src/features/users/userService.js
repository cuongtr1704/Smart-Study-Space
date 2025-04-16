import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}/api/users/`;

// Register user - done
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user - done
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Change password - done
const changePassword = async (userData) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + 'change-password', userData, config);

  return response.data;
};

// Get all users - done
const getAllUsers = async () => {
  const response = await axios.get(API_URL + 'all')
  return response.data
}

// Update user role - done
const updateNewRole = async (userId, newRole) => {
  const response = await axios.put(API_URL + `update-role/${userId}`, {newRole})
  return response.data
}

// Get user bookings - done
const getBookings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + `get-userbookings`, config);

  const sortedBookings = response.data.sort((a, b) => {
    const dateA = new Date(a.booked_date);
    const dateB = new Date(b.booked_date);

    if (dateA.getTime() !== dateB.getTime()) {
      return dateA - dateB;
    }

    return a.time - b.time;
  });

  return sortedBookings
}

// Create new booking - done
const createBooking = async (bookingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL + `create-userbooking`, bookingData, config)

  return response.data
}

//Update booking - done
const updateBooking = async (bookingId, bookingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + `update-userbooking/${bookingId}`, bookingData, config)

  return response.data
}

const getNotifications = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + 'get-usernotifications', config);
  return response.data;
};

// Create new notification
const createNotification = async (notificationData) => {
  const response = await axios.post(API_URL + 'create-usernotification', notificationData);
  return response.data;
};

// View notification (mark as read)
const viewNotification = async (notificationId, notificationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL + `view-usernotification/${notificationId}`, notificationData , config);
  return response.data;
};

// View all notifications (mark all as read)
const viewAllNotifications = async (notificationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL + 'view-all-usernotifications', notificationData, config);
  return response.data;
};

// Delete a notification
const deleteNotification = async (notificationId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + `delete-usernotification/${notificationId}`, config);
  return response.data;
};

// Delete all notifications
const deleteAllNotifications = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + 'delete-all-usernotifications', config);
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const userService = {
  register,
  changePassword,
  getAllUsers,
  updateNewRole,
  logout,
  login,
  getBookings,
  createBooking,
  updateBooking,
  getNotifications,
  createNotification,
  viewNotification,
  viewAllNotifications,
  deleteNotification,
  deleteAllNotifications,
}

export default userService
