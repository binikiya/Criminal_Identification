import { useState } from "react";
import { FaUserCircle, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";

function ProfilePage() {
    const [formData, setFormData] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    phone: "+251900000000",
    });

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
    e.preventDefault();
    // TODO: Connect to backend API
    alert("Profile updated successfully!");
    };

    return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8">
        <div className="flex flex-col items-center mb-6">
            <FaUserCircle size={80} className="text-indigo-600 mb-2" />
            <h2 className="text-2xl font-bold text-gray-800">
            {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-gray-500">Administrator</p>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave} className="space-y-4">
            <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-300"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-300"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="flex items-center border rounded-md px-3 py-2 mt-1">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 outline-none"
                />
            </div>
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <div className="flex items-center border rounded-md px-3 py-2 mt-1">
                <FaPhone className="text-gray-400 mr-2" />
                <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="flex-1 outline-none"
                />
            </div>
            </div>

            <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
            >
            Save Changes
            </button>
        </form>

        {/* Change Password Section */}
        <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Change Password</h3>
            <form className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <div className="flex items-center border rounded-md px-3 py-2 mt-1">
                <FaLock className="text-gray-400 mr-2" />
                <input type="password" className="flex-1 outline-none" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <div className="flex items-center border rounded-md px-3 py-2 mt-1">
                <FaLock className="text-gray-400 mr-2" />
                <input type="password" className="flex-1 outline-none" />
                </div>
            </div>
            <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200"
            >
                Update Password
            </button>
            </form>
        </div>
        </div>
    </div>
    );
}

export default ProfilePage;