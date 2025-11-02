import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import DashboardLayout from "./pages/dashboard/dashboard_layout";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import authApi from "./api/userapi";
import SignupStep2 from "./pages/auth/emails";
import Password from "./pages/auth/password";
import VideoUpload from "./pages/video/videoupload";

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await authApi.getcurrentuser();
        if (
          res &&
          (location.pathname === "/login" ||
            location.pathname === "/signup" ||
            location.pathname === "/signup-email" ||
            location.pathname === "/set-password")
        ) {
          navigate("/");
        }
      } catch (err) {
        console.error("❌ No active session:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [navigate, location.pathname]);

  if (loading) return <div className="text-white text-center">Loading...</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup-email" element={<SignupStep2 />} />
      <Route path="/set-password" element={<Password />} />
      <Route path="/login" element={<Login />} />
      <Route path="/upload" element={<VideoUpload />} />
    </Routes>
  );
}

export default App;
