"use client";
import React, { useEffect, useState } from "react";
import ContentTitle from "@/components/ContentTitle";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import RenderTopics from "./RenderTopics";
import ManageTopicPopup from "./ManageTopicPopup";
import DeleteTopicPopup from "./DeleteTopicPopup";
import ManageRevisionPopup from "../revisions/ManageRevisionPopup";
import { deleteTopic, fetchCategories, fetchTopics } from "@/store/actions/skillActions";

const TopicsPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRevisionPopupOpen, setIsRevisionPopupOpen] = useState(false);
  const [isDelPopupOpen, setIsDelPopupOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { loading } = useSelector((state) => state.skill);

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  const handleRevisionClick = (item) => {
    // console.log(item);
    setSelectedItem({ topicId: item.id });
    setIsRevisionPopupOpen(true);
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
      dispatch(deleteTopic(itemToDelete.id));
      setIsDelPopupOpen(false);
      setItemToDelete(null);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTopics());
    dispatch(fetchCategories());
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
        handleRevisionClick={handleRevisionClick}
      />
      <ManageTopicPopup
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        editData={selectedItem}
        setEditData={setSelectedItem}
      />
      <ManageRevisionPopup
        isOpen={isRevisionPopupOpen}
        setIsOpen={setIsRevisionPopupOpen}
        editData={selectedItem}
        setEditData={setSelectedItem}
      />
      <DeleteTopicPopup
        isDelPopupOpen={isDelPopupOpen}
        setIsDelPopupOpen={setIsDelPopupOpen}
        itemName={`${itemToDelete?.title} — ${[
          itemToDelete?.category?.title,
          itemToDelete?.category?.parent?.title,
          itemToDelete?.category?.skill?.title
        ]
          .filter(Boolean)
          .join(" > ")}`}
        onDelete={handleDelete}
        isLoading={loading}
      />
    </>
  );
};

export default TopicsPage;






