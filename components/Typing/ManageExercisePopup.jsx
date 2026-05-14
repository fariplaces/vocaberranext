"use client";
import {
  createExercise,
  updateExercise,
} from "@/store/actions/typingActions";
import { FORM_DOMAINS } from "@/store/constants/typingConstants";
import { selectUser } from "@/store/selectors/authSelectors";
import { selectExerciseFormMeta } from "@/store/selectors/typingFormSelectors";
import { closeManagePopup, updateFormField } from "@/store/slices/typingSlices/typingFormSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const ManageExercisePopup = ({ domain }) => {
  const dispatch = useDispatch();
    const user = useSelector(selectUser);
  
  const {
    isOpen,
    editId,
    formData,
    isEditMode,
    route,
    exercises,
    lessons,
    exerciseTypes,
    title,
  } = useSelector(selectExerciseFormMeta);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormField({ domain, name, value }));
  };


  const handleSave = async () => {
    if (!formData.lessonId || !formData.typeId || !formData.title || !formData.exerciseNo) return toast.error("Required fields missing");

  
    const payload = {
      ...formData,
      userId: user.id,
    };

    try {
      const action = editId ? updateExercise({ id: editId, ...payload }) : createExercise(payload);
      await dispatch(action).unwrap();
      dispatch(closeManagePopup({domain}));
    } catch (error) {
      toast.error("Submission failed:", error);
    }
  };


  return (
    <>
      {/* Popup / Modal */}
      {isOpen && (
        <>
          <div className="fixed flex items-center justify-center inset-0 bg-white/10 backdrop-blur-sm transition-all duration-300">
            <div className="bg-black text-white p-6 rounded-xl shadow-lg w-96 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">{title}</h2>

              {/* Type Input */}
              <div className="mb-4">
                <label className="block text-sm mb-1">Lesson</label>
                <select
                  name="lessonId"
                  // value={formData.lessonId}
                  value={
                  route === "test"
                    ? lessons.find((l) => l.lesson.toUpperCase() === "TEST")?.id || ""
                    : formData.lessonId
                  }
                  onChange={handleChange}
                  className="w-full  px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                 >
                  <option className="bg-black" value="">
                    Select a Lesson
                  </option>
                  {lessons.map((lesson) => (
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
                <label className="blockj text-sm mb-1">Type</label>
                <select
                  name="typeId"
                  // value={formData.typeId}
                  value={
                  route === "test"
                    ? exerciseTypes.find((l) => l.type.toUpperCase() === "TEST")?.id || ""
                    : exerciseTypes.find((l) => l.type.toUpperCase() === "EXERCISE")?.id || ""
                }
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option className="bg-black" value="">
                    Select Exercise Type
                  </option>
                  {exerciseTypes.map((type) => (
                    <option className="bg-black" key={type.id} value={type.id}>
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
                  className={`w-full px-3 py-2 bg-transparent border rounded-md focus:outline-none 
                  ${
                    exercises.some(
                      (item) =>
                        item.exerciseNo === formData.exerciseNo && item.id !== formData.id // ignore self in edit
                    )
                      ? "border-red-500"
                      : "border-gray-600 focus:border-blue-500"
                  }`}
                  placeholder="Enter Exercise No"
                />

                {exercises.some(
                  (item) =>
                    item.exerciseNo === formData.exerciseNo &&
                    item.id !== formData.id
                ) && (
                  <p className="text-red-500 text-xs mt-1">
                    Exercise number already exists
                  </p>
                )}
              </div>
              {/* Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                      onClick={() => dispatch(closeManagePopup({domain:  FORM_DOMAINS.EXERCISES} ))}
                  // onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  className="flex items-center space-x-2 border border-gray-400 bg-transparent hover:bg-gray-600 px-4 py-1 rounded-lg"
                  onClick={handleSave}
                >
                  <span>{isEditMode ? "Update" : "Save"}</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ManageExercisePopup;
