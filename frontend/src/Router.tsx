import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Homepage from "./pages/homePage/Homepage";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import AppProvider from "./state/AppContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.scss";
import DashboardHeader from "./components/dashboardHeader/DashboardHeader";
import UserAccountPage from "./pages/userAccountPage/userAccountPage";
import UserCart from "./pages/userCart/UserCart";
import ProductDetails from "./pages/productDetails/ProductDetails";
import ProductsByCategoryPage from "./pages/productsByCategoryPage/ProductsByCategoryPage";
import ProductsBySearchPage from "./pages/productsBySearchPage/ProductsBySearchPage";
import AddProductPage from "./pages/addProduct/AddProductPage";
import UserProducts from "./pages/userAccountPage/subPages/UserProducts";
import EditProduct from "./pages/editProduct/EditProduct";

function Router() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/" element={<DashboardHeader />}>
            <Route index element={<Homepage />} />

            <Route path="/account" element={<UserAccountPage />} />

            <Route path="/account/userProducts" element={<UserProducts />} />
            <Route
              path="/account/userProducts/editProduct/:productId"
              element={<EditProduct />}
            />

            <Route path="/usercart" element={<UserCart />} />

            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/product/addProduct" element={<AddProductPage />} />
            <Route path="/products">
              <Route
                path="category/:categoryId"
                element={<ProductsByCategoryPage />}
              />
              <Route path="search/:query" element={<ProductsBySearchPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default Router;
