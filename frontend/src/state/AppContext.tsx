import React, { createContext } from "react";
import {
  AppContextInterface,
  AppProviderProps,
} from "../interfaces/AppContext.interface";

export const AppContext = createContext<AppContextInterface | null>(null);

const AppProvider = ({ children }: AppProviderProps) => {
  return <AppContext.Provider value={null}>{children}</AppContext.Provider>;
};

export default AppProvider;
