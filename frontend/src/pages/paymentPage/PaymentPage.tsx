import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../state/AppContext';
import { useNavigate } from 'react-router-dom';
import useAxiosCrypto from '../../hooks/useAxiosCrypto';
import { CurrentCryptoPriceInterface } from '../../interfaces/CurrentCryptoPrice.Interface';
import PaymentComponent from '../../components/Payments/PaymentComponent';
import PayWithEthComponent from '../../components/Payments/PayWithEthComponent';
import DeliveryComponent from '../../components/Delivery/DeliveryComponent';

enum PaymentOption {
  Null = 'Null',
  Stripe = 'STRIPE',
  Eth = 'ETH',
}

enum DeliveryOptionName {
  InPost = 'InPost',
  DPD = 'DPD',
  DHL = 'DHL',
  Courier = 'Courier',
}

interface DeliveryOption {
  name :DeliveryOptionName
  value:string
  image:string
  cost:number
}

const deliveryOptions: DeliveryOption[]= [
  { name: DeliveryOptionName.InPost, value: "inpost", image: "https://www.kurjerzy.pl/blog/wp-content/uploads/2020/11/blog_892.jpg",cost:2 },
  { name: DeliveryOptionName.DPD, value: "dpd", image: "https://www.sote.pl/media/products/41f921bce3362f5e9c40d50d42c217ec/images/thumbnail/large_product.webp?lm=1681987962",cost:4 },
  { name: DeliveryOptionName.DHL, value: "dhl", image: "https://jakimkurierem.pl/logo_kuriera/dhl_logo.svg",cost:5 },
  { name: DeliveryOptionName.Courier, value: "courier", image: "https://us.123rf.com/450wm/pxlprostudio/pxlprostudio1905/pxlprostudio190500365/122523251-ikona-zwi%C4%85zana-z-dostaw%C4%85-na-tle-grafiki-i-projektowania-stron-internetowych-prosty-znak-wektorowy.jpg?ver=6",cost:6 },
];

const PaymentPage = () => {
  const [ethereum, setEthereum] = useState<CurrentCryptoPriceInterface | null>(null);
  const [deliveryData, setDeliveryData] = useState({
    city: '',
    street: '',
    postcode: '',
    phoneNumber: '',
    email: '',
  });
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<DeliveryOption>(deliveryOptions[0]);
  const [isPaymentVisible, setIsPaymentVisible] = useState<PaymentOption>(PaymentOption.Null);

  const api = useAxiosCrypto();
  const appContext = useContext(AppContext);
  const { user, cart } = appContext!;
  const navigate = useNavigate();
  const gatename = 'WK';

  const productSuccessfullyBoughtFunction = async () => {
    api
      .post(`/postPayment/createTransaction`, {
        buyerId:user?.user_id,
        cartItems:cart.cartItems,
        deliveryData,
        deliveryOption:selectedDeliveryOption,
        notificationContent:"you bought an item"
      }
        
      ).then((response)=>{
        console.log(response.data)
      })
      .catch((err)=>{
        console.error(err)
      })
  };

  useEffect(() => {
    api.get<CurrentCryptoPriceInterface>(`/coins/ethereum`).then((resp) => {
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

  const handleDeliveryOptionChange = (option: DeliveryOption) => {
    setSelectedDeliveryOption(option);
  };

  const handlePaymentVisibleChange = (option: PaymentOption) => {
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
      <DeliveryComponent deliveryData={deliveryData}
          handleInputChange={handleInputChange}/>

        <div className="section">
          <div className="section__title">Shipping Methods</div>
          <div className="payment-options">
            {Object.values(deliveryOptions).map((option) => (
              <div
                key={option.name}
                onClick={() => handleDeliveryOptionChange(option as DeliveryOption)}
                className={
                  selectedDeliveryOption.value === option.value
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
          {isPaymentVisible === PaymentOption.Stripe ? (
            <PaymentComponent
              amount={totalPriceUSD}
              gate={gatename}
              productSuccessfullyBoughtFunction={productSuccessfullyBoughtFunction}
            />
          ) : ethereum ? (
            <PayWithEthComponent
              ethPrice={ethereum}
              productSuccessfullyBoughtFunction={productSuccessfullyBoughtFunction}
            />
          ) : (
            <div>Something went wrong</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
