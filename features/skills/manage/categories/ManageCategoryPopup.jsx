"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, updateCategory } from "@/store/actions/skillActions";
import {
  updateSkillFormFields,
  closeSkillManagePopup,
} from "@/store/slices/skillSlices/skillFormSlice";

import { SKILL_FORM_DOMAINS } from "@/store/constants/skillsConstants";
import { selectCategorySkillFormMeta } from "@/store/selectors/skillSelectors/skillFormSelector";
import {
  selectAllCategories,
  selectAllSkills,
} from "@/store/selectors/skillSelectors/skillSelectors";

const ManageCategoryPopup = () => {
  const dispatch = useDispatch();
  const domain = SKILL_FORM_DOMAINS.CATEGORIES;

  // 1. Fetch form lifecycle hooks directly from Redux Form Meta
  const { isOpen, editId, formData } = useSelector(selectCategorySkillFormMeta);
  // 2. Safely grab operational lists from core skill state
  const categories = useSelector(selectAllCategories);
  const skills = useSelector(selectAllSkills);

  // Extract form configuration state; default to "sub" if editing an existing entry
  const isParentMode = formData.formMode === "parent";

  // Filter available categories: when creating a sub-category, show root parent targets
  const filteredCategories = React.useMemo(() => {
    if (isParentMode) return [];
    return categories.filter((item) => item.parentId === null);
  }, [categories, isParentMode]);

  const handleClose = () => {
    dispatch(closeSkillManagePopup({ domain }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateSkillFormFields({ domain, name, value }));
  };

  const handleSave = async () => {
    // Basic structural validation
    if (
      !formData.title?.trim() ||
      !String(formData.order).trim() ||
      !formData.skillId
    ) {
      alert(
        "Please fill all required fields (Title, Order, and Target Skill)!"
      );
      return;
    }

    const payload = {
      title: formData.title,
      order: parseInt(formData.order, 10) || 0,
      parentId: formData.parentId || null,
      skillId: formData.skillId,
    };

    if (editId) {
      dispatch(updateCategory({ id: editId, ...payload }));
    } else {
      dispatch(createCategory(payload));
    }

    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all"
      onClick={handleClose}
    >
      <div
        className="bg-black text-white p-6 rounded-xl shadow-2xl w-96 border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit Category Blueprint" : "Deploy New Category"}
        </h2>

        {/* Category Title */}
        <div className="mb-4">
          <label className="block text-xs text-gray-400 mb-1">
            Category Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500 text-sm text-white"
            placeholder="e.g. Frontend Frameworks"
          />
        </div>

        {/* Order Identifier */}
        <div className="mb-4">
          <label className="block text-xs text-gray-400 mb-1">
            Category Order Index *
          </label>
          <input
            type="number"
            name="order"
            value={formData.order ?? ""}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500 text-sm text-white"
            placeholder="e.g. 1, 2, 3"
          />
        </div>

        {/* Optional Context Parent Node Filter */}
        {!isParentMode && (
          <div className="mb-4">
            <label className="block text-xs text-gray-400 mb-1">
              Parent Relation Category
            </label>
            <select
              name="parentId"
              value={formData.parentId || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500 text-sm text-white"
            >
              <option value="">None (Root Category Level)</option>
              {filteredCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.skill?.title ? `(${cat.skill.title}) ` : ""}
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Associated Skill Node */}
        <div className="mb-6">
          <label className="block text-xs text-gray-400 mb-1">
            Target Skill Core Matrix *
          </label>
          <select
            name="skillId"
            value={formData.skillId || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500 text-sm text-white"
          >
            <option value="" disabled>
              Select Core Skill Domain...
            </option>
            {skills.map((skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.title}
              </option>
            ))}
          </select>
        </div>

        {/* Control Footer */}
        <div className="flex justify-end space-x-2 border-t border-gray-900 pt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {editId ? "Update" : "Save Plan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageCategoryPopup;
