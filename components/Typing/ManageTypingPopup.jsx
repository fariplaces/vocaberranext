"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTyping, updateTyping } from "@/store/actions/typingActions";
import { selectTypingMetadata } from "@/store/selectors/typingSelectors";
// import { closeManagePopup, updateFormField } from "@/store/slices/typingSlices/typingFormSlice";
import { SLICE_NAMES } from "@/store/constants/sliceConstants";
import { closeManagePopup, updateFormField } from "@/store/slices/typingSlices/typingFormSlice";

const ManageTypingPopup = ({ route }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isOpen, formData, editId } = useSelector((state) => state[SLICE_NAMES.TYPING_FORM].managePopup);
  const { lessons, durations } = useSelector((state) => selectTypingMetadata(state, route));

  // ✅ ADDED: Missing Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormField({ name, value }));
  };

  if (!isOpen) return null;

  const handleSave = async () => {
    // Enterprise Tip: Perform "Pre-flight" validation here
    if (!formData.exerciseId || !formData.durationId) return alert("Required fields missing");

    const payload = {
      ...formData,
      userId: user.id,
      // Ensure numeric values are sent as Numbers, not Strings from inputs
      gross: Number(formData.gross),
      net: Number(formData.net),
      accuracy: parseFloat(formData.accuracy)
    };

    const action = editId ? updateTyping({ id: editId, ...payload }) : createTyping(payload);
    await dispatch(action);
    dispatch(closeManagePopup());
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-96 border border-gray-800">
        <h2 className="text-xl mb-4 font-bold">{editId ? "Edit" : "Add"} Entry</h2>

        {/* Dynamic Exercise Dropdown */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Exercises</label>
          <select name="exerciseId" value={formData.exerciseId} onChange={handleChange} className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md outline-none focus:border-blue-500">
            <option value="" className="bg-black">Select Exercise</option>
            {lessons.map(lesson => (
              <optgroup key={lesson.id} label={lesson.lesson} className="bg-black text-blue-400">
                {lesson.exercises.map(ex => (
                  <option key={ex.id} value={ex.id} className="bg-black text-white">
                    {ex.exerciseNo} - {ex.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Type Input */}
        <div className="mb-4">
          <label
            className={`block ${route === "course" ? "text-gray-600" : "text-white"
              } text-sm mb-1`}
          >
            Duration
          </label>
          <select
            disabled={route === "course"}
            name="durationId"
            value={formData.durationId}
            onChange={handleChange}
            className={`w-full ${route === "course" ? "text-gray-600" : "text-white"
              } px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-blue-500`}
          >
            <option className="bg-black" value="">
              Select Duration
            </option>
            {durations.map((duration) => (
              <option
                className="bg-black"
                key={duration.id}
                value={duration.id}
              >
                {duration.duration}
              </option>
            ))}
          </select>
        </div>
        {/* Word Input */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Accuracy</label>
          <input
            type="text"
            name="accuracy"
            value={formData.accuracy}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="i.e 97%"
          />
        </div>

        {/* Controlled Input for Gross Speed */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Gross (WPM)</label>
          <input type="number" name="gross" value={formData.gross} onChange={handleChange} className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md outline-none focus:border-blue-500" placeholder="Enter Gross Speed" />
        </div>

        {/* ... (Repeat for Net & Accuracy) ... */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Net (WPM)</label>
          <input
            type="text"
            name="net"
            value={formData.net}
            onChange={handleChange}
            className={`w-full px-3 py-2 bg-transparent border rounded-md focus:outline-none 
                  ${parseInt(formData.net) > parseInt(formData.gross)
                ? "border-red-500"
                : "border-gray-600 focus:border-blue-500"
              }`}
            placeholder="Enter Net Speed"
          />
          {parseInt(formData.net) > parseInt(formData.gross) && (
            <p className="text-red-500 text-xs mt-1">
              Must be ≤ Gross speed
            </p>
          )}
        </div>


        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => dispatch(closeManagePopup())}>Cancel</button>
          <button onClick={handleSave} className="bg-blue-600 px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default ManageTypingPopup;