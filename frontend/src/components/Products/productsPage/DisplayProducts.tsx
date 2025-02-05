import React from "react";
import { NewProductsArrayInterface } from "../../../interfaces/product.interface";
import Product from "./Product";
import { Col } from "react-bootstrap";

const DisplayProducts: React.FC<NewProductsArrayInterface> = (props) => {
  const { products } = props;
  

  return (
    <Col>
      {products&& products.length > 0 ?
        products.map((product) => (
          <Product key={product.product_id} product={product} /> 
        )) : <div style={{color:"red"}}> No products to display</div>}
    </Col>
  );
};

export default DisplayProducts;
