'use client'
import {
  Edit2,
  Trash2,
} from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

function RenderTopics({ handleEditClick, handleDelClick }) {
  const { skills } = useSelector((state) => state.skill);

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
export default RenderTopics;
