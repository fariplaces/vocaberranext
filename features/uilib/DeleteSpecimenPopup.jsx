"use client";

import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import DeletePopup from "@/components/DeletePopup";
import { deleteUilibComponent } from "@/store/actions/uilibActions";
import { selectUilibDeletePopupMeta } from "@/store/selectors/uilibFormSelectors";
import { selectUilibLoading } from "@/store/selectors/uilibSelectors";
import { closeDeletePopup } from "@/store/slices/uilibFormSlice";

export function DeleteSpecimenPopup() {
  const dispatch = useDispatch();
  const { isOpen, item } = useSelector(selectUilibDeletePopupMeta);
  const loading = useSelector(selectUilibLoading);

  const handleConfirmDelete = async () => {
    if (!item?.id) return;
    try {
      await dispatch(deleteUilibComponent(item.id)).unwrap();
      dispatch(closeDeletePopup());
    } catch (error) {
      toast.error(`Deletion failed: ${error}`);
    }
  };

  return (
    <DeletePopup
      isDelPopupOpen={isOpen}
      onClose={() => dispatch(closeDeletePopup())}
      onDelete={handleConfirmDelete}
      itemName={item?.name}
      isLoading={loading}
    />
  );
}

export default DeleteSpecimenPopup;
