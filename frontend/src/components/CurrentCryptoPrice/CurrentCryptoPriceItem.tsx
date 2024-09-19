import React from 'react'
import { CurrentCryptoPriceInterface } from '../../interfaces/CurrentCryptoPrice.Interface'

interface CurrentCryptoPriceItemProps {
    coin : CurrentCryptoPriceInterface
}


const CurrentCryptoPriceItem:React.FC<CurrentCryptoPriceItemProps> = (props) => {
    const {coin} = props
  return (
    <div className='CurrentCryptoPriceItem__wrapper'>
      <div className='CurrentCryptoPriceItem__img'>
          <img src={coin.image.large} alt={coin.name} />
      </div>

      <div className='CurrentCryptoPriceItem__text'>
      {coin.name} price: <br />{coin.market_data.current_price.usd}
      </div>
        
    </div>
  )
}

export default CurrentCryptoPriceItem