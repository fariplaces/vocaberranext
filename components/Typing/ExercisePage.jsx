"use client";
import React, { useEffect, useState } from "react";
import ContentTitle from "@/components/ContentTitle";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExercise,
  fetchExercises,
  fetchExerciseTypes,
  fetchLessons,
} from "@/store/slices/typingSlice";
import DeleteExercisePopup from "./DeleteExercisePopup";
import ManageExercisePopup from "./ManageExercisePopup";
import RenderExercises from "./RenderExercises";

const ExercisePage = ({ route }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDelPopupOpen, setIsDelPopupOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { loading } = useSelector((state) => state.typing);

  const handleEditClick = (item) => {
    setSelectedItem(item); // Pass the whole typing record
    setIsPopupOpen(true);
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
    if (itemToDelete?.id) {
      dispatch(deleteExercise(itemToDelete.id));
      setIsDelPopupOpen(false);
      setItemToDelete(null);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLessons());
    dispatch(fetchExerciseTypes());
    dispatch(fetchExercises());
  }, []);

  return (
    <>
      <ContentTitle
        title={route === "exercises" ? "Manage Exercises" : "Manage Tests"}
        btnTitle={route === "exercises" ? "Add Exercise" : "Add Test"}
        Icon={Plus}
        handleMethod={handleAddClick}
      />
      <RenderExercises
        handleEditClick={handleEditClick}
        handleDelClick={handleDelClick}
        route={route}
      />
      <ManageExercisePopup
        route={route}
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        editData={selectedItem}
        setEditData={setSelectedItem}
      />
      <DeleteExercisePopup
        isDelPopupOpen={isDelPopupOpen}
        setIsDelPopupOpen={setIsDelPopupOpen}
        itemName={`${itemToDelete?.exerciseNo} - ${itemToDelete?.title}`}
        onDelete={handleDelete}
        isLoading={loading}
      />
    </>
  );
};

export default ExercisePage;
