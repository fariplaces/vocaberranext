"use client";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import React from "react";
import { Edit2, Trash } from "lucide-react";
import { CgPlayListAdd } from "react-icons/cg";

const ActionMenu = ({
  item,
  currentType,
  allCategories,
  currentParentId,
  onShift,
  onDelete,
  onEdit,
}) => {
  // Prevent moving a category into its own lineage subset
  const validDestinations = allCategories.filter((cat) => cat.id !== item.id);

  return (
    <div
      className="flex items-center gap-2 opacity-0 group-hover/node:opacity-100 transition-opacity"
      onClick={(e) => e.stopPropagation()}
    >
      <select
        onChange={(e) => onShift(item.id, e.target.value, currentType)}
        className="bg-gray-900 text-xs text-gray-300 border border-gray-700 rounded px-2 py-1 cursor-pointer focus:outline-none"
        defaultValue=""
      >
        <option value="" disabled>
          Move Item To...
        </option>
        {currentType === "category" && currentParentId && (
          <option value="root">🔺 Promote to Top Level Parent</option>
        )}
        {validDestinations.map((cat) => (
          <option key={cat.id} value={cat.id}>
            📁 Under: {cat.title}
          </option>
        ))}
      </select>
      {currentType === "topic" && (
        <button
          onClick={() => onEdit(item, currentType)}
          className="opacity-0 group-hover/node:opacity-100 p-1 text-gray-500 hover:text-gray-300 transition-opacity"
        >
          <CgPlayListAdd size={12} />
        </button>
      )}
      {currentType === "category" && (
        <button
          onClick={() => onEdit(item, currentType)}
          className="opacity-0 group-hover/node:opacity-100 p-1 text-gray-500 hover:text-gray-300 transition-opacity"
        >
          <AiOutlineAppstoreAdd size={12} />
        </button>
      )}
      <button
        onClick={() => onEdit(item, currentType)}
        className="opacity-0 group-hover/node:opacity-100 p-1 text-gray-500 hover:text-gray-300 transition-opacity"
      >
        <Edit2 size={12} />
      </button>
      <button
        onClick={() => onDelete(item, currentType)}
        className="p-1 text-gray-500 hover:text-red-400"
      >
        <Trash size={14} />
      </button>
    </div>
  );
};

export default ActionMenu;
