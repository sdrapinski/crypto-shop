import React, { useContext, useEffect } from "react";
import ProductsRow from "./ProductsRow";
import axios from "axios";
import { AppContext } from "../../../state/AppContext";

const MainPageProducts = () => {
  const appContext = useContext(AppContext);
  useEffect(() => {
    axios
      .get<[]>(`${appContext?.backendUrl}/mainPageProducts`, {
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
    <div>
      <ProductsRow />
      <ProductsRow />
      <ProductsRow />
    </div>
  );
};

export default MainPageProducts;
