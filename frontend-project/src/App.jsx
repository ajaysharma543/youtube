import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import DashboardLayout from "./pages/dashboard/dashboard_layout";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import authApi from "./api/userapi";
import SignupStep2 from "./pages/auth/emails";
import Password from "./pages/auth/password";
import Videouploads from "./pages/video/videouploads";
import VideoUpload from "./pages/video/title_Description";
import PublishPage from "./pages/video/publish";
import Profile from "./pages/profile/profile";
import Channel_customize from "./pages/profile/channel_customize";
import ProfileDashboardLayout from "./pages/profile/prifile_dashboard.jsx/dashboard";

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await authApi.getcurrentuser();

        // ✅ If user is logged in and tries to access auth pages, redirect to dashboard
        if (
          location.pathname === "/login" ||
          location.pathname === "/signup" ||
          location.pathname === "/signup-email" ||
          location.pathname === "/set-password"
        ) {
          navigate("/");
        }
      } catch (err) {
        console.error("❌ No active session:", err.response?.data || err.message);

        // ✅ If not logged in and trying to access protected pages, redirect to login
        const protectedRoutes = ["/", "/upload", "/video-details", "/publish", "/profile"];
        if (protectedRoutes.some((path) => location.pathname.startsWith(path))) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [navigate, location.pathname]);

  if (loading) return <div className="text-white text-center">Loading...</div>;

  return (
    <Routes>
      {/* Protected Routes (with DashboardLayout) */}
      <Route
        path="/"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <DashboardLayout>
            <Profile />
          </DashboardLayout>
        }
      />
        <Route
        path="/channel-customize"
        element={
          <ProfileDashboardLayout>
            <Channel_customize />
          </ProfileDashboardLayout>
        }
      />

      {/* Auth Routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup-email" element={<SignupStep2 />} />
      <Route path="/set-password" element={<Password />} />
      <Route path="/login" element={<Login />} />

      {/* Video Upload Routes */}
      <Route path="/upload" element={<Videouploads />} />
      <Route path="/video-details" element={<VideoUpload />} />
      <Route path="/publish/:videoId" element={<PublishPage />} />
      
    </Routes>
  );
}

export default App;
