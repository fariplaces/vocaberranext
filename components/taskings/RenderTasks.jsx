'use client'
import { Edit2, Trash2, CheckCircle2, Circle, Calendar } from "lucide-react";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

function RenderTasks({ route, handleEditClick, handleStatusToggle, handleDelClick }) {
  const { tasks } = useSelector((state) => state.tasks);

  // --- 1. Filtering Logic based on Route ---
  const filteredTasks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return tasks.filter((task) => {
      if (route === "all-tasks") return true;
      if (!task.date) return route === "all-tasks"; // Default tasks only show in "all"

      const taskDate = new Date(task.date);
      taskDate.setHours(0, 0, 0, 0);

      switch (route) {
        case "today-tasks":
          return taskDate.getTime() === today.getTime();
        case "tom-tasks":
          return taskDate.getTime() === tomorrow.getTime();
        case "yes-tasks":
          return taskDate.getTime() === yesterday.getTime();
        default:
          return true;
      }
    });
  }, [tasks, route]);

  // --- 2. Grouping Logic ---
  const groupedTasks = useMemo(() => {
    return filteredTasks.reduce((acc, task) => {
      const dateKey = task.date
        ? new Date(task.date).toLocaleDateString('en-GB', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'
        })
        : "Master Templates";

      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(task);
      return acc;
    }, {});
  }, [filteredTasks]);


  if (filteredTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-500 border-2 border-dashed border-gray-800 rounded-xl">
        <Calendar size={48} className="mb-4 opacity-20" />
        <p className="italic text-lg text-center">
          No tasks found for {route.replace("-", " ")}.<br />
          <span className="text-sm opacity-50">Try creating or importing a task!</span>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12 p-4">
      {Object.entries(groupedTasks)
        // Sort groups: Today's date first, then descending
        .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
        .map(([dateGroup, items]) => (
          <div key={dateGroup} className="date-group animate-in fade-in slide-in-from-bottom-2 duration-500">

            {/* --- Group Header --- */}
            <div className="flex items-center gap-4 mb-6 border-b border-gray-800 pb-3">
              <h2 className="text-2xl font-bold text-blue-400">
                {dateGroup}
              </h2>
              <span className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-xs font-mono">
                {items.length} Tasks
              </span>
            </div>

            <div className="grid gap-4">
              {items.sort((a, b) => a.order - b.order).map((task) => (
                <div
                  key={task.id}
                  className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${task.status
                    ? "bg-green-900/10 border-green-900/30 opacity-75"
                    : "bg-gray-900/40 border-gray-800 hover:border-blue-500/50"
                    }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => handleStatusToggle(task)}
                      className="transition-transform active:scale-90"
                    >
                      {task.status ? (
                        <CheckCircle2 className="text-green-500" size={24} />
                      ) : (
                        <Circle className="text-gray-600 group-hover:text-blue-400" size={24} />
                      )}
                    </button>

                    <div>
                      <h3 className={`font-semibold text-lg ${task.status ? "line-through text-gray-500" : "text-gray-100"}`}>
                        {task.title}
                      </h3>
                      {task.remarks && (
                        <p className="text-sm text-gray-500 mt-1 italic">{task.remarks}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditClick(task)}
                      className="p-2 hover:bg-blue-500/20 rounded-lg text-blue-400 transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelClick(task)}
                      className="p-2 hover:bg-red-500/20 rounded-lg text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default RenderTasks;