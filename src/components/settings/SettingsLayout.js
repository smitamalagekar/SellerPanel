import React from "react";
import { Outlet } from "react-router-dom";
import SettingsSidebar from "./SettingsSidebar"; // Import the new horizontal navbar

const SettingsLayout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Horizontal Navbar at the top */}
      <SettingsSidebar />

      {/* Main content area */}
      <div className="flex-1 p-4 md:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;