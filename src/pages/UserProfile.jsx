import React, { useState } from "react";
import { ArrowLeft, Mail, User, Lock, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "Prashnat Kumar",
    email: "prashantkumar1@gmail.com",
    password: "12345678",
    confirmPassword: "12345678",
  });
  const [originalData] = useState({
    name: "Prashnat Kumar",
    email: "prashantkumar1@gmail.com",
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    if (isEditMode) {
      setFormData({
        ...formData,
        name: originalData.name,
        password: "",
        confirmPassword: "",
      });
    }
    setIsEditMode(!isEditMode);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        name: formData.name,
        password: formData.password,
      };
      const data = await axiosInstance.patch("/users", updatedData);
      if (data.data?.success) {
        toast.success(data.data.message);
      } else {
        toast.success("failed to update user");
      }
    } catch (error) {
      console.log(error.message);
      console.log("failed to update details");
    } finally {
      setIsEditMode(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const data = await axiosInstance.delete("/users");
      if (data.data.success) {
        navigate("/signup");
        toast.success(data.data.message);
      }
    } catch (error) {
      console.log(error.message);
      console.log("failed to delete user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">
            Profile Settings
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Profile Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <User size={40} className="text-white" />
            </div>
            <p className="text-gray-600 text-sm">Member since 2024</p>
          </div>

          {/* Profile Information */}
          <div className="space-y-6 mb-8">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                    isEditMode
                      ? "border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      : "border-gray-300 bg-gray-50 text-gray-600 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>

            {/* Email Field (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 bg-gray-50 text-gray-600 rounded-lg cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed
              </p>
            </div>

            {/* Password Field - Only show in edit mode */}
            {isEditMode && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-3 text-gray-400"
                      size={20}
                    />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter new password"
                      className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-3 text-gray-400"
                      size={20}
                    />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm new password"
                      className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            {!isEditMode ? (
              <button
                onClick={handleEditToggle}
                className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSaveChanges}
                  className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleEditToggle}
                  className="flex-1 px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Cancel
                </button>
              </>
            )}
          </div>

          {/* Delete Account Button */}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full px-6 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition font-medium flex items-center justify-center gap-2"
          >
            <Trash2 size={18} />
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Delete Account
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone. All your data will be permanently deleted.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
