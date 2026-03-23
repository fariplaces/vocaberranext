import React from "react";
import UserProfile from "../UserProfile";
import NavigationMenu from "../NavigationMenu";

const SideBar = ({ sidebarOpen, sideMenu }) => {
  return (
    <div
      className={`${sidebarOpen ? "w-64" : "w-16"
        } bg-black border-r border-white/30 transition-all duration-300 flex flex-col`}
    >
      <UserProfile sidebarOpen={sidebarOpen} />
      <NavigationMenu data={sideMenu} sidebarOpen={sidebarOpen} />
    </div>
  );
};

export default SideBar;
