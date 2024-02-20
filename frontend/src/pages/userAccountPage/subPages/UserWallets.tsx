import axios from "axios";
import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../state/AppContext";

const UserWallets = () => {

  const appContext = useContext(AppContext);
    useEffect(() => {
      axios
        .get(`${appContext?.backendUrl}/account`, {
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
    <div className="tab-pane fade show active">
       
    </div>
    );
};

export default UserWallets;
