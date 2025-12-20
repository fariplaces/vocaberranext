import React, { useState } from "react";

const TabBar = () => {
  const headerTabs = [
    "Employees",
    "Employee Performance",
    "Employee Leaves",
    "Addresses",
    "Contacts",
    "Documents",
    "Employee Contracts",
  ];
  const [activeTab, setActiveTab] = useState(headerTabs[0]);
  return (
    <div className="bg-black border border-gray-700 rounded-2xl px-6 py-3  m-2">
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
        {headerTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 text-sm font-medium rounded-2xl whitespace-nowrap border border-gray-700 transition-colors duration-200
          ${
            activeTab === tab
              ? "bg-gray-600 text-white"
              : "text-white hover:bg-gray-800"
          }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabBar;
