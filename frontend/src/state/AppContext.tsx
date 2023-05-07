import React, { createContext, useState } from "react";
import {
  AppContextInterface,
  AppProviderProps,
} from "../interfaces/AppContext.interface";
import { User } from "../classes/User";
import { JwtInteface, DecodedToken } from "../interfaces/jwt.interface";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";

export const AppContext = createContext<AppContextInterface | null>(null);

const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const cookie = new Cookies();

  const loginUser = (data: JwtInteface) => {
    const newUser = new User(data.accessToken);
    setUser(newUser);

    const refreshToken: DecodedToken = jwt(data.refreshToken);
    console.log(refreshToken);

    cookie.set("jwt_RefreshToken", data.refreshToken, {
      expires: new Date(refreshToken.exp * 1000),
    });
  };

  const appContextValue: AppContextInterface = {
    user,
    loginUser,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
