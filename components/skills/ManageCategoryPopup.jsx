"use client";
import { createCategory, createSkill, updateCategory, updateSkill } from "@/store/slices/skillSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormState = {
  title: "",
  order: "",
  parentId: "",
  skillId: "",
};

const ManageCategoryPopup = ({
  isOpen,
  setIsOpen,
  editData = null,
  setEditData,
}) => {
  const { user } = useSelector((state) => state.auth);
  const { categories, skills } = useSelector((state) => state.skill);
  const [formData, setFormData] = useState(initialFormState);
  const dispatch = useDispatch();


  const resetPopup = () => {
    setFormData(initialFormState);
    if (setEditData) setEditData(null);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      setFormData(editData ? { ...editData } : initialFormState);
    }
  }, [isOpen, editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const newState = { ...prev, [name]: value };

      // Check duplicate order no
      // if (name === "order") {
      //   const exists = skills.some(
      //     (item) => item.order === parseInt(value)
      //   );

      //   if (exists) {
      //     console.warn("Order Already Exists!");
      //   }
      // }

      return newState;
    });
  };

  const handleSave = async () => {
    console.log(formData);
    // const { categories, ...filteredFormData } = formData;
    // const isFormIncomplete = Object.values(formData).some(
    //   (val) => String(val).trim() === ""
    // );

    const payloadData = {
      title: formData.title,
      order: parseInt(formData.order),
      parentId: formData.parentId,
      skillId: formData.skillId,
    };
    const ignoreFields = ["parentId"];

    const filteredData = Object.fromEntries(
      Object.entries(payloadData).filter(
        ([key]) => !ignoreFields.includes(key)
      )
    );

    const isFormIncomplete = Object.values(filteredData).some(
      (val) => String(val ?? "").trim() === ""
    );

    if (isFormIncomplete) {
      alert("Please fill all required fields!");
      return;
    }

    // ✅ Duplicate skill order check
    // const isDuplicate = skills.some(
    //   (item) =>
    //     item.order === parseInt(formData.order) &&
    //     item.id !== formData.id // ignore self in edit mode
    // );

    // if (isDuplicate) {
    //   alert("Order number already exists!");
    //   return;
    // }

    const payload = {
      title: payloadData.title,
      order: parseInt(payloadData.order),
      parentId: payloadData.parentId,
      skillId: payloadData.skillId,
    };
    console.log(payload);
    if (editData?.id) {
      dispatch(updateCategory({ id: editData.id, ...payload }));
    } else {
      dispatch(createCategory(payload));
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
                {editData
                  ? "Edit Category"
                  : "Add a New Category"
                }
              </h2>
              {/* Word Input */}
              <div className="mb-4">
                <label className="block text-sm mb-1">Category Title</label>
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
                <label className="block text-sm mb-1">Category Order No</label>
                <input
                  type="string"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 bg-transparent border rounded-md focus:outline-none 
      // {skills.some(
                    //               (item) =>
                    //                 item.order === parseInt(formData.order) &&
                    //                 item.id !== formData.id
                    //             )
                    //                 ? "border-red-500"
                    //                 : "border-gray-600 focus:border-blue-500"
                    //               }`}
                  placeholder="Enter Skill Order No. i.e 1,2,3..."
                />

                {/* {
                  skills.some(
                    (item) =>
                      item.order === parseInt(formData.order) &&
                      item.id !== formData.id
                  ) && (
                    <p className="text-red-500 text-xs mt-1">
                      Skill Order No already exists
                    </p>
                  )
                } */}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Parent Category</label>
                <select
                  name="parentId"
                  value={formData.parentId || ""}
                  onChange={handleChange}
                  className="w-full  px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option className="bg-black" value="">
                    Select a Parent Category
                  </option>
                  {categories.map((cat) => (
                    <option
                      key={cat.id}
                      value={cat.id}
                      className="bg-black text-white"
                    >
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Skill</label>
                <select
                  name="skillId"
                  value={formData.skillId}
                  onChange={handleChange}
                  className="w-full  px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option className="bg-black" value="">
                    Select a Skill
                  </option>
                  {skills.map((skill) => (
                    <option
                      key={skill.id}
                      value={skill.id}
                      className="bg-black text-white"
                    >
                      {skill.title}
                    </option>
                  ))}
                </select>
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

export default ManageCategoryPopup;
