const User = require("../models/userModel");
const Booking = require("../models/bookingModel");
const Notification = require("../models/notificationModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function getUsersById(id) {
  try {
    const users = await User.findById(id).select("-password");
    if (!users) {
      throw new Error("User not found");
    }
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function registerUser(name, username, password) {
  if (!name || !username || !password) {
    throw new Error("Please add all fields");
  }
  const userExists = await User.findOne({ username });
  if (userExists) {
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    username,
    password: await bcrypt.hash(password, 10),
  });
  if (user) {
    return {
      _id: user.id,
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin,
      isEmployee: user.isEmployee,
      token: generateToken(user._id),
    };
  } else {
    throw new Error("Invalid user data");
  }
}

async function loginUser(data) {
  const user = await User.findOne({ username: data.username });
  if (user && (await bcrypt.compare(data.password, user.password))) {
    return {
      _id: user.id,
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin,
      isEmployee: user.isEmployee,
      token: generateToken(user._id),
    };
  } else {
    throw new Error("Invalid username or password");
  }
}

async function changePassword(currentPassword, newPassword, userId) {
  if (!currentPassword || !newPassword) {
    throw new Error("Please add all fields");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  if (!(await bcrypt.compare(currentPassword, user.password))) {
    throw new Error("Current password is incorrect");
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  await Notification.create({
    type: "Alert",
    title: "Password changed",
    message: "Your password has been changed successfully",
    user: user.id,
  });

  return { message: "Password changed successfully" };
}

async function getAll() {
  const users = await User.find();
  return users;
}

async function updateUserNewRole(userId, newRole) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  if (newRole === "Admin") {
    user.isAdmin = true;
    user.isEmployee = false;
  }
  if (newRole === "Employee") {
    user.isAdmin = false;
    user.isEmployee = true;
  }
  if (newRole === "User") {
    user.isAdmin = false;
    user.isEmployee = false;
  }
  await user.save();
  return { message: "User role updated successfully" };
}

async function getUserBookings(userId) {
  const bookings = await Booking.find({ user: userId });
  return bookings;
}

async function createUserBooking(bookingData, user) {
  if (!bookingData.room || !bookingData.booked_date || !bookingData.time) {
    throw new Error("Please add all fields");
  }
  if (bookingData.type === "room") {
    const existingRoom = await Booking.findOne({
      room: bookingData.room,
      booked_date: bookingData.booked_date,
      time: bookingData.time,
    });

    if (existingRoom) {
      await Notification.create({
        type: "Booking",
        title: "Unable to book",
        message: `Someone booked before you, please choose again`,
        user: user.id,
      });
      return {message: "Room already booked for this date and time"};
    }
  }

  if (bookingData.type === "seat") {
    const existingSeat = await Booking.findOne({
      room: bookingData.room,
      booked_date: bookingData.booked_date,
      seat: bookingData.seat,
      time: bookingData.time,
    });

    if (existingSeat) {
      await Notification.create({
        type: "Booking",
        title: "Unable to book",
        message: `Someone booked before you, please choose again`,
        user: user.id,
      });
      return {message: "Seat already booked for this date and time"};
    }
  }

  const booking = await Booking.create({
    type: bookingData.type,
    room: bookingData.room,
    booked_date: bookingData.booked_date,
    seat: bookingData.seat,
    time: bookingData.time,
    status: bookingData.status,
    user: user.id,
    name: user.name,
  });

  await Notification.create({
    type: "Booking",
    title: "New Booking",
    message: `You booked a ${bookingData.type}, room ${bookingData.room} on ${
      bookingData.booked_date
    } at shift ${bookingData.time}${
      bookingData.seat ? `, seat ${bookingData.seat}` : ""
    }`,
    user: user.id,
  });

  return booking;
}

async function updateUserBooking(bookingId, bookingData, user) {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new Error("Booking not found");
  }
  if (!user) {
    throw new Error("User not found");
  }
  if (booking.user.toString() !== user.id) {
    throw new Error("User not authorized");
  }
  const updatedbooking = await Booking.findByIdAndUpdate(
    bookingId,
    bookingData,
    {
      new: true,
    }
  );

  await Notification.create({
    type: "Booking",
    title: "Booking Updated",
    message: `Your booking has been ${bookingData.status}`,
    user: user.id,
  });

  return updatedbooking;
}

async function getUserNotifications(userId) {
  const notifications = await Notification.find({ user: userId }).sort({
    createdAt: -1,
  });
  return notifications;
}

async function createUserNotification(notificationData, user) {
  if (
    !notificationData.type ||
    !notificationData.title ||
    !notificationData.message ||
    !notificationData.userId
  ) {
    throw new Error("Please add all fields");
  }
  const notification = await Notification.create({
    type: notificationData.type,
    title: notificationData.title,
    message: notificationData.message,
    user: notificationData.userId,
  });
  return notification;
}

async function viewUserNotification(notificationId, user) {
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    throw new Error("Notification not found");
  }
  if (!user) {
    throw new Error("User not found");
  }
  if (notification.user.toString() !== user.id) {
    throw new Error("User not authorized");
  }
  const updatedNotification = await Notification.findByIdAndUpdate(
    notificationId,
    { isRead: true }
  );
  return updatedNotification;
}

async function viewAllUserNotifications(user) {
  const notifications = await Notification.find({ user: user.id });
  if (!notifications) {
    throw new Error("Notifications not found");
  }
  if (!user) {
    throw new Error("User not found");
  }
  const updatedNotifications = await Notification.updateMany(
    { user: user.id },
    { isRead: true }
  );
  return updatedNotifications;
}

async function deleteUserNotification(notificationId, user) {
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    throw new Error("Notification not found");
  }
  if (!user) {
    throw new Error("User not found");
  }
  if (notification.user.toString() !== user.id) {
    throw new Error("User not authorized");
  }
  await Notification.findByIdAndDelete(notificationId);

  return { message: "Notification removed" };
}

async function deleteAllUserNotifications(user) {
  if (!user) {
    throw new Error("User not found");
  }
  await Notification.deleteMany({ user: user.id });
  return { message: "All notifications removed" };
}

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  getUsersById,
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
};
