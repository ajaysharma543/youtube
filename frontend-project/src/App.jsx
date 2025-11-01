import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import DashboardLayout from "./pages/dashboard/dashboard_layout";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import authApi from "./api/userapi";
import LogoutButton from "./pages/auth/logout";
import SignupStep2 from "./pages/auth/email";

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await authApi.getcurrentuser();
        if(res) navigate("/")
      } catch (err) {
        console.error("❌ No active session:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  if (loading) return <div className="text-white text-center">Loading...</div>;

  return (
    <Routes>
      {/* Dashboard always accessible */}
      <Route
        path="/"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />

      <Route path="/signup" element={<Signup />} />
      <Route path="/signup-email" element={< SignupStep2/>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
