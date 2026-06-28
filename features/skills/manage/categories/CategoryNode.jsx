"use client";
import React, { useState } from "react";
import { Folder, ChevronRight, ChevronDown } from "lucide-react";
import ActionMenu from "./ActionMenu";
import TopicNode from "./TopicNode";
import EditableTitle from "./EditableTitle";

const CategoryNode = ({
  category,
  allCategories,
  depth = 0,
  onAdd,
  onShift,
  onEdit,
  onRename,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  // Custom tailwind indents based on depth layers
  const depthStyle = { marginLeft: depth === 0 ? "0px" : "24px" };

  return (
    <div className="my-2" style={depthStyle}>
      <div className="group/node flex items-center justify-between p-2 bg-gray-900/60 border border-gray-800/80 rounded hover:border-gray-700 transition-colors">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm font-medium text-blue-400 text-left"
        >
          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          <Folder size={15} className="text-blue-500 shrink-0" />
          <EditableTitle
            title={category.title}
            onRename={(newTitle) => onRename(category.id, newTitle, "category")}
          />
        </button>

        <ActionMenu
          item={category}
          currentType="category"
          allCategories={allCategories}
          currentParentId={category.parentId}
          onAdd={onAdd}
          onEdit={onEdit}
          onShift={onShift}
          onDelete={onDelete}
        />
      </div>

      {isOpen && (
        <div className="mt-1 border-l border-gray-800 pl-1">
          {/* Render Topics directly attached here */}
          {category.topics?.map((topic) => (
            <TopicNode
              key={topic.id}
              topic={topic}
              allCategories={allCategories}
              onShift={onShift}
              onEdit={onEdit}
              onRename={onRename}
              onDelete={onDelete}
            />
          ))}
          {/* Recursively Loop nested Subcategories */}
          {category.subCategories?.map((subCat) => (
            <CategoryNode
              key={subCat.id}
              category={subCat}
              onAdd={onAdd}
              allCategories={allCategories}
              depth={depth + 1}
              onEdit={onEdit}
              onShift={onShift}
              onRename={onRename}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryNode;
