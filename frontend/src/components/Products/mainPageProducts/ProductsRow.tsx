import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { mainPageProductsInterface } from "../../../interfaces/product.interface";

interface ProductsRowProps {
  products: mainPageProductsInterface[];
}

const ProductsRow: React.FC<ProductsRowProps> = (props) => {
  const [isHovered, setIsHovered] = useState("");

  const handleMouseEnter = (id: string) => {
    setIsHovered(id);
  };

  const handleMouseLeave = () => {
    setIsHovered("");
  };

  return (
    <section className="MainPageProducts">
      <h3> {props.products[0].products_category.product_category_name}</h3>
      <div className="MainPageProducts__container">
        {props.products.map((item, index) => (
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
