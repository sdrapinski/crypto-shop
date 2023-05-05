import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import AppProvider from "./state/AppContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.scss";
import DashboardHeader from "./components/dashboardHeader/DashboardHeader";
import UserDetails from "./pages/userDetails/UserDetails";
import UserCart from "./pages/userCart/UserCart";

function Router() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/" element={<DashboardHeader />}>
            <Route index element={<Homepage />} />
            <Route path="/userdetails" element={<UserDetails />} />
            <Route path="/usercart" element={<UserCart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default Router;
