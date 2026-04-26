"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTyping, updateTyping } from "@/store/actions/typingActions";
import { closeManagePopup, updateFormField } from "@/store/slices/typingSlices/typingFormSlice";
import { selectUser } from "@/store/selectors/authSelectors";
import { selectManagePopupMeta } from "@/store/selectors/typingFormSelectors";

const ManageTypingPopup = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // All logic (lessons, durations, title, route) comes from one selector
  const {
    isOpen,
    isEditMode,
    formData,
    lessons,
    durations,
    title,
    route,
    editId
  } = useSelector(selectManagePopupMeta);

  if (!isOpen) return null;

  console.log(editId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormField({ name, value }));
  };

  const handleSave = async () => {
    if (!formData.exerciseId || !formData.durationId) return alert("Required fields missing");

    if (Number(formData.net) > Number(formData.gross)) {
      return alert("Net speed cannot exceed Gross speed.");
    }

    const payload = {
      ...formData,
      userId: user.id,
      gross: Number(formData.gross) || 0,
      net: Number(formData.net) || 0,
      accuracy: parseFloat(formData.accuracy) || 0,
    };

    try {
      const action = editId ? updateTyping({ id: editId, ...payload }) : createTyping(payload);
      await dispatch(action).unwrap();
      dispatch(closeManagePopup());
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 animate-in fade-in duration-200">
      <div className="bg-gray-900 p-6 rounded-lg w-96 border border-gray-800 shadow-2xl">
        {/* Use the dynamic title from selector */}
        <h2 className="text-xl mb-4 font-bold text-white">{title}</h2>

        {/* Exercise Selection */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-400">Exercise</label>
          <select
            name="exerciseId"
            value={formData.exerciseId}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md outline-none focus:border-blue-500 text-white"
          >
            <option value="">Select Exercise</option>
            {lessons.map(lesson => (
              <optgroup key={lesson.id} label={lesson.lesson} className="bg-gray-900 text-blue-400">
                {lesson.exercises.map(ex => (
                  <option key={ex.id} value={ex.id} className="text-white">
                    {ex.exerciseNo} - {ex.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Duration Selection */}
        <div className="mb-4">
          <label className={`block text-sm mb-1 ${route === "course" ? "text-gray-600" : "text-gray-400"}`}>
            Duration
          </label>
          <select
            disabled={route === "course"}
            name="durationId"
            value={formData.durationId}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md disabled:opacity-50 text-white"
          >
            <option value="">Select Duration</option>
            {durations.map((d) => (
              <option key={d.id} value={d.id}>{d.duration}</option>
            ))}
          </select>
        </div>

        {/* Speed Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-400">Gross (WPM)</label>
            <input type="number" name="gross" value={formData.gross} onChange={handleChange} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md outline-none focus:border-blue-500 text-white" />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-400">Net (WPM)</label>
            <input
              type="number"
              name="net"
              value={formData.net}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-gray-800 border rounded-md outline-none ${Number(formData.net) > Number(formData.gross) ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'} text-white`}
            />
          </div>
        </div>

        {/* Accuracy Input */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-400">Accuracy (%)</label>
          <input type="text" name="accuracy" value={formData.accuracy} onChange={handleChange} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md outline-none focus:border-blue-500 text-white" placeholder="e.g. 98.5" />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => dispatch(closeManagePopup())}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-md font-bold text-white transition-colors"
          >
            {isEditMode ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageTypingPopup;