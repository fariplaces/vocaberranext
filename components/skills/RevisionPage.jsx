"use client";
import React, { useEffect, useState } from "react";
import ContentTitle from "@/components/ContentTitle";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSkill, fetchRevisions, fetchSkills, fetchTopics } from "@/store/slices/skillSlice";
import RenderRevisions from "./RenderRevisions";
import ManageRevisionPopup from "./ManageRevisionPopup";
import DeleteRevisionPopup from "./DeleteRevisionPopup";

const RevisionPage = ({ route }) => {
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
      dispatch(deleteSkill(itemToDelete.id));
      setIsDelPopupOpen(false);
      setItemToDelete(null);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSkills());
    dispatch(fetchTopics());
    dispatch(fetchRevisions());
  }, []);

  return (
    <>
      <ContentTitle
        title={"Manage Revisions"}
        btnTitle={"Add Revision"}
        Icon={Plus}
        handleMethod={handleAddClick}
      />
      <RenderRevisions
        route={route}
        handleEditClick={handleEditClick}
        handleDelClick={handleDelClick}
      />
      <ManageRevisionPopup
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        editData={selectedItem}
        setEditData={setSelectedItem}
      />
      <DeleteRevisionPopup
        isDelPopupOpen={isDelPopupOpen}
        setIsDelPopupOpen={setIsDelPopupOpen}
        itemName={`${itemToDelete?.title} - ${itemToDelete?.order}`}
        onDelete={handleDelete}
        isLoading={loading}
      />
    </>
  );
};

export default RevisionPage;
