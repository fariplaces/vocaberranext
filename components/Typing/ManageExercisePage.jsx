"use client";
import React, { useEffect, useState } from "react";
import ContentTitle from "@/components/ContentTitle";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTyping,
  fetchExercises,
  fetchExerciseTypes,
  fetchLessons,
} from "@/store/slices/typingSlice";
import DeletePopup from "@/components/DeletePopup";
import CourseExercisesList from "./CourseExercisesLists";
import ExercisePopupManage from "./ExercisePopupManage";

const ManageExercisePage = ({ route }) => {
  // const [selectedItem, setSelectedItem] = useState(null);
  // const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const [isDelPopupOpen, setIsDelPopupOpen] = useState(false);
  // const [itemToDelete, setItemToDelete] = useState(null);
  // const { loading } = useSelector((state) => state.typing);

  // const handleEditClick = (item) => {
  //   setSelectedItem(item); // Pass the whole typing record
  //   setIsPopupOpen(true);
  // };

  // const handleAddClick = () => {
  //   setSelectedItem(null);
  //   setIsPopupOpen(true);
  // };
  // const handleDelClick = (item) => {
  //   setItemToDelete(item);
  //   setIsDelPopupOpen(true);
  // };

  // const handleDelete = async () => {
  //   if (itemToDelete?.id) {
  //     // Wait for the dispatch to finish
  //     dispatch(deleteTyping(itemToDelete.id));
  //     // Only close if it was successful (optional)
  //     setIsDelPopupOpen(false);
  //     setItemToDelete(null);
  //   }
  // };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLessons());
    dispatch(fetchExerciseTypes());
  }, []);

  return (
    <>
      <ContentTitle
        title={route === "exercises" ? "Manage Exercises" : "Manage Tests"}
        btnTitle={route === "exercises" ? "Add Exercise" : "Add Test"}
        Icon={Plus}
      // handleMethod={handleAddClick}
      />
      <CourseExercisesList
        // handleEditClick={handleEditClick}
        // handleDelClick={handleDelClick}
        route={route}
      />
      <ExercisePopupManage
        route={route}
        isOpen="true"
      // isOpen={isPopupOpen}
      // setIsOpen={setIsPopupOpen}
      // editData={selectedItem}
      // setEditData={setSelectedItem}
      />
      {/* <DeletePopup
        isDelPopupOpen={isDelPopupOpen}
        setIsDelPopupOpen={setIsDelPopupOpen}
        itemName={`${itemToDelete?.exercise?.exerciseNo} - ${itemToDelete?.exercise?.title}`}
        onDelete={handleDelete}
        isLoading={loading}
      /> */}
    </>
  );
};

export default ManageExercisePage;
