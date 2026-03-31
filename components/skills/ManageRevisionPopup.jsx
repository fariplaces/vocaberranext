"use client";
import { incrementDate } from "@/lib/utils";
import { createRevision, createTopic, updateRevision, updateTopic } from "@/store/slices/skillSlice";
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
  route,
  isOpen,
  setIsOpen,
  editData = null,
  setEditData,
}) => {
  const { user } = useSelector((state) => state.auth);
  const { topics } = useSelector((state) => state.skill);
  const [formData, setFormData] = useState(initialFormState);
  const dispatch = useDispatch();


  const filteredTopics = topics?.filter((topic) => {
    const cat = topic.category;

    return (
      topic.categoryId === route ||

      cat?.parentId === route ||
      cat?.parent?.parentId === route ||

      cat?.skillId === route ||
      cat?.parent?.skillId === route ||
      cat?.parent?.parent?.skillId === route
    );
  });


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
      topicId: formData.topicId,
      scheduled: formData.scheduled,
      practiced: formData.practiced || null,
      revision1: false,
      revision1date: incrementDate(formData.practiced || formData.scheduled) || null,
      revision2: false,
      revision2date: incrementDate(formData.practiced || formData.scheduled, 3) || null,
      revision3: false,
      revision3date: incrementDate(formData.practiced || formData.scheduled, 7) || null,
      revision4: false,
      revision4date: incrementDate(formData.practiced || formData.scheduled, 22) || null,
      revision5: false,
      revision5date: incrementDate(formData.practiced || formData.scheduled, 72) || null,
    };

    console.log(payloadData);
    const ignoreFields = ["practiced"];

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
      topicId: payloadData.topicId,
      scheduled: payloadData.scheduled,
      practiced: payloadData.practiced,
      revision1: payloadData.revision1,
      revision1date: payloadData.revision1date,
      revision2: payloadData.revision2,
      revision2date: payloadData.revision2date,
      revision3: payloadData.revision3,
      revision3date: payloadData.revision3date,
      revision4: payloadData.revision4,
      revision4date: payloadData.revision4date,
      revision5: payloadData.revision5,
      revision5date: payloadData.revision5date,
      userId: user.id,
    };
    console.log(payload);

    if (editData?.id) {
      dispatch(updateRevision({ id: editData.id, ...payload }));
    } else {
      dispatch(createRevision(payload));
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
                  ? "Edit Revision Details"
                  : "Add a New Revision"
                }
              </h2>
              {/* Word Input */}


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
                  {filteredTopics.map((topic) => {
                    const skillTitle =
                      topic?.category?.parent?.skill?.title ||
                      topic?.category?.skill?.title;

                    const parentCategory = topic?.category?.parent?.title;
                    const category = topic?.category?.title;

                    const categoryPath = [parentCategory, category]
                      .filter(Boolean)
                      .join(" > ");

                    return (
                      <option
                        key={topic.id}
                        value={topic.id}
                        className="bg-black text-white"
                      >
                        {`${skillTitle}: ${topic?.title}${categoryPath ? ` (${categoryPath})` : ""
                          }`}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="">
                <label className="block text-sm">Scheduled On</label>
                <input
                  type="date"
                  name="scheduled"
                  value={formData.scheduled || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mb-0.5 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                />
                <div className="flex justify-end space-x-2 p-1">
                  <button
                    onClick={() => setFormData((prev) => ({ ...prev, scheduled: new Date().toISOString().split("T")[0] }))}
                    className="px-4 py-0.5 border border-gray-600 rounded-lg hover:bg-gray-700"
                  >
                    Today
                  </button>
                  <button
                    className="flex items-center space-x-2 border border-gray-400 bg-transparent hover:bg-gray-600 px-4 py-0.5 rounded-lg"
                    onClick={() => {
                      const tomorrow = new Date();
                      tomorrow.setDate(tomorrow.getDate() + 1);

                      setFormData((prev) => ({
                        ...prev,
                        scheduled: tomorrow.toISOString().split("T")[0],
                      }));
                    }}
                  >
                    <span>Tomorrow</span>
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Practiced On</label>
                <input
                  type="date"
                  name="practiced"
                  value={formData.practiced || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
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
      )
      }
    </>
  );
};

export default ManageRevisionPopup;
