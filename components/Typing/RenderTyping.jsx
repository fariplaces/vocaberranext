'use client'
import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit2, Trash2 } from "lucide-react";

// Actions & Selectors
import { fetchTypings } from "@/store/actions/typingActions";
import { selectFilteredTypings } from "@/store/selectors/typingSelectors";
import { openManagePopup, openDeletePopup } from "@/store/slices/typingSlices/typingFormSlice";

// Constants
import { TYPING_KEYS } from "@/store/constants/typingConstants";
import { SLICE_NAMES } from "@/store/constants/sliceConstants";

function RenderTyping({ route }) {
  const dispatch = useDispatch();

  // 1. Pull data using our Smart Selector
  const filteredTypings = useSelector((state) => selectFilteredTypings(state, route));

  // 2. Pull Pagination & Loading from the main Typing Slice
  const typingState = useSelector((state) => state[SLICE_NAMES.TYPING]);
  const loading = typingState?.loading;
  const pagination = typingState?.[TYPING_KEYS.TYPING_PAGINATION];

  // --- Infinite Scroll Logic ---
  const observer = useRef();
  const lastElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && pagination?.hasMore && !loading) {
        dispatch(fetchTypings({
          page: (pagination?.currentPage || 1) + 1,
          route
        }));
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, pagination?.hasMore, pagination?.currentPage, route, dispatch]);

  return (
    <div className="space-y-6">
      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <table className="min-w-full border-collapse text-white">
          <thead className="bg-gray-800 text-gray-400">
            <tr>
              <th className="border border-gray-700 px-4 py-3 text-left text-xs uppercase tracking-wider font-semibold">S No</th>
              <th className="border border-gray-700 px-4 py-3 text-left text-xs uppercase tracking-wider font-semibold">Exercise Title</th>
              <th className="border border-gray-700 px-4 py-3 text-left text-xs uppercase tracking-wider font-semibold">Duration</th>
              <th className="border border-gray-700 px-4 py-3 text-left text-xs uppercase tracking-wider font-semibold">Accuracy</th>
              <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                Gross (WPM)
              </th>
              <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                Net (WPM)
              </th>
              <th className="border border-gray-700 px-4 py-3 text-left text-xs uppercase tracking-wider font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredTypings.map((item, i) => (
              <tr key={item.id} className="hover:bg-gray-800/40 transition-colors group">
                <td className="border border-gray-700 px-4 py-12 text-sm text-gray-400">{i + 1}</td>
                <td className="border border-gray-700 px-4 py-2 text-sm font-medium">
                  {item.exercise?.exerciseNo} - {item.exercise?.title}
                </td>
                <td className="border border-gray-700 px-4 py-2 text-sm">{item.duration?.duration}</td>
                <td className="border border-gray-700 px-4 py-2 text-sm text-blue-400 font-semibold">{item.accuracy}%</td>
                <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                  {item.gross}
                </td>
                <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                  {item.net}
                </td>
                <td className="border border-gray-700 px-4 py-2 text-sm">
                  <div className="flex justify-center space-x-4">
                    {/* ✅ Dispatches directly to Form Slice now */}
                    <button
                      onClick={() => dispatch(openManagePopup({ editData: item, route }))}
                      className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                      title="Edit Entry"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => dispatch(openDeletePopup(item))}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete Entry"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Infinite Scroll Trigger Zone */}
      <div ref={lastElementRef} className="h-16 w-full flex justify-center items-center">
        {loading ? (
          <div className="flex items-center space-x-3 text-gray-400 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs font-medium uppercase tracking-widest">Syncing Records...</span>
          </div>
        ) : !pagination?.hasMore && filteredTypings.length > 0 ? (
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

export default RenderTyping;