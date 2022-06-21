import React, { useState, useEffect } from "react";

//components
import AdminHeader from "./AdminHeader";
import ShowActionBtns from "./AdminActionBtns";
import ShowCategoryModal from "./AdminCategoryModal";
import ShowProductModal from "./AdminProductModal";
import AdminBody from "./AdminBody";

//redux
import { useDispatch } from "react-redux";
import { getCategories } from "../redux/actions/categoryActions";
import { getProducts } from "../redux/actions/productActions";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  /**********************
   * LIFECYCLE METHODS
   **********************/
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  /****************************
   * COMPONENT STATE PROPERTIES
   ***************************/
  const [appearingCategoryModal, setAppearingCategoryModal] = useState(false);
  const [appearingFoodModal, setAppearingFoodModal] = useState(false);

  return (
    <section>
      <AdminHeader />
      <ShowActionBtns
        setAppearingCategoryModal={setAppearingCategoryModal}
        setAppearingFoodModal={setAppearingFoodModal}
      />

      <ShowCategoryModal
        setAppearingCategoryModal={setAppearingCategoryModal}
        appearingCategoryModal={appearingCategoryModal}
      />
      <ShowProductModal
        setAppearingFoodModal={setAppearingFoodModal}
        appearingFoodModal={appearingFoodModal}
      />
      <AdminBody />
    </section>
  );
};

export default AdminDashboard;
