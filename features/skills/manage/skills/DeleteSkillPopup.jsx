"use client";
import DeletePopup from "@/components/DeletePopup";
import { deleteSkill } from "@/store/actions/skillActions";
import { selectSkillFormDeletePopupState } from "@/store/selectors/skillSelectors/skillFormSelector";
import { selectSkillLoading } from "@/store/selectors/skillSelectors/skillSelectors";
import { closeSkillDeletePopup } from "@/store/slices/skillSlices/skillFormSlice";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const DeleteSkillPopup = ({ domain }) => {
  const dispatch = useDispatch();

  const { isOpen, item } = useSelector(selectSkillFormDeletePopupState(domain));
  // const  = deletePopupState;
  const loading = useSelector(selectSkillLoading);

  const handleConfirmDelete = async () => {
    if (!item?.id) return;
    try {
      await dispatch(deleteSkill(item.id)).unwrap();
      dispatch(closeSkillDeletePopup({ domain }));
    } catch (error) {
      toast.error(`Deletion Failed: ${error}`);
    }
  };

  return (
    <DeletePopup
      isDelPopupOpen={isOpen}
      onClose={() => dispatch(closeSkillDeletePopup({ domain }))}
      onDelete={handleConfirmDelete}
      itemName={item?.title}
      isLoading={loading}
    />
  );
};

export default DeleteSkillPopup;
