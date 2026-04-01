'use client'
import { fetchExercises } from "@/store/actions/typingActions";
import {
  Edit2,
  Trash2,
} from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function RenderExercises({ route, handleEditClick, handleDelClick }) {
  const { exercises } = useSelector((state) => state.typing);
  const dispatch = useDispatch();

  const routedExercises = exercises.filter((item) =>
    route === "exercises"
      ? item.lesson.lesson !== "TEST"
      : route === "tests"
        ? item.lesson.lesson === "TEST"
        : true
  );

  useEffect(() => {
    dispatch(fetchExercises());
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
            {routedExercises.map((item, i) => (
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
export default RenderExercises;
