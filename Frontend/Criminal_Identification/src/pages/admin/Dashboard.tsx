import { useEffect, useState } from 'react';
import api from '../../api/api';
import DashboardStats from '../../components/DashboardStats';
import LiveWebcamScanner from '../../components/LiveWebcamScanner';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                api.get('/cases/dashboard-stats/')
                    .then(res => setStats(res.data))
                    .catch(err => console.error("Stats fetch error:", err));
            }
            catch (err) {
                console.error("Failed to fetch dashboard metrics");
            }
            finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="p-10 text-center font-bold text-indigo-600">Loading System Metrics...</div>;

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-black text-gray-800">Operational Command</h1>
                <p className="text-gray-500">Real-time surveillance and case management overview.</p>
            </header>

            {/* The Summary Cards */}
            <DashboardStats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Live Scanner - Takes up more space */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Field Identification</h2>
                    <LiveWebcamScanner />
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">System Alerts</h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-xl">
                            <p className="text-xs font-bold text-orange-600 uppercase">New Case</p>
                            <p className="text-sm text-gray-700">Case #4492 attached to Subject "John Doe"</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;