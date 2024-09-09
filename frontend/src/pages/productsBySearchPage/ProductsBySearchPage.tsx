import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../state/AppContext";
import axios from "axios";
import Filters from "../../components/Products/productsPage/Filters";
import DisplayProducts from "../../components/Products/productsPage/DisplayProducts";
import { mainPageProductsInterface } from "../../interfaces/product.interface";

const ProductsBySearchPage = () => {
  const { query } = useParams();
  const [products, setProducts] = useState<mainPageProductsInterface[]>();

  const appcontext = useContext(AppContext);

  useEffect(() => {
    axios
      .get<mainPageProductsInterface[]>(
        `${appcontext?.backendUrl}/offer/searchProduct/${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        setProducts(resp.data);
      });

    return () => {};
  }, [query, appcontext?.backendUrl]);

  return (
    <div className="productsListPage">
      <Filters category={query!} setProducts={setProducts} />
      <DisplayProducts products={products!} />
    </div>
  );
};

export default ProductsBySearchPage;
