import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../state/AppContext";

interface FilterProps {
  category: string;
}

const Filters: React.FC<FilterProps> = (props) => {
  const { category } = props;
  const appcontext = useContext(AppContext);
  useEffect(() => {
    axios
      .get(`${appcontext?.backendUrl}/offer/filters/${category}`, {
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

  return <div className="filters">Filters</div>;
};

export default Filters;
