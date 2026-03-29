"use client";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
   PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
   BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

const COLORS = ["#3b82f6", "#1e293b"]; // Blue (Achieved), Dark Gray (Pending)

const TaskStats = () => {
   const { tasks } = useSelector((state) => state.tasks);

   // Helper to normalize dates to midnight
   const getDayBounds = (offset = 0) => {
      const d = new Date();
      d.setDate(d.getDate() + offset);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
   };

   const stats = useMemo(() => {
      const now = new Date();
      const today = getDayBounds(0);
      const yesterday = getDayBounds(-1);
      const tomorrow = getDayBounds(1);

      // 1. Pie Chart Data Logic
      const getPieData = (targetDate) => {
         const dayTasks = tasks.filter(t => t.date && new Date(t.date).setHours(0, 0, 0, 0) === targetDate);
         const achieved = dayTasks.filter(t => t.status).length;
         return [
            { name: "Achieved", value: achieved },
            { name: "Pending", value: dayTasks.length - achieved }
         ];
      };

      // 2. Weekly Bar Chart (Last 7 Days)
      const weeklyData = [];
      for (let i = 6; i >= 0; i--) {
         const d = new Date();
         d.setDate(d.getDate() - i);
         const dayStr = d.toLocaleDateString('en-US', { weekday: 'short' });
         const dayTime = d.setHours(0, 0, 0, 0);

         const dayTasks = tasks.filter(t => t.date && new Date(t.date).setHours(0, 0, 0, 0) === dayTime);
         weeklyData.push({
            day: dayStr,
            planned: dayTasks.length,
            achieved: dayTasks.filter(t => t.status).length
         });
      }

      // 3. Last 4 Weeks
      const monthlyData = [];
      for (let i = 3; i >= 0; i--) {
         const end = new Date();
         end.setDate(end.getDate() - (i * 7));
         const start = new Date(end);
         start.setDate(start.getDate() - 7);

         const periodTasks = tasks.filter(t => {
            const dt = new Date(t.date).getTime();
            return dt >= start.getTime() && dt <= end.getTime();
         });

         monthlyData.push({
            week: `W${4 - i}`,
            planned: periodTasks.length,
            achieved: periodTasks.filter(t => t.status).length
         });
      }

      return {
         yesterday: getPieData(yesterday),
         today: getPieData(today),
         tomorrow: getPieData(tomorrow),
         weekly: weeklyData,
         monthly: monthlyData
      };
   }, [tasks]);

   const RenderPie = ({ title, data }) => (
      <div className="flex flex-col items-center bg-gray-900/40 p-4 rounded-xl border border-gray-800">
         <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-tighter">{title}</h3>
         <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                  <Pie data={data} innerRadius={35} outerRadius={55} paddingAngle={5} dataKey="value">
                     {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                     ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '8px', fontSize: '12px' }} />
               </PieChart>
            </ResponsiveContainer>
         </div>
         <p className="text-xs text-blue-400 font-mono">{data[0].value} / {data[0].value + data[1].value} Done</p>
      </div>
   );

   return (
      <div className="space-y-6 p-4">
         {/* Daily Section */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RenderPie title="Yesterday" data={stats.yesterday} />
            <RenderPie title="Today" data={stats.today} />
            <RenderPie title="Tomorrow" data={stats.tomorrow} />
         </div>

         {/* Weekly Bar Chart */}
         <div className="bg-gray-900/40 p-6 rounded-xl border border-gray-800">
            <h3 className="text-lg font-bold text-blue-400 mb-6">Weekly Performance</h3>
            <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.weekly}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                     <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                     <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                     <Tooltip cursor={{ fill: '#1e293b' }} contentStyle={{ backgroundColor: '#000', border: '1px solid #374151' }} />
                     <Legend verticalAlign="top" align="right" iconType="circle" />
                     <Bar dataKey="planned" fill="#1e293b" radius={[4, 4, 0, 0]} name="Planned" />
                     <Bar dataKey="achieved" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Achieved" />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Last 4 Weeks */}
         <div className="bg-gray-900/40 p-6 rounded-xl border border-gray-800">
            <h3 className="text-lg font-bold text-gray-400 mb-6">Last 4 Weeks Trend</h3>
            <div className="h-48 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.monthly} layout="vertical">
                     <XAxis type="number" hide />
                     <YAxis dataKey="week" type="category" stroke="#9ca3af" fontSize={12} axisLine={false} />
                     <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#000', border: '1px solid #374151' }} />
                     <Bar dataKey="achieved" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>
   );
};

export default TaskStats;