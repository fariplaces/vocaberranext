"use client";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Edit2, Trash, Layers } from "lucide-react";
import { selectGraphicalSkillTreeMetaByFilter } from "@/store/selectors/skillSelectors/skillSelectors";
import {
  openSkillDeletePopup,
  openSkillManagePopup,
} from "@/store/slices/skillSlices/skillFormSlice";
import CategoryNode from "./CategoryNode";
import EditableTitle from "./EditableTitle";

export default function SkillGraphicalDashboard({ route }) {
  const dispatch = useDispatch();

  const { sortedSkillsTree, isInitialLoading } =
    route === "all"
      ? useSelector((state) => selectGraphicalSkillTreeMetaByFilter(state))
      : useSelector((state) =>
          selectGraphicalSkillTreeMetaByFilter(state, route),
        );

  console.log("skill Tree", sortedSkillsTree);

  const rawCategories = useSelector((state) => state.skill.categories || []);

  // Shift Logic
  const handleShiftItem = (id, targetParentId, type) => {
    if (type === "category") {
      const destinationValue =
        targetParentId === "root" ? null : targetParentId;
      console.log(
        `API Action: Move Category ${id} under parentId: ${destinationValue}`,
      );
      // dispatch(updateCategoryParentAction({ id, parentId: destinationValue }));
    } else if (type === "topic") {
      console.log(
        `API Action: Move Topic ${id} under categoryId: ${targetParentId}`,
      );
      // dispatch(updateTopicCategoryAction({ id, categoryId: targetParentId }));
    }
  };

  // Rename Logic
  const handleRenameItem = (id, newTitle, type) => {
    console.log(`API Action: Rename ${type} (ID: ${id}) to "${newTitle}"`);
    // dispatch(renameAssetAction({ id, title: newTitle, type }));
  };

  // Edit Logic
  const handleEditItem = (item, type) => {
    console.log(`API Action: Edit item ${item.id} of type ${type}`);
    if (type === "category" && item.parentId === null) {
      dispatch(
        openSkillManagePopup({
          domain: "categories",
          editData: { ...item, formMode: "parent" },
        }),
      );
    }
    if (type === "category" && item.parentId != null) {
      dispatch(
        openSkillManagePopup({
          domain: "categories",
          editData: { ...item, formMode: "sub" },
        }),
      );
    }
    if (type === "topic") {
      console.log(`API Action: Delete Topic ${id}`);
    }
  };

  // Delete Logic
  const handleDeleteItem = (item, type) => {
    if (type === "category") {
      dispatch(openSkillDeletePopup({ domain: "categories", item }));
    }
    if (type === "topic") {
      console.log(`API Action: Delete Topic ${id}`);
    }
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
                <h2 className="flex justify-between group/skill w-full text-base font-bold tracking-wider text-gray-200 uppercase">
                  <EditableTitle
                    title={skill.title}
                    onRename={(newTitle) =>
                      handleRenameItem(skill.id, newTitle, "skill")
                    }
                  />
                  <div className="flex items-center gap-1">
                    <button
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      //   setIsEditing(true);
                      // }}
                      className="opacity-0 group-hover/skill:opacity-100 p-1 text-gray-500 hover:text-gray-300 transition-opacity"
                    >
                      <AiOutlineAppstoreAdd size={12} />
                    </button>
                    <button
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      //   setIsEditing(true);
                      // }}
                      className="opacity-0 group-hover/skill:opacity-100 p-1 text-gray-500 hover:text-gray-300 transition-opacity"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      // onClick={() => onDelete(item, currentType)}
                      className="opacity-0 group-hover/skill:opacity-100 p-1 text-gray-500  transition-opacity hover:text-red-400"
                    >
                      <Trash size={14} />
                    </button>
                  </div>
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
                    onEdit={handleEditItem}
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
