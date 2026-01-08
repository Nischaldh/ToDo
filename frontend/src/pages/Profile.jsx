import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthTheme } from "../context/AuthContext";
import { Camera, User, Mail, Lock, Save, X } from "lucide-react";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, isLoggedIn, editProfile, uploadProfile, changePassword, isLoading } = useAuthTheme();
  const navigate = useNavigate();

  
  React.useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, isLoading, navigate]);

  // Form states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Update form when user data changes
  React.useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  // Handle profile edit
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await editProfile(profileData);
      setIsEditingProfile(false);
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  // Handle profile picture upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;

    try {
      await uploadProfile(imageFile);
      setPreviewImage(null);
      setImageFile(null);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const cancelImageUpload = () => {
    setPreviewImage(null);
    setImageFile(null);
  };

  // Handle password change
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsChangingPassword(false);
    } catch (error) {
      console.error("Password change failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Profile Settings
          </h1>

          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={previewImage || user.profilePic || "https://i.pravatar.cc/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
              />
              <label
                htmlFor="profile-pic"
                className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors"
              >
                <Camera size={20} />
                <input
                  id="profile-pic"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Image Upload Actions */}
            {previewImage && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleImageUpload}
                  disabled={isLoading}
                  className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <Save size={16} className="mr-2" />
                  {isLoading ? "Uploading..." : "Save Photo"}
                </button>
                <button
                  onClick={cancelImageUpload}
                  className="flex items-center px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-white rounded-lg transition-colors"
                >
                  <X size={16} className="mr-2" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            {/* Name and Email */}
            {!isEditingProfile ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <User className="text-gray-500 dark:text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                    <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Mail className="text-gray-500 dark:text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingProfile(false);
                      setProfileData({ name: user.name, email: user.email });
                    }}
                    className="flex-1 py-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-white rounded-lg transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Change Password Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Lock className="mr-2" size={24} />
            Change Password
          </h2>

          {!isChangingPassword ? (
            <button
              onClick={() => setIsChangingPassword(true)}
              className="w-full py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors font-medium"
            >
              Change Password
            </button>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
                >
                  {isLoading ? "Changing..." : "Change Password"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                  }}
                  className="flex-1 py-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-white rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;