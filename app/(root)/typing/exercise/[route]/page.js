import TypingExercisePage from "@/components/Typing/TypingExercisePage";
import React from "react";

const TypingExercises = async ({ params }) => {
  const { route } = await params;

  return <TypingExercisePage route={route} />;
};

export default TypingExercises;
