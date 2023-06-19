import React, { useContext, useEffect, useState } from "react";
import ProductsRow from "./ProductsRow";
import axios from "axios";
import { AppContext } from "../../../state/AppContext";
import { mainPageProductsInterface } from "../../../interfaces/product.interface";

const MainPageProducts = () => {
  const appContext = useContext(AppContext);
  const [items, setitems] = useState<Array<Array<mainPageProductsInterface>>>(
    []
  );
  useEffect(() => {
    axios
      .get<Array<Array<mainPageProductsInterface>>>(
        `${appContext?.backendUrl}/mainPageProducts`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        setitems(resp.data);
        console.log(resp.data);
      });

    return () => {};
  }, []);
  return (
    <div>
      {items.length > 0 ? (
        <>
          <ProductsRow products={items[0]} />
          <ProductsRow products={items[1]} />
          <ProductsRow products={items[2]} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MainPageProducts;
