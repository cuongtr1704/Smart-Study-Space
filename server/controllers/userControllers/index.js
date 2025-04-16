const asyncHandler = require("express-async-handler");
const {
  registerUser,
  loginUser,
  changePassword,
  getAll,
  updateUserNewRole,
  getUserBookings,
  createUserBooking,
  updateUserBooking,
  getUserNotifications,
  createUserNotification,
  viewUserNotification,
  viewAllUserNotifications,
  deleteUserNotification,
  deleteAllUserNotifications,
} = require("../../services/users.service.js");

async function register(req, res) {
  try {
    res.json(
      await registerUser(req.body.name, req.body.username, req.body.password)
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    res.json(await loginUser(req.body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function change(req, res) {
  try {

    res.json(
      await changePassword(req.body.currentPassword, req.body.newPassword, req.user.id)
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllUsers(req, res) {
  try {
    res.json(await getAll());
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateNewRole(req, res) {
  try {
    res.json(await updateUserNewRole(req.params.id, req.body.newRole));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getBookings(req, res) {
  try {
    res.json(await getUserBookings(req.user.id));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function createBooking(req, res) {
  try {
    res.json(await createUserBooking(req.body, req.user));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateBooking(req, res) {
  try {
    res.json(await updateUserBooking(req.params.id, req.body, req.user));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getNotifications(req, res) {
  try {
    res.json(await getUserNotifications(req.user.id));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function createNotification(req, res) {
  try {
    res.json(await createUserNotification(req.body, req.user));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function viewNotification(req, res) {
  try {
    res.json(await viewUserNotification(req.params.id, req.user));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function viewAllNotification(req, res) {
  try {
    res.json(await viewAllUserNotifications(req.user));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteNotification(req, res) {
  try {
    res.json(await deleteUserNotification(req.params.id, req.user));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteAllNotifications(req, res) {
  try {
    res.json(await deleteAllUserNotifications(req.user));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  register,
  login,
  change,
  getAllUsers,
  updateNewRole,
  getBookings,
  createBooking,
  updateBooking,
  getNotifications,
  createNotification,
  viewNotification,
  viewAllNotification,
  deleteNotification,
  deleteAllNotifications,
};
