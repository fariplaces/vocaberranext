"use client";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { BarChart3 } from "lucide-react";

// Individual colors for each specific metric bar
const METRIC_COLORS = [
   "#a855f7", // All Topics in Skill (Purple) -> NEW
   "#6b7280", // Total Revisions Entered (Gray)
   "#eab308", // Scheduled (Yellow)
   "#3b82f6", // Practiced (Blue)
   "#10b981", // R1 (Bright Green)
   "#059669", // R2
   "#047857", // R3
   "#065f46", // R4
   "#0f766e"  // R5 (Dark Teal)
];

const SkillProgress = () => {
   const { skills = [], revisions = [] } = useSelector((state) => state.skill);

   // Helper function to recursively sum topics from categories and their infinite children
   const countTopicsRecursively = (categories = []) => {
      let total = 0;
      categories.forEach((category) => {
         // Add topics length of current category
         if (Array.isArray(category.topics)) {
            total += category.topics.length;
         }
         // If there are subcategories (children), drill down recursively
         if (Array.isArray(category.children) && category.children.length > 0) {
            total += countTopicsRecursively(category.children);
         }
      });
      return total;
   };

   // Calculate stats and generate a separate dataset for EACH skill
   const skillsChartsData = useMemo(() => {
      return skills.map((skill) => {
         // 1. Calculate TRUE total topics using our recursive function
         const trueTotalTopics = countTopicsRecursively(skill.categories || []);

         // 2. Filter revisions belonging to this specific skill
         const skillRevisions = revisions.filter((item) => {
            const matchesBreadcrumb = item.breadcrumb?.skill === skill.title;
            const matchesSkillId = item.topic?.category?.skillId === skill.id;
            return matchesBreadcrumb || matchesSkillId;
         });

         const enteredRevisions = skillRevisions.length;
         const scheduled = skillRevisions.filter((t) => t.scheduled !== null).length;
         const practiced = skillRevisions.filter((t) => t.practiced !== null).length;

         const r1 = skillRevisions.filter((t) => t.revision1 === true).length;
         const r2 = skillRevisions.filter((t) => t.revision2 === true).length;
         const r3 = skillRevisions.filter((t) => t.revision3 === true).length;
         const r4 = skillRevisions.filter((t) => t.revision4 === true).length;
         const r5 = skillRevisions.filter((t) => t.revision5 === true).length;

         // Reshaping data so the metrics become X-axis categories for this skill's chart
         const chartData = [
            { metric: "All", count: trueTotalTopics }, // 👈 New Bar at the beginning
            { metric: "Total", count: enteredRevisions }, // Shifted original 'Total' here
            { metric: "Sched", count: scheduled },
            { metric: "Prac", count: practiced },
            { metric: "R1", count: r1 },
            { metric: "R2", count: r2 },
            { metric: "R3", count: r3 },
            { metric: "R4", count: r4 },
            { metric: "R5", count: r5 },
         ];

         return {
            skillTitle: skill.title,
            data: chartData,
            trueTotalTopics // Keeping reference
         };
      });
   }, [skills, revisions]);

   return (
      <div className="p-4 space-y-6">
         <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={20} className="text-purple-500" />
            <h3 className="text-lg font-bold text-white">Skills Mastery Breakdown</h3>
         </div>

         {/* Grid layout containing a separate card for each skill */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {skillsChartsData.map((skillObj) => (
               <div
                  key={skillObj.skillTitle}
                  className="bg-gray-900/20 p-5 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors"
               >
                  <div className="flex justify-between items-center mb-4">
                     <h4 className="text-md font-bold text-white">{skillObj.skillTitle}</h4>
                     <span className="text-xs text-gray-400 font-mono">
                        Topics in Skill: {skillObj.trueTotalTopics}
                     </span>
                  </div>

                  <div className="h-[220px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                           data={skillObj.data}
                           margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
                        >
                           <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                           <XAxis
                              dataKey="metric"
                              stroke="#6b7280"
                              tick={{ fill: "#9ca3af", fontSize: 11 }}
                           />
                           <YAxis
                              stroke="#6b7280"
                              tick={{ fill: "#9ca3af", fontSize: 11 }}
                              allowDecimals={false}
                           />
                           <Tooltip
                              contentStyle={{
                                 backgroundColor: "#0f172a",
                                 border: "1px solid #374151",
                                 borderRadius: "8px",
                                 fontSize: "12px",
                                 color: "#fff"
                              }}
                              cursor={{ fill: "rgba(255, 255, 255, 0.03)" }}
                              formatter={(value) => [`${value} topics`, 'Count']}
                           />

                           {/* Single Bar component with individual colors per cell */}
                           <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                              {skillObj.data.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={METRIC_COLORS[index]} />
                              ))}
                           </Bar>
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default SkillProgress;
