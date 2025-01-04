import React, { useEffect,useState,useContext } from 'react'
import useAxiosCrypto from '../../hooks/useAxiosCrypto';
import { CurrentCryptoPriceInterface } from '../../interfaces/CurrentCryptoPrice.Interface';
import CurrentCryptoPriceItem from './CurrentCryptoPriceItem';
import { AppContext } from '../../state/AppContext';

const CurrentCryptoPrice = () => {
  const api = useAxiosCrypto()
  const appContext = useContext(AppContext);

  const [bitcoin, setBitcoin] = useState<CurrentCryptoPriceInterface | null>(null)
  const [ethereum, setEthereum] = useState<CurrentCryptoPriceInterface | null>(null)
  const [solana, setSolana] = useState<CurrentCryptoPriceInterface | null>(null)

  useEffect(() => {
    api
      .get<CurrentCryptoPriceInterface>(`/coins/bitcoin`)
      .then((resp) => {
       setBitcoin(resp.data)
      });
    api
      .get<CurrentCryptoPriceInterface>(`/coins/ethereum`)
      .then((resp) => {
       setEthereum(resp.data)
       
       appContext?.setEthPrice(resp.data)
      });
    api
      .get<CurrentCryptoPriceInterface>(`/coins/solana`)
      .then((resp) => {
       setSolana(resp.data)
      });

    return () => {};
  }, []);

  return (
    <div className='currentCryptoPrice__row'>
        {!bitcoin || !ethereum || !solana ? <div> Ładowanie danych blockchain</div> : 
        <>
        <CurrentCryptoPriceItem coin={bitcoin} key={bitcoin.name}/>
        <CurrentCryptoPriceItem coin={ethereum} key={ethereum.name}/>
        <CurrentCryptoPriceItem coin={solana} key={solana.name}/>
      
        </>
        
        
        }

        
    </div>
  )
}

export default CurrentCryptoPrice