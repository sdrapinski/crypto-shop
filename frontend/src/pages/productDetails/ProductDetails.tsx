import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../state/AppContext";
import { ProductDetailsInterface } from "../../interfaces/product.interface";

const ProductDetails = () => {
  const { productId } = useParams();
  const appcontext = useContext(AppContext);
  const [product, setProduct] = useState<ProductDetailsInterface | null>();

  useEffect(() => {
    axios
      .get<ProductDetailsInterface>(
        `${appcontext?.backendUrl}/offer/product/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        
        setProduct(resp.data);
      });

    return () => {};
  }, []);

  const handleAddProduct = () => {
    if(appcontext?.user){
      appcontext?.addToCart(productId!.toString());
    }
   
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  const addedTime = new Date(product.product_added_time);
  const addedDate = addedTime.toLocaleDateString();

  return (
    <div className="product-container">
      <div className="product-page">
        <div className="product-info">
          <div className="product-name">{product.product_name}</div>
          <div className="product-image">
            <img
              src={product.product_images}
              alt={product.product_name}
            />
          </div>
        </div>
        <div className="product-details">
          <div className="product-user">
            <p>
              Added by: <span> {product.user.user_name} </span>{" "}
            </p>
          </div>
          <p
            className={`product-popularity ${
              product.product_popularity < 4
                ? "low-popularity"
                : product.product_popularity < 7
                ? "medium-popularity"
                : "high-popularity"
            }`}
          >
            Popularity: {product.product_popularity}/10
          </p>
          <p className="product-added">Added: {addedDate}</p>

          <hr className="separator" />
          <p className="product-price">
            Price: <span> {product.product_dollar_price}$ </span>
          </p>
          <p className="product-quantity">
            Quantity: {product.product_quantity}
          </p>
          <hr className="separator" />
          <button onClick={handleAddProduct} disabled={!appcontext?.user}> {appcontext?.user? "Add to cart" : "Login first"}</button>
        </div>
      </div>
      <div className="product-additionalInfo">
        <hr className="separator" />
        <div className="product-description">{product.product_description}</div>
      </div>
    </div>
  );
};

export default ProductDetails;
