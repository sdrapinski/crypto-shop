import React from "react";
import { ProductsArrayInterface } from "../../../interfaces/product.interface";
import Product from "./Product";
import { Col } from "react-bootstrap";

const DisplayProducts: React.FC<ProductsArrayInterface> = (props) => {
  const { products } = props;
  console.log(props);

  return (
    <Col>
      {products &&
        products.map((product) => (
          <Product key={product.product_id} product={product} />
        ))}
    </Col>
  );
};

export default DisplayProducts;
