"use client";
import { createTyping, updateTyping } from "@/store/slices/typingSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormState = {
  lessonId: "",
  typeId: "",
  title: "",
  exerciseNo: "",
};

const ExercisePopupManage = ({
  route,
  isOpen,
  setIsOpen,
  editData = null,
  setEditData,
}) => {
  const getInitialState = () => {
    const state = { ...initialFormState };
    if (route === "exercises") {
      const defaultType = exerciseTypes.find((ex) => ex.type === "exercise");
      state.typeId = defaultType
        ? defaultType.id
        : "dbac619b-d8dd-48ee-8c7f-760c9dc7d3a2";
    } else {
      const defaultType = exerciseTypes.find((ex) => ex.type === "test");
      state.typeId = defaultType
        ? defaultType.id
        : "0a5cc2f3-22c9-4725-8611-9f3c1a6c75af";

    }
    return state;
  };
  const { user } = useSelector((state) => state.auth);
  const { lessons } = useSelector((state) => state.typing);
  const { exerciseTypes } = useSelector((state) => state.typing);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(() => getInitialState());

  const lessonsData = lessons.filter((item) =>
    route === "exercises"
      ? item.lesson !== "TEST"
      : route === "tests"
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
  }, [isOpen, route, editData, exerciseTypes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newState = { ...prev, [name]: value };
      // if (name === "net" && parseInt(value) > parseInt(prev.gross)) {
      //   console.warn("Net exceeds Gross!");
      // }
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
            className="absolute flex items-center justify-center inset-0 bg-white/10 backdrop-blur-sm transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            {/* <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> */}
            <div
              className="bg-black text-white p-6 rounded-xl shadow-lg w-96 border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">
                {route === "exercises"
                  ? editData
                    ? "Edit Exercise"
                    : "Add a New Exercise"
                  : route === "tests"
                    ? editData
                      ? "Edit Test"
                      : "Add a New Test"
                    : ""}
              </h2>

              {/* Type Input */}
              <div className="mb-4">
                <label className="block text-sm mb-1">Lesson</label>
                <select
                  name="lessonId"
                  value={formData.lessonId}
                  onChange={handleChange}
                  className="w-full  px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option className="bg-black" value="">
                    Select a Lesson
                  </option>
                  {lessonsData.map((lesson) => (
                    <option
                      key={lesson.id}
                      value={lesson.id}
                      className="bg-black text-white"
                    >
                      {lesson.lesson}
                    </option>
                  ))}
                </select>
              </div>
              {/* Type Input */}
              <div className="mb-4">
                <label
                  className="block text-gray-600 text-sm mb-1"
                >
                  Type
                </label>
                <select
                  disabled="true"
                  name="typeId"
                  value={formData.typeId}
                  onChange={handleChange}
                  className="w-full text-gray-600 px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option className="bg-black" value="">
                    Select Exercise Type
                  </option>
                  {exerciseTypes.map((type) => (
                    <option
                      className="bg-black"
                      key={type.id}
                      value={type.id}
                    >
                      {type.type}
                    </option>
                  ))}
                </select>
              </div>
              {/* Word Input */}
              <div className="mb-4">
                <label className="block text-sm mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter Exercise Title..."
                />
              </div>
              {/* Word Input */}
              <div className="mb-4">
                <label className="block text-sm mb-1">Exercise No</label>
                <input
                  type="text"
                  name="exerciseNo"
                  value={formData.exerciseNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter Exercise No..."
                />
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

export default ExercisePopupManage;
