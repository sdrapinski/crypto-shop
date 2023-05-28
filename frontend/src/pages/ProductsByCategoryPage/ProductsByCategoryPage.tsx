import React from "react";
import { useParams } from "react-router-dom";
const ProductsByCategoryPage = () => {
  const { categoryId } = useParams();
  return <div>Productspage {categoryId}</div>;
};

export default ProductsByCategoryPage;
