"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DeletePopup from "@/components/DeletePopup"; // Your UI component
import { deleteTyping } from "@/store/actions/typingActions";
import { selectDeletePopupMeta } from "@/store/selectors/typingFormSelectors";
import { closeDeletePopup } from "@/store/slices/typingSlices/typingFormSlice";
import { SLICE_NAMES } from "@/store/constants/sliceConstants";

const DeleteTypingPopup = ({ domain }) => {
  const dispatch = useDispatch();

  // Use the selectors we built earlier
// You pass the type as a prop to the modal or detect it from route
const { isOpen, item } = useSelector((state) => selectDeletePopupMeta(state, domain));

  // You might want to add a loading state in your typingSlice to track deletion progress
  const isDeleting = useSelector((state) => state.typing.loading);

  const handleConfirmDelete = async () => {
    if (!item?.id) return;

    try {
      // 1. Dispatch the API action
      await dispatch(deleteTyping(item.id)).unwrap();
      // 2. Close the popup only on success
      dispatch(closeDeletePopup({domain}));
    } catch (error) {
      console.error("Failed to delete record:", error);
    }
  };

  return (
    <DeletePopup
      isDelPopupOpen={isOpen}
      setIsDelPopupOpen={() => dispatch(closeDeletePopup())}
      onDelete={handleConfirmDelete}
      itemName={`${item?.exercise?.exerciseNo} - ${item?.exercise?.title}`}
      isLoading={isDeleting}
    />
  );
};

export default DeleteTypingPopup;