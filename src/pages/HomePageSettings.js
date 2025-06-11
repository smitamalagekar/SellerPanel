import React from "react";
import { Outlet } from "react-router-dom";
import SettingsSidebar from "../components/settings/SettingsSidebar";

function HomePageSettings() {
  return (
    <div className="flex">
      <SettingsSidebar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default HomePageSettings;