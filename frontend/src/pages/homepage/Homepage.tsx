import axios from "axios";
import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { SwitchButton } from "../../components/switchButton/SwitchButton";
import { Container } from "react-bootstrap";
import SponsoredPosts from "../../components/Products/sponsoredProducts/SponsoredProducts";
import Categories from "../../components/Categories/Categories";
import MainPageProducts from "../../components/Products/mainPageProducts/MainPageProducts";
import Footer from "../../components/footer/Footer";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Homepage = () => {
  useEffect(() => {
    axios
      .get(`${backendUrl}/Categories`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((resp) => {
        console.log(resp);
      });

    return () => {};
  }, []);

  return (
    <>
      <Container fluid style={{ padding: "0px 30px" }}>
        <SponsoredPosts />
        <Categories />
        <MainPageProducts />
      </Container>
      <Footer />
    </>
  );
};

export default Homepage;
