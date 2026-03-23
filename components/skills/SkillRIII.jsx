import React from 'react'
import {
   Edit2,
   Trash2,
} from "lucide-react";

const SkillRIII = ({ route }) => {
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
                        Topic
                     </th>
                     <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                        Scheduled
                     </th>
                     <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                        Practiced
                     </th>
                     <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                        R-I
                     </th>
                     <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                        R-II
                     </th>
                     <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                        R-III
                     </th>
                     <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                        Revisions
                     </th>
                     <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">
                        Action
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {/* Idioms Row */}
                  {/* {filteredTypingData.map((item, i) => ( */}
                  <tr>
                     <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                        {/* {i + 1} */}
                     </td>
                     <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                        {/* {item.exercise.exerciseNo} - {item.exercise.title} */}
                     </td>
                     <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                        {/* {item.duration.duration} */}
                     </td>
                     <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                        {/* {item.accuracy} */}
                     </td>
                     <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                        {/* {item.gross} */}
                     </td>
                     <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                        {/* {item.net} */}
                     </td>
                     <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                        {/* {item.net} */}
                     </td>

                     <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                        <div className="flex justify-evenly">
                           {/* {item.net} */}<Edit2 />
                           {/* {item.net} */}<Edit2 />
                        </div>
                     </td>


                     <td className=" flex justify-evenly border border-gray-700 px-4 py-2 text-sm text-white">
                        <Edit2
                        // onClick={() => handleEditClick(item)}
                        />
                        <Trash2
                           className="text-red-600"
                        // onClick={() => handleDelClick(item)}
                        />
                     </td>
                  </tr>
                  {/* ))} */}
               </tbody>
            </table>
         </div>
      </div>
   )
}

export default SkillRIII
