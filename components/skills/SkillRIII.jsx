'use client'
import React, { useEffect, useMemo } from 'react'
import { Edit2, Trash2 } from "lucide-react";
import { Checkbox } from '../ui/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkills } from '@/store/slices/skillSlice';

const SkillRIII = ({ route }) => {
   const { skills } = useSelector((state) => state.skill);
   const dispatch = useDispatch();
   const categoryId = route;

   useEffect(() => {
      dispatch(fetchSkills());
   }, [dispatch]);

   // Find the Parent Category or the specific Category
   const targetCategory = useMemo(() => {
      if (!skills || !categoryId) return null;
      let found = null;
      const search = (items) => {
         for (const item of items) {
            if (item.id === categoryId) { found = item; return; }
            if (item.categories) search(item.categories);
            if (item.children) search(item.children);
         }
      };
      search(skills);
      return found;
   }, [skills, categoryId]);

   // Helper component to render a single table
   const TopicTable = ({ title, topics }) => (
      <div className="mb-10">
         <h3 className="text-lg font-semibold text-blue-400 mb-3 ml-1">
            {title}
         </h3>
         <div className="border border-gray-700 rounded-lg overflow-hidden">
            <table className="min-w-full border-collapse">
               <thead className="bg-gray-800">
                  <tr>
                     <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white w-16">S No</th>
                     <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">Topic</th>
                     <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">Scheduled</th>
                     <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">Practiced</th>
                     <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">R-I</th>
                     <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">R-II</th>
                     <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-white">R-III</th>
                     <th className="border border-gray-700 px-4 py-2 text-center text-sm font-medium text-white">Revisions (I - II - III)</th>
                     <th className="border border-gray-700 px-4 py-2 text-center text-sm font-medium text-white w-24">Action</th>
                  </tr>
               </thead>
               <tbody>
                  {topics.map((topic, i) => (
                     <tr key={topic.id} className="hover:bg-gray-800/40 transition-colors">
                        <td className="border border-gray-700 px-4 py-2 text-sm text-white">{i + 1}</td>
                        <td className="border border-gray-700 px-4 py-2 text-sm text-white font-medium">{topic.title}</td>
                        <td className="border border-gray-700 px-4 py-2 text-sm text-white text-center"></td>
                        <td className="border border-gray-700 px-4 py-2 text-sm text-white text-center">-</td>
                        <td className="border border-gray-700 px-4 py-2 text-sm text-white text-center">-</td>
                        <td className="border border-gray-700 px-4 py-2 text-sm text-white text-center">-</td>
                        <td className="border border-gray-700 px-4 py-2 text-sm text-white text-center">-</td>
                        <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                           <div className="flex justify-center gap-6">
                              <Checkbox id={`r1-${topic.id}`} />
                              <Checkbox id={`r2-${topic.id}`} />
                              <Checkbox id={`r3-${topic.id}`} />
                           </div>
                        </td>
                        <td className="border border-gray-700 px-4 py-2 text-sm text-white">
                           <div className="flex justify-center space-x-3">
                              <Edit2 size={16} className="cursor-pointer hover:text-blue-400" />
                              <Trash2 size={16} className="cursor-pointer text-red-600 hover:text-red-400" />
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );

   if (!targetCategory) return <div className="p-4 text-gray-500">Loading data...</div>;

   return (
      <div className="space-y-6">
         <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-2">
            {targetCategory.title}
         </h2>

         {/* 1. Render direct topics if they exist */}
         {targetCategory.topics?.length > 0 && (
            <TopicTable title="General Topics" topics={targetCategory.topics} />
         )}

         {/* 2. Render separate tables for each child category (e.g., Arithmetic Operators) */}
         {targetCategory.children?.length > 0 ? (
            targetCategory.children.map((child) => (
               <TopicTable
                  key={child.id}
                  title={child.title}
                  topics={child.topics || []}
               />
            ))
         ) : (
            targetCategory.topics?.length === 0 && (
               <p className="text-gray-500 italic">No topics available in this category.</p>
            )
         )}
      </div>
   );
};

export default SkillRIII;