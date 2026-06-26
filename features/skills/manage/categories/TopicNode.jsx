"use client";
import React from "react";
import { FileText } from "lucide-react";
import ActionMenu from "./ActionMenu";
import EditableTitle from "./EditableTitle";

const TopicNode = ({
  topic,
  allCategories,
  onShift,
  onRename,
  onEdit,
  onDelete,
}) => (
  <div className="group/node flex items-center justify-between ml-6 p-2 my-1 bg-gray-900/30 border border-gray-800/40 rounded-md">
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <FileText size={14} className="text-emerald-500 shrink-0" />
      <EditableTitle
        title={topic.title}
        onRename={(newTitle) => onRename(topic.id, newTitle, "topic")}
      />
    </div>
    <ActionMenu
      item={topic}
      currentType="topic"
      allCategories={allCategories}
      currentParentId={topic.categoryId}
      onShift={onShift}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  </div>
);
export default TopicNode;
