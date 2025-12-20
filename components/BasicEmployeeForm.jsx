import React, { useState } from "react";

export default function EmployeeSynonymsInterface() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState("");

  const synonymCategories = [
    {
      title: "Forms",
      items: [
        {
          primary: "Employees",
          secondary: "Employee Performance",
          categories: ["Employee Leaves", "Addresses", "Contacts", "Documents"],
        },
        { primary1: "+ Add", secondary: "", categories: [] },
      ],
    },

    {
      title: "Synonyms",
      items: [
        {
          primary: "Employees",
          secondary: "Employee Performance",
          categories: ["Employee Leaves", "Addresses", "Contacts", "Documents"],
        },
        { primary1: "+ Add", secondary: "", categories: [] },
      ],
    },
    {
      title: "Antonyms",
      items: [
        {
          primary: "Employees",
          secondary: "Employee Performance",
          categories: ["Employee Leaves", "Addresses", "Contacts", "Documents"],
        },
        { primary1: "+ Add", secondary: "", categories: [] },
      ],
    },

    {
      title: "Joining Words",
      items: [
        {
          primary: "Employees",
          secondary: "Employee Performance",
          categories: ["Employee Leaves", "Addresses", "Contacts", "Documents"],
        },
        { primary1: "+ Add", secondary: "", categories: [] },
      ],
    },
    {
      title: "Idioms",
      items: [
        {
          primary: "Employees",
          secondary: "Employee Performance",
          categories: ["Employee Leaves", "Addresses", "Contacts", "Documents"],
        },
        { primary1: "+ Add", secondary: "", categories: [] },
      ],
    },
    {
      title: "Pair of Words",
      items: [
        {
          primary: "Employees",
          secondary: "Employee Performance",
          categories: ["Employee Leaves", "Addresses", "Contacts", "Documents"],
        },
        { primary1: "+ Add", secondary: "", categories: [] },
      ],
    },
    {
      title: "Tense (Sentences)",
      items: [
        {
          primary: "Indefinite",
          secondary: "Continuous",
          categories: ["Perfect", "Perfect Continuous"],
        },
        // {
        //   primary: "Employees",
        //   secondary: "Employee Performance",
        //   categories: ["Employee Leaves", "Addresses", "Contacts", "Documents"],
        // },
        { primary1: "+ Add", secondary: "", categories: [] },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="mb-2">
        <h5 className="text-sm font-bold mb-2">Create a new Vocab Item</h5>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Word / Phrase:
            </label>
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Enter word or phrase..."
              className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Effective Meanings:
            </label>
            <input
              type="text"
              value={meanings}
              onChange={(e) => setMeanings(e.target.value)}
              placeholder="Write its effective meanings..."
              className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {synonymCategories.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          {/* Headings with Add button aligned to the right */}
          {[
            "Forms",
            "Synonyms",
            "Antonyms",
            "Joining Words",
            "Idioms",
            "Pair of Words",
            "Tense (Sentences)",
          ].includes(category.title) ? (
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-medium">{category.title}</h2>
              {category.items.map(
                (item, index) =>
                  item.primary1 && (
                    <button
                      key={item.id || item.primary1 || index}
                      className="flex items-center space-x-2 px-4 py-2 bg-transparent rounded-md text-sm font-medium transition-colors border border-gray-700"
                    >
                      {item.primary1}
                    </button>
                  )
              )}
            </div>
          ) : (
            <h2 className="text-lg font-medium mb-3">{category.title}</h2>
          )}

          <div className="space-y-3">
            {category.items.map((item, itemIndex) => {
              // Skip "+ Add" from showing again in list
              if (
                [
                  "Forms",
                  "Synonyms",
                  "Antonyms",
                  "Joining Words",
                  "Idioms",
                  "Pair of Words",
                  "Tense (Sentences)",
                ].includes(category.title) &&
                item.primary1
              )
                return null;

              return (
                <div key={itemIndex} className="flex items-center space-x-4">
                  {item.primary && (
                    <button className="px-4 py-2 bg-gray-700 rounded-md text-sm font-medium transition-colors border border-gray-700">
                      {item.primary}
                    </button>
                  )}

                  {item.primary1 && (
                    <button className="flex items-center space-x-2 px-4 py-2 bg-transparent rounded-md text-sm font-medium transition-colors border border-gray-700">
                      {item.primary1}
                    </button>
                  )}

                  {item.secondary && (
                    <span className="px-3 py-1 bg-transparent text-white border border-gray-700 rounded-md text-sm">
                      {item.secondary}
                    </span>
                  )}

                  <div className="flex space-x-2">
                    {item.categories.map((cat, catIndex) => (
                      <span
                        key={catIndex}
                        className="px-3 py-1 bg-transparent text-white border border-gray-700 rounded-md text-sm"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
