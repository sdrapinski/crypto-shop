import React from "react";
import { mainPageProductsInterface } from "../../../interfaces/product.interface";

interface ProductProps {
  product: mainPageProductsInterface;
}

const Product: React.FC<ProductProps> = (props) => {
  const { product } = props;
  return <div>{product.product_name}</div>;
};

export default Product;
