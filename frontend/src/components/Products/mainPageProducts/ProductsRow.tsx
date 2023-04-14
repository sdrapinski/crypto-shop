import React, { useState } from "react";
import ProductCard from "./ProductCard";

const items = [1, 2, 3, 4, 5, 6];

const ProductsRow = () => {
  const [isHovered, setIsHovered] = useState(0);

  const handleMouseEnter = (id: number) => {
    setIsHovered(id);
  };

  const handleMouseLeave = () => {
    setIsHovered(0);
  };

  return (
    <section className="MainPageProducts">
      <h3> New Products</h3>
      <div className="MainPageProducts__container">
        {items.map((item) => (
          <ProductCard
            key={item}
            id={item}
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
