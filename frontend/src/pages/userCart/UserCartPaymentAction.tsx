import React, { useContext } from "react";
import { AppContext } from "../../state/AppContext";

const UserCartPaymentAction = () => {
    const appContext = useContext(AppContext);
    const delivery = 5
    const cart = appContext?.cart;

   const cartValue = cart?.cartItems.reduce((acc,curr)=>acc+ curr.product.product_dollar_price,0)

  return (
    <div className='userCart__container-payment'>
        <div className="userCart__valueOfProducts">Value of products: <span>{cartValue}$</span> </div>
        <div className="userCart__valueOfProducts">delivery from: <span>{delivery}$</span> </div>
        <a href="/payment"><button>Go to payments</button> </a> 
    </div>
  )
}

export default UserCartPaymentAction