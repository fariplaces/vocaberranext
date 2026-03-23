import React from "react";
import UserProfile from "../UserProfile";
import NavigationMenu from "../NavigationMenu";
import { ScrollArea } from "../ui/scroll-area";

const SideBar = ({ sidebarOpen }) => {
  return (
    <ScrollArea
      className={`${sidebarOpen ? "w-64" : "w-16"
        } sticky bg-black border-r border-white/30 max-h-screen transition-all overflow-x-hidden overflow-y-auto duration-300 flex flex-col`}
    >
      <UserProfile sidebarOpen={sidebarOpen} />
      <NavigationMenu />
    </ScrollArea>
  );
};

export default SideBar;
