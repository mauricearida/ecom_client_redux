import isEmpty from "validator/lib/isEmpty";
import { Modal, ModalBody } from "reactstrap";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCategories } from "../api/category";
import { ShowLoading } from "../helpers/loading";
import { clearMessages } from "../redux/actions/messageActions";
import { ShowErrorMsg, ShowSuccessMsg } from "../helpers/message";
import { createCategory } from "../redux/actions/categoryActions";

const Modall = ({ appearingCategoryModal, setAppearingCategoryModal }) => {
  const dispatch = useDispatch();
  //const [appearingCategoryModal, setAppearingCategoryModal] = useState(false);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const { loading } = useSelector((state) => state.loading);
  const [clientSideErrorMsg, setClientSideErrorMsg] = useState("");
  const [productData, setProductData] = useState({
    productImage: null,
    productName: "",
    productDesc: "",
    productPrice: "",
    productCategory: "",
    productQty: "",
  });
  /**********************
   * LIFECYCLE METHODS
   **********************/

  const loadCategories = async () => {
    await getCategories()
      .then((response) => {
        setCategories(response.data.categories);
        console.log(categories, "asd");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    loadCategories();
  }, [loading]);

  const handleCategoryChange = (e) => {
    dispatch(clearMessages());
    setCategory(e.target.value);
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (isEmpty(category)) {
      setClientSideErrorMsg("Please enter a category");
    } else {
      const data = { category };
      dispatch(createCategory(data));
      setCategory("");
    }
  };
  return (
    <Modal
      // onClick={handleMessages}
      isOpen={appearingCategoryModal}
      // isOpen={true}
      toggle={() => setAppearingCategoryModal(!appearingCategoryModal)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(229, 229, 229)",
          height: "40px",
          borderTopRightRadius: "15px",
          borderTopLeftRadius: "15px",
        }}
      >
        <h1 style={{ marginTop: "auto", marginBottom: "auto" }}>
          Add A Category
        </h1>
      </div>
      <ModalBody>
        <div className="modal-content">
          <form onSubmit={handleCategorySubmit}>
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">Add Category</h5>
              <button className="close">
                <span>
                  <i className="fas fa-times"></i>
                </span>
              </button>
            </div>
            <div className="modal-body my-2">
              {clientSideErrorMsg && ShowErrorMsg(clientSideErrorMsg)}
              {errorMsg && ShowErrorMsg(errorMsg)}
              {successMsg && ShowSuccessMsg(successMsg)}
              {loading ? (
                <div className="text-center">{ShowLoading()}</div>
              ) : (
                <>
                  <label className="text-secondary">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    value={category}
                    onChange={handleCategoryChange}
                  />
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                onClick={() => {
                  setClientSideErrorMsg("");
                  // setSuccessMsg("");
                  setCategory("");
                  setAppearingCategoryModal(false);
                }}
                className="btn btn-secondary"
              >
                Close
              </button>
              <button type="submit" className="btn btn-info">
                Submit
              </button>
            </div>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Modall;
