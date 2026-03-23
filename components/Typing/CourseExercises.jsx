import { fetchTypings } from "@/store/slices/typingSlice";
import {
  Edit2,
  Trash2,
} from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function CourseExercises({ route, handleEditClick, handleDelClick }) {
  const { typingData } = useSelector((state) => state.typing);
  const dispatch = useDispatch();

  const filteredTypingData = typingData.filter((item) =>
    route === "course"
      ? item.exercise.lesson.lesson !== "TEST"
      : route === "test"
        ? item.exercise.lesson.lesson === "TEST"
        : true
  );

  useEffect(() => {
    dispatch(fetchTypings());
  }, []);

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
                Duration
              </th>
              <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                Accuracy
              </th>
              <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                Gross (WPM)
              </th>
              <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                Net (WPM)
              </th>
              <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Idioms Row */}
            {filteredTypingData.map((item, i) => (
              <tr key={item.id}>
                <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                  {i + 1}
                </td>
                <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                  {item.exercise.exerciseNo} - {item.exercise.title}
                </td>
                <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                  {item.duration.duration}
                </td>
                <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                  {item.accuracy}
                </td>
                <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                  {item.gross}
                </td>
                <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                  {item.net}
                </td>
                <td className=" flex justify-evenly border border-gray-700 px-4 py-2 text-sm text-white">
                  <Edit2 onClick={() => handleEditClick(item)} />
                  <Trash2
                    className="text-red-600"
                    onClick={() => handleDelClick(item)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default CourseExercises;
