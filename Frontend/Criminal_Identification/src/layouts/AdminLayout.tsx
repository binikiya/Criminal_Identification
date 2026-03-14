import { Link, Outlet, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaChartBar, FaUserShield, FaUser, FaBox, FaHeart, FaBell, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import { GiPoliceOfficerHead } from "react-icons/gi";
import { TbViewfinder } from "react-icons/tb";

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <FaChartBar /> },
        { name: 'Add User', path: '/admin/add-user', icon: <FaUserShield />},
        { name: 'Criminals', path: '/admin/criminals', icon: <FaBox /> },
        { name: 'Officers', path: '/admin/officers', icon: <GiPoliceOfficerHead />},
        { name: 'Investigators', path: '/admin/investigators', icon: <TbViewfinder />},
        { name: 'Cases', path: '/admin/cases', icon: <FaHeart /> },
        { name: 'Alerts', path: '/admin/alerts', icon: <FaBell /> },
        { name: 'My Profile', path: '/admin/profile', icon: <FaUser /> },
        { name: 'Settings', path: '/admin/settings', icon: <FaHistory /> },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');

        navigate('/');
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <aside className="w-64 bg-indigo-900 text-white flex flex-col">
                <div className="p-6 font-black text-xl tracking-tighter border-b border-indigo-800">
                    CRIMINAL ID <span className="text-indigo-400">PRO</span>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                                location.pathname === item.path 
                                ? "bg-indigo-600 text-white border-l-4 border-white" 
                                : "text-slate-300 hover:bg-indigo-600"
                            }`}
                        >
                            {item.icon} {item.name}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-indigo-800">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-red-500/10 hover:text-red-400 rounded-xl font-bold transition-all uppercase text-xs tracking-widest">
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-6 md:p-10">
                <div className="max-w-5xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;