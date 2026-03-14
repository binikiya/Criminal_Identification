import { useState } from "react";
import { FaUserCircle, FaEnvelope, FaPhone, FaLock, FaHistory } from "react-icons/fa";

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
        alert("Profile updated successfully!");
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-indigo-50/30">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaUserCircle className="text-indigo-600" />
                    {formData.firstName} {formData.lastName}
                </h2>
                <p className="text-gray-500">Administrator</p>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-300" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-300" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="flex items-center border rounded-md px-3 py-2 mt-1">
                            <FaEnvelope className="text-gray-400 mr-2" />
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="flex-1 outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <div className="flex items-center border rounded-md px-3 py-2 mt-1">
                            <FaPhone className="text-gray-400 mr-2" />
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="flex-1 outline-none" />
                        </div>
                    </div>
                </div>
                <div className="pt-4">
                    <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex justify-center items-center gap-2">
                        Save Changes
                    </button>
                </div>
            </form>

            <div className="mt-8 border-t pt-6">
                <div className="p-6 border-b border-gray-100 bg-indigo-50/30">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaHistory className="text-indigo-600 mr-2" /> Change Password
                    </h2>
                </div>
                <form className="p-8 space-y-6">
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
                    <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ProfilePage;