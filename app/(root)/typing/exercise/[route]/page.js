import TypingPage from "@/components/Typing/TypingPage";
import React from "react";

const Typing = async ({ params }) => {
  const { route } = await params;

  return <TypingPage key={route} route={route} />;
};

export default Typing;
