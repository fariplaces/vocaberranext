"use client";
import { selectDeletePopupMeta } from "@/store/selectors/typingFormSelectors";
import { closeDeletePopup } from "@/store/slices/typingSlices/typingFormSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExercise } from "@/store/actions/typingActions";
import DeletePopup from "@/components/DeletePopup";

const DeleteExercisePopup = ({ domain }) => {
  const { isOpen, item } = useSelector((state) =>
    selectDeletePopupMeta(state, domain),
  );
  const dispatch = useDispatch();
  // You might want to add a loading state in your typingSlice to track deletion progress
  const isDeleting = useSelector((state) => state.typing.loading);
  if (!isOpen) return null;

  const handleConfirmDelete = async () => {
    if (!item?.id) return;

    try {
      // 1. Dispatch the API action
      await dispatch(deleteExercise(item.id)).unwrap();
      // 2. Close the popup only on success
      dispatch(closeDeletePopup({ domain }));
    } catch (error) {
      console.toast(`Failed to delete record: ${error.message}`);
    }
  };

  return (
    <DeletePopup
      isDelPopupOpen={isOpen}
      setIsDelPopupOpen={() => dispatch(closeDeletePopup({ domain }))}
      onDelete={handleConfirmDelete}
      itemName={`${item?.exerciseNo} - ${item?.title}`}
      isLoading={isDeleting}
    />
  );
};

export default DeleteExercisePopup;
