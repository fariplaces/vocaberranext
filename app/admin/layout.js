import AuthCheck from "@/components/AuthCheck";
import React from "react";

const AdminLayout = ({ children }) => {
  return <AuthCheck>{children}</AuthCheck>;
};

export default AdminLayout;
