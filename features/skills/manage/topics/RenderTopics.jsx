'use client'
import { Edit2, Trash2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { MdOutlineAddToPhotos } from "react-icons/md";


function RenderTopics({ handleEditClick, handleRevisionClick, handleDelClick }) {
  const { topics } = useSelector((state) => state.skill);

  // --- 1. Grouping Logic ---
  const groupedData = topics.reduce((acc, item) => {
    const cat = item.category;
    const parent = cat.parent;

    // Skill Logic: Parent's skill if parent exists, else Category's skill
    const skillTitle = parent ? parent.skill.title : cat.skill.title;
    const parentTitle = parent ? parent.title : "Direct Categories";
    const categoryTitle = cat.title;

    if (!acc[skillTitle]) acc[skillTitle] = {};
    if (!acc[skillTitle][parentTitle]) acc[skillTitle][parentTitle] = {};
    if (!acc[skillTitle][parentTitle][categoryTitle]) acc[skillTitle][parentTitle][categoryTitle] = [];

    acc[skillTitle][parentTitle][categoryTitle].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-12 p-4">
      {Object.entries(groupedData).map(([skill, parents]) => (
        <div key={skill} className="skill-group">
          {/* --- Skill Title --- */}
          <h1 className="text-3xl font-bold text-blue-500 mb-6 border-b border-blue-900 pb-2">
            {skill}
          </h1>

          {Object.entries(parents).map(([parent, categories]) => (
            <div key={parent} className="parent-group ml-4 mb-8">
              {/* --- Sub-heading: Parent Category (if not "Direct") --- */}
              {parent !== "Direct Categories" && (
                <h2 className="text-xl font-semibold text-gray-300 mb-4 flex items-center">
                  <span className="mr-2 text-blue-400">#</span> {parent}
                </h2>
              )}

              {Object.entries(categories).map(([category, relatedTopics]) => (
                <div key={category} className="category-group ml-6 mb-6">
                  {/* --- Sub-sub-heading: Category --- */}
                  <h3 className="text-lg font-medium text-gray-400 mb-3 italic">
                    {category}
                  </h3>

                  {/* --- Table of Related Topics --- */}
                  <div className="border border-gray-700 rounded-lg overflow-hidden">
                    <table className="min-w-full border-collapse">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="border border-gray-700 px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">S No</th>
                          <th className="border border-gray-700 px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">Topic Title</th>
                          <th className="border border-gray-700 px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">Order</th>
                          <th className="border border-gray-700 px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {relatedTopics.map((item, i) => (
                          <tr key={item.id} className="hover:bg-gray-800/50 transition-colors">
                            <td className="border border-gray-700 px-4 py-2 text-sm text-white w-16">{i + 1}</td>
                            <td className="border border-gray-700 px-4 py-2 text-sm text-white font-medium">{item.title}</td>
                            <td className="border border-gray-700 px-4 py-2 text-sm text-white w-20">{item.order}</td>
                            <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                              <div className="flex justify-center gap-4">
                                <MdOutlineAddToPhotos
                                  size={18}
                                  className="cursor-pointer hover:text-blue-400"
                                  onClick={() => handleRevisionClick(item)}
                                />
                                <Edit2
                                  size={18}
                                  className="cursor-pointer hover:text-blue-400"
                                  onClick={() => handleEditClick(item)}
                                />
                                <Trash2
                                  size={18}
                                  className="cursor-pointer text-red-600 hover:text-red-400"
                                  onClick={() => handleDelClick(item)}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default RenderTopics;