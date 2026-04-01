"use client";
import React, { useEffect, useState } from "react";
import ContentTitle from "@/components/ContentTitle";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import RenderTasks from "./RenderTasks";
import ManageTaskPopup from "./ManageTaskPopup";
import DeleteTaskPopup from "./DeleteTaskPopup";
import { formatDate } from "@/lib/utils";
import { deleteTask, fetchTasks, updateTask } from "@/store/actions/taskActions";


const TaskingPage = ({ route }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDelPopupOpen, setIsDelPopupOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { loading } = useSelector((state) => state.skill);
  const dispatch = useDispatch();

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  const handleStatusToggle = async (task) => {
    console.log(task);
    try {
      const updatedStatus = !task.status;

      const resultAction = await dispatch(
        updateTask({
          id: task.id,
          status: updatedStatus,
        })
      ).unwrap();

      console.log("Task status updated:", resultAction);
    } catch (error) {
      console.error("Failed to toggle task status:", error);
      alert("Could not update task. Please try again.");
    }
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
      dispatch(deleteTask(itemToDelete.id));
      setIsDelPopupOpen(false);
      setItemToDelete(null);
    }
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <>
      <ContentTitle
        title={"TODO Tasks"}
        btnTitle={"Add Task"}
        Icon={Plus}
        handleMethod={handleAddClick}
      />
      <RenderTasks
        route={route}
        handleEditClick={handleEditClick}
        handleDelClick={handleDelClick}
        handleStatusToggle={handleStatusToggle}
      />
      <ManageTaskPopup
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

export default TaskingPage;






