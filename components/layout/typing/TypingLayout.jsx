"use client";
import React, { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import RightSideBar from "@/components/layout/skills/RightSideBar";
import { useSelector } from "react-redux";
import Footer from "../Footer";
import TypingSideBar from "./Navigation/TypingSideBar";

const TypingLayout = ({ children }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { sidebarOpen } = useSelector((state) => state.global);

  const handleNotifictionToggle = () => {
    setNotificationOpen(!notificationOpen);
  };

  return (
    <div className="flex w-full">
      <div
        className={`fixed ${sidebarOpen ? "w-64" : "w-16"} bg-black h-screen`}
      >
        <TypingSideBar sidebarOpen={sidebarOpen} />
      </div>
      <div
        className={`flex w-full ${sidebarOpen ? "ml-64" : "ml-16"} bg-black text-white`}
      >
        <div className="flex-1 min-h-screen flex flex-col">
          <TopBar handleNotifictionToggle={handleNotifictionToggle} />
          <main className="flex-1 p-6 border border-gray-700 rounded-2xl m-2">
            {children}
          </main>
          <Footer />
        </div>
        <RightSideBar
          notificationOpen={notificationOpen}
          setNotificationOpen={setNotificationOpen}
        />
      </div>
    </div>
  );
};

export default TypingLayout;
