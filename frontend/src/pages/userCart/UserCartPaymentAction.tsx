import React, { useContext } from "react";
import { AppContext } from "../../state/AppContext";

interface UserCartPaymentActionProps {
  cartQuantity:number
}

const UserCartPaymentAction:React.FC<UserCartPaymentActionProps> = ({cartQuantity}) => {
    const appContext = useContext(AppContext);
    const delivery = 5
    const cart = appContext?.cart;

   const cartValue = cart?.cartItems.reduce((acc,curr)=>acc+ curr.product.product_dollar_price * curr.quantity,0)

  return (
    <div className='userCart__container-payment'>
        <div className="userCart__valueOfProducts">Value of products: <span>{cartValue}$</span> </div>
        <div className="userCart__valueOfProducts">delivery from: <span>{delivery}$</span> </div>
        {
          cartQuantity > 0 ? <a href="/payment"><button>Go to payments</button> </a>  : <button disabled>You have nothing in your cart</button>
        }
        
    </div>
  )
}

export default UserCartPaymentAction