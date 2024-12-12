import React,{useContext,useState,useEffect} from 'react'
import { AppContext } from '../../state/AppContext';
import { useNavigate } from 'react-router-dom';
import useAxiosCrypto from '../../hooks/useAxiosCrypto';
import { CurrentCryptoPriceInterface } from '../../interfaces/CurrentCryptoPrice.Interface';
import DeliveryComponent from '../../components/Delivery/DeliveryComponent';
import PaymentComponent from '../../components/Payments/PaymentComponent';
import PayWithEthComponent from '../../components/Payments/PayWithEthComponent';

enum PaymentOption {
  Null = "Null",
  Stripe = "STRIPE",
  Eth = "ETH"
}

const PaymentPage = () => {
  const [ethereum, setEthereum] = useState<CurrentCryptoPriceInterface | null>(null)
  const api = useAxiosCrypto()
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const gatename="WK";
  const {user,cart} = appContext!
  const [isPaymentVisible, setIsPaymentVisible] = useState<PaymentOption>(PaymentOption.Null);

  const productSuccessfullyBoughtFunction =()=>{
    navigate('/payment-summary');
  };


    useEffect(() => {
      api
      .get<CurrentCryptoPriceInterface>(`/coins/ethereum`)
      .then((resp) => {
       setEthereum(resp.data)
      
      });
    }, [])

    const handlePaymentVisibleChange = (option :PaymentOption) => {
      setIsPaymentVisible(option);
    };

  const calculateTotalPrice = () => {
    return cart.cartItems.reduce((total, item) => {
      return total + item.product.product_dollar_price * item.quantity;
    }, 0);
  };
  const totalPriceUSD = calculateTotalPrice();
  const totalPriceETH = ethereum
    ? totalPriceUSD / ethereum.market_data.current_price.usd
    : null;

    return (
      <div className="payment-page">
        <div className="payment-page__left">
          <div className="section">
            <div className="section__title">Shipping Details</div>
            <div className="section__content">
              <ul>
                <li>{user?.user_name} {user?.user_surname}</li>
                <li>{user?.user_region.street}</li>
                <li>{user?.user_region.postCode} {user?.user_region.city}</li>
                <li>{user?.user_phone_number}</li>
              </ul>
              <button>Edit data</button>
            </div>
          </div>
          <div className="section">
            <div className="section__title">Shipping Methods</div>
           <DeliveryComponent />
          </div>
          <div className="section">
            <div className="section__title">Payment Methods</div>
            <div className="payment-options">
            <div className="custom-checkbox" >
              <div
              onClick={()=>handlePaymentVisibleChange(PaymentOption.Stripe)}
              className={isPaymentVisible===PaymentOption.Stripe? "payment--visible custom-checkbox__image" : "custom-checkbox__image"}
                style={{
                  backgroundImage: `url('https://tap2pay.me/wp-content/uploads/2019/11/payment-methods-with-circle_23-2147674741-1-750x423@2x.jpg')`, // Background image URL
                }}
              />
                
            </div> <br />
            <div className="custom-checkbox" >
              <div
              onClick={()=>handlePaymentVisibleChange(PaymentOption.Eth)}
              className={isPaymentVisible===PaymentOption.Eth? "payment--visible custom-checkbox__image" : "custom-checkbox__image"}
                style={{
                  backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwCAvSY0dYnw15GZ6eoDhKGOFIbT5pmfPfbw&s')`, // Background image URL
                }}
              />
                
            </div>
          </div>
          </div>
        </div>
    
        <div className="payment-page__right">
          <div className="section">
            <div className="section__title">Summary</div>
            <div className="section__content">
              Products value: {totalPriceUSD.toFixed(2)}$ <br />
              {totalPriceETH && (
                <>Products ETH value: {totalPriceETH.toFixed(6)} ETH</>
              )}
            </div>
            {isPaymentVisible===PaymentOption.Stripe ?
              <div> 
                <PaymentComponent amount={totalPriceUSD} gate={gatename} productSuccessfullyBoughtFunction={productSuccessfullyBoughtFunction}/>
                </div>
              : ethereum ?
                <PayWithEthComponent ethPrice={ethereum} productSuccessfullyBoughtFunction={productSuccessfullyBoughtFunction}/>
                :<div>Something went wrong</div>
             }
            
            
          </div>
        </div>
      </div>
    );
    
}

export default PaymentPage

