'use client'
import { Edit2, Trash2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

function RenderCategories({ route, handleEditClick, handleDelClick }) {
  const { categories } = useSelector((state) => state.skill);

  // --- 1. Grouping Logic with Metadata for Skill AND Parent ---
  const groupedData = categories.reduce((acc, item) => {
    // Determine the active Skill object
    const skillObj = item.parent ? item.parent.skill : item.skill;
    const skillName = skillObj?.title || "Unassigned Skill";
    const skillOrder = skillObj?.order ?? 999;

    // Parent details
    const parentTitle = item.parent ? item.parent.title : "Root Categories";
    // If it's a root category, we give it a very low order (-1) to keep it at the top
    const parentOrder = item.parent ? (item.parent.order ?? 999) : -1;

    if (!acc[skillName]) {
      acc[skillName] = {
        order: skillOrder,
        parents: {}
      };
    }

    if (!acc[skillName].parents[parentTitle]) {
      acc[skillName].parents[parentTitle] = {
        order: parentOrder,
        items: []
      };
    }

    acc[skillName].parents[parentTitle].items.push(item);
    return acc;
  }, {});

  // --- 2. Sorting Skills by Order ---
  const sortedSkills = Object.entries(groupedData).sort((a, b) => a[1].order - b[1].order);

  return (
    <div className="space-y-12">
      {sortedSkills.map(([skill, skillData]) => (
        <div key={skill} className="skill-group border-l-4 border-blue-600 pl-4">
          <h1 className="text-3xl font-bold text-white mb-6 uppercase tracking-wider">
            {skill}
          </h1>

          {/* --- 3. Sort Parent Groups by their Order --- */}
          {Object.entries(skillData.parents)
            .sort((a, b) => a[1].order - b[1].order)
            .map(([parent, parentData]) => (
              <div key={parent} className="parent-group mb-8">
                <h2 className={`text-xl font-semibold mb-4 ${parent === "Root Categories" ? "text-gray-500 italic" : "text-blue-400"}`}>
                  {parent === "Root Categories" ? "Main Categories" : `Parent: ${parent}`}
                </h2>

                <div className="border border-gray-700 rounded-lg overflow-hidden">
                  <table className="min-w-full border-collapse">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white w-16">S No</th>
                        <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">Category Title</th>
                        <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white w-24 text-center">Order</th>
                        <th className="border border-gray-700 px-4 py-2 text-center text-sm font-medium text-white w-32">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* --- 4. Sort the Category items by their Order --- */}
                      {parentData.items
                        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                        .map((item, i) => (
                          <tr key={item.id} className="hover:bg-gray-800/30 transition-colors">
                            <td className="border border-gray-700 px-4 py-2 text-sm text-gray-400">{i + 1}</td>
                            <td className="border border-gray-700 px-4 py-2 text-sm text-white font-medium">{item.title}</td>
                            <td className="border border-gray-700 px-4 py-2 text-sm text-white text-center">{item.order}</td>
                            <td className="border border-gray-700 px-4 py-2">
                              <div className="flex justify-center gap-6">
                                <Edit2
                                  size={18}
                                  className="cursor-pointer text-blue-400 hover:text-blue-300"
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

export default RenderCategories;