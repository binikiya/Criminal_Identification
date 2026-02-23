import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";

import OfficerLayout from "./layouts/OfficerLayout";
import OfficerDashboard from "./pages/officer/Dashboard";

import InvestigatorLayout from "./layouts/InvestigatorLayout";
import InvestigatorDashboard from "./pages/investigator/Dashboard";

import GuestLayout from "./layouts/GuestLayout";
import GuestDashboard from "./pages/guest/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['officer']} />}>
          <Route element={<OfficerLayout />}>
            <Route path="/officer/dashboard" element={<OfficerDashboard />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['investigator']} />}>
          <Route element={<InvestigatorLayout />}>
            <Route path="/investigator/dashboard" element={<InvestigatorDashboard />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['guest']} />}>
          <Route element={<GuestLayout />}>
            <Route path="/guest/dashboard" element={<GuestDashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
