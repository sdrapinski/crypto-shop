import { User } from "../classes/User";
import { JwtInteface } from "./jwt.interface";
export interface AppContextInterface {
  user: User | null;
  loginUser: (data: JwtInteface) => void;
  backendUrl: string | undefined;
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
