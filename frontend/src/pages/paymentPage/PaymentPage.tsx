import React,{useContext,useState} from 'react'
import { AppContext } from '../../state/AppContext';

const PaymentPage = () => {
  const appContext = useContext(AppContext);
  console.log(appContext?.user)
  return (
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
  )
}

export default PaymentPage