"use client";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { fetchExercises } from "@/store/actions/typingActions";
import {
  selectExercisePagination,
  selectIsFetchingMoreExercise,
  selectFilteredExercises,
  selectTypingLoading,
} from "@/store/selectors/typingSelectors/typingSelectors";
import {
  openDeletePopup,
  openManagePopup,
} from "@/store/slices/typingSlices/typingFormSlice";
import { Edit2, Trash2 } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function RenderExercises({ route, domain }) {
  const dispatch = useDispatch();

  const filteredExercises = useSelector(selectFilteredExercises);
  const isInitialLoading = useSelector(selectTypingLoading);
  const isFetchingMore = useSelector(selectIsFetchingMoreExercise);
  const pagination = useSelector(selectExercisePagination);

  const lastElementRef = useInfiniteScroll(
    isInitialLoading || isFetchingMore,
    pagination?.hasNextPage,
    () =>
      dispatch(
        fetchExercises({ page: (pagination?.currentPage || 1) + 1, route }),
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
                Exercise Title
              </th>
              <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                Type
              </th>
              <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                Lesson
              </th>
              <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Idioms Row */}
            {filteredExercises.map((item, i) => (
              <tr key={item.id}>
                <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                  {i + 1}
                </td>
                <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                  {item.exerciseNo} - {item.title}
                </td>
                <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                  {item.type.type}
                </td>
                <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                  {item.lesson.lesson}
                </td>
                <td className=" flex justify-evenly border border-gray-700 px-4 py-2 text-sm text-white">
                  <Edit2
                    onClick={() =>
                      dispatch(openManagePopup({ domain, editData: item }))
                    }
                  />
                  <Trash2
                    className="text-red-600"
                    onClick={() => dispatch(openDeletePopup({ domain, item }))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Infinite Scroll Trigger Zone */}
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
        ) : !pagination?.hasNextPage && filteredExercises.length > 0 ? (
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
export default RenderExercises;
