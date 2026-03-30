"use client";
import React, { useEffect, useState } from "react";
import ContentTitle from "@/components/ContentTitle";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { bulkImportTask, deleteDefaultTask, fetchDefaultTasks } from "@/store/slices/taskSlice";
import DeleteTaskPopup from "./DeleteTaskPopup";
import { formatDate } from "@/lib/utils";
import RenderDefaultTasks from "./RenderDefaultTask";
import ManageDefaultTaskPopup from "./ManageDefaultTaskPopup";


const DefaultTaskPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDelPopupOpen, setIsDelPopupOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const { loading } = useSelector((state) => state.skill);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  const handleBulkImport = (date) => {
    if (selectedIds.length === 0) return;
    console.log(date);

    const result = dispatch(
      bulkImportTask({
        date: date.toISOString(),
        ids: selectedIds,
        userId: user.id
      })
    );
    alert("Tasks imported!");
    setSelectedIds([]); // Clear the checkboxes

    // console.log(result);

    // if (bulkImportTask.fulfilled.match(result)) {
    // }
  };

  const handleAddClick = () => {
    setSelectedItem(null);
    setIsPopupOpen(true);
  };
  const handleDelClick = (item) => {
    setItemToDelete(item);
    setIsDelPopupOpen(true);
  };

  const handleDelete = async () => {
    console.log(itemToDelete);
    if (itemToDelete?.id) {
      dispatch(deleteDefaultTask(itemToDelete.id));
      setIsDelPopupOpen(false);
      setItemToDelete(null);
    }
  };

  useEffect(() => {
    dispatch(fetchDefaultTasks());
  }, []);

  return (
    <>
      <ContentTitle
        title={"Default Tasks"}
        btnTitle={"Add Task"}
        Icon={Plus}
        handleMethod={handleAddClick}
      />
      <RenderDefaultTasks
        handleEditClick={handleEditClick}
        handleDelClick={handleDelClick}
        handleBulkImport={handleBulkImport}
        selectedIds={selectedIds} // Ensure this is passed
        setSelectedIds={setSelectedIds}
      // defaultTasks={defaultTasks}
      />
      <ManageDefaultTaskPopup
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        editData={selectedItem}
        setEditData={setSelectedItem}
      />
      <DeleteTaskPopup
        isDelPopupOpen={isDelPopupOpen}
        setIsDelPopupOpen={setIsDelPopupOpen}
        itemName={`${formatDate(itemToDelete?.date)} — ${itemToDelete?.title}`}
        onDelete={handleDelete}
        isLoading={loading}
      />
    </>
  );
};

export default DefaultTaskPage;






