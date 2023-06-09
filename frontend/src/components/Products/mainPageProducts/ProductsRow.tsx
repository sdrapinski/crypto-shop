import React, { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { AppContext } from "../../../state/AppContext";
import axios from "axios";
import { mainPageProductsInterface } from "../../../interfaces/product.interface";

const ProductsRow = () => {
  const [isHovered, setIsHovered] = useState("");
  const [items, setitems] = useState<mainPageProductsInterface[]>([]);

  const appContext = useContext(AppContext);
  // useEffect(() => {
  //   axios
  //     .get<mainPageProductsInterface[]>(
  //       `${appContext?.backendUrl}/mainPageProducts`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //       }
  //     )
  //     .then((resp) => {
  //       setitems(resp.data);
  //     });

  //   return () => {};
  // }, []);

  const handleMouseEnter = (id: string) => {
    setIsHovered(id);
  };

  const handleMouseLeave = () => {
    setIsHovered("");
  };

  return (
    <section className="MainPageProducts">
      <h3> New Products</h3>
      <div className="MainPageProducts__container">
        {items.map((item, index) => (
          <ProductCard
            key={index}
            product={item}
            handleMouseLeave={handleMouseLeave}
            handleMouseEnter={handleMouseEnter}
            isHovered={isHovered}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsRow;
