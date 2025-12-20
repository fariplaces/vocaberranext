import React, { useState } from "react";

export default function TenseTabSection() {
  const [activeTab, setActiveTab] = useState("Present");

  const tenses = ["Present", "Past", "Future"];

  const dummyData = Array(10).fill({ word: "", isEditing: false });

  return (
    <div className="bg-black text-white p-4 m-2 rounded-md border border-gray-700">
      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        {tenses.map((tense) => (
          <button
            key={tense}
            onClick={() => setActiveTab(tense)}
            className={`px-4 py-2 text-sm font-medium rounded-sm border ${
              activeTab === tense
                ? "bg-white text-black"
                : "bg-transparent text-white border-gray-700"
            }`}
          >
            {tense}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-2">
        {dummyData.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 border border-gray-700 px-2 py-1 rounded-sm"
          >
            <input
              type="text"
              placeholder="Enter word or phrase..."
              className="flex-1 px-3 py-1 text-sm bg-transparent  text-white placeholder-gray-400 focus:outline-none"
            />
            <button className="text-white text-sm px-2" title="Info">
              ℹ️
            </button>
            <button className="text-white text-sm border border-gray-500 px-3 py-1 rounded-sm hover:bg-gray-700">
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
