import { useState } from "react";
import { FaFolderOpen, FaUserSecret, FaGavel, FaCheckDouble } from 'react-icons/fa';

const OfficerDashboard = () => {
    const [stats, setStats] = useState({
        active_bookings: 0,
        wishlist_count: 0,
        total_spent: 0,
        recent_activity: [] as any[]
    });
    const cardData = [
        { label: 'Total Criminals', value: stats?.total_criminals || 0, icon: <FaUserSecret />, color: 'bg-blue-600' },
        { label: 'Open Cases', value: stats?.open_cases || 0, icon: <FaFolderOpen />, color: 'bg-orange-500' },
        { label: 'Jailed Subjects', value: stats?.jailed_count || 0, icon: <FaGavel />, color: 'bg-red-600' },
        { label: 'Closed Cases', value: stats?.closed_cases || 0, icon: <FaCheckDouble />, color: 'bg-emerald-500' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cardData.map((card, index) => (
                <div key={index} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5">
                    <div className={`${card.color} p-4 rounded-2xl text-white text-2xl shadow-lg`}>
                        {card.icon}
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{card.label}</p>
                        <h3 className="text-3xl font-black text-gray-800">{card.value}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OfficerDashboard;