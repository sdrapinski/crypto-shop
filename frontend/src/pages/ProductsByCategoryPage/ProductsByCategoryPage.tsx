import React, { useEffect, useContext } from "react";

import { useParams } from "react-router-dom";
import Filters from "../../components/Products/productsPage/Filters";
import axios from "axios";
import { AppContext } from "../../state/AppContext";

const ProductsByCategoryPage = () => {
  const { categoryId } = useParams();
  const appcontext = useContext(AppContext);
  useEffect(() => {
    axios
      .get(`${appcontext?.backendUrl}/products/${categoryId}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((resp) => {
        console.log(resp);
      });

    return () => {};
  }, []);
  return (
    <div className="productsListPage">
      <Filters category={categoryId!} />
    </div>
  );
};

export default ProductsByCategoryPage;
