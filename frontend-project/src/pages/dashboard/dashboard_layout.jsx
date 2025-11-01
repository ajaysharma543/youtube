import React from "react";
import Navbar from "./dashboard_components/navbar";
import Sidebar from "./dashboard_components/slidebar";
import Signup from "../auth/signup";
import { Link } from "react-router-dom";
import LogoutButton from "../auth/logout";
import { useSelector } from "react-redux";

const DashboardLayout = ({ children }) => {
    const { user} = useSelector(
    (state) => state.auth
  );
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
     <Link to="/signup">
     <p>singup</p></Link>
      <h1 className="text-white">{user?.email}</h1>

    <LogoutButton />
              <Navbar />

      <div className="flex flex-1">
                       <Sidebar />



        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
