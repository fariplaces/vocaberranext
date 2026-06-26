"use client";
import React, { useEffect } from "react";
import UserProfile from "@/components/UserProfile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import DynamicSkillNavigation from "./Navigations/DynamicSkillNavigation";
import { usePathname } from "next/navigation";
import { fetchSideMenu } from "@/store/actions/globalActions";

const SideBar = () => {
  const pathName = usePathname();
  const baseRoute = pathName?.split("/")[1] || "";
  const dispatch = useDispatch();
  const { sideMenu, sidebarOpen } = useSelector((state) => state.global);

  useEffect(() => {
    dispatch(fetchSideMenu());
  }, []);

  return (
    <ScrollArea
      className={`${
        sidebarOpen ? "w-64" : "w-16"
      } sticky bg-black border-r border-white/30 h-screen transition-all overflow-x-hidden overflow-y-auto duration-300 flex flex-col`}
    >
      <UserProfile sidebarOpen={sidebarOpen} />
      <DynamicSkillNavigation
        sidebarOpen={sidebarOpen}
        sideMenu={sideMenu}
        baseRoute={baseRoute}
      />
    </ScrollArea>
  );
};

export default SideBar;
