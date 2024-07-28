import React, { useEffect,useState } from 'react'
import useAxiosCrypto from '../../hooks/useAxiosCrypto';
import { CurrentCryptoPriceInterface } from '../../interfaces/CurrentCryptoPrice.Interface';

const CurrentCryptoPrice = () => {
  const api = useAxiosCrypto()

  const [bitcoin, setBitcoin] = useState<CurrentCryptoPriceInterface | null>(null)
  const [ethereum, setEthereum] = useState<CurrentCryptoPriceInterface | null>(null)

  useEffect(() => {
    api
      .get<CurrentCryptoPriceInterface>(`/coins/bitcoin`)
      .then((resp) => {
       setBitcoin(resp.data)
      });

    return () => {};
  }, []);

  return (
    <div>Btc price: {bitcoin!.market_data.current_price.usd}</div>
  )
}

export default CurrentCryptoPrice