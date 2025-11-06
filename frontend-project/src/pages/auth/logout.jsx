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

      navigate("/login");
    } catch (err) {
      console.error("❌ Error logging out:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Something went wrong while logging out."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleLogout}
        className={` rounded-lg  text-white font-semibold cursor-pointer transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
    </>
  );
}

export default LogoutButton;
