import axios from "axios";
import React, { useEffect, useContext } from "react";
import Navbar from "../../components/navbar/Navbar";
import { SwitchButton } from "../../components/switchButton/SwitchButton";
import { Container } from "react-bootstrap";
import SponsoredPosts from "../../components/Products/sponsoredProducts/SponsoredProducts";
import Categories from "../../components/Categories/Categories";
import MainPageProducts from "../../components/Products/mainPageProducts/MainPageProducts";
import Footer from "../../components/footer/Footer";
import { AppContext } from "../../state/AppContext";
import CurrentCryptoPrice from "../../components/CurrentCryptoPrice/CurrentCryptoPrice";




//test
const Homepage = () => {
  const appContext = useContext(AppContext);
  
  // useEffect(() => {
  //   console.log(appContext?.user)
  //   axios
  //     .get(`${appContext?.backendUrl}/user/getUserAndProducts/${appContext?.user?.user_id}`,{
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     })
  //     .then((resp) => {
  //       console.log(resp);
  //     });

  //   return () => {};
  // }, []);

  return (
    <>
      <Container fluid style={{ padding: "0px 30px" }}>
        <SponsoredPosts />
        <CurrentCryptoPrice />
        <Categories />
        <MainPageProducts />
      </Container>
      <Footer />
    </>
  );
};

export default Homepage;
