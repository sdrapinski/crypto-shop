export interface CurrentCryptoPriceInterface {
image:image;
market_data:market_data
}
interface image {
    large:string;
    small:string;
    thumb:string
}
interface market_data{
    current_price:{
        usd:number;
        pln:number
    }
}