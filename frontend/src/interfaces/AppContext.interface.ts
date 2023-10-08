import { User } from "../classes/User";
import { CartInterface } from "./CartInterface";
import { JwtInteface } from "./jwt.interface";
export interface AppContextInterface {
  checkAccessToken: () => void;
  user: User | null;
  cart: CartInterface;
  loginUser: (data: JwtInteface) => void;
  backendUrl: string | undefined;
  logout: () => void;
  addToCart: (product_id: string) => void;
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
