import { useState } from 'react';
import { FaUserPlus, FaEnvelope, FaLock, FaUser, FaPhone, FaCalendarAlt, FaIdBadge } from 'react-icons/fa';
import api from '../../api/api';

const UserManagement = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        role: 'officer',
        dob: '',
        phone: '',
        gender: 'male'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await api.post('/users/register/', formData);
            setMessage({ type: 'success', text: 'User account created successfully!' });
            setFormData({
                email: '', username: '', password: '', first_name: '', last_name: '',
                role: 'officer', dob: '', phone: '', gender: 'male'
            });
        }
        catch (err: any) {
            setMessage({ type: 'error', text: err.response?.data?.email?.[0] || 'Registration failed.' });
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-indigo-50/30">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaUserPlus className="text-indigo-600" /> Register New Staff
                </h2>
                <p className="text-gray-500 text-sm">Create accounts for Officers, Investigators, or Guests.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {message.text && (
                    <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-gray-700">Account Credentials</label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                            <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" required />
                        </div>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-3 text-gray-400" />
                            <input name="username" type="text" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" required />
                        </div>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-3 text-gray-400" />
                            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" required />
                        </div>
                        <div className="relative">
                            <FaIdBadge className="absolute left-3 top-3 text-gray-400" />
                            <select name="role" value={formData.role} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                                <option value="officer">Officer</option>
                                <option value="investigator">Investigator</option>
                                <option value="guest">Guest</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-gray-700">Personal Details</label>
                        <div className="flex gap-4">
                            <input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} className="w-1/2 px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" required />
                            <input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} className="w-1/2 px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" required />
                        </div>
                        <div className="relative">
                            <FaPhone className="absolute left-3 top-3 text-gray-400" />
                            <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div className="relative">
                            <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                            <input name="dob" type="date" value={formData.dob} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" required />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex justify-center items-center gap-2">
                        {loading ? 'Registering...' : <><FaUserPlus /> Create User Account</>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserManagement;