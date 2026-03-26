"use client";
import { createTyping, updateTyping } from "@/store/slices/typingSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormState = {
  exerciseId: "",
  durationId: "",
  accuracy: "",
  gross: "",
  net: "",
};

const ManageTypingPopup = ({
  route,
  isOpen,
  setIsOpen,
  editData = null,
  setEditData,
}) => {
  const { user } = useSelector((state) => state.auth);
  const { lessons, durations } = useSelector((state) => state.typing);
  const dispatch = useDispatch();
  const getInitialState = () => {
    const state = { ...initialFormState };
    if (route === "course") {
      const defaultDuration = durations.find((d) => d.duration === "5M");
      state.durationId = defaultDuration
        ? defaultDuration.id
        : "ed238f81-d08b-4315-912b-a7df01aa7f46";
    }
    return state;
  };

  const [formData, setFormData] = useState(() => getInitialState());

  const filteredLessons = lessons.filter((item) =>
    route === "course"
      ? item.lesson !== "TEST"
      : route === "test"
        ? item.lesson === "TEST"
        : true
  );

  const resetPopup = () => {
    setFormData(getInitialState());
    if (setEditData) setEditData(null);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      setFormData(editData ? { ...editData } : getInitialState());
    }
  }, [isOpen, route, editData, durations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newState = { ...prev, [name]: value };
      if (name === "net" && parseInt(value) > parseInt(prev.gross)) {
        console.warn("Net exceeds Gross!");
      }
      return newState;
    });
  };

  const handleSave = async () => {
    const isFormIncomplete = Object.values(formData).some(
      (val) => String(val).trim() === ""
    );
    if (isFormIncomplete || !user?.id) {
      alert("Please fill all fields!");
      return;
    }

    const grossNum = parseInt(formData.gross);
    const netNum = parseInt(formData.net);

    if (netNum > grossNum) {
      alert("Net speed cannot be greater than Gross speed!");
      return;
    }

    const payload = {
      ...formData,
      userId: user.id,
      accuracy: parseFloat(String(formData.accuracy).replace("%", "")),
      gross: parseInt(formData.gross),
      net: parseInt(formData.net),
    };

    if (editData?.id) {
      dispatch(updateTyping({ id: editData.id, ...payload }));
    } else {
      dispatch(createTyping(payload));
    }
    setIsOpen(false);
    resetPopup();
  };

  return (
    <>
      {/* Popup / Modal */}
      {isOpen && (
        <>
          <div
            className="fixed flex items-center justify-center inset-0 bg-white/10 backdrop-blur-sm transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            {/* <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> */}
            <div
              className="bg-black text-white p-6 rounded-xl shadow-lg w-96 border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">
                {route === "course"
                  ? editData
                    ? "Edit Exercise"
                    : "Add a New Exercise"
                  : route === "test"
                    ? editData
                      ? "Edit Test"
                      : "Add a New Test"
                    : ""}
              </h2>

              {/* Type Input */}
              <div className="mb-4">
                <label className="block text-sm mb-1">Exercises</label>
                <select
                  name="exerciseId"
                  value={formData.exerciseId}
                  onChange={handleChange}
                  className="w-full  px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option className="bg-black" value="">
                    Select Exercise
                  </option>
                  {filteredLessons.map((lesson) => (
                    <optgroup
                      key={lesson.id}
                      label={lesson.lesson}
                      className="bg-black text-blue-400 font-bold"
                    >
                      {lesson.exercises.map((ex) => (
                        <option
                          key={ex.id}
                          value={ex.id}
                          className="bg-black text-white"
                        >
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
              {/* Word Input */}
              <div className="mb-4">
                <label className="block text-sm mb-1">Gross (WPM)</label>
                <input
                  type="text"
                  name="gross"
                  value={formData.gross}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter Gross Speed (WPM)"
                />
              </div>
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

              {/* Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  className="flex items-center space-x-2 border border-gray-400 bg-transparent hover:bg-gray-600 px-4 py-1 rounded-lg"
                  onClick={handleSave}
                >
                  <span>{editData ? "Update" : "Save"}</span>
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

export default ManageTypingPopup;
