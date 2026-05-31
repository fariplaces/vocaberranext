"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Folder,
  FolderOpen,
  FileText,
  ChevronRight,
  ChevronDown,
  Edit,
  Trash,
} from "lucide-react";
import { selectGraphicalSkillTreeMeta } from "@/store/selectors/skillSelectors/skillSelectors";

// --- ACTION DROPDOWN MODULE ---
const ActionMenu = ({ itemId, currentType, allCategories, onShift }) => (
  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
    <select
      onChange={(e) => onShift(itemId, e.target.value)}
      className="bg-gray-800 text-xs text-gray-300 border border-gray-700 rounded px-2 py-1 cursor-pointer focus:outline-none"
      defaultValue=""
    >
      <option value="" disabled>
        Move Item To...
      </option>
      {currentType === "category" && (
        <option value="root">🔺 Promote to Tier 1 Parent</option>
      )}
      {allCategories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          📁 Move under: {cat.title}
        </option>
      ))}
    </select>
    <button className="p-1 text-gray-400 hover:text-white">
      <Edit size={14} />
    </button>
    <button className="p-1 text-red-500 hover:text-red-400">
      <Trash size={14} />
    </button>
  </div>
);

// --- COMPONENT SUITE NODES (TOPICS, TIER 3, TIER 2) ---
const TopicItem = ({ topic, allCategories, onShiftTopic }) => (
  <div className="group flex items-center justify-between ml-6 p-2 my-1 bg-gray-900/40 border border-gray-800/60 rounded-md">
    <div className="flex items-center gap-2 text-sm text-gray-300">
      <FileText size={16} className="text-green-500 shrink-0" />
      <span>{topic.title}</span>
    </div>
    <ActionMenu
      itemId={topic.id}
      currentType="topic"
      allCategories={allCategories}
      onShift={onShiftTopic}
    />
  </div>
);

const Tier3LeafCategory = ({
  category,
  allCategories,
  onShiftCategory,
  onShiftTopic,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="ml-6 my-2">
      <div className="group flex items-center justify-between p-2 bg-gray-900/20 border border-gray-800/40 rounded">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm font-medium text-emerald-400"
        >
          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          <Folder size={16} className="text-emerald-500 shrink-0" />
          <span>{category.title}</span>
        </button>
        <ActionMenu
          itemId={category.id}
          currentType="category"
          allCategories={allCategories}
          onShift={onShiftCategory}
        />
      </div>
      {isOpen && (
        <div className="mt-1 border-l border-emerald-900/40 pl-2">
          {category.topics.map((topic) => (
            <TopicItem
              key={topic.id}
              topic={topic}
              allCategories={allCategories}
              onShiftTopic={onShiftTopic}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Tier2SubCategory = ({
  category,
  allCategories,
  onShiftCategory,
  onShiftTopic,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="ml-6 my-3">
      <div className="group flex items-center justify-between p-2.5 bg-blue-950/10 border border-blue-900/30 rounded">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm font-semibold text-blue-400"
        >
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <Folder size={16} className="text-blue-500 shrink-0" />
          <span>{category.title}</span>
        </button>
        <ActionMenu
          itemId={category.id}
          currentType="category"
          allCategories={allCategories}
          onShift={onShiftCategory}
        />
      </div>
      {isOpen && (
        <div className="mt-1 border-l border-blue-900/40 pl-2">
          {category.topics.map((topic) => (
            <TopicItem
              key={topic.id}
              topic={topic}
              allCategories={allCategories}
              onShiftTopic={onShiftTopic}
            />
          ))}
          {category.subCategories.map((tier3) => (
            <Tier3LeafCategory
              key={tier3.id}
              category={tier3}
              allCategories={allCategories}
              onShiftCategory={onShiftCategory}
              onShiftTopic={onShiftTopic}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Tier1ParentCategory = ({
  category,
  allCategories,
  onShiftCategory,
  onShiftTopic,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="bg-gray-950 border border-gray-800/80 rounded-lg p-4 shadow-xl mb-4">
      <div className="group flex items-center justify-between border-b border-gray-900 pb-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 text-lg font-bold text-white tracking-wide uppercase"
        >
          {isOpen ? (
            <ChevronDown size={20} className="text-gray-500" />
          ) : (
            <ChevronRight size={20} className="text-gray-500" />
          )}
          <span>{category.title}</span>
        </button>
        <ActionMenu
          itemId={category.id}
          currentType="category"
          allCategories={allCategories}
          onShift={onShiftCategory}
        />
      </div>
      {isOpen && (
        <div className="mt-3 border-l-2 border-gray-800/50 pl-2">
          {category.topics.map((topic) => (
            <TopicItem
              key={topic.id}
              topic={topic}
              allCategories={allCategories}
              onShiftTopic={onShiftTopic}
            />
          ))}
          {category.subCategories.map((tier2) => (
            <Tier2SubCategory
              key={tier2.id}
              category={tier2}
              allCategories={allCategories}
              onShiftCategory={onShiftCategory}
              onShiftTopic={onShiftTopic}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// --- CORE PANEL CONTROLLER ---
export default function SkillGraphicalDashboard({ route }) {
  const dispatch = useDispatch();

  // 1. Consume memoized hierarchical structure and loading states
  const { sortedSkillsTree, isInitialLoading } = useSelector(
    selectGraphicalSkillTreeMeta,
  );

  const rawCategories = useSelector((state) => state.skill.categories || []);

  const handleShiftCategory = (categoryId, targetParentId) => {
    const parentIdValue = targetParentId === "root" ? null : targetParentId;
    console.log(
      `Action dispatched: Category ${categoryId} parentId -> ${parentIdValue}`,
    );
  };

  const handleShiftTopic = (topicId, targetCategoryId) => {
    console.log(
      `Action dispatched: Topic ${topicId} categoryId -> ${targetCategoryId}`,
    );
  };

  if (isInitialLoading) {
    return (
      <div className="text-center text-gray-400 py-20 animate-pulse bg-black min-h-screen">
        Assembling system category blueprint configurations...
      </div>
    );
  }

  return (
    <div className="bg-black text-white p-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {sortedSkillsTree.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-800 rounded-lg text-gray-500 italic">
            No structural matrices deployed for this view configuration track.
          </div>
        ) : (
          <div className="space-y-6">
            {sortedSkillsTree.map((parentCat) => (
              <Tier1ParentCategory
                key={parentCat.id}
                category={parentCat}
                allCategories={rawCategories}
                onShiftCategory={handleShiftCategory}
                onShiftTopic={handleShiftTopic}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
