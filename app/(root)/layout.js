import React from "react";
import RootLayout from "@/components/layouts/RootLayout";

const PageLayout = ({ children }) => {
  return (
      <RootLayout>{children}</RootLayout>
  );
};

export default PageLayout;


