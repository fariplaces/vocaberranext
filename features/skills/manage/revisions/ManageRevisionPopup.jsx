"use client";
import { createRevision, updateRevision } from "@/store/actions/skillActions";
import { SKILL_FORM_DOMAINS } from "@/store/constants/skillsConstants";
import { selectUser } from "@/store/selectors/authSelectors";
import { selectRevisionSkillFormMeta } from "@/store/selectors/skillSelectors/skillFormSelector";
import {
  selectAllTopics,
  selectSkillLoading,
} from "@/store/selectors/skillSelectors/skillSelectors";
import {
  closeSkillManagePopup,
  updateSkillFormFields,
} from "@/store/slices/skillSlices/skillFormSlice";
import { incrementDate } from "@/utils/date";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ManageRevisionPopup = ({ domain }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const topics = useSelector(selectAllTopics);

  const { isOpen, editId, formData } = useSelector(selectRevisionSkillFormMeta);
  const isLoading = useSelector(selectSkillLoading);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      updateSkillFormFields({
        domain: SKILL_FORM_DOMAINS.REVISIONS,
        name,
        value,
      })
    );
  };

  const filteredTopics = topics.filter(
    (topic) => topic.id === formData.topicId
  );

  const handleSave = async () => {
    if (!formData.topicId || !formData.scheduled) {
      alert("Please fill all required fields!");
      return;
    }

    const payloadData = {
      topicId: formData.topicId,
      scheduled: formData.scheduled,
      practiced: formData.practiced || null,
      revision1: false,
      revision1date:
        incrementDate(formData.practiced || formData.scheduled) || null,
      revision2: false,
      revision2date:
        incrementDate(formData.practiced || formData.scheduled, 3) || null,
      revision3: false,
      revision3date:
        incrementDate(formData.practiced || formData.scheduled, 7) || null,
      revision4: false,
      revision4date:
        incrementDate(formData.practiced || formData.scheduled, 22) || null,
      revision5: false,
      revision5date:
        incrementDate(formData.practiced || formData.scheduled, 72) || null,
    };

    try {
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

      const action = editId?.id
        ? updateRevision({ id: editId.id, ...payload })
        : createRevision(payload);
      await dispatch(action).unwrap();
    } catch (err) {
      toast.error(`Submission failed: ${err}`);
    }
  };

  return (
    <>
      {/* Popup / Modal */}
      {isOpen && (
        <>
          <div className="fixed flex items-center justify-center inset-0 bg-white/10 backdrop-blur-sm transition-all duration-300">
            <div className="bg-black text-white p-6 rounded-xl shadow-lg w-96 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">
                {editId ? "Edit Revision Details" : "Add a New Revision"}
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
                        {`${skillTitle}: ${topic?.title}${
                          categoryPath ? ` (${categoryPath})` : ""
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
                    onClick={
                      () =>
                        dispatch(
                          updateSkillFormFields({
                            domain: SKILL_FORM_DOMAINS.REVISIONS,
                            name: "scheduled",
                            value: new Date().toISOString().split("T")[0],
                          })
                        )
                      // setFormData((prev) => ({
                      //   ...prev,
                      //   scheduled: new Date().toISOString().split("T")[0],
                      // }))
                    }
                    className="px-4 py-0.5 border border-gray-600 rounded-lg hover:bg-gray-700"
                  >
                    Today
                  </button>
                  <button
                    className="flex items-center space-x-2 border border-gray-400 bg-transparent hover:bg-gray-600 px-4 py-0.5 rounded-lg"
                    onClick={() => {
                      const tomorrow = new Date();
                      tomorrow.setDate(tomorrow.getDate() + 1);
                      dispatch(
                        updateSkillFormFields({
                          domain: SKILL_FORM_DOMAINS.REVISIONS,
                          name: "scheduled",
                          value: tomorrow.toISOString().split("T")[0],
                        })
                      );
                    }}
                  >
                    {/* // setFormData((prev) => ({
                        ...prev,
                        scheduled: tomorrow.toISOString().split("T")[0],
                      }));
                    }}
                  > */}
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
                  onClick={() =>
                    dispatch(
                      closeSkillManagePopup({
                        domain: SKILL_FORM_DOMAINS.REVISIONS,
                      })
                    )
                  }
                  className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  className="flex items-center space-x-2 border border-gray-400 bg-transparent hover:bg-gray-600 px-4 py-1 rounded-lg"
                  onClick={handleSave}
                >
                  <span>{editId ? "Update" : "Save"}</span>
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

export default ManageRevisionPopup;
