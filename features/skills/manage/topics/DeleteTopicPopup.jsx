"use client";
import DeletePopup from "@/components/DeletePopup";
import { deleteTopic } from "@/store/actions/skillActions";
import {
  selectSkillFormDeletePopupIsOpen,
  selectSkillFormDeletePopupState,
} from "@/store/selectors/skillSelectors/skillFormSelector";
import { closeSkillDeletePopup } from "@/store/slices/skillSlices/skillFormSlice";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const DeleteTopicPopup = ({ domain }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.skill.loading);

  const { isOpen, item } = useSelector(selectSkillFormDeletePopupState(domain));

  if (!isOpen) return null;

  const handleConfirmDelete = async () => {
    if (!item?.id) return;
    try {
      await dispatch(deleteTopic(item.id)).unwrap();
      dispatch(closeSkillDeletePopup({ domain }));
    } catch (error) {
      toast.error(`Deletion Failed: ${error}`);
    }
  };

  return (
    <>
      <DeletePopup
        isDelPopupOpen={isOpen}
        onDelete={handleConfirmDelete}
        itemName={item?.title}
        isLoading={isLoading}
        onClose={() => dispatch(closeSkillDeletePopup({ domain }))}
      />
      {/* <div
        className="fixed flex items-center justify-center inset-0 bg-white/10 backdrop-blur-sm transition-all duration-300 z-50"
        onClick={() => !isLoading && dispatch(closeSkillDeletePopup(domain))} // Prevent closing while deleting
      >
        <div
          className="bg-black text-white p-6 rounded-xl shadow-lg w-80 border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-semibold mb-2 text-red-500">
            Delete Record?
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Are you sure you want to delete{" "}
            <span className="text-white font-bold">{itemName}</span>?
          </p>

          <div className="flex justify-end space-x-3">
            <button
              disabled={isLoading}
              onClick={() => setIsDelPopupOpen(false)}
              className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 text-sm disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              disabled={isLoading}
              onClick={onDelete}
              className="flex items-center justify-center min-w-[80px] px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all disabled:bg-red-800"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default DeleteTopicPopup;
