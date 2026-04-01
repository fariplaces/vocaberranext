import React from "react";
import UserProfile from "../UserProfile";
import NavigationMenu from "./NavigationMenu";
import { ScrollArea } from "../ui/scroll-area";
import HomeNavigations from "./Navigations/HomeNavigations";
// HomeNavigations

const SideBar = ({ sidebarOpen, module = "HOME" }) => {
  return (
    <ScrollArea
      className={`${sidebarOpen ? "w-64" : "w-16"
        } sticky bg-black border-r border-white/30 h-screen transition-all overflow-x-hidden overflow-y-auto duration-300 flex flex-col`}
    >
      <UserProfile sidebarOpen={sidebarOpen} />
      {module == "HOME" ? <HomeNavigations /> :
        <NavigationMenu />
      }
    </ScrollArea>

  );
};

export default SideBar;
