'use client'
import React, { useEffect } from "react";
import UserProfile from "../UserProfile";
import { ScrollArea } from "../ui/scroll-area";
import StaticNavigation from "./Navigations/StaticNavigations";
import { usePathname } from "next/navigation";
import DynamicNavigation from "./Navigations/DynamicNavigation";
import { useDispatch, useSelector } from "react-redux";
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
      className={`${sidebarOpen ? "w-64" : "w-16"
        } sticky bg-black border-r border-white/30 h-screen transition-all overflow-x-hidden overflow-y-auto duration-300 flex flex-col`}
    >
      <UserProfile sidebarOpen={sidebarOpen} />
      {baseRoute === "skills" || baseRoute === "revisions" ? <DynamicNavigation sideMenu={sideMenu} sidebarOpen={sidebarOpen} baseRoute={baseRoute} /> : <StaticNavigation sidebarOpen={sidebarOpen} />}
    </ScrollArea>

  );
};

export default SideBar;
