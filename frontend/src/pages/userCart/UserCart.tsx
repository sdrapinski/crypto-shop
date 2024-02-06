import React, { useContext } from "react";
import { AppContext } from "../../state/AppContext";

const UserCart = () => {
  const appContext = useContext(AppContext);
  const cart = appContext?.cart;
  return (
    <div>
      {cart?.cartItems.map((item) => (
        <div>
          {item.product.product_name} {item.product.product_dollar_price}$
        </div>
      ))}
    </div>
  );
};

export default UserCart;
