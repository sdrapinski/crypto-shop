import React from "react";

const categories = [
  {
    name: "Kategoria 1",
    imageSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Kategoria 2",
    imageSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Kategoria 3",
    imageSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Kategoria 4",
    imageSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Kategoria 5",
    imageSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Kategoria 6",
    imageSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Kategoria 7",
    imageSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Kategoria 8",
    imageSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Kategoria 9",
    imageSrc: "https://via.placeholder.com/150",
  },
];

const Categories = () => {
  return (
    <div className="category-grid">
      {categories.map((category, index) => (
        <div key={index} className="category-item">
          <div className="category-image">
            <img src={category.imageSrc} alt={category.name} />
          </div>
          <div className="category-name">{category.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
