import React from "react";
import { ProductPageProductsInterface } from "../../../interfaces/product.interface";
import { NavLink } from "react-router-dom";

interface ProductProps {
  product: ProductPageProductsInterface;
}

const Product: React.FC<ProductProps> = (props) => {
  const { product } = props;
  const date = new Date(product.product_added_time);
  const formattedDate = date.toLocaleDateString("pl-PL");
  const popularityClass =
    product.product_popularity < 4
      ? "text-danger"
      : product.product_popularity < 7
      ? "text-warning"
      : "text-success";
  
  return (
    <div className="container">
      <div className="card my-3">
        <div className="card-header">
          <h5>{product.product_name}</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <img
                src={product.product_images}
                className="card-img"
                alt=""
              ></img>
            </div>
            <div className="col-6">
              <div className="card mb-2">
                <div className="card-header">
                  <strong>Description:</strong>
                </div>
                <div className="card-body">
                  <div className="mb-2">{product.product_description}</div>
                  <div>
                    <strong>Data added:</strong>
                  </div>
                  <div className="mb-2">{formattedDate}</div>
                  <div>
                    <strong>Added by:</strong>
                  </div>
                  <div>{product.user.user_name} {product.user.user_surname}</div>
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-header">
                  <strong>Details:</strong>
                </div>
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <strong>Price: </strong>
                    <strong className="text-success">
                      {product.product_dollar_price} $
                    </strong>
                  </div>
                  <div>
                    <strong>Quantity: </strong>
                    <strong className="text-primary">
                      {product.product_quantity}
                    </strong>
                  </div>
                  <div>
                    <strong>Popularity: </strong>
                    <strong className={popularityClass}>
                      {product.product_popularity}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-end">
          <NavLink to={`/product/${product.product_id}`}>
            <button
              className="btn btn-primary d-flex align-items-center hstack gap-1"
              title="Show more details"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search-heart"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z" />
                <path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z" />
              </svg>
              Show
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Product;
