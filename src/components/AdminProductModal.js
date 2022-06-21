import React, { useEffect, useState } from "react";
import isEmpty from "validator/lib/isEmpty";
import { Modal, ModalBody } from "reactstrap";

import { ShowLoading } from "../helpers/loading";
import { ShowErrorMsg, ShowSuccessMsg } from "../helpers/message";

//redux
import { useSelector, useDispatch } from "react-redux";
import { clearMessages } from "../redux/actions/messageActions";
import { createProduct } from "../redux/actions/productActions";

const Modall = ({ setAppearingFoodModal, appearingFoodModal }) => {
  /*******************************
   * REDUX GLOBAL STATE PROPERTIES
   ******************************/
  const dispatch = useDispatch();

  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const { loading } = useSelector((state) => state.loading);
  const { categories } = useSelector((state) => state.categories);

  /****************
   * COMPONENT STATE
   ****************/
  const [clientSideErrorMsg, setClientSideErrorMsg] = useState("");
  const [productData, setProductData] = useState({
    productImage: null,
    productName: "",
    productDesc: "",
    productPrice: "",
    productCategory: "",
    productQty: "",
  });

  const {
    productImage,
    productName,
    productDesc,
    productPrice,
    productCategory,
    productQty,
  } = productData;

  /****************
   * EVENT HANDLERS
   ****************/

  const handleMessages = (e) => {
    dispatch(clearMessages());
  };

  const handleProductChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();

    if (productImage === null) {
      console.log("first");
      setClientSideErrorMsg("Please select an image");
      console.log("second");
    } else if (
      isEmpty(productName) ||
      isEmpty(productDesc) ||
      isEmpty(productPrice)
    ) {
      setClientSideErrorMsg("All fields are required");
    } else if (isEmpty(productCategory)) {
      setClientSideErrorMsg("Please select a category");
    } else if (isEmpty(productQty)) {
      setClientSideErrorMsg("Please select a quantity");
    } else {
      let formData = new FormData();
      formData.append("productImage", productImage);
      formData.append("productName", productName);
      formData.append("productDesc", productDesc);
      formData.append("productPrice", productPrice);
      formData.append("productCategory", productCategory);
      formData.append("productQty", productQty);

      dispatch(createProduct(formData));

      setProductData({
        productImage: null,
        productName: "",
        productDesc: "",
        productPrice: "",
        productCategory: "",
        productQty: "",
        //setSuccessMsg(response.data.successMessage);
      });
    }
  };

  const handleProductImage = (e) => {
    console.log("e.target.files[0]", e.target.files[0]);
    console.log("e.target.name", e.target.name);
    setProductData({
      ...productData,
      [e.target.name]: e.target.files[0],
    });
  };

  return (
    <Modal
      // onClick={handleMessages}
      isOpen={appearingFoodModal}
      // isOpen={true}
      toggle={() => setAppearingFoodModal(!appearingFoodModal)}
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
        <h1 style={{ marginTop: "auto", marginBottom: "auto" }}>Add Food</h1>
      </div>
      <ModalBody>
        <div className="modal-content">
          <form onSubmit={handleProductSubmit}>
            <div className="modal-header bg-warning text-white">
              <h5 className="modal-title">Add Food</h5>
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
                  <div className="custom-file mb-2">
                    <input
                      className="custom-file-input"
                      type="file"
                      name="productImage"
                      onChange={handleProductImage}
                    />
                    <label className="custom-file-label">Choose File</label>
                  </div>
                  <div className="form-group">
                    <label type="text" className="text-secondary">
                      Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="productName"
                      value={productName}
                      onChange={handleProductChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-secondary">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="productDesc"
                      value={productDesc}
                      onChange={handleProductChange}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label className="text-secondary">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      name="productPrice"
                      value={productPrice}
                      onChange={handleProductChange}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label className="text-secondary">Category</label>
                      <select
                        className="custom-select mr-sm-2"
                        name="productCategory"
                        onChange={handleProductChange}
                      >
                        <option value="">Choose one...</option>
                        {categories.map((c) => {
                          return (
                            <option key={c._id} value={c._id}>
                              {c.category}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label className="text-secondary">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        min="0"
                        max="1000"
                        name="productQty"
                        value={productQty}
                        onChange={handleProductChange}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                onClick={() => {
                  setClientSideErrorMsg("");
                  setAppearingFoodModal(false);
                  //   setSuccessMsg("");
                  //     setCategory("");
                }}
                className="btn btn-secondary"
              >
                Close
              </button>
              <button type="submit" className="btn btn-warning text-white">
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
