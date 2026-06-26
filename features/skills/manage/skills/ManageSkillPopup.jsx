"use client";
import { useAsyncValidation } from "@/hooks/useAsyncValidation";
import { createSkill, updateSkill } from "@/store/actions/skillActions";
import { selectUser } from "@/store/selectors/authSelectors";
import { selectSkillFormMeta } from "@/store/selectors/skillSelectors/skillFormSelector";
import { selectSkillLoading } from "@/store/selectors/skillSelectors/skillSelectors";
import {
  closeSkillManagePopup,
  updateSkillFormFields,
} from "@/store/slices/skillSlices/skillFormSlice";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const ManageSkillPopup = ({ domain }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { isOpen, editId, formData } = useSelector(selectSkillFormMeta);
  const isLoading = useSelector(selectSkillLoading);

  // Validating the order
  const { errorMsg, isChecking, isButtonDisabled } = useAsyncValidation({
    value: formData.order,
    excludeId: editId,
    validationUrl: "/skills/order-validation",
    debounceTime: 500,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateSkillFormFields({ domain, name, value }));
  };

  const handleSave = async () => {
    if (isButtonDisabled) {
      toast.error("Order already exists!");
      return;
    }
    if (!formData.title || !formData.order)
      return toast.error("Required fields missing!");

    const payload = {
      title: formData.title,
      order: parseInt(formData.order),
      userId: user.id,
    };

    try {
      const action = editId
        ? updateSkill({ id: editId, ...payload })
        : createSkill(payload);
      await dispatch(action).unwrap();
      dispatch(closeSkillManagePopup({ domain }));
    } catch (error) {
      toast.error(`Submission failed: ${error}`);
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
                {editId ? "Edit Skill" : "Add a New Skill"}
              </h2>
              {/* Word Input */}
              <div className="mb-4">
                <label className="block text-sm mb-1">Skill Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter Skill Title..."
                />
              </div>
              {/* Word Input */}
              <div className="mb-4">
                <label className="block text-sm mb-1">Skill Order No</label>
                <div className="relative">
                  <input
                    type="string"
                    name="order"
                    value={formData.order || ""}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 bg-transparent border rounded-md focus:outline-none`}
                    // ${
                    //   skills.some(
                    //     (item) =>
                    //       item.order === parseInt(formData.order) && item.id !== formData.id,
                    //   )
                    //     ? "border-red-500"
                    //     : "border-gray-600 focus:border-blue-500"
                    // }
                    // `}
                    placeholder="Enter Skill Order No. i.e 1,2,3..."
                  />
                  {isChecking && (
                    <span className="absolute right-3 top-2.5 text-xs text-blue-400 animate-pulse">
                      Validating...
                    </span>
                  )}
                </div>

                {/* {skills.some(
                  (item) =>
                    item.order === parseInt(formData.order) &&
                    item.id !== formData.id,
                ) && (
                  <p className="text-red-500 text-xs mt-1">
                    Skill Order No already exists
                  </p>
                )} */}
                {errorMsg && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errorMsg}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => dispatch(closeSkillManagePopup({ domain }))}
                  className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                {/* <button
                  onClick={handleSave}
                  disabled={isButtonDisabled}
                  className={`flex items-center space-x-2 border border-gray-400 bg-transparent hover:bg-gray-600 px-4 py-1 rounded-lg `}
                >
                  <span>{editId ? "Update" : "Save"}</span>
                </button> */}
                {/* <button
                  onClick={handleSave}
                  disabled={isButtonDisabled}
                  className={`px-6 py-2 rounded-md font-bold text-white transition-all ${
                    isButtonDisabled
                      ? "bg-gray-700 opacity-40 cursor-not-allowed text-gray-400"
                      : "bg-blue-600 hover:bg-blue-500 shadow-md"
                  }`}
                >
                  {isChecking ? "Verifying Data..." : "Save Record"}
                </button> */}
                <button
                  onClick={handleSave}
                  disabled={isButtonDisabled || isLoading}
                  className={`flex items-center justify-center gap-2 px-6 py-2 rounded-md font-bold text-white transition-all ${
                    isButtonDisabled || isLoading
                      ? "bg-gray-700 opacity-60 cursor-not-allowed text-gray-400"
                      : "bg-blue-600 hover:bg-blue-500 shadow-md"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="w-5 h-5 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      <span>Saving...</span>
                    </>
                  ) : isChecking ? (
                    "Verifying Data..."
                  ) : editId ? (
                    "Update Record"
                  ) : (
                    "Save Record"
                  )}
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

export default ManageSkillPopup;
