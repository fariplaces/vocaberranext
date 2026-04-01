"use client";
import { createTask, updateTask } from "@/store/actions/taskActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};

const initialFormState = {
  title: "",
  order: "",
  remarks: "",
  date: getTomorrowDate(),
};

const ManageTaskPopup = ({
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
        // Format date to YYYY-MM-DD for the HTML5 date input
        const formattedDate = editData.date
          ? new Date(editData.date).toISOString().split("T")[0]
          : getTomorrowDate();
        setFormData({ ...editData, date: formattedDate });
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
    // Validation: Title and Date are required
    if (!formData.title.trim() || !formData.date) {
      alert("Please fill in the title and date!");
      return;
    }

    const payload = {
      userId: user?.id,
      title: formData.title,
      order: parseInt(formData.order) || 0,
      remarks: formData.remarks,
      date: new Date(formData.date).toISOString(),
    };

    if (editData?.id) {
      dispatch(updateTask({ id: editData.id, ...payload }));
    } else {
      dispatch(createTask(payload));
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
            <h2 className="text-xl font-semibold mb-4 text-blue-400">
              {editData ? "Edit Task" : "Add New Task"}
            </h2>

            {/* Title Input */}
            <div className="mb-4">
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Task Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                placeholder="What needs to be done?"
              />
            </div>

            {/* Date Input */}
            <div className="mb-4">
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Execution Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Order Input */}
              <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Order No</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                  placeholder="0"
                />
              </div>

              {/* Optional Field: Remarks */}
              <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Remarks</label>
                <input
                  type="text"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                  placeholder="Optional note..."
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
                {editData ? "Update Task" : "Save Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageTaskPopup;