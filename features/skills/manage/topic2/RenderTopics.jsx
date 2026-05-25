'use client'
import { Edit2, Trash2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { MdOutlineAddToPhotos } from "react-icons/md";

// 🌲 Helper to climb the tree and get all IDs/titles in the hierarchy
const getAncestors = (category) => {
  const ancestors = {
    categoryTitles: [category.title],
    ids: [category.id],
    skillTitle: null,
  };

  let current = category;
  while (current.parent) {
    current = current.parent;
    ancestors.categoryTitles.unshift(current.title); // Build breadcrumb
    ancestors.ids.push(current.id);
  }

  // At the absolute top of the tree sits the skill
  if (current.skill) {
    ancestors.skillTitle = current.skill.title;
    ancestors.ids.push(current.skill.id);
  }

  return ancestors;
};

function RenderTopics({ handleEditClick, handleRevisionClick, handleDelClick, route }) {
  const { topics } = useSelector((state) => state.skill);

  // --- 1. Filtering & Grouping Logic ---
  const groupedData = topics.reduce((acc, item) => {
    if (!item.category) return acc;

    const hierarchy = getAncestors(item.category);

    // 🔥 ROUTE FILTER: If a route is provided, only include topics connected to it
    if (route && !hierarchy.ids.includes(route)) {
      return acc;
    }

    const skillTitle = hierarchy.skillTitle || "Unassigned Skill";

    // Create a readable path for categories (e.g., "Development > Frontend > React")
    const categoryPath = hierarchy.categoryTitles.join(" ➔ ");

    if (!acc[skillTitle]) acc[skillTitle] = {};
    if (!acc[skillTitle][categoryPath]) acc[skillTitle][categoryPath] = [];

    acc[skillTitle][categoryPath].push(item);
    return acc;
  }, {});

  // If after filtering we have nothing to show
  if (Object.keys(groupedData).length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No topics found for the specified route.
      </div>
    );
  }

  return (
    <div className="space-y-12 p-4">
      {Object.entries(groupedData).map(([skill, categoryPaths]) => (
        <div key={skill} className="skill-group">
          {/* --- Skill Title --- */}
          <h1 className="text-3xl font-bold text-blue-500 mb-6 border-b border-blue-900 pb-2">
            {skill}
          </h1>

          {Object.entries(categoryPaths).map(([path, relatedTopics]) => (
            <div key={path} className="category-group ml-4 mb-8">
              {/* --- Hierarchy Breadcrumb Path --- */}
              <h2 className="text-lg font-semibold text-gray-300 mb-4 flex items-center">
                <span className="mr-2 text-blue-400">#</span> {path}
              </h2>

              {/* --- Table of Related Topics --- */}
              <div className="border border-gray-700 rounded-lg overflow-hidden ml-4">
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
  );
}

export default RenderTopics;