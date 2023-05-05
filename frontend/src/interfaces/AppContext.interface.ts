import { User } from "../classes/User";
export interface AppContextInterface {
  user: User;
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
