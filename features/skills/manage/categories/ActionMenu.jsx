"use client";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import React from "react";
import { Edit2, Trash } from "lucide-react";
import { CgPlayListAdd } from "react-icons/cg";
import { MdOutlinePostAdd } from "react-icons/md";
import { IoMdEye } from "react-icons/io";

const ActionMenu = ({
  item,
  currentType,
  allCategories,
  onAdd,
  currentParentId,
  onShift,
  onDelete,
  onEdit,
  filterNotesByTopic,
}) => {
  // Prevent moving a category into its own lineage subset
  const validDestinations = allCategories.filter((cat) => cat.id !== item.id);

  console.log("Notes getting", item.title, item.notes);

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
      {/* <button
          onClick={() => onEdit(item, currentType)}
          className="opacity-0 group-hover/node:opacity-100 p-1 text-gray-500 hover:text-gray-300 transition-opacity"
        >
          <CgPlayListAdd size={12} />
        </button> */}
      {currentType === "topic" && (
        <>
          <div className="relative group/flag inline-block">
            <button
              className="opacity-0 group-hover/node:opacity-100 p-1 text-gray-500 hover:text-gray-300 transition-opacity"
              onClick={() => onEdit(item, currentType)}
            >
              <CgPlayListAdd size={12} />
            </button>

            <span className="absolute left-1/2 -translate-x-1/2 -top-5 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-[8px] text-white opacity-0 transition-opacity duration-200 group-hover/flag:opacity-100 font-arial">
              Add Revision
            </span>
          </div>
        </>
      )}
      {/* <button
          onClick={() =>
            onAdd("sub", { parentId: item.id, skillId: item.skillId })
          }
          className="opacity-0 group-hover/node:opacity-100 p-1 text-gray-500 hover:text-gray-300 transition-opacity"
        >
          <AiOutlineAppstoreAdd size={12} />
        </button> */}
      {currentType === "category" && (
        <>
          <div className="relative group/flag inline-block">
            <button
              className="opacity-0 group-hover/node:opacity-100 p-1 text-gray-500 hover:text-gray-300 transition-opacity"
              onClick={() => onAdd("topic", { categoryId: item.id })}
            >
              <MdOutlinePostAdd size={12} />
            </button>

            <span className="absolute left-1/2 -translate-x-1/2 -top-5 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-[8px] text-white opacity-0 transition-opacity duration-200 group-hover/flag:opacity-100 font-arial">
              Add Topic
            </span>
          </div>

          <div className="relative group/flag inline-block">
            <button
              className="opacity-0 group-hover/node:opacity-100 p-1 text-gray-500 hover:text-gray-300 transition-opacity"
              onClick={() =>
                onAdd("sub", { parentId: item.id, skillId: item.skillId })
              }
            >
              <AiOutlineAppstoreAdd size={12} />
            </button>

            <span className="absolute left-1/2 -translate-x-1/2 -top-5 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-[8px] text-white opacity-0 transition-opacity duration-200 group-hover/flag:opacity-100 font-arial">
              Add Sub-Category
            </span>
          </div>
        </>
      )}
      {/* <button
        onClick={() => onEdit(item, currentType)}
        className="opacity-0 group-hover/node:opacity-100 p-1 text-gray-500 hover:text-gray-300 transition-opacity"
      >
        <Edit2 size={12} />
      </button> */}

      <div className="relative group/flag inline-block">
        <button
          className="opacity-0 group-hover/node:opacity-100 p-1 text-gray-500 hover:text-gray-300 transition-opacity"
          onClick={() => filterNotesByTopic(item.id)}
        >
          <IoMdEye size={12} />
        </button>

        <span className="absolute left-1/2 -translate-x-1/2 -top-5 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-[8px] text-white opacity-0 transition-opacity duration-200 group-hover/flag:opacity-100 font-arial">
          Show Notes
        </span>
      </div>
      <div className="relative group/flag inline-block">
        <button
          className="opacity-0 group-hover/node:opacity-100 p-1 text-gray-500 hover:text-gray-300 transition-opacity"
          onClick={() => onEdit(item, currentType)}
        >
          <Edit2 size={12} />
        </button>

        <span className="absolute left-1/2 -translate-x-1/2 -top-5 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-[8px] text-white opacity-0 transition-opacity duration-200 group-hover/flag:opacity-100 font-arial">
          {currentType === "category"
            ? "Edit Category"
            : currentType === "topic"
            ? "Edit Topic"
            : ""}
        </span>
      </div>
      <div className="relative group/flag inline-block">
        <button
          className="opacity-0 group-hover/node:opacity-100 p-1 text-gray-500 hover:text-red-400 transition-opacity"
          onClick={() => onDelete(item, currentType)}
        >
          <Trash size={14} />
        </button>

        <span className="absolute left-1/2 -translate-x-1/2 -top-5 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-[8px] text-white opacity-0 transition-opacity duration-200 group-hover/flag:opacity-100 font-arial">
          {currentType === "category"
            ? "Delete Category"
            : currentType === "topic"
            ? "Delete Topic"
            : ""}
        </span>
      </div>

      {/* <button
        onClick={() => onDelete(item, currentType)}
        className="p-1 text-gray-500 hover:text-red-400"
      >
        <Trash size={14} />
      </button> */}
    </div>
  );
};

export default ActionMenu;
