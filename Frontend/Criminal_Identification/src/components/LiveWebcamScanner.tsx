import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { FaFingerprint, FaSync, FaShieldAlt, FaUserSecret } from 'react-icons/fa';
import api from '../api/api';

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

const LiveWebcamScanner = ({ onMatchFound }: { onMatchFound: (alert: any) => void }) => {
    const webcamRef = useRef<Webcam>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const capture = useCallback(async () => {
        const response = await api.post('/cases/criminals/recognize/', formData);

        const result = response.data;
        if (!webcamRef.current) return;
        
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) return;

        setLoading(true);
        setError(null);

        try {
            // Convert base64 to Blob to send as file
            const blob = await fetch(imageSrc).then(res => res.blob());
            const formData = new FormData();
            formData.append('image', blob, 'capture.jpg');

            const response = await api.post('/criminals/recognize/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(response.data);
        }
        catch (err: any) {
            setError(err.response?.data?.error || "No match found in records.");
            setResult(null);
        }
        finally {
            setLoading(false);
        }
        if (result && result.confidence > 75) { // Threshold for alert
            onMatchFound({
                id: Date.now().toString(),
                name: `${result.criminal.first_name} ${result.criminal.last_name}`,
                status: result.criminal.status,
                confidence: result.confidence,
                timestamp: new Date().toLocaleTimeString()
            });
        }
        setResult(result);
    }, [webcamRef]);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="relative overflow-hidden rounded-3xl bg-black shadow-2xl border-4 border-indigo-500/30">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    className="w-full h-auto"
                />
                
                {/* Scanning Overlay Effect */}
                <div className="absolute inset-0 pointer-events-none border-[20px] border-indigo-500/10">
                    <div className="w-full h-1 bg-indigo-500/50 absolute top-0 animate-scan"></div>
                </div>

                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                    <button
                        onClick={capture}
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold shadow-lg transform active:scale-95 transition-all flex items-center gap-3"
                    >
                        {loading ? <FaSync className="animate-spin" /> : <FaFingerprint size={24} />}
                        {loading ? "Analyzing Frame..." : "Identify Subject"}
                    </button>
                </div>
            </div>

            {/* Results Section */}
            {result && (
                <div className="bg-white p-6 rounded-2xl border-l-8 border-green-500 shadow-sm animate-fade-in">
                    <div className="flex items-center gap-4">
                        <img 
                            src={`http://localhost:8000${result.criminal.image}`} 
                            className="w-20 h-20 rounded-xl object-cover border-2 border-green-100"
                            alt="Database Record"
                        />
                        <div>
                            <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
                                {result.criminal.first_name} {result.criminal.last_name}
                            </h3>
                            <p className="text-indigo-600 font-bold">Match Confidence: {result.confidence.toFixed(2)}%</p>
                            <span className="inline-block mt-1 px-3 py-1 bg-red-100 text-red-700 text-xs font-black rounded-full uppercase">
                                Status: {result.criminal.status}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-red-600 font-medium flex items-center gap-3">
                    <FaUserSecret size={20} /> {error}
                </div>
            )}
        </div>
    );
};

export default LiveWebcamScanner;