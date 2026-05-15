'use client'
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TypingBarChart = ({ data, title }) => {
  return (
    <div className="bg-black p-4 rounded-xl border border-gray-700 h-[400px] w-full">
      <h3 className="text-white mb-4 text-center font-bold">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#374151"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            label={{
              value: "WPM",
              angle: -90,
              position: "insideLeft",
              fill: "#9CA3AF",
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid #374151",
              borderRadius: "8px",
            }}
            itemStyle={{ fontSize: "12px" }}
          />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />

          {/* Gross Speed Bar */}
          <Bar
            dataKey="gross"
            fill="#3B82F6"
            name="Gross WPM"
            radius={[4, 4, 0, 0]}
          />

          {/* Net Speed Bar */}
          <Bar
            dataKey="net"
            fill="#10B981"
            name="Net WPM"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TypingBarChart;
