"use client";
import React, { useState } from "react";
import EmployeeSynonymsInterface from "@/components/EmployeeSynonymsInterface";

import ContentTitle from "@/components/ContentTitle";
import { Plus } from "lucide-react";

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
