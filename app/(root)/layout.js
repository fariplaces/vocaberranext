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
  const handleSidebarToggle = () => {
    dispatch(toggleSidebar()); // Global state update
  };
  // const handleSidebarToggle = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };
  return (
    <AuthCheck>
      <div className="flex max-screen bg-black text-white">
        <SideBar sidebarOpen={sidebarOpen} />
        <div className="flex-1 min-h-screen flex flex-col">
          <TopBar
            handleNotifictionToggle={handleNotifictionToggle}
            handleSidebarToggle={handleSidebarToggle}
          />
          {/* <TabBar
            notificationOpen={notificationOpen}
            setNotificationOpen={setNotificationOpen}
          /> */}
          {/* <main className="flex-1 p-6 border border-gray-700 rounded-2xl m-2"> */}
          {children}
          {/* </main> */}
          <Footer />
        </div>
        {/* Notification Panel */}
        <RightSideBar
          notificationOpen={notificationOpen}
          setNotificationOpen={setNotificationOpen}
        />
      </div>
    </AuthCheck>
  );
};

export default PageLayout;


