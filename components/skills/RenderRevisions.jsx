// 'use client'
// import React, { useMemo } from 'react'
// import { Edit2, Plus, Trash2 } from "lucide-react";
// import { Checkbox } from '../ui/checkbox';
// import { useSelector } from 'react-redux';
// import ContentTitle from "@/components/ContentTitle";
// import { formatDate } from '@/lib/utils';

// const RenderRevisions = ({ route, handleDelClick, handleEditClick, handleUpdateRevisionClick }) => {
//    const { revisions } = useSelector((state) => state.skill);
//    const categoryId = route;

//    console.log(revisions);
//    // Find the Parent Category or the specific Category
//    const targetCategory = useMemo(() => {
//       if (!revisions || !categoryId) return null;
//       let found = null;
//       const search = (items) => {
//          for (const item of items) {
//             if (item.id === categoryId) { found = item; return; }
//             if (item.categories) search(item.categories);
//             if (item.children) search(item.children);
//          }
//       };
//       search(revisions);
//       return found;
//    }, [revisions, categoryId]);

//    // Helper component to render a single table
//    const TopicTable = ({ title, topics }) => (
//       <div className="mb-10">

//          {title !== "Null" &&
//             <ContentTitle
//                title={title}
//                btnTitle="Null"
//             // Icon={Plus}
//             // handleMethod={handleChange}
//             />
//          }

//          <div className="border border-gray-700 rounded-lg overflow-hidden">
//             <table className="min-w-full border-collapse">
//                <thead className="bg-gray-800">
//                   <tr>
//                      <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white w-16">S No</th>
//                      <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">Topic</th>
//                      <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">Scheduled</th>
//                      <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">Practiced</th>
//                      <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">R-I</th>
//                      <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">R-II</th>
//                      <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">R-III</th>
//                      <th className="border border-gray-700 px-4 py-2 text-center text-sm font-medium text-white">I - II - III</th>
//                      <th className="border border-gray-700 px-4 py-2 text-center text-sm font-medium text-white w-24">Action</th>
//                   </tr>
//                </thead>
//                <tbody>
//                   {revisions.map((revision, i) => (
//                      <tr key={revision.id} className="hover:bg-gray-800/40 transition-colors">
//                         <td className="border border-gray-700 px-4 py-2 text-sm text-white">{i + 1}</td>
//                         <td className="border border-gray-700 px-4 py-2 text-sm text-white font-medium">{revision.topic.title}</td>
//                         <td className="border border-gray-700 px-4 py-2 text-sm text-white text-center">{formatDate(revision.scheduled)}</td>
//                         <td className="border border-gray-700 px-4 py-2 text-sm text-white text-center">{formatDate(revision.practiced)}</td>
//                         <td className="border border-gray-700 px-4 py-2 text-sm text-white text-center">{formatDate(revision.revision1date)}</td>
//                         <td className="border border-gray-700 px-4 py-2 text-sm text-white text-center">{formatDate(revision.revision2date)}</td>
//                         <td className="border border-gray-700 px-4 py-2 text-sm text-white text-center">{formatDate(revision.revision3date)}</td>
//                         <td className="border border-gray-700 px-4 py-2 text-sm text-white">
//                            <div className="flex justify-center gap-6">
//                               <Checkbox
//                                  checked={!!revision.revision1}
//                                  onClick={() =>
//                                     handleUpdateRevisionClick({
//                                        id: revision.id,
//                                        revision1: !revision.revision1,
//                                     })
//                                  }
//                               />
//                               <Checkbox
//                                  checked={!!revision.revision2}
//                                  onClick={() =>
//                                     handleUpdateRevisionClick({
//                                        id: revision.id,
//                                        revision2: !revision.revision2,
//                                     })
//                                  }
//                               />
//                               <Checkbox
//                                  checked={!!revision.revision3}
//                                  onClick={() =>
//                                     handleUpdateRevisionClick({
//                                        id: revision.id,
//                                        revision3: !revision.revision3,
//                                     })
//                                  }
//                               />

//                            </div>
//                         </td>
//                         <td className="border border-gray-700 px-4 py-2 text-sm text-white">
//                            <div className="flex justify-center space-x-3">
//                               <Edit2 onClick={() => handleEditClick(revision)} size={16} className="cursor-pointer hover:text-blue-400" />
//                               <Trash2 onClick={() => handleDelClick(revision)} size={16} className="cursor-pointer text-red-600 hover:text-red-400" />
//                            </div>
//                         </td>
//                      </tr>
//                   ))}
//                </tbody>
//             </table>
//          </div>
//       </div>
//    );

//    if (!targetCategory) return <div className="p-4 text-gray-500">Loading data...</div>;

//    return (
//       <div className="space-y-6">
//          <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-2">
//             {targetCategory.title}
//          </h2>

//          {/* 1. Render direct topics if they exist */}
//          {targetCategory.topics?.length > 0 && (
//             <TopicTable title="Null" topics={targetCategory.topics} />
//          )}

//          {/* 2. Render separate tables for each child category (e.g., Arithmetic Operators) */}
//          {targetCategory.children?.length > 0 ? (
//             targetCategory.children.map((child) => (
//                <TopicTable
//                   key={child.id}
//                   title={child.title}
//                   topics={child.topics || []}
//                />
//             ))
//          ) : (
//             targetCategory.topics?.length === 0 && (
//                <p className="text-gray-500 italic">No topics available in this category.</p>
//             )
//          )}
//       </div>
//    );
// };

// export default RenderRevisions;

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


   // --- Grouping Logic (Optional: If you want to group them by Category Title in the UI) ---
   // const groupedRevisions = useMemo(() => {
   //    return filteredRevisions.reduce((acc, rev) => {
   //       const catTitle = rev.topic?.category?.title || "General";
   //       if (!acc[catTitle]) acc[catTitle] = [];
   //       acc[catTitle].push(rev);
   //       return acc;
   //    }, {});
   // }, [filteredRevisions]);

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
               {/* // <div className="space-y-10">
      //    {Object.entries(groupedRevisions).map(([categoryTitle, items]) => (
                  //       <div key={categoryTitle} className="space-y-4">
                  //          <h2 className="text-xl font-bold text-blue-400 border-b border-gray-800 pb-2">
                  //             {categoryTitle}
                  //          </h2> */}

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