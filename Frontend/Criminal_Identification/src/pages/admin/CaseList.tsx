import { useEffect, useState } from 'react';
import { FaSearch, FaFilter, FaGavel, FaExclamationTriangle, FaEye, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../api/api';

const CaseList = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [severityFilter, setSeverityFilter] = useState('');

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const response = await api.get('/cases/cases/');
                setCases(response.data);
            }
            catch (err) {
                console.error("Error fetching cases:", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchCases();
    }, []);

    // Filter Logic
    const filteredCases = cases.filter(item => {
        const matchesSearch = item.case_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === '' || item.status === statusFilter;
        const matchesSeverity = severityFilter === '' || item.severity === severityFilter;
        return matchesSearch && matchesStatus && matchesSeverity;
    });

    const getSeverityBadge = (severity: string) => {
        switch (severity.toLowerCase()) {
            case 'high': return 'bg-red-100 text-red-700 border-red-200';
            case 'medium': return 'bg-orange-100 text-orange-700 border-orange-200';
            default: return 'bg-blue-100 text-blue-700 border-blue-200';
        }
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tight">Case Management Ledger</h1>
                <p className="text-gray-500 font-medium">Monitoring all active and archived criminal proceedings.</p>
            </header>

            {/* Advanced Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="md:col-span-2 relative">
                    <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search Case # or Title..." 
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <select 
                        className="w-full pl-4 pr-10 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none font-bold text-gray-600"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        <option value="open">Open</option>
                        <option value="pending">Pending Court</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
                <div className="relative">
                    <select 
                        className="w-full pl-4 pr-10 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none font-bold text-gray-600"
                        value={severityFilter}
                        onChange={(e) => setSeverityFilter(e.target.value)}
                    >
                        <option value="">All Severities</option>
                        <option value="high">High / Critical</option>
                        <option value="medium">Medium / Felony</option>
                        <option value="low">Low / Misdemeanor</option>
                    </select>
                </div>
            </div>

            {/* Case Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-20 text-center font-bold text-indigo-600">Syncing Case Records...</div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Case Reference</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Incident & Charge</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Severity</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Date Filed</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredCases.map((item) => (
                                <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className="font-mono font-bold text-indigo-600">{item.case_number}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-bold text-gray-800 uppercase text-sm">{item.title}</p>
                                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                                <FaMapMarkerAlt size={10} /> {item.location}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${item.status === 'open' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getSeverityBadge(item.severity)}`}>
                                            {item.severity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs font-bold text-gray-600 flex items-center gap-1">
                                            <FaCalendarAlt className="text-gray-300" /> {item.incident_date}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link 
                                            to={`/admin/criminals/${item.criminal}`} 
                                            className="p-2 bg-gray-100 text-gray-400 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all flex items-center justify-center w-fit"
                                        >
                                            <FaEye />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {!loading && filteredCases.length === 0 && (
                    <div className="p-20 text-center">
                        <FaExclamationTriangle className="mx-auto text-gray-200 mb-4" size={48} />
                        <p className="text-gray-400 font-medium">No records matching those parameters found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CaseList;