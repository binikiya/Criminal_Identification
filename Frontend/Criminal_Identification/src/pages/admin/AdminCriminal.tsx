import { useEffect, useState } from 'react';
import { FaSearch, FaFilter, FaUserPlus, FaIdCard, FaExclamationTriangle } from 'react-icons/fa';
import api from '../../api/api';
import { Link } from 'react-router-dom';

const CriminalList = () => {
    const [criminals, setCriminals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        fetchCriminals();
    }, []);

    const fetchCriminals = async () => {
        try {
            const response = await api.get('/cases/criminals/');
            setCriminals(response.data);
        }
        catch (err) {
            console.error("Error fetching records", err);
        }
        finally {
            setLoading(false);
        }
    };

    const filteredCriminals = criminals.filter(person => {
        const matchesSearch = (person.first_name + ' ' + person.last_name).toLowerCase().includes(searchTerm.toLowerCase()) ||
                            person.random_id.includes(searchTerm);
        const matchesStatus = statusFilter === '' || person.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'wanted': return 'bg-red-100 text-red-700 border-red-200';
            case 'jailed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'under investigation': return 'bg-orange-100 text-orange-700 border-orange-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tight">Criminal Database</h1>
                    <p className="text-gray-500 font-medium">Manage and review all registered facial profiles.</p>
                </div>
                <Link to="/admin/add-criminal/" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200">
                    <FaUserPlus /> Register New Subject
                </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search by name or Random ID..." 
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <FaFilter className="absolute left-4 top-3.5 text-gray-400" />
                    <select 
                        className="pl-12 pr-10 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none font-medium text-gray-600"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        <option value="wanted">Wanted</option>
                        <option value="jailed">Jailed</option>
                        <option value="under investigation">Under Investigation</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-indigo-600 font-bold">Accessing Secure Records...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCriminals.map((person) => (
                        <div key={person.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="relative h-64 overflow-hidden">
                                <img 
                                    src={person.image || 'https://via.placeholder.com/400'} 
                                    alt={person.first_name} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getStatusColor(person.status)}`}>
                                    {person.status}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-1 text-indigo-600">
                                    <FaIdCard size={14} />
                                    <span className="text-xs font-black tracking-widest uppercase">ID: {person.random_id}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3 uppercase">
                                    {person.first_name} {person.last_name}
                                </h3>
                                <div className="flex flex-col gap-2">
                                    <div className="text-sm text-gray-500 flex items-center justify-between">
                                        <span>Crime Type:</span>
                                        <span className="font-bold text-gray-700">{person.crime_type}</span>
                                    </div>
                                    <Link 
                                        to={`/admin/criminals/${person.id}`}
                                        className="mt-4 block text-center py-2 bg-gray-100 hover:bg-indigo-50 text-indigo-700 rounded-xl font-bold text-sm transition-colors"
                                    >
                                        View Full Profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && filteredCriminals.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <FaExclamationTriangle className="mx-auto text-gray-300 mb-4" size={48} />
                    <p className="text-gray-500 font-medium">No matching criminal records found.</p>
                </div>
            )}
        </div>
    );
};

export default CriminalList;