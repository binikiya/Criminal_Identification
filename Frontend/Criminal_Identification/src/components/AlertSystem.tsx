import { useState, useEffect } from 'react';
import { FaBell, FaExclamationTriangle, FaTimes, FaUserSecret } from 'react-icons/fa';

export interface Alert {
    id: string;
    name: string;
    status: string;
    timestamp: string;
    confidence: number;
}

const AlertSystem = ({ newAlert }: { newAlert: Alert | null }) => {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    useEffect(() => {
        if (newAlert) {
            setAlerts(prev => [newAlert, ...prev].slice(0, 5)); // Keep only the last 5
            
            // Auto-play an alert sound (optional)
            const audio = new Audio('/alert-chime.mp3'); 
            audio.play().catch(() => console.log("Audio play blocked by browser"));
        }
    }, [newAlert]);

    const removeAlert = (id: string) => {
        setAlerts(prev => prev.filter(a => a.id !== id));
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 w-80 space-y-3">
            {alerts.map((alert) => (
                <div 
                    key={alert.id} 
                    className={`p-4 rounded-2xl shadow-2xl border-l-4 flex gap-4 animate-bounce-in transition-all ${
                        alert.status.toLowerCase() === 'wanted' 
                        ? 'bg-red-900 text-white border-red-500' 
                        : 'bg-indigo-900 text-white border-indigo-500'
                    }`}
                >
                    <div className="bg-white/20 p-2 rounded-xl h-fit">
                        <FaExclamationTriangle className={alert.status.toLowerCase() === 'wanted' ? 'text-red-400' : 'text-indigo-400'} />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h4 className="text-xs font-black uppercase tracking-widest opacity-70">Security Match</h4>
                            <button onClick={() => removeAlert(alert.id)} className="opacity-50 hover:opacity-100"><FaTimes /></button>
                        </div>
                        <p className="font-bold text-sm mt-1">{alert.name}</p>
                        <p className="text-[10px] font-medium opacity-80 mt-1">
                            Status: <span className="uppercase">{alert.status}</span> • {alert.confidence.toFixed(1)}% Match
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AlertSystem;