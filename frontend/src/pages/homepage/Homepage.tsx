import axios from "axios";
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";

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

  return <div>hej</div>;
};

export default Homepage;
