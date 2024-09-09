import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../state/AppContext";
import { mainPageProductsInterface } from "../../interfaces/product.interface";
import DisplayProducts from "../../components/Products/productsPage/DisplayProducts";
import Filters from "../../components/Products/productsPage/Filters";

const ProductsByCategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState<mainPageProductsInterface[]>();

  const appcontext = useContext(AppContext);
  useEffect(() => {
    axios
      .get<mainPageProductsInterface[]>(
        `${appcontext?.backendUrl}/offer/offersincategory/${categoryId}`,
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
  }, [categoryId, appcontext?.backendUrl]);

  return (
    <div className="productsListPage">
      <div className="productsListContainer">
        <div className="productsColumn">
          <DisplayProducts products={products!} />
        </div>
        <div className="filtersColumn">
          <Filters category={categoryId!} setProducts={setProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductsByCategoryPage;
