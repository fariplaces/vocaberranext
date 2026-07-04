"use client";
import { createTopic, updateTopic } from "@/store/actions/skillActions";
import { EMPTY_ARRAY } from "@/store/constants/sliceConstants";
import { selectUser } from "@/store/selectors/authSelectors";
import { selectTopicSkillFormMeta } from "@/store/selectors/skillSelectors/skillFormSelector";
import {
  selectAllCategories,
  selectSkillLoading,
} from "@/store/selectors/skillSelectors/skillSelectors";
import {
  closeSkillManagePopup,
  updateSkillFormFields,
} from "@/store/slices/skillSlices/skillFormSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const ManageTopicPopup = ({ domain }) => {
  const dispatch = useDispatch();
  // const { categories } = useSelector((state) => state.skill);
  const categories = useSelector(selectAllCategories) || EMPTY_ARRAY;
  // const [formData, setFormData] = useState(initialFormState);
  const { isOpen, editId, formData } = useSelector(selectTopicSkillFormMeta);
  const isLoading = useSelector(selectSkillLoading);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateSkillFormFields({ domain, name, value }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.order || !formData.categoryId) {
      alert("Please fill all required fields!");
      return;
    }

    const payload = {
      title: formData.title,
      order: parseInt(formData.order),
      categoryId: formData.categoryId,
    };

    try {
      const action = editId
        ? updateTopic({ id: editId, ...payload })
        : createTopic(payload);
      await dispatch(action).unwrap();
      dispatch(closeSkillManagePopup({ domain }));
    } catch (err) {
      toast.error(`Submission failed: ${err}`);
    }
  };

  return (
    <>
      {/* Popup / Modal */}
      {isOpen && (
        <>
          <div className="fixed flex items-center justify-center inset-0 bg-white/10 backdrop-blur-sm transition-all duration-300">
            {/* <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> */}
            <div className="bg-black text-white p-6 rounded-xl shadow-lg w-96 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">
                {editId ? "Edit Topic" : "Add a New Topic"}
              </h2>
              {/* Word Input */}
              <div className="mb-4">
                <label className="block text-sm mb-1">Topic Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter Topic Title..."
                />
              </div>
              {/* Word Input */}
              <div className="mb-4">
                <label className="block text-sm mb-1">Topic Order No</label>
                <input
                  type="string"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 bg-transparent border rounded-md focus:outline-none`}
                  placeholder="Enter Skill Order No. i.e 1,2,3..."
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Category</label>
                <select
                  name="categoryId"
                  value={formData.categoryId || ""}
                  onChange={handleChange}
                  className="w-full  px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option className="bg-black" value="">
                    Select a Category
                  </option>
                  {categories.map((cat) => (
                    <option
                      key={cat.id}
                      value={cat.id}
                      className="bg-black text-white"
                    >
                      ({cat.skill.title}):{cat.title}{" "}
                      {cat.parent && "-" + cat.parent.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => dispatch(closeSkillManagePopup({ domain }))}
                  className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  className="flex items-center space-x-2 border border-gray-400 bg-transparent hover:bg-gray-600 px-4 py-1 rounded-lg"
                  onClick={handleSave}
                >
                  <span>{editId ? "Update" : "Save"}</span>
                </button>
              </div>
            </div>
          </div>
          {/* </div> */}
        </>
      )}
    </>
  );
};

export default ManageTopicPopup;
