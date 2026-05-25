"use client";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { fetchSkills } from "@/store/actions/skillActions";
import {
  EMPTY_ARRAY,
  FETCH_MORE_PARAMS,
  PAGINATION_KEYS,
} from "@/store/constants/sliceConstants";
import {
  selectAllSkills,
  selectRenderSkills,
} from "@/store/selectors/skillSelectors/skillSelectors";
import { openSkillManagePopup } from "@/store/slices/skillSlices/skillFormSlice";
import { Edit2, Trash2 } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function RenderSkills({ domain }) {
  const dispatch = useDispatch();
  const { skills, isInitialLoading, isFetchingMore, hasMore, pagination } =
    useSelector(selectRenderSkills) || {};

  const lastElementRef = useInfiniteScroll(
    isInitialLoading || isFetchingMore,
    hasMore,
    () =>
      dispatch(
        fetchSkills(
          FETCH_MORE_PARAMS(
            pagination?.[PAGINATION_KEYS.CURRENT_PAGE],
            pagination?.[PAGINATION_KEYS.PER_PAGE],
          ),
        ),
      ),
  );

  return (
    <div className="space-y-6">
      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                S No
              </th>
              <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                Skill Title
              </th>
              <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                Order
              </th>

              <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Idioms Row */}
            {skills.map((item, i) => (
              <tr key={item.id}>
                <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                  {i + 1}
                </td>
                <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                  {item.title}
                </td>
                <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                  {item.order}
                </td>

                <td className=" flex justify-evenly border border-gray-700 px-4 py-2 text-sm text-white">
                  <Edit2
                    onClick={() =>
                      dispatch(
                        openSkillManagePopup({
                          domain,
                          editData: item,
                          defaults: {},
                        }),
                      )
                    }
                  />
                  <Trash2
                    className="text-red-600"
                    onClick={() =>
                      dispatch(openSkillDeletePopup({ domain, item }))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        ref={lastElementRef}
        className="h-16 w-full flex justify-center items-center"
      >
        {isInitialLoading ? (
          <div className="flex items-center space-x-3 text-gray-400 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs font-medium uppercase tracking-widest">
              Syncing Records...
            </span>
          </div>
        ) : !hasMore && skills.length > 0 ? (
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
export default RenderSkills;
