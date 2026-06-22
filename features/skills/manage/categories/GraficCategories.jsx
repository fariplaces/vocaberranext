"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Folder,
  FolderOpen,
  FileText,
  ChevronRight,
  ChevronDown,
  Edit2,
  Trash,
  Check,
  X,
  Layers,
} from "lucide-react";
import { selectGraphicalSkillTreeMeta } from "@/store/selectors/skillSelectors/skillSelectors";

// --- INLINE EDITABLE CELL ---
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

// --- REUSABLE DROPDOWN AND CONTROL BAR ---
const ActionMenu = ({
  itemId,
  currentType,
  allCategories,
  currentParentId,
  onShift,
  onDelete,
}) => {
  // Prevent moving a category into its own lineage subset
  const validDestinations = allCategories.filter((cat) => cat.id !== itemId);

  return (
    <div
      className="flex items-center gap-2 opacity-0 group-hover/node:opacity-100 transition-opacity"
      onClick={(e) => e.stopPropagation()}
    >
      <select
        onChange={(e) => onShift(itemId, e.target.value, currentType)}
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
      <button
        onClick={() => onDelete(itemId, currentType)}
        className="p-1 text-gray-500 hover:text-red-400"
      >
        <Trash size={14} />
      </button>
    </div>
  );
};

// --- TOPIC ROW NODE ---
const TopicNode = ({ topic, allCategories, onShift, onRename, onDelete }) => (
  <div className="group/node flex items-center justify-between ml-6 p-2 my-1 bg-gray-900/30 border border-gray-800/40 rounded-md">
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <FileText size={14} className="text-emerald-500 shrink-0" />
      <EditableTitle
        title={topic.title}
        onRename={(newTitle) => onRename(topic.id, newTitle, "topic")}
      />
    </div>
    <ActionMenu
      itemId={topic.id}
      currentType="topic"
      allCategories={allCategories}
      currentParentId={topic.categoryId}
      onShift={onShift}
      onDelete={onDelete}
    />
  </div>
);

// --- RECURSIVE CATEGORY NODE ---
const CategoryNode = ({
  category,
  allCategories,
  depth = 0,
  onShift,
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
          itemId={category.id}
          currentType="category"
          allCategories={allCategories}
          currentParentId={category.parentId}
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
              onRename={onRename}
              onDelete={onDelete}
            />
          ))}
          {/* Recursively Loop nested Subcategories */}
          {category.subCategories?.map((subCat) => (
            <CategoryNode
              key={subCat.id}
              category={subCat}
              allCategories={allCategories}
              depth={depth + 1}
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

// --- MAIN CORE CONTROLLER PANEL ---
export default function SkillGraphicalDashboard() {
  const dispatch = useDispatch();
  const { sortedSkillsTree, isInitialLoading } = useSelector(
    selectGraphicalSkillTreeMeta
  );
  const rawCategories = useSelector((state) => state.skill.categories || []);

  const handleShiftItem = (id, targetParentId, type) => {
    if (type === "category") {
      const destinationValue =
        targetParentId === "root" ? null : targetParentId;
      console.log(
        `API Action: Move Category ${id} under parentId: ${destinationValue}`
      );
      // dispatch(updateCategoryParentAction({ id, parentId: destinationValue }));
    } else if (type === "topic") {
      console.log(
        `API Action: Move Topic ${id} under categoryId: ${targetParentId}`
      );
      // dispatch(updateTopicCategoryAction({ id, categoryId: targetParentId }));
    }
  };

  const handleRenameItem = (id, newTitle, type) => {
    console.log(`API Action: Rename ${type} (ID: ${id}) to "${newTitle}"`);
    // dispatch(renameAssetAction({ id, title: newTitle, type }));
  };

  const handleDeleteItem = (id, type) => {
    console.log(`API Action: Delete item ${id} of type ${type}`);
    // dispatch(deleteAssetAction({ id, type }));
  };

  if (isInitialLoading) {
    return (
      <div className="text-center text-gray-500 py-20 bg-black min-h-screen flex items-center justify-center animate-pulse">
        Mapping dynamic system runtime architectures...
      </div>
    );
  }

  return (
    <div className="bg-black text-white p-6 min-h-screen selection:bg-blue-600">
      <div className="mx-auto space-y-8">
        {sortedSkillsTree.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-800 text-gray-600 italic rounded-xl">
            No system layouts loaded.
          </div>
        ) : (
          sortedSkillsTree.map((skill) => (
            <div
              key={skill.id}
              className="bg-gray-950 border border-gray-900 rounded-xl p-5 shadow-2xl"
            >
              {/* Skill Node Head */}
              <div className="flex items-center gap-3 border-b border-gray-900 pb-3 mb-4">
                <Layers className="text-purple-500" size={18} />
                <h2 className="text-base font-bold tracking-wider text-gray-200 uppercase">
                  <EditableTitle
                    title={skill.title}
                    onRename={(newTitle) =>
                      handleRenameItem(skill.id, newTitle, "skill")
                    }
                  />
                </h2>
              </div>

              {/* Dynamic Categorization Sub-Tree */}
              <div className="space-y-2">
                {skill.categories.map((rootCategory) => (
                  <CategoryNode
                    key={rootCategory.id}
                    category={rootCategory}
                    allCategories={rawCategories}
                    onShift={handleShiftItem}
                    onRename={handleRenameItem}
                    onDelete={handleDeleteItem}
                  />
                ))}
                {skill.categories.length === 0 && (
                  <p className="text-xs text-gray-600 italic pl-6">
                    No top-level categories under this skill matrix.
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
