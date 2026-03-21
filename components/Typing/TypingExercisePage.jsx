"use client";
import React, { useEffect, useState } from "react";
import CourseExercises from "@/components/Typing/CourseExercises";
import ContentTitle from "@/components/ContentTitle";
import { Plus } from "lucide-react";
import ExercisePopup from "@/components/Typing/ExercisePopup";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTyping,
  fetchDurations,
  fetchLessons,
} from "@/store/slices/typingSlice";
import DeletePopup from "@/components/DeletePopup";

const TypingExercisePage = ({ route }) => {
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
      // Wait for the dispatch to finish
      dispatch(deleteTyping(itemToDelete.id));
      // Only close if it was successful (optional)
      setIsDelPopupOpen(false);
      setItemToDelete(null);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLessons());
    dispatch(fetchDurations());
  }, []);

  return (
    <>
      <ContentTitle
        title={route === "course" ? "Typing Exercises" : "Typing Tests"}
        btnTitle={route === "course" ? "Add Exercise" : "Add Test"}
        Icon={Plus}
        handleMethod={handleAddClick}
      />
      <CourseExercises
        handleEditClick={handleEditClick}
        handleDelClick={handleDelClick}
        route={route}
      />
      <ExercisePopup
        route={route}
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        editData={selectedItem}
        setEditData={setSelectedItem}
      />
      <DeletePopup
        isDelPopupOpen={isDelPopupOpen}
        setIsDelPopupOpen={setIsDelPopupOpen}
        itemName={`${itemToDelete?.exercise?.exerciseNo} - ${itemToDelete?.exercise?.title}`}
        onDelete={handleDelete}
        isLoading={loading}
      />
    </>
  );
};

export default TypingExercisePage;
