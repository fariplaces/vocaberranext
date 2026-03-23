"use client";
import React, { useState } from "react";

import ContentTitle from "@/components/ContentTitle";


const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = () => {
    setIsOpen(!isOpen);
    console.log("clicked");
  };
  return (
    <main className="flex-1 p-6 border border-gray-700 rounded-2xl m-2" >

      <ContentTitle
        title="VocabErra"
        btnTitle="Back"
      // Icon={Plus}
      // handleMethod={handleChange}
      />
      {/* <ContentTitle
        title="VocabErra"
        btnTitle="Add Word"
        Icon={Plus}
        handleMethod={handleChange}
      /> */}
      {/* <WordListDisplay /> */}
      {/* <CreateWordPopup isOpen={isOpen} setIsOpen={setIsOpen} /> */}
      {/* <BasicEmployeeForm /> */}
      {/* <TenseTabSection /> */}
      {/* <EmployeeSynonymsInterface />; */}
    </main>
  );
};

export default HomePage;
