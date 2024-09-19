import { User } from "../classes/User";
import { CartInterface } from "./CartInterface";
import { CurrentCryptoPriceInterface } from "./CurrentCryptoPrice.Interface";
import { JwtInteface } from "./jwt.interface";
export interface AppContextInterface {
  checkAccessToken: () => Promise< string | null |undefined>;
  user: User | null;
  cart: CartInterface;
  loginUser: (data: JwtInteface) => void;
  backendUrl: string | undefined;
  logout: () => void;
  getCart: (user_id: string) => void;
  addToCart: (product_id: string) => void;
  setEthPrice:(eth:CurrentCryptoPriceInterface) => void
  ethereum:CurrentCryptoPriceInterface | null
}

export interface UserProps {
  name: string;
  surname: string;
  email: string;
}

export interface AppProviderProps {
  children?: React.ReactNode;
}

export interface UserInteface {
  isLoggedIn: boolean;
}
