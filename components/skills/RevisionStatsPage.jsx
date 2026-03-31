"use client";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { BookOpen, CalendarDays, ClipboardList, CrystalBall } from "lucide-react"; // Imported CrystalBall for forecasting

const COLORS = ["#3b82f6", "#1e293b"]; // Blue for Practiced/Achieved, Dark Slate for Not Practiced/Pending
const FORECAST_COLORS = ["#ec4899", "#1e293b"]; // Pink for Forecasted Pending states to make them visually distinct

const RevisionStats = () => {
   const { revisions = [] } = useSelector((state) => state.skill);

   const stats = useMemo(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayTime = today.getTime();

      // Create a timestamp for tomorrow
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const tomorrowTime = tomorrow.getTime();

      const normalizeDate = (dateStr) => {
         if (!dateStr) return null;
         const d = new Date(dateStr);
         d.setHours(0, 0, 0, 0);
         return d.getTime();
      };

      const tiers = [1, 2, 3, 4, 5];

      // Helper function to calculate scheduled vs practiced for a specific day range
      const getScheduledStats = (label, daysAgoStart, daysAgoEnd) => {
         const startTime = new Date(today);
         startTime.setDate(today.getDate() - daysAgoEnd);

         const endTime = new Date(today);
         endTime.setDate(today.getDate() - daysAgoStart);

         const periodTasks = revisions.filter((item) => {
            const scheduledTime = normalizeDate(item.scheduled);
            return scheduledTime !== null && scheduledTime >= startTime.getTime() && scheduledTime <= endTime.getTime();
         });

         const practiced = periodTasks.filter((item) => item.practiced !== null).length;
         const total = periodTasks.length;

         return {
            label,
            total,
            achieved: practiced,
            pieData: [
               { name: "Practiced", value: practiced },
               { name: "Not Practiced", value: total - practiced }
            ]
         };
      };

      // --- 1. SCHEDULED VS PRACTICED (5 PIE CHARTS) ---
      const scheduledPies = [
         getScheduledStats("Today", 0, 0),
         getScheduledStats("Last 7 Days", 1, 7),
         getScheduledStats("8-14 Days Ago", 8, 14),
         getScheduledStats("15-21 Days Ago", 15, 21),
         getScheduledStats("22-28 Days Ago", 22, 28)
      ];

      // --- 2. DAILY REVISIONS (Evaluating target dates equal to Today) ---
      const daily = tiers.map((tier) => {
         const dayTasks = revisions.filter((item) => {
            if (!item.practiced) return false;
            const revDate = normalizeDate(item[`revision${tier}date`]);
            return revDate === todayTime;
         });

         const achieved = dayTasks.filter((item) => item[`revision${tier}`] === true).length;
         const total = dayTasks.length;

         return {
            tier: `R${tier}`,
            total,
            achieved,
            pieData: [
               { name: "Achieved", value: achieved },
               { name: "Pending", value: total - achieved },
            ],
         };
      });

      // --- 3. OVERALL REVISIONS (Ignoring the day entirely) ---
      const overall = tiers.map((tier) => {
         const applicableTasks = revisions.filter((item) => item.practiced !== null);

         const achieved = applicableTasks.filter((item) => item[`revision${tier}`] === true).length;
         const total = applicableTasks.length;

         return {
            tier: `R${tier}`,
            total,
            achieved,
            pieData: [
               { name: "Achieved", value: achieved },
               { name: "Pending", value: total - achieved },
            ],
         };
      });

      // --- 4. FORECASTING (Tomorrow Only) ---

      // A. Forecasted Scheduled Tasks for tomorrow
      const tomorrowScheduledTasks = revisions.filter((item) => {
         const scheduledTime = normalizeDate(item.scheduled);
         return scheduledTime === tomorrowTime;
      }).length;

      // B. Forecasted Revisions for tomorrow (Mapping through R1 to R5)
      const tomorrowRevisions = tiers.map((tier) => {
         const tomorrowTasks = revisions.filter((item) => {
            if (!item.practiced) return false; // Must be practiced to have active revision dates
            const revDate = normalizeDate(item[`revision${tier}date`]);
            return revDate === tomorrowTime;
         });

         const total = tomorrowTasks.length;

         return {
            tier: `R${tier}`,
            total,
            // Since this is in the future, 0 are achieved right now
            pieData: [
               { name: "Achieved", value: 0 },
               { name: "Pending", value: total },
            ],
         };
      });

      return { daily, overall, scheduledPies, tomorrowScheduledTasks, tomorrowRevisions };
   }, [revisions]);

   const RenderMiniPie = ({ tier, data, total, achieved, isForecast = false }) => (
      <div className={`flex flex-col items-center bg-gray-900/40 p-3 rounded-xl border border-gray-800 transition-all ${isForecast ? 'hover:border-pink-500/30' : 'hover:border-blue-500/30'}`}>
         <div className="text-xs font-bold text-gray-400 mb-1">{tier}</div>
         <div className="h-20 w-20">
            <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                  <Pie data={data} innerRadius={18} outerRadius={30} paddingAngle={2} dataKey="value">
                     {data.map((entry, index) => (
                        <Cell
                           key={`cell-${index}`}
                           fill={isForecast ? FORECAST_COLORS[index] : COLORS[index]}
                           stroke="none"
                        />
                     ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '4px', fontSize: '10px' }} />
               </PieChart>
            </ResponsiveContainer>
         </div>
         <p className={`text-xs ${isForecast ? 'text-pink-400' : 'text-blue-400'} font-mono mt-1`}>
            {achieved}/{total}
         </p>
      </div>
   );

   return (
      <div className="space-y-6 p-4">

         {/* SECTION 1: SCHEDULED VS PRACTICED GRIDS */}
         <div className="bg-gray-900/20 p-5 rounded-2xl border border-gray-800">
            <div className="flex items-center gap-2 mb-4">
               <ClipboardList size={18} className="text-yellow-500" />
               <h3 className="text-lg font-bold text-white">Scheduled Tasks (Practiced Status)</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
               {stats.scheduledPies.map((item) => (
                  <RenderMiniPie
                     key={`sched-${item.label}`}
                     tier={item.label}
                     data={item.pieData}
                     total={item.total}
                     achieved={item.achieved}
                  />
               ))}
            </div>
         </div>

         {/* SECTION 2: DAILY REVISIONS */}
         <div className="bg-gray-900/20 p-5 rounded-2xl border border-gray-800">
            <div className="flex items-center gap-2 mb-4">
               <CalendarDays size={18} className="text-blue-500" />
               <h3 className="text-lg font-bold text-white">Daily Revisions (Today)</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
               {stats.daily.map((item) => (
                  <RenderMiniPie
                     key={`daily-${item.tier}`}
                     tier={item.tier}
                     data={item.pieData}
                     total={item.total}
                     achieved={item.achieved}
                  />
               ))}
            </div>
         </div>

         {/* SECTION 3: OVERALL REVISIONS */}
         <div className="bg-gray-900/20 p-5 rounded-2xl border border-gray-800">
            <div className="flex items-center gap-2 mb-4">
               <BookOpen size={18} className="text-green-500" />
               <h3 className="text-lg font-bold text-white">All-Time Revisions (Overall)</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
               {stats.overall.map((item) => (
                  <RenderMiniPie
                     key={`overall-${item.tier}`}
                     tier={item.tier}
                     data={item.pieData}
                     total={item.total}
                     achieved={item.achieved}
                  />
               ))}
            </div>
         </div>

         {/* SECTION 4: TOMORROW'S FORECAST */}
         <div className="bg-gray-900/20 p-5 rounded-2xl border border-gray-800">
            <div className="flex justify-between items-center mb-4">
               <div className="flex items-center gap-2">
                  <span className="text-pink-500 text-lg">🔮</span>
                  <h3 className="text-lg font-bold text-white">Tomorrow's Forecast</h3>
               </div>
               <div className="bg-pink-500/10 text-pink-500 text-xs px-3 py-1 rounded-full font-mono border border-pink-500/20">
                  {stats.tomorrowScheduledTasks} New Schedules
               </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
               {stats.tomorrowRevisions.map((item) => (
                  <RenderMiniPie
                     key={`tomorrow-${item.tier}`}
                     tier={item.tier}
                     data={item.pieData}
                     total={item.total}
                     achieved={0} // Since tomorrow hasn't happened yet, achieved is strictly 0
                     isForecast={true}
                  />
               ))}
            </div>
         </div>

      </div>
   );
};

export default RevisionStats;