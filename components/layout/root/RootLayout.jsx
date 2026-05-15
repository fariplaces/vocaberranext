"use client";
import React from "react";

function RootLayout({ children }) {
  return (
    <div className="flex w-full">
      <div className={`flex w-full bg-black text-white`}>
        <div className="flex-1 min-h-screen flex flex-col">{children}</div>
      </div>
    </div>
  );
}

export default RootLayout;
