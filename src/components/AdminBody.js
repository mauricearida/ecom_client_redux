import React from "react";

//redux
import { useSelector } from "react-redux";

//components
import Card from "./Card";

const AdminBody = () => {
  const { products } = useSelector((state) => state.products);
  console.log("products", products.length);
  return (
    <div className="container">
      <div className="row">
        {products &&
          products.map((product) => (
            <Card key={product._id} product={product} adminPage={true} />
          ))}
      </div>
    </div>
  );
};

export default AdminBody;
