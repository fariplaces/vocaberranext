import React from "react";
// import TabBar from "@/components/sidebar/TabBar";

const PageLayout = ({ children }) => {
  return (
    <>
      {/* <TabBar
      // notificationOpen={notificationOpen}
      // setNotificationOpen={setNotificationOpen}
      /> */}
      <main className="flex-1 p-6 border border-gray-700 rounded-2xl m-2" >
        {children}
      </main >
    </>

  );
};

export default PageLayout;


