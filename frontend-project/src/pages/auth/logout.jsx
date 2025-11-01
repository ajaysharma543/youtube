import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "../../components/button";
import { logout } from "../../redux/features/authslice";
import authApi from "../../api/userapi";

function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // ✅ error state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setLoading(true);
    setError(""); // clear previous error

    try {
      await authApi.logout();
      console.log("✅ User logged out successfully");

      dispatch(logout());

      // ✅ Redirect to login
      navigate("/login");
    } catch (err) {
      console.error("❌ Error logging out:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong while logging out.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        type="button"
        onClick={handleLogout}
        text={loading ? "Logging out..." : "Logout"}
        loading={loading}
        disabled={loading}
      />

      {/* ✅ Error Message */}
      {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
    </div>
  );
}

export default LogoutButton;
