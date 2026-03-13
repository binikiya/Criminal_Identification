import React from 'react';
import { FaUserShield, FaFolderOpen, FaGavel, FaCheckCircle } from 'react-icons/fa';

interface StatsProps {
    stats: {
        total_criminals: number;
        jailed_count: number;
        open_cases: number;
        closed_cases: number;
    } | null;
}

const DashboardStats: React.FC<StatsProps> = ({ stats }) => {
    // Data configuration for the cards
    const cardConfigs = [
        {
            label: 'Total Criminals',
            value: stats?.total_criminals ?? 0,
            icon: <FaUserShield />,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-100'
        },
        {
            label: 'Open Cases',
            value: stats?.open_cases ?? 0,
            icon: <FaFolderOpen />,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-100'
        },
        {
            label: 'Jailed Subjects',
            value: stats?.jailed_count ?? 0,
            icon: <FaGavel />,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-100'
        },
        {
            label: 'Cases Closed',
            value: stats?.closed_cases ?? 0,
            icon: <FaCheckCircle />,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
            borderColor: 'border-emerald-100'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {cardConfigs.map((card, index) => (
                <div 
                    key={index} 
                    className={`p-5 rounded-2xl border ${card.borderColor} ${card.bgColor} transition-transform hover:scale-105 duration-200 shadow-sm`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">
                                {card.label}
                            </p>
                            <h3 className="text-3xl font-black text-gray-800">
                                {card.value.toLocaleString()}
                            </h3>
                        </div>
                        <div className={`text-3xl ${card.color} opacity-80`}>
                            {card.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardStats;