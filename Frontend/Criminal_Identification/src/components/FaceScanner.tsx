import { useState, useRef } from 'react';
import { FaCamera, FaUpload, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import api from '../api/api';

const FaceScanner = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle Image Selection/Capture
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setResult(null);
            setError(null);
        }
    };

    // Send Image to Django Backend
    const handleScan = async () => {
        if (!imageFile) return;

        setLoading(true);
        setError(null);
        setResult(null);

        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            // Pointing to the DRF action we created earlier
            const response = await api.post('/criminals/recognize/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(response.data);
        } catch (err: any) {
            if (err.response && err.response.data) {
                // Display the specific error from our Django view (e.g., "No face detected")
                setError(err.response.data.error || err.response.data.message);
            } else {
                setError('Failed to connect to the recognition server.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaCamera className="text-indigo-600" /> Subject Identification Scanner
            </h2>

            {/* Upload / Camera Area */}
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-indigo-200 rounded-xl bg-indigo-50/50 relative">
                {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-64 h-64 object-cover rounded-lg shadow-md mb-4" />
                ) : (
                    <div className="w-64 h-64 flex flex-col items-center justify-center text-indigo-300 mb-4">
                        <FaUpload size={48} className="mb-2" />
                        <p className="text-sm font-medium">Capture or Upload Photo</p>
                    </div>
                )}

                {/* capture="environment" prompts mobile devices to open the rear camera directly */}
                <input 
                    type="file" 
                    accept="image/*" 
                    capture="environment" 
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="hidden"
                />

                <div className="flex gap-4">
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-white text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition font-medium flex items-center gap-2"
                    >
                        <FaCamera /> Select Image
                    </button>

                    <button 
                        onClick={handleScan}
                        disabled={!imageFile || loading}
                        className={`px-4 py-2 text-white rounded-lg font-medium flex items-center gap-2 transition ${
                            !imageFile || loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                    >
                        {loading ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />}
                        {loading ? 'Analyzing...' : 'Run Scan'}
                    </button>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-start gap-3 border border-red-100">
                    <FaExclamationTriangle className="mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold">Scan Failed</h4>
                        <p className="text-sm">{error}</p>
                    </div>
                </div>
            )}

            {/* Match Result Display */}
            {result && result.criminal && (
                <div className="mt-6 p-6 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-green-800 flex items-center gap-2">
                            <FaCheckCircle /> Match Found
                        </h3>
                        <span className="bg-green-200 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                            Confidence: {result.confidence.toFixed(2)}
                        </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-green-900">
                        <div><span className="font-bold">Name:</span> {result.criminal.first_name} {result.criminal.last_name}</div>
                        <div><span className="font-bold">ID Number:</span> {result.criminal.random_id}</div>
                        <div><span className="font-bold">Status:</span> <span className="uppercase">{result.criminal.status}</span></div>
                        <div><span className="font-bold">Crime Type:</span> {result.criminal.crime_type}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FaceScanner;