"use client";
import React, { useEffect, useState } from "react";
import ContentTitle from "@/components/ContentTitle";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import RenderSkills from "./RenderSkills";
import ManageSkillPopup from "./ManageSkillPopup";
import DeleteSkillPopup from "./DeleteSkillPopup";
import { deleteSkill, fetchSkills } from "@/store/actions/skillActions";

const SkillsPage = () => {
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
  }, []);

  return (
    <>
      <ContentTitle
        title={"Manage Skills"}
        btnTitle={"Add Skill"}
        Icon={Plus}
        handleMethod={handleAddClick}
      />
      <RenderSkills
        handleEditClick={handleEditClick}
        handleDelClick={handleDelClick}
      />
      <ManageSkillPopup
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        editData={selectedItem}
        setEditData={setSelectedItem}
      />
      <DeleteSkillPopup
        isDelPopupOpen={isDelPopupOpen}
        setIsDelPopupOpen={setIsDelPopupOpen}
        itemName={`${itemToDelete?.title} - ${itemToDelete?.order}`}
        onDelete={handleDelete}
        isLoading={loading}
      />
    </>
  );
};

export default SkillsPage;
