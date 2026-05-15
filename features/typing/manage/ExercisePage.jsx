"use client";
import React, { useEffect, useState } from "react";
import ContentTitle from "@/components/ContentTitle";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import DeleteExercisePopup from "./DeleteExercisePopup";
import ManageExercisePopup from "./ManageExercisePopup";
import RenderExercises from "./RenderExercises";
import {
  deleteExercise,
  fetchExercises,
  fetchExerciseTypes,
  fetchLessons,
} from "@/store/actions/typingActions";
import { resetTypingState, setFilterMode } from "@/store/slices/typingSlices/typingSlice";
import { FORM_DOMAINS } from "@/store/constants/typingConstants";
import { openManagePopup } from "@/store/slices/typingSlices/typingFormSlice";

// const [selectedItem, setSelectedItem] = useState(null);
// const [isPopupOpen, setIsPopupOpen] = useState(false);
// const [isDelPopupOpen, setIsDelPopupOpen] = useState(false);
// const [itemToDelete, setItemToDelete] = useState(null);
// const { loading } = useSelector((state) => state.typing);

// const handleEditClick = (item) => {
//   setSelectedItem(item);
//   setIsPopupOpen(true);
// };

// const handleDelClick = (item) => {
//   setItemToDelete(item);
//   setIsDelPopupOpen(true);
// };

// const handleDelete = async () => {
//   if (itemToDelete?.id) {
//     dispatch(deleteExercise(itemToDelete.id));
//     setIsDelPopupOpen(false);
//     setItemToDelete(null);
//   }
// };
const ExercisePage = ({ route }) => {
  const dispatch = useDispatch();
  const domain = FORM_DOMAINS.EXERCISES;

  const handleAddClick = () => {
    dispatch(
      openManagePopup({
        domain,
      })
    );
  };

  useEffect(() => {
    dispatch(resetTypingState());
    dispatch(setFilterMode(route));
    dispatch(fetchLessons());
    dispatch(fetchExerciseTypes());
    dispatch(fetchExercises({ page: 1, route }));
  }, []);

  return (
    <>
      <ContentTitle
        title={route === "exercises" ? "Manage Exercises" : "Manage Tests"}
        btnTitle={route === "exercises" ? "Add Exercise" : "Add Test"}
        Icon={Plus}
        handleMethod={handleAddClick}
      />
      <RenderExercises route={route} domain={domain} />
      <ManageExercisePopup domain={domain} />
      <DeleteExercisePopup domain={domain} />
      {/* 
        // isDelPopupOpen={isDelPopupOpen}
        // setIsDelPopupOpen={setIsDelPopupOpen}
        // itemName={`${itemToDelete?.exerciseNo} - ${itemToDelete?.title}`}
        // onDelete={handleDelete}
        // isLoading={loading}
      /> */}
    </>
  );
};

export default ExercisePage;
