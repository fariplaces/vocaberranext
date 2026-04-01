// "use client";
import React from "react";
import AuthCheck from "@/components/AuthCheck";
import RootLayout from "@/components/layouts/RootLayout";


const PageLayout = ({ children }) => {
  return (
    <AuthCheck>
      <RootLayout>{children}</RootLayout>
    </AuthCheck >
  );
};

export default PageLayout;


