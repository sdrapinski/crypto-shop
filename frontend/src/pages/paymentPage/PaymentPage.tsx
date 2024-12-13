import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../state/AppContext';
import { useNavigate } from 'react-router-dom';
import useAxiosCrypto from '../../hooks/useAxiosCrypto';
import { CurrentCryptoPriceInterface } from '../../interfaces/CurrentCryptoPrice.Interface';
import PaymentComponent from '../../components/Payments/PaymentComponent';
import PayWithEthComponent from '../../components/Payments/PayWithEthComponent';
import DeliveryComponent from '../../components/Delivery/DeliveryComponent';
import useAxios from '../../hooks/useAxios';
import { CartInterface } from '../../interfaces/CartInterface';



enum PaymentOption {
  Null = 'Null',
  Stripe = 'STRIPE',
  Eth = 'ETH',
}

interface DeliveryOptionInterface {
  delivery_price:number
  image:string
  id:string
  name:string
}



const PaymentPage = () => {
  const [ethereum, setEthereum] = useState<CurrentCryptoPriceInterface | null>(null);
  const [deliveryData, setDeliveryData] = useState({
    city: '',
    street: '',
    postcode: '',
    phoneNumber: '',
    email: '',
  });
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<DeliveryOptionInterface | null>();
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOptionInterface[] | []>([]);
  const [isPaymentVisible, setIsPaymentVisible] = useState<PaymentOption>(PaymentOption.Null);
  const [areAllProductsCryptoAllowed , setAreAllProductsCryptoAllowed ] = useState<boolean>(false);

  const apiCrypto = useAxiosCrypto();
  const appContext = useContext(AppContext);
  const api = useAxios(appContext!);
  const { user, cart } = appContext!;
  const navigate = useNavigate();
  const gatename = 'WK';

  const productSuccessfullyBoughtFunction = async () => {
   
    api
      .post(`/postPayment/createTransaction`, {
        buyerId:user?.user_id,
        cartItems:cart.cartItems,
        cart_id:cart.cart_id,
        deliveryData,
        deliveryOption:selectedDeliveryOption,
        notificationContent:"you bought an item"
      }
        
      ).then((response)=>{
       
        if(response.status ===200){
          if(user?.user_id){
            appContext?.getCart(user?.user_id)
          }
          navigate('/paymentSummary')
          
        }
        
      })
      .catch((err)=>{
        console.error(err)
      })
  };

  const checkIfAllProductsCryptoAllowed = (cart: CartInterface): boolean => {
    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
      return false; 
    }
  
    
    return cart.cartItems.every((item) => item.product.product_crypto);
  };


  useEffect(() => {
    
    api.get<DeliveryOptionInterface[]>("/postPayment/getSuppliers").then((resp)=>{

      
      
      setDeliveryOptions(resp.data)
      

    }).catch((err)=>{
      console.error(err)
    })
    
  }, [])

  useEffect(() => {
    setAreAllProductsCryptoAllowed(checkIfAllProductsCryptoAllowed(cart))
    
  
    return () => {
      
    }
  }, [cart])
  
  

  useEffect(() => {
    apiCrypto.get<CurrentCryptoPriceInterface>(`/coins/ethereum`).then((resp) => {
      setEthereum(resp.data);
    });
    if (user) {
      setDeliveryData({
        city: user.user_region.city,
        street: user.user_region.street,
        postcode: user.user_region.postCode,
        phoneNumber: user.user_phone_number,
        email: user.user_email,
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeliveryOptionChange = (option: DeliveryOptionInterface) => {
    setSelectedDeliveryOption(option);
  };

  const handlePaymentVisibleChange = (option: PaymentOption) => {
    setIsPaymentVisible(option);
  };

  const calculateTotalPrice = () => {
    const productsPrice = cart.cartItems.reduce((total, item) => {
      return total + item.product.product_dollar_price * item.quantity;
    }, 0);
    if(selectedDeliveryOption){
      return productsPrice + selectedDeliveryOption.delivery_price
    }
    return productsPrice 
  };

  const totalPriceUSD = calculateTotalPrice();
  const totalPriceETH = ethereum
    ? totalPriceUSD / ethereum.market_data.current_price.usd
    : null;

  return (
    <div className="payment-page">
      <div className="payment-page__left">
      <DeliveryComponent deliveryData={deliveryData}
          handleInputChange={handleInputChange}/>

        <div className="section">
          <div className="section__title">Shipping Methods</div>
          <div className="payment-options">
            {deliveryOptions.map((option) => (
              <div
                key={option.name}
                onClick={() => handleDeliveryOptionChange(option as DeliveryOptionInterface)}
                className={
                  selectedDeliveryOption?.name === option.name
                    ? 'payment--visible custom-checkbox__image payment-option__item'
                    : 'custom-checkbox__image payment-option__item'
                }
                style={{
                  backgroundImage: `url(${option.image})`,
                  
                }}
              >
               
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section__title">Payment Methods</div>
          <div className="payment-options">
            <div
              className={
                isPaymentVisible === PaymentOption.Stripe
                  ? 'payment--visible custom-checkbox__image payment-option__item'
                  : 'custom-checkbox__image payment-option__item'
              }
              onClick={() => handlePaymentVisibleChange(PaymentOption.Stripe)}
              style={{
                backgroundImage: `url('https://s3-eu-west-1.amazonaws.com/tpd/logos/50489e6800006400051ae0d6/0x0.png')`,
              }}
            />
            <div
              className={
                isPaymentVisible === PaymentOption.Eth
                  ? 'payment--visible custom-checkbox__image payment-option__item'
                  : 'custom-checkbox__image payment-option__item'
              }
              onClick={() => handlePaymentVisibleChange(PaymentOption.Eth)}
              style={{
                backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwCAvSY0dYnw15GZ6eoDhKGOFIbT5pmfPfbw&s')`,
              }}
            />
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
          {
            selectedDeliveryOption ? (
               isPaymentVisible === PaymentOption.Stripe ? (
              <PaymentComponent
                amount={totalPriceUSD}
                gate={gatename}
                productSuccessfullyBoughtFunction={productSuccessfullyBoughtFunction}
              />
            ) : ethereum && isPaymentVisible === PaymentOption.Eth ? (

              areAllProductsCryptoAllowed ? (
        <PayWithEthComponent
          ethPrice={ethereum}
          productSuccessfullyBoughtFunction={productSuccessfullyBoughtFunction}
        />
      ) : (
        <div className="pay-with-eth-disabled">
          <p>Not all products support crypto payments.</p>
          <button disabled className="btn btn-secondary">
            Pay with ETH
          </button>
        </div>
      )
            ) : (
              <div>Select Payment option</div>
            )
          ):<div>Choose payment and delivery options </div>
          }
          
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
