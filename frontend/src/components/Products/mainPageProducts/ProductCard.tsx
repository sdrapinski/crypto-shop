import React, { useState } from "react";

interface CardProps {
  id: number;
  handleMouseEnter: (id: number) => void;
  handleMouseLeave: () => void;
  isHovered: Number;
}

const ProductCard: React.FC<CardProps> = (props) => {
  return (
    <div
      className={`productCard ${
        props.isHovered === props.id
          ? "hovered"
          : props.isHovered === 0
          ? ""
          : "not-hovered"
      }`}
      onMouseEnter={() => props.handleMouseEnter(props.id)}
      onMouseLeave={props.handleMouseLeave}
    >
      <div
        className="productCard__background"
        style={{ backgroundImage: "url(https://picsum.photos/230/300)" }}
      >
        <div className="productCard__content">
          <h4 className="productCard__heading">
            Product name {props.id.toString()}
          </h4>
          <h5 className="productCard__heading">Price: 20$</h5>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
