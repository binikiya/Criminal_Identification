import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaFingerprint, FaGavel, FaHistory, FaCalendarAlt, FaIdCard, FaGlobe, FaChevronLeft } from 'react-icons/fa';
import api from '../../api/api';
import AddCase from './AddCase';

const CriminalProfile = () => {
    const { id } = useParams();
    const [criminal, setCriminal] = useState<any>(null);
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!id) {
                console.error("No ID found in URL parameters");
                return;
            }

            try {
                console.log(`Fetching data for Subject ID: ${id}`);
                const [profileRes, casesRes] = await Promise.all([
                    api.get(`/cases/criminals/${id}/`)
                ]);

                if (profileRes && profileRes.data) {
                    setCriminal(profileRes.data);
                }
                else {
                    console.error("Profile response returned no data");
                }

                if (casesRes && casesRes.data) {
                    setCases(casesRes.data);
                }
            }
            catch (err) {
                console.error("Error loading profile:", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchProfileData();
    }, [id]);

    if (loading) return <div className="p-20 text-center font-bold text-indigo-600 animate-pulse">Decrypting Subject Records...</div>;
    if (!criminal) return <div className="p-20 text-center text-red-500">Subject record not found.</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/admin/criminals" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors">
                    <FaChevronLeft className="text-gray-400" />
                </Link>
                <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Profile: {criminal.random_id}</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT COLUMN: Identity Card */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                        <div className="relative">
                            <img src={criminal.image} alt="Subject"  className="w-full h-80 object-cover border-b-4 border-indigo-600" />
                            <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-lg">
                                Verified Biometric
                            </div>
                        </div>
                        <div className="p-6 text-center">
                            <h2 className="text-2xl font-black text-gray-800 uppercase leading-none">
                                {criminal.first_name} {criminal.last_name}
                            </h2>
                            <p className="text-indigo-600 font-bold text-sm mt-2 tracking-widest uppercase">{criminal.status}</p>
                        </div>
                        <div className="p-6 border-t border-gray-50 grid grid-cols-2 gap-4">
                            <div className="text-center border-r border-gray-100">
                                <p className="text-[10px] font-black text-gray-400 uppercase">Nationality</p>
                                <p className="font-bold text-gray-700">{criminal.nationality}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] font-black text-gray-400 uppercase">Gender</p>
                                <p className="font-bold text-gray-700 capitalize">{criminal.gender}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-indigo-900 text-white p-6 rounded-3xl shadow-xl">
                        <h3 className="flex items-center gap-2 font-black uppercase tracking-wider text-indigo-300 text-xs mb-4">
                            <FaFingerprint /> Biometric Data
                        </h3>
                        <p className="text-xs text-indigo-100 leading-relaxed italic">
                            "Subject facial nodes are indexed and locked. Matching confidence for this subject is currently high across all surveillance nodes."
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-black text-gray-800 uppercase mb-6 flex items-center gap-2">
                            <FaIdCard className="text-indigo-600" /> General Identification
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-gray-50 rounded-xl text-gray-400"><FaCalendarAlt /></div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase">Date of Birth</p>
                                        <p className="font-bold text-gray-800">{criminal.dob || 'Unknown'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-gray-50 rounded-xl text-gray-400"><FaGlobe /></div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase">Primary Crime Category</p>
                                        <p className="font-bold text-gray-800">{criminal.crime_type}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-gray-400 uppercase">Subject Description</p>
                                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl italic">
                                    {criminal.description || "No specific physical descriptors provided for this subject."}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-black text-gray-800 uppercase flex items-center gap-2">
                                <FaHistory className="text-indigo-600" /> Criminal Case History
                            </h3>
                            <Link to={`/admin/criminals/${criminal.id}/add-case`} className="text-xs font-black uppercase text-indigo-600 hover:underline">
                                + Attach New Case
                            </Link>
                        </div>

                        {cases.length > 0 ? (
                            <div className="space-y-4">
                                {cases.map((item: any) => (
                                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-indigo-50 transition-colors border border-transparent hover:border-indigo-100 group">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white rounded-xl shadow-sm group-hover:text-indigo-600"><FaGavel /></div>
                                            <div>
                                                <p className="font-bold text-gray-800">Case #{item.case_number || '4092'}</p>
                                                <p className="text-xs text-gray-500">{item.title || 'Assault & Battery'}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${item.status === 'open' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                                {item.status}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-1">{item.date_created}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                                <p className="text-sm font-medium text-gray-400">No active or closed cases found for this subject.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CriminalProfile;