"use client";
import React, { useEffect, useState } from "react";
import ContentTitle from "@/components/ContentTitle";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTopic, fetchTopics } from "@/store/slices/skillSlice";
import RenderTopics from "./RenderTopics";
import ManageTopicPopup from "./ManageTopicPopup";
import DeleteTopicPopup from "./DeleteTopicPopup";

const TopicsPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDelPopupOpen, setIsDelPopupOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { loading } = useSelector((state) => state.skill);

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
      dispatch(deleteTopic(itemToDelete.id));
      setIsDelPopupOpen(false);
      setItemToDelete(null);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTopics());
  }, []);

  return (
    <>
      <ContentTitle
        title={"Manage Topics"}
        btnTitle={"Add Topic"}
        Icon={Plus}
        handleMethod={handleAddClick}
      />
      <RenderTopics
        handleEditClick={handleEditClick}
        handleDelClick={handleDelClick}
      />
      <ManageTopicPopup
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        editData={selectedItem}
        setEditData={setSelectedItem}
      />
      <DeleteTopicPopup
        isDelPopupOpen={isDelPopupOpen}
        setIsDelPopupOpen={setIsDelPopupOpen}
        itemName={`${itemToDelete?.title} - ${itemToDelete?.order}`}
        onDelete={handleDelete}
        isLoading={loading}
      />
    </>
  );
};

export default TopicsPage;
