"use client";
import { createTopic, updateTopic } from "@/store/slices/skillSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormState = {
  topicId: "",
  scheduled: "",
  practiced: "",
  revision1: "",
  revision1date: "",
  revision2: "",
  revision2date: "",
  revision3: "",
  revision3date: "",
  revision4: "",
  revision4date: "",
  revision5: "",
  revision5date: "",
};

const ManageRevisionPopup = ({
  isOpen,
  setIsOpen,
  editData = null,
  setEditData,
}) => {
  const { user } = useSelector((state) => state.auth);
  const { categories, topics } = useSelector((state) => state.skill);
  const [formData, setFormData] = useState(initialFormState);
  const dispatch = useDispatch();
  // 1 3 7

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


      return newState;
    });
  };

  const handleSave = async () => {
    console.log(formData);

    const payloadData = {
      title: formData.title,
      order: parseInt(formData.order),
      categoryId: formData.categoryId,
    };
    const ignoreFields = ["categories, revisions"];

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


    const payload = {
      title: payloadData.title,
      order: parseInt(payloadData.order),
      categoryId: payloadData.categoryId,
    };
    console.log(payload);

    if (editData?.id) {
      dispatch(updateTopic({ id: editData.id, ...payload }));
    } else {
      dispatch(createTopic(payload));
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
                  ? "Edit Topic"
                  : "Add a New Topic"
                }
              </h2>
              {/* Word Input */}
              <div className="mb-4">
                <label className="block text-sm mb-1">Scheduled On</label>
                <input
                  type="date"
                  name="scheduled"
                  value={formData.scheduled}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter Topic Title..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-1">Topic</label>
                <select
                  name="topicId"
                  value={formData.topicId || ""}
                  onChange={handleChange}
                  className="w-full  px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option className="bg-black" value="">
                    Select a Topic
                  </option>
                  {topics.map((topic) => (
                    <option
                      key={topic.id}
                      value={topic.id}
                      className="bg-black text-white"
                    >
                      {/* {topic.title} */}
                      ({topic.category.skill.title}):{topic.title} {topic.parent && "-" + topic.parent.title}
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
      )
      }
    </>
  );
};

export default ManageRevisionPopup;
