import { FaHistory, FaDownload, FaShieldAlt, FaKey, FaDatabase } from 'react-icons/fa';

const Settings = () => {
    const logs = [
        { id: 1, user: 'Admin User', action: 'System Login', ip: '192.168.1.45', time: '10 mins ago' },
        { id: 2, user: 'Officer Abebe', action: 'New Criminal Registered', ip: '192.168.1.12', time: '2 hours ago' },
        { id: 3, user: 'Investigator Sara', action: 'Case #4092 Updated', ip: '192.168.1.8', time: '5 hours ago' },
    ];

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tight">Security & Settings</h1>
                <p className="text-gray-500 font-medium">Audit logs and system-wide configurations.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                        <h2 className="text-lg font-black text-gray-800 uppercase flex items-center gap-2">
                            <FaHistory className="text-indigo-600" /> Access Audit Logs
                        </h2>
                        <button className="text-xs font-black text-indigo-600 uppercase hover:underline">Clear History</button>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {logs.map((log) => (
                            <div key={log.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><FaShieldAlt /></div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{log.action}</p>
                                        <p className="text-[10px] text-gray-400 font-medium uppercase">{log.user} • IP: {log.ip}</p>
                                    </div>
                                </div>
                                <p className="text-[10px] font-black text-gray-400 uppercase">{log.time}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Controls */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Database Tools</h3>
                        <button className="w-full mb-3 flex items-center justify-between p-4 bg-indigo-50 text-indigo-700 rounded-2xl font-bold hover:bg-indigo-100 transition-all">
                            <span className="flex items-center gap-2"><FaDownload /> Export Criminals</span>
                            <span className="text-[10px] bg-white px-2 py-1 rounded-md shadow-sm uppercase">CSV</span>
                        </button>
                        <button className="w-full flex items-center justify-between p-4 bg-emerald-50 text-emerald-700 rounded-2xl font-bold hover:bg-emerald-100 transition-all">
                            <span className="flex items-center gap-2"><FaDatabase /> Backup DB</span>
                            <FaKey className="text-xs opacity-50" />
                        </button>
                    </div>

                    <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
                        <h3 className="text-xs font-black text-red-600 uppercase tracking-widest mb-2">Danger Zone</h3>
                        <p className="text-[10px] text-red-400 mb-4 font-medium uppercase">Warning: These actions are irreversible.</p>
                        <button className="w-full py-3 bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-100 hover:bg-red-700 transition-all">
                            Reset Facial Index
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;