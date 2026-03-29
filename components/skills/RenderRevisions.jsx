'use client'
import React, { useMemo } from 'react'
import { Edit2, Trash2 } from "lucide-react";
import { Checkbox } from '../ui/checkbox';
import { useSelector } from 'react-redux';
import { formatDate } from '@/lib/utils';

const RenderRevisions = ({ route, handleDelClick, handleEditClick, handleUpdateRevisionClick }) => {
   const { revisions } = useSelector((state) => state.skill);
   const activeRouteId = route; // The ID from the URL/Route

   // --- Filter Logic ---
   const filteredRevisions = useMemo(() => {
      if (!revisions || !activeRouteId) return [];

      // 1. Handle Status-Based Routes first
      const statusFilters = {
         'scheduled': (rev) => !rev.practiced,
         'pendingri': (rev) => rev.practiced && !rev.revision1,
         'pendingrii': (rev) => rev.revision1 && !rev.revision2,
         'pendingriii': (rev) => rev.revision2 && !rev.revision3,
         'pendingriv': (rev) => rev.revision3 && !rev.revision4,
         'pendingrv': (rev) => rev.revision4 && !rev.revision5,
      };

      // If the route matches a status key, use that specific filter
      if (statusFilters[activeRouteId]) {
         return revisions.filter(statusFilters[activeRouteId]);
      }

      // 2. Handle Hierarchy Filtering (Skill/Category ID)
      return revisions.filter((rev) => {
         const category = rev.topic?.category;

         // Check Skill Level
         const matchSkill = category?.skillId === activeRouteId ||
            category?.parent?.skillId === activeRouteId;

         // Check Category/Parent/Grandparent IDs
         const matchCategory = category?.id === activeRouteId;
         const matchParent = category?.parentId === activeRouteId;
         const matchGrandParent = category?.parent?.parentId === activeRouteId;

         return matchSkill || matchCategory || matchParent || matchGrandParent;
      });
   }, [revisions, activeRouteId]);


   // --- Grouping Logic with Full Hierarchy Breadcrumb ---
   const groupedRevisions = useMemo(() => {
      return filteredRevisions.reduce((acc, rev) => {
         const cat = rev.topic?.category;
         const skill = cat?.skill?.title || cat?.parent?.skill?.title || "";
         const grandparent = cat?.parent?.title || "";
         const currentCat = cat?.title || "General";

         // Build the breadcrumb: Skill > Parent > Category
         // We filter(Boolean) to remove empty strings if a level is missing
         const fullTitle = [skill, grandparent, currentCat]
            .filter(Boolean)
            .join(" > ");

         if (!acc[fullTitle]) acc[fullTitle] = [];
         acc[fullTitle].push(rev);
         return acc;
      }, {});
   }, [filteredRevisions]);



   if (filteredRevisions.length === 0) {
      return <div className="p-4 text-gray-500 italic">No revisions scheduled for this category branch.</div>;
   }

   return (
      <div className="space-y-10">
         {Object.entries(groupedRevisions).map(([fullPath, items]) => (
            <div key={fullPath} className="space-y-4">
               <h2 className="text-sm font-semibold text-blue-400/80 uppercase tracking-widest border-b border-gray-800 pb-2">
                  {fullPath}
               </h2>
               <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900/20">
                  <table className="min-w-full border-collapse">
                     <thead className="bg-gray-800">
                        <tr>
                           <th className="border border-gray-700 px-4 py-2 text-left text-xs font-bold text-gray-400 uppercase w-12">S.No</th>
                           <th className="border border-gray-700 px-4 py-2 text-left text-xs font-bold text-gray-400 uppercase">Topic</th>
                           <th className="border border-gray-700 px-4 py-2 text-center text-xs font-bold text-gray-400 uppercase">Scheduled</th>
                           <th className="border border-gray-700 px-4 py-2 text-center text-xs font-bold text-gray-400 uppercase">Practiced</th>
                           <th className="border border-gray-700 px-4 py-2 text-center text-xs font-bold text-gray-400 uppercase">R-I</th>
                           <th className="border border-gray-700 px-4 py-2 text-center text-xs font-bold text-gray-400 uppercase">R-II</th>
                           <th className="border border-gray-700 px-4 py-2 text-center text-xs font-bold text-gray-400 uppercase">R-III</th>
                           <th className="border border-gray-700 px-4 py-2 text-center text-xs font-bold text-gray-400 uppercase w-24">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {items.map((rev, i) => (
                           <tr key={rev.id} className="hover:bg-gray-800/40 transition-colors">
                              <td className="border border-gray-700 px-4 py-2 text-sm text-gray-500">{i + 1}</td>
                              <td className="border border-gray-700 px-4 py-2 text-sm text-white font-medium">
                                 {rev.topic.title}
                              </td>
                              <td className="border border-gray-700 px-4 py-2 text-sm text-center text-white">
                                 {formatDate(rev.scheduled)}
                              </td>
                              <td className="border border-gray-700 px-4 py-2 text-sm text-center text-white">
                                 {formatDate(rev.practiced)}
                              </td>

                              {/* Revision Checkboxes */}
                              {[1, 2, 3].map((num) => (
                                 <td key={num} className="border border-gray-700 px-4 py-2 text-center">
                                    <div className="flex flex-col items-center gap-1">
                                       <Checkbox
                                          checked={!!rev[`revision${num}`]}
                                          onCheckedChange={() => handleUpdateRevisionClick({
                                             id: rev.id,
                                             [`revision${num}`]: !rev[`revision${num}`]
                                          })}
                                       />
                                       <span className="text-[10px] text-gray-500">
                                          {formatDate(rev[`revision${num}date`])}
                                       </span>
                                    </div>
                                 </td>
                              ))}

                              <td className="border border-gray-700 px-4 py-2">
                                 <div className="flex justify-center gap-4">
                                    <Edit2 onClick={() => handleEditClick(rev)} size={16} className="cursor-pointer hover:text-blue-400 text-gray-500" />
                                    <Trash2 onClick={() => handleDelClick(rev)} size={16} className="cursor-pointer text-red-600 hover:text-red-400" />
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
   );
};

export default RenderRevisions;