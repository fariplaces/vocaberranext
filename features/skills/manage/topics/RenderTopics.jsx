"use client";
import { Edit2, Trash2 } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { selectGroupedTopicsTree } from "@/store/selectors/skillSelectors/skillSelectors";
import { EMPTY_ARRAY } from "@/store/constants/sliceConstants";
import {
  openSkillDeletePopup,
  openSkillManagePopup,
} from "@/store/slices/skillSlices/skillFormSlice";
import { SKILL_FORM_DOMAINS } from "@/store/constants/skillsConstants";

function RenderTopics({ domain }) {
  const dispatch = useDispatch();
  const { isInitialLoading, groupedTopics } =
    useSelector(selectGroupedTopicsTree) || EMPTY_ARRAY;

  return (
    <div className="space-y-12 p-4">
      {Object.entries(groupedTopics).map(([skill, parents]) => (
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
                          <th className="border border-gray-700 px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">
                            S No
                          </th>
                          <th className="border border-gray-700 px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">
                            Topic Title
                          </th>
                          <th className="border border-gray-700 px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">
                            Order
                          </th>
                          <th className="border border-gray-700 px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {relatedTopics.map((item, i) => (
                          <tr
                            key={item.id}
                            className="hover:bg-gray-800/50 transition-colors"
                          >
                            <td className="border border-gray-700 px-4 py-2 text-sm text-white w-16">
                              {i + 1}
                            </td>
                            <td className="border border-gray-700 px-4 py-2 text-sm text-white font-medium">
                              {item.title}
                            </td>
                            <td className="border border-gray-700 px-4 py-2 text-sm text-white w-20">
                              {item.order}
                            </td>
                            <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                              <div className="flex justify-center gap-4">
                                <MdOutlineAddToPhotos
                                  size={18}
                                  className="cursor-pointer hover:text-blue-400"
                                  onClick={() =>
                                    dispatch(
                                      openSkillManagePopup({
                                        domain: SKILL_FORM_DOMAINS.REVISIONS,
                                        // editData: item,
                                        defaults: { topicId: item.id },
                                      })
                                    )
                                  }
                                />
                                <Edit2
                                  size={18}
                                  className="cursor-pointer hover:text-blue-400"
                                  onClick={() =>
                                    dispatch(
                                      openSkillManagePopup({
                                        domain,
                                        editData: item,
                                        defaults: {},
                                      })
                                    )
                                  }
                                />
                                <Trash2
                                  size={18}
                                  className="cursor-pointer text-red-600 hover:text-red-400"
                                  onClick={() =>
                                    dispatch(
                                      openSkillDeletePopup({
                                        domain,
                                        item: item,
                                      })
                                    )
                                  }
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
