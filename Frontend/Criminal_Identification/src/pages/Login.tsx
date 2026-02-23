import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserShield, FaLock } from "react-icons/fa";
import { login } from "../api/authService";

function LoginPage() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userJson = localStorage.getItem('user');
        
        if (token && token !== "undefined" && userJson) {
            const user = JSON.parse(userJson);
            const targetRole = user.role;
            let targetPath = "/guest/dashboard";

            if (targetRole === "admin")
                targetPath = "/admin/dashboard";
            if (targetRole === "investigator")
                targetPath = "/investigator/dashboard";
            if (targetRole === "officer")
                targetPath = "/officer/dashboard";

            navigate(targetPath, { replace: true });
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await login(credentials.email, credentials.password);
            const userJson = localStorage.getItem('user');
            const user = userJson ? JSON.parse(userJson) : null;
            const userRole = user?.role;

            if (location.state?.from) {
                navigate(location.state.from.pathname, { replace: true });
            }
            else {
                const targetRole = userRole;
                let targetPath = "/guest/dashboard";

                if (targetRole === "admin")
                    targetPath = "/admin/dashboard";
                if (targetRole === "investigator")
                    targetPath = "/investigator/dashboard";
                if (targetRole === "officer")
                    targetPath = "/officer/dashboard";
                
                navigate(targetPath, { replace: true });
            }
        }
        catch (err) {
            setError("Invalid credentials. Please try again.");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-blue-500 to-indigo-600">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
                <div className="text-center mb-6">
                    <FaUserShield size={50} className="text-indigo-600 mx-auto mb-2" />
                    <h2 className="text-2xl font-bold text-gray-800">Criminal ID System</h2>
                    <p className="text-gray-500">Secure Login Portal</p>
                </div>

                {error && <div className="mb-6 p-4 bg-red-500/10 text-red-500 text-sm rounded-xl border border-red-500/20">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="flex items-center border rounded-md px-3 py-2 mt-1">
                            <FaUserShield className="text-gray-400 mr-2" />
                            <input type="email" className="flex-1 outline-none text-gray-700" placeholder="Enter your email" onChange={(e) => setCredentials({...credentials, email: e.target.value})} required />
                        </div>
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="flex items-center border rounded-md px-3 py-2 mt-1">
                        <FaLock className="text-gray-400 mr-2" />
                        <input type="password" className="flex-1 outline-none text-gray-700" placeholder="Enter your password" onChange={(e) => setCredentials({...credentials, password: e.target.value})} required />
                    </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200">
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <a href="/forgot-password" className="text-indigo-600 hover:underline text-sm">
                    Forgot Password?
                    </a>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;