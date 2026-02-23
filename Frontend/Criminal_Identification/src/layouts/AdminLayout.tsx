import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaChartBar, FaUser, FaBox, FaHeart, FaBell } from 'react-icons/fa';
import { GiPoliceOfficerHead } from "react-icons/gi";
import { TbViewfinder } from "react-icons/tb";

const AdminLayout = () => {
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <FaChartBar /> },
        { name: 'Criminals', path: '/admin/criminals', icon: <FaBox /> },
        { name: 'Officers', path: '/admin/officers', icon: <GiPoliceOfficerHead />},
        { name: 'Investigators', path: '/admin/investigators', icon: <TbViewfinder />},
        { name: 'Cases', path: '/admin/cases', icon: <FaHeart /> },
        { name: 'Alerts', path: '/admin/alerts', icon: <FaBell /> },
        { name: 'My Profile', path: '/admin/profile', icon: <FaUser /> },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-indigo-700 text-white flex flex-col">
                <div className="p-4 text-2xl font-bold border-b border-indigo-600">
                    Criminal ID System
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                                location.pathname === item.path 
                                ? "bg-indigo-600 text-white" 
                                : "text-slate-300 hover:bg-indigo-600 dark:hover:bg-white/5"
                            }`}
                        >
                            {item.icon} {item.name}
                        </Link>
                    ))}
                </nav>
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