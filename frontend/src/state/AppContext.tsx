import React, { createContext, useState } from "react";
import {
  AppContextInterface,
  AppProviderProps,
} from "../interfaces/AppContext.interface";
import { User } from "../classes/User";
import { JwtInteface, DecodedToken } from "../interfaces/jwt.interface";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import axios from "axios";
import { CartInterface } from "../interfaces/CartInterface";

export const AppContext = createContext<AppContextInterface | null>(null);

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const initialCart: CartInterface = {
  cart_id: "",
  products_id: [],
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [expirationDate, setexpirationDate] = useState<Date>();
  const [accessToken, setaccessToken] = useState<string | null>();
  const [cart, setCart] = useState<CartInterface>(initialCart);

  const cookie = new Cookies();

  const loginUser = (data: JwtInteface) => {
    const newUser = new User(data.accessToken);
    setUser(newUser);

    const refreshToken: DecodedToken = jwt(data.refreshToken);
    console.log(refreshToken);

    setaccessToken(data.accessToken);

    cookie.set("jwt_RefreshToken", data.refreshToken, {
      expires: new Date(refreshToken.exp * 1000),
    });
    setexpirationDate(new Date(refreshToken.exp * 1000));
  };

  const checkAccessToken = async () => {
    let token = accessToken;
    if (isAccessTokenExpired()) {
      token = await getNewAccessToken();
      if (!token) {
        console.error("Token is undefined!");
        return null;
      }
    }
    console.log(token);
    return token;
  };

  const getNewAccessToken = async () => {
    const refreshToken = cookie.get("jwt_RefreshToken");
    let token: JwtInteface = { accessToken: "", refreshToken: "" };
    if (refreshToken) {
      console.log(refreshToken);
      await axios
        .post(
          `${backendUrl}/token/refresh`,
          { refresh: refreshToken },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          token = response.data;
          loginUser(token);
        })
        .catch((error) => {
          console.error(error);
          return "";
        });
      return token.accessToken;
    } else {
      // logout
      console.error("no access token");
      return "";
    }
  };

  const isAccessTokenExpired = () => {
    const today = new Date();

    if (expirationDate && expirationDate > today) {
      return false;
    } else {
      return true;
    }
  };
  const logout = () => {
    setaccessToken(null);
    setUser(null);
    cookie.remove("jwt_RefreshToken");
  };
  //

  const addToCart = (product_id: string) => {
    const updatedCart = { ...cart };
    updatedCart.products_id = [...updatedCart.products_id, product_id];
    setCart(updatedCart);

    axios.post(`${backendUrl}/addtocart`, {
      cart_id: updatedCart.cart_id,
      product_id: updatedCart,
    });
  };

  const appContextValue: AppContextInterface = {
    user,
    loginUser,
    backendUrl,
    logout,
    addToCart,
    cart,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
