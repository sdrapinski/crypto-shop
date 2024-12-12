import React, { useContext, useEffect,useState } from "react";
import { AppContext } from "../../state/AppContext";
import {
  CartInterface,
  CartItem,
  Product,
} from "../../interfaces/CartInterface";
import UserCartPaymentAction from "./UserCartPaymentAction";


const UserCart = () => {
  const appContext = useContext(AppContext);
  const [userCart, setuserCart] = useState(appContext?.cart)
 
  
  

  useEffect(() => {
    
    setuserCart(appContext?.cart)
  }, [appContext?.cart])
  

  const groupByProductId = (cartItems: CartItem[]) => {
    return cartItems.reduce<{ [key: string]: number }>((acc, item) => {
      const { product_id, quantity } = item;
      acc[product_id] = (acc[product_id] || 0) + quantity;
      return acc;
    }, {});
  };

  const handleDeleteItem = (product_id:string)=>{
    appContext?.removeFromCart(product_id)
  }


  return (
    <div className="userCart__flex">
    <div className="userCart__container">

      {userCart && Object.entries(groupByProductId(userCart?.cartItems || [])).map(
        ([productId, quantity]) => {
          const product: Product | undefined = userCart?.cartItems.find(
            (item) => item.product_id === productId
          )?.product;
          return (
            <div className="userCart__item" key={productId}>
            <img
                src={product?.product_images}
                alt={product?.product_name}
              />
              <span className="userCart__product-name">{product?.product_name}</span>{" "}
              <span className="userCart__product-price">
                {product?.product_dollar_price}$
              </span>
              {quantity  && (
                <span className="userCart__quantity"> Quantity: {quantity}</span>
              )}
               {quantity && product!.product_dollar_price  &&(
              <span className="userCart__toal-per-item">  Total cost: <span> {quantity * product!.product_dollar_price}$ </span> </span>
               )}
               <span><button onClick={()=>handleDeleteItem(productId)}>Delete product</button></span>
            </div>
          );
        }
      )}
    </div>
    <UserCartPaymentAction cartQuantity={userCart?.cartItems.length || 0}/>
    </div>
  );
};

export default UserCart;
