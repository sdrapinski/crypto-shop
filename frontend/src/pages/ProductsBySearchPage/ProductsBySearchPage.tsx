import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../state/AppContext";
import axios from "axios";
import Filters from "../../components/Products/productsPage/Filters";
const ProductsBySearchPage = () => {
  const { query } = useParams();

  const appcontext = useContext(AppContext);
  useEffect(() => {
    axios
      .get(`${appcontext?.backendUrl}/searchProduct/${query}`, {
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
      <Filters category={query!} />
    </div>
  );
};

export default ProductsBySearchPage;
