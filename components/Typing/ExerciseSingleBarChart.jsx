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

const ExerciseSingleBarChart = ({ data }) => {
  return (
    <div className="bg-black p-4 rounded-xl border border-gray-700 h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#374151"
            vertical={false}
          />
          <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
          <YAxis stroke="#9CA3AF" fontSize={12} />

          {/* Custom Tooltip to show real Gross/Net values */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid #374151",
            }}
            formatter={(value, name, props) => {
              if (name === "Error/Gap")
                return [props.payload.originalGross, "Total Gross"];
              return [value, name];
            }}
          />
          <Legend />

          {/* Bottom part of the bar (Net Speed) */}
          <Bar dataKey="net" stackId="a" fill="#10B981" name="Net WPM" />

          {/* Top part of the bar (Difference to reach Gross) */}
          <Bar
            dataKey="errorGap"
            stackId="a"
            fill="#EF4444"
            name="Gross Gap"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExerciseSingleBarChart;
