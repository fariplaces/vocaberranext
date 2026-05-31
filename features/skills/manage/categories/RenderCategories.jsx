"use client";

import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit2, Trash2 } from "lucide-react";
import { selectRenderFilteredCategories } from "@/store/selectors/skillSelectors/skillSelectors";
// 🌟 Import your actual asynchronous category fetching action creator here
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { fetchCategories } from "@/store/actions/skillActions";

function RenderCategories({ route, domain }) {
  const dispatch = useDispatch();

  // 1. Memoize the selector instance to protect the cache line
  const selectFilteredAndGroupedData = useMemo(
    () => selectRenderFilteredCategories(route),
    [route],
  );

  // 2. Consume data out from your optimized selector engine
  const { sortedSkills, isInitialLoading, pagination, isFetchingMore } =
    useSelector(selectFilteredAndGroupedData);

  // 3. 🌟 IMPLEMENTATION: Initialize the custom hook with the fetch action handler
  const lastElementRef = useInfiniteScroll(
    isInitialLoading || isFetchingMore, // Combined loading block flag
    pagination?.hasNextPage, // Boolean indicator from API response schema
    () => {
      const nextPage = (pagination?.currentPage || 1) + 1;

      // Dispatch your actual asynchronous action layout
      dispatch(fetchCategories({ page: nextPage, domain }));
    },
  );

  // --- Handlers ---
  const handleEditClick = (item) => console.log("Edit item: ", item);
  const handleDelClick = (item) => console.log("Delete item: ", item);

  if (isInitialLoading) {
    return (
      <div className="text-center text-gray-400 py-10 animate-pulse">
        Loading view matrix configurations...
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {sortedSkills.length === 0 ? (
        <div className="text-center text-gray-500 py-10 border border-dashed border-gray-800 rounded-lg">
          No items found for this view.
        </div>
      ) : (
        sortedSkills.map(([skill, skillData]) => (
          <div
            key={skill}
            className="skill-group border-l-4 border-blue-600 pl-4"
          >
            <h1 className="text-3xl font-bold text-white mb-6 uppercase tracking-wider">
              {skill}
            </h1>

            {Object.entries(skillData.parents)
              .sort((a, b) => a[1].order - b[1].order)
              .map(([parent, parentData]) => (
                <div key={parent} className="parent-group mb-8">
                  <h2
                    className={`text-xl font-semibold mb-4 ${parent === "Root Categories" ? "text-gray-500 italic" : "text-blue-400"}`}
                  >
                    {parent === "Root Categories"
                      ? "Main Categories"
                      : `Parent: ${parent}`}
                  </h2>

                  <div className="border border-gray-700 rounded-lg overflow-hidden">
                    <table className="min-w-full border-collapse">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white w-16">
                            S No
                          </th>
                          <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                            Category Title
                          </th>
                          <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white w-24 text-center">
                            Order
                          </th>
                          <th className="border border-gray-700 px-4 py-2 text-center text-sm font-medium text-white w-32">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {parentData.items
                          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                          .map((item, i) => (
                            <tr
                              key={item.id}
                              className="hover:bg-gray-800/30 transition-colors"
                            >
                              <td className="border border-gray-700 px-4 py-2 text-sm text-gray-400">
                                {i + 1}
                              </td>
                              <td className="border border-gray-700 px-4 py-2 text-sm text-white font-medium">
                                {item.title}
                              </td>
                              <td className="border border-gray-700 px-4 py-2 text-sm text-white text-center">
                                {item.order}
                              </td>
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
        ))
      )}

      {/* 🌟 Infinite Scroll Trigger Zone */}
      <div
        ref={lastElementRef} // Hook attaches right here to observe page scrolling boundary crossings
        className="h-16 w-full flex justify-center items-center"
      >
        {isFetchingMore ? (
          <div className="flex items-center space-x-3 text-gray-400 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs font-medium uppercase tracking-widest">
              Syncing Records...
            </span>
          </div>
        ) : !pagination?.hasNextPage && sortedSkills.length > 0 ? (
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent relative">
            <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-black px-4 text-gray-500 text-xs italic">
              End of History
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default RenderCategories;
