import React,{useContext,useState,useEffect} from 'react'
import { AppContext } from '../../state/AppContext';
import { useNavigate } from 'react-router-dom';
import useAxiosCrypto from '../../hooks/useAxiosCrypto';
import { CurrentCryptoPriceInterface } from '../../interfaces/CurrentCryptoPrice.Interface';
import DeliveryComponent from '../../components/Delivery/DeliveryComponent';
import PaymentComponent from '../../components/Payments/PaymentComponent';
import PayWithEthComponent from '../../components/Payments/PayWithEthComponent';

const PaymentPage = () => {
  const [ethereum, setEthereum] = useState<CurrentCryptoPriceInterface | null>(null)
  const api = useAxiosCrypto()
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const {user,cart} = appContext!


    useEffect(() => {
      api
      .get<CurrentCryptoPriceInterface>(`/coins/ethereum`)
      .then((resp) => {
       setEthereum(resp.data)
      
      });
    }, [])

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
            <PaymentComponent amount={totalPriceUSD}/>
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
            <button>Pay with the selected payment option</button> <br />
            {
              ethereum && <PayWithEthComponent ethPrice={ethereum}/>
            }
            
          </div>
        </div>
      </div>
    );
    
}

export default PaymentPage

/*
<div>
      strona do płatnosci i dostawy
      <ol>
        <li>rozdzielenie na poszczegolnych sprzedających</li>
        <li>mozliwosc wyboru sposobu płatnosci dla nich (krypto ETH lub tradycyjnie) za wszystko jezeli chcesz w krypto a jakis produkt nie ma takiej opcji musisz go usunac</li>
        <li>z wyglądu troche jak strona koszyka na allegro gdy masz kilku dostawcow</li>
      </ol>
      Na dole opcje dostawy
      <ol>
        <li>jakis inpost dhl itp</li>
        <li>Pamietajcie ze przy tworzeniu konta są juz dodawane informacje o ulicy kraju itp ale mozliwosc edycji ich przy dostawanie byłba by git</li>
      </ol>
      Co dalej
      <ol>
        <li>pomyslne przejscie płatnosci tworzy zamówienie w bazie(nr zamowienie id przedmiotow)</li>
        <li>przejscie na strone z podsumowaniem</li>
        <li>powiadomienie dla sprzedającego</li>
        <li>Mozliwe powiadomienie mailowe</li>
      </ol>
    </div>
    */