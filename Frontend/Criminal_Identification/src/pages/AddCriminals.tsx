import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { FaUserPlus, FaUpload, FaUser, FaTag, FaInfoCircle, FaCalendarAlt, FaVenusMars, FaCamera, FaChurch, FaBook } from 'react-icons/fa';
import api from '../api/api';

const AddCriminal = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const webcamRef = useRef<Webcam>(null);

    const [loading, setLoading] = useState(false);
    const [imageSource, setImageSource] = useState<'upload' | 'webcam'>('upload');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        crime_type: '',
        nationality: '',
        relegion: '',
        status: 'wanted',
        description: '',
        gender: 'male',
        dob: '',
        education_level: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const captureWebcam = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setPreviewUrl(imageSrc);
            fetch(imageSrc)
                .then(res => res.blob())
                .then(blob => setImageFile(blob));
        }
    }, [webcamRef]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageFile) {
            setError("A face image is required for identification training.");
            return;
        }

        setLoading(true);
        setError(null);

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        data.append('image', imageFile);

        try {
            await api.post('/cases/criminals/', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/admin/criminals');
        }
        catch (err: any) {
            setError(err.response?.data?.message || "Failed to register criminal record.");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tight">Register New Subject</h1>
                    <p className="text-gray-500 font-medium">Add a new profile to the facial recognition database.</p>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 space-y-4">
                    <div className="bg-white p-2 rounded-2xl flex gap-2 border border-gray-100 shadow-sm">
                        <button 
                            type="button"
                            onClick={() => { setImageSource('upload'); setPreviewUrl(null); }}
                            className={`flex-1 py-2 rounded-xl text-xs font-black uppercase transition-all ${imageSource === 'upload' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}
                        >
                            <FaUpload className="inline mr-2" /> Upload File
                        </button>
                        <button 
                            type="button"
                            onClick={() => { setImageSource('webcam'); setPreviewUrl(null); }}
                            className={`flex-1 py-2 rounded-xl text-xs font-black uppercase transition-all ${imageSource === 'webcam' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}
                        >
                            <FaCamera className="inline mr-2" /> Live Capture
                        </button>
                    </div>
                    <div className="relative h-96 bg-gray-900 rounded-3xl overflow-hidden shadow-inner border-4 border-white">
                        {imageSource === 'upload' ? (
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                            >
                                {previewUrl ? (
                                    <img src={previewUrl} className="w-full h-full object-cover" alt="Upload Preview" />
                                ) : (
                                    <div className="text-center text-gray-500">
                                        <FaUpload size={40} className="mx-auto mb-2 opacity-20" />
                                        <p className="text-sm font-bold uppercase">Click to browse</p>
                                    </div>
                                )}
                                <input type="file" ref={fileInputRef} onChange={handleImageChange} hidden accept="image/*" />
                            </div>
                        ) : (
                            <div className="w-full h-full relative">
                                {previewUrl ? (
                                    <div className="relative h-full">
                                        <img src={previewUrl} className="w-full h-full object-cover" alt="Captured" />
                                        <button 
                                            type="button" 
                                            onClick={() => setPreviewUrl(null)}
                                            className="absolute bottom-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg"
                                        >
                                            <FaRetweet />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <Webcam 
                                            ref={webcamRef}
                                            screenshotFormat="image/jpeg"
                                            className="w-full h-full object-cover"
                                        />
                                        <button 
                                            type="button" 
                                            onClick={captureWebcam}
                                            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-indigo-600 px-6 py-3 rounded-full font-black text-xs uppercase shadow-xl hover:bg-indigo-50"
                                        >
                                            Capture Face
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-gray-400 text-center font-medium">Ensure the face is clear and looking directly at the camera for better recognition accuracy.</p>
                </div>

                <div className="lg:col-span-7 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                    {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">{error}</div>}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase text-gray-500 flex items-center gap-2"><FaUser /> First Name</label>
                            <input name="first_name" onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase text-gray-500 flex items-center gap-2"><FaUser /> Middle Name</label>
                            <input name="middle_name" onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase text-gray-500 flex items-center gap-2"><FaUser /> Last Name</label>
                            <input name="last_name" onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase text-gray-500 flex items-center gap-2"><FaUser /> Nationality</label>
                            <input name="nationality" onChange={handleChange} placeholder="e.g. Ethiopian" required className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase text-gray-500 flex items-center gap-2"><FaTag /> Crime Type</label>
                            <input name="crime_type" placeholder="e.g. Robbery, Assault" onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase text-gray-500 flex items-center gap-2"><FaInfoCircle /> Current Status</label>
                            <select name="status" onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 appearance-none font-bold text-gray-700">
                                <option value="wanted">Wanted</option>
                                <option value="jailed">Jailed</option>
                                <option value="under investigation">Under Investigation</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase text-gray-500 flex items-center gap-2"><FaVenusMars /> Gender</label>
                            <select name="gender" onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase text-gray-500 flex items-center gap-2"><FaCalendarAlt /> Date of Birth</label>
                            <input name="dob" type="date" onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase text-gray-500 flex items-center gap-2"><FaChurch /> Religion</label>
                            <input name="relegion" placeholder='e.g. Christian, Muslim' type="text" onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase text-gray-500 flex items-center gap-2"><FaBook /> Education Level</label>
                            <select name="education_level" onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 appearance-none font-bold text-gray-700">
                                <option value="none">None</option>
                                <option value="primary">Primary</option>
                                <option value="secondary">Secondary</option>
                                <option value="college degree">College Degree</option>
                                <option value="postgraduate">Postgraduate</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-black uppercase text-gray-500">Subject Description & History</label>
                        <textarea name="description" rows={4} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Details about the suspect, known aliases, or distinguishing marks..."></textarea>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all flex justify-center items-center gap-3"
                    >
                        {loading ? 'Processing Facial Nodes...' : <><FaUserPlus /> Save to Records</>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCriminal;