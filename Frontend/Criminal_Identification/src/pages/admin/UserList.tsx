import { useEffect, useState } from 'react';
import { FaUserShield, FaSearch, FaFilter, FaUserPlus, FaEnvelope, FaPhone, FaUserEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../api/api';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Assuming your backend has a /users/ endpoint that returns staff
                const response = await api.get('/users/');
                setUsers(response.data);
            } catch (err) {
                console.error("Error fetching staff records:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => {
        const matchesSearch = (user.first_name + ' ' + user.last_name).toLowerCase().includes(searchTerm.toLowerCase()) || 
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === '' || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const getRoleStyle = (role: string) => {
        switch (role.toLowerCase()) {
            case 'admin': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'investigator': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
            case 'officer': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tight">Staff Directory</h1>
                    <p className="text-gray-500 font-medium">Manage access and profiles for Officers and Investigators.</p>
                </div>
                <Link to="/admin/users/register" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg">
                    <FaUserPlus /> Authorize New Staff
                </Link>
            </header>

            {/* Search & Role Filter */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <FaFilter className="absolute left-4 top-3.5 text-gray-400" />
                    <select 
                        className="pl-12 pr-10 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none font-bold text-gray-600"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="">All Roles</option>
                        <option value="admin">Administrators</option>
                        <option value="investigator">Investigators</option>
                        <option value="officer">Officers</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-20 text-center font-bold text-indigo-600">Accessing Personnel Files...</div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Personnel</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Role</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Contact</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Account Status</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                                {user.first_name[0]}{user.last_name[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800">{user.first_name} {user.last_name}</p>
                                                <p className="text-xs text-gray-400">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getRoleStyle(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-xs font-medium text-gray-600 flex flex-col gap-1">
                                            <span className="flex items-center gap-1"><FaEnvelope className="text-gray-300" /> {user.email}</span>
                                            <span className="flex items-center gap-1"><FaPhone className="text-gray-300" /> {user.phone || 'N/A'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${user.is_active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                            <span className="text-xs font-bold text-gray-600">{user.is_active ? 'Active' : 'Deactivated'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"><FaUserEdit /></button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors"><FaTrashAlt /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default UserList;