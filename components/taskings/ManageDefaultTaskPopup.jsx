"use client";
import { createDefaultTask, updateDefaultTask } from "@/store/actions/taskActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormState = {
  title: "",
  order: "",
  remarks: "",
};

const ManageDefaultTaskPopup = ({
  isOpen,
  setIsOpen,
  editData = null,
  setEditData,
}) => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(initialFormState);
  const dispatch = useDispatch();

  const resetPopup = () => {
    setFormData(initialFormState);
    if (setEditData) setEditData(null);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setFormData({ ...editData });
      } else {
        setFormData(initialFormState);
      }
    }
  }, [isOpen, editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Validation: Title is required for the template
    if (!formData.title.trim()) {
      alert("Please fill in the template title!");
      return;
    }

    const payload = {
      userId: user?.id, // Your UUID String
      title: formData.title,
      order: parseInt(formData.order) || 0,
      remarks: formData.remarks || "",
    };

    if (editData?.id) {
      dispatch(updateDefaultTask({ id: editData.id, ...payload }));
    } else {
      dispatch(createDefaultTask(payload));
    }

    resetPopup();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed flex items-center justify-center inset-0 bg-white/10 backdrop-blur-sm transition-all duration-300 z-50"
          onClick={resetPopup}
        >
          <div
            className="bg-black text-white p-6 rounded-xl shadow-lg w-96 border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-blue-400">
                {editData ? "Edit Template" : "New Master Template"}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                This will be saved as a reusable task for bulk importing.
              </p>
            </div>

            {/* Title Input */}
            <div className="mb-4">
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Template Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                placeholder="e.g., Daily HTML Practice"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Order Input */}
              <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Default Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                  placeholder="0"
                />
              </div>

              {/* Remarks Input */}
              <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Default Remarks</label>
                <input
                  type="text"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                  placeholder="Optional notes..."
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={resetPopup}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-900/20"
                onClick={handleSave}
              >
                {editData ? "Update Template" : "Save Template"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageDefaultTaskPopup;