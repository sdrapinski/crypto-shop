import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CategoriesInterface } from "../../interfaces/categories.interface";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const categoriesInit = [{ product_category_id: 0, product_category_name: "",product_category_image:""  }]

const Categories = () => {
  const [categories, setcategories] =
    useState<CategoriesInterface[]>(categoriesInit);

  useEffect(() => {
    axios
      .get(`${backendUrl}/offer/Categories`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((resp) => {
        console.log(resp.data);
        
        setcategories(resp.data);
      });

    return () => {};
  }, []);
  return (
    <div className="category-grid">
      {categories.map((category, index) => (
        <NavLink
          key={index}
          to={`/products/category/${category.product_category_id}`}
        >
          <div className="category-item">
            <div className="category-image">
              <img
                src={category.product_category_image as string}
                alt={category.product_category_name}
              />
            </div>
            <div className="category-name">
              {category.product_category_name}
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Categories;
