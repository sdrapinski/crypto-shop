import React from "react";
import { ProductsArrayInterface } from "../../../interfaces/product.interface";
import Product from "./Product";

const DisplayProducts: React.FC<ProductsArrayInterface> = (props) => {
  const { products } = props;
  console.log(props);

  return (
    <div>
      <div className="container">
      {products &&
        products.map((product) => (
          <Product key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default DisplayProducts;
