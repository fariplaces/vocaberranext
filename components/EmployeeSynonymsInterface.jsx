import React, { useState } from "react";

function EmployeeSynonymsInterface() {
  // const [word, setWord] = useState("");
  // const [meanings, setMeanings] = useState("");
  const [formData, setFormData] = useState({
    word: "",
    meanings: "",
    relatedWords: "",
    summary: "",
    interaction: "",
    interactionMeaning: "",
    details: "",
    description: "",
    history: "",
    category: "",
    subCategory: "",
    useCase: "",
    synonyms: "",
    antonyms: "",
    gemini: "",
    chatgpt: "",
    idioms: "",
    idiomseffectiveMeaning: "",
  });

  const synonymCategories = [
    {
      title: "Forms",
      items: [
        {
          type: "forms",
          inputs: [
            { label: "1st Form", placeholder: "First Form" },
            { label: "2nd Form", placeholder: "Second Form" },
            { label: "3rd Form", placeholder: "Third Form" },
          ],
        },
        { primary1: "+ Add", secondary: "", categories: [] },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="mb-2">
        {/* <h5 className="text-sm font-bold mb-2">Create a new Vocab Item</h5> */}
        <div className="mb-2">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2 mt-2">
                Interaction
              </label>
              <input
                type="text"
                value={formData.interaction}
                onChange={(e) =>
                  setFormData({ ...formData, interaction: e.target.value })
                }
                placeholder="Writes its Interactions..."
                className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2 mt-2">
                Interaction Meaning
              </label>
              <input
                type="text"
                value={formData.interactionMeaning}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    interactionMeaning: e.target.value,
                  })
                }
                placeholder="Writes its Interaction Meaning..."
                className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="mb-2">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Effective Meanings:
              </label>
              <input
                type="text"
                value={formData.word}
                onChange={(e) =>
                  setFormData({ ...formData, word: e.target.value })
                }
                placeholder="Writes its Effective Meanings..."
                className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Litral Meaning
              </label>
              <input
                type="text"
                value={formData.meanings}
                onChange={(e) =>
                  setFormData({ ...formData, meanings: e.target.value })
                }
                placeholder="Write its Litral Meaning..."
                className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="mb-2">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">
                Related Words
              </label>
              <input
                type="text"
                value={formData.relatedWords}
                onChange={(e) =>
                  setFormData({ ...formData, relatedWords: e.target.value })
                }
                placeholder="Writes its Related Words..."
                className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2 mt-2">
                Summary
              </label>
              <input
                type="text"
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                placeholder="Writes its Summary..."
                className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mb-2 mt-2">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="Writes its Category..."
                  className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Sub Category
                </label>
                <input
                  type="text"
                  value={formData.subCategory}
                  onChange={(e) =>
                    setFormData({ ...formData, subCategory: e.target.value })
                  }
                  placeholder="Write its Sub Category..."
                  className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mb-2">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 mt-2">
                  Details
                </label>
                <textarea
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                  placeholder="Write its Details..."
                  rows={3}
                  className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 mt-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Write its Description..."
                  rows={3}
                  className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2 mt-2">
                History
              </label>
              <textarea
                value={formData.history}
                onChange={(e) =>
                  setFormData({ ...formData, history: e.target.value })
                }
                placeholder="Write its History in Details..."
                rows={5}
                className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2 mt-2">
              Use Case
            </label>
            <textarea
              value={formData.useCase}
              onChange={(e) =>
                setFormData({ ...formData, useCase: e.target.value })
              }
              placeholder="Write its Use Case..."
              rows={5}
              className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {synonymCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="mb-6 border border-gray-700 rounded-lg p-4"
            >
              {/* Heading */}
              <div className="flex justify-between items-center mb-4">
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

              {/* Forms Input Fields */}
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => {
                  if (item.type === "forms") {
                    return (
                      <div key={itemIndex} className="grid grid-cols-3 gap-4">
                        {item.inputs.map((input, idx) => (
                          <div key={idx}>
                            <label className="block text-sm font-medium mb-2">
                              {input.label}
                            </label>
                            <input
                              type="text"
                              placeholder={input.placeholder}
                              className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        ))}
                      </div>
                    );
                  }

                  // Normal items skip "+ Add"
                  if (item.primary1) return null;

                  return (
                    <div
                      key={itemIndex}
                      className="flex items-center space-x-4"
                    >
                      {item.primary && (
                        <button className="px-4 py-2 bg-gray-700 rounded-md text-sm font-medium transition-colors border border-gray-700">
                          {item.primary}
                        </button>
                      )}

                      {item.secondary && (
                        <span className="px-3 py-1 bg-transparent text-white border border-gray-700 rounded-md text-sm">
                          {item.secondary}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2 mt-2">
              Chat GPT Generate
            </label>
            <textarea
              value={formData.chatgpt}
              onChange={(e) =>
                setFormData({ ...formData, chatgpt: e.target.value })
              }
              placeholder="Chat GPT Generate..."
              rows={5}
              className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2 mt-2">
              Gemini Generate
            </label>
            <textarea
              value={formData.gemini}
              onChange={(e) =>
                setFormData({ ...formData, gemini: e.target.value })
              }
              placeholder="Gemini Generate..."
              rows={5}
              className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="border border-gray-700 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-6 relative">
              {/* Left Side */}
              <div className="space-y-4">
                {/* Word */}
                <div>
                  <label className="block text-sm font-medium mb-2">Word</label>
                  <input
                    type="text"
                    value={formData.word}
                    onChange={(e) =>
                      setFormData({ ...formData, word: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Effective Meaning */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Effective Meaning
                  </label>
                  <input
                    type="text"
                    value={formData.effectiveMeaning}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        effectiveMeaning: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Divider Line */}
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-700"></div>

              {/* Right Side */}
              <div className="space-y-4 pl-6">
                {/* Synonyms */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Synonyms
                  </label>
                  <input
                    type="text"
                    value={formData.synonyms}
                    onChange={(e) =>
                      setFormData({ ...formData, synonyms: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Antonyms */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Antonyms
                  </label>
                  <input
                    type="text"
                    value={formData.antonyms}
                    onChange={(e) =>
                      setFormData({ ...formData, antonyms: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Summary</label>
              <textarea
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                rows="4"
                className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
          </div>

          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-800">
                <tr>
                  <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                    Category
                  </th>
                  <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                    Word / Phrase
                  </th>
                  <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                    Effective Meaning
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Idioms Row */}
                <tr>
                  <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                    Idioms
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    <input
                      type="text"
                      value={formData.idioms}
                      onChange={(e) =>
                        setFormData({ ...formData, idioms: e.target.value })
                      }
                      placeholder="Enter Idiom..."
                      className="w-full bg-transparent border border-gray-700 rounded-md px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    <input
                      type="text"
                      value={formData.idiomseffectiveMeaning}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          idiomseffectiveMeaning: e.target.value,
                        })
                      }
                      placeholder="Enter Effective Meaning..."
                      className="w-full bg-transparent border border-gray-700 rounded-md px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                    />
                  </td>
                </tr>

                {/* Pair of Words Row */}
                <tr>
                  <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                    Pair of Words
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    <input
                      type="text"
                      value={formData.pairofwords}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pairofwords: e.target.value,
                        })
                      }
                      placeholder="Enter Pair of Words..."
                      className="w-full bg-transparent border border-gray-700 rounded-md px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    <input
                      type="text"
                      value={formData.effectivemeaningpairofwords}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          effectivemeaningpairofwords: e.target.value,
                        })
                      }
                      placeholder="Enter Effective Meaning..."
                      className="w-full bg-transparent border border-gray-700 rounded-md px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                    />
                  </td>
                </tr>

                {/* Summary Row */}
                <tr>
                  <td
                    colSpan="3"
                    className="border border-gray-700 px-4 py-2 text-sm text-white"
                  >
                    <label className="block text-sm font-medium mb-2">
                      Summary
                    </label>
                    <textarea
                      value={formData.summary}
                      onChange={(e) =>
                        setFormData({ ...formData, summary: e.target.value })
                      }
                      rows="3"
                      placeholder="Write a short summary..."
                      className="w-full bg-transparent border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EmployeeSynonymsInterface;
