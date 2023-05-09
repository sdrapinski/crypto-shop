import React from "react";
import { NavLink } from "react-router-dom";

const categories = [
  {
    name: "Kategoria1",
    imageSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Kategoria2",
    imageSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Kategoria3",
    imageSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Kategoria4",
    imageSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Kategoria5",
    imageSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Kategoria6",
    imageSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Kategoria7",
    imageSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Kategoria8",
    imageSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Kategoria9",
    imageSrc: "https://via.placeholder.com/150",
  },
];

const Categories = () => {
  return (
    <div className="category-grid">
      {categories.map((category, index) => (
        <NavLink to={`/products/category/${category.name}`}>
          <div key={index} className="category-item">
            <div className="category-image">
              <img src={category.imageSrc} alt={category.name} />
            </div>
            <div className="category-name">{category.name}</div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Categories;
