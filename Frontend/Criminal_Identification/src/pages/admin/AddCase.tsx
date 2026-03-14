import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { FaGavel, FaRegFileAlt, FaMapMarkerAlt, FaCalendarDay, FaUserTag, FaExclamationCircle, FaSave } from 'react-icons/fa';
import api from '../../api/api';

const AddCase = () => {
    const navigate = useNavigate();
    const { criminalId } = useParams(); // To link directly from a profile
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        case_number: `CASE-${Math.floor(100000 + Math.random() * 900000)}`, // Auto-generated suggestion
        title: '',
        description: '',
        incident_date: new Map().set('now', new Date().toISOString().split('T')[0]).get('now'),
        location: '',
        severity: 'medium',
        status: 'open',
        criminal: criminalId || '', // Foreign Key to the Criminal model
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await api.post('/cases/', formData);
            // Redirect back to the criminal profile if we came from there, else to dashboard
            navigate(criminalId ? `/admin/criminals/${criminalId}` : '/admin/dashboard');
        } catch (err: any) {
            setError("Failed to file case. Ensure all required fields are valid.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <header className="border-b border-gray-100 pb-4">
                <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tight flex items-center gap-3">
                    <FaGavel className="text-indigo-600" /> New Case Filing
                </h1>
                <p className="text-gray-500 font-medium">Documenting legal proceedings for Subject ID: {criminalId || 'Unspecified'}</p>
            </header>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 flex items-center gap-2">
                        <FaExclamationCircle /> {error}
                    </div>
                )}

                {/* Case Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-1">Case Reference #</label>
                        <input 
                            name="case_number" 
                            value={formData.case_number} 
                            onChange={handleChange} 
                            required 
                            className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-mono font-bold text-indigo-600" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-1">Case Title / Charge</label>
                        <input 
                            name="title" 
                            placeholder="e.g., Aggravated Robbery" 
                            onChange={handleChange} 
                            required 
                            className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold" 
                        />
                    </div>
                </div>

                {/* Location & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-1"><FaMapMarkerAlt /> Incident Location</label>
                        <input 
                            name="location" 
                            placeholder="Street, City, District" 
                            onChange={handleChange} 
                            required 
                            className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-1"><FaCalendarDay /> Date of Occurrence</label>
                        <input 
                            type="date" 
                            name="incident_date" 
                            value={formData.incident_date}
                            onChange={handleChange} 
                            required 
                            className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                        />
                    </div>
                </div>

                {/* Status & Severity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-1"><FaUserTag /> Severity Level</label>
                        <select name="severity" onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold">
                            <option value="low">Low (Misdemeanor)</option>
                            <option value="medium">Medium (Felony)</option>
                            <option value="high">High (Critical/Capital)</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-1">Initial Status</label>
                        <select name="status" onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-orange-600">
                            <option value="open">Open / Under Investigation</option>
                            <option value="pending">Pending Court</option>
                            <option value="closed">Closed / Convicted</option>
                        </select>
                    </div>
                </div>

                {/* Narrative Description */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-1"><FaRegFileAlt /> Detailed Narrative</label>
                    <textarea 
                        name="description" 
                        rows={5} 
                        onChange={handleChange} 
                        placeholder="Provide a full report of the incident, evidence collected, and officer observations..." 
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                    ></textarea>
                </div>

                <div className="pt-4 flex gap-4">
                    <button 
                        type="button" 
                        onClick={() => navigate(-1)}
                        className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-2xl font-black uppercase tracking-widest transition-all"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="flex-[2] py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all flex justify-center items-center gap-3"
                    >
                        {loading ? 'Filing Report...' : <><FaSave /> Authorize & File Case</>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCase;