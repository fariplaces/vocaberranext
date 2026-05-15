"use client";
import React from "react";
import UserProfile from "@/components/UserProfile";
import { ScrollArea } from "@/components/ui/scroll-area";
import StaticNavigation from "./Navigations/StaticNavigations";
import { useSelector } from "react-redux";

const SideBar = () => {
  const { sidebarOpen } = useSelector((state) => state.global);

  return (
    <ScrollArea
      className={`${
        sidebarOpen ? "w-64" : "w-16"
      } sticky bg-black border-r border-white/30 h-screen transition-all overflow-x-hidden overflow-y-auto duration-300 flex flex-col`}
    >
      <UserProfile sidebarOpen={sidebarOpen} />
      <StaticNavigation sidebarOpen={sidebarOpen} />
    </ScrollArea>
  );
};

export default SideBar;
