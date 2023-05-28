import React from "react";
import { useParams } from "react-router-dom";
const ProductsBySearchPage = () => {
  const { query } = useParams();
  return <div>ProductsBySearchPage {query} </div>;
};

export default ProductsBySearchPage;
