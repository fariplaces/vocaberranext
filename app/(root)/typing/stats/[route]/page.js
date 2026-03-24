import TypingDashboardPage from "@/components/Typing/TypingDashboardPage";
import React from "react";

const TypingDashboard = async ({ params }) => {
  const { route } = await params;
  return <TypingDashboardPage route={route} />;
};

export default TypingDashboard;
