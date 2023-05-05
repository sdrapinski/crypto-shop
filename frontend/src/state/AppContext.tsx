import React, { createContext, useState } from "react";
import {
  AppContextInterface,
  AppProviderProps,
} from "../interfaces/AppContext.interface";
import { User } from "../classes/User";

export const AppContext = createContext<AppContextInterface | null>(null);

const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User>(new User());

  const appContextValue: AppContextInterface = {
    user,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
