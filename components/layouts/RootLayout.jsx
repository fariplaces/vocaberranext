'use client'
import React, { useState } from 'react'
import SideBar from "@/components/sidebar/SideBar";
import TopBar from "@/components/layouts/TopBar";
import RightSideBar from "@/components/sidebar/RightSideBar";
import { useSelector } from 'react-redux';
import Footer from './Footer';

const RootLayout = ({ children }) => {
   const [notificationOpen, setNotificationOpen] = useState(false);
   const { sidebarOpen } = useSelector((state) => state.global);

   const handleNotifictionToggle = () => {
      setNotificationOpen(!notificationOpen);
   };

   return (
      <div className="flex w-full">
         <div className={`fixed ${sidebarOpen ? "w-64" : "w-16"} bg-black h-screen`}>
            <SideBar sidebarOpen={sidebarOpen} />
         </div >
         <div className={`flex w-full ${sidebarOpen ? "ml-64" : "ml-16"} bg-black text-white`}>
            <div className="flex-1 min-h-screen flex flex-col">
               <TopBar handleNotifictionToggle={handleNotifictionToggle} />
               <main className="flex-1 p-6 border border-gray-700 rounded-2xl m-2" >
                  {children}
               </main >
               <Footer />
            </div>
            <RightSideBar
               notificationOpen={notificationOpen}
               setNotificationOpen={setNotificationOpen}
            />
         </div>
      </div >
      //    <div className="flex w-full">
      //       {/* Sidebar */}
      //       <div
      //          className={`
      //    fixed lg:static
      //    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      //    w-64 lg:${sidebarOpen ? "w-64" : "w-16"}
      //    bg-black h-screen transition-all duration-300
      //  `}
      //       >
      //          <SideBar sidebarOpen={sidebarOpen} />
      //       </div>

      //       {/* Main Content */}
      //       <div
      //          className={`
      //    flex w-full bg-black text-white transition-all duration-300
      //    lg:${sidebarOpen ? "ml-64" : "ml-16"}
      //  `}
      //       >
      //          <div className="flex-1 min-h-screen flex flex-col">
      //             <TopBar handleNotifictionToggle={handleNotifictionToggle} />

      //             <main className="flex-1 p-6 border border-gray-700 rounded-2xl m-2">
      //                {children}
      //             </main>

      //             <Footer />
      //          </div>

      //          <RightSideBar
      //             notificationOpen={notificationOpen}
      //             setNotificationOpen={setNotificationOpen}
      //          />
      //       </div>
      //    </div>
   )
}

export default RootLayout
