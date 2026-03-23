"use client";
import React, { useEffect } from "react";
import Footer from "@/components/layouts/Footer";
import TopBar from "@/components/layouts/TopBar";
import SideBar from "@/components/sidebar/SideBar";
// import TabBar from "@/components/sidebar/TabBar";
import RightSideBar from "@/components/sidebar/RightSideBar";
import { useState } from "react";
import AuthCheck from "@/components/AuthCheck";
import { useDispatch, useSelector } from "react-redux";
import { fetchSideMenu, toggleSidebar } from "@/store/slices/skillSlice";

const PageLayout = ({ children }) => {
  // const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { sideMenu, sidebarOpen } = useSelector((state) => state.skill);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSideMenu());
  }, [dispatch])

  const handleNotifictionToggle = () => {
    setNotificationOpen(!notificationOpen);
  };
  return (
    <AuthCheck>
      <div className="flex w-full">
        <div className={`fixed ${sidebarOpen ? "w-64" : "w-16"} bg-black h-screen`}>
          <SideBar sidebarOpen={sidebarOpen} />
        </div>

        <div className={`flex w-full ${sidebarOpen ? "ml-64" : "ml-16"} bg-black text-white`}>
          <div className="flex-1 min-h-screen flex flex-col">
            <TopBar handleNotifictionToggle={handleNotifictionToggle} />
            {children}
            <Footer />
          </div>

          <RightSideBar
            notificationOpen={notificationOpen}
            setNotificationOpen={setNotificationOpen}
          />
        </div>
      </div>
    </AuthCheck>
  );
};

export default PageLayout;


