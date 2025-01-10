import React, { createContext, useState, useEffect } from "react";
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
import { CurrentCryptoPriceInterface } from "../interfaces/CurrentCryptoPrice.Interface";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext<AppContextInterface | null>(null);

const backendUrl = "https://cryptoshop-backend-api.up.railway.app"


const initialCart: CartInterface = {
  cart_id: "",
  cartItems: [],
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [expirationDate, setexpirationDate] = useState<Date>();
  const [accessToken, setaccessToken] = useState<string | null>();
  const [cart, setCart] = useState<CartInterface>(initialCart);
  const [ethereum, setEthereum] = useState<CurrentCryptoPriceInterface | null>(null)

  
  const cookie = new Cookies();

  const loginUser = async (data: JwtInteface) => {
    const newUser = new User(data.accessToken);
    setUser(newUser);

    const refreshToken: DecodedToken = jwt(data.refreshToken);

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

    return token;
  };

  const getNewAccessToken = async () => {
    const refreshToken = cookie.get("jwt_RefreshToken");
    let token: JwtInteface = { accessToken: "", refreshToken: "" };
    if (refreshToken) {
      await axios
        .post(
          `${backendUrl}/user/refreshToken`,
          { refresh: refreshToken },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              authorization: "Bearer " + refreshToken,
            },
          }
        )
        .then(async (response) => {
          token = response.data;
         

          await loginUser({
            accessToken: token.accessToken,
            refreshToken: refreshToken,
          });
        
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

  const setEthPrice = (eth:CurrentCryptoPriceInterface) =>{ 
    setEthereum(eth)
  }

  const addToCart = async (product_id: string) => {
    await axios
      .post<CartInterface>(`${backendUrl}/cart/addtocart`, {
        cart_id: user?.user_cart.cart_id,
        product_id: product_id,
      })
      .then((resp) => {
        
        setCart(resp.data);
      });
  };

  const removeFromCart = async (product_id: string) => {
    await axios
      .post<CartInterface>(`${backendUrl}/cart/removefromcart`, {
        cart_id: user?.user_cart.cart_id,
        product_id: product_id,
      })
      .then((resp) => {
        
        setCart(resp.data);
      });
  };

  const getCart = async (user_id: string) => {
    try {
      let cart: any;
      await axios
        .get<CartInterface>(`${backendUrl}/cart/getCartFromUserId/${user_id}`)
        .then((resp) => {
         

          setCart(resp.data);
          cart = resp.data;
        })
        .catch((error) => {
          console.error(error);
        });

      return cart;
    } catch (error) {
      console.error("getCart - error", error);
      return null;
    }
  };

  const appContextValue: AppContextInterface = {
    setEthPrice,
    checkAccessToken,
    user,
    loginUser,
    backendUrl,
    logout,
    addToCart,
    removeFromCart,
    cart,
    ethereum,
    getCart,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
