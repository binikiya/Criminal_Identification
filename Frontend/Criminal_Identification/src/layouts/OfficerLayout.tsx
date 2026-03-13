import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaChartBar, FaSearch, FaPlus, FaHeart, FaMapMarkerAlt, FaCreditCard, FaHistory, FaStar } from 'react-icons/fa';

const OfficerLayout = () => {
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/officer/dashboard', icon: <FaChartBar /> },
        { name: 'Monitor', path: '/officer/monitor', icon: <FaSearch /> },
        { name: 'Register', path: '/officer/register', icon: <FaPlus /> },
        { name: 'Wishlist', path: '/customer/wishlist', icon: <FaHeart /> },
        { name: 'Booking History', path: '/customer/history', icon: <FaHistory /> },
        { name: 'My Reviews', path: '/customer/reviews', icon: <FaStar /> },
        { name: 'Addresses', path: '/customer/addresses', icon: <FaMapMarkerAlt /> },
        { name: 'Payments', path: '/customer/payments', icon: <FaCreditCard /> },
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
                                ? "bg-indigo-600 text-white border-l-4 border-white" 
                                : "text-slate-300 hover:bg-indigo-600"
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

export default OfficerLayout;