"use client";
import React, { useEffect, useState } from "react";
import ContentTitle from "@/components/ContentTitle";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, fetchCategories, fetchSkills } from "@/store/slices/skillSlice";
import RenderCategories from "./RenderCategories";
import ManageCategoryPopup from "./ManageCategoryPopup";
import DeleteCategoryPopup from "./DeleteCategoryPopup";

const CategoriesPage = ({ route }) => {
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
      dispatch(deleteCategory(itemToDelete.id));
      setIsDelPopupOpen(false);
      setItemToDelete(null);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSkills());
  }, []);

  return (
    <>
      <ContentTitle
        title={"Manage Categories"}
        btnTitle={"Add Category"}
        Icon={Plus}
        handleMethod={handleAddClick}
      />
      <RenderCategories
        route={route}
        handleEditClick={handleEditClick}
        handleDelClick={handleDelClick}
      />
      <ManageCategoryPopup
        route={route}
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        editData={selectedItem}
        setEditData={setSelectedItem}
      />
      <DeleteCategoryPopup
        isDelPopupOpen={isDelPopupOpen}
        setIsDelPopupOpen={setIsDelPopupOpen}
        itemName={`${itemToDelete?.title} - ${itemToDelete?.skill.title}`}
        onDelete={handleDelete}
        isLoading={loading}
      />
    </>
  );
};

export default CategoriesPage;
