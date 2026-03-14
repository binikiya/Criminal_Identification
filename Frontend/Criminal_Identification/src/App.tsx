import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/CreateUser";
import CriminalList from "./pages/admin/AdminCriminal";
import ProfilePage from "./pages/admin/AdminProfile";
import AddCriminal from "./pages/AddCriminals";
import CriminalProfile from "./pages/admin/CriminalProfile";
import AddCase from "./pages/admin/AddCase";
import UserList from "./pages/admin/UserList";
import CaseList from "./pages/admin/CaseList";
import Settings from "./pages/admin/Settings";

import OfficerLayout from "./layouts/OfficerLayout";
import OfficerDashboard from "./pages/officer/Dashboard";
import LiveWebcamScanner from "./components/LiveWebcamScanner";

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
            <Route path="/admin/add-user" element={<UserManagement />} />
            <Route path="/admin/criminals" element={<CriminalList />} />
            <Route path="/admin/profile" element={<ProfilePage />} />
            <Route path="/admin/add-criminal" element={<AddCriminal />} />
            <Route path="/admin/criminals/:id" element={<CriminalProfile />} />
            <Route path="/admin/criminals/:criminalId/add-case" element={<AddCase />} />
            <Route path="/admin/officers" element={<UserList />} />
            <Route path="/admin/investigators" element={<UserList />} />
            <Route path="/admin/cases" element={<CaseList />} />
            <Route path="/admin/settings" element={<Settings />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['officer']} />}>
          <Route element={<OfficerLayout />}>
            <Route path="/officer/dashboard" element={<OfficerDashboard />} />
            <Route path="/officer/monitor" element={<LiveWebcamScanner />} />
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
