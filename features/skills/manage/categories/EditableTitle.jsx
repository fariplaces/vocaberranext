"use client";
import React, { useState } from "react";
import { Edit2, Check, X } from "lucide-react";

const EditableTitle = ({ title, onRename }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);

  if (isEditing) {
    return (
      <div className="flex items-center gap-1 onClick={(e) => e.stopPropagation()}">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="bg-gray-800 border border-blue-500 rounded px-1.5 py-0.5 text-sm text-white focus:outline-none"
          autoFocus
        />
        <button
          onClick={() => {
            onRename(value);
            setIsEditing(false);
          }}
          className="text-green-500 p-0.5"
        >
          <Check size={14} />
        </button>
        <button
          onClick={() => {
            setValue(title);
            setIsEditing(false);
          }}
          className="text-red-500 p-0.5"
        >
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 group/title">
      <span>{title}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
        className="opacity-0 group-hover/title:opacity-100 p-1 text-gray-500 hover:text-gray-300 transition-opacity"
      >
        <Edit2 size={12} />
      </button>
    </div>
  );
};
export default EditableTitle;
