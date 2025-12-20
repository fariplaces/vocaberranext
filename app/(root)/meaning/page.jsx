"use client";
import React, { useState } from "react";
import EmployeeSynonymsInterface from "@/components/EmployeeSynonymsInterface";

import BasicEmployeeForm from "@/components/BasicEmployeeForm.jsx";
import TenseTabSection from "@/components/TenseTabSection";
import LoginPage from "@/components/Login";
import WordListDisplay from "@/components/vocaberra/WordListDisplay";
import ContentTitle from "@/components/ContentTitle";
import { Plus } from "lucide-react";
import CreateWordPopup from "@/components/vocaberra/Popup";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = () => {
    setIsOpen(!isOpen);
    console.log("clicked");
  };
  return (
    <>
      <ContentTitle
        title="VocabErra"
        btnTitle="Add Word"
        Icon={Plus}
        handleMethod={handleChange}
      />
      <EmployeeSynonymsInterface />;
    </>
  );
};

export default HomePage;
