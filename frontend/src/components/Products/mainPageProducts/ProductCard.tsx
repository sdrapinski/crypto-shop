import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { mainPageProductsInterface } from "../../../interfaces/product.interface";

interface CardProps {
  product: mainPageProductsInterface;
  handleMouseEnter: (id: string) => void;
  handleMouseLeave: () => void;
  isHovered: string;
}

const ProductCard: React.FC<CardProps> = (props) => {
  const { product } = props;
  return (
    <NavLink to={`/product/${product.product_id}`}>
      <div
        className={`productCard ${
          props.isHovered === product.product_id
            ? "hovered"
            : props.isHovered === ""
            ? ""
            : "not-hovered"
        }`}
        onMouseEnter={() => props.handleMouseEnter(product.product_id)}
        onMouseLeave={props.handleMouseLeave}
      >
        <div
          className="productCard__background"
          style={{ backgroundImage: `url(${product.product_images})`}}
        >
          <div className="productCard__content">
            <h4 className="productCard__heading">{product.product_name}</h4>
            <h5 className="productCard__heading">
              Price: ${product.product_dollar_price}
            </h5>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default ProductCard;
