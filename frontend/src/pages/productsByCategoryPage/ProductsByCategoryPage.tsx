import React, { useEffect, useContext, useState } from "react";

import { useParams } from "react-router-dom";
import Filters from "../../components/Products/productsPage/Filters";
import axios from "axios";
import { AppContext } from "../../state/AppContext";
import { ProductPageProductsInterface } from "../../interfaces/product.interface";
import DisplayProducts from "../../components/Products/productsPage/DisplayProducts";
import { Row } from "react-bootstrap";

const ProductsByCategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState<ProductPageProductsInterface[]>();

  const appcontext = useContext(AppContext);
  useEffect(() => {
    axios
      .get<ProductPageProductsInterface[]>(
        `${appcontext?.backendUrl}/offer/offersincategory/${categoryId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        
        setProducts(resp.data);
      });

    return () => {};
  }, [categoryId,appcontext?.backendUrl]);
  
 
  
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
