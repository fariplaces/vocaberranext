'use client'
import { Edit2, Trash2, ListChecks, CheckSquare, Square, Import } from "lucide-react";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

function RenderDefaultTasks({
  selectedIds = [],
  setSelectedIds,
  handleEditClick,
  handleDelClick,
  handleBulkImport
}) {
  const { defaultTasks = [] } = useSelector((state) => state.tasks);

  // --- 1. Selection Logic ---
  const isAllSelected =
    defaultTasks?.length > 0 &&
    selectedIds?.length === defaultTasks?.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      const allIds = defaultTasks.map(task => task.id);
      setSelectedIds(allIds);
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Sort by order number
  const sortedTasks = useMemo(() => {
    return [...defaultTasks].sort((a, b) => a.order - b.order);
  }, [defaultTasks]);

  if (defaultTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-500 border-2 border-dashed border-gray-800 rounded-xl">
        <ListChecks size={48} className="mb-4 opacity-20" />
        <p className="italic text-lg">No master templates found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* --- Bulk Actions Header --- */}
      <div className="flex items-center justify-between bg-gray-900/60 p-4 rounded-xl border border-gray-800 sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSelectAll}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            {isAllSelected ? <CheckSquare size={24} /> : <Square size={24} />}
          </button>
          <span className="text-sm font-medium text-gray-300">
            {selectedIds.length} of {defaultTasks.length} Selected
          </span>
        </div>

        <button
          onClick={handleBulkImport}
          disabled={selectedIds.length === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${selectedIds.length > 0
            ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
            : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
        >
          <Import size={18} />
          Import for Tomorrow
        </button>
      </div>

      {/* --- Task List --- */}
      <div className="grid gap-3">
        {sortedTasks.map((task) => (
          <div
            key={task.id}
            className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${selectedIds.includes(task.id)
              ? "bg-blue-900/10 border-blue-500/50"
              : "bg-gray-900/40 border-gray-800 hover:border-gray-700"
              }`}
          >
            <div className="flex items-center gap-4 flex-1">
              {/* Individual Checkbox */}
              <button
                onClick={() => toggleSelectOne(task.id)}
                className="transition-transform active:scale-90"
              >
                {selectedIds.includes(task.id) ? (
                  <CheckSquare className="text-blue-500" size={22} />
                ) : (
                  <Square className="text-gray-600 group-hover:text-gray-400" size={22} />
                )}
              </button>

              {/* Task Content */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-gray-500">#{task.order}</span>
                  <h3 className="font-semibold text-gray-100">{task.title}</h3>
                </div>
                {task.remarks && (
                  <p className="text-sm text-gray-500 mt-1 italic">{task.remarks}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEditClick(task)}
                className="p-2 hover:bg-blue-500/20 rounded-lg text-blue-400 transition-colors"
                title="Edit Template"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDelClick(task)}
                className="p-2 hover:bg-red-500/20 rounded-lg text-red-500 transition-colors"
                title="Delete Template"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RenderDefaultTasks;