import React, { useContext } from "react";
import { AppContext } from "../../state/AppContext";
import {
  CartInterface,
  CartItem,
  Product,
} from "../../interfaces/CartInterface";

const UserCart = () => {
  const appContext = useContext(AppContext);
  const cart = appContext?.cart;

  const groupByProductId = (cartItems: CartItem[]) => {
    return cartItems.reduce<{ [key: string]: number }>((acc, item) => {
      const { product_id, quantity } = item;
      acc[product_id] = (acc[product_id] || 0) + quantity;
      return acc;
    }, {});
  };

  return (
    <div className="user-cart-container">
      {Object.entries(groupByProductId(cart?.cartItems || [])).map(
        ([productId, quantity]) => {
          const product: Product | undefined = cart?.cartItems.find(
            (item) => item.product_id === productId
          )?.product;
          return (
            <div className="cart-item" key={productId}>
              {" "}
              {/* Dodaj klasę dla elementu koszyka */}
              <span className="product-name">{product?.product_name}</span>{" "}
              <span className="product-price">
                {product?.product_dollar_price}$
              </span>
              {quantity > 1 && (
                <span className="quantity"> - Quantity: {quantity}</span>
              )}
            </div>
          );
        }
      )}
    </div>
  );
};

export default UserCart;
