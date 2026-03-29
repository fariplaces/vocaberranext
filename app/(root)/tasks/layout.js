import React from "react";

const PageLayout = ({ children }) => {
  return (
    <main className="flex-1 p-6 border border-gray-700 rounded-2xl m-2" >
      {children}
    </main >
  );
};

export default PageLayout;


