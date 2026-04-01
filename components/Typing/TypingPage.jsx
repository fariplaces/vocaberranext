"use client";
import React, { useEffect, useState } from "react";
import ContentTitle from "@/components/ContentTitle";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import RenderTyping from "@/components/Typing/RenderTyping";
import ManageTypingPopup from "@/components/Typing/ManageTypingPopup";
import DeleteTypingPopup from "@/components/Typing/DeleteTypingPopup";
import { deleteTyping, fetchDurations, fetchLessons } from "@/store/actions/typingActions";

const TypingPage = ({ route }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDelPopupOpen, setIsDelPopupOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { loading } = useSelector((state) => state.typing);

  const handleEditClick = (item) => {
    setSelectedItem(item);
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
      dispatch(deleteTyping(itemToDelete.id));
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
      <RenderTyping
        handleEditClick={handleEditClick}
        handleDelClick={handleDelClick}
        route={route}
      />
      <ManageTypingPopup
        route={route}
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        editData={selectedItem}
        setEditData={setSelectedItem}
      />
      <DeleteTypingPopup
        isDelPopupOpen={isDelPopupOpen}
        setIsDelPopupOpen={setIsDelPopupOpen}
        itemName={`${itemToDelete?.exercise?.exerciseNo} - ${itemToDelete?.exercise?.title}`}
        onDelete={handleDelete}
        isLoading={loading}
      />
    </>
  );
};

export default TypingPage;
