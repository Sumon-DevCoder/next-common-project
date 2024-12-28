"use client";

import { useState } from "react";

const AdminDashboardSettings = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: false,
    smsNotifications: false,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleNotificationsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  const handleProfileSave = () => {
    // Logic to save profile settings
    console.log("Profile saved:", profile);
  };

  const handlePasswordSave = () => {
    // Logic to save password settings
    console.log("Password saved:", password);
  };

  const handleNotificationsSave = () => {
    // Logic to save notification settings
    console.log("Notifications saved:", notifications);
  };

  return (
    <div className="p-4 space-y-8">
      {/* Profile Settings */}
      <div className="bg-gray-400 p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleProfileChange}
          placeholder="Name"
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleProfileChange}
          placeholder="Email"
          className="w-full border p-2 mb-4 rounded"
        />
        <button
          onClick={handleProfileSave}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save Profile
        </button>
      </div>

      {/* Password Settings */}
      <div className="bg-gray-400 p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Password Settings</h2>
        <input
          type="password"
          name="currentPassword"
          value={password.currentPassword}
          onChange={handlePasswordChange}
          placeholder="Current Password"
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          type="password"
          name="newPassword"
          value={password.newPassword}
          onChange={handlePasswordChange}
          placeholder="New Password"
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          type="password"
          name="confirmPassword"
          value={password.confirmPassword}
          onChange={handlePasswordChange}
          placeholder="Confirm Password"
          className="w-full border p-2 mb-4 rounded"
        />
        <button
          onClick={handlePasswordSave}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save Password
        </button>
      </div>

      {/* Notification Settings */}
      <div className="bg-gray-400 p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            name="emailNotifications"
            checked={notifications.emailNotifications}
            onChange={handleNotificationsChange}
            className="mr-2"
          />
          Email Notifications
        </label>
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            name="smsNotifications"
            checked={notifications.smsNotifications}
            onChange={handleNotificationsChange}
            className="mr-2"
          />
          SMS Notifications
        </label>
        <button
          onClick={handleNotificationsSave}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save Notifications
        </button>
      </div>
    </div>
  );
};

export default AdminDashboardSettings;
