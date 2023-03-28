import axios from "axios";
import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { SwitchButton } from "../../components/switchButton/SwitchButton";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Homepage = () => {
  useEffect(() => {
    axios
      .get(`${backendUrl}`, {
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
    <div>
      <SwitchButton />
    </div>
  );
};

export default Homepage;
