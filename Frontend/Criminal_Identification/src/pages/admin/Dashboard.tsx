import { FaBell } from "react-icons/fa";

function AdminDashboard() {
    return (
        <div className="animate-in fade-in duration-700">
            <header className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-700">Admin Dashboard</h1>
                <div className="flex items-center space-x-4">
                    <FaBell className="text-yellow-500 cursor-pointer" />
                    <img src="/profile.jpg" alt="Profile" className="w-10 h-10 rounded-full border" />
                </div>
            </header>

            <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-700">Total Criminals</h2>
                    <p className="text-3xl font-bold text-indigo-600">120</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-700">Active Cases</h2>
                    <p className="text-3xl font-bold text-indigo-600">45</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-700">Active Officers</h2>
                    <p className="text-3xl font-bold text-indigo-600">45</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-700">Active Investigators</h2>
                    <p className="text-3xl font-bold text-indigo-600">45</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-700">Pending Approvals</h2>
                    <p className="text-3xl font-bold text-indigo-600">45</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-700">Alerts</h2>
                    <p className="text-3xl font-bold text-indigo-600">8</p>
                </div>
            </main>
        </div>
    );
}

export default AdminDashboard;