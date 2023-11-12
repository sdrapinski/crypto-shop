import React from "react";
import { mainPageProductsInterface } from "../../../interfaces/product.interface";
import { NavLink } from "react-router-dom";

interface ProductProps {
  product: mainPageProductsInterface;
}

const Product: React.FC<ProductProps> = (props) => {
  const { product } = props;
  const date = new Date(product.product_added_time);
  const formattedDate = date.toLocaleDateString("pl-PL");
  const popularityClass =
    product.product_popularity < 4
      ? "badge bg-low-priority rounded-pill d-flex justify-content-center align-items-center mw-50"
      : product.product_popularity < 7
      ? "badge bg-mid-priority rounded-pill d-flex justify-content-center align-items-center mw-50"
      : "badge bg-high-priority rounded-pill d-flex justify-content-center align-items-center mw-50";
  // return (
    <div className="container">
      <div className="card my-3">
        <div className="card-header">
          <h5>{product.product_name}</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <img
                src="https://via.placeholder.com/400x300"
                className="card-img"
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
                  <div>{product.user_id}</div>
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
  // );
  return(
    // <div className="container">
      <div className="p-3 my-2 border">
        <div className="row">
          <div className="col-3">
            <img src="https://via.placeholder.com/400x300" className="card-img"></img>
          </div>
          <div className="col-9">
            <div className="d-flex flex-column h-100">
            <div className="row mb-1">
              <div className="col-10">
                <h5>{product.product_name}</h5>
              </div>
              <div className="col-2 d-flex justify-content-end">
                <span className={popularityClass}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill me-1" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>{product.product_popularity}</span>
              </div>
            </div>
            <div className="row my-1">
              <div className="col-2">
                Data added:
              </div>
              <div className="col-10">
                {formattedDate}
              </div>
            </div>
            <div className="row my-1">
              <div className="col-2">
                Added by:
              </div>
              <div className="col-10">
                {product.user_id}
              </div>
            </div>
            <div className="row mt-auto">
              <div className="col-2">
                Price:
              </div>
              <div className="col-10">
                <strong>{product.product_dollar_price} $</strong>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Product;
